class assetManager {
	static goToAssetManager() {
		cy.intercept('POST', '**/admin/data/asset/list').as('asset')
		cy.get('#myt-DockItem-assets').click()
		cy.wait('@asset').its('response.statusCode').should('eq', 200)
	}

	static clickOnImport() {
		cy.get('.input-group').first().find('button').last().click()
	}

	static importAsset() {
		cy.get('.modal-content')
			.children('.upload-dropzone')
			.find('input')
			.selectFile('cypress/fixtures/2XPoints.jpg', { force: true })
		cy.get('.modal-content').find('input[placeholder="Enter tags"]').type('2XPoints')
		cy.intercept('POST', '**/admin/data/asset/create').as('createAsset')
		cy.get('.modal-content').find('.image-assets-upload-all-container').children('button').click()
		cy.wait('@createAsset').its('response.statusCode').should('eq', 200)
		cy.get('#add-asset').find('button.dclose').click()
	}

	static deleteImportedAsset() {
		cy.get('input[placeholder="Enter search terms"]').first().type('2')
		cy.get('.card').first().should('be.visible')
		cy.get('.card').first().find('.asset-item-header-right').children('button[title="Delete"]').click()
		cy.intercept('POST', '**/admin/data/asset/delete').as('deleteAsset')
		cy.get('#delete-content').find('.actions').children('button[aria-label="Delete"]').click()
		cy.wait('@deleteAsset').its('response.statusCode').should('eq', 200)
	}
}

export default assetManager
