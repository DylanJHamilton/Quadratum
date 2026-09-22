const assert = require('node:assert/strict'), f = require('./support/theme-blocks.cjs');
const names = ['form', 'variant-picker', 'price', 'add-to-cart', 'dynamic-checkout', 'quantity-selector', 'sticky-add-to-cart', 'sku'];
const variants = f.variants.map((v, i) => ({ ...v, unit_price: i === 1 ? 400 : 200, unit_price_measurement: { reference_value: 1, reference_unit: 'kg' }, selling_plan_allocations: v.selling_plan_allocations.map(a => ({ ...a, unit_price: 100 })) }));
const product = { ...f.product, has_only_default_variant: false, variants, selected_or_first_available_variant: variants[0] };
async function section(id, options = {}) {
  let out = '<section class="qtm-product-block-section" id="qtm-product-block-section-' + id + '">';
  for (const name of options.names || names) out += await f.html('product-' + name, options.settings?.[name] || {}, id + '-' + name, false, { product: options.product || product });
  return out + '</section>';
}
const files = ['qtm-product-block-metadata.js', 'product-selling-plans.js', 'qtm-product-block-commerce.js'];
const q = (root, selector) => root.querySelector(selector);
function change(w, input, value) { input.value = value; input.dispatchEvent(new w.Event('change', { bubbles: true })); }
function select(w, root, size, color) { const inputs = q(root, '[data-product-variant-picker]').querySelectorAll('select'); change(w, inputs[0], size); change(w, inputs[1], color); }
const ids = root => [...root.querySelectorAll('form [name="id"]')].map(node => node.value);
const price = root => q(root, '[data-product-price-current]').textContent.trim();
(async () => {
  const d = f.dom(await section('one') + await section('two')), w = d.window, doc = w.document, one = q(doc, '#qtm-product-block-section-one'), two = q(doc, '#qtm-product-block-section-two');
  f.boot(w, files);
  assert.equal(price(one), '$10.00'); assert.deepEqual(ids(one), ['10', '10', '10', '10']);
  const picks = q(one, '[data-product-variant-picker]').querySelectorAll('select');
  change(w, picks[0], 'Large'); assert.deepEqual(ids(one), ['', '', '', '']); assert.equal(price(one), 'Unavailable'); assert.equal(q(one, '[data-product-sku-value]').textContent.trim(), 'Not available');
  assert.ok([...one.querySelectorAll('[data-b8-submit]')].every(button => button.disabled)); assert.ok([...one.querySelectorAll('[data-b8-payment]')].every(node => node.hidden));
  for (const form of one.querySelectorAll('form')) assert.equal(form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })), false);
  change(w, picks[1], 'Blue'); assert.deepEqual(ids(one), ['100', '100', '100', '100']); assert.deepEqual(ids(two), ['10', '10', '10', '10']); assert.equal(w.location.search, '', 'duplicate hosts do not compete for page history');
  assert.equal(price(one), '$20.00'); assert.equal(q(one, '[data-product-price-unit]').textContent, '$4.00/kg'); assert.equal(q(one, '[data-product-sku-value]').textContent.trim(), 'SKU100');
  for (const input of one.querySelectorAll('[name="quantity"]')) { assert.equal(input.value, '2'); assert.equal(input.min, '2'); assert.equal(input.step, '2'); assert.equal(input.max, '6'); }
  const quantity = q(one, '[data-qtm-product-block-commerce="quantity-selector"]'); q(quantity, '[data-b8-plus]').click(); assert.ok([...one.querySelectorAll('[name="quantity"]')].every(input => input.value === '4')); assert.equal(q(two, '[name="quantity"]').value, '1');
  q(quantity, '[data-b8-plus]').click(); assert.equal(q(quantity, '[name="quantity"]').value, '6'); assert.ok(q(quantity, '[data-b8-plus]').disabled);
  change(w, q(quantity, '[name="quantity"]'), '3'); assert.equal(q(quantity, '[name="quantity"]').value, '2');
  const main = q(one, '[data-product-form-block] form'), plan = q(main, '[name="selling_plan"]'); change(w, plan, '90');
  assert.equal(price(one), '$15.00'); assert.equal(q(one, '[data-product-price-compare]').textContent, '$20.00'); assert.equal(q(one, '[data-product-price-unit]').textContent, '$1.00/kg'); assert.equal(q(one, '[data-product-sticky-price]').textContent, '$15.00');
  for (const form of one.querySelectorAll('form')) { const data = new w.FormData(form); assert.deepEqual(data.getAll('id'), ['100']); assert.deepEqual(data.getAll('quantity'), ['2']); assert.deepEqual(data.getAll('selling_plan'), ['90']); }
  q(main, '[name="quantity"]').value = '3'; assert.equal(main.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })), false); q(main, '[name="quantity"]').value = '4'; assert.equal(main.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })), true);
  // Form option controls and sticky native selector are equally authoritative.
  const formOptions = main.querySelectorAll('[data-b8-option-select]'); change(w, formOptions[0], 'Small'); change(w, formOptions[1], 'Red'); assert.deepEqual(ids(one), ['10', '10', '10', '10']); assert.equal(plan.value, '');
  const sticky = q(one, '[data-product-sticky-add-to-cart]'); change(w, q(sticky, '[data-b8-variant-id]'), '101'); assert.equal(price(one), '$20.00'); assert.ok([...one.querySelectorAll('[data-b8-submit]')].every(button => button.disabled)); assert.ok(q(one, '[data-b8-payment]').hidden);
  const button = q(one, '[data-product-variant-value][data-option-value="Red"]'); button.click(); assert.deepEqual(ids(one), ['10', '10', '10', '10']); assert.equal(button.getAttribute('aria-pressed'), 'true');
  doc.dispatchEvent(new w.CustomEvent('variant:change', { detail: { productId: 1, variantId: 100 } })); assert.deepEqual(ids(one), ['10', '10', '10', '10']); assert.deepEqual(ids(two), ['10', '10', '10', '10']);
  one.dispatchEvent(new w.CustomEvent('variant:change', { bubbles: true, detail: { productId: 99, variantId: 100 } })); assert.deepEqual(ids(one), ['10', '10', '10', '10']);
  one.dispatchEvent(new w.CustomEvent('shopify:section:unload', { bubbles: true })); change(w, formOptions[0], 'Large'); change(w, formOptions[1], 'Blue'); assert.deepEqual(ids(one), ['10', '10', '10', '10'], 'disposed instance does not process controls');
  one.dispatchEvent(new w.CustomEvent('shopify:section:load', { bubbles: true })); one.dispatchEvent(new w.CustomEvent('shopify:section:load', { bubbles: true })); select(w, one, 'Large', 'Blue'); assert.deepEqual(ids(one), ['100', '100', '100', '100']);
  doc.body.append(one); await f.drain(); q(quantity, '[data-b8-plus]').click(); assert.equal(q(quantity, '[name="quantity"]').value, '4', 'reorder and duplicate boot have one handler');
  two.remove(); await f.drain(); select(w, one, 'Small', 'Red'); assert.equal(new URL(w.location.href).searchParams.get('variant'), '10');
  w.history.replaceState({}, '', '?keep=1&variant=100&selling_plan=90#details'); w.dispatchEvent(new w.PopStateEvent('popstate')); assert.deepEqual(ids(one), ['100', '100', '100', '100']); assert.equal(price(one), '$15.00'); assert.equal(q(one, '[data-product-sku-value]').textContent.trim(), 'SKU100');
  select(w, one, 'Small', 'Blue'); assert.equal(new URL(w.location.href).searchParams.get('keep'), '1'); assert.equal(w.location.hash, '#details'); assert.equal(new URL(w.location.href).searchParams.get('selling_plan'), null);
  doc.body.insertAdjacentHTML('beforeend', await section('three')); await f.drain(); const three = q(doc, '#qtm-product-block-section-three'); select(w, three, 'Large', 'Blue'); assert.deepEqual(ids(three), ['100', '100', '100', '100']); assert.deepEqual(ids(one), ['101', '101', '101', '101']); d.window.close();
  // Required plans, contradictory merchant bounds, independent default quantity and currency strings.
  for (const [options, check] of [
    [{ product: { ...product, requires_selling_plan: true } }, (doc, w) => { assert.equal(price(doc), '$8.00'); const r = q(doc, 'section'); select(w, r, 'Large', 'Blue'); assert.equal(price(doc), '$15.00'); assert.ok([...doc.querySelectorAll('form [name="selling_plan"]')].every(x => x.value === '90')); select(w, r, 'Small', 'Blue'); assert.ok([...doc.querySelectorAll('[data-b8-submit]')].every(x => x.disabled)); }],
    [{ names: ['form', 'quantity-selector'], settings: { 'quantity-selector': { default_quantity: 5 } } }, doc => assert.ok([...doc.querySelectorAll('[name="quantity"]')].every(x => x.value === '5'))],
    [{ settings: { 'quantity-selector': { min_quantity: 20, max_quantity: 1 } } }, doc => assert.ok([...doc.querySelectorAll('[data-b8-submit]')].every(x => x.disabled))],
    [{ names: ['variant-picker'], settings: { 'variant-picker': { available_text: 'Ready', sold_out_text: 'Gone', unavailable_text: 'No match' } } }, (doc, w) => { const root = q(doc, 'section'); select(w, root, 'Small', 'Blue'); assert.equal(q(root, '[data-product-variant-status]').textContent, 'Gone'); select(w, root, 'Large', 'Red'); assert.equal(q(root, '[data-product-variant-status]').textContent, 'No match'); select(w, root, 'Large', 'Blue'); assert.equal(q(root, '[data-product-variant-status]').textContent, 'Ready'); }],
    [{ names: ['add-to-cart'] }, doc => assert.equal(q(doc, '[data-b8-fallback]').hidden, false)]
  ]) { const x = f.dom(await section('isolated', options)); f.boot(x.window, files); check(x.window.document, x.window); x.window.close(); }
  const selectedOutside = { ...variants[1], id: 900, title: 'Selected outside the list', sku: 'SELECTED', options: ['Outside', 'Blue'] };
  const outside = f.dom(await section('outside', { product: { ...product, selected_or_first_available_variant: selectedOutside, requires_selling_plan: true, options_with_values: product.options_with_values.map((option, index) => ({ ...option, selected_value: selectedOutside.options[index], values: index === 0 ? [...option.values, 'Outside'] : option.values })) } }));
  f.boot(outside.window, files); assert.deepEqual(ids(outside.window.document), ['900', '900', '900', '900']); assert.equal(price(outside.window.document), '$15.00');
  const outsideRoot = q(outside.window.document, 'section'); select(outside.window, outsideRoot, 'Large', 'Blue'); select(outside.window, outsideRoot, 'Outside', 'Blue'); assert.equal(q(outsideRoot, '[data-product-sku-value]').textContent.trim(), 'SELECTED');
  assert.ok([...outside.window.document.querySelectorAll('form [name="selling_plan"]')].every(x => x.value === '90')); outside.window.close();
  // Real cart controller: one POST, exact native payload, truthful per-form errors/success, fallback navigation.
  const cart = f.dom(await section('cart', { settings: { form: { adding_message: 'Working...', added_message: 'Item added.' } } }) + '<aside data-cart-drawer data-cart-url="/fr/cart" hidden><div data-cart-drawer-content></div></aside>');
  const cw = cart.window; cw.QuadratumSettings = { cart: { ajaxDrawerEnabled: true, openAfterAdd: false } };
  const calls = []; let resolveAdd, fail = false;
  cw.fetch = async (url, options) => { calls.push({ url: String(url), options }); if (options.method === 'POST') { await new Promise(resolve => { resolveAdd = resolve; }); return { ok: !fail, json: async () => fail ? { description: 'Sold out just now.' } : { id: 10 } }; } return { ok: true, text: async () => '<div data-cart-drawer-content><span data-cart-count>1</span></div>' }; };
  f.boot(cw, [...files, 'cart-drawer.js']); const form = q(cw.document, '[data-product-form-block] form'), otherStatus = q(cw.document, '[data-product-sticky-add-to-cart] [data-cart-add-status]');
  const submit = () => form.dispatchEvent(new cw.Event('submit', { bubbles: true, cancelable: true }));
  submit(); submit(); assert.equal(calls.filter(x => x.options.method === 'POST').length, 1); assert.equal(q(form, '[data-cart-add-status]').textContent, 'Working...');
  assert.equal(calls[0].url, 'https://shop.test/fr/cart/add.js'); assert.deepEqual(calls[0].options.body.getAll('id'), ['10']); assert.deepEqual(calls[0].options.body.getAll('quantity'), ['1']); resolveAdd(); await f.drain(); assert.equal(q(form, '[data-cart-add-status]').textContent, 'Item added.'); assert.equal(otherStatus.textContent.trim(), '');
  fail = true; submit(); resolveAdd(); await f.drain(); assert.equal(q(form, '[data-cart-add-status]').textContent, 'Sold out just now.'); assert.equal(otherStatus.textContent.trim(), '');
  cw.QuadratumSettings.cart.ajaxDrawerEnabled = false; const before = calls.length; assert.equal(submit(), true); assert.equal(calls.length, before); cart.window.close();
  console.log('PASS actual product block composition: valid/null/sold-out variants, all native payloads, scoped forms/picker/sticky/price/SKU, plans/prices/unit values, quantity constraints, duplicate hosts, real cart success/error/one POST/native fallback, URL/back, repeated/late/dynamic/editor unload/reload/reorder and source isolation. Native checkout/network/geometry remain live gates.');
})().catch(e => { console.error(e); process.exitCode = 1; });
