const { resolve } = require('path');

const {
	KL_ENV = 'dev',
	KL_SERVER_HOST,
	KL_DISABLE_LINTER = 'false',
} = process.env;

const disableLinter = KL_DISABLE_LINTER === 'true';
const production = KL_ENV === 'prod';
const rootPath = resolve(__dirname, '..');

module.exports.watchOptions = {
	aggregateTimeout: 0,
	ignored: /node_modules/,
	poll: 1000,
};

module.exports.rootPath = rootPath;

module.exports.production = production;
module.exports.mode = production ? 'production' : 'development';
module.exports.devTools = production ? false : 'source-map';
module.exports.pathToNodeModules = resolve(rootPath, 'node_modules');

module.exports.useLinter = production ? true : !disableLinter;
