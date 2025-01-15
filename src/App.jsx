import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import React from 'react';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState ("");
  console.log("Testing");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getEvents();
        const filteredEvents =
          currentCity === "See all cities"
            ? allEvents
            : allEvents.filter(event => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    // 🌐 Check if the user is online or offline
    if (navigator.onLine) {
      // ✅ Online: Clear any warning messages
      setWarningAlert("");
    } else {
      // ⚠️ Offline: Show a warning message
      setWarningAlert("You are currently offline. Displaying cached events.");
      console.log("Warning Here");
    }
  
    // 🚀 Fetch data (either from API or localStorage depending on the connection)
    fetchData();
  }, [currentCity, currentNOE]);
  
  

  return (
    <div className="App">
      <div className="alerts-container">
       {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
       {warningAlert && <WarningAlert text={warningAlert} />}
       {errorAlert && <ErrorAlert text={errorAlert} />}
     </div>
      <CitySearch 
      allLocations={allLocations} 
      setCurrentCity={setCurrentCity} 
      setInfoAlert={setInfoAlert} />
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <div className="charts-container">
      <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
      
      

    </div>
  );
};

export default App;
