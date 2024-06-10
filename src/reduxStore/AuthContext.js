// src/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const signup = (email, password) => {
    if (users.some((user) => user.email === email)) {
      setError("User already exists");
      return error;
    }
    const newUser = { email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setError(null);
    return null;
  };

  const login = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      setError(null);
      return null;
    }
    setError("Invalid email or password");
    return error;
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, clearError, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
