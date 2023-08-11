const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
	projectId: 'io3fdh',
	blockHosts: ['www.google-analytics.com'],
	viewportWidth: 1920,
	viewportHeight: 1080,
	screenshotOnRunFailure: true,
	video: true,
	videoCompression: 10,
	videoUploadOnPasses: false,
	defaultCommandTimeout: 90000,
	numTestsKeptInMemory: 20,
	responseTimeout: 40000,
	requestTimeout: 40000,
	taskTimeout: 60000,
	execTimeout: 60000,

	retries: {
		runMode: 1,
		openMode: 0,
	},

	scrollBehavior: 'center',

	env: {
		TAGS: 'not @ignore',
	},

	pageLoadTimeout: 90000,
	chromeWebSecurity: false,
	watchForFileChanges: false,
	e2e: {
		setupNodeEvents(on, config) {
			on('file:preprocessor', createBundler())
			on(
				'file:preprocessor',
				createBundler({
					plugins: [createEsbuildPlugin.default(config)],
				})
			)

			preprocessor.addCucumberPreprocessorPlugin(on, config)
			return config
		},
		specPattern: '**/*.feature',
		baseUrl: 'https://master.joingo.com/admin/console/97/#/patrons/default',
	},
})
