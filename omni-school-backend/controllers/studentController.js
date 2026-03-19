/**
 * 🎓 STUDENT CONTROLLER
 * Handles CRUD operations and Performance tracking
 */
import Student from "../models/Student.js";

// 🔍 GET ALL STUDENTS
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("parent", "name email")
      .populate("teacher", "name email");

    console.log(`\x1b[32m%s\x1b[0m`, `✅ Fetched ${students.length} students.`);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: `❌ Fetch Error: ${error.message}` });
  }
};

// ➕ CREATE NEW STUDENT
export const createStudent = async (req, res) => {
  try {
    const { name, admissionNumber, grade, performance, parent, teacher } =
      req.body;

    const existingStudent = await Student.findOne({ admissionNumber });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Admission number already exists" });
    }

    const student = await Student.create({
      name,
      admissionNumber,
      grade,
      performance,
      parent,
      teacher,
    });

    console.log(`\x1b[34m%s\x1b[0m`, `👤 Student Created: ${name}`);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: `❌ Validation Error: ${error.message}` });
  }
};

// 🆔 GET SINGLE STUDENT BY ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("parent", "name email")
      .populate("teacher", "name email");

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📝 UPDATE STUDENT (General Info)
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📈 UPDATE PERFORMANCE (Specific Grades)
export const updatePerformance = async (req, res) => {
  try {
    const { math, english, science } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "performance.math": math,
          "performance.english": english,
          "performance.science": science,
        },
      },
      { new: true },
    );
    res.status(200).json(updatedStudent.performance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🗑️ DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
