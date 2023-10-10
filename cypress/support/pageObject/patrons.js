let title

class patrons {
	static goToPatrons() {
		cy.intercept('POST', '**/data/groups/list?*').as('groups')
		cy.get('#myt-DockItem-patrons').click()
		cy.wait('@groups')
	}

	static clickOnAddNewGroup() {
		cy.get('button').contains('Add New Group').click()
	}

	static addNewSelectionGroup() {
		cy.get('#wizard').find('.section').contains('By Selection').click()
	}

	static fillOutGroupName() {
		const today = new Date()
		const mil = today.getMilliseconds()
		title = `test${mil}`
		cy.get('input[placeholder="My new Group"]').type(title)
	}

	static AddPatronGroup() {
		cy.intercept('POST', '**/admin/data/groups/create?**').as('groups')
		cy.get('button').contains('Add Patron Group').click()
		cy.wait('@groups').its('response.statusCode').should('eq', 200)
	}

	static messageSuccess() {
		cy.get('.successbox').find('li').contains('The Patron Group was created successfully.').should('be.visible')
	}

	static closeMessageSuccessConfirmation() {
		cy.get('button').contains('Okay').click()
	}

	static deleteNewGroup() {
		const newGroup = title
		cy.get('tbody').children('tr').children('td').contains(newGroup).click()
		cy.get('button').contains('Delete Group').click()
		cy.intercept('POST', '**/admin/data/groups/delete?*').as('delete')
		cy.get('button').contains('Confirm Deletion').click()
		cy.wait('@delete').its('response.statusCode').should('eq', 200)
		this.closeMessageSuccessConfirmation()
		cy.get('tbody').children('tr').children('td').contains(newGroup).should('not.exist')
	}
}

export default patrons
