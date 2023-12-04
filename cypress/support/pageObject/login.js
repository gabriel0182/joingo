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

	static checkBuiltDate() {
		const date = new Date()
		const month = date.toLocaleString('default', { month: 'short' })
		const day = date.toLocaleString('en-US', { day: 'numeric' })
		const year = date.getFullYear()
		const currentDate = `${month} ${day}, ${year},`
		const dayBefore = `${month} ${day - 1}, ${year}.`
		cy.intercept('GET', '**/data/**').as('admin').wait('@admin')
		cy.get('.welcome')
			.children('.myt-View')
			.children('.myt-View')
			.first()
			.find('.myt-Text')
			.last()
			.then(($text) => {
				const builtDate = $text.text().substring(15, 27)
				cy.url({ decode: true }).then(($url) => {
					if ($url.includes('live')) {
						cy.log($url.toString())
						expect(builtDate).to.eql(currentDate)
						expect(builtDate).not.to.eql(dayBefore)
					} else if ($url.includes('master')) {
						cy.log('Velidation only for live console')
					}
				})
			})
	}
}

export default login
