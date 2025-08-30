import express from 'express';

const router = express.Router();

// creating resume
router.post('/createresume', async (req, res) => {
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

export default router;
