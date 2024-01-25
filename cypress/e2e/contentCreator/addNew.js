import login from '../../support/pageObject/login'
import contentCreator from '../../support/pageObject/contentCreator'

describe('My Login application', () => {
	before(() => {
		login.login()
		contentCreator.goToContentCreator()
	})
	it('I click on Add New', () => {
		contentCreator.clickOnAddNew()
	})

	it('I Add a new Content', () => {
		contentCreator.createNewContent()
		contentCreator.deleteNewContent()
	})
})
