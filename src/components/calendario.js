import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendario-style.css";
import { useAppContext } from "../context/AppContext";

const CalendarioComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const { dateGlobal, setDateGlobal } = useAppContext();

  const onChange = (date) => {
    setDate(date);
    onDateChange(date);
    setDateGlobal(date);
    console.log("date --->", dateGlobal);
  };

  return (
    <div className="dark-mode">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarioComponent;
