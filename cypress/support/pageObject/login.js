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

	static checkMenuOptions() {
		cy.intercept('**').as('request')
		cy.get('.myt-View')
			.find('*[id^="myt-DockItem-"]')
			.filter(':visible')
			.each(($element, $index) => {
				cy.wrap($element, $index).click()
				cy.wait('@request')
				cy.get('.myt-ConsoleModuleStack')
					.find('.myt-NativeConsoleModule')
					.filter(':visible')
					.each(($elem, $indx) => {
						cy.wrap($elem, $indx).should('be.visible')
					})
			})
	}
}

export default login
