import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import CalendarForm from "./components/CalendarForm";
import { addRow } from "./reduxStore/calendarSlice";
import { useDispatch } from "react-redux";

function App() {
  const [index, setIndex] = useState();

  const dispatch = useDispatch();

  const handleAddRow = (event) => {
    event.preventDefault();
    dispatch(addRow(index && { index }));
    setIndex(null);
  };

  return (
    <div className="App">
      <CalendarForm handleAddRow={handleAddRow} />
      <Table handleAddRow={handleAddRow} setIndex={setIndex} />
    </div>
  );
}

export default App;
