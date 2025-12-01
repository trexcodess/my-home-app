import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: './.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- MongoDB Connection ---
if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env.local");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected successfully (Service: mongo)'))
  .catch(err => {
    console.error('❌ MongoDB connection error. Check the "mongo" service in docker-compose.yml:');
    console.error(err);
    // Optionally exit the process if the database connection is critical
    // process.exit(1);
  });

// --- Middlewares ---
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// --- Example Route ---
app.get('/api/status', (req, res) => {
  res.json({ 
    message: 'Cloudship API is operational.',
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    service: 'Dispatch/Latitude Backend'
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`📡 Cloudship API listening on port ${PORT}`);
});