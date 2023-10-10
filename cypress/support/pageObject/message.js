let title

class message {
	static verifyCustomer(customer) {
		cy.get('#myt-DockItem-vendor').click()
		cy.get('b').first().should('have.text', `${customer}`)
	}

	static goToMessages() {
		cy.intercept('POST', '**/admin/data/messages/list?*').as('messages')
		cy.get('#myt-DockItem-patrons').click()
		cy.wait('@messages')
	}

	static selectDraftMessage() {
		cy.get('.myt-GridCell').eq(1).click()
	}

	static editMessage(group) {
		cy.get('.fa-edit').click()
		cy.get('button').contains('Recipients and Schedule').click()
		cy.get('.myt-SelectableListMenuFormBtn').eq(3).click()
		cy.intercept('POST', '**/admin/data/messages/estimateRecipientCount*').as('estimateRecipientCount')
		cy.get('.myt-SelectableListViewItem').contains(group).click()
		cy.wait('@estimateRecipientCount')
		cy.get('.myt-msgs-WizSectionScheduleOnce').find('.myt-Btn').contains('at').click()
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

	static selectNewMessage() {
		cy.get('.myt-RootPanel').find('button').contains('New Message').click()
	}

	static selectNewMessageOption(option) {
		cy.intercept('POST', '**/admin/data/messages/estimateRecipientCount?*').as('data')
		cy.get('.myt-msgs-WizPanelIntro').find('button').contains(option).click()
		cy.wait('@data')
	}

	static fillOutTemplate() {
		const today = new Date()
		const mil = today.getMilliseconds()
		cy.fixture('draftMessage.json').then((draft) => {
			title = `${draft.title} ${mil}`
			cy.get('.myt-msgs-WizSectionContent').within(() => {
				cy.get('input').first().type(title)
				cy.get('input').eq(1).type(draft.pushTitle)
				cy.get('textarea').first().type(draft.pushMessage)
				cy.get('input[type=file]').first().selectFile('cypress/fixtures/draft.png', {
					action: 'drag-drop',
				})
				cy.get('textarea').eq(1).type(draft.content)
				cy.get('input[type=file]').last().selectFile('cypress/fixtures/2XPoints.jpg', {
					action: 'drag-drop',
				})
			})
		})
	}

	static saveAsDraft() {
		cy.intercept('POST', '**/admin/data/messages/create?*').as('create')
		cy.get('.myt-footerbar').find('button').contains('Save as Draft').click()
		cy.wait('@create').its('response.statusCode').should('eq', 200)
	}

	static validateCreatedDraft() {
		const templateTitle = title
		cy.get('.myt-ListScreenRow').find('.myt-GridCell').contains(templateTitle).should('be.visible').click()
	}

	static deleteDraft() {
		const templateTitle = title
		cy.intercept('POST', '**/admin/data/messages/delete?*').as('delete')
		cy.get('.myt-footerbar').find('button').contains('Delete').click()
		cy.get('.myt-interior-dialog').find('button').contains('Delete').click()
		cy.wait('@delete').its('response.statusCode').should('eq', 200)
		cy.get('.myt-ListScreenRow').find('.myt-GridCell').contains(templateTitle).should('not.exist')
	}

	static duplicateDraft() {
		cy.intercept('POST', '**/admin/data/messages/create?*').as('create')
		cy.get('.myt-footerbar').find('button').contains('Duplicate').click()
		cy.wait('@create').its('response.statusCode').should('eq', 200)
	}

	static verifyDuplicatedDraft() {
		cy.get('.myt-msgs-ListScreen')
			.find('.myt-ListScreenRow')
			.eq(1)
			.children('div.myt-GridCell')
			.eq(1)
			.invoke('text')
			.then(($text) => {
				title = `Copy of ${$text}`
				this.validateCreatedDraft()
				this.deleteDraft()
			})
	}
}

export default message
