let locationName
class locations {
	static goLocations() {
		cy.intercept('POST', '**/admin/data/localeCodes/list?*').as('localeCodes')
		cy.get('#myt-DockItem-loc').click()
		cy.wait('@localeCodes')
	}

	static addNewLocation() {
		const today = new Date()
		const mil = today.getMilliseconds()
		locationName = `test${mil}`
		cy.get('.myt-panel').find('button').contains('New').click()
		cy.get('input[placeholder="Enter Location Name"]').type(locationName)
		cy.get('input[placeholder="Enter Location ID"]').type(mil)
		cy.get('input[placeholder="Enter City"]').type('Miami')
		cy.get('.myt-interior-dialog').find('button').contains('Full Geocode Update').click()
		cy.intercept('POST', '**/admin/data/locationv2/upsert?**').as('locationv2')
		cy.get('.myt-interior-dialog').find('button').contains('Create').click()
		cy.wait('@locationv2').its('response.statusCode').should('eq', 200)
	}

	static checkMapLoads() {
		cy.get('[role="dialog"]').invoke('text').should('contain', locationName)
	}

	static deleteNewLocation() {
		const newLocation = locationName
		cy.get('.myt-InfiniteGrid').find('.myt-ListScreenRow').children('.myt-GridCell').contains(newLocation).click()
		cy.get('.myt-footerbar').find('button').contains('Delete').click()
		cy.intercept('POST', '**/admin/data/locationv2/delete**').as('delete')
		cy.get('.myt-interior-dialog').contains('Confirm').click()
		cy.wait('@delete').its('response.statusCode').should('eq', 200)
	}

	static clickOnImport() {
		cy.get('.myt-expandoheader').find('.myt-SquareBtn').click()
		cy.get('.myt-expandoheader').then(($button) => {
			if ($button.find('.fa-plus').is(':visible')) {
				cy.get('.myt-expandoheader').find('button').contains('Import').click()
			} else {
				cy.get('.myt-expandoheader').find('.myt-SquareBtn').click()
				cy.get('.myt-expandoheader').find('button').contains('Import').click()
			}
		})
	}

	static importLocationFile() {
		cy.get('.myt-interior-dialog')
			.find('input.myt-CSVBulkImporter')
			.selectFile('cypress/fixtures/v2moLocations.csv', { force: true })
		cy.get('.myt-InfiniteGrid').find('.myt-BulkGridRow').last().should('be.visible')
		cy.get('.myt-ce-LocationsImportDialog').find('button').contains('Proceed').click()
		cy.intercept('POST', '**/admin/data/locationv2/bulkupsert?**').as('bulkupsert')
		cy.get('.myt-interior-dialog').find('button').contains('Confirm').click()
		cy.wait('@bulkupsert').its('response.statusCode').should('eq', 200)
	}

	static successImportConfirmation() {
		cy.get('.myt-interior-dialog').find('.myt-Text').should('have.text', 'The locations were successfully updated.')
		//cy.get('.myt-interior-dialog').find('.dclose').first().click()
		cy.reload()
	}

	static deleteImportedLocation() {
		cy.get('.myt-InfiniteGrid').find('.myt-ListScreenRow').children('.myt-GridCell').contains('Test Location').click()
		cy.get('.myt-footerbar').find('button').contains('Delete').click()
		cy.intercept('POST', '**/admin/data/locationv2/delete**').as('delete')
		cy.get('.myt-interior-dialog').contains('Confirm').click()
		cy.wait('@delete').its('response.statusCode').should('eq', 200)
	}

	static clickOnExport() {
		cy.get('.myt-expandoheader').find('.myt-SquareBtn').click()
		cy.get('.myt-expandoheader').then(($button) => {
			if ($button.find('.fa-plus').is(':visible')) {
				cy.get('.myt-expandoheader').find('button').contains('Export').click()
			} else {
				cy.get('.myt-expandoheader').find('.myt-SquareBtn').click()
				cy.get('.myt-expandoheader').find('button').contains('Export').click()
			}
		})
	}

	static verifyDownloadedFile() {
		cy.fixture('../downloads/v2mo Locations.csv').should('exist', { timeout: 5000 })
		cy.fixture('../downloads/v2mo Locations.csv').then(($file) => {
			expect($file).contains(locationName)
		})
	}

	static clickOnAddByMap() {
		cy.get('.myt-RootPanel').find('button').contains('Add By Map Click').click()
	}

	static searchLocation() {
		cy.get('[aria-label="Map"]').click()
	}

	static addNewMapLocation() {
		const today = new Date()
		const mil = today.getMilliseconds()
		locationName = `test${mil}`
		cy.get('input[placeholder="Enter Location Name"]').type(locationName)
		cy.get('input[placeholder="Enter Location ID"]').type(mil)
		cy.intercept('POST', '**/admin/data/locationv2/upsert?**').as('locationv2')
		cy.get('.myt-interior-dialog').find('button').contains('Create').click()
		cy.wait('@locationv2').its('response.statusCode').should('eq', 200)
	}
}
export default locations
