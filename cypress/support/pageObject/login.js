class login {
	static login() {
		Cypress.session.clearCurrentSessionData()
		cy.fixture('login.json').then((credentials) => {
			cy.visit('')
			cy.get('#auth-username').type(credentials.user)
			cy.get('#auth-password').type(credentials.pass)
		})
		cy.get('#auth-btn-login').click()
	}
}

export default login
