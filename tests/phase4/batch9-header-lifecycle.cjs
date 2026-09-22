const assert = require('node:assert/strict');
const fs = require('node:fs');
const {Liquid} = require('liquidjs');
const {JSDOM} = require('jsdom');
const read = path => fs.readFileSync(path, 'utf8');
const defaults = fields => Object.fromEntries((fields || []).filter(f => f.id).map(f => [f.id, f.default ?? null]));

(async () => {
  const source = read('sections/header-two.liquid');
  const schema = JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  const globals = Object.assign({}, ...JSON.parse(read('config/settings_schema.json')).map(g => defaults(g.settings)));
  const engine = new Liquid({root: ['snippets'], extname: '.liquid'});
  let html = '<button id="outside">Outside</button>';
  for (const id of ['first', 'second']) {
    const blocks = schema.presets[0].blocks.map((b, i) => ({...b, id: id + i,
      settings: {...defaults(schema.blocks.find(x => x.type === b.type).settings), ...b.settings, url: '/collections/all'}}));
    html += `<section id="shopify-section-${id}">` + await engine.parseAndRender(source.split('{% schema %}')[0], {
      section: {id, settings: {...defaults(schema.settings), sticky_mode: 'hide_on_scroll'}, blocks},
      settings: globals, shop: {name: 'Merchant'}, request: {design_mode: true}, cart: {item_count: 2},
      routes: {root_url: '/', search_url: '/search', cart_url: '/cart', account_url: '/account'},
    }) + '</section>';
  }
  const dom = new JSDOM(html, {url: 'https://shop.test', runScripts: 'outside-only', pretendToBeVisual: true});
  const w = dom.window, doc = w.document;
  const legacyListeners = new Set();
  w.matchMedia = query => query.includes('min-width') ? {
    matches: true, addListener: fn => legacyListeners.add(fn), removeListener: fn => legacyListeners.delete(fn),
  } : {matches: true};
  let sequence = 0;
  const frames = new Map();
  w.requestAnimationFrame = fn => {frames.set(++sequence, fn); return sequence;};
  w.cancelAnimationFrame = id => frames.delete(id);
  const flushFrames = () => {const current = [...frames.values()]; frames.clear(); current.forEach(fn => fn());};
  const registrations = [];
  const originalAdd = w.EventTarget.prototype.addEventListener;
  w.EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (['focusin', 'qtm:header-mobile-open'].includes(type)) registrations.push(type);
    return originalAdd.call(this, type, listener, options);
  };
  const controller = read('assets/header-two.js');
  w.eval(controller); w.eval(controller);
  doc.dispatchEvent(new w.Event('DOMContentLoaded'));
  const section = doc.querySelector('#shopify-section-first');
  const other = doc.querySelector('#shopify-section-second');
  const open = section.querySelector('[data-qh2b-mobile-open]');
  const close = section.querySelector('[data-qh2b-mobile-drawer] [data-qh2b-mobile-close]');
  const drawer = section.querySelector('[data-qh2b-mobile-drawer]');
  const before = registrations.length;
  for (let i = 0; i < 12; i++) {open.click(); flushFrames(); close.click();}
  assert.equal(registrations.length, before, 'Repeated drawer use must not accumulate document listeners');
  assert.equal(legacyListeners.size, 2, 'Exactly one desktop media listener per actual header');
  open.click(); flushFrames();
  doc.querySelector('#outside').focus();
  assert(drawer.contains(doc.activeElement), 'Open drawer contains focus');
  other.querySelector('[data-qh2b-mobile-open]').click(); flushFrames();
  assert.equal(open.getAttribute('aria-expanded'), 'false', 'Opening second header closes first');
  doc.dispatchEvent(new w.KeyboardEvent('keydown', {key: 'Escape'}));
  open.click(); close.click(); open.click(); flushFrames();
  await new Promise(resolve => setTimeout(resolve, 10));
  assert(!drawer.hidden, 'Rapid reopening survives previous close timeout');
  close.click();
  flushFrames();
  w.dispatchEvent(new w.Event('scroll'));
  assert.equal(frames.size, 2, 'Each sticky header schedules one update');
  section.dispatchEvent(new w.CustomEvent('shopify:section:unload', {bubbles: true}));
  assert.equal(legacyListeners.size, 1, 'Unload removes legacy media query listener');
  assert.equal(frames.size, 1, 'Unload cancels its pending sticky update');
  assert(drawer.hidden, 'Unload leaves drawer hidden');
  section.dispatchEvent(new w.CustomEvent('shopify:section:load', {bubbles: true}));
  section.dispatchEvent(new w.CustomEvent('shopify:section:load', {bubbles: true}));
  assert.equal(legacyListeners.size, 2, 'Reload binds once');
  open.click(); flushFrames();
  assert(!drawer.hidden);
  doc.dispatchEvent(new w.KeyboardEvent('keydown', {key: 'Escape'}));
  assert.equal(doc.activeElement, open, 'Escape restores opener');
  section.dispatchEvent(new w.CustomEvent('shopify:section:unload', {bubbles: true}));
  other.dispatchEvent(new w.CustomEvent('shopify:section:unload', {bubbles: true}));
  assert.equal(legacyListeners.size, 0);
  assert.equal(frames.size, 0);
  dom.window.close();
  console.log('PASS actual Header Two preset twice: bounded listeners over 12 cycles, duplicate boot/reload, independent drawers, focus/Escape/rapid reopening, legacy media cleanup and pending sticky-frame cancellation. Live browser geometry/Shopify editor remains queued.');
})().catch(error => {console.error(error); process.exitCode = 1;});
