import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRow } from "../reduxStore/calendarSlice";
import CalendarForm from "../components/CalendarForm";
import Table from "../components/Table";
const Task1 = () => {
  const [index, setIndex] = useState();
  const dispatch = useDispatch();

  const handleAddRow = (event) => {
    event.preventDefault();
    dispatch(addRow(index && { id: index }));
    setIndex(null);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <CalendarForm handleAddRow={handleAddRow} />
      <Table handleAddRow={handleAddRow} setIndex={setIndex} />
    </div>
  );
};

export default Task1;
