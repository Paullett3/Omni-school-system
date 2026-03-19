/**
 * 🎓 INTERACTIVE STUDENT LIST (ADMIN VERSION)
 * Features: Search, Hover effects, and Admin-only Delete.
 * Fix: Dynamic API URL for Vercel Deployment.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaUserGraduate, FaTrashAlt } from "react-icons/fa";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 🛡️ Get current user info (token and role)
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.role === "admin";

  // 🌍 PRODUCTION FIX: Dynamic API Base URL
  // Uses /api for Vercel, or localhost for your computer
  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "/api";

  useEffect(() => {
    if (userInfo?.token) {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      // 🚀 Using dynamic API_BASE instead of hardcoded string
      const { data } = await axios.get(`${API_BASE}/students`, config);

      console.log(
        "%c✅ Data Fetched Successfully",
        "color: green; font-weight: bold;",
      );
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.log("%c❌ Fetch Error", "color: red;", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        // 🗑️ Admin-only delete action
        await axios.delete(`${API_BASE}/students/${id}`, config);

        console.log(
          `%c🗑️ Student Deleted: ${name}`,
          "color: orange; font-style: italic;",
        );
        setStudents(students.filter((s) => s._id !== id));
      } catch (error) {
        alert(
          "Failed to delete: " +
            (error.response?.data?.message || "Server Error"),
        );
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div className="loader">⏳ Loading Students...</div>;

  return (
    <div className="student-container">
      <div className="header-section">
        <h2 className="title">🎓 Student Records</h2>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search students..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="student-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student._id} className="student-card interactive">
              <div className="card-header">
                <FaUserGraduate className="grad-icon" />
                <h3>{student.name}</h3>

                {/* 🛡️ SECURITY CHECK: Only Admins see the Trash button */}
                {isAdmin && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student._id, student.name)}
                    title="Delete Student"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
              <p>
                <strong>ID:</strong> {student.admissionNumber}
              </p>
              <div className="performance-box">
                <span className="badge">
                  Math: {student.performance?.math || 0}
                </span>
                <span className="badge">
                  Eng: {student.performance?.english || 0}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No students found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
