const Student = require('../models/Student');

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('parent', 'name email');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add getById, update, delete similarly...

module.exports = { getStudents, createStudent };