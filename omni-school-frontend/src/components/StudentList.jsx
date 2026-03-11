/**
 * PROJECT: Omni School System
 * COMPONENT: StudentList
 * DESCRIPTION: Displays students in a clean, colorful table.
 */

import React from 'react';

const StudentList = ({ students, deleteStudent }) => {
  return (
    <div style={containerStyle}>
      <h3 style={{color: '#2c3e50'}}>📋 Student Roster</h3>
      <table style={tableStyle}>
        <thead>
          <tr style={headerStyle}>
            <th>Name</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={rowStyle}>
              <td>{s.name}</td>
              <td>{s.room}</td>
              <td>
                <button onClick={() => deleteStudent(s.id)} style={deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const containerStyle = { marginTop: '20px', padding: '15px', background: '#fff', borderRadius: '8px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const headerStyle = { background: '#f8f9fa', textAlign: 'left' };
const rowStyle = { borderBottom: '1px solid #eee' };
const deleteBtn = { color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' };

export default StudentList;