import { generateResume } from '../services/geminiService.js';
import { createFile } from '../services/fileService.js';

// creating resume
export const createResume = async (req, res) => {
	console.log('Creating resume with data:', req.body);

	try {
		const generatedResume = await generateResume(req.body); // calling createResume function and wait for the result
		const createdFile = await createFile(res, generatedResume, req.body.firstName, req.body.lastName);
	} catch (error) {
		console.error('❌ Error generating resume:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to generate resume',
			message: 'Resume creation failed',
		});
	}
};
