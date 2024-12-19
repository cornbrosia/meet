import { useState } from "react";
import React from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumber(value);

    if (isNaN(value) || value <= 0) {
      setErrorAlert("Enter a valid number");
    } else if (value > 32) {
      setErrorAlert("Only a maximum of 32 is allowed");
    } else {
      setErrorAlert("");
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
        placeholder="Enter number"
        data-testid="numberOfEventsInput"
      />
      {setErrorAlert && <p className="error-alert">{setErrorAlert}</p>}
    </div>
  );
};

export default NumberOfEvents;
