import Meal from '../models/Meal.js';
import { localDb } from '../utils/localDb.js';

export const addMeal = async (req, res) => {
  const { foodName, calories, protein, carbs, fats, fiber, sugar, quantity, imageUrl, mealType, vitamins, minerals } = req.body;

  try {
    if (!foodName || !calories || !mealType) {
      return res.status(400).json({ success: false, message: 'Please provide food name, calories, and meal type' });
    }

    const mealData = {
      userId: req.user._id,
      foodName,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
      fiber: Number(fiber) || 0,
      sugar: Number(sugar) || 0,
      quantity: quantity || '1 serving',
      imageUrl: imageUrl || '',
      mealType: mealType.toLowerCase(),
      vitamins: vitamins || {},
      minerals: minerals || {},
    };

    const newMeal = await localDb.createMeal(mealData, Meal);

    res.status(201).json({
      success: true,
      message: 'Meal logged successfully!',
      data: newMeal,
    });
  } catch (error) {
    console.error('Add meal error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMealHistory = async (req, res) => {
  try {
    const meals = await localDb.findMealsByUserId(req.user._id, Meal);
    res.status(200).json({
      success: true,
      count: meals.length,
      data: meals,
    });
  } catch (error) {
    console.error('Get meal history error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeal = await localDb.deleteMeal(id, req.user._id, Meal);
    if (!deletedMeal) {
      return res.status(404).json({ success: false, message: 'Meal log not found or unauthorized' });
    }

    res.status(200).json({
      success: true,
      message: 'Meal entry deleted successfully',
      data: deletedMeal,
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
