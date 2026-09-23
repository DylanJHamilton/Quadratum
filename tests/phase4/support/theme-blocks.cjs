// Actual Theme Block sources with explicit DOM/media/native-wrapper adapters.
// Shopify Liquid settings are supplied as rendered values; native evaluation remains a live gate.
const f = require('./commerce.cjs');
const escape = value => String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
f.engine.registerFilter('image_tag', (url, ...pairs) => {
  const args = Object.fromEntries(pairs.filter(Array.isArray));
  return '<img src="' + escape(url) + '" width="240" height="180"' + ['alt', 'class', 'loading'].map(key => ' ' + key + '="' + escape(args[key] ?? '') + '"').join('') + '>';
});
f.engine.registerFilter('handle', value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
f.engine.registerFilter('url_for_type', value => '/fr/collections/types?q=' + encodeURIComponent(value));
f.engine.registerFilter('metafield_text', value => value?.text ?? value?.value ?? '');
f.engine.registerFilter('metafield_tag', value => value?.html ?? '<span>' + escape(value?.value) + '</span>');
const unpack = name => {
  const [liquid, tail] = f.read('blocks/' + name + '.liquid').split('{% schema %}');
  return { liquid, schema: JSON.parse(tail.split('{% endschema %}')[0]) };
};
async function html(name, settings = {}, id = 'one', design = false, data = {}) {
  const { liquid, schema } = unpack(name);
  const block = { id, type: name, settings: { ...f.defaults(schema.settings), ...settings }, shopify_attributes: 'data-editor-block="' + id + '"' };
  const output = await f.engine.parseAndRender(f.platform ? f.platform(liquid) : liquid, { block }, { globals: { request: { design_mode: design }, shop: { name: 'Fixture store' }, product: f.product, ...data, routes: { root_url: '/fr/', cart_url: '/fr/cart', cart_add_url: '/fr/cart/add', all_products_collection_url: '/fr/collections/all' } } });
  if (schema.tag === null) return output;
  return '<div class="shopify-block" id="shopify-block-' + id + '" data-editor-block="' + id + '">' + output + '</div>';
}
async function inspect(name, settings, callback, design = false) {
  const d = f.dom(await html(name, settings, 'one', design));
  try { callback(d.window.document, d.window); } finally { d.window.close(); }
}
module.exports = { ...f, unpack, html, inspect, escape };
