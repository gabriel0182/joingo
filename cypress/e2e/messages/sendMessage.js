import message from '../../support/pageObject/message'
import login from '../../support/pageObject/login'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I go to Messages tab', () => {
		message.verifyCustomer('V2Mobi')
		message.goToMessages()
	})
	it('I select and edit a draft Message', () => {
		message.selectDraftMessage()
		message.editMessage('Test_QA')
	})
	it('I send the Message', () => {
		message.sendMessage()
		message.selectRecipients()
		message.submitMessage()
	})
	it('I verify the success confirmation message', () => {
		message.messageSuccess()
	})
})
