import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createResumeRoutes from "./routes/createResumeRoutes";
import createCoverLetterRoutes from "./routes/createCoverLetterRoutes";
import atsScanRoutes from "./routes/atsScanRoutes";

const app = express();
const corsOptions = {
	origin: ['http://localhost:5173'],
};

// middleware
app.use(cors(corsOptions)); // using the client local host to receive info from frontend
app.use(express.json()); // parsing json data

dotenv.config();

// health check
app.get('/', (req, res) => {
	console.log('Backend is running');
	res.json({ message: 'Backend is running' });
});

// routes
app.use('/api', createResumeRoutes);
app.use('/api', createCoverLetterRoutes);
app.use('/api', atsScanRoutes);

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
