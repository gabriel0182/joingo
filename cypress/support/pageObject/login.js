class login {
	static login() {
		cy.fixture('login.json').then((credentials) => {
			cy.visit('')
			cy.get('#username').type(credentials.user)
			cy.get('#password').type(credentials.pass)
		})
		cy.get('#loginButton').click()
	}
}

export default login
