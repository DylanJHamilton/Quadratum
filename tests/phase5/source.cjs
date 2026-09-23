const assert = require('node:assert/strict');
const fs = require('node:fs');
const cp = require('node:child_process');
const { toLiquidHtmlAST } = require('@shopify/liquid-html-parser');
const postcss = require('postcss');
const files = ['sections', 'snippets', 'assets'].flatMap(dir => fs.readdirSync(dir).filter(p => p.startsWith('account-')).map(p => dir + '/' + p));
files.push(...fs.readdirSync('templates/customers').map(p => 'templates/customers/' + p));
files.push('snippets/contrast-text.liquid');
let parsed = 0, references = 0;
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.liquid')) {
    toLiquidHtmlAST(source, { mode: 'strict' });
    parsed++;
    const schema = source.match(/{% schema %}([\s\S]*?){% endschema %}/);
    if (schema) {
      const data = JSON.parse(schema[1]);
      const ids = data.settings.filter(s => s.id).map(s => s.id);
      assert.equal(new Set(ids).size, ids.length, file + ': unique settings');
    }
    for (const ref of source.matchAll(/['"]([^'"]+)['"]\s*\|\s*asset_url/g)) {
      assert(fs.existsSync('assets/' + ref[1]), file + ': ' + ref[1]); references++;
    }
    for (const ref of source.matchAll(/{%-?\s*(render|section)\s+['"]([^'"]+)['"]/g)) {
      assert(fs.existsSync((ref[1] === 'render' ? 'snippets/' : 'sections/') + ref[2] + '.liquid'), file + ': ' + ref[2]); references++;
    }
  } else if (file.endsWith('.css')) {
    postcss.parse(source, { from: file }).walkRules(rule => assert(rule.selector.trim(), file + ': nonempty CSS selector'));
  }
  else if (file.endsWith('.js')) cp.execFileSync(process.execPath, ['--check', file]);
}
const mapping = { account: 'dashboard', 'account.orders': 'orders', activate_account: 'activate', addresses: 'addresses', login: 'login', order: 'order', register: 'register', reset_password: 'reset-password' };
for (const [template, section] of Object.entries(mapping)) {
  assert.match(fs.readFileSync('templates/customers/' + template + '.liquid', 'utf8'), new RegExp("section 'account-main-account-" + section + "'"));
}
console.log(`PASS ${files.length} account/direct-dependency files; ${parsed} strict Shopify Liquid parses; ${references} asset/snippet/section references; CSS/JS syntax; seven native customer templates and full-orders alternate template mapped.`);
