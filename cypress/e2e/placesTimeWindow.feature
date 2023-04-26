Feature: Places, Set Time Window

    @login
    Scenario: Set Time Window
        Given I select "V2Mobi" as customer
        When I go to Places tab
        Then I select the time window
