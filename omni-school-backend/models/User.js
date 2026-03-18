/**
 * 👤 USER MODEL
 * Defines the schema for Users and Students in the Omni School System
 */
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'], // 🛑 Validation: Name is mandatory
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true, // 📧 Ensures no two users have the same email
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6, // 🔒 Security: Minimum 6 characters
    select: false // 🕵️‍♂️ Prevents password from being sent in API responses by default
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'], // 🏷️ Only these roles are allowed
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now // 📅 Automatically adds a timestamp
  }
});

// ✨ PRO TIP: Create the model and export it using ES6 syntax
const User = mongoose.model('User', UserSchema);

export default User;