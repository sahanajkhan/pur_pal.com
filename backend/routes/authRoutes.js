import express from 'express';
import { registerStudent, loginStudent } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerStudent);
router.post('/login', loginStudent);

export default router;
