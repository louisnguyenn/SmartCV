import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import { readFileSync } from 'fs';

const app = express();
const corsOptions = {
	origin: ['http://localhost:5173'],
};

// middleware
app.use(cors(corsOptions)); // using the client local host to receive info from frontend
app.use(express.json()); // parsing json data

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;

const RESUME_PROMPT = `
  __ASK__
  Create a completely unique resume in the provided LaTeX resume template using the form data provided.

  __CONTEXT__
  - You are building a LaTex resume based off the form data provided by the user
  - You are going to help build this resume for a job posting that the user will apply to after building this resume

  __CONSTRAINTS__
  - The output must be in LateX
  - Do not change any of the existing comments already in the template
  - You must follow the template, do not add any additional headers and columns
  - Do not change the formatting and margins of the template
  - The bullet points must be written in XYZ format with quantities included in every bullet point
  - Each bullet point must include at least one technical skill
  - Each bullet point should be exactly one sentence long, enough characters to fill out the line of the resume
  - The words must be professional, impactful, and in past tense
  - Put the technical skills and any quantities in bold
  - The resume must follow this order: start with Education, then Technical Skills, then Experience, and lastly Projects
  - Fill as much white space as you can in the resume. Ensure all bullet points are exact one sentence long to avoid white space at the end of the sentence
  - Ensure all spelling and punctuation is correct and all bullet points is clear and easy to understand
  
  __GOOD_BULLETPOINT_EXAMPLE__
  - Achieved a production output of \textbf{122\%} by operating \textbf{4 CNC lathes}, each producing \textbf{1000+ Ford pinions} per shift.
  - Improved part production by \textbf{20\%} by increasing machine \textbf{feed rates}, reducing cycle times from \textbf{28.3} to \textbf{26.7 seconds}.
  - Automated data preprocessing and augmentation using \textbf{Python}, \textbf{OpenCV}, and \textbf{Keras} for balanced model training.
  - Engineered a backend with \textbf{Flask} and \textbf{Python}, enabling real-time processing of video streams for intrusion detection.
  - Built a \textbf{linear regression model} to predict electron collision outcomes using \textbf{Python}

  __BAD_BULLETPOINT_EXAMPLE__
  - Developed a game in Java to test the generated dungeons
  - Presented virtually to the World Conference on Computational Intelligence
  - Wrote an 8-page paper and gave multiple presentations on-campus
  - Visualized GitHub data to show collaboration  

  __RESUME_EXAMPLES__
  I've provided a good resume example, bad resume example, and a template resume that you MUST follow. Refer to the good example resume but do not copy it. Some bullet points can be similar, but they should not be exact. Ensure that this resume is completely unique, not using any references from the internet and not copying from my good resume and/or bad resume example. Refer to the bad example resume to avoid bad bullet points and wrong section priorites.
`;

const GOOD_RESUME = readFileSync('./prompts/resume-good-example.txt', 'utf8');
const BAD_RESUME = readFileSync('./prompts/resume-bad-example.txt', 'utf8');
const TEMPLATE_RESUME = readFileSync('./prompts/resume-template.txt', 'utf8');

// health check
app.get('/', (req, res) => {
	console.log('Backend is running');
	res.json({ message: 'Backend is running' });
});

// creating resume
app.post('/api/createresume', async (req, res) => {
	console.log('Creating resume with data:', req.body);

	try {
		const generatedResume = await createResume(req.body); // calling createResume function and wait for the result
		const fileName = `${req.body.firstName || 'Resume'}_${
			req.body.lastName || 'User'
		}_Resume.tex`;

		fs.writeFile(fileName, generatedResume, (writeErr) => {
			if (writeErr) {
				console.error('Error writing file:', writeErr);
				return res.status(500).json({ error: 'Failed to create file' });
			}

			res.download(fileName, fileName, (downloadErr) => {
				if (downloadErr) {
					console.error('Download error:', downloadErr);
				} else {
					fs.unlinkSync(fileName); // delete the generated file after it is downloaded
					console.log(`✅ File ${fileName} downloaded and cleaned up`);
				}
			});
		});
	} catch (error) {
		console.error('❌ Error generating resume:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to generate resume',
			message: 'Resume creation failed',
		});
	}
});

// create resume function (this function will callthe gemini api to create our resume)
async function createResume(formData) {
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

	try {
		const response = await axios.post(url, {
			contents: [
				{
					parts: [
						{
							text:
								RESUME_PROMPT + GOOD_RESUME + BAD_RESUME + TEMPLATE_RESUME +
								'\n\nForm data:\n' +
								JSON.stringify(formData, null, 2),
						},
					],
				},
			],
		});

		const data = response.data;

		// extract the generated text from Gemini's response
		const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

		return generatedText || 'Resume generation failed';
	} catch (err) {
		console.error('❌ Gemini API Error:', err.response?.data || err.message);
		throw new Error('Failed to generate resume with AI');
	}
}

app.post('/api/createcoverletter', (req, res) => {
	console.log('Creating cover letter');
	res.json({ message: 'Cover letter created' });
});

app.post('/api/atsscan', (req, res) => {
	console.log('Scanning');
	res.json({ message: 'Scan completed' });
});

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
