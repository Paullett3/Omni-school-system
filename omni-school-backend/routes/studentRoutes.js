/**
 * 🛣️ STUDENT ROUTES
 * Defines access levels for student data and performance
 */
import express from 'express';
const router = express.Router();

// 📂 IMPORT CONTROLLERS
import {
  getStudents,
  createStudent,
  getStudentById,
  updatePerformance // 🟢 Added this import
} from '../controllers/studentController.js';

// 📂 IMPORT AUTH MIDDLEWARE
import { protect, authorize } from '../middleware/authMiddleware.js';

/**
 * 🔓 PUBLIC/PROTECTED ROUTES
 */

// 👨‍🏫 TEACHER/ADMIN ONLY: View all students or create a new student record
router.get('/', protect, authorize('teacher', 'admin'), getStudents);
router.post('/', protect, authorize('teacher', 'admin'), createStudent);

// 👤 PROTECTED: Any logged-in user can view a specific student (e.g., Parent viewing their child)
router.get('/:id', protect, getStudentById);

/**
 * 🎯 PERFORMANCE UPDATES
 * Only Teachers and Admins can modify grades
 */
router.patch(
  '/:id/performance', 
  protect, 
  authorize('teacher', 'admin'), 
  updatePerformance
);

export default router;