const { pathToNodeModules, production } = require('../consts');

module.exports.tslintLoader = {
	enforce: 'pre',
	exclude: pathToNodeModules,
	loader: 'tslint-loader',
	options: {
		emitErrors: true,
		failOnHint: production,
		fix: !production,
		formatter: 'codeFrame',
		tsConfigFile: 'tsconfig.json',
		typeCheck: true,
	},
	test: /\.tsx?$/,
};
