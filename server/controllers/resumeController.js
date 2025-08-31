import { fetchGemini } from '../services/geminiService.js';
import { createFile } from '../services/fileService.js';

// creating resume
export const createResume = async (req, res) => {
	const RESUME_PROMPT = readFileSync('./prompts/resume-prompt.txt', 'utf8');
	const GOOD_RESUME = readFileSync('./prompts/resume-good-example.txt', 'utf8');
	const BAD_RESUME = readFileSync('./prompts/resume-bad-example.txt', 'utf8');
	const TEMPLATE_RESUME = readFileSync('./prompts/resume-template.txt', 'utf8');
	const fileName = `${req.body.firstName}_${req.body.lastName}_Resume.tex`;
	console.log('Creating resume with data:', req.body);

	try {
		const generatedResume = await fetchGemini(
			req.body,
			RESUME_PROMPT,
			GOOD_RESUME,
			BAD_RESUME,
			TEMPLATE_RESUME
		); // calling createResume function and wait for the result
		await createFile(res, generatedResume, fileName);
	} catch (error) {
		console.error('❌ Error generating resume:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to generate resume',
			message: 'Resume creation failed',
		});
	}
};
