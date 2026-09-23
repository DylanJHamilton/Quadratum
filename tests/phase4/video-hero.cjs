const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const read=path=>fs.readFileSync(path,'utf8');
const source=read('sections/video-hero-banner.liquid');const start=source.lastIndexOf('{% schema %}');const schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
const settings=Object.fromEntries(schema.settings.filter(field=>field.id).map(field=>[field.id,field.default??null]));
const engine=new Liquid();engine.registerFilter('color_contrast',()=>21);
(async()=>{
 const defaultHtml=await engine.parseAndRender(source.slice(0,start),{section:{id:'default',settings}});assert(!defaultHtml.includes('example.com'));const initial=new JSDOM(defaultHtml);assert.equal(initial.window.document.querySelectorAll('video,iframe').length,0);assert(initial.window.document.querySelector('a[href="/collections/all"]'));initial.window.close();
 for(const input of ['fixtureID','https://youtu.be/fixtureID?t=30','https://www.youtube.com/watch?v=fixtureID&feature=share','https://www.youtube.com/embed/fixtureID','https://www.youtube.com/shorts/fixtureID']){
  const html=await engine.parseAndRender(source.slice(0,start),{section:{id:'video',settings:{...settings,video_source:'youtube',youtube_input:input}}});const d=new JSDOM(html);const frame=d.window.document.querySelector('iframe');assert(frame.dataset.videoHeroSrc.startsWith('https://www.youtube.com/embed/fixtureID?'));assert(!frame.hasAttribute('src'));assert(frame.hidden);d.window.close();
 }
 console.log('PASS Video Hero actual Liquid: no demo media/external links in defaults; common YouTube URL formats; deferred decorative iframe.');
 for(const reduced of [true,false]){
  const markup=id=>`<section id="${id}" data-video-hero><video></video><iframe hidden data-video-hero-src="https://player.vimeo.com/video/1"></iframe><button data-video-hero-toggle hidden></button></section>`;
  const d=new JSDOM(markup('first')+markup('second'),{runScripts:'outside-only',pretendToBeVisual:true}),w=d.window;
  const motion=new w.EventTarget(),mobile=new w.EventTarget();motion.matches=reduced;mobile.matches=false;w.matchMedia=query=>query.includes('reduced')?motion:mobile;
  w.document.querySelectorAll('video').forEach(video=>{video.play=()=>{video.dataset.playing='true';return Promise.resolve()};video.pause=()=>{video.dataset.playing='false'}});
  w.eval(read('assets/video-hero-banner.js'));w.eval(read('assets/video-hero-banner.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  const first=w.document.getElementById('first'),second=w.document.getElementById('second');assert.equal(first.querySelector('video').dataset.playing,String(!reduced));assert.equal(first.querySelector('iframe').hasAttribute('src'),!reduced);
  first.querySelector('button').click();assert.equal(first.querySelector('video').dataset.playing,String(reduced));assert.equal(second.querySelector('video').dataset.playing,String(!reduced),'instances independent');
  Object.defineProperty(w.document,'hidden',{configurable:true,value:true});w.document.dispatchEvent(new w.Event('visibilitychange'));assert.equal(w.document.querySelectorAll('iframe[src]').length,0);
  Object.defineProperty(w.document,'hidden',{configurable:true,value:false});w.document.dispatchEvent(new w.Event('visibilitychange'));
  first.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert.equal(first.querySelector('video').dataset.playing,'false');assert(first.querySelector('button').hidden);
  first.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert(!first.querySelector('button').hidden);
  first.classList.add('hide-mobile');mobile.matches=true;mobile.dispatchEvent(new w.Event('change'));assert.equal(first.querySelector('video').dataset.playing,'false');assert(!first.querySelector('iframe').hasAttribute('src'));d.window.close();
 }
 console.log('PASS Video Hero: two instances, duplicate boot, manual play/pause, reduced-motion default, document/viewport visibility, root unload/reload and embed cleanup.');
})().catch(error=>{console.error(error);process.exitCode=1});
