import { Link } from 'react-router-dom';
import { FileText, FileSignature, Settings2 } from 'lucide-react';

export const Home = () => {
	return (
		<div className="md:flex flex-col items-center justify-center py-10">
			<div className="mt-15">
				<h1 className="text-7xl font-extrabold tracking-tight text-gray-700 drop-shadow-sm">
					<span className="text-emerald-600">Smart</span>CV
				</h1>
			</div>

			<div className="flex items-center justify-between space-x-14 py-15">
				<Link to="/createresume">
					<div className="w-64 h-64 border-2 border-emerald-600 bg-gray-50 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out">
						<FileText
							size={48}
							className="text-emerald-600 mb-4"
						/>
						<h2 className="text-xl text-gray-700 text-center font-medium">
							Create Resume
						</h2>
					</div>
				</Link>

				<Link to="/gencoverletter">
					<div className="w-64 h-64 border-2 border-emerald-600 bg-gray-50 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out">
						<FileSignature
							size={48}
							className="text-emerald-600 mb-4"
						/>
						<h2 className="text-xl text-gray-700 text-center font-medium">
							Create Cover Letter
						</h2>
					</div>
				</Link>

				<Link to="/tailorresume">
					<div className="w-64 h-64 border-2 border-emerald-600 bg-gray-50 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out">
						<Settings2
							size={48}
							className="text-emerald-600 mb-4"
						/>
						<h2 className="text-xl text-gray-700 text-center font-medium">
							Tailor Resume
						</h2>
					</div>
				</Link>
			</div>
		</div>
	);
};
