'use strict';

const assert = require('assert');
const css = require('css');
const esr = require('escape-string-regexp');
const qs = require('querystring');

function loader (source) {
  let options;
  try {
    options = qs.parse(this.query.slice(1));
  } catch (err) {
    throw new Error(
      'Split-css-loader is unable to parse the provided query string. ' +
      'Please see usage instructions here: https://git.io/vXmzf'
    );
  }

  this.cacheable();
  return run(source, options);
}

function run (source, options) {
  const ast = css.parse(source);
  const query = new RegExp(`^\\(${esr(options.target)}:\\W*(not-)?(.+)\\)$`);

  assert(ast.type === 'stylesheet', 'split-css-loader expected to parse a stylesheet');
  for (let i = 0; i < ast.stylesheet.rules.length; i++) {
    const rule = ast.stylesheet.rules[i];
    if (rule.type !== 'media') {
      continue;
    }

    const parts = query.exec(rule.media);
    if (!parts) {
      continue;
    }

    const name = parts[2];
    const negated = !!parts[1];
    if ((name === options.value && negated) || (name !== options.value && !negated)) {
      ast.stylesheet.rules.splice(i--, 1);
      continue;
    }

    // Avoid splicing for speed
    ast.stylesheet.rules = ast.stylesheet.rules
      .slice(0, i)
      .concat(rule.rules)
      .concat(ast.stylesheet.rules.slice(i + 1));

    i += rule.rules.length - 1;
  };

  return css.stringify(ast);
}

module.exports = loader;
module.exports.string = run;
