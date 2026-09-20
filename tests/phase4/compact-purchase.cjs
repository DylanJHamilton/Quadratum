const assert = require('node:assert/strict');
const fs = require('node:fs');
const { Liquid } = require('liquidjs');
const { JSDOM } = require('jsdom');
const read = path => fs.readFileSync(path, 'utf8');
const engine = new Liquid({ root: 'snippets', extname: '.liquid' });
for (const [name, fn] of Object.entries({
  json: value => JSON.stringify(value ?? null),
  money: value => '$' + (Number(value || 0) / 100).toFixed(2),
  asset_url: name => '/assets/' + name,
  stylesheet_tag: url => `<link rel="stylesheet" href="${url}">`,
  image_url: (image, args) => `${image.url}?width=${args?.[1] || 2000}`,
  structured_data: () => '{"@type":"Product"}'
})) engine.registerFilter(name, fn);
const sectionSource = read('sections/main-product-compact.liquid');
const schema = JSON.parse(sectionSource.split('{% schema %}')[1].split('{% endschema %}')[0]);
const defaults = fields => Object.fromEntries(fields.filter(item => item.id).map(item => [item.id, item.default ?? null]));
const image = { url: 'https://cdn.example.test/default.jpg', width: 800, height: 600, alt: 'Image <safe>' };
const plan = (id, price, compare) => ({ selling_plan: { id }, price, compare_at_price: compare });
const variants = [
  { id: 10, options: ['Small', 'Red'], title: 'Small / Red', price: 1000, compare_at_price: 1200, available: true, selling_plan_allocations: [plan(45, 800, 1000)] },
  { id: 100, options: ['Large', 'Red'], title: 'Large / Red', price: 2000, compare_at_price: 2000, available: true, selling_plan_allocations: [plan(90, 1500, 2000)], featured_image: { ...image, url: 'https://cdn.example.test/large.jpg', width: 640, height: 960 }, quantity_rule: { min: 2, max: 6, increment: 2 } },
  { id: 101, options: ['Large', 'Blue'], title: 'Large / Blue', price: 2100, compare_at_price: 2500, available: false, selling_plan_allocations: [] }
];
variants.forEach(variant => { variant.url = '/fr/products/test?variant=' + variant.id; });
const product = {
  id: 1, title: 'Product <safe>', description: '<p>Merchant <strong>description</strong></p>', url: '/fr/products/test',
  options: ['Size', 'Color'], options_with_values: [{ name: 'Size', values: ['Small', 'Large'], selected_value: 'Small' }, { name: 'Color', values: ['Red', 'Blue'], selected_value: 'Red' }],
  variants, selected_or_first_available_variant: variants[0], featured_image: image, media: [],
  selling_plan_groups: [{ name: 'Subscribe <safe>', selling_plans: [{ id: 45, name: 'Monthly <safe>' }, { id: 90, name: 'Every two months' }] }]
};
function blocks(types = schema.presets[0].blocks.map(item => item.type)) {
  return types.map((type, i) => ({ type, id: 'block-' + i, shopify_attributes: `data-editor-block="${i}"`, settings: { heading: 'Details <safe>', content: '<p>Merchant content</p>', height: 80 } }));
}
async function render(p = product, id = 'one', settings = {}, items = blocks()) {
  return engine.parseAndRender(sectionSource.split('{% schema %}')[0], { product: p, section: { id, settings: { ...defaults(schema.settings), ...settings }, blocks: items }, routes: { cart_add_url: '/fr/cart/add' }, request: { design_mode: false } });
}
function dom(html, url = 'https://shop.test/fr/products/test?ref=stay#details') { return new JSDOM(html, { url, runScripts: 'outside-only' }); }
function boot(w, order = ['product-purchase-sync.js', 'product-selling-plans.js']) {
  order.forEach(file => { w.eval(read('assets/' + file)); w.eval(read('assets/' + file)); });
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
}
function choose(w, root, first, second) {
  const options = root.querySelectorAll('[data-purchase-option]');
  options[0].value = first; options[1].value = second;
  options[1].dispatchEvent(new w.Event('change', { bubbles: true }));
}
const submit = (w, form) => form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
(async () => {
  for (const side of ['left', 'right']) for (const gap of [0, 60]) {
    const d = dom(await render(product, 'settings', { desktop_media_position: side, gap, padding_top: 0, padding_bottom: 120 }, blocks([...schema.blocks.map(b => b.type), 'quantity', 'variant_picker', 'buy_buttons', 'title', 'price'])));
    const doc = d.window.document, root = doc.querySelector('section'), form = doc.querySelector('form');
    assert.equal(root.style.getPropertyValue('--qtm-gap'), gap + 'px');
    assert.equal(root.style.paddingTop, '0px'); assert.equal(root.style.paddingBottom, '120px');
    assert.equal(Boolean(root.querySelector('.media-right')), side === 'right');
    assert.equal(doc.querySelectorAll('h1').length, 1); assert.equal(doc.querySelectorAll('[name=quantity]').length, 1);
    assert.equal(doc.querySelectorAll('[name=add]').length, 1); assert.equal(doc.querySelectorAll('[data-purchase-option]').length, 2);
    assert.equal(doc.querySelectorAll('safe').length, 0); assert(doc.querySelector('.rte strong'));
    assert(root.querySelector('[data-product-purchase-data]')); assert(!root.querySelector('[data-purchase-fallback]').hidden);
    assert(root.querySelector('[data-purchase-options]').hidden); assert.equal(form.action, 'https://shop.test/fr/cart/add');
    assert.equal(doc.querySelector('[name=quantity]').labels[0].textContent, 'Quantity');
    assert.equal(root.querySelector('[name=selling_plan]').value, '');
    assert(root.querySelector('[name=selling_plan] option[value="90"]').disabled);
    assert.equal(new d.window.FormData(form).getAll('id').length, 1);
    d.window.close();
  }
  for (const field of schema.settings.filter(x => x.type === 'range')) for (const value of [field.min, field.max]) {
    const d = dom(await render(product, 'bounds', { [field.id]: value }));
    assert(d.window.document.querySelector('section').getAttribute('style').includes(value + 'px')); d.window.close();
  }
  const native = new JSDOM(await render());
  const nativeLinks = [...native.window.document.querySelectorAll('noscript a')];
  assert.equal(nativeLinks.length, 3); assert.equal(nativeLinks[1].getAttribute('href'), '/fr/products/test?variant=100');
  assert.equal(nativeLinks[0].getAttribute('aria-current'), 'true'); native.window.close();
  assert(!(await render(null)).includes('<section')); assert(!(await render(null)).includes('type="application/ld+json"'));
  const defaultOnly = { ...product, has_only_default_variant: true, variants: [variants[1]], selected_or_first_available_variant: variants[1] };
  const one = dom(await render(defaultOnly, 'single', {}, blocks(['price', 'buy_buttons'])));
  assert(one.window.document.querySelector('[data-purchase-fallback]').hidden);
  assert.equal(one.window.document.querySelector('[name=quantity]').value, '2');
  assert(one.window.document.querySelector('[data-purchase-image]').src.includes('large.jpg'));
  assert.equal(one.window.document.querySelector('[data-purchase-image]').height, 960);
  assert(one.window.document.querySelector('[data-purchase-image]').srcset.endsWith('640w'));
  assert(!one.window.document.querySelector('[data-purchase-image]').srcset.includes('800w')); one.window.close();
  const emptyMedia = dom(await render({ ...product, featured_image: null, variants: [{ ...variants[0], featured_image: null }], selected_or_first_available_variant: { ...variants[0], featured_image: null } }));
  assert(emptyMedia.window.document.querySelector('[data-purchase-image]').hidden);
  assert(!emptyMedia.window.document.querySelector('[data-purchase-image-placeholder]').hidden); emptyMedia.window.close();
  const hostile = '</script><script data-injected>bad()</script>';
  const injected = dom(await render({ ...product, title: hostile, variants: [{ ...variants[0], sku: hostile, options: [hostile, 'Red'] }] }));
  assert(!injected.window.document.querySelector('[data-injected]'));
  assert.equal(JSON.parse(injected.window.document.querySelector('[data-product-purchase-data]').textContent)[0].sku, hostile); injected.window.close();

  // Actual rendered controls, two products in a single wrapper, both asset load orders.
  for (const order of [['product-purchase-sync.js', 'product-selling-plans.js'], ['product-selling-plans.js', 'product-purchase-sync.js']]) {
    const other = { ...product, url: '/fr/products/other', variants: [{ ...variants[0], id: 999 }], selected_or_first_available_variant: { ...variants[0], id: 999 } };
    const d = dom('<div class="shopify-section">' + await render(product, 'one', {}, blocks(['title', 'price', 'price', 'quantity', 'variant_picker', 'buy_buttons'])) + await render(other, 'two') + '</div>');
    const w = d.window, root = w.document.querySelector('#MainProductCompact-one'), second = w.document.querySelector('#MainProductCompact-two'), form = root.querySelector('form');
    boot(w, order);
    const ids = [...w.document.querySelectorAll('[id]')].map(n => n.id); assert.equal(new Set(ids).size, ids.length);
    assert(root.querySelector('[data-purchase-fallback]').hidden); assert(!root.querySelector('[data-purchase-options]').hidden);
    choose(w, root, 'Large', 'Red');
    assert.equal(root.querySelector('[name=id]').value, '100'); assert.equal(second.querySelector('[name=id]').value, '999');
    assert.deepEqual([...root.querySelectorAll('[data-purchase-current]')].map(n => n.textContent), ['$20.00', '$20.00']);
    assert(root.querySelector('[data-purchase-compare]').hidden);
    assert(root.querySelector('[data-purchase-image]').src.includes('large.jpg')); assert(root.querySelector('[data-purchase-image]').srcset.includes('large.jpg'));
    assert.equal(root.querySelector('[data-purchase-image]').height, 960);
    const quantity = root.querySelector('[name=quantity]');
    assert.equal(quantity.min, '2'); assert.equal(quantity.max, '6'); assert.equal(quantity.step, '2'); assert.equal(quantity.value, '2');
    quantity.value = '3'; assert.equal(submit(w, form), false, 'Odd quantity is invalid for increment two');
    quantity.value = '8'; assert.equal(submit(w, form), false, 'Maximum enforced');
    quantity.value = '4'; assert.equal(submit(w, form), true);
    const planSelect = root.querySelector('[name=selling_plan]'); planSelect.value = '90'; planSelect.dispatchEvent(new w.Event('change', { bubbles: true }));
    assert.equal(root.querySelector('[data-purchase-current]').textContent, '$15.00'); assert.equal(root.querySelector('[data-purchase-compare]').textContent, '$20.00'); assert(!root.querySelector('[data-purchase-compare]').hidden);
    assert.equal(new w.FormData(form).get('selling_plan'), '90'); assert.equal(new w.FormData(form).get('quantity'), '4');
    assert.equal(new URL(w.location.href).searchParams.get('ref'), 'stay'); assert.equal(w.location.hash, '#details');
    assert.equal(w.history.length, 3, 'One URL entry for the variant and one for its plan despite duplicate scripts');
    choose(w, second, 'Small', 'Red'); assert.equal(new URL(w.location.href).searchParams.get('variant'), '100', 'Another product cannot own this page URL');
    w.history.replaceState({}, '', '/fr/products/test?variant=10&selling_plan=45'); w.dispatchEvent(new w.PopStateEvent('popstate'));
    assert.equal(root.querySelector('[name=id]').value, '10'); assert.equal(planSelect.value, '45'); assert.equal(root.querySelector('[data-purchase-current]').textContent, '$8.00');
    assert(!quantity.hasAttribute('max')); assert.equal(quantity.value, '4'); assert(root.querySelector('[data-purchase-image]').src.includes('default.jpg'));
    assert.equal(second.querySelector('[name=id]').value, '999');
    w.history.replaceState({}, '', '/fr/products/test?variant=10'); w.dispatchEvent(new w.PopStateEvent('popstate')); assert.equal(planSelect.value, '');
    choose(w, root, 'Large', 'Blue'); assert(root.querySelector('[name=add]').disabled); assert.equal(submit(w, form), false);
    choose(w, root, 'Small', 'Blue'); assert.equal(root.querySelector('[name=id]').value, ''); assert(root.querySelector('[data-purchase-status]').textContent.includes('combination')); assert.equal(submit(w, form), false);
    choose(w, root, 'Large', 'Red'); assert.equal(root.querySelector('[name=id]').value, '100', 'Invalid combinations remain escapable');
    root.dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true }));
    choose(w, root, 'Small', 'Red'); assert.equal(root.querySelector('[name=id]').value, '100', 'No root handler survives unload');
    root.dispatchEvent(new w.Event('shopify:section:load', { bubbles: true })); choose(w, root, 'Small', 'Red'); assert.equal(root.querySelector('[name=id]').value, '10');
    d.window.close();
  }

  // Required plans render the correct initial price/selection; unsupported variants cannot submit.
  const required = { ...product, requires_selling_plan: true };
  const req = dom(await render(required)); const rw = req.window, rr = rw.document.querySelector('section'), rf = rr.querySelector('form');
  assert.equal(rr.querySelector('[data-purchase-current]').textContent, '$8.00'); assert.equal(rr.querySelector('[name=selling_plan]').value, '45');
  boot(rw); choose(rw, rr, 'Large', 'Red'); assert.equal(rr.querySelector('[name=selling_plan]').value, '90'); assert.equal(rr.querySelector('[data-purchase-current]').textContent, '$15.00');
  choose(rw, rr, 'Large', 'Blue'); let downstream = 0; rw.document.addEventListener('submit', () => downstream++);
  assert.equal(submit(rw, rf), false); assert.equal(downstream, 0, 'Invalid selling plans cannot reach cart listeners'); assert(rr.querySelector('[name=add]').disabled); req.window.close();

  // Missing/invalid purchase JSON retains the native variant selector; data cannot be borrowed from a sibling.
  const malformedHTML = (await render()).replace(/<script type="application\/json" data-product-purchase-data[^>]*>[\s\S]*?<\/script>/, '');
  const missing = dom('<div class="shopify-section">' + malformedHTML + await render(product, 'two') + '</div>'); boot(missing.window);
  assert(!missing.window.document.querySelector('#MainProductCompact-one [data-purchase-fallback]').hidden); missing.window.close();
  for (const value of ['broken', '{}', '[null]']) {
    const bad = dom((await render()).replace(/(<script type="application\/json" data-product-purchase-data[^>]*>)[\s\S]*?(<\/script>)/, '$1' + value + '$2')); boot(bad.window);
    assert(!bad.window.document.querySelector('[data-purchase-fallback]').hidden); bad.window.close();
  }
  const badPlan = dom((await render(required)).replace(/(<script type="application\/json" data-selling-plan-variants>)[\s\S]*?(<\/script>)/, '$1{}$2'));
  boot(badPlan.window); assert.equal(submit(badPlan.window, badPlan.window.document.querySelector('form')), false); badPlan.window.close();

  // Only the dependency placement is reviewed in the other two main-product hosts.
  for (const name of ['classic', 'master']) {
    const source = read('sections/main-product-' + name + '.liquid').split('{% schema %}')[0]
      .replace(/\n[ \t]+comment\n[\s\S]*?\n[ \t]+endcomment\n/g, '\n') // LiquidJS adapter for multiline Liquid comments.
      .replace(/{%-?\s*form\b[^%]*%}/g, '<form action="/fr/cart/add">').replace(/{%-?\s*endform\s*-?%}/g, '</form>');
    const html = await engine.parseAndRender(source, { product, section: { id: name, settings: {}, blocks: [] }, settings: {} });
    const d = dom(html); const root = d.window.document.querySelector('[data-product-purchase-sync]');
    assert(root.querySelector('[data-product-purchase-data]')); boot(d.window);
    const select = root.querySelector('[name=id]'); select.value = '100'; select.dispatchEvent(new d.window.Event('change', { bubbles: true }));
    assert.equal(root.querySelector('[data-purchase-current]').textContent, '$20.00'); d.window.close();
  }
  // Existing cart drawer opt-in uses the localized native form and exact purchase payload.
  for (const ajax of [false, true]) {
    const d = dom(await render()); const w = d.window, root = w.document.querySelector('section'), calls = [];
    w.QuadratumSettings = { cart: { ajaxDrawerEnabled: ajax, openAfterAdd: false } };
    w.fetch = async (url, options) => { calls.push({ url: String(url), options }); return { ok: true, json: async () => ({}) }; };
    boot(w); w.eval(read('assets/cart-drawer.js'));
    const select = root.querySelector('[name=selling_plan]'); select.value = '45'; select.dispatchEvent(new w.Event('change', { bubbles: true }));
    assert.equal(submit(w, root.querySelector('form')), !ajax);
    await Promise.resolve(); await Promise.resolve();
    if (ajax) { assert.equal(calls[0].url, 'https://shop.test/fr/cart/add.js'); assert.equal(calls[0].options.body.get('id'), '10'); assert.equal(calls[0].options.body.get('selling_plan'), '45'); }
    else assert.equal(calls.length, 0);
    d.window.close();
  }
  console.log('PASS Compact/shared purchase: actual Liquid defaults/preset/blocks/settings bounds, duplicate block guards, native fallback/payload, safe text/JSON, selected/no media, two products, both asset orders, optional/required/incompatible plans and prices, exact variants/invalid combinations, quantity rules, URL/back, native/AJAX cart, duplicate initialization and editor unload/reload. Classic/Master dependency checks only; live Shopify acceptance remains queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
