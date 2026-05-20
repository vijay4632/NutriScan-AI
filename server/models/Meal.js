import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  fiber: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  vitamins: { type: Map, of: String, default: {} },
  minerals: { type: Map, of: String, default: {} },
  quantity: { type: String, default: '1 serving' },
  imageUrl: { type: String, default: '' },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  confidence: { type: Number, default: 0.95 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Meal', MealSchema);
