import fs from 'fs';

export function createFile(
	res,
	content,
	firstName = 'Resume',
	lastName = 'User'
) {
	const fileName = `${firstName}_${lastName}
	}_Resume.tex`;

	fs.writeFile(fileName, content, (writeErr) => {
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
}
