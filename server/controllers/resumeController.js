


// creating resume
export const createResume = async (req, res) => {
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
};
