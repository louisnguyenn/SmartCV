import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export const Navbar = () => {
	return (
		<nav>
			<Link to="/">
				<div className="flex gap-1 items-center p-5 text-gray-700 font-medium hover:text-gray-500 transition-colors duration-300 cursor-pointer">
					<ArrowLeft size={16} />
					<h2>Home</h2>
				</div>
			</Link>
		</nav>
	);
};
