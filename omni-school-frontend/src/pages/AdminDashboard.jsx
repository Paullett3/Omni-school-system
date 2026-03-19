/**
 * 🏫 ADMIN DASHBOARD - OMNI SCHOOL SYSTEM
 * Purpose: Provides a high-level overview of school stats.
 * Uses: Tailwind CSS for colorful, responsive styling.
 * ---------------------------------------
 */
import React from "react";
import { useNavigate } from "react-router-dom";

// 📥 Accepting 'students' prop from App.jsx
export default function AdminDashboard({ students = [] }) {
  const navigate = useNavigate();

  // 🚪 Logout Handler: Clears session and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-600 transition-all">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Admin Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome to the{" "}
            <span className="font-semibold text-blue-600">Omni School</span>{" "}
            Control Center.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md text-sm font-bold active:scale-95"
        >
          Logout
        </button>
      </div>

      {/* 📊 STAT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* 1. DYNAMIC STUDENT STATS */}
        <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 transition-transform hover:scale-105 shadow-sm">
          <p className="text-indigo-600 font-bold uppercase tracking-wider text-xs">
            Total Students
          </p>
          {/* 🚀 DYNAMIC DATA: Length of the students array */}
          <p className="text-4xl font-black text-slate-800">
            {students.length.toLocaleString()}
          </p>
          <div className="mt-2 text-xs text-indigo-500 font-medium">
            📡 Real-time from Database
          </div>
        </div>

        {/* 2. TEACHER STATS (Placeholder) */}
        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100 transition-transform hover:scale-105 shadow-sm">
          <p className="text-emerald-600 font-bold uppercase tracking-wider text-xs">
            Teachers Active
          </p>
          <p className="text-4xl font-black text-slate-800">1</p>
          <div className="mt-2 text-xs text-emerald-500 font-medium">
            🟢 All staff checked-in
          </div>
        </div>

        {/* 3. SYSTEM HEALTH */}
        <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 transition-transform hover:scale-105 shadow-sm">
          <p className="text-amber-600 font-bold uppercase tracking-wider text-xs">
            System Status
          </p>
          <p className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Stable
          </p>
          <div className="mt-2 text-xs text-amber-500 font-medium">
            Database: Connected ✅
          </div>
        </div>
      </div>
    </div>
  );
}
