const assert = require('node:assert/strict'), f = require('./support/theme-blocks.cjs');
const script = f.read('assets/qtm-content-blocks-engine.js');
async function setup(options = {}) {
  const d = f.dom(await f.html('content-heading', { animation: 'fade-up' }, 'one') + await f.html('content-button', { animation: 'zoom' }, 'two'));
  const w = d.window, events = [], observers = [], motion = { matches: !!options.reduced, addEventListener(type, fn) { events.push(fn); } };
  w.matchMedia = () => motion;
  if (options.editor) w.Shopify = { designMode: true };
  if (!options.noObserver) w.IntersectionObserver = class {
    constructor(callback, settings) { if (options.broken) throw new Error('Unavailable'); this.callback = callback; this.settings = settings; this.targets = new Set(); this.observedCalls = 0; observers.push(this); }
    observe(target) { this.targets.add(target); this.observedCalls++; }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
  };
  if (options.late) Object.defineProperty(w.document, 'readyState', { value: 'complete', configurable: true });
  w.eval(script); w.eval(script);
  if (!options.late) w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  return { d, w, observers, motion, events, one: w.document.querySelector('#qtm-content-block-one'), two: w.document.querySelector('#qtm-content-block-two') };
}
(async () => {
  const x = await setup(), { d, w, observers, one, two, motion, events } = x;
  assert.equal(observers.length, 1, 'one controller despite duplicate assets/boot');
  const observer = observers[0]; assert.equal(observer.targets.size, 2); assert.equal(observer.settings.threshold, 0, 'tall blocks can reveal');
  w.QuadratumContentBlocksEngine.init(w.document); assert.equal(observer.observedCalls, 2);
  assert.ok(one.classList.contains('is-observed')); assert.equal(one.classList.contains('is-visible'), false);
  observer.callback([{ target: one, isIntersecting: false }]); assert.equal(one.classList.contains('is-visible'), false);
  observer.callback([{ target: one, isIntersecting: true }]); assert.ok(one.classList.contains('is-visible')); assert.equal(observer.targets.has(one), false); assert.ok(observer.targets.has(two));
  two.querySelector('a').dispatchEvent(new w.FocusEvent('focusin', { bubbles: true })); assert.ok(two.classList.contains('is-visible')); assert.equal(observer.targets.size, 0);
  // Unload disposes both pending and completed state; the same nodes can be loaded again.
  const firstWrapper = one.parentElement;
  firstWrapper.dispatchEvent(new w.CustomEvent('shopify:section:unload', { bubbles: true })); assert.equal(one.classList.contains('is-visible'), false);
  firstWrapper.dispatchEvent(new w.CustomEvent('shopify:section:load', { bubbles: true })); assert.ok(observer.targets.has(one)); assert.ok(two.classList.contains('is-visible'));
  firstWrapper.dispatchEvent(new w.CustomEvent('shopify:block:select', { bubbles: true })); assert.ok(one.classList.contains('is-visible')); assert.equal(observer.targets.size, 0);
  w.QuadratumContentBlocksEngine.dispose(one); w.QuadratumContentBlocksEngine.init(one); assert.ok(observer.targets.has(one), 'root itself can be initialized');
  w.QuadratumContentBlocksEngine.dispose(two); w.QuadratumContentBlocksEngine.init(two); assert.equal(observer.targets.size, 2);
  firstWrapper.dispatchEvent(new w.CustomEvent('shopify:section:unload', { bubbles: true })); firstWrapper.remove();
  observer.callback([{ target: one, isIntersecting: true }]); assert.equal(one.classList.contains('is-visible'), false, 'stale delivery cannot mutate disposed nodes'); assert.ok(observer.targets.has(two));
  motion.matches = true; events[0](); assert.ok(two.classList.contains('is-visible')); assert.equal(observer.targets.size, 0);
  // Content inserted after initial load shares the guarded engine and reorders without double observing.
  w.document.body.insertAdjacentHTML('beforeend', await f.html('content-heading', { animation: 'fade' }, 'three'));
  const third = w.document.querySelector('#qtm-content-block-three');
  third.parentElement.dispatchEvent(new w.CustomEvent('shopify:section:load', { bubbles: true })); assert.ok(third.classList.contains('is-visible')); assert.equal(observer.targets.size, 0);
  motion.matches = false; events[0](); w.QuadratumContentBlocksEngine.init(third); assert.ok(third.classList.contains('is-visible'), 'preference reversal never hides already visible content');
  d.window.close();
  for (const options of [{ reduced: true }, { editor: true }, { noObserver: true }, { broken: true }]) {
    const x = await setup(options); assert.ok(x.one.classList.contains('is-visible')); assert.ok(x.two.classList.contains('is-visible')); assert.equal(x.w.document.querySelector('.is-observed'), null); x.d.window.close();
  }
  const late = await setup({ late: true }); assert.equal(late.observers[0].targets.size, 2); late.d.window.close();
  console.log('PASS shared block engine initial/late/duplicate boot, independent targets, tall intersections, focus and editor selection, unload/reload/reorder/root initialization, stale callbacks, reduced-motion changes, editor visibility, unavailable/broken observer fallbacks and dynamic insertions. No Shopify/editor/browser certification.');
})().catch(error => { console.error(error); process.exitCode = 1; });
