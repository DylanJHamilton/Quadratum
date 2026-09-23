const assert = require('node:assert/strict');
const fs = require('node:fs');
const cp = require('node:child_process');
const { toLiquidHtmlAST } = require('@shopify/liquid-html-parser');
const postcss = require('postcss');
const { JSDOM } = require('jsdom');
const f = require('./header-fixtures.cjs');
const baseline = '8e114764138cf5a5967ff56b75064808d6366bed';
const touched = ['snippets/header-account-entry.liquid', 'snippets/header-marketplace-category-drawer.liquid', 'assets/header-account-entry.css', ...f.words.flatMap(n => ['sections/header-' + n + '.liquid', 'assets/header-' + n + '.js'])];
const source = f.read('snippets/header-account-entry.liquid');
assert(!source.includes('if customer'), 'Shopify, not Liquid, owns enhanced customer state');
assert(!/sign-in-url=|shopify-store|access-token|shadowRoot/.test(source));
assert.match(source, /shop.customer_accounts_enabled/);
assert.match(source, /signed-out-avatar/);
for (const file of touched) {
  const text = f.read(file);
  if (file.endsWith('.liquid')) toLiquidHtmlAST(text, { mode: 'strict' });
  if (file.endsWith('.css')) postcss.parse(text);
  if (file.endsWith('.js')) cp.execFileSync(process.execPath, ['--check', file]);
}
// Traverse actual active header dependencies, ignoring historical comments/schema.
const dependencies = new Set();
function trace(file) {
  if (dependencies.has(file)) return;
  dependencies.add(file);
  assert(fs.existsSync(file), file);
  if (!file.endsWith('.liquid')) return;
  const text = f.read(file).replace(/{%-?\s*(comment|schema)\b[\s\S]*?{%-?\s*end\1\s*-?%}/g, '');
  for (const match of text.matchAll(/['"]([^'"]+)['"]\s*\|\s*asset_url/g)) {
    const asset = fs.existsSync('assets/' + match[1]) ? 'assets/' + match[1] : 'assets/' + match[1] + '.liquid';
    trace(asset);
  }
  for (const match of text.matchAll(/{%-?\s*render\s+['"]([^'"]+)['"]/g)) trace('snippets/' + match[1] + '.liquid');
}
f.words.forEach(n => trace('sections/header-' + n + '.liquid'));
const protectedFiles = cp.execFileSync('git', ['ls-tree', '-r', '--name-only', baseline], { encoding: 'utf8' }).trim().split('\n')
  .filter(p => /^(assets\/account-|sections\/account-|snippets\/account-|templates\/customers\/)/.test(p) || p === 'config/settings_data.json');
for (const file of protectedFiles) assert(fs.readFileSync(file).equals(cp.execFileSync('git', ['show', baseline + ':' + file])), 'Preserve A–E and merchant data: ' + file);

(async () => {
  let scenarios = 0;
  for (const name of f.words) {
    const oldSchema = JSON.parse(cp.execFileSync('git', ['show', baseline + ':sections/header-' + name + '.liquid'], { encoding: 'utf8' }).match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
    const schema = f.unpack('header-' + name).schema;
    for (const setting of oldSchema.settings) assert.deepEqual(schema.settings.find(x => x.id === setting.id && x.type === setting.type && (x.id || x.content === setting.content)), setting, name + ': existing setting preserved');
    const menu = schema.settings.find(s => s.id === 'customer_account_menu');
    assert.equal(menu.type, 'link_list');
    assert.equal(menu.default, 'customer-account-main-menu');
    for (const customer of [null, { first_name: 'Private <name>', email: 'private@example.test' }]) {
      for (const enabled of [false, true]) {
        for (const visible of [false, true]) {
          const dom = new JSDOM(await f.header(name, { settings: { show_account: visible, show_account_icon: visible, show_mobile_account_link: visible }, globals: { customer, shop: { name: 'Quadratum', customer_accounts_enabled: enabled } } }));
          const doc = dom.window.document;
          assert.equal(doc.querySelectorAll('shopify-account').length, enabled && visible ? 1 : 0, name + ': visibility gate');
          if (enabled && visible) {
            const element = doc.querySelector('shopify-account');
            assert.equal(element.getAttribute('menu'), 'customer-account-main-menu');
            assert.deepEqual([...element.attributes].map(a => a.name).sort(), ['class', 'menu']);
            assert(!element.closest('[role="dialog"], details'));
            assert(!element.querySelector('a, button, input, [tabindex]'), 'Slot has no competing control');
            assert(!element.textContent.includes('Private') && !element.textContent.includes('private@'));
            assert.equal(element.querySelectorAll('[slot="signed-out-avatar"]').length, 1);
          } else assert.equal(doc.querySelectorAll('[data-qtm-account-fallback]').length, 0, 'No native accounts when disabled');
          dom.window.close(); scenarios++;
        }
      }
    }
    for (const [selection, expected] of [[null, 'customer-account-main-menu'], ['', 'customer-account-main-menu'], [{handle: 'customer-links'}, 'customer-links'], ['custom-menu', 'custom-menu'], [{handle: 'x" onmouseover="bad'}, 'x" onmouseover="bad']]) {
      const dom = new JSDOM(await f.header(name, {settings: {customer_account_menu: selection}}));
      const component = dom.window.document.querySelector('shopify-account');
      assert.equal(component.getAttribute('menu'), expected);
      assert(!component.hasAttribute('onmouseover'));
      dom.window.close(); scenarios++;
    }
  }
  const mobile = new JSDOM(await f.header('one', {settings: {show_account_icon: false, show_mobile_account_link: true}}));
  assert(mobile.window.document.querySelector('shopify-account.qtm-account-entry--mobile-only'));
  mobile.window.close(); scenarios++;
  const output = 'docs/phase5/validation/checkpoint-f'; fs.mkdirSync(output, {recursive: true});
  fs.writeFileSync(output + '/source.json', JSON.stringify({baseline, scenarios, strict_liquid_files: touched.filter(x => x.endsWith('.liquid')), css_js_syntax: true, protected_files_unchanged: protectedFiles, header_dependency_closure: [...dependencies].sort()}, null, 2) + '\n');
  console.log(`PASS ${scenarios} account entry scenarios; all five headers; settings/menu/visibility/state/escaping; ${dependencies.size} exact dependencies; ${protectedFiles.length} A–E/protected files unchanged; strict Liquid/CSS/JS.`);
})().catch(error => {console.error(error); process.exitCode = 1;});
