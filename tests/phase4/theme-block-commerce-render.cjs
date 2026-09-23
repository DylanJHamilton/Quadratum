const assert = require('node:assert/strict'), f = require('./support/theme-blocks.cjs');
const names = ['form', 'variant-picker', 'add-to-cart', 'dynamic-checkout', 'quantity-selector', 'price', 'sticky-add-to-cart'];
const variants = f.variants.map((v, i) => ({ ...v, unit_price: i === 1 ? 400 : 200, unit_price_measurement: { reference_value: 1, reference_unit: 'kg' }, selling_plan_allocations: v.selling_plan_allocations.map(a => ({ ...a, unit_price: 100 })) }));
const product = { ...f.product, has_only_default_variant: false, variants, selected_or_first_available_variant: variants[0] };
const html = (name, settings = {}, id = name, item = product, design = false) => f.html('product-' + name, settings, id, design, { product: item });
let cases = 0;
function healthy(doc, name) {
  assert.equal(doc.querySelectorAll('[data-editor-block]').length, 1); assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/);
  const ids = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(new Set(ids).size, ids.length, name);
  assert.equal(doc.querySelector('script:not([src]):not([type="application/json"])'), null);
  for (const source of doc.querySelectorAll('script[type="application/json"]')) assert.ok(Array.isArray(JSON.parse(source.textContent)));
  for (const form of doc.querySelectorAll('form')) {
    assert.equal(form.getAttribute('action'), '/fr/cart/add'); assert.ok(form.id); assert.equal(form.querySelectorAll('[name="id"]').length, 1); assert.equal(form.querySelectorAll('[name="quantity"]').length, 1); assert.equal(form.querySelectorAll('[name="selling_plan"]').length, 1);
  }
  for (const label of doc.querySelectorAll('label[for]')) assert.ok(doc.getElementById(label.htmlFor), label.htmlFor);
  for (const control of doc.querySelectorAll('button,input:not([type="hidden"]),select')) assert.ok(control.textContent.trim() || control.getAttribute('aria-label') || (control.id && [...doc.querySelectorAll('label')].some(label => label.htmlFor === control.id)), 'named ' + control.outerHTML);
  assert.equal(doc.querySelector('fieldset > div > legend'), null); cases++;
}
async function inspect(name, settings, fn = doc => healthy(doc, name), item = product, design = false) { const d = f.dom(await html(name, settings, name, item, design)); try { fn(d.window.document, d.window); } finally { d.window.close(); } }
(async () => {
  for (const name of names) {
    const { liquid, schema } = f.unpack('product-' + name), settings = Object.fromEntries(schema.settings.filter(x => x.id).map(x => [x.id, x]));
    for (const s of Object.values(settings)) assert.ok(liquid.includes('block.settings.' + s.id), name + ' consumer ' + s.id);
    for (const preset of [{ settings: f.defaults(schema.settings) }, ...schema.presets]) {
      for (const [id, value] of Object.entries(preset.settings)) { const setting = settings[id]; assert.ok(setting); if (setting.options) assert.ok(setting.options.some(x => x.value === value)); if (setting.type === 'range') { assert.ok(value >= setting.min && value <= setting.max); assert.ok(Math.abs((value - setting.min) / setting.step - Math.round((value - setting.min) / setting.step)) < 1e-6); } }
      await inspect(name, preset.settings);
    }
    for (const setting of Object.values(settings)) for (const value of setting.options?.map(x => x.value) || (setting.type === 'range' ? [setting.min, setting.max] : setting.type === 'checkbox' ? [false, true] : [])) await inspect(name, { [setting.id]: value });
    await inspect(name, {}, doc => { assert.equal(doc.querySelector('form,[data-qtm-product-block-commerce]'), null); }, null);
    await inspect(name, { show_on_desktop: false, show_on_tablet: false, show_on_mobile: false, animation_style: 'fade_up' }, doc => assert.equal(doc.querySelector('[class*="--hide-"],[class*="--animate"]'), null), product, true);
    const d = f.dom(await html(name, {}, 'first') + await html(name, {}, 'second')); const ids = [...d.window.document.querySelectorAll('[id]')].map(x => x.id); assert.equal(new Set(ids).size, ids.length); d.window.close();
    assert.match(liquid, /prefers-reduced-motion/); assert.match(liquid, /box-sizing: border-box/);
  }
  for (const name of ['form', 'dynamic-checkout', 'add-to-cart', 'sticky-add-to-cart']) await inspect(name, {}, doc => {
    const form = doc.querySelector('form'); assert.equal(form.querySelector('[name="selling_plan"]').required, true); assert.equal(form.querySelector('[name="selling_plan"]').value, '45');
  }, { ...product, requires_selling_plan: true });
  await inspect('form', { show_selling_plans: false, show_quantity: false }, doc => { assert.equal(doc.querySelector('[name="selling_plan"]').required, true); assert.equal(doc.querySelector('[name="quantity"]').value, '2'); }, { ...product, requires_selling_plan: true, selected_or_first_available_variant: variants[1] });
  await inspect('form', {}, doc => { assert.ok(doc.querySelector('[data-b8-option-controls]').hidden); assert.equal(doc.querySelector('[data-b8-fallback]').hidden, false); assert.equal(doc.querySelector('[data-b8-variant-id]').value, '10'); });
  await inspect('quantity-selector', { default_quantity: 20, min_quantity: 3, max_quantity: 5 }, doc => { const input = doc.querySelector('input'); assert.equal(input.min, '4'); assert.equal(input.max, '5'); assert.equal(input.step, '2'); assert.equal(input.value, '4'); assert.ok(input.disabled, 'standalone helper is honest without its sync controller'); }, { ...product, selected_or_first_available_variant: variants[1] });
  await inspect('add-to-cart', {}, doc => { assert.ok(doc.querySelector('form button[type="submit"]')); assert.equal(f.unpack('product-add-to-cart').schema.name, 'Product add to cart'); });
  await inspect('price', {}, doc => assert.equal(doc.querySelector('.product-price__tax'), null));
  await inspect('price', {}, doc => { assert.equal(doc.querySelector('[data-product-price-current]').textContent.trim(), '$8.00'); assert.match(doc.querySelector('[data-product-price-unit]').textContent, /\$1\.00/); }, { ...product, requires_selling_plan: true });
  const dangerous = { ...product, title: '</script><img src=x onerror=unsafe>', variants: variants.map(v => ({ ...v, title: '</script><img src=x onerror=unsafe>', sku: '</script><img src=x onerror=unsafe>', options: ['</script>', 'A & B'] })) };
  dangerous.selected_or_first_available_variant = dangerous.variants[0];
  for (const name of names) await inspect(name, {}, doc => { assert.equal(doc.querySelector('img[onerror]'), null); const data = JSON.parse(doc.querySelector('[data-qtm-product-block-variants]').textContent); assert.equal(data[0].title, dangerous.title); assert.equal(data[0].options[0], '</script>'); }, dangerous);
  console.log('PASS ' + cases + ' commerce default/preset/control renders; individual consumers, native form/payload/label/outer-wrapper adapters, no-JS fallbacks, missing products, unique IDs, subscription/rule/price states and safe explicit variant JSON. Real Shopify checkout remains queued.');
})().catch(e => { console.error(e); process.exitCode = 1; });
module.exports = { product, variants, html };
