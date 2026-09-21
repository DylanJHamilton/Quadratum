const assert = require('node:assert/strict'), f = require('./support/commerce.cjs');
const people = 'interactive-content-helper-team-members-grid', timeline = 'interactive-content-helper-story-timeline';
const defaults = settings => Object.fromEntries((settings || []).filter(s => s.id).map(s => [s.id, s.default ?? '']));
f.engine.registerFilter('handleize', value => String(value ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
const samples = {
  [people]: ['Ada <safe>', 'Grace', 'Katherine'].map((name, i) => ({ type: 'person', settings: { name, role: 'Role <safe>', bio: '<p>Native <a href="/fr/pages/about">biography</a></p>', photo: i ? '' : f.photo(), email: 'person@example.test', linkedin_url: '/fr/pages/linkedin?a=1&b=2', other_social_url: '/fr/pages/social?a=1&b=2', other_social_label: 'Social <safe>', featured: i === 1 } })),
  [timeline]: [0, 1, 2, 3].map(i => ({ type: 'milestone', settings: { year_or_date: 'Year ' + i, title: 'Milestone <' + i + '>', description: '<p>Native <a href="/fr/pages/about">milestone</a></p>', image: f.photo(), icon: '<icon>', badge: 'Badge <safe>', link_url: '/fr/pages/story?a=1&b=2', link_label: 'Read <safe>' } }))
};
async function html(name, settings = {}, blocks = samples[name], id = 'one', design = false) {
  const schema = f.unpack(name).schema;
  const nativeBlocks = blocks.map(block => ({ ...block, settings: { ...defaults(schema.blocks.find(s => s.type === block.type)?.settings), ...block.settings } }));
  return '<div id="shopify-section-' + id + '">' + await f.render(name, { id, settings: { ...defaults(schema.settings), ...settings }, blocks: nativeBlocks, data: { request: { design_mode: design } } }) + '</div>';
}
async function host(...args) { return f.dom(await html(...args)); }
function inspect(d, fn) { try { fn(d.window.document); } finally { d.window.close(); } }
function scopedStyles(doc, prefix) {
  function walk(rules) { for (const rule of rules) { if (rule.selectorText) for (const selector of rule.selectorText.split(',')) assert.ok(selector.trim().startsWith(prefix), selector); if (rule.cssRules) walk(rule.cssRules); } }
  for (const sheet of doc.styleSheets) walk(sheet.cssRules);
}
async function matrix(name) {
  const schema = f.unpack(name).schema;
  for (const preset of schema.presets || []) inspect(await host(name, preset.settings || {}, preset.blocks || [], 'preset', true), doc => { assert.ok(doc.querySelector('section, [role=status]')); assert.equal(doc.querySelector('a[href=""]'), null); });
  for (const setting of schema.settings || []) {
    const values = setting.options?.map(x => x.value) || (setting.type === 'range' ? [setting.min, setting.max] : setting.type === 'checkbox' ? [false, true] : []);
    for (const value of values) inspect(await host(name, { [setting.id]: value }), doc => { assert.ok(doc.querySelector('section')); assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/); });
  }
}
function harness(markup, { rtl = false, narrow = false, reduced = false, resizeObserver = true } = {}) {
  const d = f.dom(markup), w = d.window, observers = [], listeners = new Set(), calls = [], tracks = [...w.document.querySelectorAll('[data-q-tl-track]')];
  const desktop = { matches: !narrow, addEventListener(_, fn) { listeners.add(fn); }, removeEventListener(_, fn) { listeners.delete(fn); } }, motion = { matches: reduced };
  w.matchMedia = query => query.includes('750px') ? desktop : motion;
  const sizes = new Map();
  function adapt(track) {
    track.style.direction = rtl ? 'rtl' : 'ltr'; sizes.set(track, { width: 600, total: 1438 });
    Object.defineProperty(track, 'clientWidth', { get: () => sizes.get(track).width });
    Object.defineProperty(track, 'scrollWidth', { get: () => sizes.get(track).total });
    [...track.children].forEach((node, i) => { node.getBoundingClientRect = () => ({ left: 991 + (rtl ? -1 : 1) * 362 * i, right: 1331 + (rtl ? -1 : 1) * 362 * i, width: 340 }); });
    track.scrollTo = options => { calls.push({ track, ...options }); track.scrollLeft = options.left; };
  }
  tracks.forEach(adapt);
  if (resizeObserver) w.ResizeObserver = class { constructor(callback) { this.callback = callback; this.disconnected = false; observers.push(this); } observe() {} disconnect() { this.disconnected = true; } };
  f.boot(w, ['interactive-content-timeline.js']);
  return { d, w, calls, tracks, observers, listeners, motion, sizes, adapt, narrow(value) { desktop.matches = !value; for (const fn of listeners) fn(); } };
}
(async () => {
  await matrix(people); await matrix(timeline);
  for (const name of [people, timeline]) for (const blocks of [[], [{ type: 'unrelated', settings: {} }]]) {
    inspect(await host(name, {}, blocks), doc => assert.equal(doc.querySelector('section'), null));
    inspect(await host(name, {}, blocks, 'empty', true), doc => assert.ok(doc.querySelector('[role=status]')));
  }
  for (const layout of ['grid', 'featured_plus_grid']) for (const show of [false, true]) inspect(await host(people, { layout, show_social_links: show, show_email: show, use_custom_colors: false, card_radius: 0, icon_size: 28, title: '', subtitle: '' }), doc => {
    assert.equal(doc.querySelectorAll('.q-person').length, 3); assert.equal(doc.querySelectorAll('.q-person__links').length, show ? 3 : 0); assert.equal(doc.querySelectorAll('.q-person__icon svg').length, show ? 9 : 0);
    assert.equal(doc.querySelector('header'), null); const root = doc.querySelector('.q-people'); assert.equal(root.getAttribute('aria-label'), 'Team members'); assert.equal(root.style.getPropertyValue('--q-people-card-radius').trim(), '0px'); assert.equal(root.style.getPropertyValue('--q-people-icon-size').trim(), '28px');
    if (layout === 'featured_plus_grid') { const featured = doc.querySelector('.q-person--featured'); assert.equal(featured.querySelector('h3').textContent, 'Grace'); assert.equal(featured.querySelector('.q-person__bio').tabIndex, -1); assert.equal(featured.querySelector('.q-person__avatar-inner').textContent.trim(), 'G'); }
    assert.equal(doc.querySelectorAll('.q-person__bio--clamp[tabindex="0"]').length, layout === 'grid' ? 3 : 2);
    assert.equal(doc.querySelector('img').alt, 'Ada <safe>'); if (show) { assert.equal(doc.querySelector('a[aria-label^=LinkedIn]').getAttribute('href'), '/fr/pages/linkedin?a=1&b=2'); for (const symbol of ['mail', 'linkedin', 'external-link']) assert.ok(f.read('assets/icons.svg').includes('id="lucide-' + symbol + '"')); }
    assert.equal(doc.querySelector('.q-person__avatar').getAttribute('aria-hidden'), 'true'); scopedStyles(doc, '#shopify-section-one');
    const css = [...doc.querySelectorAll('style')].map(x => x.textContent).join(''); assert.match(css, /repeat\(auto-fit, minmax\(min\(100%, max\(var\(--q-people-min-card\)/); assert.match(css, /\.q-person__bio--clamp:focus-within/);
  });
  for (const featured of [false, true]) inspect(await host(people, { layout: 'featured_plus_grid' }, samples[people].map(block => ({ ...block, settings: { ...block.settings, featured } }))), doc => { assert.equal(doc.querySelector('.q-person--featured h3').textContent, 'Ada <safe>'); assert.equal(doc.querySelectorAll('.q-person').length, 3); });
  inspect(await host(people, { use_custom_colors: true, card_bg: '#123456', max_width: 0, bio_clamp: true }, [samples[people][0]]), doc => { assert.equal(doc.querySelectorAll('.q-person').length, 1); assert.equal(doc.querySelector('.q-people__grid'), null); assert.equal(doc.querySelector('.q-person__bio--clamp'), null); assert.match(doc.querySelector('style').textContent, /--q-people-card-bg: #123456/); assert.equal(doc.querySelector('.q-people').style.getPropertyValue('--q-people-max').trim(), '100%'); });
  assert.equal(f.unpack(people).schema.settings.find(s => s.id === 'max_width').unit, '%');
  for (const [strength, expected] of [[0, 'none'], [1, '0 2px 6px'], [2, '0 6px 18px'], [3, '0 12px 32px']]) inspect(await host(people, { card_shadow_strength: strength }), doc => assert.ok(doc.querySelector('.q-people').style.getPropertyValue('--q-people-shadow').includes(expected)));
  for (const orientation of ['vertical', 'horizontal']) for (const marker of ['dot', 'icon', 'image']) for (const show of [false, true]) inspect(await host(timeline, { orientation, marker_style: marker, show_card_media: show, card_media_position: 'left', show_badges: show, show_heading: false, show_start_end_labels: show, start_label: 'Then <safe>', end_label: 'Now <safe>' }), doc => {
    assert.equal(doc.querySelectorAll('.q-tl__card').length, 4); assert.equal(doc.querySelectorAll('.q-tl__card.has-media').length, show && marker !== 'dot' ? 4 : 0); assert.equal(doc.querySelectorAll('.q-tl__cardMedia').length, show && marker !== 'dot' ? 4 : 0); assert.equal(doc.querySelectorAll('.q-tl__badge').length, show ? 4 : 0);
    assert.equal(doc.querySelector('header'), null); assert.equal(doc.querySelector('h3').textContent, 'Milestone <0>'); assert.equal(doc.querySelector('.q-tl__link').getAttribute('href'), '/fr/pages/story?a=1&b=2'); assert.equal(doc.querySelector('.q-tl__link').textContent.trim(), 'Read <safe>');
    if (show && marker === 'image') { const image = doc.querySelector('.q-tl__cardMedia img'); assert.equal(image.alt, 'Photo <safe>'); assert.equal(image.getAttribute('width'), '800'); assert.equal(image.getAttribute('height'), '600'); assert.equal(image.parentElement.getAttribute('aria-hidden'), null); }
    if (show && marker === 'icon') assert.equal(doc.querySelector('.q-tl__cardIcon').textContent, '<icon>');
    if (show) assert.equal(doc.querySelector('.q-tl__cap--start').textContent, 'Then <safe>');
    if (orientation === 'horizontal') { assert.equal(doc.querySelector('.q-tl__railNav').hidden, true, 'controls stay hidden before successful enhancement'); assert.equal(doc.querySelector('[data-q-tl-track]').tabIndex, 0); for (const button of doc.querySelectorAll('[aria-controls]')) assert.ok(doc.getElementById(button.getAttribute('aria-controls'))); }
    scopedStyles(doc, '#q-timeline-one');
  });
  inspect(await host(timeline, { title: '', subtitle: '', show_start_end_labels: true }, [samples[timeline][0]]), doc => { assert.equal(doc.querySelector('header, .q-tl__cap'), null); assert.ok(doc.querySelector('.q-tl--single')); });
  const css = f.unpack(timeline).liquid; assert.match(css, /prefers-reduced-motion/); assert.match(css, /\.q-tl__card\.has-media\{ grid-template-columns:/); assert.match(css, /grid-column: 1; grid-row: 1/); assert.match(css, /\.q-tl--single\.q-tl--vertical \.q-tl__cardCol\{ grid-column: 1/); assert.doesNotMatch(css, /mask-image: linear-gradient|setTimeout|<script>/);
  const markup = await html(timeline, { orientation: 'horizontal' });
  for (const rtl of [false, true]) {
    const h = harness(markup, { rtl }), doc = h.w.document, track = h.tracks[0], next = doc.querySelector('[data-q-tl-next]'), prev = doc.querySelector('[data-q-tl-prev]');
    assert.equal(h.observers.length, 1, 'duplicate asset/boot mounts once'); assert.equal(doc.querySelectorAll('section [role=status]').length, 1); assert.equal(prev.disabled, true); assert.equal(next.disabled, false); assert.equal(doc.querySelector('.q-tl__railNav').hidden, false);
    next.click(); assert.equal(h.calls.at(-1).left, (rtl ? -1 : 1) * 362, 'relative measurements ignore document offset'); next.click(); next.click(); assert.equal(Math.abs(h.calls.at(-1).left), 838, 'last target is native max scroll'); assert.equal(next.disabled, true);
    track.dispatchEvent(new h.w.KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true })); assert.equal(Math.abs(h.calls.at(-1).left), 0); h.motion.matches = true;
    track.dispatchEvent(new h.w.KeyboardEvent('keydown', { key: rtl ? 'ArrowLeft' : 'ArrowRight', bubbles: true, cancelable: true })); assert.equal(Math.abs(h.calls.at(-1).left), 362); assert.equal(h.calls.at(-1).behavior, 'auto'); assert.match(doc.querySelector('section [role=status]').textContent, /Milestone <1>/);
    const count = h.calls.length; track.querySelector('a').dispatchEvent(new h.w.KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true })); assert.equal(h.calls.length, count, 'native child controls retain keyboard ownership');
    h.narrow(true); assert.equal(doc.querySelector('.q-tl__railNav').hidden, true); next.click(); assert.equal(h.calls.length, count); assert.equal(track.tabIndex, -1);
    h.narrow(false); h.sizes.get(track).width = 1500; h.w.dispatchEvent(new h.w.Event('resize')); assert.equal(doc.querySelector('.q-tl__railNav').hidden, true);
    h.d.window.close();
  }
  const h = harness(markup + await html(timeline, { orientation: 'horizontal', show_horizontal_arrows: false }, undefined, 'two'), { resizeObserver: false }), doc = h.w.document;
  assert.equal(doc.querySelectorAll('section [role=status]').length, 2); h.tracks[1].dispatchEvent(new h.w.KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true })); assert.equal(h.calls.at(-1).track, h.tracks[1]);
  const first = doc.getElementById('shopify-section-one'), oldNext = first.querySelector('[data-q-tl-next]'); first.dispatchEvent(new h.w.CustomEvent('shopify:section:unload', { bubbles: true })); const before = h.calls.length; oldNext.click(); assert.equal(h.calls.length, before); assert.equal(h.listeners.size, 1); first.remove();
  const replacement = doc.createElement('div'); replacement.innerHTML = markup; doc.body.append(replacement); const track = replacement.querySelector('[data-q-tl-track]'); h.adapt(track); replacement.dispatchEvent(new h.w.CustomEvent('shopify:section:load', { bubbles: true })); assert.equal(h.listeners.size, 2);
  track.children[2].dispatchEvent(new h.w.CustomEvent('shopify:block:select', { bubbles: true })); assert.equal(h.calls.at(-1).left, 724); assert.equal(replacement.querySelector('[role=status]').textContent, '', 'editor selection does not announce manual navigation'); h.d.window.close();
  const clean = harness(markup); clean.w.document.querySelector('section').dispatchEvent(new clean.w.CustomEvent('shopify:section:unload', { bubbles: true })); assert.equal(clean.observers[0].disconnected, true); assert.equal(clean.listeners.size, 0); clean.observers[0].callback(); clean.d.window.close();
  for (const name of [people, timeline]) inspect(f.dom(await html(name, {}, undefined, 'first') + await html(name, {}, undefined, 'second')), doc => { const ids = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size); });
  console.log('PASS actual Team/People Card and Story Timeline settings/presets/blank/native media/link states, independent color/radius/icon controls, featured selection/biography access, scoped responsive/RTL/single-card contracts and timeline relative geometry/end bounds/keyboard/reduced-motion/duplicate/multiple-host/editor cleanup. Live browser/Shopify acceptance remains queued.');
})().catch(error => { console.error(error); process.exitCode = 1; });
