/**
 * 🏫 OMNI SCHOOL SYSTEM - BACKEND
 * Main Server Entry Point
 * ---------------------------------------
 * Note: Using ES Modules (import/export)
 */

// 1. 📂 IMPORT DEPENDENCIES
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 2. 📂 IMPORT LOCAL FILES
// ⚠️ In ES Modules, you MUST include the '.js' extension for local files
import connectDB from './config/db.js'; 
import authRoutes from './Routes/authRoutes.js';
import studentRoutes from './Routes/studentRoutes.js';

// 3. ⚙️ CONFIGURATION & PATHING
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the config folder
dotenv.config({ path: './config/.env' });

const app = express();

// 4. 🧩 MIDDLEWARE
app.use(cors());           // Allows frontend to talk to backend
app.use(express.json());   // Lets server read JSON in req.body

// 5. 🗄️ DATABASE CONNECTION
connectDB();

// 6. 🛣️ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// 🏠 Basic health-check route
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "success",
    message: "Omni School Backend is running smoothly 🚀" 
  });
});

// 7. 🚀 PRODUCTION PATHING (For Render/Deployment)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// 8. ⚡ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
  console.log(`\x1b[32m%s\x1b[0m`, `✅ Server is live on port: ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
});