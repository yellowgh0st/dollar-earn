const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const path = require('path')

module.exports = (config) => {
	config.resolve.plugins.map(plugin => {
		if (plugin instanceof ModuleScopePlugin) {
			plugin.allowedFiles.add(
				path.resolve('./data/pools.json'),
			)
		}
	})

	return config
}
