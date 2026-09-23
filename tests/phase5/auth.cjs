const assert = require('node:assert/strict');
const f = require('../phase4/support/forms.cjs');
const routes = { account_url: '/fr/account', account_logout_url: '/fr/account/logout' };
let cases = 0;

(async () => {
  for (const name of ['login', 'register', 'activate', 'reset-password']) {
    const html = await f.host('account-main-account-' + name, {
      settings: { show_password_toggle: false },
      globals: { routes, form: { errors: { email: 'invalid' }, email: 'a+<tag>"@example.test' } }
    });
    const d = f.dom(html), doc = d.window.document;
    assert(doc.querySelector('script[src$="' + name + '.js"]'), 'error focus works without password toggles');
    assert.equal(doc.querySelector('input[type="password"]').value, '', 'never echo secrets');
    if (name === 'login' || name === 'register') {
      assert.equal(doc.querySelector('[name="customer[email]"]').value, 'a+<tag>"@example.test');
    }
    if (name === 'login') {
      assert.equal(doc.querySelector('[name="email"]').value, 'a+<tag>"@example.test');
      assert.equal(doc.querySelector('[name="remember_me"]'), null);
    }
    f.boot(d.window, ['account-main-account-' + name + '.js']);
    assert.equal(doc.activeElement.getAttribute('role'), 'alert');
    assert.equal(doc.querySelector('[aria-pressed]'), null);
    d.window.close();
    cases++;
  }

  for (const name of ['login', 'register']) {
    const d = f.dom(await f.host('account-main-account-' + name, { globals: { routes, customer: { name: '<unsafe>' } } }));
    assert.equal(d.window.document.querySelector('form'), null);
    assert(d.window.document.querySelector('a[href="/fr/account"]'));
    assert(d.window.document.querySelector('a[href="/fr/account/logout"]'));
    d.window.close();
    cases++;
  }

  for (const mode of ['inline', 'toggle', 'panel']) {
    const d = f.dom(await f.host('account-main-account-login', { settings: { recover_display: mode } }));
    const w = d.window, doc = w.document;
    f.boot(w, ['account-main-account-login.js']);
    w.history.replaceState(null, '', '#AccountRecovery-one');
    w.dispatchEvent(new w.HashChangeEvent('hashchange'));
    const recovery = doc.getElementById('AccountRecovery-one');
    assert(!recovery.hidden);
    assert.equal(doc.activeElement.name, 'email');
    const root = doc.querySelector('[data-account-main-account-login]');
    root.dispatchEvent(new w.Event('shopify:section:unload', { bubbles: true }));
    doc.activeElement.blur();
    w.dispatchEvent(new w.HashChangeEvent('hashchange'));
    assert.equal(doc.activeElement, doc.body, 'hash listener disposed on unload');
    root.dispatchEvent(new w.Event('shopify:section:load', { bubbles: true }));
    assert.equal(doc.activeElement.name, 'email');
    w.close();
    cases++;
  }

  const types = { login: 'customer_login', register: 'create_customer', activate: 'activate_customer_password', 'reset-password': 'reset_customer_password' };
  for (const [name, type] of Object.entries(types)) {
    const source = f.unpack('account-main-account-' + name).liquid;
    assert(source.includes("{% form '" + type + "'"), 'native transport retained');
    assert.doesNotMatch(f.read('assets/account-main-account-' + name + '.js'), /fetch\(|localStorage|sessionStorage|preventDefault\(/);
    if (name === 'activate') assert.match(source, /name="decline" value="1" formnovalidate/);
    cases++;
  }
  console.log('PASS ' + cases + ' Phase 5 auth scenarios: error focus with toggles disabled, escaped retained email, signed-in state, recovery hash changes/disposal, native transport and secret non-persistence.');
})().catch(error => { console.error(error); process.exit(1); });
