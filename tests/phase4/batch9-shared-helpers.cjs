const assert = require('node:assert/strict');
const fs = require('node:fs');
const {Liquid} = require('liquidjs');
const postcss = require('postcss');
const read = path => fs.readFileSync(path, 'utf8');
const engine = new Liquid({root: ['snippets'], extname: '.liquid'});
// Numeric color adapter for opaque hex fixtures; native Shopify color drops remain a live gate.
const luminance = hex => {
  const value = hex.replace('#', '');
  const rgb = (value.length === 3 ? [...value].map(x => x + x).join('') : value).match(/../g).map(x => parseInt(x, 16) / 255);
  const linear = rgb.map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return linear.reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0);
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
engine.registerFilter('color_contrast', contrast);
const render = (name, context) => engine.parseAndRender(read('snippets/' + name + '.liquid'), context);
const fields = JSON.parse(read('config/settings_schema.json')).flatMap(g => g.settings || []).filter(f => f.id);
const defaults = Object.fromEntries(fields.map(f => [f.id, f.default ?? null]));

(async () => {
  for (const key of ['background', 'bg']) for (const surface of ['#ffffff', '#000000', '#777777', '#f59e0b']) {
    const output = (await render('contrast-text', {[key]: surface, preferred: surface})).trim();
    assert(contrast(surface, output) >= 4.5, key + ' must use the actual surface');
  }
  assert.equal((await render('contrast-text', {background: '#ffffff', bg: '#000000', preferred: '#ffffff'})).trim(), '#000000', 'Canonical argument wins');
  assert.equal((await render('contrast-text', {background: '', bg: '#ffffff', preferred: '#ffffff'})).trim(), '#000000', 'Blank canonical argument uses legacy alias');
  assert.equal((await render('contrast-text', {})).trim(), '#ffffff', 'Missing surface preserves prior dark fallback');
  let consumerCalls = 0;
  for (const file of fs.readdirSync('sections').filter(f => f.endsWith('.liquid'))) {
    for (const match of read('sections/' + file).matchAll(/render 'contrast-text',[^%\r\n]+/g)) {
      const expression = match[0].trim().replace(/-$/, '').trim();
      const context = {settings: {text_on_color: '#ffffff', text_base: '#ffffff'}, g: {text_base: '#ffffff'},
        section: {settings: {card_background: '#ffffff', link_color: '#ffffff'}}, s: {custom_accent_color: '#ffffff'},
        accent: '#ffffff', q_accent: '#ffffff', button_bg: '#ffffff', chip_bg: '#ffffff',
        form_surface_color: '#ffffff', c_primary: '#ffffff', automatic_button_background: '#ffffff',
        effective_surface: '#ffffff', C_text_on_color: '#ffffff', _btn_bg: '#ffffff'};
      const output = (await engine.parseAndRender('{% ' + expression + ' %}', context)).trim();
      assert.equal(output, '#000000', file + ' passes its real surface argument');
      consumerCalls++;
    }
  }
  for (const variant of ['default', 'min', 'max']) {
    const settings = {...defaults, font_body: {family: 'Fixture Body', fallback_families: 'sans-serif'},
      font_heading: {family: 'Fixture Head', fallback_families: 'serif'}};
    if (variant !== 'default') for (const f of fields.filter(f => f.type === 'range')) settings[f.id] = f[variant];
    const css = await render('theme-tokens', {settings}) + await render('utilities', {settings});
    const root = postcss.parse(css), variables = {};
    root.walkRules(':root', rule => rule.walkDecls(d => {variables[d.prop] = d.value;}));
    const resolve = (key, seen = new Set()) => {
      assert(!seen.has(key), 'No token cycle at ' + key); seen.add(key);
      assert(variables[key] !== undefined, 'Defined token: ' + key);
      return variables[key].replace(/var\((--[\w-]+)\)/g, (_, next) => resolve(next, new Set(seen)));
    };
    assert.match(resolve('--qtm-font-body'), /Fixture Body/);
    assert.match(resolve('--qtm-font-heading'), /Fixture Head/);
    assert.equal(resolve('--qtm-bg-base'), settings.bg_base);
    assert.equal(resolve('--qtm-h1-size'), settings.type_h1_size / 100 + 'rem');
    assert.equal(resolve('--qtm-container-xl'), settings.container_xl + 'px');
    assert.equal(resolve('--qtm-page-maxw'), settings.container_lg + 'px');
    assert.equal(resolve('--qtm-section-padding-top'), settings.section_padding_top + 'px');
    assert.equal(resolve('--qtm-button-border-width'), settings.button_border_width + 'px');
    assert.equal(resolve('--qtm-button-radius'), settings.button_radius + 'px');
    assert.equal(resolve('--qtm-badge-sale-bg'), settings.badge_sale_bg);
    assert.equal(resolve('--qtm-text-on-color'), settings.text_on_color);
    assert(!css.includes('NaN') && !css.includes('undefined'));
  }
  const lightOnly = await render('theme-tokens', {settings: {...defaults, enable_dark_mode: false}});
  assert(!lightOnly.includes('[data-theme="dark"]'), 'Explicit false preserves light-only tokens');
  assert.equal((await render('q-spacing', {mt: 0, mb: 4, pt: 8, pb: 0})).trim(), 'style="margin-top: 0px; margin-bottom: 4px; padding-top: 8px; padding-bottom: 0px;"');
  console.log('PASS both contrast argument contracts, preferred/fallback/precedence and ' + consumerCalls + ' actual consumer calls; token aliases at schema default/min/max, zero values, fonts, dark=false and trusted numeric dormant spacing. CSS/color adapters are not live certification.');
})().catch(error => {console.error(error); process.exitCode = 1;});
