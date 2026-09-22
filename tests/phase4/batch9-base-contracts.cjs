const assert = require('node:assert/strict');
const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const {Liquid} = require('liquidjs');
const postcss = require('postcss');
const read = path => process.env.B9_BASELINE_REF ? execFileSync('git', ['show', process.env.B9_BASELINE_REF + ':' + path], {encoding: 'utf8'}) : fs.readFileSync(path, 'utf8');

(async () => {
  const engine = new Liquid({root: ['snippets'], extname: '.liquid'});
  const settings = {font_body: {family: 'Merchant Body', fallback_families: 'sans-serif'},
    font_heading: {family: 'Merchant Head', fallback_families: 'serif'}, text_base: '#fafafa', color_primary: '#ab1234', bg_base: '#121212'};
  const css = await engine.parseAndRender(read('snippets/theme-tokens.liquid'), {settings}) + await engine.parseAndRender(read('assets/q-base.css.liquid'), {settings});
  const root = postcss.parse(css), values = {};
  root.walkRules(':root', rule => rule.walkDecls(d => {values[d.prop] = d.value;}));
  function resolve(key, seen = []) {
    assert(!seen.includes(key), 'No cyclic aliases');
    assert(values[key] !== undefined, 'Token definition for ' + key);
    return values[key].replace(/var\((--[\w-]+)(?:,\s*([^()]*))?\)/g, (_, next, fallback) => values[next] !== undefined ? resolve(next, [...seen, key]) : fallback || '');
  }
  assert.match(resolve('--q-head'), /Merchant Head/, 'Base headings use the actual configured font');
  assert.match(resolve('--q-body'), /Merchant Body/, 'Base body uses the actual configured font');
  assert.equal(resolve('--q-foreground'), '#fafafa');
  assert.equal(resolve('--q-primary'), '#ab1234');
  assert.equal(resolve('--q-card'), '#121212');
  const base = postcss.parse(read('assets/q-base.css.liquid'));
  const textRules = [];
  base.walkRules(rule => {if (rule.selector.split(',').map(s => s.trim()).some(s => ['p', 'li', 'span'].includes(s))) textRules.push(rule);});
  for (const rule of textRules) rule.walkDecls(d => {
    if (['color', 'line-height'].includes(d.prop)) assert.equal(d.value, 'inherit', 'Nested text must preserve its host foreground and rhythm');
  });
  const surface = postcss.parse(read('assets/qtm-section-surfaces.css'));
  surface.walkRules(rule => assert(rule.selector.split(',').every(s => s.trim().startsWith('.q-section') || s.trim().startsWith('.q-section--bg-')), 'Surface stylesheet stays opt-in'));
  for (const file of ['assets/qtm-section-surfaces.css', 'assets/quadratum-tokens.css']) postcss.parse(read(file));
  console.log('PASS base and canonical token composition: configured fonts/palette resolve without missing IDs; nested text inherits component foreground/rhythm; surface rules remain opt-in. PostCSS/source contracts do not certify browser cascade or geometry.');
})().catch(error => {console.error(error); process.exitCode = 1;});
