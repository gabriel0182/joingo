class users {
	static goToUsers() {
		cy.get('#myt-DockItem-users').click()
	}

	static checkUserTableLoads() {
		cy.get('table')
			.first()
			.children('tbody')
			.children('tr')
			.each(($element, $index) => {
				cy.wrap($element, $index).should('be.visible').scrollIntoView()
			})
	}

	static checkPermissionGroupLoads() {
		cy.get('table')
			.last()
			.children('tbody')
			.children('tr')
			.each(($element, $index) => {
				cy.wrap($element, $index).should('be.visible')
			})
	}
}
export default users
