'use strict';

const split = require('./');
const expect = require('chai').expect;

describe('split-css-loader', () => {
  const run = (css) => split.string(css, { target: 'platform', value: 'xbox' });

  it('passes through default rules', () => {
    expect(run('body { background: #000 }')).to.equal('body {\n  background: #000;\n}');
  });

  it('allows target value', () => {
    expect(run(`
      @media (platform: xbox) {
        body { background: #000 }
      }
    `)).to.equal('body {\n  background: #000;\n}');
  });

  it('disallows other values', () => {
    expect(run(`
      @media (platform: desktop) {
        body { background: #000 }
      }
    `)).to.equal('');
  });

  it('allows other negations', () => {
    expect(run(`
      @media (platform: not-desktop) {
        body { background: #000 }
      }
    `)).to.equal('body {\n  background: #000;\n}');
  });

  it('disallows self-negations', () => {
    expect(run(`
      @media (platform: not-xbox) {
        body { background: #000 }
      }
    `)).to.equal('');
  });
});
