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

	static getMessageSuccessConfirmation(message) {
		cy.get('.successbox').find('li').should('have.text', message)
	}

	static closeMessageSuccessConfirmation() {
		cy.get('button').contains('Okay').click()
	}

	static addNewPlace() {
		cy.get('button[aria-label="Add New Place"]').click()
	}

	static selectPlaceOption(option) {
		cy.get('.section').children('.label').contains(option).click()
	}

	static clickOnMap() {
		const today = new Date()
		const seg = today.getSeconds()
		const min = today.getMinutes()
		cy.intercept('POST', '**/admin/le/fenceVisits').as('fenceVisits').wait('@fenceVisits')
		cy.get('[aria-label="Map"]')
			.get('[style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"] > div')
			.click(seg, min, { force: true })
	}

	static setLocationRequiredFields() {
		const today = new Date()
		const seg = today.getSeconds()
		cy.get('form').find('input[name="name"]').type(`Location Test ${seg}`)
		cy.get('form').find('input[name="zip"]').scrollIntoView().type(`${seg}101`)
	}

	static addLocation() {
		cy.get('button[aria-label="Add Location"]').click()
	}
}
export default places
