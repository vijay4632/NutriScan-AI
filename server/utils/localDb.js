import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');

// Make sure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading database file for ${collection}:`, err);
    return [];
  }
};

const writeData = (collection, data) => {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing database file for ${collection}:`, err);
    return false;
  }
};

export const localDb = {
  isMongoDBConnected: false,

  // Users
  findUserById: async (id, UserMongooseModel) => {
    if (localDb.isMongoDBConnected && UserMongooseModel) {
      return await UserMongooseModel.findById(id).select('-password');
    }
    const users = readData('users');
    const user = users.find(u => u._id === id);
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  findUserByEmail: async (email, UserMongooseModel) => {
    if (localDb.isMongoDBConnected && UserMongooseModel) {
      return await UserMongooseModel.findOne({ email });
    }
    const users = readData('users');
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  createUser: async (userData, UserMongooseModel) => {
    if (localDb.isMongoDBConnected && UserMongooseModel) {
      const newUser = new UserMongooseModel(userData);
      return await newUser.save();
    }
    const users = readData('users');
    const newUser = {
      _id: 'usr_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      role: 'user',
      gender: 'male',
      age: 25,
      height: 175,
      weight: 70,
      activityLevel: 'moderately_active',
      goal: 'maintain_weight',
      targetCalories: 2000,
      bmi: 22.86,
      profilePhoto: '',
      ...userData,
    };
    users.push(newUser);
    writeData('users', users);
    return newUser;
  },

  updateUser: async (id, updateData, UserMongooseModel) => {
    if (localDb.isMongoDBConnected && UserMongooseModel) {
      return await UserMongooseModel.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    }
    const users = readData('users');
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updateData };
    writeData('users', users);
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  },

  // Meals
  findMealsByUserId: async (userId, MealMongooseModel) => {
    if (localDb.isMongoDBConnected && MealMongooseModel) {
      return await MealMongooseModel.find({ userId }).sort({ createdAt: -1 });
    }
    const meals = readData('meals');
    return meals
      .filter(m => m.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  findMealById: async (mealId, MealMongooseModel) => {
    if (localDb.isMongoDBConnected && MealMongooseModel) {
      return await MealMongooseModel.findById(mealId);
    }
    const meals = readData('meals');
    return meals.find(m => m._id === mealId) || null;
  },

  createMeal: async (mealData, MealMongooseModel) => {
    if (localDb.isMongoDBConnected && MealMongooseModel) {
      const newMeal = new MealMongooseModel(mealData);
      return await newMeal.save();
    }
    const meals = readData('meals');
    const newMeal = {
      _id: 'mel_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
      vitamins: {},
      minerals: {},
      imageUrl: '',
      quantity: '1 serving',
      confidence: 0.95,
      ...mealData,
    };
    meals.push(newMeal);
    writeData('meals', meals);
    return newMeal;
  },

  updateMeal: async (mealId, userId, updateData, MealMongooseModel) => {
    if (localDb.isMongoDBConnected && MealMongooseModel) {
      return await MealMongooseModel.findOneAndUpdate(
        { _id: mealId, userId },
        updateData,
        { new: true }
      );
    }
    const meals = readData('meals');
    const index = meals.findIndex(m => m._id === mealId && m.userId === userId);
    if (index === -1) return null;
    
    meals[index] = { ...meals[index], ...updateData };
    writeData('meals', meals);
    return meals[index];
  },

  deleteMeal: async (mealId, userId, MealMongooseModel) => {
    if (localDb.isMongoDBConnected && MealMongooseModel) {
      return await MealMongooseModel.findOneAndDelete({ _id: mealId, userId });
    }
    const meals = readData('meals');
    const index = meals.findIndex(m => m._id === mealId && m.userId === userId);
    if (index === -1) return null;
    
    const deletedMeal = meals[index];
    const filteredMeals = meals.filter((_, idx) => idx !== index);
    writeData('meals', filteredMeals);
    return deletedMeal;
  },

  // Admin Logs
  getAllUsers: async (UserMongooseModel) => {
    if (localDb.isMongoDBConnected && UserMongooseModel) {
      return await UserMongooseModel.find({}).select('-password');
    }
    const users = readData('users');
    return users.map(({ password, ...u }) => u);
  },

  getAllMeals: async (MealMongooseModel) => {
    if (localDb.isMongoDBConnected && MealMongooseModel) {
      return await MealMongooseModel.find({}).sort({ createdAt: -1 });
    }
    const meals = readData('meals');
    return meals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};
