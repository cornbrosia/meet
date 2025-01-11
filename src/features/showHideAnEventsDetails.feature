Feature: Show/Hide event details

    Scenario: An event element is collapsed by default
        Given the user opens the app
        Then all event details should be collapsed

    Scenario: User can expand an event to see details
        Given the user opens the app
        When the user clicks on the "Show Details" button of an event
        Then the event details should be visible

    Scenario: User can collapse an event to hide details
        Given the user opens the app
        When the user clicks on the "Hide Details" button of that event
        Then the event details should be hidden
