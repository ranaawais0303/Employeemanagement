import React, { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar";
import { useDispatch } from "react-redux";
import { addRow } from "./reduxStore/calendarSlice";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const popupRef = useRef(null);
  const dispatch = useDispatch();

  const handleFocus = () => {
    setShowPopup(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowPopup(false);
  };

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowPopup(false);
    }
  };

  const handleAddRow = (event) => {
    event.preventDefault();
    dispatch(addRow({ date: selectedDate, value: value }));
    setSelectedDate("");
    setValue("");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleAddRow}>
        <div className="input-container" ref={popupRef}>
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            ref={inputRef}
            onFocus={handleFocus}
            value={selectedDate}
            readOnly
            placeholder="Select a date"
          />
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>
            </div>
          )}
        </div>
        <input
          style={{ marginLeft: "5px" }}
          type="text"
          placeholder="Enter value"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
        <div>
          <button type="submit" disabled={!selectedDate || !value}>
            submit
          </button>
        </div>
      </form>
      <Table />
    </div>
  );
}

export default App;
