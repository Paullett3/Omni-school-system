/**
 * 🏫 OMNI SCHOOL SYSTEM - BACKEND
 * ---------------------------------------
 * Project: School Management System
 * Author: Paullette
 */

// 📂 1. LOAD ENV FIRST (Crucial for ES6)
import './config/loadEnv.js'; 

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 📂 2. IMPORT LOCAL FILES (Now MONGO_URI will be defined!)
import connectDB from './config/db.js'; 
import authRoutes from './Routes/authRoutes.js';
import studentRoutes from './Routes/studentRoutes.js';

// ⚙️ PATH CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- DEBUGGING CHECK ---
if (!process.env.MONGO_URI) {
    console.log('\x1b[31m%s\x1b[0m', '❌ CRITICAL ERROR: MONGO_URI is still undefined!');
} else {
    console.log('\x1b[32m%s\x1b[0m', '✅ MONGO_URI detected successfully.');
}

// 🧩 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🗄️ 4. DATABASE CONNECTION
connectDB();

// 🛣️ 5. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Omni School Backend is live 🚀" });
});

// ⚡ 6. SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
  console.log(`\x1b[32m%s\x1b[0m`, `✅ Server running on port: ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
});