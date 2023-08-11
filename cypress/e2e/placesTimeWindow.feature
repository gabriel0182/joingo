Feature: Places, Set Time Window

    @login
    Scenario: Set Time Window
        Given I select "Cache Creek" as customer
        When I go to Places tab
        Then I select the time window
