const assert = require('node:assert/strict'), cp = require('node:child_process'), f = require('./support/theme-blocks.cjs');
const names = ['content-marquee', 'content-scrolling-text', 'content-stats-counter'];
const samples = {
  [names[0]]: { item_1_text: 'One <safe>', item_1_link: '/pages/a?q="safe"&n=1', item_2_text: 'Two', item_2_image: f.photo(2) },
  [names[1]]: { display_text: 'Our <message>', heading: 'Heading', cta_text: 'Read', cta_url: '/pages/a?q="safe"&n=1' },
  [names[2]]: { stat_1_number: '1,250.00', stat_1_prefix: '$', stat_1_suffix: '+', stat_1_heading: 'Merchant data', stat_1_description: '<p>Saved <strong>details</strong></p>', stat_1_icon: '<img onerror=bad>', stat_2_number: '24/7', stat_2_heading: 'Schedule' }
};
let cases = 0;
async function inspect(name, settings, fn = () => {}, design = false) {
 const d = f.dom(await f.html(name, settings, 'One_A', design));
 try {
  const doc = d.window.document, root = doc.getElementById(name + '-One_A'); assert(root);
  assert.equal(doc.querySelectorAll('[data-editor-block]').length, 1);
  assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/);
  assert.equal(doc.querySelector('[onerror],a[href=""]'), null);
  for (const script of doc.querySelectorAll('script')) { assert(script.src); assert(script.defer); }
  for (const a of doc.querySelectorAll('a')) assert(a.textContent.trim() || a.querySelector('img[alt]:not([alt=""])'));
  fn(doc, root); cases++;
 } finally { d.window.close(); }
}
function runtime(markup, { reduced = false, design = false, io = true } = {}) {
 const d = f.dom(markup), w = d.window, doc = w.document, observers = [], resizes = [], motions = [], frames = new Map(); let hidden = false, frame = 0;
 w.Shopify = { designMode: design }; Object.defineProperty(doc, 'hidden', { get: () => hidden });
 w.matchMedia = () => { const listeners = new Set(), m = { matches: reduced, listeners, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn), set(value) { m.matches = value; [...listeners].forEach(fn => fn()); } }; motions.push(m); return m; };
 w.requestAnimationFrame = fn => { frames.set(++frame, fn); return frame; }; w.cancelAnimationFrame = id => frames.delete(id);
 class Observer { constructor(cb) { this.cb = cb; this.nodes = new Set(); this.disconnected = false; } observe(el) { this.nodes.add(el); } unobserve(el) { this.nodes.delete(el); } disconnect() { this.nodes.clear(); this.disconnected = true; } fire(value = true) { this.cb([...this.nodes].map(target => ({ target, isIntersecting: value }))); } }
 if (io) w.IntersectionObserver = class extends Observer { constructor(cb) { super(cb); observers.push(this); } };
 w.ResizeObserver = class extends Observer { constructor(cb) { super(cb); resizes.push(this); } };
 const geometry = scope => scope.querySelectorAll('[data-q-partner-logos]').forEach(root => {
  const view = root.querySelector('[data-q-logos-viewport]'), group = root.querySelector('[data-q-logos-original]'); if (!view || !group) return;
  Object.defineProperty(view, 'clientWidth', { value: 360, configurable: true });
  group.getBoundingClientRect = () => ({ width: 800 });
 }); geometry(doc);
 const assets = ['3rd-party-partner-logos.js', 'interactive-content-stats.js']; assets.forEach(a => w.eval(f.read('assets/' + a))); doc.dispatchEvent(new w.Event('DOMContentLoaded'));
 return { d, w, doc, observers, resizes, motions, frames, geometry,
  reveal() { observers.forEach(o => o.fire()); }, tick(time) { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(fn => fn(time)); },
  event(el, type, extra = {}) { el.dispatchEvent(new w.Event(type, { bubbles: true, ...extra })); },
  hidden(value) { hidden = value; doc.dispatchEvent(new w.Event('visibilitychange')); },
  async settle() { await new Promise(resolve => w.setTimeout(resolve, 0)); }, close() { d.window.close(); }
 };
}
(async () => {
 for (const name of names) {
  const { schema, liquid } = f.unpack(name), old = JSON.parse(cp.execFileSync('git', ['show', '61109f1:blocks/' + name + '.liquid'], { encoding: 'utf8' }).split('{% schema %}')[1].split('{% endschema %}')[0]);
  const byId = Object.fromEntries(schema.settings.filter(x => x.id).map(x => [x.id, x]));
  for (const s of old.settings.filter(x => x.id)) { assert.equal(byId[s.id].type, s.type); assert.deepEqual(byId[s.id].options, s.options); }
  for (const preset of [{ settings: {} }, ...schema.presets]) {
   for (const [key, value] of Object.entries(preset.settings)) { const s = byId[key]; assert(s); if (s.options) assert(s.options.some(x => x.value === value)); if (s.type === 'range') assert(value >= s.min && value <= s.max && Math.abs((value - s.min) / s.step - Math.round((value - s.min) / s.step)) < 1e-6); }
   await inspect(name, preset.settings, (doc, root) => assert(root.hidden));
   await inspect(name, preset.settings, (doc, root) => { assert(!root.hidden); assert(doc.querySelector('[role=note]')); }, true);
  }
  for (const s of Object.values(byId)) for (const value of s.options?.map(x => x.value) || (s.type === 'range' ? [s.min, s.max] : s.type === 'checkbox' ? [false, true] : [])) await inspect(name, { ...samples[name], [s.id]: value });
  await inspect(name, { ...f.defaults(old.settings), ...old.presets[0].settings }, (doc, root) => assert(!root.hidden, 'saved original copy remains visible'));
  await inspect(name, { ...samples[name], show_mobile: false, show_tablet: false, show_desktop: false, animation: 'fade-up' }, (doc, root) => assert.doesNotMatch(root.className, /--hide-|--animation-fade|--animate/), true);
  const two = f.dom(await f.html(name, samples[name], 'One_A') + await f.html(name, samples[name], 'one-a')); const ids = [...two.window.document.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size); two.window.close();
  assert.match(liquid, /prefers-reduced-motion/); assert.match(liquid, /overflow-wrap: anywhere/);
 }
 await inspect(names[0], { ...samples[names[0]], show_item_images: true }, doc => {
  assert.equal(doc.querySelectorAll('[data-q-logos-original] .qtm-marquee__item').length, 2);
  const clone = doc.querySelector('.qtm-marquee__group[aria-hidden]'); assert(clone.hasAttribute('inert')); assert.equal(clone.querySelector('a,button,[tabindex]'), null);
  assert.equal(doc.querySelector('a').getAttribute('href'), '/pages/a?q="safe"&n=1'); assert.equal(doc.querySelector('img').alt, 'Photo <safe>');
 });
 await inspect(names[0], { item_1_enabled: true, item_1_image: f.photo(1), show_item_images: false }, (doc, root) => assert(root.hidden));
 await inspect(names[0], { item_1_enabled: false, item_1_text: 'Disabled' }, (doc, root) => assert(root.hidden));
 await inspect(names[0], { item_8_enabled: true, item_8_image: { ...f.photo(8), alt: '' }, marquee_type: 'logos', item_8_link: '/pages/logo' }, doc => { assert.equal(doc.querySelector('img').alt, 'Logo'); assert.equal(doc.querySelectorAll('[data-q-logos-original] .qtm-marquee__item').length, 1); });
 await inspect(names[1], { ...samples[names[1]], text_style: 'mixed' }, doc => { const group = doc.querySelector('[data-q-logos-original]'); assert.equal(group.querySelectorAll('.qtm-scrolling-text__display:not([aria-hidden])').length, 1); assert.equal(group.querySelectorAll('.qtm-scrolling-text__display--outline').length, 3); assert.equal(doc.querySelector('a').getAttribute('href'), '/pages/a?q="safe"&n=1'); });
 await inspect(names[1], { cta_text: 'Incomplete' }, (doc, root) => { assert(root.hidden); assert.equal(doc.querySelector('.qtm-scrolling-text__header'), null); });
 await inspect(names[2], { ...samples[names[2]], stat_count: 8, stat_8_number: '0' }, doc => { assert.equal(doc.querySelectorAll('article').length, 3); assert.equal(doc.querySelector('.content-stats-counter__icon').textContent.trim(), '<img onerror=bad>'); assert.equal(doc.querySelector('[data-q-counter-display]').textContent.trim(), '1,250.00'); assert.equal(doc.querySelector('.visually-hidden').textContent, '$1,250.00+'); assert(doc.querySelector('strong')); });
 let rt = runtime(await f.html(names[0], samples[names[0]], 'marq') + await f.html(names[1], samples[names[1]], 'scroll'));
 try {
  const [one, two] = rt.doc.querySelectorAll('[data-q-partner-logos]'), button = one.querySelector('button'), viewport = one.querySelector('[data-q-logos-viewport]');
  assert.equal(one.dataset.playing, 'false'); rt.reveal(); assert.equal(one.dataset.playing, 'true'); assert.equal(two.dataset.playing, 'true');
  assert.equal(one.style.getPropertyValue('--q-logos-distance'), '800px'); button.click(); assert.equal(one.dataset.playing, 'false'); assert.equal(button.textContent, 'Start motion'); rt.hidden(true); rt.hidden(false); rt.reveal(); assert.equal(one.dataset.playing, 'false'); assert.equal(two.dataset.playing, 'true'); button.click(); assert.equal(one.dataset.playing, 'true');
  rt.event(viewport, 'pointerenter'); assert.equal(one.dataset.playing, 'false'); rt.event(viewport, 'pointerleave'); assert.equal(one.dataset.playing, 'true');
  viewport.focus(); assert.equal(one.dataset.playing, 'false'); viewport.blur(); assert.equal(one.dataset.playing, 'true'); rt.motions[0].set(true); assert.equal(one.dataset.playing, 'false'); assert(button.hidden); rt.motions[0].set(false); assert.equal(one.dataset.playing, 'true');
  viewport.style.direction = 'rtl'; rt.resizes[0].fire(); assert.equal(one.style.getPropertyValue('--q-logos-direction'), '1');
  rt.w.eval(f.read('assets/3rd-party-partner-logos.js')); assert.equal(rt.observers.length, 2);
  const wrapper = one.parentElement; wrapper.remove(); await rt.settle(); assert(rt.observers[0].disconnected); assert.equal(rt.motions[0].listeners.size, 0);
  rt.doc.body.append(wrapper); await rt.settle(); rt.reveal(); assert.equal(one.dataset.playing, 'true');
  rt.doc.body.append(wrapper); await rt.settle(); assert.equal(rt.observers.length, 3, 'reorder does not duplicate');
  rt.event(one, 'shopify:section:unload'); assert.equal(one.dataset.playing, undefined); rt.event(one, 'shopify:section:load'); rt.reveal(); assert.equal(one.dataset.playing, 'true');
 } finally { rt.close(); }
 rt = runtime(await f.html(names[0], { ...samples[names[0]], pause_on_hover: false })); try { rt.reveal(); const root = rt.doc.querySelector('[data-q-partner-logos]'); rt.event(root.querySelector('[data-q-logos-viewport]'), 'pointerenter'); assert.equal(root.dataset.playing, 'true'); root.querySelector('a').focus(); assert.equal(root.dataset.playing, 'false'); } finally { rt.close(); }
 for (const name of names.slice(0, 2)) { rt = runtime(await f.html(name, samples[name], 'editor', true)); try { rt.reveal(); assert.equal(rt.doc.querySelector('[data-q-partner-logos]').dataset.playing, 'false'); } finally { rt.close(); } }
 const values = ['1,250.00', '24/7', '1.234,56', '0', '-12.5', '9007199254740992']; const settings = { counter_animation: 'count-up', stat_count: 8 }; values.forEach((v, i) => settings['stat_' + (i + 1) + '_number'] = v);
 const markup = await f.html(names[2], settings, 'stats'); rt = runtime(markup + await f.html(names[2], { counter_animation: 'count-up', stat_1_number: '123' }, 'second'));
 try {
  assert.equal(rt.observers.length, 2); rt.reveal(); assert.equal(rt.frames.size, 4); rt.tick(0); assert.equal(rt.doc.querySelector('[data-q-counter-display]').textContent, '0.00');
  assert.deepEqual([...rt.doc.querySelectorAll('#content-stats-counter-stats .visually-hidden')].map(x => x.textContent), values);
  rt.tick(950); assert.deepEqual([...rt.doc.querySelectorAll('#content-stats-counter-stats [data-q-counter-display]')].map(x => x.textContent.trim()), values); assert.equal(rt.frames.size, 0);
  const root = rt.doc.getElementById('content-stats-counter-stats'), wrapper = root.parentElement; wrapper.remove(); await rt.settle(); assert(rt.observers[0].disconnected); rt.doc.body.append(wrapper); await rt.settle(); rt.reveal(); assert.equal(rt.frames.size, 3); rt.tick(0); rt.hidden(true); assert.equal(rt.frames.size, 0); assert.equal(root.querySelector('[data-q-counter-display]').textContent, values[0]);
  rt.event(root, 'shopify:section:unload'); rt.event(root, 'shopify:section:load'); assert.equal(rt.frames.size, 0); rt.hidden(false);
 } finally { rt.close(); }
 for (const opts of [{ reduced: true }, { design: true }, { io: false }]) { rt = runtime(markup, opts); try { if (opts.io === false) { assert.equal(rt.frames.size, 3); rt.tick(0); rt.motions[0].set(true); } rt.reveal(); assert.equal(rt.frames.size, 0); assert.equal(rt.doc.querySelector('[data-q-counter-display]').textContent.trim(), values[0]); } finally { rt.close(); } }
 console.log('PASS ' + cases + ' actual motion/counter renders; every original setting type/option and seven presets, saved text, inert/named originals, sparse/empty/native-image states, exact counters and stable accessible values, raw IDs, independent motion/RAF, focus/manual pause/hover/visibility/reduced motion, RTL measurement, mutation insert/remove/reorder and editor disposal/reload. DOM/geometry/RAF adapters are not live acceptance.');
})().catch(e => { console.error(e); process.exitCode = 1; });
