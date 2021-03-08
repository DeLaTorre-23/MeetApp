
Feature: User can change the number of events they want to see.

  Scenario: User can change the number of events they want to see.
    Given can change number of lists to view
    When the user opens the event page
    Then the user can change or type on the input box any number of list of events to view
