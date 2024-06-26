// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  error: null,
  loggedIn: localStorage.getItem("loggedIn") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;
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
        state.users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
      }
    },
    logOut: (state, action) => {
      localStorage.removeItem("loggedIn");
      state.loggedIn = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginUser, signupUser, clearError, logOut } = authSlice.actions;
export default authSlice.reducer;
