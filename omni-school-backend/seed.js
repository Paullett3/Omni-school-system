/**
 * 🌱 DATABASE SEEDER (Fixed for DNS & Kenyan Data)
 * Purpose: Wipes the DB and populates sample Kenyan students.
 * ---------------------------------------
 */
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 🛑 1. BYPASS ECONNREFUSED (DNS Fix for local network issues)
dns.setServers(['8.8.8.8', '8.8.4.4']); 

// 📂 Import Models (Ensure .js extension is present)
import User from './models/User.js';
import Student from './models/Student.js';

// ⚙️ Environment Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, 'config', '.env') });

const seedData = async () => {
  try {
    // 🔍 Validate URI
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env file inside Backend/config/");
    }

    console.log('\x1b[36m%s\x1b[0m', '📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    
    // 🗑️ 2. CLEAR EXISTING DATA
    // This ensures we don't have duplicate admission numbers
    await User.deleteMany();
    await Student.deleteMany();
    console.log('\x1b[31m%s\x1b[0m', '🗑️  Existing records wiped clean.');

    // 👨‍🏫 3. CREATE DEFAULT TEACHER
    const teacher = await User.create({
      name: 'Mr. Otieno Juma',
      email: 'otieno@omnischool.ke',
      password: 'password123', // Will be hashed if you have pre-save middleware
      role: 'teacher'
    });

    // 🎓 4. KENYAN STUDENT DATASET
    const students = [
      {
        name: "Kelsey Chella",
        admissionNumber: "A001",
        grade: "Grade 8",
        performance: { math: 96, english: 55, science: 85 },
        teacher: teacher._id
      },
      {
        name: "Jabari Mwangi",
        admissionNumber: "A002",
        grade: "Grade 8",
        performance: { math: 78, english: 82, science: 88 },
        teacher: teacher._id
      },
      {
        name: "Zuri Zawadi",
        admissionNumber: "A003",
        grade: "Grade 7",
        performance: { math: 92, english: 90, science: 94 },
        teacher: teacher._id
      }
    ];

    // 📤 5. INSERT DATA
    await Student.insertMany(students);
    
    console.log('\x1b[32m%s\x1b[0m', `✅ Seeding complete! Added ${students.length} students.`);
    console.log('\x1b[34m%s\x1b[0m', `ℹ️  Login as Teacher with: otieno@omnischool.ke / password123`);
    
    process.exit();
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();