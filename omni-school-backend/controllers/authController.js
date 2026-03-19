/**
 * 🔐 AUTH CONTROLLER (DEVELOPMENT BYPASS)
 * ---------------------------------------
 */
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    // 🔍 Find user by email (Ignore password check for dev)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found. Ensure you seeded the database!' });
    }

    // 🎟️ Generate token based only on email existence
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // 🎨 Colorful log to show who logged in
    console.log(`\x1b[36m%s\x1b[0m`, `🚀 Dev Login: ${user.name} logged in as ${user.role.toUpperCase()}`);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};