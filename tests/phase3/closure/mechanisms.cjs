const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const { Liquid } = require('liquidjs');
const read = file => fs.readFileSync(file, 'utf8');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
function dom(html) {
  const d = new JSDOM(html, { url: 'https://example.test/products/gift-card', runScripts: 'outside-only', pretendToBeVisual: true });
  d.window.matchMedia = () => ({ matches: false });
  d.window.HTMLElement.prototype.scrollIntoView = () => {};
  return d;
}
(async () => {
  const data = [
    { id: 10, price: '$10.00', compare: '$0.00', available: true, onSale: false },
    { id: 100, price: '$100.00', compare: '$125.00', available: true, onSale: true },
    { id: 101, price: '$100.00', compare: '$0.00', available: false, onSale: false }
  ];
  const d = dom(`<div class="shopify-section"><section data-product-purchase-sync><div data-purchase-price><span data-purchase-current></span><s data-purchase-compare></s></div><span data-purchase-sale></span><span data-purchase-availability></span><form action="/cart/add"><select name="id">${data.map(v => `<option value="${v.id}">${v.id}</option>`).join('')}</select><button name="add"></button></form></section><script data-product-purchase-data type="application/json">${JSON.stringify(data)}</script></div>`);
  d.window.eval(read('assets/product-purchase-sync.js'));
  d.window.eval(read('assets/product-purchase-sync.js'));
  d.window.document.dispatchEvent(new d.window.Event('DOMContentLoaded'));
  const q = s => d.window.document.querySelector(s);
  const select = q('select');
  select.value = '100'; select.dispatchEvent(new d.window.Event('change', { bubbles: true }));
  assert.equal(q('[data-purchase-current]').textContent, '$100.00');
  assert.equal(q('[data-purchase-compare]').hidden, false);
  assert.equal(new d.window.FormData(q('form')).get('id'), '100');
  assert.equal(d.window.location.search, '?variant=100');
  assert.equal(d.window.history.length, 2, 'duplicate script must not duplicate history');
  select.value = '101'; select.dispatchEvent(new d.window.Event('change', { bubbles: true }));
  assert.equal(q('[data-purchase-current]').textContent, '$100.00');
  assert(q('button').disabled); assert(q('[data-purchase-compare]').hidden);
  d.window.history.replaceState({}, '', '/products/gift-card?variant=10');
  d.window.dispatchEvent(new d.window.PopStateEvent('popstate'));
  assert.equal(select.value, '10'); assert.equal(q('[data-purchase-current]').textContent, '$10.00');
  assert(!q('button').disabled); d.window.close();

  const engine = new Liquid();
  const product = { requires_selling_plan: true, selling_plan_groups: [{ name: 'Subscription', selling_plans: [{ id: 45, name: 'Monthly' }] }] };
  let html = await engine.parseAndRender(read('snippets/product-selling-plans.liquid'), { product, id: 'qa' });
  const plans = dom('<form>'+html+'</form>');
  assert.equal(new plans.window.FormData(plans.window.document.querySelector('form')).get('selling_plan'), '45');
  assert(!plans.window.document.querySelector('option[value=""]'));
  plans.window.close();
  product.requires_selling_plan = false;
  html = await engine.parseAndRender(read('snippets/product-selling-plans.liquid'), { product, id: 'qa' });
  assert(html.includes('value=""'));

  const geom = read('assets/styles.css').match(/(input:not\([^{}]+),\s*select,\s*textarea\s*\{\s*width: 100%;/)[1];
  const controls = dom('<form></form>');
  for (const type of ['checkbox','radio','hidden','submit','button','reset','image','range','color']) {
    const el = controls.window.document.createElement('input'); el.type=type;
    assert(!el.matches(geom), `${type} must not receive text field geometry`);
  }
  for (const type of ['text','email','search','tel','url','number','password']) {
    const el = controls.window.document.createElement('input'); el.type=type; assert(el.matches(geom));
  }
  controls.window.close();

  const p = dom('<div data-qtm-predictive-search data-products-enabled="true" data-min-chars="1" data-debounce="1"><input data-qtm-predictive-input><div id="results" data-qtm-predictive-panel hidden></div></div>');
  let calls = 0;
  p.window.fetch = async () => { calls++; return { ok: true, json: async () => ({ resources: { results: { products: [{ title:'Gift card', url:'/products/gift-card', price:1000 }] } } }) }; };
  p.window.eval(read('assets/predictive-search.js'));
  p.window.document.dispatchEvent(new p.window.Event('DOMContentLoaded'));
  const input = p.window.document.querySelector('input'); const panel = p.window.document.querySelector('#results');
  input.value='Gift'; input.dispatchEvent(new p.window.Event('input')); await pause(30);
  assert.equal(calls,1); assert(!panel.hidden); assert(panel.textContent.includes('Gift card')); assert.equal(input.getAttribute('aria-expanded'),'true');
  input.dispatchEvent(new p.window.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
  assert(input.getAttribute('aria-activedescendant'));
  input.dispatchEvent(new p.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  assert(panel.hidden); assert.equal(input.getAttribute('aria-expanded'),'false');
  input.value=''; input.dispatchEvent(new p.window.Event('input')); assert(panel.hidden);
  p.window.close();
  console.log('PASS: variant price, equal price, compare-at, sold-out, form ID, URL/back state, duplicate initialization, selling-plan payload, input geometry, predictive request/results/keyboard/Escape/empty query. Mechanism tests, not live Shopify certification.');
})().catch(e => { console.error(e); process.exitCode=1; });
