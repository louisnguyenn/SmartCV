import express from 'express';
import { createCoverLetter } from "../controllers/coverLetterController.js";

const router = express.Router();

router.post('/createcoverletter', createCoverLetter);

export default router;
