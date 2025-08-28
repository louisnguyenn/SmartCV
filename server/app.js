import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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
  Create a resume in the provided LaTeX resume template using the form data provided.

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
  
  __GOOD_EXAMPLE__
  - Achieved a production output of \textbf{122\%} by operating \textbf{4 CNC lathes}, each producing \textbf{1000+ Ford pinions} per shift.
  - Improved part production by \textbf{20\%} by increasing machine \textbf{feed rates}, reducing cycle times from \textbf{28.3} to \textbf{26.7 seconds}.
  - Automated data preprocessing and augmentation using \textbf{Python}, \textbf{OpenCV}, and \textbf{Keras} for balanced model training.
  - Engineered a backend with \textbf{Flask} and \textbf{Python}, enabling real-time processing of video streams for intrusion detection.
  - Built a \textbf{linear regression model} to predict electron collision outcomes using \textbf{Python}

  __BAD_EXAMPLE__
  - Developed a game in Java to test the generated dungeons
  - Presented virtually to the World Conference on Computational Intelligence
  - Wrote an 8-page paper and gave multiple presentations on-campus
  - Visualized GitHub data to show collaboration
`;

// async function createResume(formData) {
// 	const url =
// 		'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
// 		API_KEY;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				contents: [
// 					{
// 						parts: [
// 							{
// 								text:
// 									RESUME_PROMPT +
// 									'\n\nForm data:\n' +
// 									JSON.stringify(formData, null, 2),
// 							},
// 						],
// 					},
// 				],
// 			}),
// 		});

// 		const data = await response.json();
// 		return data;
// 	} catch (err) {
// 		console.error('Error:', err);
// 	}
// }

// method to download files
// res.download('server.js');

// health check
app.get('/', (req, res) => {
	console.log('Backend is running');
	res.json({ message: 'Backend is running' });
});

app.post('/api/createresume', (req, res) => {
	console.log('Creating resume');
	res.json({ message: 'Resume created' });
});

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
