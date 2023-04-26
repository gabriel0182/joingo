import { Then } from '@badeball/cypress-cucumber-preprocessor'
import places from '../../support/pageObject/places'

Then('I select the time window', () => {
	places.selectTimeWindow()
})
