/**
 * 🌱 DATABASE SEEDER
 * Populates the Omni School System with Kenyan Student Data
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 📂 Import Models
import User from "./models/User.js";
import Student from "./models/Student.js";

// ⚙️ Load Environment Variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "config", ".env") });

const seedData = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("\x1b[35m%s\x1b[0m", "🛰️ Connected to MongoDB for seeding...");

    // 2. Clear existing data (Be careful!)
    await User.deleteMany();
    await Student.deleteMany();
    console.log("\x1b[31m%s\x1b[0m", "🗑️ Old data cleared.");

    // 3. Create a Default Teacher (Every student needs a teacher reference)
    const teacher = await User.create({
      name: "Mr. Otieno Juma",
      email: "otieno@omnischool.ke",
      password: "password123", // Note: In a real app, hash this first!
      role: "teacher",
    });

    // 4. Kenyan Student Dataset
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
      {
        name: "Amani Nyong'o",
        admissionNumber: "A004",
        grade: "Grade 8",
        performance: { math: 65, english: 70, science: 60 },
        teacher: teacher._id,
      },
    ];

    // 5. Insert into Database
    await Student.insertMany(students);

    console.log(
      "\x1b[32m%s\x1b[0m",
      `✅ Successfully seeded ${students.length} Kenyan students!`,
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      `👨‍🏫 Default Teacher created: ${teacher.email}`,
    );

    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
