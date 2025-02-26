// src/SignupForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // For Redux
// import { signup, clearError } from "../../reduxStore/authSlice";
import {
  clearError,
  clearSuccess,
  signupUser,
} from "../../reduxStore/authSlice";
// import TextInput from "../TextInput";
// import PasswordInput from "../PasswordInput";
// import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import OutlinedCard from "../UI/OutlinedCard";
import CenteredWrapper from "../UI/CenteredWrapper";
import Input from "../UI/Input";
import { Typography } from "@mui/material";
import { styles } from "../../constants/constant";
import CustomButton from "../UI/CustomButton";
import { validateEmail } from "../../utils";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const authError = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleError = (input, errorMessage) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  //
  const validateForm = () => {
    if (!username) {
      handleError("username", "Username is required");
    }

    if (!email) {
      handleError("email", "Email is required");
    }
    const validemail = validateEmail(email);
    if (!validemail) {
      handleError("email", "Invalid email format");
    }
    if (!password) {
      handleError(password, "Required password");
    }
    if (password.length < 6) {
      handleError("password", "Password must be at least 6 characters");
    }
    if (email && password && password.length > 5 && username && validemail) {
      setError({});
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    dispatch(clearError());
    dispatch(clearSuccess());
    e.preventDefault();
    if (validateForm()) {
      dispatch(signupUser({ email, password }));
    }
  };

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
          Signup
        </Typography>
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
        <Input
          id="email-login"
          name="username"
          placeholder="Enter  username"
          type="email"
          value={username}
          error={error.username}
          required={true}
          onFocus={() => handleError("username", null)}
          label=" Username"
          htmlFor="username"
          changehandler={(e) => setUsername(e.target.value)}
          fullWidth
        />
        {authError && (
          <div style={{ color: "red", textAlign: "center" }}>{authError}</div>
        )}
        {success && (
          <div style={{ color: "green", textAlign: "center" }}>{success}</div>
        )}
        <CustomButton onClick={handleSubmit}>Signup</CustomButton>
        <div
          style={{ cursor: "pointer", color: "#14452F", textAlign: "center" }}
          onClick={() => {
            navigate("/login");
            dispatch(clearError());
          }}
        >
          Already have an account? Login
        </div>
      </OutlinedCard>
    </CenteredWrapper>
  );
};

export default SignupForm;
