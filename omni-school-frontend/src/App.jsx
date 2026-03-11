/**
 * OMNI SCHOOL - MAIN APP COMPONENT
 * Purpose: This is the "Traffic Controller" of your frontend.
 * It decides which page to show based on the URL.
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import DashboardLayout from "./layout/DashboardLayout";
// Pages (We will create these files in the /pages folder)
import AdminDashboard from "./pages/AdminDashboard";
import StudentList from "./pages/StudentList";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Route: Everything inside here uses the DashboardLayout (Sidebar)
         */}
        <Route path="/" element={<DashboardLayout />}>
          {/* If the user just goes to "/", send them to "/dashboard" automatically */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Individual School Pages */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

        {/* Note: Later we will add an "AuthLayout" here for Login/Register 
          without the Sidebar showing! 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
