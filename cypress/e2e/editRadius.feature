Feature: Places, Edit Radius functionality

    @login
    Scenario: Test Edit Radius
        Given I select "V2Mobi" as customer
        When I go to Places tab
        And I select a location
        And I open the edit polygon popup
        And I type the new redius
        And I click on Save Circular Geofence
        Then I get a sucess message confirmation "The Circular Geofence was saved successfully."
