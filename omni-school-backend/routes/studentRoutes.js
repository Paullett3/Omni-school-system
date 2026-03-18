const express = require('express');
const router = express.Router();
const { getStudents, createStudent } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, authorize('teacher', 'admin'), getStudents)
  .post(protect, authorize('teacher', 'admin'), createStudent);

module.exports = router;
