Feature: Specify Number of Events

    Scenario: Default number of events is 32
        Given the user has not specified a number of events
        Then 32 events should be displayed by default

    Scenario: User can change the number of events displayed
        Given the user has opened the app
        When the user specifies 10 events to be displayed
        Then 10 events should be displayed
