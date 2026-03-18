// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  admissionNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  grade: {
    type: String,
    required: true,
    trim: true
  },
  // New: performance per subject
  performance: {
    math: { type: Number, min: 0, max: 100 },
    english: { type: Number, min: 0, max: 100 },
    science: { type: Number, min: 0, max: 100 },
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Student', studentSchema);