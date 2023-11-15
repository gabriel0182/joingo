import login from '../../support/pageObject/login'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I check the built date was updated', () => {
		login.checkBuiltDate()
	})
})
