const fs = require('node:fs'), assert = require('node:assert/strict');
const {Liquid} = require('liquidjs'), {JSDOM} = require('jsdom');
const source = fs.readFileSync('sections/grid-banner.liquid', 'utf8');
const start = source.lastIndexOf('{% schema %}');
const schema = JSON.parse(source.slice(start + 12).split('{% endschema %}')[0]);
const defaults = fields => Object.fromEntries(fields.filter(f => f.id).map(f => [f.id, f.default ?? null]));
const globals = Object.assign({}, ...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(g => defaults(g.settings || [])));
const engine = new Liquid({root: 'snippets', extname: '.liquid'});
engine.registerFilter('image_url', image => {assert(image, 'do not transform a missing image'); return '/image.jpg';});
engine.registerFilter('image_tag', url => `<img src="${url}" width="1000" height="700">`);
const blocks = schema.presets[0].blocks.map((block, i) => ({id: `tile-${i}`, type: block.type, settings: {...defaults(schema.blocks[0].settings), ...block.settings}}));
const render = (id, overrides = {}, tiles = blocks) => engine.parseAndRender(source.slice(0, start), {section: {id, settings: {...defaults(schema.settings), ...schema.presets[0].settings, ...overrides}, blocks: tiles}, settings: globals});
(async () => {
  for (const mode of ['hero_only', 'grid_only', 'hero_plus_grid']) {
    const tiles = blocks.map(block => ({...block, settings: {...block.settings, span_cols_m: 3, span_cols_t: 6, span_cols_d: 12, background_video: '/tile.mp4', cta_link: '/collections/all'}}));
    const html = await render('one', {layout_mode: mode, anchor_id: 'custom:anchor', hero_video: 'https://youtu.be/abc123', send_events: true, cols_mobile: '1', cols_tablet: '4', cols_desktop: '8', hero_cta_text: 'Explore', hero_cta_collection: {url: '/collections/hero'}, hero_cta_aria: 'Explore collection'}, tiles) + await render('two', {layout_mode: mode, send_events: false, hero_video: '/second.mp4'});
    const dom = new JSDOM(html, {runScripts: 'outside-only', pretendToBeVisual: true}), w = dom.window;
    const roots = [...w.document.querySelectorAll('[data-grid-banner]')];
    assert.equal(roots.length, 2); assert.equal(roots[0].id, 'custom:anchor');
    assert.equal(roots[0].querySelectorAll('.q-hero').length, mode === 'grid_only' ? 0 : 1);
    assert.equal(roots[0].querySelectorAll('.q-item').length, mode === 'hero_only' ? 0 : 4);
    roots[0].querySelectorAll('.q-item').forEach(tile => {assert.equal(tile.style.getPropertyValue('--cspan-m'), '1'); assert.equal(tile.style.getPropertyValue('--cspan-t'), '4'); assert.equal(tile.style.getPropertyValue('--cspan-d'), '8');});
    if (mode !== 'grid_only') {
      assert.equal(roots[0].querySelector('.q-hero').style.height, '', 'mobile inline height cannot defeat desktop setting');
      assert.equal(roots[0].querySelector('.q-hero a').getAttribute('href'), '/collections/hero');
      assert.equal(roots[0].querySelector('.q-hero a').getAttribute('aria-label'), 'Explore collection');
    }
    const motion = new w.EventTarget(); motion.matches = true; w.matchMedia = () => motion;
    w.HTMLMediaElement.prototype.play = function () {this.dataset.playing = 'true'; return Promise.resolve();};
    w.HTMLMediaElement.prototype.pause = function () {this.dataset.playing = 'false';};
    w.eval(fs.readFileSync('assets/video-hero-banner.js', 'utf8')); w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
    roots[0].querySelectorAll('iframe').forEach(frame => assert(!frame.hasAttribute('src')));
    roots[0].querySelector('[data-video-hero-toggle]').click();
    roots[0].querySelectorAll('iframe').forEach(frame => assert(frame.src.includes('/embed/abc123')));
    roots[0].querySelectorAll('video').forEach(video => {assert(!video.autoplay); assert.equal(video.dataset.playing, 'true');});
    w.dataLayer = []; let events = 0; w.addEventListener('quadratum:cta', () => events++);
    const analytics = fs.readFileSync('assets/grid-banner.js', 'utf8'); w.eval(analytics); w.eval(analytics);
    roots[0].querySelector('a.q-btn').dispatchEvent(new w.MouseEvent('click', {bubbles: true})); assert.equal(events, 1); assert.equal(w.dataLayer.length, 1);
    roots[0].dataset.sendEvents = 'false'; roots[0].querySelector('a.q-btn').dispatchEvent(new w.MouseEvent('click', {bubbles: true})); assert.equal(events, 1);
    roots[0].dispatchEvent(new w.Event('shopify:section:unload', {bubbles: true}));
    roots[0].querySelectorAll('iframe').forEach(frame => assert(!frame.hasAttribute('src')));
    roots[0].querySelectorAll('video').forEach(video => assert.equal(video.dataset.playing, 'false'));
    for (const sheet of w.document.styleSheets) for (const rule of [...sheet.cssRules].flatMap(r => r.cssRules ? [...r.cssRules] : [r])) if (rule.selectorText) for (const selector of rule.selectorText.split(',')) assert(selector.trim().startsWith('#shopify-section-'), 'all CSS uses stable section identity');
    dom.window.close();
  }
  const mobileOnly = new JSDOM(await render('mobile', {hero_mobile_image: {id: 1}, hero_overlay_opacity: 0, overlay_opacity: 0}, [{...blocks[0], settings: {...blocks[0].settings, mobile_image: {id: 2}}}]));
  assert.equal(mobileOnly.window.document.querySelectorAll('.q-gradient').length, 2, 'gradient switches remain independent of solid opacity');
  assert.equal(mobileOnly.window.document.querySelectorAll('img').length, 2); mobileOnly.window.close();
  const ids = new Set(schema.settings.map(f => f.id));
  for (const id of ['hero_cta_text', 'hero_cta_link', 'hero_cta_product', 'hero_cta_collection', 'hero_cta_article', 'hero_cta_aria', 'hero_cta2_text', 'hero_cta2_link', 'hero_cta2_aria']) assert(ids.has(id), id);
  console.log('PASS Grid Banner: three layouts, preset tiles, clamped spans, hero CTA pickers/labels, mobile-only images, stable anchors/scoped CSS, media pause/reduced-motion/unload and exactly-once analytics.');
})().catch(error => {console.error(error); process.exitCode = 1;});
