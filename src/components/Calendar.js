import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { useSelector } from "react-redux";

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const { selectedDate } = useSelector((store) => store.calendar);

  useEffect(() => {
    if (selectedDate) {
      const dateParts = selectedDate.split("/");
      const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
      setCurrentDate(date);
      setSelectedDay(date.getDate());
    }
  }, [selectedDate]);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDateSelect(selectedDate.toLocaleDateString());
    setSelectedDay(day);
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDay;
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
