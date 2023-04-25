import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import places from '../../support/pageObject/places'

When('I go to Places tab', () => {
	places.goToPlaces()
})

When('I select a location', () => {
	places.selectLocation()
})

When('I open the edit polygon popup', () => {
	places.activeMapselector()
	places.clickOnEdit()
})

When('I type the new redius', () => {
	places.updateRadius()
})

When('I click on Save Circular Geofence', () => {
	places.saveCircularGeofence()
})

Then('I get a sucess message confirmation {string}', (message) => {
	places.getMessageSuccessConfirmation(message)
	places.closeMessageSuccessConfirmation()
})
