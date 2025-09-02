import { readFileSync } from 'fs';
import { fetchGemini } from '../services/geminiService.js';
import multer from 'multer';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import path from 'path';

export const atsScan = async (req, res) => {
	const ATS_PROMPT = readFileSync('./prompts/atsscan-prompt.txt', 'utf8');
	console.log('ATS scanning resume:', req.body);

	try {
		const scanResume = await fetchGemini(req.body, ATS_PROMPT, '', '', '');
	} catch (error) {
		console.error('Error scanning resume:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to scan resume',
			message: 'Resume ATS scanning failed',
		});
	}
};
