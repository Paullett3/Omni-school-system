/**
 * 🎓 STUDENT DATA VIEWER
 * Fetches and displays seeded student data from the MongoDB database.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Get the token from localStorage (saved during our Bypass Login)
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
        console.error("❌ Error fetching seeded data:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loader">Loading Seeded Students...</div>;

  return (
    <div className="student-container">
      <h2 className="title">🎓 Seeded Student Records</h2>
      <div className="student-grid">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <h3>{student.name}</h3>
            <p>
              <strong>ID:</strong> {student.admissionNumber}
            </p>
            <p>
              <strong>Grade:</strong> {student.grade}
            </p>
            <div className="performance-box">
              <span>Math: {student.performance?.math}%</span>
              <span>Sci: {student.performance?.science}%</span>
              <span>Eng: {student.performance?.english}%</span>
            </div>
            {/* Displaying populated data from the 'teacher' reference */}
            <p className="teacher-note">
              Assigned to: {student.teacher?.name || "TBA"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
