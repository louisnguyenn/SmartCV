import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateResume } from './pages/CreateResume';
import { GenCoverLetter } from '.pages/GenCoverLetter';
import { TailorResume } from '.pages/TailorResume';

function routes() {
	return (
		<>
			<BrowserRouter>
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
						path="/gencoverletter"
						element={<GenCoverLetter />}
					/>

					<Route
						path="/tailorresume"
						element={<TailorResume />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default routes;
