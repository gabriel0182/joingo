import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import places from '../../support/pageObject/places'

When('I click on Add a New Places', () => {
	places.addNewPlace()
})

When('I select {string}', (option) => {
	places.selectPlaceOption(option)
})

When('I select a point the map', () => {
	places.clickOnMap()
})

When('I type a location required fields', () => {
	places.setLocationRequiredFields()
	places.addLocation()
})
