class message {
	static verifyCustomer(customer) {
		cy.get('#myt-DockItem-vendor').click()
		cy.get('b').first().should('have.text', `${customer}`)
	}

	static goToMessages() {
		cy.intercept('POST', '**/admin/data/v2MessageTags?*').as('messages')
		cy.get('#myt-DockItem-msgs').click()
		cy.wait('@messages')
	}

	static selectDraftMessage() {
		cy.get('.myt-GridCell').first().click()
	}

	static editMessage() {
		cy.get('.fa-edit').click()
		cy.get('button').contains('Recipients and Schedule').click()
		cy.get('.myt-SelectableListMenuFormBtn').eq(3).click()
		cy.intercept('POST', '**/admin/data/messages/estimateRecipientCount*').as(
			'estimateRecipientCount'
		)
		cy.get('.myt-SelectableListViewItem').contains('Test_QA').click()
		cy.wait('@estimateRecipientCount')
		cy.get('.myt-SelectableListMenuFormBtn').eq(7).click()
		cy.get('.myt-SelectableListViewItem').contains('Now').click()
	}

	static sendMessage() {
		cy.intercept('POST', '**/admin/data/groups/listPatronsForGroup*').as('listPatronsForGroup')
		cy.get('button').contains('Send Test Message').click()
		cy.wait('@listPatronsForGroup')
	}

	static selectRecipients() {
		cy.get('.myt-TestMessageRow').first().click()
	}

	static submitMessage() {
		cy.intercept('POST', '**/admin/data/messages/sendTest?*').as('sendTest')
		cy.get('.fa-paper-plane').click()
		cy.wait('@sendTest').its('response.statusCode').should('eq', 200)
	}

	static messageSuccess() {
		cy.get('div.myt-Text').contains('Test message sent successfully.').should('be.visible')
	}
}

export default message
