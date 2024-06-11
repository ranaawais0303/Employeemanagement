// src/components/TextInput.js
import React from "react";
import "../components/Auth/AuthForm.css";

const TextInput = ({ label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={error ? "input-error" : "input"}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default TextInput;
