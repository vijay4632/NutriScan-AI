import User from '../models/User.js';
import { localDb } from '../utils/localDb.js';

export const updateProfile = async (req, res) => {
  const { name, gender, age, height, weight, activityLevel, goal, profilePhoto } = req.body;

  try {
    const user = await localDb.findUserById(req.user._id, User);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Merge parameters with defaults to ensure calculations are valid numbers
    const finalGender = gender || user.gender || 'male';
    const finalAge = Number(age) || user.age || 25;
    const finalHeight = Number(height) || user.height || 175;
    const finalWeight = Number(weight) || user.weight || 70;
    const finalActivity = activityLevel || user.activityLevel || 'moderately_active';
    const finalGoal = goal || user.goal || 'maintain_weight';

    // 1. Calculate BMI = kg / (m)^2
    const heightInMeters = finalHeight / 100;
    const bmi = Number((finalWeight / (heightInMeters * heightInMeters)).toFixed(2));

    // 2. Calculate BMR (Harris-Benedict Equation)
    let bmr = 0;
    if (finalGender === 'male') {
      bmr = 88.362 + (13.397 * finalWeight) + (4.799 * finalHeight) - (5.677 * finalAge);
    } else {
      bmr = 447.593 + (9.247 * finalWeight) + (3.098 * finalHeight) - (4.330 * finalAge);
    }

    // 3. Activity Level Factor
    let activityFactor = 1.2; // sedentary
    if (finalActivity === 'lightly_active') activityFactor = 1.375;
    else if (finalActivity === 'moderately_active') activityFactor = 1.55;
    else if (finalActivity === 'very_active') activityFactor = 1.725;

    let dailyCalorieNeeds = bmr * activityFactor;

    // 4. Adjust according to Fitness Goal
    let targetCalories = Math.round(dailyCalorieNeeds);
    if (finalGoal === 'weight_loss') {
      targetCalories = Math.round(dailyCalorieNeeds - 500);
    } else if (finalGoal === 'weight_gain') {
      targetCalories = Math.round(dailyCalorieNeeds + 500);
    }

    // Never drop target calories below safe threshold (e.g. 1200)
    if (targetCalories < 1200) targetCalories = 1200;

    const updateData = {
      name: name || user.name,
      gender: finalGender,
      age: finalAge,
      height: finalHeight,
      weight: finalWeight,
      activityLevel: finalActivity,
      goal: finalGoal,
      targetCalories,
      bmi,
      profilePhoto: profilePhoto !== undefined ? profilePhoto : user.profilePhoto,
    };

    const updatedUser = await localDb.updateUser(req.user._id, updateData, User);

    res.status(200).json({
      success: true,
      message: 'Profile updated and goals calculated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    const user = await localDb.findUserById(req.user._id, User);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get today's logged meals
    const meals = await localDb.findMealsByUserId(req.user._id, User);
    
    // Filter for today's meals (GMT/local date matching)
    const today = new Date().toDateString();
    const todayMeals = meals.filter(m => new Date(m.createdAt).toDateString() === today);

    // Accumulate total nutrients consumed today
    const stats = todayMeals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein || 0;
        acc.carbs += meal.carbs || 0;
        acc.fats += meal.fats || 0;
        acc.fiber += meal.fiber || 0;
        acc.sugar += meal.sugar || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 }
    );

    // Math roundings
    stats.calories = Math.round(stats.calories);
    stats.protein = Math.round(stats.protein * 10) / 10;
    stats.carbs = Math.round(stats.carbs * 10) / 10;
    stats.fats = Math.round(stats.fats * 10) / 10;
    stats.fiber = Math.round(stats.fiber * 10) / 10;
    stats.sugar = Math.round(stats.sugar * 10) / 10;

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          goal: user.goal,
          targetCalories: user.targetCalories,
          bmi: user.bmi,
          weight: user.weight,
        },
        todayConsumption: stats,
        todayMealsCount: todayMeals.length,
      },
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
