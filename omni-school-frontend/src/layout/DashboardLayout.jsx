import React from 'react';
import { Outlet } from 'react-router-dom'; // This renders the sub-pages
import Sidebar from '../components/Sidebar';

/**
 * DASHBOARD LAYOUT
 * Purpose: This is the "Frame" of the app. 
 * It keeps the Sidebar on the left and scrolls the content on the right.
 */
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-schoolLight">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto p-8">
        {/* The Outlet is where pages like "Attendance" or "Students" will appear */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}