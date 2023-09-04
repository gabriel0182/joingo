import login from '../../support/pageObject/login'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I verify all options across the site open', () => {
		login.checkMenuOptions()
	})
})
