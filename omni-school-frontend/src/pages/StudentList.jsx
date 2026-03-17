import React from 'react';
import { FaUserGraduate, FaChartLine, FaCheckCircle, FaTrash, FaCommentAlt } from 'react-icons/fa';
import './StudentList.css';

const StudentList = ({ students, deleteStudent }) => {
  return (
    <div className="student-grid">
      {students.map((student) => (
        <div key={student._id || student.id} className="student-card">
          <div className="card-header">
            <FaUserGraduate className="profile-icon" />
            <h3>{student.name}</h3>
          </div>

          <div className="performance-details">
            <div className="stat-row">
              <FaChartLine className="icon-silver" />
              <span>Grade: <strong>{student.grade || 'N/A'}</strong></span>
            </div>

            <div className="performance-bars">
              <p>Math: {student.performance?.math}%</p>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${student.performance?.math}%` }}></div>
              </div>
            </div>

            <div className="stat-row">
              <FaCheckCircle className="icon-silver" />
              <span>Attendance: {student.attendance?.length || 0} days</span>
            </div>

            <div className="comment-box">
              <FaCommentAlt className="icon-silver" />
              <p>"{student.comments?.[0] || 'No recent comments'}"</p>
            </div>
          </div>

          <button 
            className="btn-delete" 
            onClick={() => deleteStudent(student._id || student.id)}
          >
            <FaTrash /> Delete Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentList;