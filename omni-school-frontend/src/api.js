/**
 * 🔗 API CONFIGURATION
 * Centralizes all Backend calls for the Omni School System
 */
import axios from 'axios';

// 1. Create instance with your Backend URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 2. AUTH INTERCEPTOR: Automatically attaches JWT to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 3. API ENDPOINTS
export const login = (formData) => API.post('/auth/login', formData);
export const fetchStudents = () => API.get('/students');
export const updateGrades = (id, data) => API.patch(`/students/${id}/performance`, data);

export default API;