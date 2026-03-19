/**
 * 🎓 INTERACTIVE STUDENT LIST (ADMIN VERSION)
 * Features: Search, Hover effects, and Admin-only Delete.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaUserGraduate, FaTrashAlt } from 'react-icons/fa'; // 🟢 Added Trash icon
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  // 🛡️ Get current user role from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo?.role === 'admin';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/students', config);
      setStudents(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 🗑️ DELETE FUNCTION (ADMIN ONLY)
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/students/${id}`, config);
        
        // 🎨 Colorful console log for tracking
        console.log(`\x1b[31m%s\x1b[0m`, `🗑️ Student Deleted: ${name}`);
        
        // Refresh list after deletion
        setStudents(students.filter(s => s._id !== id));
      } catch (error) {
        alert("Failed to delete: " + error.response?.data?.message);
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredStudents.map((student) => (
          <div key={student._id} className="student-card interactive">
            <div className="card-header">
              <FaUserGraduate className="grad-icon" />
              <h3>{student.name}</h3>
              
              {/* 🛡️ ADMIN ONLY DELETE BUTTON */}
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
            <p><strong>ID:</strong> {student.admissionNumber}</p>
            <div className="performance-box">
              <span>Math: {student.performance?.math}</span>
              <span>Eng: {student.performance?.english}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
