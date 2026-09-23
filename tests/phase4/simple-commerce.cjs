const assert=require('node:assert/strict');
const f=require('./support/commerce.cjs');
const files=['product-selling-plans.js','product-purchase-sync.js','product-gallery-options.js'];
const change=(w,node,value)=>{if(node.type==='radio')node.checked=true;else node.value=value;node.dispatchEvent(new w.Event('change',{bubbles:true}));};
const choose=(w,root,values)=>root.querySelectorAll('[data-qtm-option]').forEach((group,i)=>{const node=group.querySelector('select')||[...group.querySelectorAll('input')].find(n=>n.value===values[i]);change(w,node,values[i]);});
(async()=>{
  const {schema}=f.unpack('main-product-simple');
  for(const setting of schema.settings){const values=setting.options?.map(o=>o.value)||(setting.type==='checkbox'?[false,true]:setting.type==='range'?[setting.min,setting.max]:[]);for(const value of values)await f.render('main-product-simple',{settings:{[setting.id]:value}});}
  await f.render('main-product-simple',{blocks:schema.blocks.map(b=>({type:b.type}))});
  for(const picker of ['buttons','dropdown']){
    const d=f.dom(await f.render('main-product-simple',{settings:{variant_picker_type:picker,show_dynamic_checkout:true}})),w=d.window,root=w.document.querySelector('[data-simple-product]'),form=root.querySelector('form'),id=form.querySelector('[name=id]');
    assert.equal(form.querySelectorAll('[name=id]').length,1);assert.equal(form.querySelectorAll('[name=quantity]').length,1);assert(root.querySelector('[data-simple-fallback] select'));assert(root.querySelector('[data-simple-fallback] noscript').innerHTML.includes('/fr/products/test?variant=100'));
    f.boot(w,files);const groups=root.querySelectorAll('[data-qtm-option]');
    assert.equal(root.querySelector('[data-purchase-current]').textContent,'$10.00');assert.equal(root.querySelector('[data-purchase-sku-wrap]').hidden,true);
    const first=groups[0].querySelector('select')||[...groups[0].querySelectorAll('input')].find(n=>n.value==='Large');change(w,first,'Large');
    assert.equal(id.value,'');assert(form.querySelector('[name=add]').disabled);assert.equal(form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})),false);
    const second=groups[1].querySelector('select')||[...groups[1].querySelectorAll('input')].find(n=>n.value==='Blue');change(w,second,'Blue');
    assert.equal(id.value,'100');assert.equal(root.querySelector('[data-purchase-sku]').textContent,'SKU100');assert.equal(root.querySelector('[data-purchase-sku-wrap]').hidden,false);
    const qty=form.querySelector('[name=quantity]'),plan=form.querySelector('[name=selling_plan]');assert.equal(qty.min,'2');assert.equal(qty.step,'2');assert.equal(qty.max,'6');assert.equal(qty.value,'2');
    qty.value='3';assert.equal(form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})),false);qty.value='4';change(w,plan,'90');
    assert.equal(root.querySelector('[data-purchase-current]').textContent,'$15.00');assert.equal(root.querySelector('[data-purchase-compare]').textContent,'$20.00');assert.equal(root.querySelector('[data-purchase-compare]').hidden,false);
    assert.equal(form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})),true);assert.equal(new w.FormData(form).get('quantity'),'4');assert.equal(new w.FormData(form).get('selling_plan'),'90');
    assert.equal(new URL(w.location).searchParams.get('variant'),'100');
    choose(w,root,['Small','Blue']);assert.equal(id.value,'101');assert(form.querySelector('[name=add]').disabled);assert(root.querySelector('.q-dynamic-checkout').hidden);
    w.history.replaceState({},'','/fr/products/test?variant=10&selling_plan=45');w.dispatchEvent(new w.PopStateEvent('popstate'));
    assert.equal(id.value,'10');assert.equal(plan.value,'45');assert.equal(root.querySelector('[data-purchase-current]').textContent,'$8.00');assert.equal(root.querySelector('[data-purchase-sku-wrap]').hidden,true);
    const opener=root.querySelector('[data-qtm-open-modal]')||root.querySelector('[data-qtm-image]');opener.click();const modal=root.querySelector('dialog');assert(modal.open);root.querySelector('[data-qtm-next]').click();assert(modal.querySelector('img').alt);root.querySelector('[data-qtm-close-modal]').click();assert.equal(w.document.activeElement,opener);
    root.dispatchEvent(new w.CustomEvent('shopify:section:unload',{bubbles:true}));assert(root.querySelector('video').dataset.paused);root.dispatchEvent(new w.CustomEvent('shopify:section:load',{bubbles:true}));choose(w,root,['Large','Blue']);assert.equal(id.value,'100');d.window.close();
  }
  for(const settings of [{gallery_layout:'columns',hide_variants:true},{gallery_layout:'stacked',hide_variants:true},{gallery_layout:'thumbnails',mobile_thumbnails:'hide'},{gallery_layout:'thumbnail_carousel',image_zoom:'none'}]){
    const d=f.dom(await f.render('main-product-simple',{settings})),w=d.window,root=w.document.querySelector('[data-simple-product]');f.boot(w,files);choose(w,root,['Large','Blue']);
    if(settings.hide_variants){const image=root.querySelector('[data-simple-variant-image]');assert.equal(image.hidden,false);assert(image.querySelector('img').src.includes('image-3'));}
    if(settings.mobile_thumbnails==='hide')assert(root.querySelectorAll('.qtm-modern__thumb').length>0,'desktop thumbnails are retained');
    if(settings.image_zoom==='none')assert.equal(root.querySelector('dialog'),null);d.window.close();
  }
  const blank=await f.render('main-product-simple',{data:{product:null,request:{design_mode:true}}});assert(!blank.includes('data-simple-product'));assert(blank.includes('preview Main Product Simple'));
  for(const product of [ {...f.product,requires_selling_plan:true}, {...f.product,requires_selling_plan:true,variants:f.variants.map(v=>({...v,selling_plan_allocations:[]})),selected_or_first_available_variant:{...f.variants[0],selling_plan_allocations:[]}}, {...f.product,has_only_default_variant:true,options_with_values:[],variants:[{...f.variants[0],options:['Default Title']}]}, {...f.product,media:[],featured_media:null,featured_image:null,variants:f.variants.map(v=>({...v,featured_media:null,featured_image:null}))} ]){
    const d=f.dom(await f.render('main-product-simple',{data:{product}}));f.boot(d.window,files);assert(!d.window.document.querySelector('img[src=""]'));
    if(product.requires_selling_plan)assert.equal(d.window.document.querySelector('[name=add]').disabled,!product.variants[0].selling_plan_allocations.length);d.window.close();
  }
  const d=f.dom(await f.render('main-product-simple',{id:'one'})+await f.render('main-product-simple',{id:'two',data:{product:{...f.product,url:'/fr/products/other'}}}));f.boot(d.window,files);const roots=d.window.document.querySelectorAll('[data-simple-product]');choose(d.window,roots[1],['Large','Blue']);assert.equal(d.window.location.search,'');assert.equal(roots[0].querySelector('[name=id]').value,'10');const ids=[...d.window.document.querySelectorAll('[id]')].map(n=>n.id);assert.equal(new Set(ids).size,ids.length);d.window.close();
  console.log('PASS Main Product Simple: actual Liquid settings/preset matrix; sparse/sold-out/default variants; compatible plans and prices; quantity/native payload; URL/back; media/lightbox; host isolation and editor lifecycle. Shopify/browser acceptance remains queued.');
})().catch(e=>{console.error(e);process.exitCode=1});
