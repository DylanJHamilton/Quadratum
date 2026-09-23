const assert = require('node:assert/strict');
const f = require('./support.cjs');
let cases = 0;
(async () => {
  for (const layout of ['classic', 'cards', 'sidebar']) {
    const d = f.dom(await f.host('dashboard', { settings: { layout_style: layout, subheading: '', show_customer_name: true } }));
    const doc = d.window.document;
    assert.match(doc.querySelector('.account-main-account-dashboard__subheading').textContent, /First <safe>/);
    assert(doc.querySelector('a[href="/fr/account?view=orders"]'));
    assert.equal(doc.querySelector('span > p'), null, 'native formatted address has a block container');
    assert.equal(doc.querySelector('[aria-current]').getAttribute('href'), '/fr/account');
    assert.equal(doc.querySelectorAll('[aria-current]').length, 1);
    assert.equal(doc.querySelector('[aria-label="Account order pages"]'), null, 'recent preview does not compete with full-history pagination');
    d.window.close(); cases++;
  }
  for (const layout of ['horizontal', 'sidebar', 'compact']) {
    const html = await f.engine.parseAndRender(f.read('snippets/account-main-account-nav.liquid'), {
      layout, active: 'orders', section: { settings: { orders_label: 'Orders <safe>' } }, show_tracking: true
    }, { globals: { routes: f.routes } });
    const d = f.dom(html), doc = d.window.document;
    assert.equal(doc.querySelectorAll('ul').length, 1);
    assert.equal(doc.querySelector('[aria-current]').getAttribute('href'), '/fr/account?view=orders');
    assert.match(doc.querySelector('[aria-current]').textContent, /Orders <safe>/);
    assert.equal(doc.querySelectorAll('a').length, 4);
    assert.equal(Boolean(doc.querySelector('details')), layout === 'compact');
    d.window.close(); cases++;
  }
  const guest = f.dom(await f.host('dashboard', { globals: { customer: null } }));
  assert.equal(guest.window.document.querySelector('nav, table'), null);
  assert(guest.window.document.querySelector('a[href="/fr/account/login"]'));
  guest.window.close(); cases++;
  assert.equal(f.read('templates/customers/account.orders.liquid').trim(), "{% section 'account-main-account-orders' %}");
  console.log('PASS ' + cases + ' dashboard/navigation scenarios plus alternate orders template wiring.');
})().catch(error => { console.error(error); process.exit(1); });
