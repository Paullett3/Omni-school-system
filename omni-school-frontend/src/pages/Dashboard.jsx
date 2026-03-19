/**
 * 🎓 DASHBOARD COMPONENT
 * Displays the list of Kenyan students and their performance.
 */
import React, { useEffect, useState } from "react";
import API from "../api"; // Our Axios bridge with JWT support
import { FaUserGraduate, FaChartLine, FaTrashAlt } from "react-icons/fa";
import './App.css'; // 👈 This links the file

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📡 1. Fetch Students on Load
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const { data } = await API.get("/students");
        setStudents(data);
        setLoading(false);
        console.log("\x1b[32m%s\x1b[0m", "✅ Students loaded into UI");
      } catch (err) {
        setError("Failed to fetch students. Ensure you are logged in.");
        setLoading(false);
        console.error("\x1b[31m%s\x1b[0m", "❌ UI Fetch Error:", err.message);
      }
    };
    loadStudents();
  }, []);

  // 🗑️ 2. Delete Student Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      try {
        await API.delete(`/students/${id}`);
        setStudents(students.filter((s) => s._id !== id));
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">⏳ Loading Student Records...</div>
    );

  return (
    <div className="dashboard-container p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Omni School Management
          </h1>
          <p className="text-gray-600">Welcome back, Mr. Otieno Juma</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center gap-3">
          <FaUserGraduate className="text-blue-600 text-2xl" />
          <span className="font-bold text-blue-800">
            {students.length} Total Students
          </span>
        </div>
      </header>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {/* 📊 Student Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6">Adm No.</th>
              <th className="py-3 px-6">Student Name</th>
              <th className="py-3 px-6">Grade</th>
              <th className="py-3 px-6 text-center">Math</th>
              <th className="py-3 px-6 text-center">English</th>
              <th className="py-3 px-6 text-center">Science</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6 font-mono font-bold text-blue-600">
                  {student.admissionNumber}
                </td>
                <td className="py-3 px-6 font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="py-3 px-6 italic text-gray-500">
                  {student.grade}
                </td>

                {/* Math Score with Color Logic */}
                <td className="py-3 px-6 text-center font-bold">
                  <span
                    className={
                      student.performance.math >= 80
                        ? "text-green-600"
                        : "text-orange-500"
                    }
                  >
                    {student.performance.math}%
                  </span>
                </td>

                <td className="py-3 px-6 text-center font-bold">
                  {student.performance.english}%
                </td>
                <td className="py-3 px-6 text-center font-bold">
                  {student.performance.science}%
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && !error && (
        <div className="text-center p-10 text-gray-500">
          No students found. Did you run the <code>node seed.js</code> command?
        </div>
      )}
    </div>
  );
};

export default Dashboard;
