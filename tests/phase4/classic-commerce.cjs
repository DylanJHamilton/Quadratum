const assert=require('node:assert/strict');
const {read,engine,unpack,render,dom,boot,drain,product,variants,photo}=require('./support/commerce.cjs');
const files=['product-purchase-sync.js','product-selling-plans.js','product-variant-ui.js','product-wishlist.js','product-stacked-media.js'];
const change=(w,node,value)=>{node.value=value;node.dispatchEvent(new w.Event('change',{bubbles:true}))};
const submit=(w,form)=>form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
 const {schema}=unpack('main-product-classic');
 const blocks=schema.blocks.map(b=>({type:b.type,settings:{heading:'Heading <safe>',image:photo(),link:'/fr/pages/info',alt:'Alt <safe>',question:'Question <safe>',answer:'<p>Answer</p>',label_1:'Spec <safe>',namespace_1:'custom',key_1:'spec'}}));
 for(const f of schema.settings){const values=f.type==='select'?f.options.map(o=>o.value):f.type==='checkbox'?[true,false]:f.type==='range'?[f.min,f.max]:[];for(const value of values)await render('main-product-classic',{settings:{[f.id]:value},blocks});}
 for(const preset of schema.presets)await render('main-product-classic',{settings:preset.settings,blocks:preset.blocks});
 const custom={variant_ui_enable:true,variant_ui_style:'swatches',enable_wishlist:true,show_under_banners_blocks:true,show_trust_blocks:true};
 for(const style of ['buttons','list','dropdown','swatches']){
  const d=dom(await render('main-product-classic',{settings:{...custom,variant_ui_style:style,variant_swatch_source:'metafield'},blocks})),w=d.window,root=w.document.querySelector('[data-classic-product]');boot(w,files);
  const ui=root.querySelector('[data-product-variant-ui]'),groups=ui.querySelectorAll('[data-product-option-index]');
  if(style==='swatches'){assert.equal(groups[0].querySelectorAll('.q-variant-ui__swatch').length,0);assert.equal(groups[1].querySelectorAll('.q-variant-ui__swatch').length,2);}
  if(style==='dropdown'){change(w,groups[0].querySelector('select'),'Large');change(w,groups[1].querySelector('select'),'Blue');}
  else{let radio=groups[0].querySelector('input[value=Large]');radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(root.querySelector('[name=id]').value,'','Sparse state retained');radio=groups[1].querySelector('input[value=Blue]');radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));}
  assert.equal(root.querySelector('[name=id]').value,'100');assert.equal(root.querySelector('[data-purchase-current]').textContent,'$20.00');assert(root.querySelector('[data-purchase-compare]').hidden);
  assert.equal(root.querySelector('.q-sku').textContent,'SKU: SKU100');assert(!root.querySelector('.q-sku').hidden);
  assert.equal(root.querySelector('[name=quantity]').value,'2');assert.equal(root.querySelector('[name=quantity]').max,'6');
  change(w,root.querySelector('[name=selling_plan]'),'90');assert.equal(root.querySelector('[data-purchase-current]').textContent,'$15.00');assert(!root.querySelector('[data-purchase-compare]').hidden);
  root.querySelector('[name=quantity]').value='3';assert(!submit(w,root.querySelector('form')));root.querySelector('[name=quantity]').value='4';assert(submit(w,root.querySelector('form')));
  const wishlist=root.querySelector('[data-wishlist-button]');wishlist.click();assert.equal(wishlist.getAttribute('aria-pressed'),'true');assert.equal(JSON.parse(w.localStorage.getItem('q:wishlist:v1')).items[0].variant_id,'100');
  w.history.replaceState({},'','?variant=10');w.dispatchEvent(new w.PopStateEvent('popstate'));assert.equal(wishlist.dataset.variantId,'10');assert.equal(wishlist.getAttribute('aria-pressed'),'false');assert(root.querySelector('.q-sku').hidden);
  const payload=new w.FormData(root.querySelector('form'));assert.deepEqual(payload.getAll('id'),['10']);assert.equal(root.querySelector('form').action,'https://shop.test/fr/cart/add');
  assert(!w.document.querySelector('safe'));assert(root.querySelector('[data-platform-app]'));assert(root.querySelector('video'));
  const imageLink=[...root.querySelectorAll('[data-classic-enlarge]')].find(link=>!link.closest('[hidden]')),dialog=root.querySelector('dialog');imageLink.click();assert(dialog.open);assert.equal(w.document.activeElement,dialog.querySelector('.q-lb__close'));
  dialog.querySelector('[data-classic-next]').click();assert(dialog.querySelector('img').src.includes('image-3'));dialog.querySelector('[data-classic-next]').click();assert(dialog.querySelector('img').src.includes('image-1'));
  dialog.querySelector('[data-classic-close]').click();assert(!dialog.open);assert.equal(w.document.activeElement,imageLink);
  root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));const saved=w.localStorage.getItem('q:wishlist:v1');wishlist.click();assert.equal(w.localStorage.getItem('q:wishlist:v1'),saved);
  root.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));wishlist.click();assert.equal(wishlist.getAttribute('aria-pressed'),'true');d.window.close();
 }
 const limited=dom(await render('main-product-classic',{settings:{media_limit:1},data:{product:{...product,selected_or_first_available_variant:variants[1]}}}));assert.equal(limited.window.document.querySelector('[data-classic-media]').dataset.classicMedia,'3');assert.equal(limited.window.document.querySelectorAll('[data-classic-media]').length,1);limited.window.close();
 const two=dom(await render('main-product-classic',{id:'one'})+await render('main-product-classic',{id:'two'}));const ids=[...two.window.document.querySelectorAll('[id]')].map(n=>n.id);assert.equal(ids.length,new Set(ids).size);two.window.close();
 assert(!(await render('main-product-classic',{data:{product:null}})).includes('<section'));
 const req=dom(await render('main-product-classic',{data:{product:{...product,requires_selling_plan:true}}}));const rw=req.window;boot(rw,files);assert.equal(rw.document.querySelector('[data-purchase-current]').textContent,'$8.00');change(rw,rw.document.querySelector('[name=id]'),'101');assert(!submit(rw,rw.document.querySelector('form')));req.window.close();
 const native=dom(await render('main-product-classic'));assert(native.window.document.querySelector('[data-classic-enlarge]').href.startsWith('https://cdn.example.test'));assert(!native.window.document.querySelector('.q-field').hidden);native.window.close();
 for(const name of ['main-product-classic','main-product-master'])for(const broken of ['null','{','[null]']){const d=dom(await render(name));d.window.document.querySelector('[data-product-purchase-data]').textContent=broken;boot(d.window,['product-stacked-media.js']);assert(d.window.document.querySelector('form [name="id"]'));d.window.close();}
 console.log('PASS Classic: individual settings/endpoints/preset/all-block Liquid, styles/swatches/sparse exact variants, plan prices/compatibility, quantity/payload/SKU/URL, selected/limited/mixed media, native image links, dialog image cycling/focus return, repeated instances and editor lifecycle. Dialog and Shopify adapters are explicit; actual browser/provider acceptance remains queued.');
})().catch(e=>{console.error(e);process.exitCode=1});
