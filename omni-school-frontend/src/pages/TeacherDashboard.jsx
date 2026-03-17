import React from 'react';
import { FaClipboardCheck } from 'react-icons/fa';

const TeacherDashboard = () => {
  return (
    <div className="container">
      <h1><FaClipboardCheck /> Teacher Attendance Dashboard</h1>
      <p>Update daily class attendance and student performance here.</p>
      {/* Attendance logic will go here */}
    </div>
  );
};

export default TeacherDashboard;