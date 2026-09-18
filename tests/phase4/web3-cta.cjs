const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8'),defaults=fields=>Object.fromEntries(fields.filter(f=>f.id).map(f=>[f.id,f.default??null]));
const source=read('sections/call-to-action-web3.liquid'),start=source.lastIndexOf('{% schema %}'),schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
const engine=new Liquid({root:'snippets',extname:'.liquid'});engine.registerFilter('asset_url',p=>'/assets/'+p);engine.registerFilter('image_url',i=>{assert(i);return '/image.jpg'});engine.registerFilter('image_tag',i=>`<img src="${i}">`);
const preset=schema.presets[0],blocks=preset.blocks.map((b,i)=>({id:'icon'+i,type:b.type,settings:{...defaults(schema.blocks[0].settings),...b.settings}}));
const render=(id,overrides={},design=false,b=blocks)=>engine.parseAndRender(source.slice(0,start),{section:{id,settings:{...defaults(schema.settings),...overrides},blocks:b},settings:{},request:{design_mode:design}});
(async()=>{
 for(const background_style of ['default','accent','dark'])for(const alignment of ['start','center']){
  const d=new JSDOM(await render('one',{background_style,alignment,simulate_connected:true,primary_url:'/pages/community',primary_label:'Explore "community"',secondary_url:'/pages/about',image:{id:'image'}}));const root=d.window.document.querySelector('[data-web3-cta]');
  assert.equal(root.querySelector('.btn-primary').tagName,'A');assert.equal(root.querySelector('.btn-primary').getAttribute('href'),'/pages/community');assert(!root.querySelector('.js-connect'));assert(!root.querySelector('.is-connected'),'simulation never changes storefront state');
  const uses=[...root.querySelectorAll('use')].map(x=>x.getAttribute('href').split('#')[1]);for(const symbol of uses)assert(read('assets/icons.svg').includes(`id="${symbol}"`),'preset symbols exist');assert.equal(uses.length,2);assert(root.textContent.includes('WalletConnect'),'missing bundled symbol uses a text badge');d.window.close();
 }
 const empty=new JSDOM(await render('empty',{primary_url:null,show_icons:false}));assert(!empty.window.document.querySelector('.btn-primary'));assert(!empty.window.document.querySelector('.qw3-icons'));empty.window.close();
 const preview=new JSDOM(await render('preview',{simulate_connected:true},true));assert(preview.window.document.querySelector('button:disabled'));preview.window.close();
 const guidance=new JSDOM(await render('guidance',{primary_url:null},true));assert(guidance.window.document.querySelector('.qw3-setup'));guidance.window.close();
 const custom={id:'custom',type:'wallet_icon',settings:{...defaults(schema.blocks[0].settings),icon_library:'custom',icon_custom_path:'custom-logo.svg',alt_text:'Custom'}};
 const customDom=new JSDOM(await render('custom',{},false,[custom]));assert.equal(customDom.window.document.querySelector('img').getAttribute('src'),'/assets/custom-logo.svg');customDom.window.close();
 const html=await render('one',preset.settings)+await render('two',preset.settings),d=new JSDOM(html,{runScripts:'outside-only'}),w=d.window,roots=[...w.document.querySelectorAll('[data-web3-cta]')];
 const motion=new w.EventTarget();motion.matches=false;w.matchMedia=()=>motion;const observers=[];
 w.IntersectionObserver=class {constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this)}observe(node){this.node=node}disconnect(){this.disconnected=true}};
 const script=read('assets/call-to-action-web3.js');w.eval(script);w.eval(script);w.document.dispatchEvent(new w.Event('DOMContentLoaded'));assert.equal(observers.length,2);assert(roots[0].querySelector('.is-pending'));
 roots[0].dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert(observers[0].disconnected);assert(!roots[0].querySelector('.is-pending'));
 motion.matches=true;motion.dispatchEvent(new w.Event('change'));assert(observers[1].disconnected);assert(!roots[1].querySelector('.is-pending'));
 motion.matches=false;roots[0].dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert.equal(observers.length,3);roots[0].dispatchEvent(new w.Event('shopify:block:select',{bubbles:true}));assert(observers[2].disconnected);d.window.close();
 const fallback=new JSDOM(await render('fallback'),{runScripts:'outside-only'});fallback.window.matchMedia=()=>({matches:false,addEventListener(){}});fallback.window.eval(script);fallback.window.document.dispatchEvent(new fallback.window.Event('DOMContentLoaded'));assert(!fallback.window.document.querySelector('.is-pending'));fallback.window.close();
 console.log('PASS CTA Web3: actual preset and six layout combinations, configured links, editor-only simulation, absent action guidance, deployed symbols/custom asset, missing-icon text fallback, duplicate init/two instances, reveal fallback/reduced motion and editor cleanup. Remaining legacy custom-icon contract review stays open.');
})().catch(e=>{console.error(e);process.exitCode=1});
