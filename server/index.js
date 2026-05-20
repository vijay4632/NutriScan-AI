import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { localDb } from './utils/localDb.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

// Middleware imports
import { protect, admin } from './middleware/authMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/food', foodRoutes);

// Admin Routes (mounted directly for simplicity)
app.get('/api/admin/stats', protect, admin, async (req, res) => {
  try {
    const users = await localDb.getAllUsers();
    const meals = await localDb.getAllMeals();

    // Calculate analytics
    const totalUsers = users.length;
    const totalScans = meals.length;
    
    // Calorie averages
    const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const avgCalories = totalScans > 0 ? Math.round(totalCalories / totalScans) : 0;

    // Macro distributions
    const totalProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const totalCarbs = meals.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const totalFats = meals.reduce((sum, m) => sum + (m.fats || 0), 0);

    const macroDistribution = totalScans > 0 ? {
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats),
    } : { protein: 0, carbs: 0, fats: 0 };

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalScans,
        avgCalories,
        macroDistribution,
        users: users.map(u => ({
          _id: u._id,
          name: u.name,
          email: u.email,
          gender: u.gender,
          goal: u.goal,
          weight: u.weight,
          height: u.height,
          createdAt: u.createdAt,
        })),
        recentScans: meals.slice(0, 15).map(m => ({
          _id: m._id,
          foodName: m.foodName,
          calories: m.calories,
          mealType: m.mealType,
          confidence: m.confidence,
          createdAt: m.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Default Root Test Route
app.get('/', (req, res) => {
  res.send('NutriScan AI Server API is Running... 🟢');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5500;

// Start database then express app
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n NutriScan AI Server is running on port ${PORT}`);
    console.log(` Mode: ${localDb.isMongoDBConnected ? 'MongoDB Persisted' : 'Offline JSON Fallback (Seamless)'}`);
    console.log(` API URL: http://localhost:${PORT}\n`);
  });
});
