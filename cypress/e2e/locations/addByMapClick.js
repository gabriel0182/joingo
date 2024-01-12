import login from '../../support/pageObject/login'
import locations from '../../support/pageObject/locations'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on Add New Location', () => {
		locations.goLocations()
	})

	it('I click on Add By Map', () => {
		locations.clickOnAddByMap()
	})

	it('I Add a new location', () => {
		locations.searchLocation()
		locations.addNewMapLocation()
		locations.deleteNewLocation()
	})
})
