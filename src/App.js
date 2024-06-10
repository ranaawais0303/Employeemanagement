import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import CalendarForm from "./components/CalendarForm";
import { addRow } from "./reduxStore/calendarSlice";
import { useDispatch } from "react-redux";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import { clearError } from "./reduxStore/authSlice";

function App() {
  const [index, setIndex] = useState();
  const [showLogin, setShowLogin] = useState(true);

  const dispatch = useDispatch();

  const handleAddRow = (event) => {
    event.preventDefault();
    dispatch(addRow(index && { id: index }));
    setIndex(null);
  };

  return (
    <div className="App">
      {showLogin ? (
        <LoginForm
          handleAddRow={handleAddRow}
          onSwitchToSignup={() => {
            setShowLogin(false);
            dispatch(clearError());
          }}
        />
      ) : (
        <SignupForm
          onSwitchToLogin={() => {
            setShowLogin(true);
            dispatch(clearError());
          }}
        />
      )}
    </div>
  );
}

export default App;
