const assert = require('node:assert/strict');
const f = require('../phase4/support/commerce.cjs');

(async () => {
  for (const kind of ['classic', 'simple']) {
    const name = 'main-product-' + kind;
    const blocks = ['product_price', 'product_title', 'custom_liquid', 'product_buying'].map(type => ({ type, settings: { liquid: '<p data-custom>Custom</p>' } }));
    const d = f.dom(await f.render(name, { blocks }));
    assert.deepEqual([...d.window.document.querySelectorAll('[data-product-content]')].map(n => n.dataset.productContent), ['price', 'title', 'buying']);
    assert.equal(d.window.document.querySelectorAll('form').length, 1);
    assert(!d.window.document.querySelector('form [data-custom]'));
    d.window.close();
    const empty = f.dom(await f.render(name, { blocks: [] }));
    assert(!empty.window.document.querySelector('h1'), 'removing content blocks does not silently restore the title');
    empty.window.close();
    const legacy = f.dom(await f.render(name, { settings: { content_layout: 'legacy' }, blocks: [] }));
    assert(legacy.window.document.querySelector('h1') && legacy.window.document.querySelector('form'));
    legacy.window.close();
  }
  const selected = { ...f.variants[1], id: 999999, price: 3499, options: ['Large', 'Blue'] };
  const options = [
    { name: 'Size', position: 1, values: [{ id: 11, name: 'Small', selected: false }, { id: 12, name: 'Large', selected: true }] },
    { name: 'Color', position: 2, values: [{ id: 21, name: 'Red', selected: false, swatch: { color: { rgb: '255, 0, 0' } } }, { id: 22, name: 'Blue', selected: true }] }
  ];
  const product = { ...f.product, variants_count: 600, selected_or_first_available_variant: selected, options_with_values: options };
  for (const name of ['classic', 'simple', 'modern-variant', 'compact', 'master'].map(n => 'main-product-' + n)) {
    const d = f.dom(await f.render(name, { data: { product, template: { suffix: 'classic' } } }));
    const w = d.window, doc = w.document, form = doc.querySelector('form');
    assert.equal(form.querySelectorAll('[name=id]').length, 1, name);
    assert.equal(form.querySelector('[name=id]').value, '999999', name + ': selected beyond truncated data retained');
    const records = JSON.parse(doc.querySelector('[data-product-purchase-data]').textContent);
    assert.deepEqual(records.map(v => v.id), [999999], name + ': only selected variant serialized');
    const links = [...form.querySelectorAll('[data-product-option-navigation] a')];
    assert.equal(links.length, 4);
    assert.equal(new URL(links[0].href).searchParams.get('option_values'), '11,22');
    assert.equal(new URL(links[0].href).searchParams.get('view'), 'classic');
    assert(links[2].querySelector('.q-option-swatch'));
    f.boot(w, ['product-purchase-sync.js', 'product-selling-plans.js', 'product-gallery-options.js', 'product-stacked-media.js']);
    assert(form.querySelector('[name=add]') && !form.querySelector('[name=add]').disabled, name + ': correct selected variant remains purchasable');
    assert.equal(new w.FormData(form).get('id'), '999999');
    d.window.close();
    const invalid = f.dom(await f.render(name, { data: { product: { ...product, selected_or_first_available_variant: null } } }));
    assert.equal(invalid.window.document.querySelector('form [name=id]').value, '', name + ': nonexistent selection never becomes first variant');
    assert(invalid.window.document.querySelector('form [name=add]').disabled, name + ': disabled without JavaScript');
    assert(!invalid.window.document.querySelector('[data-pickup-location]'));
    invalid.window.close();
  }
  console.log('PASS Product readiness: Classic/Simple content order, removal, legacy compatibility and form isolation; five hosts retain selected variants outside the 250-item array; bounded JSON, localized option-value URLs, native swatches, suffix preservation, purchase payload and no-JS invalid-combination protection. Shopify large-catalog acceptance remains a separate gate.');
})().catch(error => { console.error(error); process.exitCode = 1; });
