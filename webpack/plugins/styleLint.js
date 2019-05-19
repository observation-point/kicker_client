const { resolve } = require('path');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

const { production, rootPath } = require('../consts');

module.exports.styleLintPlugin = new StylelintWebpackPlugin({
	configFile: resolve(rootPath, 'stylelint.json'),
	context: resolve(rootPath, 'src'),
	emitErrors: true,
	failOnError: production,
	files: [ '*.sass' ],
	lintDirtyModulesOnly: false,
	syntax: 'sass',
});
