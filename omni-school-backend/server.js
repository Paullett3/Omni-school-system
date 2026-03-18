/**
 * 🏫 OMNI SCHOOL SYSTEM - BACKEND
 * ---------------------------------------
 * Project: School Management System
 * Author: Paullette
 */

// 📂 1. LOAD ENV VARIABLES FIRST (Before any other imports)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 Explicitly point to your .env file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

// 🔎 DEBUG: Check if URI is loaded
if (!process.env.MONGO_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "❌ CRITICAL: MONGO_URI is missing from config/.env",
  );
} else {
  console.log(
    "\x1b[32m%s\x1b[0m",
    "📡 Environment variables loaded successfully.",
  );
}

// 📂 2. NOW IMPORT THE REST (Order matters for ES6!)
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js"; // 💡 Ensure folder name is capitalized exactly like this
import studentRoutes from "./Routes/studentRoutes.js";

const app = express();

// 🧩 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🗄️ 4. DATABASE CONNECTION
connectDB();

// 🛣️ 5. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Omni School Backend is live 🚀",
  });
});

// ⚡ 6. SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
  console.log(`\x1b[32m%s\x1b[0m`, `✅ Server running on port: ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `-----------------------------------------`);
});
