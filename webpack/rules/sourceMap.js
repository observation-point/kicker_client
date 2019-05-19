const { pathToNodeModules } = require('../consts');

module.exports.sourceMapLoader = {
	enforce: 'pre',
	exclude: pathToNodeModules,
	loader: 'source-map-loader',
	test: /\.js$/,
};
