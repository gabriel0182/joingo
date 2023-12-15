import appBuilder from '../../support/pageObject/appBuilder'
import login from '../../support/pageObject/login'
import message from '../../support/pageObject/message'

describe('My Login application', () => {
	before(() => {
		cy.deleteDownloadsFolder()
		login.login()
	})

	after(() => {
		cy.deleteDownloadsFolder()
	})

	it('I click on App Builder', () => {
		message.verifyCustomer('V2Mobi')
		appBuilder.goToAppBuilder()
	})

	it('I select an active app and go to scenes table', () => {
		appBuilder.clickOnScenes()
	})

	it('I open the Localization module', () => {
		appBuilder.openLocalesPage()
		appBuilder.openAddKeyDialog()
	})

	it('I create a new key', () => {
		appBuilder.addNewKey()
		appBuilder.exportKey()
		appBuilder.deleteKey()
		appBuilder.verifyDownloadedFile()
	})
})
