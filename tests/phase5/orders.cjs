const assert = require('node:assert/strict');
const f = require('./support.cjs');
let cases = 0;
(async () => {
  const statuses = ['paid', 'unpaid', 'partially_paid', 'refunded', 'pending'];
  const orders = statuses.map((status, i) => ({ ...f.order, name: '#10' + i, financial_status: status, total_price: 1000 + i * 100, created_at: '2026-09-' + (20 - i), cancelled: i === 4 }));
  const d = f.dom(await f.host('orders', { globals: { customer: { ...f.customer, orders } } }));
  const w = d.window, doc = w.document;
  const original = [...doc.querySelectorAll('tbody tr')];
  assert.equal(doc.querySelector('[aria-current]').getAttribute('href'), '/fr/account?view=orders');
  assert.match(doc.querySelector('nav[aria-label="Order pagination"] a').href, /view=orders/);
  f.boot(w, ['account-main-account-orders.js']);
  doc.querySelector('[data-qtm-account-orders-filter="paid"]').click();
  assert.equal(original.filter(item => !item.hidden).length, 1, 'paid does not match unpaid or partially-paid');
  const input = doc.querySelector('input[type="search"]');
  input.value = '#104'; input.dispatchEvent(new w.Event('input'));
  assert.equal(original.filter(item => !item.hidden).length, 0, 'filter and search intersect');
  doc.querySelector('[data-qtm-account-orders-filter="cancelled"]').click();
  assert.equal(original.filter(item => !item.hidden).length, 1);
  assert.match(doc.querySelector('[data-qtm-account-orders-count]').textContent, /1 of 5.*on this page/);
  const sort = doc.querySelector('select'); sort.value = 'highest'; sort.dispatchEvent(new w.Event('change'));
  doc.querySelector('[data-qtm-account-orders]').dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true }));
  assert.deepEqual([...doc.querySelectorAll('tbody tr')], original, 'unload restores server order');
  assert(original.every(item => !item.hidden));
  w.close(); cases++;

  for (const customer of [null, { ...f.customer, orders: [] }]) {
    const page = f.dom(await f.host('orders', { globals: { customer } }));
    assert.equal(page.window.document.querySelector('table'), null);
    assert(page.window.document.querySelector('a'));
    page.window.close(); cases++;
  }
  for (const url of ['javascript:alert(1)', 'data:text/html,bad', '//untrusted.test', 'https://user:password@carrier.test', 'https://carrier.test/\ntrack', '/\\outside.test', 'https://carrier.test/track?x=1&y=2']) {
    const line = { ...f.order.line_items[0], fulfillment: { tracking_numbers: ['one <safe>', 'two'], tracking_url: url } };
    const page = f.dom(await f.host('order', { globals: { order: { ...f.order, line_items: [line] } } }));
    const doc = page.window.document;
    assert.equal(doc.querySelectorAll('ul[aria-label="Tracking numbers"] li').length, 2);
    const link = doc.querySelector('.qtmAccountOrder__fulfillment a');
    assert.equal(Boolean(link), url === 'https://carrier.test/track?x=1&y=2');
    assert.equal(doc.querySelector('.qtmAccountOrder__backLink').getAttribute('href'), '/fr/account?view=orders');
    page.window.close(); cases++;
  }
  const missing = f.dom(await f.host('order', { globals: { order: null } }));
  assert.equal(missing.window.document.querySelector('a[href="/fr/account/login"]'), null);
  assert(missing.window.document.querySelector('a[href="/fr/account?view=orders"]'));
  missing.window.close(); cases++;

  const invalid = ['', 'javascript:bad()', '//evil.test', 'http://insecure.test', 'https://user:pass@provider.test', 'https://{order}.test/path', 'https://provider.test/{unknown}', 'https://provider.test/\u0001path', '/\\evil.test'];
  const valid = ['https://provider.test/track/{order}?email={email}#keep', '/apps/track?store=one#keep'];
  for (const provider of [...invalid, ...valid]) {
    const page = f.dom(await f.host('order-tracking', { settings: { provider_url: provider, support_heading: '' }, globals: { customer: null } }));
    const w = page.window, doc = w.document, root = doc.querySelector('[data-qtm-order-tracking]'), form = root.querySelector('form');
    assert(!doc.querySelector('a[href$="logout"]'), 'guests do not get authenticated navigation');
    for (const element of doc.querySelectorAll('[aria-labelledby]')) assert(doc.getElementById(element.getAttribute('aria-labelledby')));
    assert(form.hidden, 'no-JS does not expose an inert lookup');
    const calls = [], location = { origin: 'https://shop.test', assign: url => calls.push(url) };
    w.Function('location', f.read('assets/account-main-order-tracking.js'))(location);
    doc.dispatchEvent(new w.Event('DOMContentLoaded'));
    assert.equal(form.hidden, invalid.includes(provider));
    if (valid.includes(provider)) {
      form.elements.order_number.value = '   '; form.elements.email.value = 'a+b@example.test';
      form.dispatchEvent(new w.Event('submit', { cancelable: true }));
      assert.equal(calls.length, 0); assert.equal(doc.activeElement, form.elements.order_number);
      form.elements.order_number.value = '#A & B'; form.elements.tracking_number.value = 'T/?#';
      form.dispatchEvent(new w.Event('submit', { cancelable: true }));
      assert.equal(calls.length, 1);
      const url = new URL(calls[0]); assert.equal(url.searchParams.get('email'), 'a+b@example.test');
      assert.equal(url.hash, '#keep'); assert.equal(url.searchParams.get('tracking'), 'T/?#');
      assert.equal(url.origin, provider.startsWith('/') ? location.origin : 'https://provider.test');
      root.dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true }));
      form.dispatchEvent(new w.Event('submit', { cancelable: true }));
      assert.equal(calls.length, 1, 'unload stops redirect handler');
    }
    w.close(); cases++;
  }
  console.log('PASS ' + cases + ' Phase 5 order/history/tracking scenarios: pagination destination, exact filters, restore order, empty/guest states, multiple tracking numbers, unsafe native links, encoded redirects and URL origin validation.');
})().catch(error => { console.error(error); process.exit(1); });
