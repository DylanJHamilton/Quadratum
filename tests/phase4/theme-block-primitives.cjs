const assert = require('node:assert/strict');
const f = require('./support/theme-blocks.cjs');
const names = ['heading', 'rich-text', 'button', 'button-group', 'badge', 'divider', 'spacer', 'icon', 'icon-list', 'quote', 'alert', 'code'];
const css = f.read('assets/qtm-content-blocks.css');
const wrapper = f.read('snippets/qtm-content-block-wrapper-start.liquid');
const rawEngine = f.read('assets/qtm-content-blocks-engine.js');
const fixtures = {
  heading: { heading_text: 'A & A', highlight_text: 'A', text_gradient: 'linear-gradient(90deg, #123456, #abcdef)' },
  'rich-text': { rich_text: '<p>First</p><p>Second <a href="/fr/collections/all">link</a></p><ul><li>One</li><li>Two</li></ul>' },
  button: { label: 'Read <safe>', url: '/fr/collections/all?a=1&b="safe"' },
  'button-group': { primary_url: '/fr/collections/all', secondary_label: 'Second', secondary_url: '/fr/pages/info' },
  badge: { badge_text: 'Label <safe>', badge_link: '/fr/collections/all' },
  divider: { divider_gradient: 'linear-gradient(90deg, #123456, #abcdef)' },
  spacer: {},
  icon: { icon_text: 'Star', icon_svg: '<svg viewBox="0 0 10 10" focusable="false"><path d="M0 0h10v10z"/></svg>', icon_image: f.photo(), icon_link: '/fr/collections/all', aria_label: 'Shop products' },
  'icon-list': Object.fromEntries([1, 2, 3, 4].flatMap(i => [['item_' + i + '_icon', '★'], ['item_' + i + '_heading', 'Feature ' + i], ['item_' + i + '_text', 'Detail ' + i], ['item_' + i + '_link', '/fr/pages/info-' + i], ['item_' + i + '_aria_label', 'Feature detail ' + i]])),
  quote: { quote_text: 'Approved <quote>', quote_author: 'Actual Author', quote_role: 'Actual Role', avatar: f.photo() },
  alert: { heading: 'Notice <safe>', message: '<p>Useful <strong>message</strong></p>', button_label: 'Read notice', button_url: '/fr/pages/info' },
  code: { custom_code: '<div>Rendered native custom code</div><iframe title="Real configured provider" src="https://provider.example.test"></iframe>' }
};
let renderedCases = 0;
function ids(doc) { const values = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(new Set(values).size, values.length); }
function healthy(doc, name) {
  assert.ok(doc.querySelector('.qtm-content-block--' + name));
  assert.equal(doc.querySelectorAll('.qtm-content-block__inner').length, 1);
  assert.equal(doc.querySelectorAll('[data-editor-block]').length, 1, 'native outer wrapper owns editor metadata');
  assert.equal(doc.querySelector('script'), null, 'layout owns the shared asset');
  assert.equal(doc.querySelector('a[href=""], a[href="#"], button:not([disabled])'), null, 'no unconfigured action');
  assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/);
  ids(doc); renderedCases++;
}
(async () => {
  for (const name of names) {
    const fullName = 'content-' + name, { liquid, schema } = f.unpack(fullName);
    const byId = Object.fromEntries(schema.settings.filter(s => s.id).map(s => [s.id, s]));
    assert.equal(Object.keys(byId).length, schema.settings.filter(s => s.id).length);
    // Settings must reach actual template logic (including the shared wrapper and the fixed item loop).
    for (const s of Object.values(byId)) {
      assert.ok((liquid + wrapper).includes('block.settings.' + s.id) || (name === 'icon-list' && /^item_[1-4]_(icon|heading|text|link|aria_label)$/.test(s.id)), name + ' missing setting consumer ' + s.id);
    }
    for (const preset of [{ name: 'schema defaults', settings: f.defaults(schema.settings) }, ...schema.presets]) {
      for (const [key, value] of Object.entries(preset.settings)) {
        const setting = byId[key]; assert.ok(setting, name + ' unknown preset key ' + key);
        if (setting.options) assert.ok(setting.options.some(o => o.value === value));
        if (setting.type === 'range') { assert.ok(value >= setting.min && value <= setting.max); assert.ok(Math.abs((value - setting.min) / setting.step - Math.round((value - setting.min) / setting.step)) < 1e-6); }
      }
      await f.inspect(fullName, preset.settings, doc => healthy(doc, name));
    }
    for (const s of Object.values(byId)) {
      const values = s.options?.map(o => o.value) || (s.type === 'range' ? [s.min, s.max] : s.type === 'checkbox' ? [false, true] : []);
      for (const value of values) await f.inspect(fullName, { ...fixtures[name], [s.id]: value }, doc => healthy(doc, name));
    }
    const d = f.dom(await f.html(fullName, fixtures[name], 'first') + await f.html(fullName, { ...fixtures[name], alignment: 'right', margin_bottom: 0 }, 'second'));
    ids(d.window.document); assert.equal(d.window.document.querySelectorAll('[data-editor-block]').length, 2); d.window.close();
    await f.inspect(fullName, { ...fixtures[name], show_desktop: false, show_tablet: false, show_mobile: false }, doc => {
      const root = doc.querySelector('.qtm-content-block'); for (const size of ['desktop', 'tablet', 'mobile']) assert.ok(root.classList.contains('qtm-hide-' + size));
    });
    await f.inspect(fullName, { ...fixtures[name], show_desktop: false, show_tablet: false, show_mobile: false }, doc => assert.equal(doc.querySelector('.qtm-hide-mobile,.qtm-hide-desktop,.qtm-hide-tablet'), null), true);
    await f.inspect(fullName, { ...fixtures[name], margin_bottom: 0, padding_left: 0, padding_right: 0, border_width: 0, custom_width: 240, content_width: 'custom' }, doc => {
      const root = doc.querySelector('.qtm-content-block'); assert.equal(root.style.getPropertyValue('--qtm-block-margin-bottom').trim(), '0px'); assert.equal(root.style.getPropertyValue('--qtm-block-custom-width').trim(), '240px'); assert.ok(root.classList.contains('qtm-content-width--custom'));
    });
    await f.inspect(fullName, { ...fixtures[name], animation: 'fade-up' }, doc => assert.equal(doc.querySelector('.is-observed,.is-visible'), null, 'no JS required for initial visibility'));
  }
  // Heading highlights cannot replace pieces of escaped HTML entities or lose repeated suffixes.
  for (const [text, highlight, count] of [['A & A', 'A', 2], ['&', 'amp', 0], ['<test><test>', '<test>', 2], ['AAA', 'A', 3], ['A & A', '&', 1]]) await f.inspect('content-heading', { heading_text: text, highlight_text: highlight }, doc => {
    assert.equal(doc.querySelector('.qtm-heading').textContent.trim(), text); assert.equal(doc.querySelectorAll('.qtm-heading__highlight').length, count); assert.equal(doc.querySelector('test'), null);
  });
  await f.inspect('content-heading', { enable_gradient_text: true, text_gradient: '' }, doc => assert.equal(doc.querySelector('.qtm-heading--gradient'), null));
  await f.inspect('content-heading', { heading_text: '' }, doc => assert.equal(doc.querySelector('.qtm-heading'), null));
  await f.inspect('content-rich-text', { rich_text: '' }, doc => assert.equal(doc.querySelector('.qtm-rich-text').textContent.trim(), ''));
  await f.inspect('content-spacer', { desktop_height: 0, tablet_height: 0, mobile_height: 0 }, doc => { const spacer = doc.querySelector('.qtm-spacer'); for (const size of ['desktop', 'tablet', 'mobile']) assert.equal(spacer.style.getPropertyValue('--qtm-spacer-' + size + '-height').trim(), '0px'); });
  await f.inspect('content-button', { url: '' }, doc => assert.equal(doc.querySelector('.qtm-button'), null));
  await f.inspect('content-button', { url: '' }, doc => assert.ok(doc.querySelector('button[disabled]')), true);
  await f.inspect('content-button', fixtures.button, doc => { assert.equal(doc.querySelector('a').getAttribute('href'), fixtures.button.url); assert.equal(doc.querySelector('a').textContent.trim(), 'Read <safe>'); assert.equal(doc.querySelector('safe'), null); });
  for (const [name, settings] of [['button', { ...fixtures.button, open_new_tab: true }], ['badge', { ...fixtures.badge, open_new_tab: true }], ['icon', { ...fixtures.icon, open_new_tab: true }], ['alert', { ...fixtures.alert, button_open_new_tab: true }], ['button-group', { ...fixtures['button-group'], primary_open_new_tab: true, secondary_open_new_tab: true }]]) await f.inspect('content-' + name, settings, doc => { for (const a of doc.querySelectorAll('a[target="_blank"]')) assert.match(a.rel, /noopener noreferrer/); });
  await f.inspect('content-button-group', { primary_label: '', secondary_label: '' }, doc => assert.equal(doc.querySelector('a,button'), null));
  await f.inspect('content-button-group', { primary_url: '', secondary_url: '' }, doc => assert.equal(doc.querySelector('a,button'), null));
  await f.inspect('content-button-group', fixtures['button-group'], doc => {
    assert.equal(doc.querySelectorAll('a').length, 2); assert.ok(doc.querySelector('.qtm-button-group__button--primary')); assert.ok(doc.querySelector('.qtm-button-group__button--secondary'));
  });
  await f.inspect('content-icon', { ...fixtures.icon, decorative: true }, doc => { const icon = doc.querySelector('a'); assert.equal(icon.getAttribute('aria-hidden'), null); assert.equal(icon.getAttribute('role'), null); assert.equal(icon.getAttribute('aria-label'), 'Shop products'); });
  await f.inspect('content-icon', { ...fixtures.icon, icon_link: '', decorative: true }, doc => assert.equal(doc.querySelector('.qtm-icon').getAttribute('aria-hidden'), 'true'));
  await f.inspect('content-icon', { ...fixtures.icon, icon_link: '', decorative: false, icon_mode: 'image' }, doc => { assert.equal(doc.querySelector('[role=img]').getAttribute('aria-label'), 'Shop products'); assert.equal(doc.querySelector('img').alt, ''); });
  await f.inspect('content-icon-list', { item_1_heading: '', item_1_text: 'Text-only link', item_1_link: '/fr/pages/info' }, doc => assert.equal(doc.querySelector('a').getAttribute('aria-label'), 'Text-only link'));
  await f.inspect('content-icon-list', { item_1_heading: '', item_1_text: '', item_1_icon: '★', item_1_link: '/fr/pages/info' }, doc => assert.equal(doc.querySelector('a').getAttribute('aria-label'), '★'));
  await f.inspect('content-quote', {}, doc => assert.equal(doc.querySelector('figure'), null));
  await f.inspect('content-quote', {}, doc => assert.ok(doc.querySelector('blockquote').textContent.includes('approved quote')), true);
  await f.inspect('content-quote', fixtures.quote, doc => { assert.equal(doc.querySelector('blockquote').textContent.trim(), 'Approved <quote>'); assert.equal(doc.querySelector('img').alt, ''); });
  await f.inspect('content-alert', { ...fixtures.alert, button_url: '' }, doc => assert.equal(doc.querySelector('a,button'), null));
  await f.inspect('content-code', { custom_code: '', show_warning: true }, doc => assert.equal(doc.querySelector('.qtm-code-block__warning,.qtm-code-block__fallback,.qtm-code-block__mode'), null));
  await f.inspect('content-code', { custom_code: '', show_warning: true, code_mode: 'embed' }, doc => { assert.ok(doc.querySelector('.qtm-code-block__warning')); assert.ok(doc.querySelector('.qtm-code-block__fallback')); assert.match(doc.querySelector('.qtm-code-block__mode').textContent, /provider/); }, true);
  await f.inspect('content-code', { contain_overflow: false }, doc => assert.equal(doc.querySelector('.qtm-code-block--contained'), null));
  // Actual CSS selectors cover the formerly dead controls. Rule selection is checked against real DOM.
  const contracts = [
    ['button-group', { ...fixtures['button-group'], group_layout: 'vertical' }, '.qtm-button-group--vertical', 'flex-direction: column'],
    ['button-group', { ...fixtures['button-group'], mobile_layout: 'stacked' }, '.qtm-button-group--mobile-stacked', 'flex-direction: column'],
    ['button-group', { ...fixtures['button-group'], mobile_layout: 'inline' }, '.qtm-button-group--mobile-inline', 'flex-direction: row'],
    ['icon', { ...fixtures.icon, show_background: true }, '.qtm-icon--has-background', 'background: var(--qtm-icon-background)'],
    ['icon-list', { ...fixtures['icon-list'], list_layout: 'vertical' }, '.qtm-icon-list--vertical', 'grid-template-columns: minmax(0, 1fr)'],
    ['icon-list', { ...fixtures['icon-list'], list_layout: 'horizontal' }, '.qtm-icon-list--horizontal', 'display: flex'],
    ['icon-list', { ...fixtures['icon-list'], list_layout: 'grid', columns: '3' }, '.qtm-icon-list--grid.qtm-icon-list--columns-3', 'grid-template-columns: repeat(3, minmax(0, 1fr))'],
    ['icon-list', { ...fixtures['icon-list'], icon_position: 'top' }, '.qtm-icon-list--icon-top .qtm-icon-list__item', 'flex-direction: column'],
    ['alert', { ...fixtures.alert, alert_layout: 'stacked' }, '.qtm-alert--stacked', 'flex-direction: column'],
    ['alert', { ...fixtures.alert, alert_layout: 'compact' }, '.qtm-alert--compact', 'padding-block: calc(var(--qtm-alert-padding) / 2)'],
    ['code', { contain_overflow: true }, '.qtm-code-block--contained', 'overflow: auto'],
    ['badge', { badge_style: 'soft' }, '.qtm-badge--soft', 'box-shadow:']
  ];
  for (const [name, settings, selector, declaration] of contracts) await f.inspect('content-' + name, settings, doc => { assert.ok(doc.querySelector(selector)); const at = css.indexOf(selector + ' {'); assert.ok(at >= 0); assert.ok(css.slice(at, css.indexOf('}', at)).includes(declaration), name + ' CSS consumer'); });
  assert.ok(css.includes('.qtm-button-group__button--primary')); assert.ok(css.includes('.qtm-button-group__button--secondary'));
  assert.doesNotMatch(css, /\.qtm-content-block \.qtm-icon-list--columns-/, 'column count must not override vertical/horizontal choices');
  assert.doesNotMatch(rawEngine, /injectStyles|createElement\('style'\)/);
  assert.match(f.read('layout/theme.liquid'), /qtm-content-blocks\.css/);
  assert.match(css, /\.qtm-content-block\.qtm-animate\.is-observed:not\(\.is-visible\)\s*\{\s*opacity: 0/);
  assert.equal(f.read('snippets/qtm-content-block-wrapper-end.liquid').includes('</div>'), false);
  console.log('PASS ' + renderedCases + ' actual primitive default/preset/select/range/checkbox renders; 12 independent block schemas, wrapper zero/custom widths/visibility, 36 presets, safe highlights/URLs, native editor-wrapper identity, empty actions/quotes, icon names, media alt, repaired CSS controls, no-JS presentation. DOM/native-media adapters do not certify Shopify/editor/browser geometry.');
})().catch(error => { console.error(error); process.exitCode = 1; });
