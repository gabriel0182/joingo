class appBuilder {
	static goToAppBuilder() {
		cy.intercept('POST', '**/admin/data/contentInterface/list*').as('contentInterface')
		cy.get('#myt-DockItem-ce').click()
		cy.wait('@contentInterface')
	}

	static checkDetailsFormLoads() {
		cy.get('.myt-RootPanel').eq(2).find('.myt-Text').eq(1).should('be.visible')
	}

	static checkEachRow() {
		cy.get('.myt-AppChooserGridRow').each(($element, $index) => {
			if ($index === 0) {
				cy.wrap($element, $index).focus()
				cy.wrap($element, $index)
					.find('.myt-GridCell')
					.first()
					.invoke('text')
					.then(($title) => {
						cy.get('.myt-RootPanel')
							.eq(2)
							.find('.myt-Text')
							.eq(1)
							.should('be.visible')
							.invoke('text')
							.then(($name) => {
								expect($title).to.eql($name)
							})
					})
			} else {
				cy.wrap($element, $index).click()
				cy.wrap($element, $index)
					.find('.myt-GridCell')
					.first()
					.invoke('text')
					.then(($title) => {
						cy.get('.myt-RootPanel')
							.eq(2)
							.find('.myt-Text')
							.eq(1)
							.should('be.visible')
							.invoke('text')
							.then(($name) => {
								expect($title).to.eql($name)
							})
					})
			}
		})
	}
}

export default appBuilder
