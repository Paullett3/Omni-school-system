/**
 * 🎓 STUDENT MODEL
 * Defines academic records and links to Teachers and Parents
 * ---------------------------------------
 */
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  // 👤 Basic Information
  name: { 
    type: String, 
    required: [true, 'Please add a student name'],
    trim: true 
  },
  admissionNumber: { 
    type: String, 
    required: [true, 'Admission number is required'], 
    unique: true,
    uppercase: true // 🔠 Automatically converts "abc1" to "ABC1"
  },
  grade: { 
    type: String, 
    required: [true, 'Please specify a grade or class'] 
  },

  // 📈 Academic Performance (Used by updatePerformance route)
  performance: {
    math: { 
      type: Number, 
      default: 0,
      min: [0, 'Grade cannot be less than 0'],
      max: [100, 'Grade cannot exceed 100']
    },
    english: { 
      type: Number, 
      default: 0,
      min: 0, max: 100 
    },
    science: { 
      type: Number, 
      default: 0,
      min: 0, max: 100 
    }
  },

  // 🔗 Relationships (Linking to the User model)
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false // Optional if parent isn't registered yet
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'A teacher must be assigned to this student']
  }
}, {
  // 🕒 Adds 'createdAt' and 'updatedAt' fields automatically
  timestamps: true 
});

// ✨ Create and Export the Model
const Student = mongoose.model('Student', studentSchema);
export default Student;