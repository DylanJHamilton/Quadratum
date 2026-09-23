const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const defaults=fields=>Object.fromEntries(fields.filter(x=>x.id).map(x=>[x.id,x.default??null]));
const globals=Object.assign({},...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(x=>defaults(x.settings)));
function fixture(name){
 const source=fs.readFileSync(`sections/${name}.liquid`,'utf8'),start=source.lastIndexOf('{% schema %}'),schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
 const engine=new Liquid({root:['snippets'],extname:'.liquid'});engine.registerFilter('asset_url',s=>'/assets/'+s);engine.registerFilter('image_url',image=>{assert(image);return '/'+(image.id||'image')+'.jpg'});engine.registerFilter('image_tag',url=>`<img src="${url}">`);engine.registerFilter('color_modify',color=>color);
 const block=(type,id,settings={})=>({id,type,settings:{...defaults(schema.blocks.find(x=>x.type===type).settings),...settings}});
 const render=(id,settings={},blocks=[],design=false)=>engine.parseAndRender(source.slice(0,start).replace(/{% style %}/g,'<style>').replace(/{% endstyle %}/g,'</style>'),{section:{id,settings:{...defaults(schema.settings),...settings},blocks},settings:globals,request:{design_mode:design}});
 return {schema,block,render};
}
(async()=>{
 const social=fixture('call-to-action-social-proof');
 const blocks=[social.block('metric','metric',{icon_filename:'star.svg'}),social.block('logo','logo',{logo_image:{id:'logo'},logo_link:'/pages/partners',logo_alt:'Example'})];
 for(const mode of ['mixed','grid_only','logo_strip']){
  const dom=new JSDOM(await social.render('one',{display_mode:mode,cta_link:null,cta2_link:'/collections/all'},blocks)+await social.render('two',{display_mode:mode},blocks));
  const root=dom.window.document.getElementById('one');assert.equal(root.querySelectorAll('.q-metric').length,mode==='logo_strip'?0:1);assert.equal(root.querySelectorAll('.q-logo').length,mode==='grid_only'?0:1);assert(!root.querySelector('a[href="#"]'));assert(!root.querySelector('.q-btn--primary'));
  const icon=root.querySelector('.q-icon');if(icon){assert.equal(icon.getAttribute('width'),'24');assert.equal(icon.getAttribute('height'),'24')}
  for(const sheet of dom.window.document.styleSheets)for(const rule of [...sheet.cssRules].flatMap(r=>r.cssRules?[...r.cssRules]:[r]))if(rule.selectorText)for(const selector of rule.selectorText.split(','))assert(selector.trim().startsWith('#shopify-section-'));
  dom.window.close();
 }
 const dom=new JSDOM(await social.render('video',{background_video:'/film.mp4',hide_on_mobile:true}),{runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,root=w.document.querySelector('[data-video-hero]');
 const motion=new w.EventTarget();motion.matches=true;const mobile=new w.EventTarget();mobile.matches=false;w.matchMedia=q=>q.includes('reduced')?motion:mobile;
 w.HTMLMediaElement.prototype.play=function(){this.dataset.playing='true';return Promise.resolve()};w.HTMLMediaElement.prototype.pause=function(){this.dataset.playing='false'};
 w.eval(fs.readFileSync('assets/video-hero-banner.js','utf8'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 const video=root.querySelector('video');assert(!video.autoplay);assert.equal(video.dataset.playing,'false');root.querySelector('[data-video-hero-toggle]').click();assert.equal(video.dataset.playing,'true');mobile.matches=true;mobile.dispatchEvent(new w.Event('change'));assert.equal(video.dataset.playing,'false');root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert.equal(video.dataset.playing,'false');w.close();
 const icons=fixture('call-to-action-icon-list');
 for(const fx of ['none','lift','tilt','pulse','spin']){
  const html=await icons.render('icons',{icon_hover_effect:fx,btn_link:'/collections/all',pad_x:0,gap:0},[icons.block('icon','a',{icon_filename:'assets/worm.svg'})]);const d=new JSDOM(html);assert.equal(d.window.document.querySelector('img').getAttribute('src'),'/assets/worm.svg');assert.equal(d.window.document.querySelector('.q-btn').getAttribute('href'),'/collections/all');assert(html.includes('--q-gap: 0px'));d.window.close();
 }
 const emptyIcons=new JSDOM(await icons.render('empty'));assert.equal(emptyIcons.window.document.querySelectorAll('.q-icon-item').length,0);emptyIcons.window.close();assert((await icons.render('editor',{},[],true)).includes('Sample item'));
 const sale=fixture('featured-content-full-image-banner-only-sale');
 for(const key of ['image_desktop','image_laptop','image_tablet','image_mobile']) for(const mode of ['auto','fixed']){
  const image={id:key,width:1800,height:800,alt:'Save on selected products'};const d=new JSDOM(await sale.render('sale',{[key]:image,height_mode:mode,link_url:'/collections/all',link_label:'Offer "details"',overlay_enable:true}));
  assert.equal(d.window.document.querySelectorAll('source').length,4);assert.equal(d.window.document.querySelector('img').alt,image.alt);assert.equal(d.window.document.querySelector('a').getAttribute('aria-label'),'Offer "details"');assert.equal(d.window.document.querySelector('.q-sale-banner__card').classList.contains('is-fixed'),mode==='fixed');d.window.close();
 }
 assert(!(await sale.render('empty')).includes('<section'));assert((await sale.render('editor',{},[],true)).includes('Add at least one image'));
 for(const f of [social,icons,sale])for(const preset of f.schema.presets){const blocks=(preset.blocks||[]).map((b,i)=>f.block(b.type,'preset-'+i,b.settings));await f.render('preset',preset.settings,blocks)}
 console.log('PASS CTA Social Proof/Icon List/Featured Sale: actual presets, display modes, blank CTAs, media reduced-motion/manual play/visibility/unload, icon effects and asset URL, empty editor/storefront, all responsive image fallback inputs, fixed/auto modes and escaped labels. Browser/live Shopify acceptance remains open.');
})().catch(error=>{console.error(error);process.exitCode=1});
