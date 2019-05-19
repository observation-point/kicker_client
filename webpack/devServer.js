const { resolve } = require('path');

const { rootPath } = require('./consts');

module.exports.config = {
	clientLogLevel: 'info',
	compress: true,
	contentBase: resolve(rootPath, 'public'),
	disableHostCheck: true,
	historyApiFallback: true,
	host: 'localhost',
	hot: true,
	inline: true,
	noInfo: false,
	open: true,
	overlay: {
		errors: true,
		warnings: true,
	},
	port: 3000,
	watchContentBase: true,
};
