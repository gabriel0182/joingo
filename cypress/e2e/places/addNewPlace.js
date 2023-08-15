import places from '../../support/pageObject/places'
import login from '../../support/pageObject/login'
import message from '../../support/pageObject/message'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on Add a New Places', () => {
		message.verifyCustomer('V2Mobi')
		places.goToPlaces()
		places.addNewPlace()
	})
	it('I select "New Location"', () => {
		places.selectPlaceOption('New Location')
	})

	it('I select "Click on the Map"', () => {
		places.selectPlaceOption('Click on the Map')
	})

	it('I select a point the map', () => {
		places.clickOnMap()
	})
	it('I type a location required fields', () => {
		places.setLocationRequiredFields()
		places.addLocation()
	})
})
