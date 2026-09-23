const assert = require('node:assert/strict'), f = require('./support/commerce.cjs');
const column = 'basic-content-helper-column-builder', grid = 'basic-content-helper-grid-builder', split = 'split-content-dynamic';
const escape = value => String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Explicit native image/color/handle adapters. CSS layout and provider rendering remain live obligations.
f.engine.registerFilter('handleize', value => String(value ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
f.engine.registerFilter('image_tag', (url, ...pairs) => {
  const args = Object.fromEntries(pairs.filter(Array.isArray));
  return '<img src="' + escape(url) + '" width="800" height="600"' + ['alt', 'class', 'loading', 'sizes'].map(key => ' ' + key + '="' + escape(args[key] || '') + '"').join('') + '>';
});
f.engine.registerFilter('color_extract', (color, channel) => {
  const value = String(color), i = ['red', 'green', 'blue'].indexOf(channel);
  if (/^#[0-9a-f]{6}$/i.test(value)) return parseInt(value.slice(1 + i * 2, 3 + i * 2), 16);
  if (/^#[0-9a-f]{3}$/i.test(value)) return parseInt(value[1 + i].repeat(2), 16);
  const rgb = value.match(/^rgba?\(([^)]+)\)$/); assert.ok(rgb, 'fixture color must be explicit'); return Number(rgb[1].split(',')[i]);
});
const defaults = settings => Object.fromEntries((settings || []).filter(s => s.id).map(s => [s.id, s.default ?? '']));
const sampleBlocks = {
  [column]: [{ type: 'tile', settings: { icon: 'truck', image: f.photo(), title: 'Tile <safe>', body: '<p>Native <a href="/info">content</a></p>', cta_label: 'Read <safe>', cta_url: '/fr/pages/info?a=1&b=2', cta_style: 'button' } }],
  [grid]: [{ type: 'item', settings: { icon: 'star', image: f.photo(), card_bg_image: f.photo(2), title: 'Grid <safe>', meta: 'Meta <safe>', body: '<p>Native <strong>body</strong></p>', cta_label: 'Go <safe>', cta_url: '/fr/pages/info' } }],
  [split]: [{ type: 'badge', settings: { badge_text: 'Saved <safe>', badge_icon: '<svg data-badge></svg>' } }, { type: 'button', settings: { label: 'Go <safe>', link: '/fr/pages/info', icon: '<svg data-button></svg>' } }]
};
async function html(name, settings = {}, blocks = sampleBlocks[name], id = 'one', design = false) {
  const schema = f.unpack(name).schema;
  const nativeBlocks = blocks.map(b => ({ ...b, settings: { ...defaults(schema.blocks.find(s => s.type === b.type)?.settings), ...b.settings } }));
  return '<div id="shopify-section-' + id + '">' + await f.render(name, { id, settings: { ...defaults(schema.settings), ...settings }, blocks: nativeBlocks, data: { request: { design_mode: design } } }) + '</div>';
}
async function host(...args) { return f.dom(await html(...args)); }
function inspect(d, fn) { try { fn(d.window.document); } finally { d.window.close(); } }
async function matrix(name, selector) {
  const { schema } = f.unpack(name);
  for (const preset of schema.presets || []) inspect(await host(name, preset.settings || {}, preset.blocks || []), doc => { assert.ok(doc.querySelector(selector)); assert.equal(doc.querySelector('a[href=""]'), null); });
  for (const setting of schema.settings) {
    const values = setting.options?.map(o => o.value) || (setting.type === 'range' ? [setting.min, setting.max] : setting.type === 'checkbox' ? [false, true] : []);
    for (const value of values) inspect(await host(name, { [setting.id]: value }), doc => { assert.ok(doc.querySelector(selector), name + ' setting ' + setting.id); assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/); });
  }
  for (const blockType of schema.blocks) for (const setting of blockType.settings) {
    const values = setting.options?.map(o => o.value) || (setting.type === 'range' ? [setting.min, setting.max] : setting.type === 'checkbox' ? [false, true] : []);
    for (const value of values) {
      const block = sampleBlocks[name].find(b => b.type === blockType.type);
      inspect(await host(name, {}, [{ ...block, settings: { ...block.settings, [setting.id]: value } }]), doc => { assert.ok(doc.querySelector(selector)); assert.equal(doc.querySelectorAll('[data-editor-block]').length, 1, name + ' block identity ' + setting.id); assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/); });
    }
  }
}
function scopedStyles(doc, scope) {
  function walk(rules) { for (const rule of rules) { if (rule.selectorText) for (const selector of rule.selectorText.split(',')) assert.ok(selector.trim().startsWith(scope), selector + ' is scoped'); if (rule.cssRules) walk(rule.cssRules); } }
  for (const sheet of doc.styleSheets) walk(sheet.cssRules);
}
(async () => {
  await matrix(column, '.q-column-builder'); await matrix(grid, '.q-grid-builder'); await matrix(split, 'section.q-split-content');
  for (const name of [column, grid]) {
    inspect(await host(name, {}, []), doc => assert.equal(doc.querySelector('section'), null));
    inspect(await host(name, {}, [], 'empty', true), doc => assert.ok(doc.querySelector('[role=status]')));
  }
  inspect(await host(column, { text_align: 'center', surface: 'var(--q-surface)', columns_desktop: 6, columns_tablet: 4, columns_mobile: 3 }), doc => {
    assert.equal(doc.querySelector('.q-title').textContent, 'Tile <safe>'); assert.equal(doc.querySelector('.q-cta-btn').textContent.trim(), 'Read <safe>'); assert.ok(doc.querySelector('use').getAttribute('href').endsWith('#lucide-truck')); assert.ok(doc.querySelector('.q-body a')); assert.equal(doc.querySelector('img').alt, 'Photo <safe>');
    const root = doc.querySelector('.q-column-builder'); assert.equal(root.style.getPropertyValue('--q-column-surface').trim(), 'var(--q-surface)'); assert.equal(root.style.getPropertyValue('--q-cols-mobile').trim(), '3');
    const css = doc.querySelector('style').textContent; assert.match(css, /text-align: var\(--q-align/); assert.match(css, /align-self:center/); assert.match(css, /--q-surface: var\(--c-bg, #fff\)/);
    // Every existing token-valued choice now has a local definition; self-reference cannot consume the surface/icon setting.
    for (const group of [f.unpack(column).schema, ...f.unpack(column).schema.blocks]) for (const setting of group.settings || []) for (const option of setting.options || []) if (/^var\(--q-/.test(option.value)) assert.ok(css.includes(option.value.slice(4, -1) + ':'), setting.id + ' unresolved ' + option.value);
    assert.equal(doc.querySelector('.q-tile').style.getPropertyValue('--q-icon-color'), ''); scopedStyles(doc, '.q-scope-one');
  });
  for (const choice of f.unpack(column).schema.blocks[0].settings.find(s => s.id === 'icon').options) if (choice.value) assert.ok(f.read('assets/icons.svg').includes('id="lucide-' + choice.value + '"'));
  inspect(await host(column, { use_custom_colors: true, custom_text: '#123456', custom_accent: '#abcdef' }, [{ type: 'tile', settings: { cta_label: 'No URL', cta_url: '', image: '', icon: '', icon_color: '', title_color: '' } }]), doc => {
    assert.equal(doc.querySelector('a, img, svg'), null); assert.equal(doc.querySelector('.q-column-builder').style.getPropertyValue('--q-text').trim(), '#123456'); assert.equal(doc.querySelector('.q-tile').style.getPropertyValue('--q-tile-icon-color').trim(), 'var(--q-icon-color)');
  });
  inspect(await host(grid, { kicker: '', title: '', subtitle: '', columns_mobile: 3, use_custom_colors: true, divider_color: '#123456', item_border_color: '#abcdef', divider_opacity: 0, item_border_opacity: 40, accent_color: '#234567' }, [{ ...sampleBlocks[grid][0], settings: { ...sampleBlocks[grid][0].settings, card_overlay_color: 'rgba(20,40,60,0.5)', card_overlay_enable: true, card_overlay_opacity: 0, card_bg_mode: 'image' } }]), doc => {
    assert.equal(doc.querySelector('header'), null); const root = doc.querySelector('.q-grid-builder'); assert.equal(root.style.getPropertyValue('--q-cols-m').trim(), '3'); assert.equal(root.style.getPropertyValue('--q-divider-rgb').trim(), '18, 52, 86'); assert.equal(root.style.getPropertyValue('--q-item-border-rgb').trim(), '171, 205, 239'); assert.equal(root.style.getPropertyValue('--q-divider-opacity').trim(), '0');
    const card = doc.querySelector('.q-grid-item__card'); assert.ok(card.classList.contains('has-card-bg-img')); assert.equal(card.style.getPropertyValue('--q-card-overlay-rgb').trim(), '20, 40, 60'); assert.equal(card.style.getPropertyValue('--q-card-overlay-opacity').trim(), '0'); assert.equal(doc.querySelector('h3').textContent, 'Grid <safe>'); assert.equal(doc.querySelector('.q-grid-item__meta').textContent, 'Meta <safe>'); assert.equal(doc.querySelector('a').textContent.trim(), 'Go <safe>'); scopedStyles(doc, '#shopify-section-one');
  });
  for (const [mode, icons, images] of [['auto', 1, 1], ['both', 1, 1], ['image', 0, 1], ['icon', 1, 0], ['none', 0, 0]]) inspect(await host(grid, {}, [{ ...sampleBlocks[grid][0], settings: { ...sampleBlocks[grid][0].settings, media_mode: mode } }]), doc => { assert.equal(doc.querySelectorAll('.q-grid-item__icon').length, icons); assert.equal(doc.querySelectorAll('.q-grid-item__media img').length, images); });
  inspect(await host(grid, {}, [{ type: 'item', settings: { image: '', icon: 'none', meta: '', cta_label: '', cta_url: '/valid', title: '', body: '' } }]), doc => { assert.equal(doc.querySelector('a, img, h3, .q-grid-item__meta'), null); });
  const spacingCases = [
    [{ content_pad_y: 'py-12 md:py-16', content_pad_x: 'px-6 md:px-10' }, [48, 64, 24, 40]],
    [{ content_pad_y: 'py-2 md:py-20', content_pad_x: 'px-3 md:px-32' }, [8, 80, 12, 128]],
    [{ content_pad_y: 'py-0 md:py-0', content_pad_x: 'px-0 md:px-0' }, [0, 0, 0, 0]],
    [{ content_pad_y: 'py-4', content_pad_x: 'px-5' }, [16, 16, 20, 20]],
    [{ content_pad_y: 'invalid md:py-999', content_pad_x: 'bad px-unknown' }, [48, 48, 24, 24]]
  ];
  for (const [settings, values] of spacingCases) inspect(await host(split, settings), doc => {
    const root = doc.querySelector('section.q-split-content'); ['y-m', 'y-d', 'x-m', 'x-d'].forEach((key, i) => assert.equal(root.style.getPropertyValue('--q-copy-pad-' + key).trim(), values[i] + 'px'));
    assert.equal(doc.querySelector('.q-inner').style.padding, '', 'inline mobile padding cannot override desktop rule');
  });
  inspect(await host(split, { anchor_id: 'chapter:custom', region_label: 'Region "safe"', heading: 'Heading <safe>', subheading: 'First <safe>\nSecond', image: f.photo(1), mobile_image: f.photo(2), image_alt: 'Desktop <safe>', mobile_image_alt: 'Mobile <safe>', image_caption: 'Caption <safe>', hide_on_mobile: true, hide_on_desktop: true }, [sampleBlocks[split][0], { ...sampleBlocks[split][1], settings: { ...sampleBlocks[split][1].settings, new_tab: true } }, { type: 'button', settings: { label: '', link: '/valid' } }, { type: 'button', settings: { label: 'Blank URL', link: '' } }]), doc => {
    const root = doc.querySelector('section.q-split-content'); assert.equal(root.id, 'chapter:custom'); assert.equal(root.getAttribute('aria-label'), 'Region "safe"'); assert.ok(root.classList.contains('q-hide-mobile')); assert.ok(root.classList.contains('q-hide-desktop'));
    assert.equal(doc.querySelectorAll('.q-btn').length, 1); assert.equal(doc.querySelector('.q-btn').getAttribute('data-editor-block'), '1'); assert.equal(doc.querySelector('.q-btn').getAttribute('rel'), 'noopener noreferrer'); assert.equal(doc.querySelector('.q-btn').getAttribute('aria-label'), 'Go <safe>'); assert.equal(doc.querySelector('.q-badge').getAttribute('data-editor-block'), '0'); assert.equal(doc.querySelector('.q-badge').textContent.trim(), 'Saved <safe>');
    assert.equal(doc.querySelector('h2').textContent, 'Heading <safe>'); assert.equal(doc.querySelector('.q-sub').textContent, 'First <safe>\nSecond'); assert.equal(doc.querySelector('figcaption').textContent, 'Caption <safe>'); assert.equal(doc.querySelector('figcaption').parentElement.tagName, 'FIGURE'); assert.equal(doc.querySelector('.q-show-m img').alt, 'Mobile <safe>'); assert.equal(doc.querySelector('.q-show-d img').alt, 'Desktop <safe>'); assert.equal(doc.querySelector('.q-stars'), null); scopedStyles(doc, '#shopify-section-one');
  });
  inspect(await host(split, { image: '', mobile_image: f.photo(2), mobile_image_alt: 'Mobile only', mobile_presentation: 'bg', mobile_overlay_opacity: 0 }), doc => { assert.ok([...doc.querySelectorAll('img')].every(x => x.src.includes('image-2.jpg'))); assert.equal(doc.querySelector('.q-content-side').style.getPropertyValue('--m-ov-o').trim(), '0'); assert.equal(doc.querySelector('.visually-hidden').textContent, 'Mobile only'); });
  inspect(await host(split, { image: '', mobile_image: '' }, [{ type: 'badge', settings: { badge_text: '' } }]), doc => { assert.ok(doc.querySelector('.q-no-media')); assert.equal(doc.querySelector('img, picture, .q-btns, .q-badges'), null); });
  inspect(await host(split, { hide_on_mobile: true, hide_on_desktop: true }, [], 'editor', true), doc => { assert.equal(doc.querySelector('.q-hide-mobile, .q-hide-desktop'), null, 'editor can reach hidden host settings'); });
  for (const name of [column, grid, split]) {
    const d = f.dom(await html(name, {}, undefined, 'first') + await html(name, {}, undefined, 'second'));
    inspect(d, doc => { const ids = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size); assert.equal(doc.querySelector('script'), null, 'no unmanaged JS lifecycle'); });
  }
  console.log('PASS actual Column/Grid/Split settings and block presets/select/range/false endpoints; local token choices and sprite references, color channels/zero opacity, exact columns/media modes, blank actions/header, separate buttons/badges/editor IDs, independent padding tokens, mobile-only media/alt, custom-anchor CSS isolation, no-JS instances and editor visibility. Native CSS geometry/contrast/SVG/editor acceptance remains live queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
