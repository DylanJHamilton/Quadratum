const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const source=fs.readFileSync('sections/standout-hero-banner.liquid','utf8'),start=source.lastIndexOf('{% schema %}');
const schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
const defaults=fields=>Object.fromEntries(fields.filter(x=>x.id).map(x=>[x.id,x.default??null]));
const globals=Object.assign({},...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(x=>defaults(x.settings || [])));
const engine=new Liquid({root:'snippets',extname:'.liquid'});engine.registerFilter('image_url',image=>{assert(image);return '/image.jpg'});engine.registerFilter('color_modify',(color,_,opacity)=>`rgba(0,0,0,${opacity})`);
const render=(id,overrides={})=>engine.parseAndRender(source.slice(0,start),{section:{id,settings:{...defaults(schema.settings),...overrides}},settings:globals});
(async()=>{
 for(const layout of ['split-50-50','split-60-40','split-40-60','single']){
  const output=await render('one',{layout,anchor_id:'custom:anchor',stack_on_mobile:false,reverse_on_mobile:true,left_video_url:'/one.mp4',right_video_url:'/two.mp4',left_content_position:'bottom-right',left_content_position_mobile:'top-left',left_cta_text:'Buy',left_cta_link:null})+await render('two',{layout,left_video_url:'/other.mp4'});
  const dom=new JSDOM(output,{runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,roots=[...w.document.querySelectorAll('[data-video-hero]')];
  assert.equal(roots.length,2);assert.equal(roots[0].id,'custom:anchor');assert.equal(roots[0].querySelectorAll('.q-sb-panel').length,layout==='single'?1:2);assert(!roots[0].querySelector('.q-sb-stack-mobile'));assert(roots[0].querySelector('.q-sb-reverse-mobile'));assert(!roots[0].querySelector('a'));
  const content=roots[0].querySelector('.q-sb-content');assert.equal(content.style.getPropertyValue('--q-sb-position-mobile'),'start start');assert.equal(content.style.getPropertyValue('--q-sb-position-desktop'),'end end');assert(!content.style.getPropertyValue('place-items'));
  const motion=new w.EventTarget();motion.matches=true;w.matchMedia=()=>motion;
  w.HTMLMediaElement.prototype.play=function(){this.dataset.playing='true';return Promise.resolve()};w.HTMLMediaElement.prototype.pause=function(){this.dataset.playing='false'};
  w.eval(fs.readFileSync('assets/video-hero-banner.js','utf8'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  roots.forEach(root=>root.querySelectorAll('video').forEach(video=>{assert(!video.autoplay);assert.equal(video.dataset.playing,'false')}));
  roots[0].querySelector('button').click();roots[0].querySelectorAll('video').forEach(video=>assert.equal(video.dataset.playing,'true'));assert.equal(roots[1].querySelector('video').dataset.playing,'false');
  roots[0].dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));roots[0].querySelectorAll('video').forEach(video=>assert.equal(video.dataset.playing,'false'));w.close();
 }
 const imageDom=new JSDOM(await render('image',{left_image:null,left_mobile_image:{width:960,height:640},right_cta_text:'Browse',right_cta_link:'/collections/all'}));assert.equal(imageDom.window.document.querySelector('img').getAttribute('width'),'960');assert(!imageDom.window.document.querySelector('img').classList.contains('q-sb-mobile-only'));assert.equal(imageDom.window.document.querySelector('a').getAttribute('href'),'/collections/all');imageDom.window.close();
 const css=fs.readFileSync('assets/standout-hero-banner.css','utf8'),cssDom=new JSDOM(`<style>${css}</style>`),rules=[...cssDom.window.document.styleSheets[0].cssRules].flatMap(r=>r.cssRules?[...r.cssRules]:[r]);
 for(const rule of rules)if(rule.selectorText)for(const selector of rule.selectorText.split(','))assert(selector.trim().startsWith('.q-standout-banner'),'all rules scoped');
 assert(!css.includes('attr(data-desktop-align)'));assert(rules.some(r=>r.selectorText?.includes('[data-panel="right"]')&&r.style.order==='-1'));cssDom.window.close();
 console.log('PASS Standout: four layouts, false stack setting, reverse grid order, desktop/mobile alignment properties, isolated media controls/reduced-motion/unload, mobile-only image fallback, scoped CSS and valid CTAs.');
})().catch(error=>{console.error(error);process.exitCode=1});
