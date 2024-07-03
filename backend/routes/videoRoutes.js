import express from 'express';
import { uploadVideo, getUserVideos } from '../controllers/videoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, uploadVideo);
router.get('/my-videos', authMiddleware, getUserVideos);

export default router;
