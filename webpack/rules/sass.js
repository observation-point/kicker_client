const { loader } = require('mini-css-extract-plugin');

const { pathToNodeModules } = require('../consts');

module.exports.sassLoader = {
	exclude: pathToNodeModules,
	test: /\.sass/,
	use: [
	loader,
	'css-loader',
	'sass-loader',
	],
};
