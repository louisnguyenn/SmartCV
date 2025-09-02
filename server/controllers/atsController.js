import { readFileSync } from 'fs';
import { fetchGemini } from '../services/geminiService.js';
import { parseATSResponse } from '../services/parsingService.js';

export const atsScan = async (req, res) => {
	console.log('ATS scanning resume...');

	try {
		// extract text from uploaded file
		const resumeText = req.file.buffer.toString('utf8');

		if (!resumeText || resumeText.trim().length === 0) {
			return res.status(400).json({
				success: false,
				error: 'Empty file',
				message: 'The uploaded file appears to be empty',
			});
		}

		console.log('Resume text length:', resumeText.length);

		const ATS_PROMPT = readFileSync('./prompts/atsscan-prompt.txt', 'utf8');

		// send to Gemini for analysis
		const scanResult = await fetchGemini(
			true,
			resumeText,
			ATS_PROMPT,
			'',
			'',
			''
		);

		// parse the Gemini response
		const parsedResult = parseATSResponse(scanResult);

		res.json({
			success: true,
			atsScore: parsedResult.score,
			recommendations: parsedResult.recommendations,
			analysis: parsedResult.fullResponse,
			message: 'Resume successfully analyzed',
			filename: req.file.originalname,
		});
	} catch (error) {
		console.error('Error scanning resume:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to scan resume',
			message: 'Resume ATS scanning failed. Please try again.',
		});
	}
};
