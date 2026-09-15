const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const { Liquid } = require('liquidjs');
const read = p => fs.readFileSync(p,'utf8');
(async () => {
  const engine = new Liquid(); engine.registerFilter('json',JSON.stringify);
  const product = { options_with_values:[{name:'Denominations',values:['$10','$100']}], variants:[{id:10,option1:'$10'},{id:100,option1:'$100'}] };
  const html = await engine.parseAndRender(read('snippets/product-variant-ui.liquid'),{product,section:{id:'qa',settings:{variant_ui_style:'pills'}},current_variant:product.variants[0]});
  assert(html.includes('type="radio"')); assert(!html.includes('aria-pressed')); assert(html.includes('aria-label="Denominations"'));
  const d = new JSDOM(`<form><div class="q-field"><select name="id" id="q-variant-qa"><option value="10">$10</option><option value="100">$100</option></select></div>${html}</form>`,{runScripts:'outside-only'});
  d.window.eval(read('assets/product-variant-ui.js')); d.window.document.dispatchEvent(new d.window.Event('DOMContentLoaded'));
  const radios=d.window.document.querySelectorAll('input[type=radio]');
  radios[1].checked=true; radios[1].dispatchEvent(new d.window.Event('change',{bubbles:true}));
  assert.equal(d.window.document.querySelector('select').value,'100');
  assert.equal(new d.window.FormData(d.window.document.querySelector('form')).get('id'),'100');
  assert(d.window.document.querySelector('.q-field').hidden); assert(!d.window.document.querySelector('[data-product-variant-ui]').hidden);
  assert.equal(d.window.document.querySelector('[data-product-selected-value]').textContent,'$100'); d.window.close();

  const h = new JSDOM('<div data-qtm-header-five><button data-qtm-h5-mobile-open aria-expanded="false">Menu</button><div data-qtm-h5-mobile-panel hidden aria-hidden="true"><div role="dialog" tabindex="-1"><button data-qtm-h5-mobile-close>Close</button><a href="/">Home</a></div></div></div>',{runScripts:'outside-only',pretendToBeVisual:true});
  h.window.matchMedia=()=>({matches:true});
  h.window.eval(read('assets/header-five.js')); h.window.document.dispatchEvent(new h.window.Event('DOMContentLoaded'));
  const open=h.window.document.querySelector('[data-qtm-h5-mobile-open]'); const close=h.window.document.querySelector('button[data-qtm-h5-mobile-close]');
  open.click(); await new Promise(r=>setTimeout(r,30)); assert.equal(h.window.document.activeElement,close);
  h.window.document.dispatchEvent(new h.window.KeyboardEvent('keydown',{key:'Escape'}));
  assert.equal(h.window.document.activeElement,open); assert.equal(open.getAttribute('aria-expanded'),'false'); h.window.close();
  console.log('PASS: actual Liquid radio markup, merchant option label, native submission synchronization, progressive visibility, Header Five focus on open/Escape return with reduced motion. Mock DOM only.');
})().catch(e=>{console.error(e);process.exitCode=1;});
