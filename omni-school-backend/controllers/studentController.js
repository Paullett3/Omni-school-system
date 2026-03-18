// controllers/studentController.js
import Student from '../models/Student.js';

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('parent', 'name email')
      .populate('teacher', 'name email');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student (with performance)
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      admissionNumber,
      grade,
      performance = {}, // { math: 80, english: 76, science: 90 }
      parent,
      teacher
    } = req.body;

    const student = new Student({
      name,
      admissionNumber,
      grade,
      performance,
      parent,
      teacher
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// (Optional) Get one student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('parent')
      .populate('teacher');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};