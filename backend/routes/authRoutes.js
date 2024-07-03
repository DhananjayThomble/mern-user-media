import express from 'express';
import { createAccount, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/create-account', createAccount);
router.post('/login', login);

export default router;
