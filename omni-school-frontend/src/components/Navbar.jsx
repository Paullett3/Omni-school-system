/**
 * 🧭 STUDENT NAVBAR COMPONENT
 * Features: React Icons, Navigation Links, and Omni School Branding
 */
import React from "react";
import { Link } from "react-router-dom";
// Importing specific icons requested
import {
  FaUserShield,
  FaClipboardCheck,
  FaUserFriends,
  FaSchool,
  FaUserGraduate,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* 🏫 BRAND LOGO */}
      <div className="logo">
        <FaSchool className="logo-icon" />
        <span>Omni School</span>
      </div>

      {/* 🔗 STUDENT NAVIGATION LINKS */}
      <ul className="nav-links">
        <li>
          <Link to="/student/profile" className="nav-item">
            <FaUserGraduate />
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/student/grades" className="nav-item">
            <FaClipboardCheck />
            <span>My Grades</span>
          </Link>
        </li>
        <li>
          <Link to="/parent-contact" className="nav-item">
            <FaUserFriends />
            <span>Parent Portal</span>
          </Link>
        </li>
        {/* 🔐 DEV ONLY: Shortcut back to Admin for testing */}
        <li>
          <Link to="/admin" className="nav-item admin-link">
            <FaUserShield />
            <span>Admin View</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
