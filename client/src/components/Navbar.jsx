import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export const Navbar = () => {
	return (
		<nav className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link to="/">
							<div className="flex gap-2 items-center p-5 text-gray-700 font-medium hover:text-gray-500 hover:scale-105 transition-all duration-300 cursor-pointer">
								<ArrowLeft
									size={20}
									className="text-gray-900"
								/>
								<h1 className="text-xl font-semibold text-gray-900">Home</h1>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
