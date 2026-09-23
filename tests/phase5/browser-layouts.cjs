// Local browser fixtures use actual account Liquid/CSS/JS and documented Shopify adapters.
// No store, account, customer mutation or external provider is contacted.
const fs = require('node:fs');
const { chromium } = require('playwright');
const f = require('./support.cjs');
const auth = require('../phase4/support/forms.cjs');
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const output = process.env.ACCOUNT_BROWSER_OUTPUT || 'docs/phase5/validation/final/browser.json';
const names = ['login', 'register', 'activate', 'reset-password', 'dashboard', 'orders', 'order', 'order-tracking', 'addresses'];
const authNames = names.slice(0, 4);
const settings = Object.assign({}, ...JSON.parse(f.read('config/settings_schema.json')).map(group => f.defaults(group.settings)));
const results = { scope: 'Local Chromium with Shopify Liquid/form/pagination adapters; not live Shopify', cases: [], failures: [], accessibility: [], keyboard: [] };
function visibleOverflow() {
  return [...document.querySelectorAll('main *')].filter(element => {
    const box = element.getBoundingClientRect();
    if (!element.checkVisibility() || box.width <= 1 || box.height <= 1 || (box.right <= innerWidth + 1 && box.left >= -1)) return false;
    for (let parent = element.parentElement; parent && parent.tagName !== 'BODY'; parent = parent.parentElement) {
      const style = getComputedStyle(parent), bounds = parent.getBoundingClientRect();
      if (['auto', 'scroll'].includes(style.overflowX) && parent.scrollWidth > parent.clientWidth && bounds.left >= -1 && bounds.right <= innerWidth + 1) return false;
    }
    return true;
  }).slice(0, 10).map(element => ({ tag: element.tagName, class: element.className, left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right }));
}
const escape = text => text.replaceAll('</script', '<\\/script');

async function documentHtml(name, options, direction, enhanced) {
  const html = authNames.includes(name) ? await auth.host('account-main-account-' + name, options) : await f.host(name, options);
  const tokens = await f.engine.parseAndRender(f.read('snippets/global-theme-vars.liquid'), { settings });
  const base = await f.engine.parseAndRender(f.read('assets/q-base.css.liquid'), { settings });
  const head = '<!doctype html><html lang="en" dir="' + direction + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Account fixture</title>' +
    '<style>' + f.read('assets/theme.css') + '</style>' + tokens + '<style>' + base + '</style>' +
    ['styles.css', 'qtm-content-blocks.css', 'qtm-section-surfaces.css'].map(path => '<style>' + f.read('assets/' + path) + '</style>').join('') + '</head><body><main id="MainContent">';
  const body = html.replace(/<link[^>]*href="\/assets\/([^"?]+)"[^>]*>/g, (_, path) => '<style>' + f.read('assets/' + path) + '</style>')
    .replace(/<script[^>]*src="\/assets\/([^"?]+)"[^>]*><\/script>/g, (_, path) => enhanced ? '<script>' + escape(f.read('assets/' + path)) + '</script>' : '');
  return head + body + '</main></body></html>';
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-zygote'] });
  results.browser = await browser.version();
  const context = await browser.newContext();
  await context.route('**/*', route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const name of names) {
      const schema = f.unpack('account-main-account-' + name).schema;
      const layouts = schema.settings.find(setting => setting.id === 'layout_style').options.map(option => option.value);
      for (const layout of layouts) {
        for (const width of [320, 768, 1440]) {
          const direction = width === 768 ? 'rtl' : 'ltr';
          const options = { settings: { layout_style: layout, card_background: width === 768 ? '#111111' : '#ffffff', provider_url: '/apps/track' }, globals: { routes: f.routes } };
          const html = await documentHtml(name, options, direction, true);
          await page.setViewportSize({ width, height: 1000 });
          await page.goto('about:blank');
          await page.setContent(html, { waitUntil: 'load' });
          const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
          const label = name + '/' + layout + '/' + width + '/' + direction;
          results.cases.push({ label, ...dimensions });
          const overflow = await page.evaluate(visibleOverflow);
          if (dimensions.scroll > dimensions.width + 1 || overflow.length) {
            results.failures.push({ label, kind: 'horizontal overflow', overflow });
          }
          if (layout === layouts[0] && width !== 1440) {
            await page.evaluate(axe);
            const audit = await page.evaluate(async () => (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations);
            results.accessibility.push({ label, violations: audit.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
          }
        }
      }
      // Long unbroken content plus maximum section dimensions on a narrow screen.
      const maximums = Object.fromEntries(schema.settings.filter(s => s.type === 'range').map(s => [s.id, s.max]));
      const long = 'LongName'.repeat(24);
      await page.setViewportSize({ width: 320, height: 1000 });
      const longCustomer = { ...f.customer, name: long, first_name: long, email: long + '@example.test', default_address: { ...f.address, address1: long } };
      await page.goto('about:blank');
      await page.setContent(await documentHtml(name, { settings: { ...maximums, heading: long, subheading: long }, globals: { routes: f.routes, ...(authNames.includes(name) ? {} : { customer: longCustomer }) } }, 'rtl', true), { waitUntil: 'load' });
      const longWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      results.cases.push({ label: name + '/long-max/320/rtl', width: 320, scroll: longWidth });
      const longOverflow = await page.evaluate(visibleOverflow);
      if (longWidth > 321 || longOverflow.length) results.failures.push({ label: name + '/long-max/320/rtl', kind: 'horizontal overflow', scroll: longWidth, overflow: longOverflow });

      // No-JS forms/links stay available; only working enhancements become visible.
      await page.goto('about:blank');
      await page.setContent(await documentHtml(name, { globals: { routes: f.routes } }, 'ltr', false), { waitUntil: 'load' });
      const state = await page.evaluate(() => ({ forms: [...document.querySelectorAll('form')].filter(el => el.checkVisibility()).length, buttons: [...document.querySelectorAll('button[type="button"]')].filter(el => el.checkVisibility()).length }));
      if (authNames.includes(name) && state.forms !== (name === 'login' ? 2 : 1)) results.failures.push({ label: name + '/no-js', state });
      if (['login', 'register', 'activate', 'reset-password', 'addresses', 'orders'].includes(name) && state.buttons) results.failures.push({ label: name + '/no-js-inert-controls', state });
    }
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('about:blank');
    await page.setContent(await documentHtml('login', { settings: { recover_display: 'panel' }, globals: { routes: f.routes } }, 'ltr', true));
    await page.locator('[data-account-main-account-login-recover-trigger]').focus();
    await page.keyboard.press('Enter');
    results.keyboard.push({ flow: 'login recovery open', passed: await page.locator('[name="email"]').evaluate(el => el === document.activeElement) });
    await page.locator('[data-account-main-account-login-login-trigger]').focus();
    await page.keyboard.press('Enter');
    results.keyboard.push({ flow: 'login recovery return', passed: await page.locator('[data-account-main-account-login-recover-trigger]').evaluate(el => el === document.activeElement) });
    await page.goto('about:blank');
    await page.setContent(await documentHtml('addresses', { globals: { routes: f.routes } }, 'rtl', true));
    await page.locator('[data-qtm-addresses-add-toggle]').first().focus();
    await page.keyboard.press('Enter');
    results.keyboard.push({ flow: 'address open', passed: await page.locator('[data-qtm-addresses-add-panel] [name="address[first_name]"]').evaluate(el => el === document.activeElement) });
    await page.keyboard.press('Escape');
    results.keyboard.push({ flow: 'address return', passed: await page.locator('[data-qtm-addresses-add-toggle]').first().evaluate(el => el === document.activeElement) });
  } finally {
    results.scriptErrors = errors;
    fs.writeFileSync(output, JSON.stringify(results, null, 2) + '\n');
    await browser.close();
  }
  const violations = results.accessibility.flatMap(x => x.violations).length;
  console.log(JSON.stringify({ cases: results.cases.length, overflowFailures: results.failures.length, axeAudits: results.accessibility.length, violations, keyboard: results.keyboard, scriptErrors: errors }));
  if (results.failures.length || violations || errors.length || results.keyboard.some(x => !x.passed)) process.exit(1);
})().catch(error => { console.error(error); process.exit(1); });
