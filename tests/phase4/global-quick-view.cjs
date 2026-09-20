const assert=require('node:assert/strict');
const {engine,render,dom,boot,drain,read,product,variants}=require('./support/commerce.cjs');
(async()=>{
 const host=await engine.parseAndRender(read('snippets/q-quick-view-host.liquid'),{routes:{root_url:'/fr/'}});
 const fragment=await render('collection-modern-quick-view');
 const d=dom(host+'<button data-quick-view data-product-handle="test" data-quick-view-mode="modal">Open</button><button data-quick-view data-product-handle="second">Other</button>');const w=d.window,doc=w.document;
 let calls=[];w.fetch=(url,opts)=>new Promise(resolve=>calls.push({url:String(url),opts,resolve}));
 boot(w,['product-selling-plans.js','product-purchase-sync.js','q-quick-view.js']);
 const triggers=doc.querySelectorAll('[data-quick-view]'),qv=doc.getElementById('q-qv');
 triggers[0].click();assert.equal(calls.length,1);assert.match(calls[0].url,/\/fr\/products\/test\?section_id=collection-modern-quick-view/);assert.equal(qv.dataset.mode,'modal');
 calls[0].resolve({ok:true,text:async()=>fragment});await drain();
 const form=qv.querySelector('form'),select=form.elements.id,qty=form.elements.quantity,plan=form.elements.selling_plan;
 assert.equal(qv.querySelector('h2').textContent,product.title);assert.equal(qv.querySelector('h2 safe'),null);assert.equal(form.action,'https://shop.test/fr/cart/add');assert.equal(doc.querySelectorAll('form').length,1,'only global template imported');
 assert.equal(qv.querySelector('[data-purchase-current]').textContent,'$10.00');
 plan.value='45';plan.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(qv.querySelector('[data-purchase-current]').textContent,'$8.00');
 const originalURL=w.location.href;select.value='100';select.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(w.location.href,originalURL,'Quick View never owns product URL');assert.equal(qty.value,'2');assert.equal(qty.step,'2');assert.equal(qty.max,'6');assert.equal(qv.querySelector('[data-purchase-sku]').textContent,'SKU100');assert.equal(plan.value,'');
 plan.value='90';plan.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(qv.querySelector('[data-purchase-current]').textContent,'$15.00');assert.equal(qv.querySelector('[data-purchase-compare]').textContent,'$20.00');
 qty.value='3';assert.equal(form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})),false);qty.value='4';assert.equal(form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})),true,'native valid submission available');
 select.value='101';select.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(form.elements.add.disabled,true);assert.equal(form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})),false);
 select.value='nonexistent';select.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(form.elements.add.disabled,true);
 select.value='10';select.dispatchEvent(new w.Event('change',{bubbles:true}));
 const close=qv.querySelector('button[data-qv-close]');close.focus();doc.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));assert.equal(doc.activeElement.textContent,'View full product');
 doc.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(qv.hidden,true);assert.equal(doc.activeElement,triggers[0]);assert.equal(calls[0].opts.signal.aborted,true);
 // Stale load, close/unload, and error recovery retain a localized product link.
 triggers[0].click();triggers[1].click();assert.equal(calls[1].opts.signal.aborted,true);calls[1].resolve({ok:true,text:async()=>fragment});await drain();assert.equal(qv.querySelector('form'),null);
 calls[2].resolve({ok:false});await drain();assert.equal(qv.querySelector('[data-qv-content] a').href,'https://shop.test/fr/products/second');
 triggers[0].click();doc.dispatchEvent(new w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(qv.hidden,true);assert.equal(calls[3].opts.signal.aborted,true);
 // Required allocation prices and incompatibility, no allocations, single option/no image.
 const required=await render('collection-modern-quick-view',{data:{product:{...product,requires_selling_plan:true}}});
 triggers[0].click();calls[4].resolve({ok:true,text:async()=>required});await drain();assert.equal(qv.querySelector('[name="selling_plan"]').value,'45');assert.equal(qv.querySelector('[data-purchase-current]').textContent,'$8.00');
 let variant=qv.querySelector('[name="id"]');variant.value='100';variant.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(qv.querySelector('[name="selling_plan"]').value,'90');
 const empty=await render('collection-modern-quick-view',{data:{product:{...product,requires_selling_plan:true,selling_plan_groups:[],variants:[{...variants[0],selling_plan_allocations:[]}],selected_or_first_available_variant:{...variants[0],selling_plan_allocations:[]}}}});
 triggers[0].click();calls[5].resolve({ok:true,text:async()=>empty});await drain();assert.equal(qv.querySelector('[name="add"]').disabled,true);
 // Existing AJAX cart contract; errors remain visible, successful drawer opening retires Quick View/focus.
 triggers[0].click();calls[6].resolve({ok:true,text:async()=>fragment});await drain();
 const drawer=doc.createElement('div');drawer.dataset.cartDrawer='';drawer.dataset.cartUrl='/fr/cart';drawer.hidden=true;drawer.innerHTML='<button data-cart-drawer-close>Close cart</button><div data-cart-drawer-content></div>';doc.body.append(drawer);
 w.QuadratumSettings={cart:{ajaxDrawerEnabled:true,openAfterAdd:true}};
 let requestBody;w.fetch=async(url,opts={})=>{if(opts.method==='POST'){requestBody=opts.body;return{ok:true,json:async()=>({id:10})}}return{ok:true,text:async()=>'<div data-cart-drawer-content><span data-cart-count>1</span></div>'}};
 boot(w,['cart-drawer.js']);let f=qv.querySelector('form');f.dispatchEvent(new w.SubmitEvent('submit',{bubbles:true,cancelable:true,submitter:f.elements.add}));await drain();assert.equal(requestBody.get('id'),'10');assert.equal(requestBody.get('quantity'),'1');assert.equal(qv.hidden,true);assert.equal(drawer.hidden,false);w.QuadratumCartDrawer.close();assert.equal(doc.activeElement,triggers[0]);assert.equal(doc.documentElement.style.overflow,'');
 d.window.close();
 console.log('PASS Global Quick View: native localized fragment, escaped content/money, existing variant IDs, plans/quantity/price/SKU/media, invalid/sold-out/required-plan blocking, URL isolation, native/AJAX cart, stale requests/focus/editor lifecycle. Shopify API/browser acceptance queued.');
})().catch(e=>{console.error(e);process.exitCode=1});
