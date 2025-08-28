import express from 'express';
import cors from 'cors';

const app = express();
const corsOptions = {
	origin: ['https://localhost:5173'],
};

// using the client local host to receive info from frontend
app.use(cors(CorsOptions));

// async function createResume(formData) {
// 	const url =
// 		'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
// 		API_KEY;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				contents: [
// 					{
// 						parts: [
// 							{
// 								text:
// 									RESUME_PROMPT +
// 									'\n\nForm data:\n' +
// 									JSON.stringify(formData, null, 2),
// 							},
// 						],
// 					},
// 				],
// 			}),
// 		});

// 		const data = await response.json();
// 		return data;
// 	} catch (err) {
// 		console.error('Error:', err);
// 	}
// }

// method to download files
// res.download('server.js');

app.get('/api', (req, res) => {});

app.listen(3000);
