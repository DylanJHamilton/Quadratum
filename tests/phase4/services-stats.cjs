const assert = require('node:assert/strict'), f = require('./support/commerce.cjs');
const steps = 'interactive-content-helper-service-process-steps', services = 'interactive-content-helper-services-list-grid', stats = 'interactive-content-helper-stats-strip';
const defaults = settings => Object.fromEntries((settings || []).filter(s => s.id).map(s => [s.id, s.default ?? '']));
const escape = value => String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
f.engine.registerFilter('handleize', value => String(value ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
f.engine.registerFilter('image_tag', (url, ...pairs) => { const args = Object.fromEntries(pairs.filter(Array.isArray)); return '<img src="' + escape(url) + '" width="800" height="600" alt="' + escape(args.alt) + '" class="' + escape(args.class) + '">'; });
const samples = {
  [steps]: [0, 1, 2].map(i => ({ type: 'step', settings: { title: 'Step <' + i + '>', description: '<p>Native <strong>step</strong></p>', image: f.photo(i + 1), icon: f.photo(5), cta_label: 'Read <safe>', cta_url: '/fr/pages/info?a=1&b=2' } })),
  [services]: [0, 1].map(i => ({ type: 'service', settings: { name: 'Service <' + i + '>', short_description: '<p>Native <strong>description</strong></p>', icon_name: 'star', price_label: 'From $100 <safe>', service_cta_label: 'Details <safe>', service_cta_url: '/fr/pages/service?a=1&b=2' } })),
  [stats]: [{ type: 'stat', settings: { value: '1,250+', label: 'Customers <safe>', animate: true } }, { type: 'stat', settings: { value: '4.9★', label: 'Rating', animate: true } }]
};
async function html(name, settings = {}, blocks = samples[name], id = 'one', design = false) {
  const schema = f.unpack(name).schema;
  const nativeBlocks = blocks.map(block => ({ ...block, settings: { ...defaults(schema.blocks.find(s => s.type === block.type)?.settings), ...block.settings } }));
  return '<div id="shopify-section-' + id + '">' + await f.render(name, { id, settings: { ...defaults(schema.settings), ...settings }, blocks: nativeBlocks, data: { request: { design_mode: design } } }) + '</div>';
}
async function host(...args) { return f.dom(await html(...args)); }
function inspect(d, fn) { try { fn(d.window.document); } finally { d.window.close(); } }
function scopes(doc, prefix) {
  function walk(rules) { for (const rule of rules) { if (rule.selectorText) for (const selector of rule.selectorText.split(',')) assert.ok(selector.trim().startsWith(prefix), selector); if (rule.cssRules) walk(rule.cssRules); } }
  for (const sheet of doc.styleSheets) walk(sheet.cssRules);
}
async function matrix(name) {
  const { schema } = f.unpack(name);
  for (const preset of schema.presets || []) inspect(await host(name, preset.settings || {}, preset.blocks || [], 'preset', true), doc => { assert.ok(doc.querySelector('section, [role=status]')); assert.equal(doc.querySelector('a[href=""]'), null); });
  for (const setting of schema.settings || []) {
    const values = setting.options?.map(x => x.value) || (setting.type === 'range' ? [setting.min, setting.max] : setting.type === 'checkbox' ? [false, true] : setting.type === 'number' ? [-10, 0, setting.default, 5000] : []);
    for (const value of values) inspect(await host(name, { [setting.id]: value }), doc => { assert.ok(doc.querySelector('section')); assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/); });
  }
}
function harness(markup, { reduced = false, io = true, design = false } = {}) {
  const d = f.dom(markup), w = d.window, frames = new Map(), observers = [], listeners = new Set(); let next = 1, hidden = false;
  w.Shopify = { designMode: design };
  const motion = { matches: reduced, addEventListener(_, fn) { listeners.add(fn); }, removeEventListener(_, fn) { listeners.delete(fn); } };
  w.matchMedia = () => motion;
  Object.defineProperty(w.document, 'hidden', { get: () => hidden });
  w.requestAnimationFrame = fn => { const id = next++; frames.set(id, fn); return id; };
  w.cancelAnimationFrame = id => frames.delete(id);
  if (io) w.IntersectionObserver = class { constructor(callback) { this.callback = callback; this.nodes = new Set(); this.disconnected = false; observers.push(this); } observe(node) { this.nodes.add(node); } unobserve(node) { this.nodes.delete(node); } disconnect() { this.nodes.clear(); this.disconnected = true; } };
  f.boot(w, ['interactive-content-stats.js']);
  return { d, w, frames, observers, listeners, tick(ts) { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(fn => fn(ts)); }, reveal() { for (const o of observers) o.callback([...o.nodes].map(target => ({ target, isIntersecting: true }))); }, motion(value) { motion.matches = value; for (const fn of listeners) fn(); }, hide() { hidden = true; w.document.dispatchEvent(new w.Event('visibilitychange')); } };
}
(async () => {
  for (const value of ['px-0', 'px-32', 'py-2', 'py-32', 'md:px-0', 'md:px-32', 'md:py-0', 'md:py-32']) assert.ok(f.read('assets/theme.css').includes('.' + value.replace(':', '\\:') + '{'), 'existing free-text spacing utility retained: ' + value);
  await matrix(steps); await matrix(services); await matrix(stats);
  for (const name of [steps, services, stats]) { inspect(await host(name, {}, [], 'empty', false), doc => assert.equal(doc.querySelector('section'), null)); inspect(await host(name, {}, [], 'empty', true), doc => assert.ok(doc.querySelector('[role=status]'))); }
  for (const [index, current] of [[-1, 0], [0, 0], [1, 1], [2.9, 2], [99, 3]]) inspect(await host(steps, { current_step_index: index, enable_progress_bar: true, show_progress_meta: false }), doc => {
    assert.equal(doc.querySelectorAll('[aria-current=step]').length, current ? 1 : 0); const bar = doc.querySelector('[role=progressbar]'); if (!current) assert.equal(bar, null); else { assert.equal(bar.getAttribute('aria-valuenow'), String(current)); assert.equal(bar.getAttribute('aria-valuemin'), '0'); assert.equal(bar.getAttribute('aria-label'), 'Progress'); assert.equal(doc.querySelector('.q-howitworks__progress-top'), null); }
    assert.equal(doc.querySelector('.q-step__title').textContent, 'Step <0>'); assert.equal(doc.querySelector('.q-step__media img').alt, 'Photo <safe>'); assert.equal(doc.querySelector('a').getAttribute('href'), '/fr/pages/info?a=1&b=2'); scopes(doc, '#shopify-section-one');
  });
  for (const [mode, numbers, hasIcon, expectIcon, expectNumber] of [['auto', true, true, 1, 0], ['auto', true, false, 0, 1], ['numbers_only', true, true, 0, 1], ['numbers_only', false, true, 0, 0], ['icons_only', true, false, 0, 0], ['icons_only', false, true, 1, 0]]) inspect(await host(steps, { icon_precedence: mode, show_numbers: numbers, title: '', subtitle: '', current_step_index: 5, enable_progress_bar: true }, [{ type: 'step', settings: { icon: hasIcon ? f.photo() : '', title: '', description: '', image: '', cta_label: '', cta_url: '/valid' } }]), doc => { assert.equal(doc.querySelectorAll('.q-step__icon').length, expectIcon); assert.equal(doc.querySelectorAll('.q-step__number').length, expectNumber); assert.equal(doc.querySelector('header, h3, a, [role=progressbar]'), null); assert.equal(!!doc.querySelector('.q-step__top--plain'), !expectIcon && !expectNumber); });
  for (const layout of ['list', 'grid']) for (const show of [false, true]) inspect(await host(services, { layout, show_price_column: show, show_cta_per_service: show, use_custom_colors: show, global_cta_label: 'All <safe>', global_cta_url: '/fr/pages/all', title: '', subtitle: '' }), doc => {
    assert.equal(doc.querySelector('header'), null); assert.equal(doc.querySelectorAll('.q-svc__cta').length, show ? 2 : 0); assert.equal(doc.querySelectorAll('.q-svc__priceText').length, layout === 'grid' || show ? 2 : 0); if (layout === 'list') assert.equal(doc.querySelectorAll('.q-svc__right').length, show ? 2 : 0);
    assert.equal(doc.querySelectorAll('.q-svc__icon use').length, 2); assert.equal(doc.querySelector('.q-svc__icon use').getAttribute('href'), '/assets/icons.svg#lucide-star'); assert.equal(doc.querySelector('.q-svc__name').textContent, 'Service <0>'); assert.equal(doc.querySelector('.q-svcs__globalBtn').textContent.trim(), 'All <safe>'); assert.equal(doc.querySelector('.q-svcs').style.getPropertyValue('--q-btn-bg').trim(), show ? '#111111' : 'var(--btn-bg, #111)'); scopes(doc, '#shopify-section-one');
  });
  inspect(await host(services, {}, [{ type: 'service', settings: { name: '' } }], 'empty', true), doc => assert.ok(doc.querySelector('[role=status]')));
  for (const library of ['lucide', 'tabler']) inspect(await host(services, {}, [{ type: 'service', settings: { name: 'Icon', icon_name: 'star', icon_library: library } }]), doc => { const id = library + '-star'; assert.ok(f.read('assets/icons.svg').includes('id="' + id + '"')); assert.equal(doc.querySelector('use').getAttribute('href'), '/assets/icons.svg#' + id); });
  inspect(await host(services, { pad_x_px: -5, gap_px: -10, media_size_px: -20 }, [{ type: 'service', settings: { name: 'Photo', icon_name: 'star', image: f.photo() } }]), doc => { assert.equal(doc.querySelector('use'), null); assert.equal(doc.querySelectorAll('img').length, 1); assert.equal(doc.querySelector('.q-svcs').style.getPropertyValue('--q-svcs-pad-x').trim(), '0px'); assert.equal(doc.querySelector('.q-svcs').style.getPropertyValue('--q-svcs-gap').trim(), '0px'); });
  inspect(await host(stats, { enable_counters: false, label_opacity: 0 }, [...samples[stats], { type: 'stat', settings: { value: '', label: '', icon: '<svg></svg>' } }]), doc => { assert.equal(doc.querySelectorAll('.q-stat-item').length, 2); assert.equal(doc.querySelector('[data-q-counter], script'), null); assert.equal(doc.querySelector('.q-stats-strip').style.getPropertyValue('--q-stats-label-opacity').trim(), '0'); });
  assert.equal(f.unpack(stats).schema.settings.find(s => s.id === 'label_opacity').default, 0.8, 'new labels are visible; saved explicit zero is preserved');
  const values = ['1,250+', '$125,000', '4.9★', '98%', '-12.5%', '24/7', '1,23', '1.234,56', '0.1234567', 'No number', '9007199254740992'];
  const blocks = values.map(value => ({ type: 'stat', settings: { value, label: 'Label', animate: true } }));
  const markup = await html(stats, { enable_counters: true }, blocks);
  let h = harness(markup), doc = h.w.document;
  assert.equal(h.observers.length, 1, 'duplicate script/boot mounts once'); assert.equal(h.frames.size, 0, 'waits for intersection'); h.reveal(); assert.equal(h.frames.size, 5, 'ambiguous/localized/multiple/unsafe values retain native text');
  const displays = [...doc.querySelectorAll('[data-q-counter-display]')]; h.tick(0); assert.equal(displays[0].textContent, '0+'); assert.equal(displays[1].textContent, '$0'); assert.equal(displays[4].textContent, '0.0%'); assert.deepEqual([...doc.querySelectorAll('.q-stat-value .visually-hidden')].map(x => x.textContent), values, 'screen readers retain exact native values during animation');
  h.tick(475); assert.notEqual(displays[0].textContent, values[0]); h.tick(950); assert.deepEqual(displays.map(x => x.textContent), values); assert.equal(h.frames.size, 0); h.d.window.close();
  for (const options of [{ reduced: true }, { design: true }, { io: false }]) {
    h = harness(markup, options); if (options.io === false) { assert.equal(h.frames.size, 5); h.tick(0); h.hide(); } assert.equal(h.frames.size, 0); assert.deepEqual([...h.w.document.querySelectorAll('[data-q-counter-display]')].map(x => x.textContent), values); h.d.window.close();
  }
  h = harness(markup); h.reveal(); h.tick(0); h.motion(true); assert.equal(h.frames.size, 0); h.motion(false); h.reveal(); assert.equal(h.frames.size, 0, 'preference change does not replay completed counters'); h.d.window.close();
  const second = await html(stats, { enable_counters: true }, samples[stats], 'two'); h = harness(markup + second); assert.equal(h.observers.length, 2); h.reveal(); h.tick(0); assert.equal(h.frames.size, 7);
  const first = h.w.document.getElementById('shopify-section-one'); first.dispatchEvent(new h.w.CustomEvent('shopify:section:unload', { bubbles: true })); assert.equal(h.frames.size, 2); assert.equal(h.observers[0].disconnected, true); assert.equal(h.listeners.size, 1); first.remove();
  const replacement = h.w.document.createElement('div'); replacement.innerHTML = markup; h.w.document.body.append(replacement); replacement.dispatchEvent(new h.w.CustomEvent('shopify:section:load', { bubbles: true })); assert.equal(h.observers.length, 3); h.reveal(); assert.equal(h.frames.size, 7); h.tick(0); h.tick(950); assert.equal(h.frames.size, 0); h.d.window.close();
  for (const name of [steps, services, stats]) { const d = f.dom(await html(name, {}, undefined, 'first') + await html(name, {}, undefined, 'second')); inspect(d, doc => { const ids = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size); }); }
  console.log('PASS actual Service Process/Services List/Stats settings/presets/select/range/false/number endpoints; named bounded progress, indicator/media/CTA combinations, native sprite/color/price scope, valid empty states, stable counter labels/exact final values, malformed-number fallback, no-JS content, measured RAF/intersection adapters, reduced motion/visibility/editor disposal/reload and multiple hosts. Live Shopify/browser acceptance remains queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
