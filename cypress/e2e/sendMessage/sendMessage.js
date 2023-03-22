import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import message from '../../support/pageObject/message'

When('I select {string} as customer', (customer) => {
	message.verifyCustomer(customer)
})

When('I go to Messages tab', () => {
	message.goToMessages()
})

When('I select a draft Message', () => {
	message.selectDraftMessage()
})
When('I Edit the Message', () => {
	message.editMessage()
})
When('I send the Message', () => {
	message.sendMessage()
	message.selectRecipients()
})
Then('I verify the success confirmation message', () => {
	message.submitMessage()
	message.messageSuccess()
})
