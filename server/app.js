import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createResumeRoutes from "./routes/createResumeRoutes";
import CreateCoverLetterRoutes from "./routes/createCoverLetterRoutes";
import atsScanRoutes from "./routes/atsScanRoutes";

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

// routes
app.use('/api', resumeRoutes);
app.use('/api', coverLetterRoutes);
app.use('/api', atsRoutes);

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
