// Actual Theme Block sources with explicit DOM/media/native-wrapper adapters.
// Shopify Liquid settings are supplied as rendered values; native evaluation remains a live gate.
const f = require('./commerce.cjs');
const escape = value => String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
f.engine.registerFilter('image_tag', (url, ...pairs) => {
  const args = Object.fromEntries(pairs.filter(Array.isArray));
  return '<img src="' + escape(url) + '" width="240" height="180"' + ['alt', 'class', 'loading'].map(key => ' ' + key + '="' + escape(args[key] ?? '') + '"').join('') + '>';
});
const unpack = name => {
  const [liquid, tail] = f.read('blocks/' + name + '.liquid').split('{% schema %}');
  return { liquid, schema: JSON.parse(tail.split('{% endschema %}')[0]) };
};
async function html(name, settings = {}, id = 'one', design = false) {
  const { liquid, schema } = unpack(name);
  const block = { id, type: name, settings: { ...f.defaults(schema.settings), ...settings }, shopify_attributes: 'data-editor-block="' + id + '"' };
  const output = await f.engine.parseAndRender(liquid, { block }, { globals: { request: { design_mode: design }, shop: { name: 'Fixture store' }, routes: { all_products_collection_url: '/fr/collections/all' } } });
  return '<div class="shopify-block" id="shopify-block-' + id + '" data-editor-block="' + id + '">' + output + '</div>';
}
async function inspect(name, settings, callback, design = false) {
  const d = f.dom(await html(name, settings, 'one', design));
  try { callback(d.window.document, d.window); } finally { d.window.close(); }
}
module.exports = { ...f, unpack, html, inspect, escape };
