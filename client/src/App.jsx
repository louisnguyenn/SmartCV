import './App.css';
import './index.css';
import { Link } from 'react-router-dom';

function App() {
	return (
		<>
			<div className="md:flex flex-col items-center justify-center py-10">
				<div className="mt-15">
					<h1 className="text-8xl text-gray-400">SmartCV</h1>
				</div>

				<div className="flex items-center justify-between space-x-14 py-15">
					<Link to="/createresume">
						<div className="w-64 h-64 border-2 border-emerald-600 bg-gray-50 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
							<h2 className="text-xl p-10 pt-36 text-gray-700 text-center">
								Create Resume
							</h2>
						</div>
					</Link>

					<Link to="/gencoverletter">
						<div className="w-64 h-64 border-2 border-emerald-600 bg-gray-50 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
							<h2 className="text-xl p-10 pt-36 text-gray-700 text-center">Create Cover Letter</h2>
						</div>
					</Link>

					<Link to="/tailorresume">
						<div className="w-64 h-64 border-2 border-emerald-600 bg-gray-50 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
							<h2 className="text-xl p-10 pt-36 text-gray-700 text-center">Tailor Resume</h2>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export default App;
