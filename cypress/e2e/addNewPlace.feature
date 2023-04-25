Feature: Messages, I send a message to a mobile app

    @login
    Scenario: Send a test Message
        Given I select "V2Mobi" as customer
        When I go to Places tab
        And I click on Add a New Places
        And I select "New Location"
        And I select "Click on the Map"
        And I select a point the map
        And I type a location required fields
        Then I get a sucess message confirmation "The Location was created successfully."
