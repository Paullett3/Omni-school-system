/**
 * 🎓 INTERACTIVE STUDENT LIST
 * Features: Real-time search and hover animations.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaUserGraduate } from "react-icons/fa";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/students",
          config,
        );
        setStudents(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // 🧪 FILTER LOGIC: Updates as you type
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.includes(searchTerm),
  );

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="student-container">
      <div className="header-section">
        <h2 className="title">🎓 Student Records</h2>

        {/* 🔍 SEARCH BAR */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
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
              </div>
              <p>
                <strong>ID:</strong> {student.admissionNumber}
              </p>
              <div className="performance-box">
                <span>Math: {student.performance?.math}</span>
                <span>Eng: {student.performance?.english}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">
            No students found matching "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentList;



