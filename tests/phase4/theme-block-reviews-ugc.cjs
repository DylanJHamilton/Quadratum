const assert = require('node:assert/strict'), cp = require('node:child_process'), f = require('./support/theme-blocks.cjs');
const names = ['content-review-wall', 'content-testimonials', 'content-testimonials-slider', 'content-ugc-showcase'];
f.engine.registerFilter('video_tag', (video, ...pairs) => { const o = Object.fromEntries(pairs.filter(Array.isArray)); return '<video class="' + f.escape(o.class) + '" src="' + f.escape(video.url) + '" ' + ['controls', 'autoplay', 'muted', 'loop', 'playsinline'].filter(k => o[k]).join(' ') + ' preload="' + f.escape(o.preload) + '"></video>'; });
const product = { ...f.product, url: '/products/real?q="safe"&n=1', title: 'Real <product>', featured_image: f.photo() }, video = { url: '/uploads/real.mp4' }, link = '/pages/review?q="safe"&n=1';
const samples = {};
for (const name of names) { const seed = {}; for (const s of f.unpack(name).schema.settings.filter(x => x.id)) {
 if (s.type === 'text' || s.type === 'textarea') seed[s.id] = 'Saved <safe> ' + s.id;
 if (s.type === 'richtext') seed[s.id] = '<p>Saved <strong>' + s.id + '</strong></p>';
 if (s.type === 'image_picker') seed[s.id] = f.photo(); if (s.type === 'url') seed[s.id] = link;
 if (s.type === 'video_url') seed[s.id] = { type: 'youtube', id: 'Abc_123-safe' }; if (s.type === 'video') seed[s.id] = video;
 if (s.type === 'product') seed[s.id] = product;
 if (['review_count', 'testimonial_count'].includes(s.id)) seed[s.id] = s.max;
 } samples[name] = seed; }
let cases = 0;
async function inspect(name, settings = {}, fn = () => {}, design = false) {
 const d = f.dom(await f.html(name, settings, 'One_A', design)); try {
  const doc = d.window.document, root = doc.getElementById(name + '-One_A'); assert(root); assert.equal(doc.querySelectorAll('[data-editor-block]').length, 1);
  assert.equal(doc.querySelector('[onerror],a[href=""]'), null); assert.doesNotMatch(doc.body.innerHTML, /Liquid error|NaN|undefined/);
  const ids = [...doc.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size);
  for (const a of doc.querySelectorAll('a')) assert(a.textContent.trim() || a.getAttribute('aria-label') || a.querySelector('img[alt]:not([alt=""])'));
  for (const b of doc.querySelectorAll('button')) assert(b.textContent.trim() || b.getAttribute('aria-label'));
  for (const el of doc.querySelectorAll('[aria-controls]')) assert(doc.getElementById(el.getAttribute('aria-controls')));
  for (const image of doc.querySelectorAll('img')) { assert(image.hasAttribute('alt')); assert(image.width && image.height); }
  for (const script of doc.querySelectorAll('script')) { assert(script.src); assert(script.defer); }
  fn(doc, root); cases++;
 } finally { d.window.close(); }
}
function geometry(root, w, rtl = false) {
 const viewport = root.querySelector('.q-carousel__viewport'), track = root.querySelector('.q-carousel__track'), slides = [...root.querySelectorAll('.q-carousel__slide')]; let width = 520;
 root.getClientRects = () => [{}]; track.style.columnGap = '20px'; viewport.style.direction = rtl ? 'rtl' : 'ltr';
 Object.defineProperties(viewport, { clientWidth: { get: () => width }, scrollWidth: { get: () => slides.length * 250 + (slides.length - 1) * 20 } });
 viewport.getBoundingClientRect = () => ({ left: 0, right: width, width });
 slides.forEach((el, i) => el.getBoundingClientRect = () => { const left = rtl ? width - 250 - i * 270 + Math.abs(viewport.scrollLeft) : i * 270 - viewport.scrollLeft; return { left, right: left + 250, width: 250 }; });
 viewport.scrollTo = o => { viewport.scrollLeft = o.left; viewport.dispatchEvent(new w.Event('scroll')); };
 return { viewport, slides, resize(value) { width = value; w.dispatchEvent(new w.Event('resize')); } };
}
(async () => {
 for (const name of names) {
  const { schema, liquid } = f.unpack(name), old = JSON.parse(cp.execFileSync('git', ['show', '61109f1:blocks/' + name + '.liquid'], { encoding: 'utf8' }).split('{% schema %}')[1].split('{% endschema %}')[0]);
  const map = Object.fromEntries(schema.settings.filter(x => x.id).map(x => [x.id, x]));
  for (const s of old.settings.filter(x => x.id)) { assert.equal(map[s.id].type, s.type); assert.deepEqual(map[s.id].options, s.options); }
  for (const preset of [{ settings: {} }, ...schema.presets]) {
   for (const [k, v] of Object.entries(preset.settings)) { const s = map[k]; assert(s); if (s.options) assert(s.options.some(x => x.value === v)); if (s.type === 'range') assert(v >= s.min && v <= s.max && (v - s.min) % s.step === 0); }
   await inspect(name, preset.settings, (doc, root) => { assert(root.hidden); assert.equal(doc.querySelector('article'), null); });
   await inspect(name, preset.settings, (doc, root) => { assert(!root.hidden); assert(doc.querySelector('[role=note]')); }, true);
   await inspect(name, { ...preset.settings, ...samples[name] });
  }
  for (const s of Object.values(map)) for (const v of s.options?.map(x => x.value) || (s.type === 'range' ? [s.min, s.max] : s.type === 'checkbox' ? [false, true] : [])) await inspect(name, { ...samples[name], [s.id]: v });
  for (const preset of old.presets) await inspect(name, { ...f.defaults(old.settings), ...preset.settings }, (doc, root) => { assert(!root.hidden); assert(doc.querySelector('article')); });
  await inspect(name, { ...samples[name], show_on_desktop: false, show_on_tablet: false, show_on_mobile: false, show_desktop: false, show_tablet: false, show_mobile: false, animation: 'fade', animation_style: 'fade' }, (doc, root) => assert.doesNotMatch(root.className, /--hide-|--animate|--animation-fade/), true);
  const d = f.dom(await f.html(name, samples[name], 'One_A') + await f.html(name, samples[name], 'one-a')); const ids = [...d.window.document.querySelectorAll('[id]')].map(x => x.id); assert.equal(ids.length, new Set(ids).size); d.window.close();
  assert.match(liquid, /prefers-reduced-motion/); assert.match(liquid, /box-sizing: border-box/); assert.match(liquid, /overflow-wrap: anywhere/); assert.match(liquid, /@container/);
 }
 await inspect(names[0], { review_count: 12, review_12_quote: 'Only <quote>', review_12_image: f.photo(), review_12_rating: '4', review_12_verified_label: '' }, doc => { assert.equal(doc.querySelectorAll('article').length, 1); assert.equal(doc.querySelector('img').alt, 'Photo <safe>'); assert.equal(doc.querySelector('[role=img]').getAttribute('aria-label'), '4 out of 5 stars'); assert.equal(doc.querySelector('[role=img] span').getAttribute('aria-hidden'), 'true'); assert.equal(doc.querySelector('.content-review-wall__verified'), null); });
 await inspect(names[0], { review_1_source: 'Named source', link_color: '#123456' }, doc => { assert.equal(doc.querySelectorAll('article').length, 1); assert.match(doc.querySelector('style').textContent, /color: var\(--content-review-wall-link-color\)/); assert.equal(doc.querySelector('.content-review-wall__source').textContent, 'Named source'); });
 for (const name of names.slice(1, 3)) {
  await inspect(name, { testimonial_count: 8, testimonial_8_link_label: 'Read review', testimonial_8_link_url: link }, doc => { assert.equal(doc.querySelectorAll('article').length, 1); assert.equal(doc.querySelector('a').getAttribute('href'), link); assert.equal(doc.querySelector('.' + name + '__author'), null); });
  await inspect(name, { testimonial_1_link_label: 'Incomplete' }, (doc, root) => assert(root.hidden));
  await inspect(name, { testimonial_1_image: f.photo(), testimonial_1_image_alt: 'Explicit <alt>' }, doc => assert.equal(doc.querySelector('img').alt, 'Explicit <alt>'));
 }
 await inspect(names[1], { testimonial_1_quote: 'Review', layout_style: 'featured', desktop_columns: '1' }, doc => assert.match(doc.querySelector('style').textContent, /grid-column: span 1/));
 for (const type of ['youtube', 'vimeo', 'other']) await inspect(names[2], { testimonial_1_video_url: { type, id: type === 'vimeo' ? '123456789' : 'Abc_123-safe' } }, (doc, root) => {
  const template = doc.querySelector('template'); assert.equal(!!template, type !== 'other'); if (!template) { assert(root.hidden); return; }
  assert.equal(doc.querySelector('iframe'), null, 'remote media is not loaded until play'); assert(template.content.querySelector('iframe').title); assert.equal(template.content.querySelector('iframe').src, type === 'youtube' ? 'https://www.youtube-nocookie.com/embed/Abc_123-safe' : 'https://player.vimeo.com/video/123456789');
  assert(doc.querySelector('a').getAttribute('href').startsWith('https://')); assert(doc.querySelector('[data-q-carousel-play]').hidden);
 });
 await inspect(names[3], { show_item_6: true, item_6_review: '<p>Actual <strong>review</strong></p>', item_6_customer: 'A <name>', item_6_rating: 4, item_6_link: link, item_6_link_text: 'Source', layout_style: 'row' }, doc => {
  assert.equal(doc.querySelectorAll('article').length, 1); assert.equal(doc.querySelector('.qtm-ugc-showcase__media'), null); assert(doc.querySelector('strong')); assert.equal(doc.querySelector('a').getAttribute('href'), link); assert.equal(doc.querySelector('[role=list]').getAttribute('tabindex'), '0'); assert.equal(doc.querySelector('[role=img]').getAttribute('aria-label'), '4 out of 5 stars');
 });
 await inspect(names[3], { item_1_product: { ...product, featured_image: null } }, doc => { assert(doc.querySelector('.qtm-ugc-showcase__product--no-image')); assert.equal(doc.querySelector('a').getAttribute('href'), product.url); });
 await inspect(names[3], { item_1_product: product, show_product_reference: false, show_item_links: false }, (doc, root) => assert(root.hidden));
 await inspect(names[3], { item_1_media_type: 'external_video', item_1_external_video_url: 'https://example.test/watch?q="safe"', item_1_image: f.photo() }, doc => { assert.equal(doc.querySelector('iframe'), null); assert.equal(doc.querySelector('a').getAttribute('href'), 'https://example.test/watch?q="safe"'); assert.equal(doc.querySelector('a').rel, 'noopener noreferrer'); });
 for (const controls of [false, true]) for (const autoplay of [false, true]) await inspect(names[3], { item_1_media_type: 'video', item_1_video: video, show_video_controls: controls, autoplay_videos: autoplay }, doc => { const v = doc.querySelector('video'); assert(v.controls); assert(!v.autoplay); assert(v.hasAttribute('playsinline')); assert(doc.querySelector('[data-qtm-video-toggle]').hidden); assert.equal(doc.querySelector('[data-qtm-visual-block]').dataset.controls, String(controls)); });
 // Actual shared carousel with native Theme Block markup, measured LTR/RTL pages and deferred player cleanup.
 const slider = { ...samples[names[2]], testimonial_count: 5, autoplay: true, autoplay_speed: 7 }, markup = await f.html(names[2], slider, 'first') + await f.html(names[2], slider, 'second');
 let d = f.dom(markup), w = d.window, doc = w.document, timers = new Map(), motions = [], observers = [], next = 0, hidden = false;
 w.setInterval = (fn, ms) => { assert.equal(ms, 7000); timers.set(++next, fn); return next; }; w.clearInterval = id => timers.delete(id); Object.defineProperty(doc, 'hidden', { get: () => hidden });
 w.matchMedia = () => { const listeners = new Set(), m = { matches: false, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn), set(v) { m.matches = v; listeners.forEach(fn => fn()); } }; motions.push(m); return m; };
 w.IntersectionObserver = class { constructor(fn) { this.fn = fn; observers.push(this); } observe() {} disconnect() { this.disconnected = true; } };
 const roots = [...doc.querySelectorAll('[data-qtm-block-carousel]')], [a, b] = roots, [ga, gb] = roots.map((root, i) => geometry(root, w, i === 1));
 f.boot(w, ['interactive-content-carousel-media.js', 'interactive-content-carousel-media.js']); assert.equal(timers.size, 0); observers.forEach(o => o.fn([{ isIntersecting: true }])); assert.equal(timers.size, 2); assert.deepEqual(Array.from(a.__qCarousel.targets), [0, 540, 810]);
 a.querySelector('[data-q-carousel-next]').click(); assert.equal(ga.viewport.scrollLeft, 540); assert.equal(timers.size, 1); a.dispatchEvent(new w.Event('mouseleave')); assert.equal(timers.size, 1);
 const key = (el, key) => { const e = new w.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }); el.dispatchEvent(e); return e; }; key(gb.viewport, 'ArrowLeft'); assert.equal(gb.viewport.scrollLeft, -540); key(gb.viewport, 'End'); assert.equal(gb.viewport.scrollLeft, -810); assert(!key(ga.slides[0].querySelector('a'), 'ArrowRight').defaultPrevented);
 const play = ga.slides[0].querySelector('[data-q-carousel-play]'); play.click(); assert(a.querySelector('[data-carousel-mounted] iframe')); key(ga.viewport, 'End'); assert.equal(a.querySelector('[data-carousel-mounted]'), null);
 a.querySelector('[data-q-carousel-pause]').click(); assert.equal(timers.size, 0, 'restored player-button focus still stops motion'); const outside = doc.createElement('button'); outside.textContent = 'Outside'; doc.body.append(outside); outside.focus(); assert.equal(timers.size, 1); motions[0].set(true); assert.equal(timers.size, 0); motions[0].set(false); assert.equal(timers.size, 1); hidden = true; doc.dispatchEvent(new w.Event('visibilitychange')); assert.equal(timers.size, 0); hidden = false; doc.dispatchEvent(new w.Event('visibilitychange'));
 const old = a.__qCarousel; doc.body.append(a); await f.drain(); assert.equal(a.__qCarousel, old); a.remove(); await f.drain(); assert.equal(a.__qCarousel, undefined); doc.body.append(a); await f.drain(); assert(a.__qCarousel); a.dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true })); assert.equal(a.__qCarousel, undefined); a.dispatchEvent(new w.Event('shopify:section:load', { bubbles: true })); assert(a.__qCarousel); roots.forEach(r => r.__qCarousel?.destroy()); d.window.close();
 // Uploaded UGC videos use the actual existing player policy/controller per item.
 for (const design of [false, true]) {
  d = f.dom(await f.html(names[3], { item_1_media_type: 'video', item_1_video: video, item_2_media_type: 'video', item_2_video: video, autoplay_videos: true, show_video_controls: false }, 'video', design)); w = d.window; doc = w.document; const ios = [], listeners = new Set(), states = new Map(); let reduced = false;
  w.matchMedia = () => ({ get matches() { return reduced; }, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) });
  w.IntersectionObserver = class { constructor(fn) { this.fn = fn; ios.push(this); } observe(root) { this.root = root; } disconnect() { this.disconnected = true; } };
  for (const v of doc.querySelectorAll('video')) { const state = { paused: true, plays: 0 }; states.set(v, state); Object.defineProperty(v, 'paused', { get: () => state.paused }); v.play = () => { state.paused = false; state.plays++; v.dispatchEvent(new w.Event('play')); return Promise.resolve(); }; v.pause = () => { state.paused = true; v.dispatchEvent(new w.Event('pause')); }; v.parentElement.getClientRects = () => [{}]; }
  f.boot(w, ['qtm-block-visual-media.js', 'qtm-block-visual-media.js']); assert.equal(ios.length, 2); ios.forEach(o => o.fn([{ target: o.root, isIntersecting: true }])); await f.drain(); assert.equal([...states.values()][0].plays, design ? 0 : 1);
  reduced = true; listeners.forEach(fn => fn()); assert([...states.values()].every(s => s.paused)); const first = doc.querySelector('[data-qtm-visual-block]'); first.querySelector('button').click(); await f.drain(); assert(!states.get(first.querySelector('video')).paused, 'manual play remains available');
  first.remove(); await f.drain(); assert(ios[0].disconnected); assert([...states.values()][0].paused); const remaining = doc.querySelector('[data-qtm-visual-block]'); remaining.dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true })); assert(remaining.querySelector('video').controls); d.window.close();
 }
 console.log('PASS ' + cases + ' actual review/testimonial/slider/UGC renders: every original setting type/option and 12 presets; neutral new and preserved saved copy; sparse/action/image/rating/video/product-only states; safe URLs/alt and named ratings; one native wrapper; shared measured RTL navigation/persistent pause/deferred player/visibility/mutation/editor lifecycle; per-item UGC controls/reduced-motion/editor policy. Native browser/platform/AT/provider acceptance remains queued.');
})().catch(e => { console.error(e); process.exitCode = 1; });
