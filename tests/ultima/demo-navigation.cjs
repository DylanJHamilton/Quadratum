const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '../..');
function fixture(file, themeId, dataset, designMode = false) {
  const dom = new JSDOM(`<!doctype html><body>
    <aside class="quadratum-demo-bar"></aside>
    <a id="back" href="/?preview_theme_id=146655674452" target="_self">Back</a>
    <a id="product" href="/products/example?variant=123#details">Product</a>
    <a id="checkout" href="/checkout">Checkout</a>
    <a id="external" href="https://themes.shopify.com/">Theme Store</a>
    <a id="anchor" href="#details">Details</a>
    <script ${dataset}="${themeId}"></script></body>`, {
    url: 'https://quadratum-theme.myshopify.com/collections/all?sort_by=price-ascending#grid', runScripts: 'outside-only'
  });
  const { window } = dom;
  const observers = [];
  const Observer = window.MutationObserver;
  window.MutationObserver = class extends Observer {
    constructor(callback) { super(callback); observers.push(this); }
  };
  dom.dispose = () => { observers.forEach(observer => observer.disconnect()); window.close(); };
  window.Shopify = { designMode };
  Object.defineProperty(window.document, 'currentScript', { value: window.document.querySelector('script') });
  window.eval(fs.readFileSync(path.join(root, file), 'utf8'));
  return dom;
}
for (const [file, id, attr] of [
  ['demos/navigation/quadratum-demo-bar.js', '146519392340', 'data-demo-theme'],
  ['assets/showroom-preview.js', '146655674452', 'data-showroom-theme']
]) {
  const dom = fixture(file, id, attr), { window: w } = dom;
  assert.equal(new URL(w.location.href).searchParams.get('preview_theme_id'), id);
  assert.equal(new URL(w.location.href).searchParams.get('sort_by'), 'price-ascending');
  assert.equal(w.location.hash, '#grid');
  const product = new URL(w.document.getElementById('product').href);
  assert.equal(product.searchParams.get('variant'), '123');
  assert.equal(product.searchParams.get('preview_theme_id'), id);
  assert.equal(product.hash, '#details');
  assert.equal(w.document.getElementById('checkout').getAttribute('href'), '/checkout');
  assert.equal(w.document.getElementById('external').href, 'https://themes.shopify.com/');
  assert.equal(w.document.getElementById('anchor').getAttribute('href'), '#details');
  assert.equal(new URL(w.document.getElementById('back').href).searchParams.get('preview_theme_id'), '146655674452');
  assert.equal(w.document.getElementById('back').target, '_self');
  w.history.replaceState({ existing: true }, '', '/search?q=dock');
  w.dispatchEvent(new w.PageTransitionEvent('pageshow'));
  assert.equal(new URL(w.location.href).searchParams.get('preview_theme_id'), id);
  assert.equal(new URL(w.location.href).searchParams.get('q'), 'dock');
  assert.equal(w.history.state.existing, true);
  dom.dispose();
  const editor = fixture(file, id, attr, true);
  assert.equal(new URL(editor.window.location.href).searchParams.has('preview_theme_id'), false);
  editor.dispose();
}
console.log('PASS demo and showroom navigation: tab URL pinning, query/hash/state preservation, explicit return, checkout/external exclusions, editor exemption.');
