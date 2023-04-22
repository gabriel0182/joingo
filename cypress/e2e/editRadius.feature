Feature: Messages, I send a message to a mobile app

    @login
    Scenario: Send a test Message
        Given I select "V2Mobi" as customer
        When I go to Places tab
        And I select a location
        And I open the edit polygon popup
        And I type the new redius
        And I click on Save Circular Geofence
        Then I get a sucess message confirmation
