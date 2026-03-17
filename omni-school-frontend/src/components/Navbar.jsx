import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaClipboardCheck, FaUserFriends, FaSchool } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaSchool className="logo-icon" /> 
        <span>Omni School</span>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/admin" className="nav-item">
            <FaUserShield /> 
            <span>Admin</span>
          </Link>
        </li>
        <li>
          <Link to="/teacher" className="nav-item">
            <FaClipboardCheck /> 
            <span>Attendance</span>
          </Link>
        </li>
        <li>
          <Link to="/parent-login" className="nav-item">
            <FaUserFriends /> 
            <span>Parents</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;