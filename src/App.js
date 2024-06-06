import React from "react";
import "./App.css";
import Table from "./components/Table";
import CalendarForm from "./components/CalendarForm";

function App() {
  return (
    <div className="App">
      <CalendarForm />
      <Table />
    </div>
  );
}

export default App;
