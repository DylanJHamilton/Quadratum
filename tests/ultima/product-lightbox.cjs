const assert = require('node:assert/strict');
const fs = require('node:fs');
const f = require('../phase4/support/commerce.cjs');
(async () => {
  const css = fs.readFileSync('assets/product-lightbox.css', 'utf8');
  assert(/button\[hidden\]\s*\{\s*display:\s*none/.test(css), 'unsupported controls remain visually hidden');
  assert(/data-zoomed="false"[^}]+touch-action:\s*pan-y/.test(css), 'horizontal touch gestures reach the image switcher');
  for (const section of ['main-product-simple', 'main-product-modern-variant']) {
    const d = f.dom(await f.render(section, { settings: {gallery_layout:'thumbnails'} }));
    const w=d.window, root=w.document.querySelector('[data-product-gallery]');
    f.boot(w, ['product-purchase-sync.js','product-gallery-options.js']);
    const q=s=>root.querySelector(s), opener=q('[data-qtm-open-modal],[data-qtm-open-main]');
    opener.click(); assert(q('dialog').open); assert(q('[data-qtm-image-count]').textContent.includes('/'));
    assert(q('[data-qtm-fullscreen]').hidden, 'unsupported fullscreen stays hidden');
    q('[data-qtm-next]').click(); const count=q('[data-qtm-image-count]').textContent;
    q('[data-qtm-zoom]').click(); assert.equal(q('dialog').dataset.zoomed,'true');
    assert.equal(q('[data-qtm-zoom]').getAttribute('aria-pressed'),'true');
    q('dialog').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));
    assert.equal(q('[data-qtm-image-count]').textContent,count,'zoomed image keeps keyboard scrolling');
    q('[data-qtm-next]').click(); assert.equal(q('dialog').dataset.zoomed,'false');
    const before=q('[data-qtm-image-count]').textContent;
    for (const [type,x] of [['pointerdown',200],['pointerup',50]]) {
      const event=new w.Event(type,{bubbles:true}); Object.assign(event,{pointerType:'touch',clientX:x,clientY:100});q('dialog img').dispatchEvent(event);
    }
    assert.notEqual(q('[data-qtm-image-count]').textContent,before,'touch swipe advances gallery');
    q('[data-qtm-close-modal]').click(); assert(!q('dialog').open);
    assert.equal(w.document.activeElement,opener,'focus returns to opener');
    opener.click();root.dispatchEvent(new w.CustomEvent('shopify:section:unload',{bubbles:true}));assert(!q('dialog').open);
    root.dispatchEvent(new w.CustomEvent('shopify:section:load',{bubbles:true}));opener.click();assert(q('dialog').open);d.window.close();
  }
  console.log('PASS Lightbox: Simple/Modern open, close, focus restoration, counters, navigation, zoom reset, keyboard pan, touch swipe, unsupported fullscreen, editor reload.');
})().catch(error=>{console.error(error);process.exitCode=1});
