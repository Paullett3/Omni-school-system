const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // Link to the User account (for Login)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  studentID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  currentClass: { type: String, required: true },
  
  // Requirement: Academic History
  grades: [{
    subject: String,
    score: Number,
    term: String
  }],
  
  // Requirement: Parent/Guardian Link
  parentName: String,
  parentContact: String
}, { timestamps: true });

// HUMAN NOTE: This makes searching by name super fast!
StudentSchema.index({ name: 'text' });

module.exports = mongoose.model('Student', StudentSchema);