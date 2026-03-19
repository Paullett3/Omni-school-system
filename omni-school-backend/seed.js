/**
 *  DATABASE SEEDER (Omni School - Dev Version)
 * Purpose: Wipes the DB and populates Admin, Teacher, and Student accounts.
 * ---------------------------------------
 */
import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 🛑 1. BYPASS DNS ISSUES
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import User from "./models/User.js";
import Student from "./models/Student.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "config", ".env") });

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env file!");
    }

    console.log("\x1b[36m%s\x1b[0m", "📡 Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);

    // 🗑️ 2. CLEAR EXISTING DATA
    await User.deleteMany();
    await Student.deleteMany();
    console.log("\x1b[31m%s\x1b[0m", "🗑️  Existing records wiped clean.");

    // 🛡️ 3. CREATE DEV ACCOUNTS (Role Bypass Ready)
    console.log("\x1b[33m%s\x1b[0m", "👥 Creating System Accounts...");

    // ADMIN
    await User.create({
      name: "System Admin",
      email: "admin@omnischool.ke",
      password: "password_ignored",
      role: "admin",
    });

    // TEACHER
    const teacher = await User.create({
      name: "Mr. Otieno Juma",
      email: "teacher@omnischool.ke", // 🟢 Updated for bypass consistency
      password: "password_ignored",
      role: "teacher",
    });

    // STUDENT ACCOUNT (For Login)
    await User.create({
      name: "Kelsey Chella",
      email: "student@omnischool.ke", // 🟢 Updated for bypass consistency
      password: "password_ignored",
      role: "student",
    });

    // PARENT ACCOUNT
    await User.create({
      name: "Parent User",
      email: "parent@omnischool.ke",
      password: "password_ignored",
      role: "parent",
    });

    // 🎓 4. STUDENT RECORDS (Data for Dashboard)
    const students = [
      {
        name: "Kelsey Chella",
        admissionNumber: "A001",
        grade: "Grade 8",
        performance: { math: 96, english: 55, science: 85 },
        teacher: teacher._id,
      },
      {
        name: "Jabari Mwangi",
        admissionNumber: "A002",
        grade: "Grade 8",
        performance: { math: 78, english: 82, science: 88 },
        teacher: teacher._id,
      },
      {
        name: "Zuri Zawadi",
        admissionNumber: "A003",
        grade: "Grade 7",
        performance: { math: 92, english: 90, science: 94 },
        teacher: teacher._id,
      },
    ];

    await Student.insertMany(students);

    console.log(
      "\x1b[32m%s\x1b[0m",
      `✅ Seeding complete! Added ${students.length} students & 4 Dev Accounts.`,
    );
    console.log(
      "\x1b[34m%s\x1b[0m",
      `ℹ️  You can now use the One-Click Login for all roles!`,
    );

    process.exit();
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", `❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
