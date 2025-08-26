import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export const Navbar = () => {
	return (
		<nav className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link to="/">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-700 hover:scale-103 transition-all duration-300 drop-shadow-sm">
							<span className="text-emerald-600">Smart</span>CV
						</h1>
					</Link>
				</div>
			</div>
		</nav>
	);
};
