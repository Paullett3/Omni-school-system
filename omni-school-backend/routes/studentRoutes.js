/**
 * 🎓 STUDENT ROUTES
 * ---------------------------------------
 */
import express from 'express';
import { 
  getStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🛡️ Publicly accessible or protected? 
// Let's protect them as we discussed earlier.
router.route('/')
  .get(protect, getStudents) // 🟢 Only declared ONCE now
  .post(protect, authorize('admin', 'teacher'), createStudent);

router.route('/:id')
  .get(protect, getStudentById)
  .put(protect, authorize('admin', 'teacher'), updateStudent)
  .delete(protect, authorize('admin'), deleteStudent);

export default router;
