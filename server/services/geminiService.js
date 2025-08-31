import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

// create resume function (this function will callthe gemini api to create our resume)
export async function fetchGemini(
	formData,
	prompt,
	good_example,
	bad_example,
	template
) {
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

	try {
		const response = await axios.post(url, {
			contents: [
				{
					parts: [
						{
							text:
								prompt +
								good_example +
								bad_example +
								template +
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

		return generatedText || 'Content generation failed';
	} catch (err) {
		console.error('Gemini API Error:', err.response?.data || err.message);
		throw new Error('Failed to generate content');
	}
}
