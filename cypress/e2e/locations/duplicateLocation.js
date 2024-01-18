import login from '../../support/pageObject/login'
import locations from '../../support/pageObject/locations'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on Add New Location', () => {
		locations.goLocations()
	})

	it('I add a New Location', () => {
		locations.addNewLocation()
		locations.checkMapLoads()
	})
	it('I duplicate the newest location', () => {
		locations.duplicateLocation()
		locations.cleanLocations()
	})
})
