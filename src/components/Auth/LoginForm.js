import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../../reduxStore/authSlice";
import TextInput from "../TextInput";
import PasswordInput from "../PasswordInput";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
// import CalendarForm from "../CalendarForm";
// import Table from "../Table";

const LoginForm = ({ onSwitchToSignup, handleAddRow, setIndex }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // const [loggedIn, setLoggedIn] = useState(false); // Track login status

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
      dispatch(loginUser({ email, password }));
      // if (!authError) {
      //   setLoggedIn(true); // Set login status to true on successful login
      // }
    }
  };

  // Render CalendarForm and Table if loggedIn is true
  // if (loggedIn) {
  //   return (
  //     <div>
  //       <CalendarForm handleAddRow={handleAddRow} />
  //       <Table handleAddRow={handleAddRow} setIndex={setIndex} />
  //     </div>
  //   );
  // }

  // Render login form if not logged in
  return (
    <div className="auth-form">
      <h2>Login</h2>
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
        <button className="button" type="submit">
          Login
        </button>
        {authError && <div className="error-text">{authError}</div>}
      </form>
      <div
        className="switch-form-link"
        onClick={() => {
          navigate("signup");
          dispatch(clearError());
        }}
      >
        Don't have an account? Sign up
      </div>
      <div className="forgot-password">Forgot Password?</div>
    </div>
  );
};

export default LoginForm;
