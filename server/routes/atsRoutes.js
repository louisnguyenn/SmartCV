import express from 'express';
import { atsScan } from "../controllers/atsController.js";

const router = express.Router();

router.post('/atsscan', atsScan);

export default router;
