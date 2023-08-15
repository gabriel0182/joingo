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
		cy.get('input[name="radius"]').clear()
		cy.get('input[name="radius"]').type(`${seg}00.${seg}`)
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
		// eslint-disable-next-line cypress/no-force
		cy.get('[aria-label="Map"]')
			.find('[style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"] > div')
			.click(seg, min, { force: true })
	}

	static setLocationRequiredFields() {
		const today = new Date()
		const mil = today.getMilliseconds()
		cy.get('form').find('input[name="name"]').type(`Location Test ${mil}`)
		cy.get('form').find('input[name="zip"]').type(`${mil}101`)
	}

	static addLocation() {
		cy.get('button[aria-label="Add Location"]').click()
	}

	static selectTimeWindow() {
		cy.get('button[aria-label="Set Time Window"]').click()
		cy.get('.overlay')
			.children('ul')
			.children('li')
			.then(($els) => {
				const values = Cypress._.map(Cypress.$.makeArray($els), 'innerText')
				cy.get('.overlay')
					.children('ul')
					.children('li')
					.each(($el, $index) => {
						cy.intercept('**').as('fenceVisits')
						cy.wrap($el).click()
						cy.wait('@fenceVisits', { timeout: 10000 })
						if (values[$index] === '12 Hours') {
							cy.get('.timebox').find('h3').eq(1).should('have.text', 'Past 12 hours.')
						} else if (values[$index] === 'Past Day') {
							cy.get('.timebox').find('h3').eq(1).should('have.text', 'Past 24 hours.')
						} else if (values[$index] === 'Past Week') {
							cy.get('.timebox').find('h3').eq(1).should('have.text', 'Past 7 days.')
						} else if (values[$index] === 'Past Month') {
							cy.get('.timebox').find('h3').eq(1).should('have.text', 'Past 1 months.')
						} else if (values[$index] === 'Custom') {
							cy.get('.timebox').find('h3').eq(1).should('have.text', 'Past 1 months.')
						}
						cy.get('body').then(($body) => {
							if ($body.find('#places-time-dialog').length > 0) {
								cy.get('button[aria-label="Close"]').click()
							} else {
								cy.get('button[aria-label="Set Time Window"]').click()
							}
						})
					})
			})
	}
}
export default places
