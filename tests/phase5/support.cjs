// Native Shopify transport/pagination are deliberately explicit fixture adapters.
const f = require('../phase4/support/forms.cjs');
const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const routes = { account_url: '/fr/account', account_login_url: '/fr/account/login', account_logout_url: '/fr/account/logout', account_addresses_url: '/fr/account/addresses', all_products_collection_url: '/fr/collections/all', root_url: '/fr/' };
const address = { id: 7, first_name: 'First <safe>', last_name: 'Last', company: 'Company', address1: 'One street', city: 'Town', country: 'Canada', province: 'Ontario', province_code: 'ON', phone: '123' };
const order = { id: 100, name: '#100', created_at: '2026-09-01', financial_status: 'paid', financial_status_label: 'Paid', fulfillment_status: 'partial', fulfillment_status_label: 'Partially fulfilled', total_price: 1100, subtotal_price: 1000, total_discounts: 100, shipping_price: 100, tax_price: 0, item_count: 2, customer_url: '/fr/account/orders/100', order_status_url: '/status/100', line_items: [{ id: 1, title: 'Product <safe>', variant_title: 'Blue', quantity: 2, final_price: 500, final_line_price: 1000, original_price: 550, original_line_price: 1100, properties: {}, fulfillment: { created_at: '2026-09-02', tracking_number: 'A&1', tracking_company: 'Carrier', tracking_url: 'https://carrier.test/track?x=1&y=2' } }] };
const customer = { first_name: 'First <safe>', name: 'First Last <safe>', email: 'customer@example.test', orders_count: 1, orders: [order], addresses: [address], default_address: address, new_address: {} };
const countries = '<option value="---" data-provinces="[]">---</option><option value="Canada" data-provinces="[[&quot;Ontario&quot;,&quot;Ontario&quot;],[&quot;Quebec&quot;,&quot;Quebec&quot;]]">Canada</option><option value="France" data-provinces="[]">France</option><option value="Unknown">Unknown</option>';
f.engine.registerFilter('format_address', value => '<p>' + escape(value?.address1) + '<br>' + escape(value?.city) + '</p>');
f.engine.registerFilter('default_pagination', () => '<a href="?view=orders&amp;page=2">Next</a>');

function platform(source) {
  return source.replace(/{%\s*(?:end)?paginate\b[^%]*%}/g, '')
    .replace(/{%\s*form\s+([^%]+)%}/g, (_, args) => {
      const type = args.match(/'([^']+)'/)[1];
      const id = args.match(/\bid:\s*([\w.]+)/);
      const klass = args.match(/class:\s*'([^']+)'/);
      const addressType = args.match(/^'customer_address',\s*([\w.]+)/)?.[1];
      return (addressType ? '{% assign form = ' + addressType + ' %}' : '') +
        '<form data-native-form="' + type + '" method="post" ' +
        (id ? 'id="{{ ' + id[1] + ' }}" ' : '') + (klass ? 'class="' + klass[1] + '" ' : '') +
        '><input type="hidden" name="form_type" value="' + type + '">';
    }).replace(/{%\s*endform\s*%}/g, '</form>');
}
async function host(name, opts = {}) {
  const { liquid, schema } = f.unpack('account-main-account-' + name);
  const id = opts.id || 'one';
  const blocks = (opts.blocks || []).map((block, i) => ({ id: 'block-' + i, type: block.type, settings: { ...f.defaults(schema.blocks?.find(x => x.type === block.type)?.settings), ...block.settings } }));
  return f.engine.parseAndRender(platform(liquid), { section: { id, settings: { ...f.defaults(schema.settings), ...opts.settings }, blocks } }, {
    globals: { routes, customer, order, all_country_option_tags: countries, settings: { text_base: '#111111' }, request: { design_mode: false, path: '/fr/account' }, template: { directory: 'customers', name: 'account' }, paginate: { pages: 2 }, ...opts.globals }
  });
}
module.exports = { ...f, host, routes, customer, order, address, countries };
