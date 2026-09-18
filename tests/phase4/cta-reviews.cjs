const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom'),postcss=require('postcss');
const read=p=>fs.readFileSync(p,'utf8'),defaults=fields=>Object.fromEntries(fields.filter(f=>f.id).map(f=>[f.id,f.default??null]));
const source=read('sections/call-to-action-reviews.liquid'),start=source.lastIndexOf('{% schema %}'),schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
const engine=new Liquid({root:"snippets",extname:".liquid"});engine.registerFilter('asset_url',p=>'/assets/'+p);engine.registerFilter('stylesheet_tag',p=>`<link rel="stylesheet" href="${p}">`);engine.registerFilter('json',JSON.stringify);
engine.registerFilter('image_url',v=>{assert(v);return '/image.jpg'});engine.registerFilter('image_tag',v=>`<img src="${v}" width="100" height="100">`);
engine.registerFilter('color_modify',v=>v);
const blocks=['a','b'].map(id=>({id,type:'review',settings:{...defaults(schema.blocks.find(b=>b.type==='review').settings),reviewer_image:{id:'reviewer'},reviewer_location:'Location',verified_purchase:true,reviewer_name:'Name "quoted"',review_text:'Text </script><img src=x>',review_video_url:'/'+id+'.mp4',product:{title:'Product "quoted"',url:'/products/example'},review_image:{id},rating:4}}));
const render=(id,overrides={},b=blocks)=>engine.parseAndRender(source.slice(0,start).replace(/{% render block %}/g,'<div data-app-fixture="{{ block.id }}"></div>'),{section:{id,settings:{...defaults(schema.settings),...overrides},blocks:b},settings:{},request:{design_mode:false}});
(async()=>{
 for(const mode of ['slideshow','grid','masonry','carousel']){
  const html=await render('one',{layout_mode:mode,anchor_id:'literal-anchor',enable_schema:true,autoplay:false,description_alignment:'inherit',heading_alignment:'right',cta_link:null,grid_columns_mobile:3,grid_columns_tablet:1,grid_columns_desktop:2});const d=new JSDOM(html),doc=d.window.document;
  assert(doc.getElementById('literal-anchor'));assert.equal(doc.querySelectorAll('video[controls]').length,2,'review video in every layout');assert.equal(doc.querySelectorAll('.q-reviewer-location').length,2);assert.equal(doc.querySelectorAll('.q-verified-badge').length,2);assert(!doc.querySelector('a[href="#"]'));assert(!doc.querySelector('.q-cta-actions'),'blank destinations do not reserve action spacing');assert.equal(doc.querySelectorAll('img[src=x]').length,0,'review text cannot become markup');assert(doc.querySelector('.q-description')===null);assert(!html.includes('q-text-inherit'));assert.equal(JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent).itemListElement[0].author.name,'Name "quoted"');
  if(mode==='slideshow'){assert.equal(doc.querySelector('[data-reviews-slideshow]').dataset.autoplay,'false');assert.equal(doc.querySelectorAll('[data-review-slide][aria-hidden="true"]').length,0,'no-JS content remains readable');}
  if(mode==='grid')assert(doc.querySelector('.q-reviews-grid').getAttribute('style').includes('--q-cols-tablet: 1'));
  for(const sheet of doc.styleSheets)for(const r of [...sheet.cssRules].flatMap(r=>r.cssRules?[...r.cssRules]:[r]))if(r.selectorText)assert(r.selectorText.startsWith('#shopify-section-one'));
  d.window.close();
 }
 for(const mode of ['slideshow','grid','masonry','carousel']) {
  const mixed=new JSDOM(await render('mixed',{layout_mode:mode},[...blocks,{id:'installed-app',type:'@app',settings:{}}]));
  assert.equal(mixed.window.document.querySelectorAll('[data-app-fixture]').length,1,'platform app render adapter invoked once');
  assert.equal(mixed.window.document.querySelectorAll('.q-review-content').length,2,'app block cannot become a manual review');
  assert(!mixed.window.document.querySelector('#judgeme_product_reviews,#looxReviews,#stamped-main-widget,.yotpo-reviews-carousel'));
  mixed.window.close();
 }
 const appOnly=new JSDOM(await render('app-only',{cta_text:'Read reviews',cta_link:'/pages/reviews',enable_schema:true},[{id:'app-only',type:'@app',settings:{}}]));assert(appOnly.window.document.querySelector('a[href="/pages/reviews"]'));assert(!appOnly.window.document.querySelector('[data-review-slide]'));assert(!appOnly.window.document.querySelector('script[type="application/ld+json"]'));appOnly.window.close();
 postcss.parse(read('assets/call-to-action-reviews.css')).walkRules(r=>r.selectors.forEach(s=>assert(s.trim().startsWith('.q-cta-reviews'))));
 for(const preset of schema.presets){assert.equal(preset.blocks.length,0);await render('preset',preset.settings,[])}
 assert.equal(defaults(schema.blocks.find(b=>b.type==='review').settings).verified_purchase,false);assert.equal(defaults(schema.settings).enable_schema,false);
 const dom=new JSDOM(await render('one',{background_video:'/background.mp4'})+await render('two',{autoplay:false}),{runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 const motion=new w.EventTarget();motion.matches=false;w.matchMedia=()=>motion;
 const timers=new Map();let serial=0;w.setTimeout=fn=>{timers.set(++serial,fn);return serial};w.clearTimeout=id=>timers.delete(id);
 w.HTMLMediaElement.prototype.play=function(){this.dataset.playing='true';return Promise.resolve()};w.HTMLMediaElement.prototype.pause=function(){this.dataset.playing='false'};
 w.eval(read('assets/call-to-action-reviews.js'));w.eval(read('assets/call-to-action-reviews.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 const roots=[...w.document.querySelectorAll('[data-cta-reviews]')],root=roots[0],slides=[...root.querySelectorAll('[data-review-slide]')];
 assert.equal(timers.size,1,'false autoplay on second instance honored; duplicate script guarded');assert(slides[1].inert);assert.notEqual(slides[0].querySelector('video').dataset.playing,'true','review video never autoplays');assert.equal(root.querySelector('.q-cta-bg video').dataset.playing,'true');
 root.querySelector('[data-reviews-next]').click();assert(slides[0].inert);assert.equal(slides[0].querySelector('video').dataset.playing,'false');assert.equal(timers.size,0);
 root.dispatchEvent(new w.Event('mouseenter'));root.dispatchEvent(new w.Event('mouseleave'));assert.equal(timers.size,0,'manual navigation remains paused');
 root.querySelector('[data-reviews-pause]').click();assert.equal(timers.size,1);
 const activeVideo=slides[1].querySelector('video');activeVideo.dispatchEvent(new w.Event('play'));assert.equal(timers.size,0,'playing a review must stop automatic rotation');
 root.dispatchEvent(new w.CustomEvent('shopify:block:select',{bubbles:true,detail:{blockId:'a'}}));assert(slides[0].classList.contains('is-active'));
 motion.matches=true;motion.dispatchEvent(new w.Event('change'));assert.equal(timers.size,0);root.querySelector('[data-reviews-pause]').click();assert.equal(timers.size,1);
 Object.defineProperty(w.document,'hidden',{configurable:true,value:true});w.document.dispatchEvent(new w.Event('visibilitychange'));assert.equal(timers.size,0);assert.equal(root.querySelector('.q-cta-bg video').dataset.playing,'false');
 Object.defineProperty(w.document,'hidden',{configurable:true,value:false});roots.forEach(r=>r.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true})));assert.equal(timers.size,0);assert(!slides[1].inert);
 motion.matches=false;root.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert.equal(timers.size,1);root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert.equal(timers.size,0);w.close();
 console.log('PASS CTA Reviews source closure: actual Liquid four layouts/presets, app-only/mixed block routing and CTA visibility, literal anchor and CSS scope, explicit false, two instances, persistent motion controls, manual review media, reduced motion, visibility, editor selection/unload/reload, safe JSON and neutral insertion defaults. Standard app render is a fixture adapter; actual installed provider acceptance remains live-only.');
})().catch(e=>{console.error(e);process.exitCode=1});
