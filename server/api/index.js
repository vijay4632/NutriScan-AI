import { app } from '../app.js';
import { connectDB } from '../config/db.js';

let dbInitialized = false;

async function ensureDatabase() {
  if (!dbInitialized) {
    await connectDB();
    dbInitialized = true;
  }
}

export default async function handler(req, res) {
  await ensureDatabase();
  return app(req, res);
}
