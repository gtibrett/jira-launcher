/* config-overrides.js */
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	webpack: function (config) {
		if (!config.plugins) {
			config.plugins = [];
		}
		config.plugins.push(
			new CopyWebpackPlugin({
				patterns: [
					{
						context: 'public',
						from:    '**/*',
						filter:  (resourcePath) => {
							if (resourcePath.indexOf('index.html') !== -1) {
								return false;
							}
							
							console.log('[copy]', resourcePath);
							
							return true;
						}
					}
				]
			})
		);
		
		return config;
	},
	//jest:      function (config) {
	//	return config;
	//},
	devServer: function (configFunction) {
		return function (proxy, allowedHost) {
			const config                     = configFunction(proxy, allowedHost);
			config.devMiddleware.writeToDisk = true;
			
			return config;
		};
	}
	//paths:     function (paths, env) {
	//	return paths;
	//}
};