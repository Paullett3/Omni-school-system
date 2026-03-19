// src/components/StudentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/students', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students Performance</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Admission No</th>
              <th className="px-6 py-3 text-left">Grade</th>
              <th className="px-6 py-3 text-center">Math</th>
              <th className="px-6 py-3 text-center">English</th>
              <th className="px-6 py-3 text-center">Science</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.admissionNumber}</td>
                <td className="px-6 py-4">{student.grade}</td>
                <td className="px-6 py-4 text-center">
                  {student.performance?.math ?? '-'}%
                </td>
                <td className="px-6 py-4 text-center">
                  {student.performance?.english ?? '-'}%
                </td>
                <td className="px-6 py-4 text-center">
                  {student.performance?.science ?? '-'}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No students found</p>
      )}
    </div>
  );
};

export default StudentList;