import { Navbar } from '../components/Navbar';
import { useState } from 'react';
import { User, Briefcase, UserRoundPen } from 'lucide-react';
import axios from 'axios';

export const CreateCoverLetter = () => {
	const [formData, setFormData] = useState({
		// Personal Info
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		linkedin: '',
		address: '',

		// Employer Info
		empfirstName: '',
		emplastName: '',
		empcompany: '',
		empposition: '',
		empaddress: '',
		empcity: '',

		// job description to tailor cover letter
		jobdescription: [
			{
				description: '',
			},
		],

		// personal description
		description: [{ description: '' }],
	});

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleArrayChange = (section, index, field, value) => {
		setFormData((prev) => ({
			...prev,
			[section]: prev[section].map((item, i) =>
				i === index ? { ...item, [field]: value } : item
			),
		}));
	};

	const addArrayItem = (section, template) => {
		setFormData((prev) => ({
			...prev,
			[section]: [...prev[section], template],
		}));
	};

	const removeArrayItem = (section, index) => {
		setFormData((prev) => ({
			...prev,
			[section]: prev[section].filter((_, i) => i !== index),
		}));
	};

	// checking backend health
	async function fetchAPI() {
		try {
			const response = await axios.get('http://localhost:3000');
			console.log(response.data);
		} catch (error) {
			console.error('Error fetching backend:', error);
		}
	}

	async function fetchAPI() {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/createcoverletter'
			);
			console.log(response.data);
		} catch (error) {
			console.error('Error fetching backend:', error);
		}
	}

	useEffect(() => {
		fetchAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form Data:', formData);

		// TODO: send details to backend
		alert('Cover letter data submitted! Check console for details.');
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<form onSubmit={handleSubmit}>
				<div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
					<div className="bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="px-6 py-4 bg-emerald-600 text-white">
							<h2 className="text-2xl font-bold">Create Your Cover Letter</h2>
							<p className="text-emerald-100">
								Fill in your details to create a professional cover letter
							</p>
						</div>

						<div className="p-6 space-y-8">
							<section>
								<div className="flex items-center mb-6">
									<User className="h-5 w-5 text-emerald-600 mr-2" />
									<h3 className="text-lg font-semibold text-gray-900">
										Personal Information
									</h3>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											First Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.firstName}
											onChange={(e) =>
												handleInputChange('firstName', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Last Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.lastName}
											onChange={(e) =>
												handleInputChange('lastName', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Email Address <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											value={formData.email}
											onChange={(e) =>
												handleInputChange('email', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Phone Number <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											value={formData.phone}
											onChange={(e) =>
												handleInputChange('phone', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											LinkedIn Profile
										</label>
										<input
											type="url"
											value={formData.linkedin}
											onChange={(e) =>
												handleInputChange('linkedin', e.target.value)
											}
											placeholder="https://linkedin.com/in/your-profile"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Github Profile
										</label>
										<input
											type="text"
											value={formData.address}
											onChange={(e) =>
												handleInputChange('address', e.target.value)
											}
											placeholder="https://github.com/username"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
										/>
									</div>
								</div>
							</section>

							{/* employers information */}
							<section>
								<div className="flex items-center mb-6">
									<User className="h-5 w-5 text-emerald-600 mr-2" />
									<h3 className="text-lg font-semibold text-gray-900">
										Employer's Information
									</h3>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											First Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.empfirstName}
											onChange={(e) =>
												handleInputChange('empfirstName', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Last Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.emplastName}
											onChange={(e) =>
												handleInputChange('emplastName', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Company <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.empcompany}
											onChange={(e) =>
												handleInputChange('empcompany', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Position <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.empposition}
											onChange={(e) =>
												handleInputChange('empposition', e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											placeholder="HR Assistant"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Address <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.empaddress}
											onChange={(e) =>
												handleInputChange('empaddress', e.target.value)
											}
											placeholder="321 Great Canadian Road"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											City, Province, Postal Code{' '}
											<span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.empcity}
											onChange={(e) =>
												handleInputChange('empcity', e.target.value)
											}
											placeholder="Ottawa, ON, L9U 3W1"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>
								</div>
							</section>

							<section>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center">
										<Briefcase className="h-5 w-5 text-emerald-600 mr-2" />
										<h3 className="text-lg font-semibold text-gray-900">
											Job Description
										</h3>
									</div>
								</div>

								{formData.jobdescription.map((jobdescription, index) => (
									<div
										key={`job-${index}`}
										className="space-y-4"
									>
										<div>
											<textarea
												value={jobdescription.description}
												onChange={(e) =>
													handleArrayChange(
														'jobdescription',
														index,
														'description',
														e.target.value
													)
												}
												rows="3"
												placeholder="Paste job description here"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
												required
											/>
										</div>
									</div>
								))}
							</section>

							<section>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center">
										<UserRoundPen className="h-5 w-5 text-emerald-600 mr-2" />
										<h3 className="text-lg font-semibold text-gray-900">
											Personal Description
										</h3>
									</div>
								</div>

								{formData.description.map((description, index) => (
									<div
										key={`desc-${index}`}
										className="space-y-4"
									>
										<div>
											<textarea
												value={description.description}
												onChange={(e) =>
													handleArrayChange(
														'description',
														index,
														'description',
														e.target.value
													)
												}
												rows="3"
												placeholder="Describe your major, school, what year you are, your goals, soft and technical skills, and personal projects (e.g. Participated in a Hackathon in a team of four)"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
												required
											/>
										</div>
									</div>
								))}
							</section>

							<div className="flex justify-end">
								<button
									type="submit"
									className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 cursor-pointer"
								>
									Create Cover Letter
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
