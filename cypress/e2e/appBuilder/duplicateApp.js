import login from '../../support/pageObject/login'
import message from '../../support/pageObject/message'
import appBuilder from '../../support/pageObject/appBuilder'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on App Builder', () => {
		message.verifyCustomer('V2Mobi')
		appBuilder.goToAppBuilder()
	})

	it('I select the first app and duplicate it', () => {
		appBuilder.duplicateApp()
		appBuilder.deleteDuplicatedApp()
	})
})
