/**
 * 🎴 REUSABLE CARD WRAPPER
 */
import React from "react";

const Card = ({ children, className = "", hoverable = false }) => {
  return (
    <div
      className={`card-container ${hoverable ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
