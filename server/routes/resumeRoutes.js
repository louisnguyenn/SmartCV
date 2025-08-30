import express from 'express';
import { createResume } from '../controllers/resumeController.js';

const router = express.Router();

router.post('/createresume', createResume);

export default router;
