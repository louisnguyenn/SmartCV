import express from 'express';
import cors from 'cors';

const app = express();
const corsOptions = {
	origin: ['https://localhost:5173'],
};

// using the client local host to receive info from frontend
app.use(cors(CorsOptions));

// method to download files
// res.download('server.js');

app.get('/api', (req, res) => {});

app.listen(3000);
