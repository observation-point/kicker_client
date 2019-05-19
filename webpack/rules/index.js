const { production, useLinter } = require('../consts');

const { htmlLoader } = require('./html');
const { sassLoader } = require('./sass');
const { sourceMapLoader } = require('./sourceMap');
const { tslintLoader } = require('./tslint');
const { typescriptLoader } = require('./typescript');

const rules = [];

module.exports.rules = rules;

rules.push(typescriptLoader);
rules.push(sassLoader);
rules.push(htmlLoader);

if (useLinter) {
	rules.push(tslintLoader);
}

if (!production) {
	rules.push(sourceMapLoader);
}
