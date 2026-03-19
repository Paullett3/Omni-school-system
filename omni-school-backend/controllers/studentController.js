/**
 * 🎓 STUDENT CONTROLLER
 * Handles CRUD operations for Students
 * ---------------------------------------
 */

import Student from '../models/Student.js'; // 🟢 Ensure this file exists!

// 🔍 GET ALL STUDENTS
export const getStudents = async (req, res) => {
  try {
    // We use .populate to pull in linked User data for parents and teachers
    const students = await Student.find()
      .populate('parent', 'name email')
      .populate('teacher', 'name email');
    
    console.log(`\x1b[32m%s\x1b[0m`, `✅ Fetched ${students.length} students successfully.`);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: `❌ Error fetching students: ${error.message}` });
  }
};

// ➕ CREATE NEW STUDENT
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      admissionNumber,
      grade,
      performance = {}, 
      parent,
      teacher
    } = req.body;

    // Check if admission number already exists
    const existingStudent = await Student.findOne({ admissionNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Admission number already exists" });
    }

    const student = new Student({
      name,
      admissionNumber,
      grade,
      performance,
      parent,
      teacher
    });

    const savedStudent = await student.save();
    
    console.log(`\x1b[34m%s\x1b[0m`, `👤 Student Created: ${name} (${admissionNumber})`);
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: `❌ Validation Error: ${error.message}` });
  }
};

// 🆔 GET SINGLE STUDENT BY ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('parent', 'name email')
      .populate('teacher', 'name email');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    // Handle invalid MongoDB IDs
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid Student ID format' });
    }
    res.status(500).json({ message: error.message });
  }
};