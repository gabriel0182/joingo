let name
let sceneName
let localeName
let keyName

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
		cy.get('.myt-BaseActionMenuBtn').contains('Go to').click()
		cy.get('.myt-ListView').children('.myt-ListItem').contains('App Chooser').click()
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
		cy.get('.myt-SceneChooserGridRow')
			.filter(':visible')
			.each(($element, $index) => {
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

	static AddNewScene() {
		const date = new Date()
		const miliSeg = date.getMilliseconds()
		sceneName = `Automation Scene ${miliSeg}`
		cy.get('.myt-AppChooserGridRow').first().focus()
		this.clickOnScenes()
		cy.get('.myt-RootPanel').find('button').contains('New Scene').click()
		cy.get('.myt-NewSceneDialog').find('.myt-FormInputText').first().type(sceneName)
		cy.intercept('POST', '**/admin/data/scenetemplate/create?**').as('sceneTemplate')
		cy.get('.myt-NewSceneDialog').find('.myt-footerbar').children('button').contains('Create').click()
		cy.wait('@sceneTemplate').its('response.statusCode').should('eq', 200)
	}

	static backToSceneChooser() {
		cy.intercept('GET', '**/upload/V2Mobi/**').as('upload').wait('@upload')
		cy.reload()
		cy.url().then(($url) => {
			if ($url.includes('screen=scenechooser')) {
				cy.log('We are already on secene chooser screen')
			} else if ($url.includes('screen=sceneedito')) {
				cy.get('.myt-header').last().contains('Go to').click()
				cy.get('.myt-ListView').children('.myt-ListItem').contains('Scene Chooser').click()
			}
		})
	}

	static deleteScene() {
		this.backToSceneChooser()
		cy.get('.myt-SceneChooserGridRow')
			.contains(sceneName)
			.parent('.myt-SceneChooserGridRow')
			.find('.myt-ActionMenu')
			.click()
		cy.get('.myt-ListView').find('.myt-ListItem').contains('Delete Scene').click()
		cy.intercept('POST', '**/admin/data/scenetemplate/delete?**').as('deleteScene')
		cy.get('.myt-interior-dialog').find('.myt-View').children('button').contains('Delete').click()
		cy.wait('@deleteScene').its('response.statusCode').should('eq', 200)
		cy.get('.myt-SceneChooserGridRow').contains(sceneName).should('not.exist')
	}

	static duplicateApp() {
		cy.get('.myt-AppChooserGridRow').eq(2).click()
		cy.get('.myt-footerbar').find('button').contains('Duplicate').click()
		cy.intercept('POST', '**/admin/data/app/copy?**').as('copy')
		cy.get('.myt-interior-dialog').find('button').contains('Confirm').click()
		cy.wait('@copy').its('response.statusCode').should('eq', 200)
	}

	static deleteDuplicatedApp() {
		cy.get('.myt-AppChooserGridRow')
			.eq(2)
			.find('.myt-GridCell')
			.first()
			.invoke('text')
			.then(($name) => {
				cy.get('.myt-GridCell').contains(`${$name}_copy`).first().click()
				cy.get('.myt-RootPanel').eq(2).find('.myt-footerbar').find('button').contains('Delete').click()
				cy.intercept('POST', '**/admin/data/app/delete?**').as('delete')
				cy.get('.myt-interior-dialog').find('button').contains('Delete').click()
				cy.wait('@delete').its('response.statusCode').should('eq', 200)
			})
	}

	static openLocalesPage() {
		cy.get('.myt-RootPanel').find('button').contains('I18N').click()
	}

	static openLocalesDialog() {
		cy.get('.myt-View').find('button').contains('Locales').click()
	}

	static addLocale(locale) {
		localeName = locale
		cy.get('.myt-InfiniteGrid')
			.find('.myt-GridCell')
			.then(($cell) => {
				if ($cell.text().includes(localeName)) {
					cy.get('.myt-interior-dialog').last().find('button').contains('Add').click()
					cy.get('.myt-Dialog').find('input').type('en-US')
				} else {
					cy.get('.myt-interior-dialog').last().find('button').contains('Add').click()
					cy.get('.myt-Dialog').find('input').type(localeName)
				}
				cy.intercept('POST', '**/admin/data/localeCodes/create?**').as('create')
				cy.get('.myt-Dialog').find('button').contains('Create').click()
				cy.wait('@create').its('response.statusCode').should('eq', 200)
			})
	}

	static findDeleteLocaleButton() {
		cy.get('.myt-InfiniteGrid')
			.find('.myt-GridRow')
			.first()
			.find('.myt-SquareBtn')
			.then(($btn) => {
				if ($btn.is(':enabled')) {
					cy.get('.myt-ce-I18NLocalesDialog').find('.myt-GridRow').eq(1).find('.myt-SquareBtn').last().click()
				} else {
					cy.get('.myt-ce-I18NLocalesDialog').find('.myt-GridRow').first().find('.myt-SquareBtn').last().click()
				}
			})
	}

	static deleteLocale() {
		cy.reload()
		this.openLocalesPage()
		this.openLocalesDialog()
		cy.get('.myt-InfiniteGrid').then(($body) => {
			if ($body.find('.myt-GridRow').length === 1) {
				cy.log('Default locale')
			} else if ($body.find('.myt-GridRow').length > 1) {
				this.findDeleteLocaleButton()
				cy.intercept('POST', '**/admin/data/localeCodes/delete?**').as('delete')
				cy.get('.myt-Dialog').find('button').contains('Delete').click()
				cy.wait('@delete').its('response.statusCode').should('eq', 200)
			}
		})
	}

	static openAddKeyDialog() {
		cy.get('.myt-ce-I18NDialog').find('button').contains(' Add Key').click()
	}

	static addNewKey() {
		const date = new Date()
		const miliSeg = date.getMilliseconds()
		keyName = `key ${miliSeg}`
		cy.get('.myt-interior-dialog').find('input').first().type(keyName)
		cy.intercept('POST', '**/admin/data/messageFormat/create?**').as('createKey')
		cy.get('.myt-interior-dialog').find('.myt-View').children('button').contains('Create').click()
		cy.wait('@createKey').its('response.statusCode').should('eq', 200)
	}

	static deleteKey() {
		cy.get('.myt-InfiniteGrid')
			.find('.myt-GridRow')
			.contains(keyName)
			.parent('.myt-GridRow')
			.find('.myt-SquareBtn')
			.first()
			.click()
		cy.intercept('POST', '**/admin/data/messageFormat/delete?**').as('deleteKey')
		cy.get('.myt-Dialog').find('button').contains('Delete').click()
		cy.wait('@deleteKey').its('response.statusCode').should('eq', 200)
	}

	static exportKey() {
		cy.get('.myt-ce-I18NDialog').find('button').contains('Export').click()
		cy.get('.myt-interior-dialog').find('button').contains('Export').click()
	}

	static verifyDownloadedFile() {
		cy.fixture('../downloads/localization-87.csv').then(($file) => {
			expect($file).contains(keyName)
		})
	}
}

export default appBuilder
