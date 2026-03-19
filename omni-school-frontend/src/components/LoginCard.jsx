/**
 * 🔐 DEV LOGIN CARD
 * Feature: One-click bypass for Admin, Teacher, Student, and Parent roles.
 */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserFriends,
} from "react-icons/fa";
import "./LoginCard.css";

const LoginCard = () => {
  const navigate = useNavigate();

  // 🚀 Logic to bypass password and log in with specific email
  const handleDevLogin = async (roleEmail, targetRoute) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: roleEmail,
          // 💡 Password ignored by backend logic as per our previous setup
        },
      );

      if (response.data.token) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        console.log(`\x1b[32m%s\x1b[0m`, `✅ Logged in as: ${roleEmail}`);
        navigate(targetRoute);
      }
    } catch (error) {
      alert("Login Failed: Ensure your backend is running and DB is seeded!");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🏫 Omni School Login</h2>
        <p>Select a role to enter (Development Mode)</p>

        <div className="role-grid">
          {/* 🛡️ ADMIN */}
          <button
            className="role-btn admin"
            onClick={() => handleDevLogin("admin@omnischool.ke", "/admin")}
          >
            <FaUserShield /> <span>Admin</span>
          </button>

          {/* 👨‍🏫 TEACHER */}
          <button
            className="role-btn teacher"
            onClick={() => handleDevLogin("teacher@omnischool.ke", "/teacher")}
          >
            <FaChalkboardTeacher /> <span>Teacher</span>
          </button>

          {/* 🎓 STUDENT */}
          <button
            className="role-btn student"
            onClick={() => handleDevLogin("student@omnischool.ke", "/student")}
          >
            <FaUserGraduate /> <span>Student</span>
          </button>

          {/* 👪 PARENT */}
          <button
            className="role-btn parent"
            onClick={() =>
              handleDevLogin("parent@omnischool.ke", "/parent-dashboard")
            }
          >
            <FaUserFriends /> <span>Parent</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
