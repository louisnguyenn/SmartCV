import { fetchGemini } from '../services/geminiService.js';
import { createFile } from '../services/fileService.js';
import { readFileSync } from 'fs';

export const createCoverLetter = async (req, res) => {
	const COVER_LETTER_GOOD_EXAMPLE = readFileSync(
		'./prompts/coverletter-good-example.txt',
		'utf8'
	);
	const COVER_LETTER_BAD_EXAMPLE = readFileSync(
		'./prompts/coverletter-bad-example.txt',
		'utf8'
	);
	const COVER_LETTER_PROMPT = readFileSync(
		'./prompts/coverletter-prompt.txt',
		'utf8'
	);
	const fileName = `${req.body.firstName}_${req.body.lastName}_Cover_Letter.tex`;
	console.log('Creating cover letter with the data:', req.body);

	try {
		const generatedCoverLetter = await fetchGemini(
			false,
			req.body,
			COVER_LETTER_PROMPT,
			COVER_LETTER_GOOD_EXAMPLE,
			COVER_LETTER_BAD_EXAMPLE,
			''
		);
		await createFile(res, generatedCoverLetter, fileName);
	} catch (error) {
		console.error('Error generating cover letter:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to generate cover letter',
			message: 'Cover letter creation failed',
		});
	}
};
