import login from '../../support/pageObject/login'
import patrons from '../../support/pageObject/patrons'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on Add New Group', () => {
		patrons.goToPatrons()
		patrons.clickOnAddNewGroup()
		patrons.addNewSelectionGroup()
	})
	it('I fill out the Group Name', () => {
		patrons.fillOutGroupName()
	})

	it('I click on Add Patron Group', () => {
		patrons.fillOutGroupName()
		patrons.AddPatronGroup()
		patrons.messageSuccess()
		patrons.closeMessageSuccessConfirmation()
		patrons.deleteNewGroup()
	})
})
