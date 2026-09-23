const assert = require('node:assert/strict');
const f = require('./support/theme-blocks.cjs');
const names = ['title', 'subtitle', 'vendor', 'type', 'tags', 'sku', 'description', 'metafield'];
const field = (type, value, extra = {}) => ({ type, value, 'list?': type.startsWith('list.'), ...extra });
const product = { ...f.product, type: 'Tools & <parts>', tags: ['_internal', 'Summer & Sun', 'Tools'], metafields: { custom: { details: field('single_line_text_field', '<safe> & detail'), tagline: field('single_line_text_field', '<safe> tagline') } } };
const html = (name, settings = {}, id = 'one', design = false, override = product) => f.html('product-' + name, settings, id, design, { product: override });
async function inspect(name, settings, check, override = product, design = false) { const d = f.dom(await html(name, settings, 'one', design, override)); try { check(d.window.document, d.window); } finally { d.window.close(); } }
let cases = 0;
function healthy(doc) {
  assert.equal(doc.querySelectorAll('[data-editor-block]').length, 1);
  assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/);
  assert.equal(doc.querySelector('a[href=""],a[href="#"],script:not([type="application/json"])'), null);
  const ids = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(new Set(ids).size, ids.length); cases++;
}
(async () => {
  for (const name of names) {
    const { liquid, schema } = f.unpack('product-' + name);
    const byId = Object.fromEntries(schema.settings.filter(s => s.id).map(s => [s.id, s]));
    for (const s of Object.values(byId)) assert.ok(liquid.includes('block.settings.' + s.id), name + ': consumer ' + s.id);
    for (const preset of [{ name: 'defaults', settings: f.defaults(schema.settings) }, ...schema.presets]) {
      for (const [key, value] of Object.entries(preset.settings)) {
        const s = byId[key]; assert.ok(s, name + ': ' + key);
        if (s.options) assert.ok(s.options.some(o => o.value === value));
        if (s.type === 'range') { assert.ok(value >= s.min && value <= s.max); assert.ok(Math.abs((value - s.min) / s.step - Math.round((value - s.min) / s.step)) < 1e-6); }
      }
      await inspect(name, preset.settings, healthy);
    }
    for (const s of Object.values(byId)) for (const value of s.options?.map(o => o.value) || (s.type === 'range' ? [s.min, s.max] : s.type === 'checkbox' ? [false, true] : [])) await inspect(name, { [s.id]: value }, healthy);
    await inspect(name, { show_on_desktop: false, show_on_tablet: false, show_on_mobile: false, animation_style: 'fade_up' }, doc => {
      healthy(doc); assert.equal(doc.querySelector('[class*="--hide-"],[class*="--animate"]'), null);
    }, product, true);
    await inspect(name, {}, healthy, null);
    const d = f.dom(await html(name, {}, 'first') + await html(name, { alignment: 'right', margin_bottom: 0 }, 'second'));
    assert.equal(new Set([...d.window.document.querySelectorAll('[id]')].map(n => n.id)).size, d.window.document.querySelectorAll('[id]').length); d.window.close();
    assert.match(liquid, /min-width: 0/); assert.match(liquid, /box-sizing: border-box/); assert.match(liquid, /prefers-reduced-motion: reduce/);
  }
  await inspect('title', {}, doc => { assert.equal(doc.querySelector('h1').textContent.trim(), product.title); assert.equal(doc.querySelector('safe'), null); });
  await inspect('title', {}, doc => assert.equal(doc.querySelector('.product-title'), null), null);
  await inspect('vendor', {}, doc => { assert.equal(doc.querySelector('.product-vendor__text').textContent.trim(), product.vendor); assert.equal(doc.querySelector('.product-subtitle'), null); });
  await inspect('vendor', { subtitle_source: 'custom', custom_text: '<p>Merchant <strong>copy</strong></p>', render_as_paragraph: true }, doc => {
    assert.equal(doc.querySelectorAll('.product-vendor__text p').length, 1); assert.ok(doc.querySelector('.product-vendor__text strong')); assert.equal(doc.querySelector('p p'), null);
  });
  await inspect('subtitle', { subtitle_source: 'metafield', metafield_namespace: ' custom ', metafield_key: ' details ' }, doc => {
    assert.equal(doc.querySelector('.product-subtitle__text').textContent.trim(), '<safe> & detail'); assert.equal(doc.querySelector('safe'), null);
  });
  await inspect('subtitle', { subtitle_source: 'tagline' }, doc => assert.equal(doc.querySelector('.product-subtitle__text').textContent.trim(), '<safe> tagline'));
  await inspect('type', { link_type: true, animation_style: 'Fade right' }, doc => {
    assert.equal(doc.querySelector('a').getAttribute('href'), '/fr/collections/types?q=' + encodeURIComponent(product.type)); assert.ok(doc.querySelector('.product-type--animate-fade_right'));
  });
  await inspect('tags', { link_tags: true, hide_internal_tags: true, max_tags: 1 }, doc => {
    assert.equal(doc.querySelectorAll('li').length, 1); assert.equal(doc.querySelector('a').getAttribute('href'), '/fr/collections/all/summer-sun'); assert.equal(doc.querySelector('a').textContent.trim(), 'Summer & Sun');
  });
  await inspect('tags', { hide_internal_tags: true, hide_when_empty: true }, doc => assert.equal(doc.querySelector('.product-tags'), null), { ...product, tags: ['_internal'] });
  const malicious = { ...product, variants: [{ id: 999, sku: '</script><img onerror="unsafe">' }], selected_or_first_available_variant: { id: 999, sku: '</script><img onerror="unsafe">' } };

  await inspect('sku', {}, doc => { assert.equal(doc.querySelector('img'), null); assert.equal(JSON.parse(doc.querySelector('[data-product-sku]').dataset.variants)[0].sku, malicious.variants[0].sku); }, malicious);
  await inspect('description', { enable_read_more: true, read_more_label: '', read_less_label: '' }, doc => {
    const root = doc.querySelector('[data-product-description]'), button = doc.querySelector('button');
    assert.ok(button.hidden); assert.equal(button.getAttribute('aria-expanded'), 'true'); assert.ok(doc.getElementById(button.getAttribute('aria-controls'))); assert.ok(!root.classList.contains('is-enhanced')); assert.ok(doc.querySelector('.product-description__content strong')); assert.equal(root.dataset.readMore, 'Read more');
  });
  const meta = (type, value, extra = {}) => ({ ...product, metafields: { custom: { details: field(type, value, extra) } } });
  for (const value of [false, 0, '<safe> & value']) for (const display_style of ['text', 'badge', 'list']) await inspect('metafield', { display_style }, doc => { assert.match(doc.querySelector('.product-metafield__inner').textContent, new RegExp(f.escape(value).replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&'))); assert.equal(doc.querySelector('safe'), null); }, meta(typeof value === 'boolean' ? 'boolean' : typeof value === 'number' ? 'number_integer' : 'single_line_text_field', value));
  await inspect('metafield', { display_style: 'list' }, doc => assert.deepEqual([...doc.querySelectorAll('li')].map(x => x.textContent.trim()), ['<first>', 'second']), meta('list.single_line_text_field', ['<first>', 'second']));
  await inspect('metafield', { display_style: 'list' }, doc => assert.deepEqual([...doc.querySelectorAll('li')].map(x => x.textContent.trim()), ['<Product>', 'Second']), meta('list.product_reference', [{ title: '<Product>' }, { title: 'Second' }]));
  await inspect('metafield', { display_style: 'rich_text' }, doc => assert.ok(doc.querySelector('.product-metafield__content strong')), meta('rich_text_field', {}, { html: '<p>Native <strong>rich text</strong></p>' }));
  await inspect('metafield', { display_style: 'rich_text' }, doc => assert.match(doc.querySelector('.product-metafield__content').textContent, /2, 0/), meta('list.number_integer', [2, 0]));
  await inspect('metafield', { display_style: 'image' }, doc => { assert.equal(doc.querySelector('img').alt, 'Alt <safe>'); assert.ok(doc.querySelector('img').hasAttribute('width')); }, meta('file_reference', { ...f.photo(), media_type: 'image', alt: 'Alt <safe>' }));
  for (const [value, expected] of [[{ media_type: 'generic_file', url: 'https://cdn.test/file.pdf?a=1&b="2"' }, 'https://cdn.test/file.pdf?a=1&b="2"'], [{ ...f.photo(), media_type: 'image' }, 'https://cdn.example.test/image-1.jpg?width=2400'], [{ media_type: 'video', sources: [{ url: 'https://cdn.test/video.mp4' }] }, 'https://cdn.test/video.mp4']]) await inspect('metafield', { display_style: 'file_link', label: '', file_link_label: '' }, doc => { assert.equal(doc.querySelector('a').getAttribute('href'), expected); assert.equal(doc.querySelector('a').textContent.replace('↓', '').trim(), 'Download file'); assert.equal(doc.querySelector('a').rel, 'noopener noreferrer'); }, meta('file_reference', value));
  await inspect('metafield', {}, doc => assert.equal(doc.querySelector('.product-metafield'), null), { ...product, metafields: {} });
  await inspect('metafield', { show_fallback: true, fallback_text: '<configured>' }, doc => assert.equal(doc.querySelector('.product-metafield__fallback').textContent.trim(), '<configured>'), { ...product, metafields: {} });
  assert.match(f.read('layout/theme.liquid'), /qtm-product-block-metadata\.js.*defer/);
  console.log('PASS ' + cases + ' default/preset/control renders, source consumers, product context, native-wrapper adapter, independent IDs, locale tags/type, escaped SKU/metadata, descriptions, rich-text/list/file/image adapters. Actual Shopify rendering/pixels remain queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
