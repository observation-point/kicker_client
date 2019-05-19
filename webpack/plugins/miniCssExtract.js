const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const options = {
	filename: '[name].css?[hash]',
};

module.exports.miniCssExtractPlugin = new MiniCssExtractPlugin(options);
