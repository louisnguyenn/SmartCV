import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	Upload,
	FileText,
	AlertCircle,
	X,
	CheckCircle,
	TrendingUp,
} from 'lucide-react';

const ATSResultsPopup = ({ isOpen, onClose, results }) => {
	if (!isOpen) return null;

	const getScoreColor = (score) => {
		if (typeof score === 'number') {
			if (score >= 80) return 'text-green-600';
			if (score >= 60) return 'text-yellow-600';
			return 'text-red-600';
		}
		return 'text-gray-600';
	};

	const getScoreBackground = (score) => {
		if (typeof score === 'number') {
			if (score >= 80) return 'bg-green-100';
			if (score >= 60) return 'bg-yellow-100';
			return 'bg-red-100';
		}
		return 'bg-gray-100';
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div className="flex items-center">
						<TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
						<h2 className="text-xl font-semibold text-gray-900">
							ATS Scan Results
						</h2>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				<div className="p-6 overflow-y-auto max-h-[60vh]">
					<div
						className={`${getScoreBackground(
							results.atsScore
						)} rounded-lg p-6 mb-6`}
					>
						<div className="text-center">
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								ATS Compatibility Score
							</h3>
							<div
								className={`text-4xl font-bold ${getScoreColor(
									results.atsScore
								)} mb-2`}
							>
								{typeof results.atsScore === 'number'
									? `${results.atsScore}/100`
									: results.atsScore}
							</div>
							<p className="text-sm text-gray-600">
								{typeof results.atsScore === 'number'
									? results.atsScore >= 80
										? 'Excellent - Your resume should pass most ATS systems'
										: results.atsScore >= 60
										? 'Good - Some improvements recommended'
										: 'Needs Improvement - Several issues detected'
									: 'Score could not be determined'}
							</p>
						</div>
					</div>

					<div className="mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
							<CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
							Recommendations
						</h3>

						{results.recommendations && results.recommendations.length > 0 ? (
							<div className="space-y-3">
								{results.recommendations.map((rec, index) => (
									<div
										key={index}
										className="flex items-start bg-gray-50 rounded-lg p-3"
									>
										<div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3 mt-0.5">
											{index + 1}
										</div>
										<p className="text-gray-700 text-sm leading-relaxed">
											{rec}
										</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500 italic">
								No specific recommendations available.
							</p>
						)}
					</div>

					{results.analysis && (
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								Detailed Analysis
							</h3>
							<div className="bg-gray-50 rounded-lg p-4">
								<pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
									{results.analysis}
								</pre>
							</div>
						</div>
					)}
				</div>

				<div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
					<button
						onClick={onClose}
						className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

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
	const [showPopup, setShowPopup] = useState(false);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		if (rejectedFiles.length > 0) {
			setError('Please upload a valid text file (.txt)');
			return;
		}

		setError(null);
		setResult(null);

		if (acceptedFiles.length > 0) {
			fetchAPI(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			onDrop,
			accept: {
				'text/plain': ['.txt'],
			},
			maxFiles: 1,
			multiple: false,
		});

	async function fetchAPI(file) {
		setLoading(true);
		setError(null);

		try {
			// ceate FormData to send file properly
			const formData = new FormData();
			formData.append('resume', file);

			const response = await axios.post(
				'http://localhost:3000/api/atsscan',
				formData
			);

			const data = response.data;

			if (data.success) {
				console.log('ATS Scan Result:', data);
				setResult(data);
				setShowPopup(true); // show the popup with results
			} else {
				setError(data.message || 'Failed to analyze resume');
			}
		} catch (error) {
			console.error('Error scanning resume:', error);
			setError(
				'Failed to analyze resume. Please check your connection and try again.'
			);
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
							} ${loading ? 'pointer-events-none opacity-50' : ''}`}
						>
							<input
								{...getInputProps()}
								disabled={loading}
							/>

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
										<p className="text-red-600">
											Only .txt files are supported
										</p>
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
											Supports .txt files only
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

						<div className="bg-blue-50 border border-blue-200 rounded-md p-4">
							<h3 className="text-sm font-medium text-blue-800 mb-2">
								How to prepare your resume:
							</h3>
							<ul className="text-sm text-blue-700 space-y-1">
								<li>
									• Copy your resume content and paste it into a .txt file
								</li>
								<li>
									• Include all sections: education, skills, experience,
									projects, and other additional sections
								</li>
								<li>• Keep the original formatting as much as possible</li>
								<li>• Save the file with a .txt extension</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<ATSResultsPopup
				isOpen={showPopup}
				onClose={() => setShowPopup(false)}
				results={result || {}}
			/>
		</div>
	);
};
