/**
 * 🔐 AUTH CONTROLLER - OMNI SCHOOL SYSTEM
 * Handles User Registration and Login
 * ---------------------------------------
 */

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// 📝 1. REGISTER USER
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 🟢 CLEANER: We no longer hash here. The User Model middleware does it!
    const user = await User.create({ 
      name, 
      email, 
      password, // Send plain text; the model will hash it automatically
      role 
    });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: `❌ Registration Error: ${error.message}` });
  }
};

// 📝 2. LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // 🟢 CLEANER: Using the .matchPassword() method from the User Model
    if (user && (await user.matchPassword(password))) {
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
    res.status(500).json({ message: `❌ Login Error: ${error.message}` });
  }
};