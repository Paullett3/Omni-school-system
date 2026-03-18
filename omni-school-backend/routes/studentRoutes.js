// routes/studentRoutes.js
import express from 'express';
const router = express.Router();

import {
  getStudents,
  createStudent,
  getStudentById
} from '../controllers/studentController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

// Public or protected depending on your needs
router.get('/', protect, authorize('teacher', 'admin'), getStudents);
router.post('/', protect, authorize('teacher', 'admin'), createStudent);
router.get('/:id', protect, getStudentById);

export default router;