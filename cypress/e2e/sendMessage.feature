Feature: Messages, I send a message to a mobile app

    @login
    Scenario: Send a test Message
        When I select "V2Mobi" as customer
        When I go to Messages tab
        And I select a draft Message
        And I Edit the Message
        And I send the Message
        Then I verify the success confirmation message
