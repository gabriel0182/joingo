import places from '../../support/pageObject/places'
import login from '../../support/pageObject/login'

describe('My Login application', () => {
	before(() => {
		login.login()
	})

	it('I go to Places tab', () => {
		places.goToPlaces()
	})

	it('I select a location', () => {
		places.selectLocation()
	})

	it('I open the edit polygon popup', () => {
		places.activeMapselector()
		places.clickOnEdit()
	})

	it('I type the new redius', () => {
		places.updateRadius()
	})

	it('I click on Save Circular Geofence', () => {
		places.saveCircularGeofence()
	})

	it('I get a sucess message confirmation', () => {
		places.getMessageSuccessConfirmation('The Circular Geofence was saved successfully.')
		places.closeMessageSuccessConfirmation()
	})
})
