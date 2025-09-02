import multer from 'multer';

// configure multer for text file uploads
const storage = multer.memoryStorage();
export const upload = multer({
	storage,
	limits: {
		fileSize: 2 * 1024 * 1024, // 2MB limit for text files
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'text/plain') {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type. Only .txt files are allowed.'));
		}
	},
});

// function to parse Gemini response for ATS data
export async function parseATSResponse(geminiResponse) {
	try {
		// extract score from response
		const scoreMatch = geminiResponse.match(/(?:score|rating)[\s:]*(\d+)/i);
		const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

		// getting recommendations from response
		const lines = geminiResponse.split('\n').filter((line) => line.trim());
		const recommendations = [];

		let collectingRecommendations = false;

		lines.forEach((line) => {
			const trimmedLine = line.trim();

			if (
				trimmedLine.toLowerCase().includes('recommendation') ||
				trimmedLine.toLowerCase().includes('suggestion') ||
				trimmedLine.toLowerCase().includes('improve') ||
				trimmedLine.toLowerCase().includes('enhancement')
			) {
				collectingRecommendations = true;
				return;
			}

			// collect bullet points or numbered items
			if (collectingRecommendations) {
				if (trimmedLine.match(/^[-•*]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
					const cleanedRec = trimmedLine.replace(/^[-•*\d.]\s*/, '').trim();
					if (cleanedRec.length > 0) {
						recommendations.push(cleanedRec);
					}
				}
			}
		});

		return {
			score: score || 'Unable to determine',
			recommendations:
				recommendations.length > 0
					? recommendations
					: ['No specific recommendations provided'],
			fullResponse: geminiResponse,
		};
	} catch (error) {
		console.error('Error parsing ATS response:', error);
		return {
			score: 'Error',
			recommendations: ['Unable to parse recommendations'],
			fullResponse: geminiResponse,
		};
	}
}
