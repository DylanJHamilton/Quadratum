const fs=require('node:fs'),assert=require('node:assert/strict');
const {Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const source=fs.readFileSync('sections/split-banner.liquid','utf8'),start=source.lastIndexOf('{% schema %}');
const schema=JSON.parse(source.slice(start+12).split('{% endschema %}')[0]);
const defaults=fields=>Object.fromEntries(fields.filter(x=>x.id).map(x=>[x.id,x.default??null]));
const globals=Object.assign({},...JSON.parse(fs.readFileSync('config/settings_schema.json')).map(x=>defaults(x.settings)));
const engine=new Liquid();engine.registerFilter('image_url',image=>{assert(image,'missing image must not reach image_url');return '/image.jpg'});engine.registerFilter('image_tag',url=>`<img src="${url}">`);
const render=(id,overrides={},blocks=[])=>engine.parseAndRender(source.slice(0,start),{section:{id,settings:{...defaults(schema.settings),...overrides},blocks},settings:globals});
(async()=>{
 for(const mode of ['stack','bg']) for(const container of ['full','contained']){
  const output=await render('one',{mobile_presentation:mode,container_mode:container,mobile_image:{id:1},image:null,anchor_id:'custom:anchor',use_theme_spacing:false,content_pad_y:'py-20 md:py-24',content_pad_x:'px-12 md:px-20'})+await render('two',{mobile_presentation:mode,container_mode:container});
  const dom=new JSDOM(output),doc=dom.window.document,roots=doc.querySelectorAll('[data-split-banner]');assert.equal(roots.length,2);assert.equal(roots[0].id,'custom:anchor');assert.equal(roots[1].id,'section-two');
  assert.equal(roots[0].querySelector('.q-inner').style.paddingTop,'','inline mobile padding cannot override desktop rule');
  const sheet=doc.styleSheets[0],flat=[...sheet.cssRules].flatMap(r=>r.cssRules?[...r.cssRules]:[r]);
  const inner=flat.filter(r=>r.selectorText==='#shopify-section-one [data-split-banner] .q-inner');assert.equal(inner[0].style.getPropertyValue('padding-top'),'80px');assert.equal(inner[1].style.getPropertyValue('padding-top'),'96px');assert.equal(inner[0].style.getPropertyValue('padding-left'),'48px');assert.equal(inner[1].style.getPropertyValue('padding-left'),'80px');
  const containerRule=flat.find(r=>r.selectorText==='#shopify-section-one [data-split-banner] .q-container');assert.equal(containerRule.style.width,container==='full'?'100vw':'100%');
  for(const rule of flat)if(rule.selectorText)for(const selector of rule.selectorText.split(','))assert(selector.trim().startsWith('#shopify-section-one '),'no leaking or anchor-derived selector');
  assert(!roots[1].querySelector('.q-panel--m-bg'),'missing background uses readable panel fallback');dom.window.close();
 }
 const block=(id,link)=>({id,type:'button',settings:{...defaults(schema.blocks[0].settings),link}});
 const dom=new JSDOM(await render('buttons',{},[block('blank',null),block('valid','/collections/all')]));assert.equal(dom.window.document.querySelectorAll('a').length,1);dom.window.close();
 const fallback=await render('spacing',{use_theme_spacing:false,content_pad_y:'py-20',content_pad_x:'px-12'});assert.equal((fallback.match(/padding-top: 80px/g)||[]).length,2,'desktop inherits base utility without md override');
 console.log('PASS Split Banner: both mobile modes/containers, exact spacing tokens and responsive inheritance, image guards, two instances, anchors, scoped CSS, empty background and CTA fallback.');
})().catch(error=>{console.error(error);process.exitCode=1});
