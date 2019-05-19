const { production, useLinter } = require('../consts');

const { hotModuleReplacementPlugin } = require('./hotModuleReplacement');

const { definePlugin } = require('./define');
const { htmlWebpackPlugin } = require('./htmlWebpack');
const { miniCssExtractPlugin } = require('./miniCssExtract');
const { styleLintPlugin } = require('./styleLint');

const plugins = [];

module.exports.plugins = plugins;

plugins.push(definePlugin);
plugins.push(htmlWebpackPlugin);
plugins.push(miniCssExtractPlugin);

if (useLinter) {
	plugins.push(styleLintPlugin);
}

if (!production) {
	plugins.push(hotModuleReplacementPlugin);
}
