// src/App.jsx
import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';


import './App.css';
export {getEvents};

const App = () => {
 const [events, setEvents] = useState([]);
 const [currentNOE, setCurrentNOE] = useState(32);
 const [allLocations, setAllLocations] = useState([]);
 const [currentCity, setCurrentCity] = useState("See all cities");


 useEffect(() => {
  fetchData();
}, [currentCity]);


 const fetchData = async () => {
  const checkToken = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
   };
  const allEvents = await getEvents();
  const filteredEvents = currentCity === "See all cities" ?
    allEvents :
    allEvents.filter(event => event.location === currentCity)
  setEvents(filteredEvents.slice(0, currentNOE));
  setAllLocations(extractLocations(allEvents));
}
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
 };
const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }
 
 
  const token = await getAccessToken();
 
 
  if (token) {
    removeQuery();
    const url =  "YOUR_GET_EVENTS_API_ENDPOINT" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
 };

 
return (
  <div className="App">
    <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    <NumberOfEvents />
    <EventList events={events} />
  </div>
);
}
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
 
 
  return access_token;
 };
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));


 if (!accessToken || tokenCheck.error) {
   await localStorage.removeItem("access_token");
   const searchParams = new URLSearchParams(window.location.search);
   const code = await searchParams.get("code");
   if (!code) {
     const response = await fetch(
       "YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT"
     );
     const result = await response.json();
     const { authUrl } = result;
     return (window.location.href = authUrl);
   }
   return code && getToken(code);
 }
 return accessToken;

};
export default App;