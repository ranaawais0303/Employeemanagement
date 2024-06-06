import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import { addValue, selectDate } from "../reduxStore/calendarSlice";

const CalendarForm = ({ handleAddRow }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { value, selectedDate } = useSelector((store) => store.calendar);

  const inputRef = useRef(null);
  const popupRef = useRef(null);
  const dispatch = useDispatch();

  const handleFocus = () => {
    setShowPopup(true);
  };

  const handleDateSelect = (date) => {
    dispatch(selectDate(date));
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
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
              <Calendar onDateSelect={handleDateSelect} />
            </div>
          </div>
        )}
      </div>
      <input
        style={{ marginLeft: "5px" }}
        type="text"
        placeholder="Enter value"
        onChange={(e) => {
          dispatch(addValue(e.target.value));
        }}
        value={value}
      />
      <div>
        <button type="submit" disabled={!selectedDate || !value}>
          submit
        </button>
      </div>
    </form>
  );
};

export default CalendarForm;
