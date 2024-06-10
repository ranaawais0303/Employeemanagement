// src/SignupForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // For Redux
// import { signup, clearError } from "../../reduxStore/authSlice";
import { signupUser } from "../../reduxStore/authSlice";
import TextInput from "../TextInput";
import PasswordInput from "../PasswordInput";
import "./AuthForm.css";

const SignupForm = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signupUser({ email, password }));
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={formErrors.password}
        />
        <button type="submit">Sign Up</button>
        {authError && <div className="error-text">{authError}</div>}
      </form>
      <div className="switch-form-link" onClick={onSwitchToLogin}>
        Already have an account? Login
      </div>
    </div>
  );
};

export default SignupForm;
