const { DefinePlugin } = require('webpack');

module.exports.definePlugin = new DefinePlugin({
	MAIN_HOST: `'${process.env.KL_SERVER_HOST}'`,
});
