import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { useEffect } from 'react';

export const ATSScan = () => {
	// checking backend health
	// async function fetchAPI() {
	// 	try {
	// 		const response = await axios.get('http://localhost:3000');
	// 		console.log(response.data);
	// 	} catch (error) {
	// 		console.error('Error fetching backend:', error);
	// 	}
	// }

	// useEffect(() => {
	// 	fetchAPI();
	// }, []);

	async function fetchAPI() {
		try {
			const response = await axios.post('http://localhost:3000/api/atsscan');
			console.log(response.data);
		} catch (error) {
			console.error('Error fetching backend:', error);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			<div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<div className="bg-white shadow-lg rounded-lg overflow-hidden">
					<div className="px-6 py-4 bg-emerald-600 text-white">
						<h2 className="text-2xl font-bold">ATS Scan Your Resume</h2>
						<p className="text-emerald-100">
							Upload your resume to determine its ATS score
						</p>
					</div>

					<div className="p-15 space-y-8">
						<div className="flex justify-center items-center h-140 border border-gray-300 rounded-md shadow-sm ">
							<p className="text-gray-400 font-medium">Upload file</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
