const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const read=path=>fs.readFileSync(path,'utf8');
const engine=new Liquid({root:['snippets'],extname:'.liquid'});
engine.registerFilter('money',cents=>'$'+(Number(cents)/100).toFixed(2));
engine.registerFilter('json',JSON.stringify);
const defaults=fields=>Object.fromEntries(fields.filter(field=>field.id).map(field=>[field.id,field.default??null]));
(async()=>{
 const source=read('sections/featured-product-hero-banner.liquid');const start=source.lastIndexOf('{% schema %}');const schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
 const variants=[{id:10,title:'Small',price:1000,available:false},{id:20,title:'Large',price:2000,available:true}];
 const product={id:1,title:'Fixture product',variants,selected_or_first_available_variant:variants[1],has_only_default_variant:false,selling_plan_groups:[]};
 let html='';
 for(const id of ['first','second'])html+=await engine.parseAndRender(source.slice(0,start),{section:{id,settings:{...defaults(schema.settings),product,product_block_mode:'single',reveal_enable:false}},settings:{},routes:{cart_add_url:'/fr/cart/add'}});
 const d=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true}),w=d.window;
 w.matchMedia=()=>({matches:false,addEventListener(){}});
 const forms=[...w.document.querySelectorAll('.fp-atc-form')];assert.equal(forms.length,2);
 for(const form of forms){assert.equal(form.getAttribute('action'),'/fr/cart/add');assert.equal(new w.FormData(form).get('id'),'20');assert(!form.querySelector('[type=submit]').disabled);}
 assert.equal(new Set([...w.document.querySelectorAll('[id]')].map(node=>node.id)).size,w.document.querySelectorAll('[id]').length);
 w.eval(read('assets/featured-product-hero-banner.js'));w.eval(read('assets/featured-product-hero-banner.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 assert.equal(w.document.querySelectorAll('.fp-reveal-ready').length,0,'disabled reveal does not hide content');
 forms[0].querySelector('select').value='10';forms[0].querySelector('select').dispatchEvent(new w.Event('change',{bubbles:true}));assert(forms[0].querySelector('[type=submit]').disabled);assert.equal(forms[0].dispatchEvent(new w.Event('submit',{cancelable:true})),false);assert(!forms[1].querySelector('[type=submit]').disabled);
 forms[0].querySelector('select').value='20';forms[0].querySelector('select').dispatchEvent(new w.Event('change',{bubbles:true}));assert(forms[0].querySelector('[data-fp-price]').textContent.includes('$20.00'));
 const root=forms[0].closest('section');root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));root.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert(!forms[0].querySelector('[type=submit]').disabled);w.close();
 const collectionHtml=await engine.parseAndRender(source.slice(0,start),{section:{id:'collection',settings:{...defaults(schema.settings),product_block_mode:'collection',row_collection:{id:2,products:[{id:3,title:'Listed product',url:'/products/listed',price:1000}]}}},settings:{},routes:{cart_add_url:'/cart/add'}});
 assert(collectionHtml.includes('/products/listed'),'collection picker object renders its products without a handle map');
 for(const single of [true,false]){
  const sold={...product,has_only_default_variant:single,variants:variants.map(v=>({...v,available:false})),selected_or_first_available_variant:{...variants[0],available:false}};
  const output=await engine.parseAndRender(source.slice(0,start),{section:{id:'sold',settings:{...defaults(schema.settings),product:sold,product_block_mode:'single'}},settings:{},routes:{cart_add_url:'/cart/add'}});
  const check=new JSDOM(output);assert(check.window.document.querySelector('[type=submit]').disabled,'sold-out product starts disabled');check.window.close();
 }
 console.log('PASS Featured Product Hero: actual two-instance Liquid, exact selected ID, localized action, variant price/availability, invalid submit, single/multiple sold-out variants and collection picker objects.');
 for(const reduced of [false,true]){
  const motionDom=new JSDOM('<section data-featured-product-hero data-reveal-enabled="true" data-parallax-enabled="true" data-parallax-strength="12"><div class="fp-bg"><video autoplay></video></div><h2 data-reveal>Visible</h2></section>',{runScripts:'outside-only',pretendToBeVisual:true});const win=motionDom.window;
  const motion=new win.EventTarget();motion.matches=reduced;win.matchMedia=()=>motion;
  const video=win.document.querySelector('video');video.play=()=>{video.dataset.playing='true';return Promise.resolve()};video.pause=()=>{video.dataset.playing='false'};
  const frames=new Map();let n=0;win.requestAnimationFrame=fn=>{frames.set(++n,fn);return n};win.cancelAnimationFrame=id=>frames.delete(id);
  win.eval(read('assets/featured-product-hero-banner.js'));win.document.dispatchEvent(new win.Event('DOMContentLoaded'));
  const section=win.document.querySelector('section');assert(!section.classList.contains('fp-reveal-ready'),'missing observer never hides content');assert.equal(video.dataset.playing,String(!reduced));
  motion.matches=true;motion.dispatchEvent(new win.Event('change'));assert.equal(frames.size,0);assert.equal(video.dataset.playing,'false');
  section.dispatchEvent(new win.Event('shopify:section:unload',{bubbles:true}));assert.equal(frames.size,0);win.dispatchEvent(new win.Event('scroll'));assert.equal(frames.size,0,'unloaded section has no scroll listener');win.close();
 }
 console.log('PASS Featured Product Hero: missing observer fallback, reduced motion/video suspension, animation-frame cancellation and unload cleanup.');
})().catch(error=>{console.error(error);process.exitCode=1});
