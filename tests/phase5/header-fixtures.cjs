// Shopify Liquid adapters are reused; component internals remain platform-owned.
const f = require('../phase4/support/forms.cjs');
const words = ['one', 'two', 'three', 'four', 'five'];
const routes = { root_url: '/fr/', search_url: '/fr/search', cart_url: '/fr/cart', account_url: '/fr/account', account_login_url: '/fr/account/login', account_register_url: '/fr/account/register', account_addresses_url: '/fr/account/addresses', account_logout_url: '/fr/account/logout' };
const globals = Object.assign({}, ...JSON.parse(f.read('config/settings_schema.json')).map(group => f.defaults(group.settings)));
f.engine.registerFilter('t', key => key === 'customer.login.sign_in' ? 'Sign in' : key);
async function header(name, options = {}) {
  return f.host('header-' + name, {
    ...options,
    settings: { show_account: true, show_account_icon: true, ...options.settings },
    globals: { settings: globals, routes, shop: { name: 'Quadratum', customer_accounts_enabled: true }, cart: { item_count: 2 }, customer: null, request: { design_mode: false }, ...options.globals }
  });
}
async function html(name, options = {}, direction = 'ltr', scripts = true) {
  const tokens = await f.engine.parseAndRender(f.read('snippets/global-theme-vars.liquid'), { settings: globals });
  const base = await f.engine.parseAndRender(f.read('assets/q-base.css.liquid'), { settings: globals });
  const body = (await header(name, options))
    .replace(/<link[^>]*href="\/assets\/([^"?]+)"[^>]*>/g, (_, file) => '<style>' + f.read('assets/' + file) + '</style>')
    .replace(/<script[^>]*src="\/assets\/([^"?]+)"[^>]*><\/script>/g, (_, file) => scripts ? '<script>' + f.read('assets/' + file).replaceAll('</script', '<\\/script') + '</script>' : '');
  return '<!doctype html><html lang="en" dir="' + direction + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Account entry fixture</title><style>' + f.read('assets/theme.css') + '</style>' + tokens + '<style>' + base + f.read('assets/styles.css') + '</style></head><body><section id="shopify-section-one">' + body + '</section><main id="MainContent"><h1>Account entry fixture</h1><button id="outside">Outside header</button></main></body></html>';
}
module.exports = { ...f, words, routes, header, html };
