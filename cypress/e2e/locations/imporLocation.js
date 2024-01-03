import login from '../../support/pageObject/login'
import locations from '../../support/pageObject/locations'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on Add New Location', () => {
		locations.goLocations()
	})

	it('I import a New Location', () => {
		locations.clickOnImport()
		locations.importLocationFile()
		locations.successImportConfirmation()
		locations.deleteImportedLocation()
	})
})
