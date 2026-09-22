const assert = require('node:assert/strict'), f = require('./support/theme-blocks.cjs');
const script = f.read('assets/qtm-product-block-metadata.js');
async function section(id, design = false) {
  return '<section class="qtm-product-block-section" id="qtm-product-block-section-' + id + '"><form><input name="id" value="10"></form>' + await f.html('product-sku', { hide_when_empty: true }, 'sku-' + id, design) + await f.html('product-description', { enable_read_more: true }, 'desc-' + id, design) + '</section>';
}
(async () => {
  const d = f.dom(await section('one') + await section('two')), w = d.window, doc = w.document, observers = [];
  w.ResizeObserver = class { constructor(callback) { this.callback = callback; this.disconnected = false; observers.push(this); } observe() {} disconnect() { this.disconnected = true; } };
  const one = doc.querySelector('#qtm-product-block-section-one'), two = doc.querySelector('#qtm-product-block-section-two');
  const sku = root => root.querySelector('[data-product-sku]'), value = root => root.querySelector('[data-product-sku-value]').textContent.trim(), desc = root => root.querySelector('[data-product-description]');
  const content = desc(one).querySelector('[data-product-description-content]'), toggle = desc(one).querySelector('button');
  let height = 700; Object.defineProperty(content, 'scrollHeight', { get: () => height });
  Object.defineProperty(desc(two).querySelector('[data-product-description-content]'), 'scrollHeight', { value: 100 });
  w.eval(script); w.eval(script); doc.dispatchEvent(new w.Event('DOMContentLoaded'));
  assert.equal(observers.length, 2); assert.ok(desc(one).classList.contains('is-enhanced')); assert.ok(!desc(two).classList.contains('is-enhanced')); assert.equal(toggle.hidden, false); assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  toggle.click(); assert.ok(desc(one).classList.contains('is-expanded')); assert.equal(toggle.textContent, 'Read less'); toggle.click(); assert.ok(!desc(one).classList.contains('is-expanded'));
  content.dispatchEvent(new w.FocusEvent('focusin', { bubbles: true })); assert.ok(desc(one).classList.contains('is-expanded'));
  toggle.click(); height = 100; observers[0].callback(); assert.ok(!desc(one).classList.contains('is-enhanced')); assert.ok(toggle.hidden); assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  height = 900; w.dispatchEvent(new w.Event('resize')); assert.ok(desc(one).classList.contains('is-enhanced'));
  content.dispatchEvent(new w.Event('load')); assert.equal(toggle.hidden, false);
  desc(one).parentElement.dispatchEvent(new w.CustomEvent('shopify:block:select', { bubbles: true })); assert.ok(desc(one).classList.contains('is-expanded'));
  const event = (target, detail, name = 'variant:change') => target.dispatchEvent(new w.CustomEvent(name, { bubbles: true, detail }));
  event(one, { productId: 1, variantId: 100 }); assert.equal(value(one), 'SKU100'); assert.equal(value(two), 'Not available'); assert.ok(!sku(one).classList.contains('product-sku--empty'));
  event(one, { productId: 88, variantId: 101 }); assert.equal(value(one), 'SKU100');
  event(doc, { productId: 1, variantId: 101 }); assert.equal(value(one), 'SKU100'); assert.equal(value(two), 'Not available', 'ambiguous legacy document event is ignored');
  event(doc, { productId: 1, sectionId: 'two', variant: { id: 101 } }, 'qtm:variant:change'); assert.equal(value(two), 'OUT'); assert.equal(value(one), 'SKU100');
  const input = one.querySelector('input'); input.value = '101'; input.dispatchEvent(new w.Event('change', { bubbles: true })); assert.equal(value(one), 'OUT');
  input.value = ''; input.dispatchEvent(new w.Event('change', { bubbles: true })); assert.equal(value(one), 'Not available'); assert.ok(sku(one).classList.contains('product-sku--empty'));
  event(one, { productId: 1, variant: { id: 100 } }, 'product:variant-change'); assert.equal(value(one), 'SKU100');
  event(one, { productId: 1, variant: null }); assert.equal(value(one), 'Not available');
  // The actual form/picker producer bodies now dispatch bubbling events from their own roots.
  for (const name of ['form', 'variant-picker']) {
    const source = f.unpack('product-' + name).liquid, body = source.match(/const dispatchVariantChange = \(variant\) => \{([\s\S]*?)\n\s*};/)[1].replace(/{{ product_context.id \| json }}/g, '1');
    w.__producerRoot = one; w.__variant = f.variants[1]; w.eval('((root, variant) => {' + body + '})(window.__producerRoot, window.__variant)'); assert.equal(value(one), 'SKU100'); assert.equal(value(two), 'OUT');
  }
  one.dispatchEvent(new w.CustomEvent('shopify:section:unload', { bubbles: true })); assert.ok(observers[0].disconnected); assert.ok(!desc(one).classList.contains('is-enhanced'));
  const old = value(one); event(one, { productId: 1, variantId: 101 }); assert.equal(value(one), old); height = 1000; observers[0].callback(); assert.ok(!desc(one).classList.contains('is-enhanced'), 'stale resize is inert');
  one.dispatchEvent(new w.CustomEvent('shopify:section:load', { bubbles: true })); assert.equal(observers.length, 3); event(one, { productId: 1, variantId: 101 }); assert.equal(value(one), 'OUT');
  one.dispatchEvent(new w.CustomEvent('shopify:section:load', { bubbles: true })); assert.equal(observers.length, 3, 'duplicate load is idempotent');
  doc.body.append(one); await f.drain(); assert.equal(observers.length, 3, 'reorder does not rebind');
  two.remove(); await f.drain(); assert.ok(observers[1].disconnected); event(doc, { productId: 1, variantId: 100 }); assert.equal(value(one), 'SKU100', 'legacy event works with one unambiguous product scope');
  doc.body.insertAdjacentHTML('beforeend', await section('three')); await f.drain(); const three = doc.querySelector('#qtm-product-block-section-three'); event(three, { productId: 1, variantId: 101 }); assert.equal(value(three), 'OUT', 'first dynamic insertion needs no inline script');
  one.remove(); three.remove(); await f.drain(); assert.ok(observers.every(x => x.disconnected)); d.window.close();
  for (const design of [false, true]) {
    const late = f.dom(await section('late', design)), win = late.window; Object.defineProperty(win.document, 'readyState', { value: 'complete' });
    win.eval(script); const root = win.document.querySelector('[data-product-description]'); assert.ok(!root.classList.contains('is-enhanced')); assert.ok(root.querySelector('button').hidden); late.window.close();
  }
  console.log('PASS metadata singleton/late/dynamic boot, scoped real producer bodies, native variant controls, cross-product/cross-instance and legacy event policy, null variant, description no-JS/short/long/toggle/focus/resize/load/editor behavior, unload/reload/reorder/disposal and stale observer delivery. Browser geometry remains queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
