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

const API_KEY = process.env.GEMINI_API_KEY;
const RESUME_PROMPT = readFileSync('./prompts/resume-prompt.txt', 'utf8');
const GOOD_RESUME = readFileSync('./prompts/resume-good-example.txt', 'utf8');
const BAD_RESUME = readFileSync('./prompts/resume-bad-example.txt', 'utf8');
const TEMPLATE_RESUME = readFileSync('./prompts/resume-template.txt', 'utf8');

// middleware
app.use(cors(corsOptions)); // using the client local host to receive info from frontend
app.use(express.json()); // parsing json data

dotenv.config();

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
								RESUME_PROMPT +
								GOOD_RESUME +
								BAD_RESUME +
								TEMPLATE_RESUME +
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
		throw new Error('Failed to generate resume');
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
