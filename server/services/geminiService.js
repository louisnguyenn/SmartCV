import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY;
const RESUME_PROMPT = readFileSync('./prompts/resume-prompt.txt', 'utf8');
const GOOD_RESUME = readFileSync('./prompts/resume-good-example.txt', 'utf8');
const BAD_RESUME = readFileSync('./prompts/resume-bad-example.txt', 'utf8');
const TEMPLATE_RESUME = readFileSync('./prompts/resume-template.txt', 'utf8');

// create resume function (this function will callthe gemini api to create our resume)
export async function createResume(formData) {
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
