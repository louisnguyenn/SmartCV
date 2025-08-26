import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateResume } from './pages/CreateResume';
import { CreateCoverLetter } from "./pages/CreateCoverLetter";
import { ATSScan } from "./pages/ATSScan";

function routes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/createresume"
				element={<CreateResume />}
			/>
			<Route
				path="/createcoverletter"
				element={<CreateCoverLetter />}
			/>
			<Route
				path="/atsscan"
				element={<ATSScan />}
			/>
		</Routes>
	);
}

export default routes;
