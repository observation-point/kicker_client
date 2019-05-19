const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { cpus } = require('os');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const {
	devTools,
	mode,
	production,
	rootPath,
	watchOptions,
} = require('./consts');
const { config: devServerConfig } = require('./devServer');
const { plugins } = require('./plugins');
const { rules } = require('./rules');

// ===========

const extensions = [ '.ts', '.tsx', '.js', '.json', '.less', '.css' ];

// ===========

const externals = {
	lodash: '_',
	moment: 'moment',
	react: 'React',
	'react-dom': 'ReactDOM',
	'react-redux': 'ReactRedux',
	redux: 'Redux',
	uuid: 'uuid',
};

// ===========

const noParse = Object.keys(externals)
	.map(key => new RegExp(key));

const minimizer = [];

if (production) {
	minimizer.push(new OptimizeCSSAssetsPlugin());
	minimizer.push(new TerserPlugin({
		extractComments: true,
		parallel: true,
		test: /\.js/,
	}));
}

// ===========

const config = {
	externals,
	mode,
	plugins,
	watchOptions,
	bail: production,
	cache: true,
	devServer: devServerConfig,
	devtool: devTools,
	entry: './src/index.tsx',
	module: { rules, noParse },
	name: 'default',
	optimization: {
		minimizer,
		nodeEnv: mode,
	},
	output: {
		filename: '[name].js?[hash]',
		path: resolve(rootPath, 'build'),
		publicPath: '/',
	},
	parallelism: cpus().length,
	resolve: { extensions },
	target: 'web',
};

module.exports = config;
