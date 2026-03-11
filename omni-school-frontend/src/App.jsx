import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('omni_data');
    return saved ? JSON.parse(saved) : [];
  });

  // Logic to delete (Keep it in the parent!)
  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1>🏫 Omni School Management</h1>
      {/* Passing data down as PROPS */}
      <StudentList students={students} deleteStudent={deleteStudent} />
    </div>
  );
}

export default App;