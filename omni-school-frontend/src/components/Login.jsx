/**
 * 🛡️ LOGIN COMPONENT
 * Handles Teacher/Parent authentication
 */
import React, { useState } from 'react';
import { login } from '../api'; // Import our bridge
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🚀 Send login request to Backend
      const { data } = await login(formData);
      
      // 💾 Save Token and Role to LocalStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      
      console.log('\x1b[32m%s\x1b[0m', '✅ Login Successful!');
      navigate('/dashboard'); // Send user to the student list
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('\x1b[31m%s\x1b[0m', '❌ Auth Error:', err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-2xl rounded-xl w-96 border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Omni School</h2>
        
        {error && <p className="p-2 mb-4 text-sm text-red-600 bg-red-50 rounded text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            required
            className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;