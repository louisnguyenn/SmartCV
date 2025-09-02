import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';

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

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		// Handle rejected files
		if (rejectedFiles.length > 0) {
			setError('Please upload a valid resume file (PDF, DOC, or DOCX)');
			return;
		}

		setError(null);

		acceptedFiles.forEach((file) => {
			const reader = new FileReader();

			reader.onabort = () => console.log('File reading was aborted');
			reader.onerror = () => {
				console.log('File reading has failed');
				setError('Failed to read the file');
			};
			reader.onload = () => {
				// send the file to the backend
				fetchAPI(file);
			};

			reader.readAsArrayBuffer(file);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			onDrop,
			accept: {
				'application/pdf': ['.pdf'],
				'application/msword': ['.doc'],
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
					['.docx'],
			},
			maxFiles: 1,
			multiple: false,
		});

	async function fetchAPI(file) {
		setLoading(true);
		setError(null);

		try {
			// create FormData to send file
			const formData = new FormData();
			formData.append('resume', file);

			const response = await axios.post(
				'http://localhost:3000/api/atsscan',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log('ATS Scan Result:', response.data);
			setResult(response.data);
		} catch (error) {
			console.error('Error scanning resume:', error);
			setError('Failed to analyze resume. Please try again.');
		} finally {
			setLoading(false);
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

					<div className="p-6 space-y-8">
						<div
							{...getRootProps()}
							className={`flex flex-col justify-center items-center h-32 border-2 border-dashed rounded-lg transition-all cursor-pointer ${
								isDragActive
									? 'border-emerald-500 bg-emerald-50'
									: isDragReject
									? 'border-red-500 bg-red-50'
									: 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
							}`}
						>
							<input {...getInputProps()} />

							<div className="text-center">
								{loading ? (
									<div className="flex flex-col items-center">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-2"></div>
										<p className="text-gray-600">Analyzing your resume...</p>
									</div>
								) : isDragActive ? (
									<div className="flex flex-col items-center">
										<Upload className="h-8 w-8 text-emerald-600 mb-2" />
										<p className="text-emerald-600 font-medium">
											Drop your resume here
										</p>
									</div>
								) : isDragReject ? (
									<div className="flex flex-col items-center">
										<AlertCircle className="h-8 w-8 text-red-600 mb-2" />
										<p className="text-red-600">Invalid file type</p>
									</div>
								) : (
									<div className="flex flex-col items-center">
										<FileText className="h-8 w-8 text-gray-400 mb-2" />
										<p className="text-gray-600">
											Drop your resume here, or{' '}
											<span className="text-emerald-600 underline">
												click to select
											</span>
										</p>
										<p className="text-sm text-gray-400 mt-1">
											Supports PDF, DOC, DOCX files only
										</p>
									</div>
								)}
							</div>
						</div>

						{error && (
							<div className="bg-red-50 border border-red-200 rounded-md p-4">
								<div className="flex">
									<AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
									<p className="text-red-700">{error}</p>
								</div>
							</div>
						)}

						{result && (
							<div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
								<h3 className="text-lg font-semibold text-emerald-800 mb-2">
									ATS Scan Results
								</h3>
								<pre className="text-sm text-emerald-700 whitespace-pre-wrap">
									{JSON.stringify(result, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
