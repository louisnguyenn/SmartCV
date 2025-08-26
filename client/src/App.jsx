import './App.css';
import { Footer } from './components/Footer';
import './index.css';
import Routes from './routes';

function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow">
				<Routes />
			</main>
			<Footer />
		</div>
	);
}

export default App;
