import login from '../../support/pageObject/login'
import assetManager from '../../support/pageObject/assetManager'

describe('My Login application', () => {
	before(() => {
		login.login()
	})
	it('I go to the Asset Manager option', () => {
		assetManager.goToAssetManager()
	})

	it('I import a new asset file', () => {
		assetManager.clickOnImport()
		assetManager.importAsset()
		assetManager.deleteImportedAsset()
	})
})
