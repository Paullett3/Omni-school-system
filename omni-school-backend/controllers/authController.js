/**
 * 🔐 AUTH CONTROLLER
 * Handles User Registration and Login for Omni School System
 * ---------------------------------------
 */

import User from '../models/User.js'; // 🟢 Added .js extension (Required in ES6)
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // 🛡️ Added for password security

// 📝 REGISTER USER
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password before saving (Security Best Practice)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the user with the hashed password
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role 
    });

    // 4. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    // 5. Send Response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: `\x1b[31m${error.message}\x1b[0m` });
  }
};

// 📝 LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email (Include password since it's hidden by default in the Model)
    const user = await User.findOne({ email }).select('+password');

    // 2. Compare entered password with hashed password in DB
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
      );

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};