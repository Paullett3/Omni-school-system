import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; // For MERN backend connection
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentPortal from "./pages/ParentPortal";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  // MERN Logic: Fetch from MongoDB via Backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching data from MongoDB", err);
      }
    };
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
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
            <Route path="/admin" element={
              <>
                <h1>🏫 Admin: Omni School Management</h1>
                <StudentList students={students} deleteStudent={deleteStudent} />
              </>
            } />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/parent-login" element={<ParentPortal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;