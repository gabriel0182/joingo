let contentName

class contentCreator {
	static goToContentCreator() {
		cy.intercept('POST', '**/admin/data/scenetemplate/list?**').as('scenetemplate')
		cy.get('#myt-DockItem-ca').click()
		cy.wait('@scenetemplate').its('response.statusCode').should('eq', 200)
	}

	static clickOnAddNew() {
		cy.get('.myt-RootPanel').first().find('button').contains('New').click()
	}

	static createNewContent() {
		const date = new Date()
		const miliSeg = date.getMilliseconds()
		contentName = `Automation Testing ${miliSeg}`
		cy.get('.myt-interior-dialog').find('.myt-FormInputText').first().type(contentName)
		cy.intercept('POST', '**/admin/data/contentinstance/create?**').as('contentinstance')
		cy.get('.myt-interior-dialog').find('.myt-footerbar').children('button').contains('Save').click()
		cy.wait('@contentinstance').its('response.statusCode').should('eq', 200)
		cy.get('.myt-interior-dialog').find('.header').find('button.dclose').click()
		cy.get('.myt-Grid').find('.myt-ListScreenRow').children('.myt-GridCell').contains(contentName).should('be.visible')
	}

	static deleteNewContent() {
		cy.get('.myt-Grid').find('.myt-ListScreenRow').children('.myt-GridCell').contains(contentName).click()
		cy.get('.myt-RootPanel').eq(2).find('.myt-footerbar').find('button').contains('Delete').click()
		cy.intercept('POST', '**/admin/data/contentinstance/delete?**').as('delete')
		cy.get('.myt-interior-dialog').find('button').contains('Delete').click()
		cy.wait('@delete').its('response.statusCode').should('eq', 200)
	}
}

export default contentCreator
