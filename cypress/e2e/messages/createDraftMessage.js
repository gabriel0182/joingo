import message from '../../support/pageObject/message'
import login from '../../support/pageObject/login'

describe('My Login application', () => {
	before(() => {
		cy.clearAllSessionStorage()
		login.login()
	})
	it('I go to Messages tab', () => {
		message.verifyCustomer('V2Mobi')
		message.goToMessages()
	})
	it('I select  New Message', () => {
		message.selectNewMessage()
	})
	it('I select Message patrons once', () => {
		message.selectNewMessageOption('Message patrons once')
	})
	it('I fill out the required fields', () => {
		message.fillOutTemplate()
	})

	it('I  Save as Draft', () => {
		message.saveAsDraft()
	})

	it('The draft tamplate message should be created in the draft messages list', () => {
		message.validateCreatedDraft()
		message.deleteDraft()
	})
})
