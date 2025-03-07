# meet
# Meet App

## Project Description
Meet App is a **serverless**, **progressive web application** (PWA) built using **React** and **Test-Driven Development (TDD)** principles. The app uses the Google Calendar API to fetch and display upcoming events. It incorporates data visualization and offline functionality to enhance the user experience.

This project demonstrates modern web development practices such as serverless architecture, responsive design, and PWA functionality, alongside implementing a high standard of code quality with TDD.

---

## Key Features
1. Filter Events by City
2. Show/Hide Event Details
3. Specify Number of Events
4. Use the App When Offline
5. Add an App Shortcut to the Home Screen
6. Display Charts Visualizing Event Details

---

## User Stories and Gherkin Scenarios


Meet App: User Stories and Gherkin Scenarios

Feature 1: Filter Events By City
---------------------------------
User Stories:
- As a user, I want to see events from all cities if I haven’t searched for a specific city.
- As a user, I want to see city suggestions when I start typing a city name in the search bar.
- As a user, I want to select a city from the suggestions and view events in that city.

Gherkin Scenarios:
Scenario: When user hasn’t searched for a city, show upcoming events from all cities
Given the user has not searched for a city
When the user opens the app
Then the user should see a list of upcoming events from all cities

Scenario: User should see a list of suggestions when they search for a city
Given the user is typing a city name in the search bar
When the user enters a partial or full city name
Then the user should see a list of suggested cities

Scenario: User can select a city from the suggested list
Given the user has entered a city name and sees a list of suggestions
When the user selects a city from the suggestions
Then the user should see a list of upcoming events in that city

Feature 2: Show/Hide Event Details
-----------------------------------
User Stories:
- As a user, I want event details to be hidden by default.
- As a user, I want to expand an event to view its details.
- As a user, I want to collapse an event to hide its details.

Gherkin Scenarios:
Scenario: An event element is collapsed by default
Given the user sees a list of events
When the app loads
Then each event element should be collapsed by default

Scenario: User can expand an event to see details
Given the user sees a list of events
When the user clicks on an event's "Details" button
Then the event's details should be displayed

Scenario: User can collapse an event to hide details
Given the user has expanded an event to view details
When the user clicks on the event's "Hide Details" button
Then the event's details should be hidden

Feature 3: Specify Number of Events
------------------------------------
User Stories:
- As a user, I want to see a default number of events if I don’t specify a number.
- As a user, I want to adjust the number of events displayed.

Gherkin Scenarios:
Scenario: When user hasn’t specified a number, 32 events are shown by default
Given the user has not specified the number of events to display
When the user opens the app
Then the user should see a maximum of 32 events by default

Scenario: User can change the number of events displayed
Given the user sees a list of events
When the user changes the number of events in the "Number of Events" input box
Then the app should display the specified number of events

Feature 4: Use the App When Offline
------------------------------------
User Stories:
- As a user, I want to view cached data when I lose internet connectivity.
- As a user, I want to see an error message if I attempt to make changes while offline.

Gherkin Scenarios:
Scenario: Show cached data when there’s no internet connection
Given the user has previously loaded the app with internet access
When the user opens the app without an internet connection
Then the app should display cached data

Scenario: Show error when user changes search settings (city, number of events)
Given the user is offline
When the user attempts to change search settings (city or number of events)
Then the app should display an error message indicating no internet connection

Feature 5: Add an App Shortcut to the Home Screen
--------------------------------------------------
User Stories:
- As a user, I want to install the app as a shortcut on my device’s home screen.

Gherkin Scenarios:
Scenario: User can install the meet app as a shortcut on their device home screen
Given the user is using a mobile device
When the user sees the "Add to Home Screen" prompt
Then the user can install the app as a shortcut on their home screen

Feature 6: Display Charts Visualizing Event Details
----------------------------------------------------
User Stories:
- As a user, I want to see a chart showing the number of upcoming events in each city.
- As a user, I want to see a chart showing the popularity of event genres.

Gherkin Scenarios:
Scenario: Show a chart with the number of upcoming events in each city
Given the user has searched for events in a specific city
When the user views the data visualization section
Then the app should display a chart showing the number of upcoming events in each city

Scenario: Show a chart with the popularity of event genres
Given the user has loaded event data
When the user views the data visualization section
Then the app should display a chart showing the popularity of event genres
