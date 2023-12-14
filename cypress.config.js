const { defineConfig } = require('cypress')
const { removeDirectory } = require('cypress-delete-downloads-folder')

module.exports = defineConfig({
	projectId: 'io3fdh',
	blockHosts: ['www.google-analytics.com'],
	viewportWidth: 1920,
	viewportHeight: 1080,
	screenshotOnRunFailure: true,
	video: true,
	videoCompression: 10,
	videoUploadOnPasses: true,
	defaultCommandTimeout: 40000,
	numTestsKeptInMemory: 20,
	responseTimeout: 40000,
	requestTimeout: 40000,
	taskTimeout: 40000,
	execTimeout: 40000,

	retries: {
		runMode: 1,
		openMode: 0,
	},

	scrollBehavior: 'center',

	env: {
		TAGS: 'not @ignore',
		'cypress/globals': true,
	},

	pageLoadTimeout: 30000,
	chromeWebSecurity: false,
	watchForFileChanges: false,
	e2e: {
		specPattern: 'cypress/e2e/**/*.js',
		baseUrl: 'https://master.joingo.com/admin/console/93/',
		testIsolation: false,
		setupNodeEvents(on, config) {
			on('task', { removeDirectory })
		},
	},
})
