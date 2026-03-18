/**
 * 🏫 OMNI SCHOOL SYSTEM - BACKEND
 * ---------------------------------------
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 📂 IMPORT LOCAL FILES (Note the .js extension!)
import connectDB from './config/db.js'; 
import authRoutes from './Routes/authRoutes.js';
import studentRoutes from './Routes/studentRoutes.js';

// ⚙️ PATH CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config/.env' });

const app = express();

// 🧩 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🗄️ DATABASE
connectDB();

// 🛣️ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Omni School Backend is live 🚀" });
});

// ⚡ SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `✅ Server running on port: ${PORT}`);
});