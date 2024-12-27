import React, { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value <= 0) {
      setErrorAlert("Enter a valid number");
      setNumber(""); // Clear invalid input
    } else if (value > 32) {
      setErrorAlert("Only a maximum of 32 is allowed");
      setNumber(value);
    } else {
      setErrorAlert("");
      setNumber(value);
      setCurrentNOE(value);
    }
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        id="number-of-events-input"
        type="number"
        value={number}
        onChange={handleInputChanged}
        data-testid="numberOfEventsInput"
      />
    </div>
  );
};

export default NumberOfEvents;
