/**
 * 🔒 USER MODEL ENHANCEMENT
 * Location: models/User.js
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // ... existing fields ...
  password: { type: String, required: true, select: false }
});

// 🔥 ENCRYPT: This runs every time a user is saved
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', userSchema);