const assert = require('node:assert/strict');
const f = require('../phase4/support/commerce.cjs');
const defaults = Object.assign({},...JSON.parse(f.read('config/settings_schema.json')).map(g=>f.defaults(g.settings)));
const routes={cart_url:'/fr/cart',cart_add_url:'/fr/cart/add',cart_change_url:'/fr/cart/change',all_products_collection_url:'/fr/collections/all'};
const render=(name,settings={},extra={})=>f.engine.parseAndRender(f.read('snippets/'+name+'.liquid'),{settings:{...defaults,...settings},routes,cart:{item_count:0,total_price:2500,items:[]},...extra});
(async()=>{
  let html=await render('cart-drawer',{cart_drawer_width:640,cart_drawer_overlay_opacity:0,cart_drawer_show_continue_shopping:false});
  assert.match(html,/--drawer-width: 640px/);assert.match(html,/--drawer-overlay: 0;/);
  let d=f.dom(html);assert(!d.window.document.querySelector('.qtm-cart-drawer__empty-link'));d.window.close();
  html=await render('cart-shipping-progress',{cart_free_ship_threshold_enable:true,cart_free_ship_threshold_amount:75});
  d=f.dom(html);assert.equal(d.window.document.querySelector('progress').value,2500);assert.equal(d.window.document.querySelector('progress').max,7500);assert.match(d.window.document.body.textContent,/\$50.00/);assert.match(d.window.document.body.textContent,/eligibility is calculated at checkout/);d.window.close();
  assert.equal((await render('cart-shipping-progress',{cart_free_ship_threshold_enable:true,cart_free_ship_threshold_amount:0})).trim(),'');
  for(const category of ['product','collection','addon']){
    d=f.dom('<form action="/fr/cart/add" data-cart-drawer-add '+(category==='collection'?'data-cart-drawer-context="collection"':category==='addon'?'data-addon-form':'')+'><input name="id" value="1"><button type="submit">Add</button></form>');
    const w=d.window;let count=0;w.fetch=()=>{count++;return Promise.reject(new Error('unexpected fetch'));};
    w.QuadratumSettings={cart:{ajaxDrawerEnabled:true,[category+'TriggerEnabled']:false}};
    f.boot(w,['cart-drawer.js']);const event=new w.Event('submit',{bubbles:true,cancelable:true});w.document.querySelector('form').dispatchEvent(event);assert.equal(event.defaultPrevented,false,category+' preserves native submission');assert.equal(count,0);d.window.close();
  }
  const p={...f.product,variants:[{...f.variants[0],available:true,quantity_rule:{min:1,increment:1}}],options:['Title'],selected_or_first_available_variant:{...f.variants[0],available:true,quantity_rule:{min:1,increment:1}}};
  for(const enabled of [true,false]){
    html=await render('product-card',{enable_ajax_cart_drawer:enabled,cart_mode:'ajax_drawer',pcard_quick_add:true},{product:p,enable_quick_add:true});
    d=f.dom(html);assert.equal(Boolean(d.window.document.querySelector('[data-cart-drawer-add]')),enabled,'canonical false overrides old cart_mode');d.window.close();
  }
  console.log('PASS drawer width/zero overlay, continue links, currency progress and zero target, three disabled trigger paths without fetch, canonical cart setting precedence.');
})().catch(e=>{console.error(e);process.exitCode=1;});
