/**
 * 📝 ADD STUDENT FORM
 * Location: client/src/components/AddStudent.jsx
 */
import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    admissionNumber: '',
    grade: '',
  });

  const { name, admissionNumber, grade } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}` 
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/students', formData, config);
      
      console.log(`\x1b[32m%s\x1b[0m`, `👤 New Student Added: ${data.name}`);
      alert("Student Added Successfully!");
      
      setFormData({ name: '', admissionNumber: '', grade: '' }); // Reset form
      if(onStudentAdded) onStudentAdded(); // Refresh the list automatically
    } catch (error) {
      alert(error.response?.data?.message || "Error adding student");
    }
  };

  return (
    <div className="add-student-card">
      <h3>➕ Register New Student</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" name="name" placeholder="Full Name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="admissionNumber" placeholder="Admission No (e.g. 2024-001)" value={admissionNumber} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="grade" placeholder="Class/Grade" value={grade} onChange={onChange} required />
        </div>
        <button type="submit" className="submit-btn">Add to Database</button>
      </form>
    </div>
  );
};

export default AddStudent;