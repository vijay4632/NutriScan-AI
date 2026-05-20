import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
  age: { type: Number, default: 25 },
  height: { type: Number, default: 175 }, // in cm
  weight: { type: Number, default: 70 },  // in kg
  activityLevel: { 
    type: String, 
    enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active'], 
    default: 'moderately_active' 
  },
  goal: { 
    type: String, 
    enum: ['weight_loss', 'weight_gain', 'maintain_weight'], 
    default: 'maintain_weight' 
  },
  targetCalories: { type: Number, default: 2000 },
  bmi: { type: Number },
  profilePhoto: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
