import express from 'express';
import cors from 'cors';
import resumeRoutes from "./routes/resumeRoutes.js";
import coverLetterRoutes from "./routes/coverLetterRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";

const app = express();
const corsOptions = {
	origin: ['http://localhost:5173'],
};

// middleware
app.use(cors(corsOptions)); // using the client local host to receive info from frontend
app.use(express.json()); // parsing json data

// health check
app.get('/', (req, res) => {
	console.log('Backend is running');
	res.json({ message: 'Backend is running' });
});

// routes
app.use('/api', resumeRoutes);
app.use('/api', coverLetterRoutes);
app.use('/api', atsRoutes);

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
