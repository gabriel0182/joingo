import places from '../../support/pageObject/places'
import login from '../../support/pageObject/login'
import message from '../../support/pageObject/message'

describe('My Login application', () => {
	before(() => {
		login.login()
	})

	it('I go to Places tab', () => {
		message.verifyCustomer('V2Mobi')
		places.goToPlaces()
	})

	it('I select the time window', () => {
		places.selectTimeWindow()
	})
})
