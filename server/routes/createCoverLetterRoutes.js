import express from 'express';

const router = express.Router();

router.post('/createcoverletter', (req, res) => {
	console.log('Creating cover letter');
	res.json({ message: 'Cover letter created' });
});

export default router;
