const assert = require('node:assert/strict');
const fs = require('node:fs');
const postcss = require('postcss');
const f = require('./support.cjs');

(async () => {
  const sections = fs.readdirSync('sections').filter(name => name.startsWith('account-'));
  const snippets = fs.readdirSync('snippets').filter(name => name.startsWith('account-')).concat('contrast-text.liquid');
  const sources = [...sections.map(name => 'sections/' + name), ...snippets.map(name => 'snippets/' + name)]
    .map(file => [file, f.read(file).replace(/{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/g, '').split('{% schema %}')[0]]);
  const assets = fs.readdirSync('assets').filter(name => name.startsWith('account-'));
  assert.equal(sections.length, 9);
  assert.equal(assets.length, 17);
  for (const asset of assets) assert(sources.some(([, text]) => text.includes("'" + asset + "' | asset_url")), asset + ' has an executable source owner');
  for (const snippet of snippets) assert(sources.some(([, text]) => text.includes("render '" + snippet.replace('.liquid', '') + "'")), snippet + ' has a direct consumer');
  const templates = fs.readdirSync('templates/customers').map(name => f.read('templates/customers/' + name)).join('\n');
  for (const section of sections.filter(name => !name.includes('order-tracking'))) assert(templates.includes("section '" + section.replace('.liquid', '') + "'"), section + ' has a native or alternate template');
  const tracking = f.unpack('account-main-account-order-tracking');
  assert(tracking.schema.presets.length, 'tracking is an optional merchant-placeable section');
  const allLiquid = sources.map(([, text]) => text).join('\n');
  const allCSS = assets.filter(name => name.endsWith('.css')).map(name => f.read('assets/' + name)).join('\n');
  for (const name of sections) {
    const { liquid, schema } = f.unpack(name.replace('.liquid', ''));
    for (const setting of schema.settings.filter(setting => setting.id)) {
      assert(new RegExp('settings\\.' + setting.id + '\\b').test(allLiquid), name + ': setting consumer ' + setting.id);
    }
    for (const match of liquid.matchAll(/(--[\w-]+):\s*{{\s*section\.settings\.[^}]+}}/g)) {
      assert(allCSS.includes('var(' + match[1]), name + ': style-setting consumer ' + match[1]);
    }
  }
  for (const name of ['activate', 'addresses', 'orders', 'order']) {
    const rules = new Map();
    postcss.parse(f.read('assets/account-main-account-' + name + '.css')).walkRules(rule => {
      rules.set(rule.selector, Object.fromEntries(rule.nodes.filter(node => node.type === 'decl').map(node => [node.prop, node.value])));
    });
    const suffix = { activate: '__declineButton', addresses: '__dangerButton', orders: '__filter.is-active', order: '__badge' }[name];
    assert([...rules].some(([selector, props]) => selector.endsWith(suffix) && props.background?.startsWith('#')), 'opaque readable control surface: ' + name);
  }
  const order = { ...f.order, item_count: null, line_items: [{ ...f.order.line_items[0], title: 'Purchased name - old variant', quantity: 2 }, { ...f.order.line_items[0], quantity: 5 }] };
  const page = f.dom(await f.host('orders', { globals: { customer: { ...f.customer, orders: [order] } } }));
  assert.equal(page.window.document.querySelector('td[data-label="Items"]').textContent.trim(), '7');
  f.boot(page.window, ['account-main-account-orders.js']);
  const search = page.window.document.querySelector('input[type="search"]');
  search.value = '$11.00'; search.dispatchEvent(new page.window.Event('input'));
  assert.equal(page.window.document.querySelector('tbody tr').hidden, false, 'search accepts the displayed amount');
  page.window.close();
  const detail = f.dom(await f.host('order', { globals: { order } }));
  assert.match(detail.window.document.querySelector('.qtmAccountOrder__itemTitle').textContent, /Purchased name - old variant/);
  assert.doesNotMatch(f.read('sections/account-main-account-order.liquid'), /line_item\.variant_title/);
  detail.window.close();
  console.log('PASS final account dependency ownership: 9 sections, 17 referenced assets, 4 consumed snippets, 8 customer templates; settings/style consumers; dark-card control surfaces; displayed-amount search, quantity fallback and historical order titles.');
})().catch(error => { console.error(error); process.exitCode = 1; });
