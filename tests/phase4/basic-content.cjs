const assert = require('node:assert/strict');
const f = require('./support/commerce.cjs');
// Actual Liquid sources; native image-tag output and Shopify context use explicit adapters.
f.engine.registerFilter('handleize', value => String(value ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const embed = 'basic-content-helper-code-embed', divider = 'basic-content-helper-section-divider', text = 'basic-content-helper-text-centered-full-width';
const globals = Object.assign({}, ...JSON.parse(f.read('config/settings_schema.json')).map(g => f.defaults(g.settings)));
const routes = { root_url: '/fr/', collections_url: '/fr/collections', search_url: '/fr/search' };
const blankColors = { bg_color: '', text_color: '', muted_text_color: '', accent_color: '', surface_color: '', border_color: '' };
const sample = '<iframe title="Merchant widget" src="https://provider.test/embed"></iframe><div data-provider>Saved HTML</div>';
async function host(name, settings = {}, opts = {}) {
  const id = opts.id || 'one';
  return f.dom('<div id="shopify-section-' + id + '">' + await f.render(name, { ...opts, id, settings }) + '</div>');
}
function close(d) { d.window.close(); }
async function settingsMatrix(name, base, selector) {
  const { schema } = f.unpack(name);
  for (const preset of schema.presets || []) {
    const d = await host(name, { ...base, ...preset.settings }, { blocks: preset.blocks });
    assert.ok(d.window.document.querySelector(selector), name + ' preset'); close(d);
  }
  for (const control of schema.settings || []) {
    const values = control.options?.map(x => x.value) || (control.type === 'range' ? [control.min, control.max] : control.type === 'checkbox' ? [false, true] : []);
    for (const value of values) {
      const d = await host(name, { ...base, [control.id]: value });
      assert.ok(d.window.document.querySelector(selector), name + ' ' + control.id + '=' + value);
      assert.doesNotMatch(d.window.document.body.innerHTML, /Liquid error|NaN|undefined/); close(d);
    }
  }
}
(async () => {
  await settingsMatrix(embed, { ...blankColors, embed_code: sample }, '.q-content-embed');
  for (const value of ['', '   ']) {
    let d = await host(embed, { embed_code: value }); assert.equal(d.window.document.querySelector('iframe, .q-content-embed'), null); close(d);
    d = await host(embed, { embed_code: value }, { data: { request: { design_mode: true } } });
    assert.match(d.window.document.querySelector('[role=status]').textContent, /Add embed/); close(d);
  }
  assert.equal(f.unpack(embed).schema.settings.find(s => s.id === 'embed_code').default, undefined, 'new section never loads a demo provider');
  for (const mode of ['raw', 'iframe_ratio']) {
    const d = await host(embed, { ...blankColors, embed_code: sample, embed_mode: mode, use_custom_colors: true, bg_color: '#123456', text_color: '#fedcba', title: 'Title <safe>', kicker: 'Kicker <safe>', description: '<p>Native <a href="/info">rich text</a></p>', aspect_ratio: 'custom', aspect_ratio_custom: 150, allow_horizontal_scroll: false, frame_border: true });
    const doc = d.window.document, root = doc.querySelector('.q-content-embed');
    assert.equal(root.style.getPropertyValue('--q-bg').trim(), '#123456'); assert.equal(root.style.getPropertyValue('--q-text').trim(), '#fedcba');
    assert.equal(root.style.getPropertyValue('--q-surface'), '', 'unset custom colors retain native fallbacks');
    assert.equal(root.style.getPropertyValue('--q-ratio-pct').trim(), '150%'); assert.equal(root.style.getPropertyValue('--q-frame-border-w').trim(), '1px');
    assert.equal(doc.querySelector('h2').textContent, 'Title <safe>'); assert.equal(doc.querySelector('.q-content-embed__kicker').textContent, 'Kicker <safe>');
    assert.equal(doc.querySelector('iframe').title, 'Merchant widget'); assert.equal(doc.querySelector('iframe').src, 'https://provider.test/embed'); assert.ok(doc.querySelector('.rte a')); assert.ok(doc.querySelector('.q-scroll-false')); assert.equal(!!doc.querySelector('.q-content-embed__ratio'), mode === 'iframe_ratio');
    assert.match(doc.querySelector('style').textContent, /\.q-content-embed\s*\{[\s\S]*?background: var\(--q-bg/); close(d);
  }
  for (let strength = 0; strength <= 5; strength++) {
    const d = await host(embed, { embed_code: sample, frame_shadow_strength: strength }); assert.equal(d.window.document.querySelector('.q-content-embed').style.getPropertyValue('--q-frame-shadow').trim() === 'none', strength === 0); close(d);
  }
  await settingsMatrix(divider, {}, '.q-sd');
  for (const anchor of ['', 'section-divider']) {
    const html = await f.render(divider, { id: 'first', settings: { anchor_id: anchor } }) + await f.render(divider, { id: 'second', settings: { anchor_id: anchor } });
    const d = f.dom(html); assert.deepEqual([...d.window.document.querySelectorAll('.q-sd')].map(x => x.id), ['section-divider-first', 'section-divider-second']); close(d);
  }
  let d = await host(divider, { anchor_id: ' My Chapter ', variant: 'section_chapter', label: 'Chapter <safe>', subtitle: '<p>Native <strong>subtitle</strong></p>', show_icon: true, use_alt_background: true });
  let doc = d.window.document; assert.equal(doc.querySelector('.q-sd').id, 'my-chapter'); assert.equal(doc.querySelector('h2').textContent.trim(), 'Chapter <safe>'); assert.ok(doc.querySelector('.q-sd__wrap--alt')); assert.ok(doc.querySelector('.q-sd__chapter-subtitle strong')); assert.equal(doc.querySelector('use').getAttribute('href'), '/assets/icons.svg#lucide-sparkle'); assert.equal(doc.querySelector('svg').getAttribute('focusable'), 'false'); close(d);
  d = await host(divider, { variant: 'section_chapter', label: '', show_icon: true }); assert.ok(d.window.document.querySelector('.q-sd--divider_only')); assert.equal(d.window.document.querySelector('svg, h2, .q-sd__label'), null); close(d);
  d = await host(divider, { space_above: 'large', space_below: 'small', line_thickness: 'strong', max_width: 'full', pad_x: 'roomy' });
  const style = d.window.document.querySelector('.q-sd').style;
  for (const [key, value] of Object.entries({ '--q-sd-space-above': 'var(--q-space-10, 40px)', '--q-sd-space-below': 'var(--q-space-4, 16px)', '--q-sd-line-weight': 'var(--q-border-strong, 3px)', '--q-sd-maxw': 'var(--q-container-full, 100%)', '--q-sd-pad-x': 'var(--q-space-8, 32px)' })) assert.equal(style.getPropertyValue(key).trim(), value); close(d);
  // Existing icon choices in both actual consumers resolve to symbols in the already deployed sprite.
  const sprite = f.read('assets/icons.svg'), grid = f.unpack('basic-content-helper-grid-builder');
  for (const name of ['sparkle', ...grid.schema.blocks[0].settings.find(s => s.id === 'icon').options.map(x => x.value)]) {
    const html = await f.engine.parseAndRender(f.read('snippets/q-icon.liquid'), { name });
    d = f.dom(html);
    if (name === 'none') assert.equal(d.window.document.querySelector('svg'), null);
    else { assert.ok(sprite.includes('id="lucide-' + name + '"')); assert.equal(d.window.document.querySelector('use').getAttribute('href'), '/assets/icons.svg#lucide-' + name); }
    close(d);
  }
  assert.equal((await f.engine.parseAndRender(f.read('snippets/q-icon.liquid'), { name: '' })).trim(), '');
  d = await host('basic-content-helper-grid-builder', {}, { blocks: [{ type: 'item', settings: { icon: 'check' } }] }); assert.ok(d.window.document.querySelector('.q-grid-item__icon use')); close(d); // Icon contract only; complete Grid host review is separate.
  await settingsMatrix(text, {}, '.q-ct');
  for (const custom of [false, true]) {
    d = await host(text, { use_custom_colors: custom, surface: 'contrast', kicker: 'Kicker <safe>', title: 'Title <safe>', body: '<p><a href="/info">Native rich text</a></p>', element_gap: 0, pad_y: 0 }); doc = d.window.document;
    assert.equal(doc.querySelector('h2').textContent, 'Title <safe>'); assert.ok(doc.querySelector('.q-ct__body a')); assert.ok(doc.querySelector('.is-kicker-opacity-72')); assert.ok(doc.querySelector(custom ? '.is-surface-custom' : '.is-surface-contrast')); assert.match(doc.querySelector('style').textContent, /--q-ct-pad-y: 0px/); assert.match(doc.querySelector('style').textContent, /--q-ct-gap: 0px/); close(d);
  }
  d = await host(text, { kicker: '', title: '', body: '<p>&nbsp;</p>' }); assert.equal(d.window.document.querySelector('.q-ct'), null); close(d);
  d = await host(text, { kicker: '', title: '', body: '' }, { data: { request: { design_mode: true } } }); assert.ok(d.window.document.querySelector('[role=status]')); close(d);
  for (const name of [embed, divider, text]) {
    const settings = name === embed ? { embed_code: sample } : {};
    const html = await f.render(name, { id: 'alpha', settings }) + await f.render(name, { id: 'beta', settings }); d = f.dom(html);
    const css = [...d.window.document.querySelectorAll('style')].map(x => x.textContent).join('\n'); assert.ok(css.includes('#shopify-section-alpha')); assert.ok(css.includes('#shopify-section-beta')); assert.equal(d.window.document.querySelector('script'), null, 'native hosts own no JS lifecycle'); close(d);
  }
  const native404 = { ...globals, notfound_image: '', notfound_bg_image: '' };
  async function page404(settings = {}, blocks = [], id = 'error') { return host('main-404', {}, { id, blocks, data: { settings: { ...native404, ...settings }, routes } }); }
  for (const layout of ['centered', 'split_left', 'split_right']) for (const visible of [true, false]) {
    d = await page404({ notfound_layout: layout, notfound_image: f.photo(), notfound_show_image: visible, notfound_show_bg_image: visible, notfound_bg_image: f.photo(2), notfound_overlay: visible }); doc = d.window.document;
    assert.equal(!!doc.querySelector('.qtm404__media img'), visible, layout + ' consumes show image'); assert.equal(!!doc.querySelector('.qtm404__bg-overlay'), visible); if (visible) assert.ok(doc.querySelector('.qtm404__media img').width > 0); close(d);
  }
  d = await page404({ notfound_heading: 'Missing <safe>', notfound_body: 'First <plain>\nNext line', notfound_cta_label: 'Home <safe>', notfound_search_label: 'Search "quoted" <safe>', notfound_search_placeholder: 'Try "this"', notfound_section_padding_top: 0, notfound_section_padding_bottom: 160 }, [{ type: '404_link', settings: { label: 'Helpful <safe>', url: '/fr/pages/info?a=1&b=2' } }, { type: '404_link', settings: { label: 'No URL', url: '' } }]); doc = d.window.document;
  assert.equal(doc.querySelector('h1').textContent.trim(), 'Missing <safe>'); assert.equal(doc.querySelector('.qtm404__message p').textContent, 'First <plain>\nNext line'); assert.equal(doc.querySelectorAll('.qtm404__message br').length, 1);
  assert.equal(doc.querySelector('.qtm404__button--primary').getAttribute('href'), '/fr/'); assert.equal(doc.querySelector('.qtm404__button--secondary').getAttribute('href'), '/fr/collections'); assert.equal(doc.querySelector('form').getAttribute('action'), '/fr/search'); assert.equal(doc.querySelector('form').method, 'get'); assert.equal(doc.querySelector('input').name, 'q'); assert.equal(doc.querySelector('label').htmlFor, doc.querySelector('input').id); assert.equal(doc.querySelector('input').placeholder, 'Try "this"'); assert.equal(doc.querySelectorAll('.qtm404__link').length, 1); assert.equal(doc.querySelector('.qtm404__link').textContent.trim(), 'Helpful <safe>'); assert.equal(doc.querySelector('[data-editor-block]').getAttribute('data-editor-block'), '0'); assert.equal(doc.querySelector('.qtm404').style.getPropertyValue('--qtm404-padding-top').trim(), '0px'); close(d);
  for (const link of ['', '/fr/pages/custom']) {
    d = await page404({ notfound_cta_link: link, notfound_continue_shopping_link: link, notfound_show_search: false, notfound_show_continue_shopping: false }, [{ type: '404_link', settings: { label: '', url: '' } }]); doc = d.window.document; assert.equal(doc.querySelector('form, nav, .qtm404__button--secondary'), null); assert.equal(doc.querySelector('.qtm404__button--primary').getAttribute('href'), link || '/fr/'); close(d);
  }
  const a = await page404({}, [], 'one404'), b = await page404({}, [], 'two404'); d = f.dom(a.window.document.body.innerHTML + b.window.document.body.innerHTML); const ids = [...d.window.document.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size); close(a); close(b); close(d);
  const dormant = await f.engine.parseAndRender(f.read('snippets/utility-404.liquid'), { section: { id: 'legacy' }, settings: { ...native404, notfound_heading: 'Old <safe>' }, routes }); d = f.dom(dormant); assert.equal(d.window.document.querySelector('h1').textContent, 'Old <safe>'); assert.equal(d.window.document.querySelector('a').getAttribute('href'), '/fr/'); close(d);
  console.log('PASS actual Embed/Divider/Text schemas, presets, selects/range endpoints/false controls, blank/editor states, scoped styles and independent anchors; existing sprite names in both consumers; native localized 404 settings, media, plain content, links/search/editor IDs and dormant utility. Provider execution, browser CSS geometry, native SVG and Shopify editor acceptance remain live queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
