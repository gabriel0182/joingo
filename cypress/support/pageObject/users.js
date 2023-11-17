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
				cy.wrap($element, $index)
					.invoke('text')
					.then(($text) => {
						expect($element, $index).to.have.text($text)
					})
			})
	}

	static checkPermissionGroupLoads() {
		cy.get('table')
			.last()
			.children('tbody')
			.children('tr')
			.each(($element, $index) => {
				cy.wrap($element, $index)
					.invoke('text')
					.then(($text) => {
						expect($element, $index).to.have.text($text)
					})
			})
	}

	static selectFirstUser() {
		cy.get('table').first().children('tbody').children('tr').children('td.c-usersgrid-email').first().click()
	}

	static checkUserInfo() {
		cy.get('table')
			.first()
			.children('tbody')
			.children('tr')
			.children('td.c-usersgrid-email')
			.first()
			.invoke('text')
			.then(($email) => {
				cy.get('.dset')
					.find('.column')
					.children('.drow')
					.eq(1)
					.children('.dval')
					.invoke('text')
					.then(($emailField) => {
						expect($email).to.eqls($emailField)
					})
			})
	}
}
export default users
