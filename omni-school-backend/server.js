/**
 * 🏫 OMNI SCHOOL SYSTEM - BACKEND
 * ---------------------------------------
 * Project: School Management System
 * Author: Paullette
 */

// 1. FORCE PUBLIC DNS RESOLUTION (fixes querySrv ECONNREFUSED)
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 

// 2. LOAD ENVIRONMENT VARIABLES 
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟢 FIX: Based on your screenshot, the path must include the 'config' folder
dotenv.config({ path: path.resolve(__dirname, 'config', '.env') });

// 3. DEBUG: Check if loaded BEFORE moving to imports
if (!process.env.MONGO_URI) {
  console.log('\x1b[31m%s\x1b[0m', '❌ CRITICAL: MONGO_URI is missing from config/.env');
  console.log('👉 Current Directory:', __dirname);
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ Environment variables loaded (MONGO_URI found)');
}

// 4. IMPORTS (Local files MUST be imported after dotenv.config)
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './Routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

// 🧩 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🗄️ DATABASE
// Note: connectDB will now have access to process.env.MONGO_URI
connectDB();

// 🛣️ ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Omni School Backend is live 🚀',
  });
});

// ⚡ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', '-----------------------------------------');
  console.log('\x1b[32m%s\x1b[0m', `✅ Server running on port: ${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', '-----------------------------------------');
});