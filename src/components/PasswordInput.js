// src/components/PasswordInput.js
import React from "react";
// import "../components/Auth/AuthForm.css";
const PasswordInput = ({ label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        class="input"
        type="password"
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default PasswordInput;
