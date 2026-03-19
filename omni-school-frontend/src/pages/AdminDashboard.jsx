/**
 * 🏫 ADMIN DASHBOARD - OMNI SCHOOL SYSTEM
 * High-level overview for administrators.
 */
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 🚪 Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-600">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Overview</h1>
          <p className="text-slate-500">
            Welcome to the Omni School Control Center.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
        >
          Logout
        </button>
      </div>

      {/* 📊 Colorful Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Student Stats */}
        <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 transition-transform hover:scale-105">
          <p className="text-indigo-600 font-bold uppercase tracking-wider text-xs">
            Total Students
          </p>
          <p className="text-4xl font-black text-slate-800">1,240</p>
          <div className="mt-2 text-xs text-indigo-400">
            ↑ 12% from last term
          </div>
        </div>

        {/* Teacher Stats */}
        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100 transition-transform hover:scale-105">
          <p className="text-emerald-600 font-bold uppercase tracking-wider text-xs">
            Teachers Active
          </p>
          <p className="text-4xl font-black text-slate-800">84</p>
          <div className="mt-2 text-xs text-emerald-400">
            🟢 All systems online
          </div>
        </div>

        {/* System Health */}
        <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 transition-transform hover:scale-105">
          <p className="text-amber-600 font-bold uppercase tracking-wider text-xs">
            System Status
          </p>
          <p className="text-2xl font-black text-slate-800">Stable</p>
          <div className="mt-2 text-xs text-amber-400">Database: Connected</div>
        </div>
      </div>
    </div>
  );
}
