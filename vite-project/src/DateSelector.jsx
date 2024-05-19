import React, { useState, useEffect } from "react";
import axios from "axios";

const DateSelector = () => {
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Fetch today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    // Fetch date options for the select dropdown
    axios.get("http://localhost:3001/date-options")
      .then((response) => {
        setDateOptions(response.data);
        setSelectedDate(formattedDate);
      })
      .catch((error) => {
        console.error("Error fetching date options: ", error);
      });
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <label htmlFor="date">Select a Date:</label>
      <select id="date" value={selectedDate} onChange={handleDateChange}>
        {dateOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
