import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5500;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n NutriScan AI Server is running on port ${PORT}`);
    console.log(` API URL: http://localhost:${PORT}\n`);
  });
});
