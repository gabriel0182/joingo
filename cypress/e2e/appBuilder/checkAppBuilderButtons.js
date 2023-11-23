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

	it('I check Schemas & Interfaces option', () => {
		appBuilder.checkSchemasAndInterfacesOption()
	})

	it('I check the View Active App button', () => {
		appBuilder.checkViewActiveApp()
	})
})
