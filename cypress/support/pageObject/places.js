class places {
	static goToPlaces() {
		cy.get('#myt-DockItem-places').click()
	}

	static selectLocation() {
		cy.get('.twrap').within(() => {
			cy.get('tbody').children('tr').children('td').contains('Circle').first().should('be.visible').click()
		})
	}

	static activeMapselector() {
		cy.get('.active > .titlebar > .title > .label').trigger('mouseover')
	}

	static clickOnEdit() {
		cy.get('button').contains('Edit').click()
	}

	static updateRadius() {
		const today = new Date()
		const seg = today.getSeconds()
		cy.get('input[name="radius"]').clear().type(`${seg}00.${seg}`)
	}

	static saveCircularGeofence() {
		cy.intercept('POST', '**/admin/data/mapobjects/*').as('update')
		cy.get('button').contains('Save Circular Geofence').click()
		cy.wait('@update').its('response.statusCode').should('eq', 200)
	}

	static getMessageSuccessConfirmation() {
		cy.get('.successbox').find('li').should('have.text', 'The Circular Geofence was saved successfully.')
	}

	static closeMessageSuccessConfirmation() {
		cy.get('button').contains('Okay').click()
	}
}
export default places
