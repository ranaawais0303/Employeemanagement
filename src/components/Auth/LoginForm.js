import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../../reduxStore/authSlice";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import OutlinedCard from "../UI/OutlinedCard";
import CustomButton from "../UI/CustomButton";
import CenteredWrapper from "../UI/CenteredWrapper";
import { styles } from "../../constants/constant";
import Input from "../UI/Input";
import { Typography } from "@mui/material";
// import CalendarForm from "../CalendarForm";
// import Table from "../Table";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleError = (input, errorMessage) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validateForm = () => {
    if (!email) {
      handleError("email", "Email is required");
    }
    const validemail = validateEmail(email);
    if (validemail) {
      handleError("email", "Invalid email format");
    }
    if (!password) {
      handleError(password, "Required password");
    }
    if (password.length < 6) {
      handleError("password", "Password must be at least 6 characters");
    }
    if (email && password && password.length > 5 && validemail) {
      setError({});
      return true;
    }
    return false;
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
    <CenteredWrapper>
      <OutlinedCard>
        <Typography
          variant="h4"
          justifyContent="center"
          textAlign="center"
          sx={{
            fontFamily: "serif",
            marginBottom: "4vh",
            marginTop: "2vh",
            color: styles.textGreen,
          }}
        >
          Login
        </Typography>
        {/* <form onSubmit={handleSubmit}> */}
        <Input
          id="email-login"
          name="email"
          placeholder="Enter email address"
          type="email"
          value={email}
          error={error.email}
          required={true}
          onFocus={() => handleError("email", null)}
          label=" Email Address"
          htmlFor="email-login"
          changehandler={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <Input
          id="-password-login"
          name="password"
          placeholder="Enter password"
          type="password"
          value={password}
          error={error.password}
          required={true}
          onFocus={() => handleError("password", null)}
          label=" Password"
          htmlFor="password"
          changehandler={(e) => setPassword(e.target.value)}
          fullWidth
          onClickHandler={() => {
            setShowPassword(!showPassword);
          }}
          showPassword={showPassword}
        />
        <div style={{ textAlign: "right", marginRight: 35, marginTop: 5 }}>
          Forgot Password?
        </div>
        <CustomButton onClick={handleSubmit}>Login</CustomButton>
        {authError && <div className="error-text">{authError}</div>}

        <div
          className="switch-form-link"
          onClick={() => {
            navigate("/signup");
            dispatch(clearError());
          }}
        >
          Don't have an account? Sign up
        </div>
      </OutlinedCard>
    </CenteredWrapper>
  );
};

export default LoginForm;
