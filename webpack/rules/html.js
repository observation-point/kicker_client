const { pathToNodeModules } = require('../consts');

module.exports.htmlLoader = {
	exclude: pathToNodeModules,
	loader: 'html-loader',
	test: /\.html/,
};
