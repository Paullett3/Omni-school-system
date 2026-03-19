/**
 * 🔘 REUSABLE BUTTON COMPONENT
 * Variants: primary, danger, outline
 */
import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseStyle = "btn-base"; // Define common styles in CSS
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
