// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  error: null,
  success: null,
  loggedIn: localStorage.getItem("loggedIn") || false,
  isAdmin: localStorage.getItem("isAdmin") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      if (email === "admin@gmail.com" && password === "12345678") {
        state.error = null;
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("isAdmin", true);
        state.isAdmin = true;
        state.loggedIn = true;
        return;
      }
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.error = null;
        localStorage.setItem("loggedIn", true);
        state.loggedIn = true;
      } else {
        state.error = "Invalid email or password";
      }
    },
    signupUser: (state, action) => {
      const { email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);
      if (existingUser) {
        state.error = "User already exists";
      } else {
        state.success = "User successfully added";
        state.users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
      }
    },
    logOut: (state, action) => {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("isAdmin");
      state.isAdmin = false;
      state.loggedIn = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
});

export const { loginUser, signupUser, clearError, logOut, clearSuccess } =
  authSlice.actions;
export default authSlice.reducer;
