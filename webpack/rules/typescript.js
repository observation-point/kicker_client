const { pathToNodeModules } = require('../consts');

module.exports.typescriptLoader = {
	exclude: pathToNodeModules,
	loader: 'awesome-typescript-loader',
	options: {
		configFileName: 'tsconfig.json',
		useCache: true,
		usePrecompiledFiles: true,
	},
	test: /\.tsx?$/,
};
