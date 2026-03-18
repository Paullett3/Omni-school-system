import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

const express = require('express');
const router = express.Router();

// Placeholder – replace with real controllers later
router.post('/register', (req, res) => res.json({ msg: 'Register endpoint' }));
router.post('/login', (req, res) => res.json({ msg: 'Login endpoint' }));

module.exports = router;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));