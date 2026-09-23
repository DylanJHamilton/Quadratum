const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const source=fs.readFileSync('sections/boxed-content-banner.liquid','utf8'),start=source.lastIndexOf('{% schema %}');
const schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
const defaults=fields=>Object.fromEntries(fields.filter(x=>x.id).map(x=>[x.id,x.default??null]));
const globals=Object.assign({},...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(x=>defaults(x.settings)));
const engine=new Liquid();engine.registerFilter('image_url',image=>{assert(image);return '/poster.jpg'});
(async()=>{
 for(const layout of ['card','boxed_bg','panel']){
  const render=(id,overrides={})=>engine.parseAndRender(source.slice(0,start),{section:{id,settings:{...defaults(schema.settings),...schema.presets[0].settings,layout_variant:layout,aria_id:'custom-'+id,...overrides}},settings:globals});
  const output=await render('one',{background_mode:'video',background_video:'/one.mp4',button_animation:'pop'})+await render('two',{background_mode:'video',background_video:'/two.mp4'});
  const dom=new JSDOM(output,{runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
  const roots=[...w.document.querySelectorAll('[data-video-hero]')];assert.equal(roots.length,2);assert.equal(roots[0].id,'custom-one');assert.equal(roots[0].querySelector('a').getAttribute('href'),'/collections/all');assert(!roots[0].querySelector('video').autoplay);
  const motion=new w.EventTarget();motion.matches=true;w.matchMedia=()=>motion;
  w.HTMLMediaElement.prototype.play=function(){this.dataset.playing='true';return Promise.resolve()};w.HTMLMediaElement.prototype.pause=function(){this.dataset.playing='false'};
  w.eval(fs.readFileSync('assets/video-hero-banner.js','utf8'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  roots.forEach(root=>assert.equal(root.querySelector('video').dataset.playing,'false'));
  roots[0].querySelector('[data-video-hero-toggle]').click();assert.equal(roots[0].querySelector('video').dataset.playing,'true');assert.equal(roots[1].querySelector('video').dataset.playing,'false');
  roots[0].dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert.equal(roots[0].querySelector('video').dataset.playing,'false');
  const styles=[...w.document.styleSheets];
  for(const style of styles)for(const rule of style.cssRules){
   if(rule.selectorText)for(const selector of rule.selectorText.split(','))assert(selector.trim().startsWith('#shopify-section-'),'selector cannot leak outside this section');
   if(rule.name)assert(rule.name.startsWith('q-boxed-'),'keyframe names are component scoped');
  }
  assert(!source.includes('opacity:0; animation:'),'reduced-motion animation removal leaves visible buttons');
  assert(source.includes('100%{transform:scale(1); opacity:1}'),'pop ends visible');
  w.close();
  const fallback=await render('fallback',{background_mode:'video',background_video:null,background_image:{id:1}});assert(!fallback.includes('<video'));assert(fallback.includes('background-image:url(/poster.jpg)'));
  const empty=await render('empty',{background_mode:'video',background_video:null,background_image:null,cta_link:null});const emptyDom=new JSDOM(empty);assert(!emptyDom.window.document.querySelector('video, a.btn'));emptyDom.window.close();
 }
 console.log('PASS Boxed Content: all three layouts, two actual instances, custom anchors, preset CTA, media/reduced-motion/unload, image/empty fallback, scoped selectors/keyframes and visible animation endpoints.');
})().catch(error=>{console.error(error);process.exitCode=1});
