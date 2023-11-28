let name

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

	static checkSchemasAndInterfacesOption() {
		cy.get('.myt-RootPanel').first().find('button').contains('Schemas & Interfaces').click()
		cy.get('.header').last().children('.myt-Text').should('have.text', 'Schemas & Interfaces')
		cy.get('.myt-SchemaRow').each(($element, $index) => {
			cy.wrap($element, $index)
				.invoke('text')
				.then(($text) => {
					expect($element, $index).to.have.text($text)
				})
		})
		cy.get('.header').last().children('.dclose').click()
	}

	static checkViewActiveApp() {
		let newUrl
		cy.url({ decode: true }).then(($url) => {
			if ($url.includes('live')) {
				newUrl = 'https://live.joingo.com/admin/data/portal/v2mo/?platform=ios&mode=view&width=414&height=736&appId=87'
			} else if ($url.includes('master')) {
				newUrl =
					'https://master.joingo.com/admin/data/portal/v2mo/?platform=ios&mode=view&width=414&height=736&appId=87'
			}

			cy.window().then((win) => {
				cy.stub(win, 'open')
					.callsFake((url) => {
						newUrl = url
					})
					.as('windowOpen')
			})

			cy.get('.myt-RootPanel').first().find('button').contains('View Active App').click()
			cy.get('@windowOpen').should('be.called')
			Cypress.on('uncaught:exception', () => false)
			cy.visit(newUrl)
		})
	}

	static clickOnNewApp() {
		cy.get('.myt-RootPanel').first().find('button').contains(' New App').click()
	}

	static createNewApp() {
		const date = new Date()
		const miliSeg = date.getMilliseconds()
		name = `Automation Testing ${miliSeg}`
		cy.get('.myt-AppPropertiesDialog').find('.myt-FormInputText').first().type(name)
		cy.intercept('POST', '**/admin/data/app/create?**').as('appCreate')
		cy.get('.myt-AppPropertiesDialog').find('button').contains('Create').click()
		cy.wait('@appCreate').its('response.statusCode').should('eq', 200)
		cy.get('.myt-expandoheader')
			.last()
			.children('.myt-Text')
			.should('have.text', `Scenes for "${name}" - showing all 2 `)
	}

	static backToAppChooser() {
		cy.intercept('POST', '**/admin/data/app/list?**').as('list')
		cy.get('.myt-RootPanel').children('button').contains('Go to').click()
		cy.get('.myt-ListView').children('.myt-ListItem').contains(' App Chooser').click()
	}

	static deleteNewApp() {
		cy.get('.myt-GridCell').contains(name).click()
		cy.get('.myt-RootPanel').eq(2).find('.myt-footerbar').find('button').contains('Delete').click()
		cy.intercept('POST', '**/admin/data/app/delete?**').as('delete')
		cy.get('.myt-interior-dialog').find('button').contains('Delete').click()
		cy.wait('@delete').its('response.statusCode').should('eq', 200)
	}

	static openPropertiesOption() {
		cy.get('.myt-footerbar').find('button').contains('Properties').click()
		cy.get('.myt-AppPropertiesDialog').find('.header').should('contains.text', 'App Properties')
		cy.get('.myt-AppPropertiesDialog')
			.find('.myt-View')
			.filter(':visible')
			.each(($element, $index) => {
				cy.wrap($element, $index).should('be.visible')
			})
	}

	static checkPropertiesDialog() {
		cy.get('.myt-AppChooserGridRow').each(($element, $index) => {
			if ($index === 0) {
				cy.wrap($element, $index).focus()
				cy.wrap($element, $index)
				this.openPropertiesOption()
				this.clickOnCancel()
			} else {
				cy.wrap($element, $index).click()
				cy.wrap($element, $index)
				this.openPropertiesOption()
				this.clickOnCancel()
			}
		})
	}

	static clickOnCancel() {
		cy.get('.myt-AppPropertiesDialog').find('.myt-footerbar').children('button').contains('Cancel').click()
	}

	static clickOnScenes() {
		cy.get('.myt-footerbar').find('button').contains('Scenes').click()
	}

	static openScenesTable() {
		cy.get('.myt-RootPanel')
			.eq(2)
			.find('.myt-Text')
			.eq(1)
			.invoke('text')
			.then(($name) => {
				this.clickOnScenes()
				cy.get('.myt-RootPanel').find('.myt-Text').should('contain.text', $name)
			})
	}

	static verifyScenesTableLoads() {
		cy.get('.myt-SceneChooserGridRow').each(($element, $index) => {
			cy.wrap($element, $index).find('.myt-View').filter(':visible').should('be.visible')
			cy.wrap($element, $index).find('.myt-GridCell').filter(':visible').should('be.visible')
		})
	}

	static checkScenesTable() {
		cy.get('.myt-AppChooserGridRow').each(($element, $index) => {
			if ($index === 0) {
				cy.wrap($element, $index).focus()
				cy.wrap($element, $index)
				this.openScenesTable()
				this.verifyScenesTableLoads()
				this.backToAppChooser()
			} else {
				cy.wrap($element, $index).click()
				cy.wrap($element, $index)
				this.openScenesTable()
				this.verifyScenesTableLoads()
				this.backToAppChooser()
			}
		})
	}
}

export default appBuilder
