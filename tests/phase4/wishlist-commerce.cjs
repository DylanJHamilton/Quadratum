const assert=require('node:assert/strict');
const {read,unpack,render,dom,boot,drain,product}=require('./support/commerce.cjs');
(async()=>{
 const {schema}=unpack('product-wishlist');for(const f of schema.settings){const values=f.type==='select'?f.options.map(x=>x.value):f.type==='checkbox'?[true,false]:f.type==='range'?[f.min,f.max]:[];for(const value of values)await render('product-wishlist',{settings:{[f.id]:value}});}for(const preset of schema.presets)await render('product-wishlist',{settings:preset.settings});
 for(const blocked of [false,true]){
  const html=await render('main-product-classic',{settings:{enable_wishlist:true}})+await render('product-wishlist',{id:'list',settings:{mode:'button_and_list',show_price:false,show_vendor:true,title:'',subheading:''}});
  const d=dom(html),w=d.window,requests=[];w.Shopify={routes:{root:'/fr/'}};
  if(blocked)Object.defineProperty(w,'localStorage',{get(){throw new Error('Denied')}});
  w.fetch=(url,options)=>new Promise((resolve,reject)=>requests.push({url:String(url),options,resolve,reject}));
  boot(w,['product-purchase-sync.js','product-selling-plans.js','product-wishlist.js','section-product-wishlist.js']);
  const list=w.document.querySelector('.product-wishlist'),button=w.document.querySelector('[data-wishlist-button]');assert(list.querySelector('[data-wishlist-clear]'),'Clear remains available without heading');
  button.click();assert.equal(list.querySelector('[data-wishlist-toggle]').getAttribute('aria-pressed'),'true');assert.equal(requests.length,1);assert(requests[0].url.includes('/fr/products/test?section_id=product-wishlist-card-renderer&variant=10'));
  if(blocked)assert(!list.querySelector('[data-wishlist-notice]').hidden);
  requests[0].resolve({ok:true,text:async()=>'<div data-wishlist-title="Product &lt;safe&gt;"><a href="/fr/products/test">Product</a><span class="q-product-card__price">$10</span></div>'});await drain();
  assert(list.querySelector('[data-wishlist-remove]'));assert(list.querySelector('a').href.includes('variant=10'));
  list.querySelector('[data-wishlist-remove]').click();assert(list.querySelector('[data-wishlist-empty]')&&!list.querySelector('[data-wishlist-empty]').hidden);assert.equal(button.getAttribute('aria-pressed'),'false');assert.equal(w.document.activeElement,list.querySelector('[data-wishlist-list]'));
  button.click();const pending=requests[1];list.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert(pending.options.signal.aborted);pending.resolve({ok:true,text:async()=>'<div data-wishlist-title="stale">Stale</div>'});await drain();assert(!list.textContent.includes('Stale'));
  list.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));requests[2].reject(new Error('Unavailable'));await drain();assert(list.querySelector('[data-wishlist-remove]'),'Unavailable saved products remain removable');
  list.querySelector('[data-wishlist-clear]').click();assert.equal(w.qtmWishlistStore().getState().items.length,0);
  d.window.close();
 }
 const d=dom(await render('product-wishlist')),w=d.window;w.localStorage.setItem('q:wishlist:v1',JSON.stringify({items:[{product_handle:'<img onerror=alert(1)>',variant_id:1},{product_handle:'valid',variant_id:2},{product_handle:'valid',variant_id:2},{product_handle:'bad',variant_id:'wrong'},null]}));w.fetch=async()=>({ok:false});boot(w,['product-wishlist.js','section-product-wishlist.js']);await drain();assert.equal(w.qtmWishlistStore().getState().items.length,1);assert(!w.document.querySelector('[onerror]'));
 const custom=w.qtmWishlistStore('custom');custom.addItem({product_handle:'another',variant_id:'30'},false);assert.equal(w.qtmWishlistStore().getState().items[0].product_handle,'valid');assert.equal(custom.getState().items[0].product_handle,'another');
 for(let i=1;i<=110;i++)custom.addItem({product_handle:'product-'+i,variant_id:String(i)},true);assert.equal(custom.getState().items.length,100);d.window.close();
 const denied=dom(await render('main-product-classic',{settings:{enable_wishlist:true}})),dw=denied.window;
 dw.Storage.prototype.setItem=function(){throw new Error('Quota denied')};boot(dw,['product-purchase-sync.js','product-selling-plans.js','product-wishlist.js']);dw.document.querySelector('[data-wishlist-button]').click();assert.equal(dw.qtmWishlistStore().getState().items.length,1);assert(!dw.qtmWishlistStore().isStorageOK());assert(!dw.document.querySelector('[data-wishlist-notice]').hidden);denied.window.close();
 const tabs=dom(await render('main-product-classic',{settings:{enable_wishlist:true}})),tw=tabs.window;boot(tw,['product-purchase-sync.js','product-selling-plans.js','product-wishlist.js']);tw.localStorage.setItem('q:wishlist:v1',JSON.stringify({version:1,items:[{product_handle:'test',variant_id:'10'}]}));tw.dispatchEvent(new tw.StorageEvent('storage',{key:'q:wishlist:v1'}));assert.equal(tw.document.querySelector('[data-wishlist-button]').getAttribute('aria-pressed'),'true');tabs.window.close();
 console.log('PASS wishlist: existing storage schema and custom keys, Classic/list synchronization, all settings/presets, write/read denial memory fallback, exact saved variant routes, remove/clear/focus, unavailable cards, malformed data, capped/deduped entries, abort/stale/editor lifecycle. Live browser persistence and Shopify fragments remain queued.');
})().catch(e=>{console.error(e);process.exitCode=1});
