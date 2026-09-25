const fs = require('node:fs'), assert = require('node:assert/strict');
const {Liquid} = require('liquidjs'), {JSDOM} = require('jsdom');
const source = fs.readFileSync('sections/sub-banner-split.liquid', 'utf8'), start = source.lastIndexOf('{% schema %}');
const schema = JSON.parse(source.slice(start + 12).split('{% endschema %}')[0]);
const defaults = fields => Object.fromEntries(fields.filter(f => f.id).map(f => [f.id, f.default ?? null]));
const globals = Object.assign({}, ...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(g => defaults(g.settings || [])));
const engine = new Liquid(); engine.registerFilter('image_url', image => {assert(image); return '/image.jpg';}); engine.registerFilter('image_tag', url => `<img src="${url}">`);
const button = (id, settings = {}) => ({id, type: 'button', settings: {...defaults(schema.blocks[0].settings), ...settings}});
const render = (id, settings = {}, blocks = [button('first'), button('second')]) => engine.parseAndRender(source.slice(0, start), {section: {id, settings: {...defaults(schema.settings), ...schema.presets[0].settings, ...settings}, blocks}, settings: globals});
(async () => {
  for (const overlay of ['none', 'solid', 'gradient']) for (const align of ['left', 'center', 'right']) {
    const html = await render('one', {anchor_id: 'sale:2026', overlay_mode: overlay, text_alignment: align, strict_center_mode: true, panel_radius: 0, panel_backdrop_blur: 0, enable_overlap: true, safe_offset_px: 80}) + await render('two', {heading_level: 'h1', simple_mode: true, subheading_size: 'xl'});
    const dom = new JSDOM(html), roots = [...dom.window.document.querySelectorAll('[data-split-sub-banner]')];
    assert.equal(roots[0].id, 'sale:2026'); assert.equal(roots[1].id, 'two'); assert(roots[1].querySelector('h1')); assert.equal(roots[1].querySelector('.q-sub').style.fontSize, '1.25rem');
    assert.equal(roots[0].querySelector('.q-panel').style.textAlign, align); assert.equal(roots[0].style.getPropertyValue('--q-safe-offset'), '80px');
    assert.equal(roots[0].querySelectorAll('.q-overlay').length, overlay === 'solid' ? 1 : 0); assert.equal(roots[0].querySelectorAll('.q-gradient').length, overlay === 'gradient' ? 1 : 0);
    for (const sheet of dom.window.document.styleSheets) for (const rule of [...sheet.cssRules].flatMap(r => r.cssRules ? [...r.cssRules] : [r])) if (rule.selectorText) for (const selector of rule.selectorText.split(',')) assert(selector.trim().startsWith('#shopify-section-'), 'custom anchors cannot alter CSS scope');
    dom.window.close();
  }
  const dom = new JSDOM(await render('buttons', {}, [button('empty', {link: null}), button('valid', {link: '/pages/about', new_tab: true, use_theme_colors: false, text_color: '#123456', bg_color: '#abcdef', border_width: 0, radius: 0})]));
  const links = dom.window.document.querySelectorAll('a'); assert.equal(links.length, 1); assert.equal(links[0].getAttribute('href'), '/pages/about'); assert.equal(links[0].getAttribute('rel'), 'noopener'); assert.equal(links[0].style.getPropertyValue('--btn-text'), '#123456'); assert.equal(links[0].style.getPropertyValue('--btn-bw'), '0px'); dom.window.close();
  console.log('PASS Split Sub Banner: actual preset/two instances, overlay/alignment modes, literal anchors/scoped CSS, zero button values, heading level, empty-link guard and color overrides. Responsive and Shopify acceptance remain open.');
})().catch(error => {console.error(error); process.exitCode = 1;});
