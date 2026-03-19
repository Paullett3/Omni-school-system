import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  grade: { type: String, required: true },
  performance: {
    math: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    science: { type: Number, default: 0 }
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Student', studentSchema);