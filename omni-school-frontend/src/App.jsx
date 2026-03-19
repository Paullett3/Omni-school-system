/**
 * 🏫 OMNI SCHOOL SYSTEM - APP.JSX
 * Updated: Added Security, Protected Routes, and JWT Handling
 */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import API from "./api"; // 👈 Use the axios bridge we created!
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentPortal from "./pages/ParentPortal";
import Login from "./components/Login"; // 👈 Add your new Login component
import "./App.css";

// 🔒 SECURITY GUARD: Redirects to login if no token is found
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [students, setStudents] = useState([]);

  // 📡 FETCH STUDENTS (Using the API bridge)
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // This uses the 'API' bridge which already has the Token!
        const res = await API.get("/students"); 
        setStudents(res.data);
      } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", "❌ Fetch Error:", err.response?.data?.message || err.message);
      }
    };

    // Only fetch if a token exists
    if (localStorage.getItem('token')) {
      fetchStudentsData();
    }
  }, []);

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
      console.log("\x1b[32m%s\x1b[0m", "🗑️ Student removed successfully");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Router>
      <div className="app-main">
        <Navbar />
        <div className="container">
          <Routes>
            {/* 🚪 PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/parent-login" element={<ParentPortal />} />

            {/* 🛡️ PROTECTED ADMIN/TEACHER ROUTES */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <h1>🏫 Admin: Omni School Management</h1>
                <StudentList students={students} deleteStudent={deleteStudent} />
              </ProtectedRoute>
            } />

            <Route path="/teacher" element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            } />

            {/* 🏠 DEFAULT REDIRECT */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;