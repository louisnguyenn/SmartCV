import { Navbar } from '../components/Navbar';
import { useState, useEffect } from 'react';
import {
	Plus,
	Minus,
	User,
	GraduationCap,
	Briefcase,
	Award,
} from 'lucide-react';
import axios from 'axios';

export const CreateResume = () => {
	const [formData, setFormData] = useState({
		// Personal Info
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		linkedin: '',
		address: '',

		// Skills
		languages: '',
		frameworks: '',
		tools: '',

		// Education
		education: [
			{
				school: '',
				degree: '',
				year: '',
				gpa: '',
				coursework: '',
				awards: '',
			},
		],

		// Experience
		experience: [
			{
				company: '',
				position: '',
				startDate: '',
				endDate: '',
				description: '',
			},
		],

		// Projects
		projects: [{ name: '', technologies: '', description: '', link: '' }],
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
		if (section === 'education') {
			template = {
				school: '',
				degree: '',
				year: '',
				gpa: '',
				coursework: '',
				awards: '',
			};
		}
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

	const [createResume, setCreateResume] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	async function fetchAPI(formData) {
		setLoading(true);
		setSuccess(false);

		try {
			const response = await axios.post(
				'http://localhost:3000/api/createresume',
				formData
			);
			console.log(response.data);
			setCreateResume(response.data.resume);
			setSuccess(true);
		} catch (error) {
			console.error('Error fetching backend:', error);
		} finally {
			setLoading(false);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		// calling backend when form is submitted
		fetchAPI(formData);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<form onSubmit={handleSubmit}>
				<div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
					<div className="bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="px-6 py-4 bg-emerald-600 text-white">
							<h2 className="text-2xl font-bold">Create Your Resume</h2>
							<p className="text-emerald-100">
								Fill in your details to create a professional resume
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

							<section>
								<div className="flex items-center mb-6">
									<Award className="h-5 w-5 text-emerald-600 mr-2" />
									<h3 className="text-lg font-semibold text-gray-900">
										Technical Skills
									</h3>
								</div>

								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Programming Languages{' '}
											<span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.languages}
											onChange={(e) =>
												handleInputChange('languages', e.target.value)
											}
											placeholder="e.g., JavaScript, Python, Java, C++"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Frameworks & Libraries
										</label>
										<input
											type="text"
											value={formData.frameworks}
											onChange={(e) =>
												handleInputChange('frameworks', e.target.value)
											}
											placeholder="e.g., React, Node.js, Django, Spring Boot"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Tools & Technologies
										</label>
										<input
											type="text"
											value={formData.tools}
											onChange={(e) =>
												handleInputChange('tools', e.target.value)
											}
											placeholder="e.g., Git, Docker, AWS, MongoDB"
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
										/>
									</div>
								</div>
							</section>

							{/* Education */}
							<section>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center">
										<GraduationCap className="h-5 w-5 text-emerald-600 mr-2" />
										<h3 className="text-lg font-semibold text-gray-900">
											Education
										</h3>
									</div>
									<button
										type="button"
										onClick={() =>
											addArrayItem('education', {
												school: '',
												degree: '',
												year: '',
												gpa: '',
											})
										}
										className="flex items-center px-3 py-1 text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer"
									>
										<Plus className="h-4 w-4 mr-1" />
										Add Education
									</button>
								</div>

								{formData.education.map((edu, index) => (
									<div
										key={index}
										className="border border-gray-200 rounded-lg p-4 mb-4"
									>
										<div className="flex justify-between items-center mb-4">
											<h4 className="font-medium text-gray-900">
												Education {index + 1}
											</h4>
											{formData.education.length > 1 && (
												<button
													type="button"
													onClick={() => removeArrayItem('education', index)}
													className="text-red-600 hover:text-red-700"
												>
													<Minus className="h-4 w-4" />
												</button>
											)}
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													School/University{' '}
													<span className="text-red-500">*</span>
												</label>
												<input
													type="text"
													value={edu.school}
													onChange={(e) =>
														handleArrayChange(
															'education',
															index,
															'school',
															e.target.value
														)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Degree <span className="text-red-500">*</span>
												</label>
												<input
													type="text"
													value={edu.degree}
													onChange={(e) =>
														handleArrayChange(
															'education',
															index,
															'degree',
															e.target.value
														)
													}
													placeholder="e.g., Bachelor of Computing, Computer Science"
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Graduation Year{' '}
													<span className="text-red-500">*</span>
												</label>
												<input
													type="text"
													value={edu.year}
													onChange={(e) =>
														handleArrayChange(
															'education',
															index,
															'year',
															e.target.value
														)
													}
													placeholder="2024"
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													GPA (Optional)
												</label>
												<input
													type="text"
													value={edu.gpa}
													onChange={(e) =>
														handleArrayChange(
															'education',
															index,
															'gpa',
															e.target.value
														)
													}
													placeholder="3.8/4.0"
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
												/>
											</div>
										</div>
										<div className="mt-4">
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Relevant Coursework
											</label>
											<input
												type="text"
												value={edu.coursework} // Change from formData.coursework
												onChange={(e) =>
													handleArrayChange(
														'education',
														index,
														'coursework',
														e.target.value
													)
												}
												placeholder="e.g., Data Structures, Web Development"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											/>
										</div>

										<div className="mt-4">
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Scholarships and Awards
											</label>
											<input
												type="text"
												value={edu.awards} // Change from formData.awards
												onChange={(e) =>
													handleArrayChange(
														'education',
														index,
														'awards',
														e.target.value
													)
												}
												placeholder="e.g., Dean's List, Entrance Scholarship"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
											/>
										</div>
									</div>
								))}
							</section>

							{/* Experience */}
							<section>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center">
										<Briefcase className="h-5 w-5 text-emerald-600 mr-2" />
										<h3 className="text-lg font-semibold text-gray-900">
											Work Experience
										</h3>
									</div>
									<button
										type="button"
										onClick={() =>
											addArrayItem('experience', {
												company: '',
												position: '',
												startDate: '',
												endDate: '',
												description: '',
											})
										}
										className="flex items-center px-3 py-1 text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer"
									>
										<Plus className="h-4 w-4 mr-1" />
										Add Experience
									</button>
								</div>

								{formData.experience.map((exp, index) => (
									<div
										key={index}
										className="border border-gray-200 rounded-lg p-4 mb-4"
									>
										<div className="flex justify-between items-center mb-4">
											<h4 className="font-medium text-gray-900">
												Experience {index + 1}
											</h4>
											{formData.experience.length > 1 && (
												<button
													type="button"
													onClick={() => removeArrayItem('experience', index)}
													className="text-red-600 hover:text-red-700"
												>
													<Minus className="h-4 w-4" />
												</button>
											)}
										</div>

										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Company <span className="text-red-500">*</span>
													</label>
													<input
														type="text"
														value={exp.company}
														onChange={(e) =>
															handleArrayChange(
																'experience',
																index,
																'company',
																e.target.value
															)
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
														value={exp.position}
														onChange={(e) =>
															handleArrayChange(
																'experience',
																index,
																'position',
																e.target.value
															)
														}
														className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
														required
													/>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Start Date <span className="text-red-500">*</span>
													</label>
													<input
														type="month"
														value={exp.startDate}
														onChange={(e) =>
															handleArrayChange(
																'experience',
																index,
																'startDate',
																e.target.value
															)
														}
														className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
														required
													/>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														End Date <span className="text-red-500">*</span>
													</label>
													<input
														type="month"
														value={exp.endDate}
														onChange={(e) =>
															handleArrayChange(
																'experience',
																index,
																'endDate',
																e.target.value
															)
														}
														className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
														placeholder="Leave blank if current"
														required
													/>
												</div>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Description <span className="text-red-500">*</span>
												</label>
												<textarea
													value={exp.description}
													onChange={(e) =>
														handleArrayChange(
															'experience',
															index,
															'description',
															e.target.value
														)
													}
													rows="3"
													placeholder="Describe your responsibilities, achievements, and impact"
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
													required
												/>
											</div>
										</div>
									</div>
								))}
							</section>

							<section>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center">
										<Award className="h-5 w-5 text-emerald-600 mr-2" />
										<h3 className="text-lg font-semibold text-gray-900">
											Projects
										</h3>
									</div>
									<button
										type="button"
										onClick={() =>
											addArrayItem('projects', {
												name: '',
												technologies: '',
												description: '',
												link: '',
											})
										}
										className="flex items-center px-3 py-1 text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer"
									>
										<Plus className="h-4 w-4 mr-1" />
										Add Project
									</button>
								</div>

								{formData.projects.map((project, index) => (
									<div
										key={index}
										className="border border-gray-200 rounded-lg p-4 mb-4"
									>
										<div className="flex justify-between items-center mb-4">
											<h4 className="font-medium text-gray-900">
												Project {index + 1}
											</h4>
											{formData.projects.length > 1 && (
												<button
													type="button"
													onClick={() => removeArrayItem('projects', index)}
													className="text-red-600 hover:text-red-700"
												>
													<Minus className="h-4 w-4" />
												</button>
											)}
										</div>

										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Project Name <span className="text-red-500">*</span>
													</label>
													<input
														type="text"
														value={project.name}
														onChange={(e) =>
															handleArrayChange(
																'projects',
																index,
																'name',
																e.target.value
															)
														}
														className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
														required
													/>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Skills and Technologies Used{' '}
														<span className="text-red-500">*</span>
													</label>
													<input
														type="text"
														value={project.technologies}
														onChange={(e) =>
															handleArrayChange(
																'projects',
																index,
																'technologies',
																e.target.value
															)
														}
														placeholder="e.g., React, Node.js, MongoDB"
														className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
														required
													/>
												</div>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Project Link (GitHub, Demo, etc.)
												</label>
												<input
													type="url"
													value={project.link}
													onChange={(e) =>
														handleArrayChange(
															'projects',
															index,
															'link',
															e.target.value
														)
													}
													placeholder="https://github.com/username/project"
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Description <span className="text-red-500">*</span>
												</label>
												<textarea
													value={project.description}
													onChange={(e) =>
														handleArrayChange(
															'projects',
															index,
															'description',
															e.target.value
														)
													}
													rows="3"
													placeholder="Describe what the project does, your role, and key features"
													className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
													required
												/>
											</div>
										</div>
									</div>
								))}
							</section>

							<div className="flex justify-end">
								<button
									type="submit"
									className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 cursor-pointer"
								>
									Create Resume
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
