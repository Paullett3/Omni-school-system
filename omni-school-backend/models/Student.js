const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  grade: String,
  performance: {
    math: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    english: { type: Number, default: 0 }
  },
  attendance: [
    {
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' }
    }
  ],
  parentEmail: { type: String, required: true }, // Links to Parent login
  comments: [String]
});

module.exports = mongoose.model('Student', studentSchema);