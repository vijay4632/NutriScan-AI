import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { localDb } from '../utils/localDb.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretnutriscanaijwtkey12345', {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    const userExists = await localDb.findUserByEmail(email, User);
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    let newUser;
    if (localDb.isMongoDBConnected) {
      newUser = await localDb.createUser({ name, email, password }, User);
    } else {
      // Manually hash password for flat file store
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      newUser = await localDb.createUser({
        name,
        email,
        password: hashedPassword,
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user' // auto-admin based on email for testing
      }, User);
    }

    res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id),
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await localDb.findUserByEmail(email, User);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    let isMatch = false;
    if (localDb.isMongoDBConnected) {
      // Find actual mongoose document to run schema method
      const mongooseUser = await User.findOne({ email });
      isMatch = await mongooseUser.matchPassword(password);
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        activityLevel: user.activityLevel,
        goal: user.goal,
        targetCalories: user.targetCalories,
        bmi: user.bmi,
        profilePhoto: user.profilePhoto,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await localDb.findUserById(req.user._id, User);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
