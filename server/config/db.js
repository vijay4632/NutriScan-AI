import mongoose from 'mongoose';
import { localDb } from '../utils/localDb.js';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/nutriscan';
    console.log(`Connecting to MongoDB...`);
    
    // Set low timeout so the server loads instantly if MongoDB is not running locally
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    localDb.isMongoDBConnected = true;
  } catch (error) {
    console.warn(`\n[WARNING] MongoDB connection failed: ${error.message}`);
    console.warn(`[SYSTEM] NutriScan AI will automatically fall back to high-fidelity local JSON database files located in server/data/`);
    console.warn(`[SYSTEM] No manual setup or database launching required. Live updates will persist locally!\n`);
    localDb.isMongoDBConnected = false;
  }
};
