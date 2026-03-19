/**
 *  DATABASE SEEDER - Omni School (Final Version)
 * Run once: node seed.js
 */
import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import User from "./models/User.js";
import Student from "./models/Student.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "config", ".env") });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await User.deleteMany();
    await Student.deleteMany();

    // ADMIN WITH REAL PASSWORD 123456
    await User.create({
      name: "System Admin",
      email: "admin@omnischool.ke",
      password: "123456", // ← hashed automatically by User model
      role: "admin",
    });

    console.log("✅ Default Admin created: admin@omnischool.ke / 123456");

    // Other dev accounts (optional)
    await User.create({
      name: "Mr. Otieno Juma",
      email: "teacher@omnischool.ke",
      password: "123456",
      role: "teacher",
    });

    console.log("✅ Seeding complete! Admin ready.");
    process.exit();
  } catch (error) {
    console.error("❌ Seed Error:", error.message);
    process.exit(1);
  }
};

seedData();
