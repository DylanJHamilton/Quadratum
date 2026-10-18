const assert = require('node:assert/strict');
const f = require('../phase4/support/commerce.cjs');

(async () => {
  const variant = { ...f.variants[0], unit_price: 500, unit_price_measurement: { reference_value: 1, reference_unit: 'kg' }, store_availabilities: [{ pick_up_enabled: true, available: true, pick_up_time: 'Usually ready in 2 hours', location: { name: '<Main store>', address: { address1: '1 Demo Street' } } }] };
  const gift = { ...f.product, 'gift_card?': true, variants: [variant], selected_or_first_available_variant: variant };
  for (const name of ['main-product-modern-variant', 'main-product-simple', 'main-product-classic', 'main-product-master', 'main-product-compact']) {
    const dom = f.dom(await f.render(name, { data: { product: gift }, settings: { show_dynamic_checkout: true } }));
    const w = dom.window, document = w.document, form = document.querySelector('form');
    assert(form.querySelector('q-gift-recipient'), name + ': recipient belongs to product form');
    assert(form.querySelector('shopify-payment-terms'), name + ': payment terms use Shopify form');
    assert(!form.querySelector('.shopify-payment-button'), name + ': no unsupported accelerated gift recipient checkout');
    assert.equal(form.querySelectorAll('[name="properties[Recipient email]"]').length, 1);
    assert(form.querySelector('[data-pickup-content]').textContent.includes('<Main store>'));
    assert(!form.querySelector('[data-pickup-content] main'), 'location name escaped');
    assert(form.querySelector('[data-purchase-unit]').textContent.includes('$5.00 / kg'));
    f.boot(w, ['product-services.js']);
    const toggle = form.querySelector('[data-recipient-toggle]'), fields = form.querySelector('fieldset[data-recipient-fields]'), email = fields.querySelector('[data-recipient-email]');
    assert(fields.hidden && fields.disabled && !email.required);
    assert.equal(new w.FormData(form).get('properties[Recipient email]'), null);
    toggle.checked = true; toggle.dispatchEvent(new w.Event('change', { bubbles: true }));
    assert(!fields.hidden && !fields.disabled && email.required);
    assert(!email.checkValidity()); email.value = 'recipient@example.test'; assert(email.checkValidity());
    assert.equal(new w.FormData(form).get('properties[__shopify_send_gift_card_to_recipient]'), 'true');
    assert.equal(new w.FormData(form).get('properties[__shopify_offset]'), String(new Date().getTimezoneOffset()));
    const date = fields.querySelector('[data-recipient-date]');
    assert(date.min && date.max && date.min < date.max);
    date.value = '2100-01-01'; assert(!date.checkValidity());
    toggle.checked = false; toggle.dispatchEvent(new w.Event('change', { bubbles: true }));
    assert.equal(new w.FormData(form).get('properties[Recipient email]'), null);
    dom.window.close();
  }
  const apps = f.dom(await f.render('main-product-modern-variant', { blocks: [{ type: '@app' }, { type: 'custom_liquid', settings: { liquid: '<p data-custom>Custom content</p>' } }, { type: 'buy_buttons' }] }));
  assert.equal(apps.window.document.querySelectorAll('[data-platform-app]').length, 1);
  assert.equal(apps.window.document.querySelectorAll('[data-custom]').length, 1);
  assert(!apps.window.document.querySelector('form [data-platform-app]'));
  apps.window.close();

  const dom = f.dom('<form><select name="id"><option>10</option><option>100</option><option>101</option></select><q-pickup-availability data-variant-id="10" data-root-url="/fr/" data-error="Could not load" data-retry="Retry"><div data-pickup-content>Initial store</div></q-pickup-availability></form>');
  const w = dom.window, calls = [];
  w.fetch = (url, options) => new Promise((resolve, reject) => calls.push({ url: String(url), options, resolve, reject }));
  f.boot(w, ['product-services.js']);
  const element = w.document.querySelector('q-pickup-availability'), selector = w.document.querySelector('select');
  assert.equal(calls.length, 0, 'initial Liquid availability does not cause a duplicate request');
  const choose = async id => { selector.value = id; selector.dispatchEvent(new w.Event('change', { bubbles: true })); await f.drain(); };
  await choose('100'); assert(calls[0].url.includes('/fr/variants/100/?section_id=pickup-availability'));
  assert(!element.textContent.includes('Initial store'), 'stale availability cleared immediately');
  await choose('101'); assert(calls[0].options.signal.aborted);
  calls[0].resolve({ ok: true, text: async () => '<div data-pickup-content>Stale response</div>' }); await f.drain();
  assert(!element.textContent.includes('Stale response'));
  calls[1].resolve({ ok: false }); await f.drain(); assert.equal(element.querySelector('p').textContent, 'Could not load');
  element.querySelector('button').click(); await f.drain();
  calls[2].resolve({ ok: true, text: async () => '<div data-pickup-content>New store</div>' }); await f.drain(); assert.equal(element.textContent, 'New store');
  await choose('100'); const request = calls[3]; element.remove(); assert(request.options.signal.aborted);
  request.resolve({ ok: true, text: async () => '<div data-pickup-content>Detached response</div>' }); await f.drain(); assert(!element.textContent.includes('Detached response'));
  dom.window.close();
  console.log('PASS Product services: five real Liquid hosts, gift opt-in/validation/form properties/checkout exclusion, tax/unit/payment markup, escaped pickup locations, app blocks outside forms, localized pickup requests, race cancellation, retry and disconnect cleanup. Shopify service eligibility and delivery require store acceptance.');
})().catch(error => { console.error(error); process.exitCode = 1; });
