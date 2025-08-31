import { fetchGemini } from '../services/geminiService.js';
import { createFile } from '../services/fileService.js';

export const createCoverLetter = async (req, res) => {
	const fileName = `${req.body.firstName}_${req.body.lastName}_Cover_Letter.tex`;
	console.log('Creating cover letter with the data:', req.body);

	try {
		const generatedCoverLetter = await fetchGemini(req.body); // calling createResume function and wait for the result
		await createFile(
			res,
			generatedCoverLetter,
      fileName,
			req.body.firstName,
			req.body.lastName
		);
	} catch (error) {
		console.error('❌ Error generating resume:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to generate resume',
			message: 'Resume creation failed',
		});
	}
};
