import express from 'express';
import { updateProfile, getDashboardSummary } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/update', protect, updateProfile);
router.get('/dashboard', protect, getDashboardSummary);

export default router;
