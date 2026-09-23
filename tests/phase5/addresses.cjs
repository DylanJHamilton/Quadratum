const assert = require('node:assert/strict');
const f = require('./support.cjs');
let cases = 0;
(async () => {
  const addresses = [f.address, { ...f.address, id: 8, first_name: '<other>', country: 'France', province: '' }];
  const customer = { ...f.customer, addresses, new_address: { ...f.address, id: undefined } };
  const d = f.dom(await f.host('addresses', { globals: { customer } }));
  const w = d.window, doc = w.document;
  assert.equal(doc.querySelectorAll('.qtmAccountAddresses__badge').length, 1);
  const defaultForm = doc.querySelector('.qtmAccountAddresses__setDefaultForm');
  const values = new w.FormData(defaultForm);
  assert.equal(values.get('address[default]'), '1');
  assert.equal(values.get('address[first_name]'), '<other>');
  assert.equal(values.get('address[country]'), 'France');
  assert.equal(doc.querySelectorAll('[data-qtm-address-delete-form]').length, 2);
  for (const form of doc.querySelectorAll('[data-qtm-address-delete-form]')) {
    assert.equal(form.method, 'post');
    assert.match(form.getAttribute('action'), /^\/fr\/account\/addresses\/[78]$/);
    assert.equal(new w.FormData(form).get('_method'), 'delete');
  }
  assert.equal(doc.querySelectorAll('[data-qtm-addresses-edit-panel][hidden]').length, 0, 'native edit forms are available without JS');
  f.boot(w, ['account-main-account-addresses.js']);
  const root = doc.querySelector('[data-qtm-account-addresses]');
  const addButton = root.querySelector('[data-qtm-addresses-add-toggle]');
  addButton.click();
  const panel = doc.querySelector('[data-qtm-addresses-add-panel]');
  const country = panel.querySelector('[name="address[country]"]');
  const province = panel.querySelector('select[name="address[province]"]');
  assert.equal(province.value, 'Ontario');
  province.value = 'Quebec'; province.dispatchEvent(new w.Event('change'));
  country.value = 'France'; country.dispatchEvent(new w.Event('change'));
  assert(!new w.FormData(country.form).has('address[province]'));
  country.value = 'Unknown'; country.dispatchEvent(new w.Event('change'));
  assert.equal(panel.querySelector('[data-qtm-address-province]').value, '', 'country changes cannot retain a stale province');
  country.value = 'Canada'; country.dispatchEvent(new w.Event('change'));
  assert.equal(province.value, '', 'no unrequested first province selected');
  country.form.reset(); await f.drain();
  assert.equal(country.value, 'Canada'); assert.equal(province.value, 'Ontario');
  panel.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert(panel.hidden); assert.equal(doc.activeElement, addButton);
  const editButton = root.querySelector('[data-qtm-addresses-edit-toggle]'); editButton.click();
  const edit = doc.getElementById(editButton.getAttribute('aria-controls'));
  assert.equal(doc.activeElement.name, 'address[first_name]');
  edit.querySelector('[data-qtm-addresses-edit-close]').click();
  assert.equal(doc.activeElement, editButton);
  let calls = 0; w.confirm = () => { calls++; return false; };
  const deletion = root.querySelector('[data-qtm-address-delete-form]');
  const event = new w.Event('submit', { bubbles: true, cancelable: true }); deletion.dispatchEvent(event);
  assert(event.defaultPrevented); assert.equal(calls, 1);
  root.dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true }));
  assert(!panel.hidden); assert.equal(panel.querySelector('select[name="address[province]"]'), null);
  root.dispatchEvent(new w.Event('shopify:section:load', { bubbles: true }));
  deletion.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })); assert.equal(calls, 2);
  w.close(); cases += 9;

  const errorCustomer = { ...f.customer, addresses: [{ ...f.address, errors: { province: 'Invalid' } }] };
  const errors = f.dom(await f.host('addresses', { globals: { customer: errorCustomer } }));
  f.boot(errors.window, ['account-main-account-addresses.js']);
  const errorDoc = errors.window.document;
  const errorPanel = errorDoc.querySelector('[data-qtm-addresses-edit-panel]');
  assert(!errorPanel.hidden);
  assert.equal(errorDoc.activeElement.getAttribute('role'), 'alert');
  const enhanced = errorPanel.querySelector('select[name="address[province]"]');
  assert(errorDoc.getElementById(enhanced.getAttribute('aria-describedby')));
  for (const label of errorDoc.querySelectorAll('label[for]')) assert(errorDoc.getElementById(label.htmlFor));
  assert.equal(new Set([...errorDoc.querySelectorAll('[id]')].map(el => el.id)).size, errorDoc.querySelectorAll('[id]').length);
  errors.window.close(); cases += 3;

  for (const customer of [null, { ...f.customer, addresses: [], default_address: null }]) {
    const page = f.dom(await f.host('addresses', { globals: { customer } }));
    if (!customer) assert.equal(page.window.document.querySelector('form'), null);
    else assert(page.window.document.querySelector('[data-qtm-addresses-add-panel] form'));
    page.window.close(); cases++;
  }
  assert.doesNotMatch(f.read('sections/account-main-account-addresses.liquid'), /form\.posted_successfully/,
    'customer_address posted_successfully is always true; do not invent success banners');
  console.log('PASS ' + cases + ' Phase 5 address scenarios: native CRUD/default contracts, resets, country/province transitions, no-JS forms, keyboard focus, validation associations and unload/remount.');
})().catch(error => { console.error(error); process.exit(1); });
