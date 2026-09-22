const assert = require('node:assert/strict');
const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const postcss = require('postcss');
const f = require('./support/commerce.cjs');
const read = path => process.env.B9_BASELINE_REF ? execFileSync('git', ['show', process.env.B9_BASELINE_REF + ':' + path], {encoding: 'utf8'}) : fs.readFileSync(path, 'utf8');

(async () => {
  const css = postcss.parse(read('assets/styles.css'));
  let headingTransform = false, buttonTransform = false;
  css.walkRules(rule => {
    if (rule.selector.trim() === 'a:hover') rule.walkDecls('color', () => assert.fail('Global hover must not replace a component link/button foreground'));
    if (rule.selector.split(',').map(s => s.trim()).includes('h1')) rule.walkDecls('text-transform', d => {if (d.value.includes('--tt-head')) headingTransform = true;});
    if (rule.selector === '.qtm-button') rule.walkDecls('text-transform', d => {if (d.value.includes('--tt-btn')) buttonTransform = true;});
  });
  assert(headingTransform && buttonTransform, 'Existing uppercase settings must reach their global stylesheet consumers');
  for (const file of ['assets/styles.css', 'assets/tailwind.css', 'assets/theme.css', 'assets/section-slideshow.css']) postcss.parse(read(file));
  assert(!read('templates/page.playground.liquid').includes("'theme.css' | asset_url"), 'Normal layout is sole compiled CSS owner on the playground template');
  assert.match(read('layout/theme.liquid'), /<script src="{{ 'q-quick-view\.js' \| asset_url }}" defer><\/script>/, 'Quick View loads deferred after its host');
  const source = read('sections/slideshow-banner.liquid');
  const schema = JSON.parse(source.split('{% schema %}')[1].split('{% endschema %}')[0]);
  const blockType = schema.blocks.find(b => b.type === 'slide');
  const desktop = {src: '/desktop.jpg', width: 1600, height: 900};
  const mobile = {src: '/mobile.jpg', width: 600, height: 800};
  let renders = 0;
  for (const layout of ['split', 'overlay']) for (const mode of ['both', 'mobile', 'empty']) {
    const context = {section: {id: layout + mode, settings: {...f.defaults(schema.settings), layout_mode: layout},
      blocks: [{id: 'slide-' + mode, type: 'slide', settings: {...f.defaults(blockType.settings),
        background_image: mode === 'both' ? desktop : null, mobile_image: mode !== 'empty' ? mobile : null}}]},
      settings: {}, shop: {url: 'https://shop.test'}, request: {design_mode: true}};
    const html = await f.engine.parseAndRender(source.split('{% schema %}')[0], context);
    const dom = f.dom(html), imgs = [...dom.window.document.querySelectorAll('img.qsl__img')];
    assert.equal(imgs.length, mode === 'empty' ? 0 : 1);
    for (const img of imgs) {
      const selected = mode === 'both' ? desktop : mobile;
      assert.equal(img.getAttribute('width'), String(selected.width));
      assert.equal(img.getAttribute('height'), String(selected.height));
      assert.equal(img.getAttribute('loading'), 'eager');
    }
    dom.window.close(); renders++;
  }
  console.log('PASS global foreground/uppercase ownership, stylesheet syntax, one layout CSS owner, deferred Quick View and ' + renders + ' actual slideshow media renders with native-dimension fixtures. Browser loading/cascade and Shopify image drops remain live checks.');
})().catch(error => {console.error(error); process.exitCode = 1;});
