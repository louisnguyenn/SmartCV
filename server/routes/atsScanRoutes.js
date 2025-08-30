import express from 'express';

const router = express.Router();

router.post('/atsscan', (req, res) => {
	console.log('Scanning');
	res.json({ message: 'Scan completed' });
});

export default router;
