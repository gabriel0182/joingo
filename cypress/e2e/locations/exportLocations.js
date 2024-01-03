import login from '../../support/pageObject/login'
import locations from '../../support/pageObject/locations'

describe('My Login application', () => {
	before(() => {
		cy.deleteDownloadsFolder()
		login.login()
	})

	after(() => {
		cy.deleteDownloadsFolder()
	})
	it('I click on Add New Location', () => {
		locations.goLocations()
	})

	it('I add a New Location', () => {
		locations.addNewLocation()
		locations.checkMapLoads()
	})
	it('I Export the new location', () => {
		locations.clickOnExport()
		locations.verifyDownloadedFile()
		locations.deleteNewLocation()
	})
})
