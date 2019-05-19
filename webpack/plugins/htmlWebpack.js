const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const { mode, production, rootPath } = require('../consts');

module.exports.htmlWebpackPlugin = new HtmlWebpackPlugin({
	production,
	cache: true,
	excludeChunks: [],
	filename: 'index.html',
	inject: 'head',
	meta: {
		description: '',
		keywords: '',
		'msapplication-TileColor': '#ffffff',
		'theme-color': '#ffffff',
		viewport: 'width=device-width, initial-scale=1',
	},
	minify: {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true,
	},
	template: resolve(rootPath, 'public', mode + '.html'),
	title: 'Loading',
	xhtml: true,
});
