import express from 'express';
import { addMeal, getMealHistory, deleteMeal } from '../controllers/mealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addMeal);
router.get('/history', protect, getMealHistory);
router.delete('/:id', protect, deleteMeal);

export default router;
