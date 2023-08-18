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
	it('I select a draft Message', () => {
		message.selectDraftMessage()
	})
	it('I duplicate the draft Message', () => {
		message.duplicateDraft()
	})
	it('I verify the draft Message was duplicated', () => {
		message.verifyDuplicatedDraft()
	})
})
