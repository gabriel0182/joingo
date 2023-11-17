import users from '../../support/pageObject/users'
import login from '../../support/pageObject/login'
import message from '../../support/pageObject/message'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I click on Users', () => {
		message.verifyCustomer('V2Mobi')
		users.goToUsers()
	})
	it('I check the users tables loads', () => {
		users.checkUserTableLoads()
		users.checkPermissionGroupLoads()
	})

	it('I select the first user in the users table', () => {
		users.selectFirstUser()
		users.checkUserInfo()
	})
})
