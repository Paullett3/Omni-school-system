import React from "react";
import { FaUserShield } from "react-icons/fa"; // Ensure react-icons is installed
import "./LoginCard.css";

const LoginCard = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* 🛡️ Icon for authority */}
        <div className="admin-icon-wrapper">
          <FaUserShield
            style={{ fontSize: "3rem", color: "#00f2ff", marginBottom: "15px" }}
          />
        </div>

        <h2>Admin Access</h2>
        <p>Omni School Secure Terminal</p>

        <form>
          <input type="email" className="form-input" placeholder="Admin ID" />
          <input
            type="password"
            className="form-input"
            placeholder="Passcode"
          />

          <button type="submit" className="btn-primary">
            Authorize Entry
          </button>
        </form>
      </div>
    </div>
  );
};
