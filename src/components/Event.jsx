import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li className="event">
      <div className="eventSummary">
        <h2>{event.summary}</h2>
        <p>{event.location}</p>
        <p>{event.created}</p>
      </div>
      {showDetails ? (
        <div className="eventDetails">
          <p>{event.description}</p>
        </div>
      ) : null}
      <button
        className="show-details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
