const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const defaults=fields=>Object.fromEntries(fields.filter(x=>x.id).map(x=>[x.id,x.default??null]));
const globals=Object.assign({},...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(x=>defaults(x.settings || [])));
function fixture(name){
 const source=fs.readFileSync(`sections/${name}.liquid`,'utf8'),start=source.lastIndexOf('{% schema %}'),schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
 const engine=new Liquid({root:['snippets'],extname:'.liquid'});engine.registerFilter('asset_url',s=>'/assets/'+s);engine.registerFilter('image_url',image=>{assert(image);return '/'+(image.id||'image')+'.jpg'});engine.registerFilter('image_tag',url=>`<img src="${url}">`);engine.registerFilter('color_modify',color=>color);engine.registerFilter('money',n=>`$${(n/100).toFixed(2)}`);
 const block=(type,id,settings={})=>({id,type,shopify_attributes:`data-editor-block="${id}"`,settings:{...defaults(schema.blocks.find(x=>x.type===type).settings),...settings}});
 const render=(id,settings={},blocks=[],theme={})=>engine.parseAndRender(source.slice(0,start),{section:{id,settings:{...defaults(schema.settings),...settings},blocks},settings:{...globals,...theme}});
 return {schema,block,render};
}
(async()=>{
 const audience=fixture('call-to-action-audience-source'),cards=fixture('call-to-action-card-stack'),split=fixture('call-to-action-split-content'),banner=fixture('call-to-action-banner');
 const sprite=new JSDOM(fs.readFileSync('assets/icons.svg','utf8'),{contentType:'image/svg+xml'});
 for(const f of [audience,cards,split,banner])for(const preset of f.schema.presets){
  const blocks=(preset.blocks||[]).map((b,i)=>f.block(b.type,`preset-${i}`,b.settings));const d=new JSDOM(await f.render('preset',preset.settings,blocks));
  for(const use of d.window.document.querySelectorAll('use'))assert(sprite.window.document.getElementById(use.getAttribute('href').split('#')[1]),'preset icon must exist in deployed sprite');d.window.close();
 }
 sprite.window.close();
 for(const source of ['GOOGLE','unknown','']){
  const blocks=['google','facebook'].map(key=>audience.block('audience_card',key,{source_key:key}));
  const d=new JSDOM(await audience.render('one',{anchor_id:'sale:2026',hide_non_matching:true},blocks)+await audience.render('two',{enable_utm_match:false,hide_non_matching:true},blocks),{url:'https://example.test/?utm_source='+source,runScripts:'outside-only',pretendToBeVisual:true}),w=d.window;
  const code=fs.readFileSync('assets/call-to-action-audience-source.js','utf8');w.eval(code);w.document.dispatchEvent(new w.Event('DOMContentLoaded'));w.eval(code);
  const roots=[...w.document.querySelectorAll('[data-audience-source]')];assert.equal(roots[0].id,'sale:2026');assert.equal(roots[0].querySelectorAll('[hidden]').length,source==='GOOGLE'?1:0);assert.equal(roots[1].querySelectorAll('[hidden]').length,0);
  const block=roots[0].querySelectorAll('[data-source-key]')[1];block.dispatchEvent(new w.Event('shopify:block:select',{bubbles:true}));assert.equal(roots[0].querySelectorAll('[hidden]').length,0);
  roots[0].dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert.equal(roots[0].querySelectorAll('[hidden]').length,source==='GOOGLE'?1:0);w.close();
 }
 for(const engine of ['grid','flex'])for(const mode of ['stacked','columns'])for(const variant of ['solid','outline','ghost']){
  const d=new JSDOM(await cards.render('cards',{layout_engine:engine,display_mode:mode,background_video:'https://youtu.be/video?x=1',button_radius:0,button_border_width:0},[cards.block('card_item','valid',{cta_link:'/collections/all'}),cards.block('card_item','empty',{cta_link:null})],{button_variant_default:variant}));
  assert(d.window.document.querySelector(`.q-grid.is-${engine}`));assert.equal(d.window.document.querySelectorAll('.q-card-cta a').length,1);assert(d.window.document.querySelector(`.q-btn--${variant}`));const iframe=d.window.document.querySelector('iframe');assert(!iframe.hasAttribute('src'));assert(iframe.dataset.videoHeroSrc.includes('/video?'));assert(d.window.document.querySelector('svg use'));d.window.close();
 }
 for(const ratio of ['40-60','50-50','60-40'])for(const side of ['left','right'])for(const type of ['youtube','vimeo']){
  const d=new JSDOM(await split.render('split',{ratio,media_position:side,media_type:'video_url',video_external:{id:'fixture',type},primary_link:null,secondary_link:null,highlight_mode:'gradient'}));
  assert(d.window.document.querySelector('.q-media-'+side));assert.equal(d.window.document.querySelectorAll('a').length,0);assert(d.window.document.querySelector('iframe').src.includes(type==='youtube'?'youtube.com/embed/fixture':'vimeo.com/video/fixture'));d.window.close();
 }
 const product={id:'p',title:'Sample product',url:'/products/sample',price_min:12500,featured_image:{id:'product'}};
 for(const layout of ['classic','web3','modern','product','newsletter']){
  const blocks=[banner.block('button','valid',{link:'/',label:'Browse'}),banner.block('button','empty',{link:null}),banner.block('product','product',{product}),banner.block('form','form')];
  const d=new JSDOM(await banner.render('one',{layout_variant:layout,anchor_id:'custom:anchor',section_radius:0,section_bg_opacity:0},blocks)+await banner.render('two',{layout_variant:layout},blocks));
  assert.equal(d.window.document.querySelector('[data-cta-banner]').id,'custom:anchor');
  for(const sheet of d.window.document.styleSheets)for(const rule of [...sheet.cssRules].flatMap(r=>r.cssRules?[...r.cssRules]:[r]))if(rule.selectorText)for(const selector of rule.selectorText.split(','))assert(selector.trim().startsWith('#shopify-section-'));
  if(layout==='newsletter'){
   const forms=[...d.window.document.querySelectorAll('form')];assert.equal(forms.length,2);assert.notEqual(forms[0].id,forms[1].id);
   for(const form of forms){assert(!form.noValidate);assert(form.querySelector('input[type=email]').required);assert(form.querySelector('input[type=checkbox]').required);assert.equal(form.querySelector('[name="contact[tags]"]').value,'newsletter');for(const label of form.querySelectorAll('label'))assert(d.window.document.getElementById(label.htmlFor));}
  }else{assert.equal(d.window.document.querySelectorAll('a').length,2);if(layout==='product'){assert.equal(d.window.document.querySelector('a').getAttribute('href'),product.url);assert(d.window.document.querySelector('.qcta__price').textContent.includes('$125.00'));}}
  d.window.close();
 }
 // Autoplay false must stay false, and a single explicit resume must start media.
 const d=new JSDOM(await banner.render('video',{mode:'media',video_url:'/video.mp4',video_autoplay:false}),{runScripts:'outside-only',pretendToBeVisual:true}),w=d.window;
 w.matchMedia=()=>{const m=new w.EventTarget();m.matches=false;return m};w.HTMLMediaElement.prototype.play=function(){this.dataset.playing='true';return Promise.resolve()};w.HTMLMediaElement.prototype.pause=function(){this.dataset.playing='false'};
 w.eval(fs.readFileSync('assets/section-hero-classic.js','utf8'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));const video=w.document.querySelector('video');assert(!video.autoplay);assert.equal(video.dataset.playing,'false');w.document.querySelector('[data-classic-pause]').click();assert.equal(video.dataset.playing,'true');w.document.querySelector('[data-classic-hero]').dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert.equal(video.dataset.playing,'false');w.close();
 console.log('PASS Audience Source/Card Stack/Split Content/CTA Banner: all insertion presets, deployed sprite symbols, source match/unmatched/disabled/editor behavior, grid/flex modes and theme button variants, provider embeds/ratios/order, five banner variants, product destinations/prices, blank links, unique newsletter IDs and native validation, video autoplay false and cleanup. Shopify submission/provider/layout acceptance remains open.');
})().catch(error=>{console.error(error);process.exitCode=1});
