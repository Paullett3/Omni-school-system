import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

/**
 * @route   GET /api/students
 * @desc    Get all users with the role 'student'
 */
router.get('/', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

/**
 * @route   PUT /api/students/:id
 * @desc    Update student details
 */
router.put('/:id', async (req, res) => {
    try {
        const student = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).select('-password');
        
        console.log(`\x1b[33m%s\x1b[0m`, `📝 Student Updated: ${req.params.id}`);
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

/**
 * @route   DELETE /api/students/:id
 * @desc    Remove a student
 */
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        console.log(`\x1b[31m%s\x1b[0m`, `🗑️ Student Deleted: ${req.params.id}`);
        res.json({ message: "Student removed" });
    } catch (err) {
        res.status(400).json({ message: "Delete failed" });
    }
});

export default router;