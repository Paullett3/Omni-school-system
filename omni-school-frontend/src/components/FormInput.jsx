/**
 * ✍️ REUSABLE FORM INPUT
 */
import React from "react";

const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className={`form-input ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-text">⚠️ {error}</span>}
    </div>
  );
};

export default FormInput;

