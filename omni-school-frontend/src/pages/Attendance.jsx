import React, { useState } from 'react';
import { Save, UserCheck } from 'lucide-react';

export default function Attendance() {
  // Local state (Will be replaced by Mongoose data later)
  const [students, setStudents] = useState([
    { id: '101', name: 'Alice Johnson', status: 'present' },
    { id: '102', name: 'Bob Smith', status: 'absent' },
  ]);

  const toggleStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <UserCheck className="text-schoolPrimary" /> Mark Attendance
        </h2>
        <button className="bg-schoolSecondary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
          <Save size={18} /> Save Records
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Student ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-4 font-mono text-sm">{student.id}</td>
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {['present', 'absent', 'late'].map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleStatus(student.id, s)}
                        className={`px-3 py-1 rounded-full text-xs capitalize ${
                          student.status === s 
                          ? 'bg-schoolPrimary text-white' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}