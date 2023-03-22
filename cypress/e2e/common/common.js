import { Before } from '@badeball/cypress-cucumber-preprocessor'
import login from '../../support/pageObject/login'

Before({ tags: '@login' }, () => {
	login.login()
})
