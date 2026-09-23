// Local section fixtures, not a Shopify session. All requests are intercepted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const axe = require('axe-core');
const f = require('./support.cjs');
const auth = require('../phase4/support/forms.cjs');

// Approximate the named Shopify date format for pixels; native localization is live QA.
f.engine.registerFilter('date', (value, format) => {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return '';
  return format === '%s' ? String(Math.floor(date.getTime() / 1000)) :
    new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(date);
});

const names = ['login', 'register', 'activate', 'reset-password', 'dashboard', 'orders', 'order', 'addresses', 'order-tracking'];
const settings = Object.assign({}, ...JSON.parse(f.read('config/settings_schema.json')).map(group => f.defaults(group.settings)));
const out = process.env.ACCOUNT_BROWSER_OUTPUT || '/tmp/quadratum-phase5-browser';
fs.mkdirSync(out, { recursive: true });

async function fixture(name, stress, direction) {
  const long = 'LongCustomerAddressAndOrderText'.repeat(8);
  const address = { ...f.address, address1: stress ? long : f.address.address1 };
  const order = { ...f.order, financial_status: stress ? 'partially_paid' : 'paid', name: stress ? '#' + long : '#100', line_items: [{ ...f.order.line_items[0], title: stress ? long : 'Example product' }] };
  const customer = { ...f.customer, first_name: stress ? long : 'Taylor', email: stress ? long + '@example.test' : 'taylor@example.test', orders: [order], addresses: [address], default_address: address };
  const globalSettings = { ...settings, text_base: '#111111' };
  const sectionSettings = { card_background: stress ? '#111827' : '#ffffff', provider_url: '/apps/tracking', show_tracking_number_field: true };
  const globals = { settings: globalSettings, routes: { ...f.routes, account_register_url: '/fr/account/register' }, customer, order, request: { design_mode: false } };
  let html;
  if (['login', 'register', 'activate', 'reset-password'].includes(name)) {
    html = await auth.host('account-main-account-' + name, { settings: sectionSettings, globals: { ...globals, customer: null, form: stress ? { errors: { email: 'Invalid email' } } : {} } });
  } else {
    html = await f.host(name, { settings: sectionSettings, globals });
  }
  const tokens = await f.engine.parseAndRender(f.read('snippets/global-theme-vars.liquid'), { settings: globalSettings });
  const css = await f.engine.parseAndRender(f.read('assets/q-base.css.liquid'), { settings: globalSettings });
  return '<!doctype html><html lang="en" dir="' + direction + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Account fixture</title>' +
    '<link rel="stylesheet" href="/assets/theme.css">' + tokens + '<style>' + css + '</style><link rel="stylesheet" href="/assets/styles.css">' +
    '<style>body{margin:0} :root{--font-body:Arial,sans-serif;--font-head:Arial,sans-serif}</style></head><body><main>' + html + '</main></body></html>';
}

async function loadFixture(page, html) {
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith('/assets/')) {
      const asset = path.join('assets', path.basename(url.pathname));
      if (fs.existsSync(asset)) return route.fulfill({ contentType: asset.endsWith('.css') ? 'text/css' : 'application/javascript', body: fs.readFileSync(asset) });
    }
    if (url.pathname === '/fixture') return route.fulfill({ contentType: 'text/html', body: html });
    return route.abort();
  });
  await page.goto('https://shop.test/fixture', { waitUntil: 'load' });
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
  const results = [];
  try {
    for (const name of names) for (const stress of [false, true]) for (const [width, direction] of [[320, 'ltr'], [768, 'rtl'], [1440, 'ltr']]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const html = await fixture(name, stress, direction);
      await loadFixture(page, html);
      if (name === 'addresses') {
        const opener = page.locator('[data-qtm-addresses-add-toggle]').first();
        await opener.focus(); await page.keyboard.press('Enter');
        assert.equal(await page.locator('[name="address[first_name]"]').first().evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Escape');
        assert.equal(await opener.evaluate(el => el === document.activeElement), true);
        await opener.click();
      }
      if (name === 'login' && !stress) {
        const trigger = page.locator('[data-account-main-account-login-recover-trigger]');
        if (await trigger.count()) {
          await trigger.focus(); await page.keyboard.press('Enter');
          assert.equal(await page.locator('[name="email"]').evaluate(el => el === document.activeElement), true);
        }
      }
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })));
      const overflow = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
      const record = { name, stress, width, direction, overflow, errors, violations };
      results.push(record);
      if ((width === 320 && stress) || (width === 1440 && !stress && ['dashboard', 'order', 'order-tracking'].includes(name))) {
        await page.screenshot({ path: path.join(out, name + '-' + width + (stress ? '-stress' : '') + '.png'), fullPage: true });
      }
      await page.close();
    }
    for (const name of names) {
      const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
      await loadFixture(page, await fixture(name, false, 'ltr'));
      const native = await page.evaluate(() => ({
        forms: [...document.forms].filter(form => form.getClientRects().length).length,
        enhancements: [...document.querySelectorAll('button[type="button"][aria-pressed], [data-qtm-orders-controls]')].filter(el => el.getClientRects().length).length,
        overflow: { viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }
      }));
      const expected = { login: 2, register: 1, activate: 1, 'reset-password': 1, dashboard: 0, orders: 0, order: 0, addresses: 3, 'order-tracking': 0 }[name];
      assert.equal(native.forms, expected, name + ': native forms remain available without JS');
      assert.equal(native.enhancements, 0, name + ': inert enhancements remain hidden');
      results.push({ name, javaScript: false, width: 320, direction: 'ltr', overflow: native.overflow, errors: [], violations: [], nativeForms: native.forms });
      await page.close();
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2) + '\n');
  const failures = results.filter(r => r.errors.length || r.violations.length || Math.max(r.overflow.document, r.overflow.body) > r.width + 1);
  if (failures.length) console.error(JSON.stringify(failures, null, 2));
  assert.equal(failures.length, 0, 'browser accessibility, runtime, and document-overflow gates');
  console.log('PASS ' + results.length + ' local Chromium fixtures: 54 enhanced cases across nine account sections at 320/768/1440px, LTR/RTL, default/dark cards, long data, axe WCAG A/AA, keyboard focus, runtime and document overflow; nine no-JS native-form cases. Shopify processing, redirects, actual pagination and manual AT remain owner live QA.');
})().catch(error => { console.error(error); process.exitCode = 1; });
