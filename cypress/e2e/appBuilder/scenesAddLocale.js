import appBuilder from '../../support/pageObject/appBuilder'
import login from '../../support/pageObject/login'
import message from '../../support/pageObject/message'

describe('My Login application', () => {
	before(() => {
		login.login()
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
		appBuilder.openLocalesDialog()
	})

	it('I create a new locale', () => {
		appBuilder.checkEmptyLocalesGrid('en-RU')
		appBuilder.deleteLocale()
	})
})
