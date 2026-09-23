const fs = require('node:fs'), assert = require('node:assert/strict');
const {Liquid} = require('liquidjs'), {JSDOM} = require('jsdom');
const read = path => fs.readFileSync(path,'utf8');
const defaults = fields => Object.fromEntries(fields.filter(field=>field.id).map(field=>[field.id,field.default??null]));
const engine = new Liquid({root:['snippets'],extname:'.liquid'});
engine.registerFilter('json',JSON.stringify);
engine.registerFilter('t',key=>({'cart.general.title':'Cart','general.search.title':'Search'}[key]||key));
engine.registerFilter('image_url',image=>{assert(image,'no empty image filter');return '/fixture.jpg';});
engine.registerFilter('image_tag',url=>'<img src="'+url+'" width="100" height="100" alt="">');
const globals = Object.assign({},...JSON.parse(read('config/settings_schema.json')).map(group=>defaults(group.settings)));
function component(name){const text=read('sections/'+name+'.liquid'),start=text.lastIndexOf('{% schema %}');return {text:text.slice(0,start),schema:JSON.parse(text.slice(start+12).split('{% endschema %}')[0])};}
(async()=>{
 const breadcrumb=component('sub-banner-breadcrumb');
 for(const kind of ['product','collection','article','blog','page','cart','search','list-collections']){
  for(const preset of breadcrumb.schema.presets){
   const hostile='Title "quoted" </script><script>bad()</script>';
   const context={request:{page_type:kind},template:{name:kind},page_title:'All collections',product:{title:hostile},collection:{title:'Collection',url:'/fr/collections/all'},article:{title:hostile},blog:{title:'News',url:'/fr/blogs/news'},page:{title:hostile}};
   const rendered=await engine.parseAndRender(breadcrumb.text,{...context,section:{id:'crumb-'+kind,settings:{...defaults(breadcrumb.schema.settings),...preset.settings,anchor_id:'custom:anchor',separator:'"</style>',enable_overlap:true,safe_offset_px:60},blocks:(preset.blocks||[]).map((block,i)=>({...block,id:'button'+i,settings:{...defaults(breadcrumb.schema.blocks[0].settings),...block.settings}}))},settings:globals,routes:{root_url:'/fr/'}});
   const dom=new JSDOM(rendered),doc=dom.window.document,json=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
   assert.equal(doc.querySelectorAll('script').length,1,'JSON title cannot terminate script');
   const crumbs=[...doc.querySelectorAll('.q-crumb [itemprop=name]')].map(node=>node.textContent);
   assert.deepEqual(json.itemListElement.map(item=>item.name),crumbs);
   assert.deepEqual(json.itemListElement.map(item=>item.position),crumbs.map((_,i)=>i+1));
   assert.equal(doc.querySelector('.q-crumb-link').getAttribute('href'),'/fr/');
   assert.equal(doc.querySelectorAll('[aria-current=page]').length,1);
   assert.equal(doc.querySelectorAll('a.q-btn').length,(preset.blocks||[]).length,'actual preset buttons render');
   assert.equal(doc.querySelector('.q-heading').textContent,context[kind]?.title||({'cart':'Cart','search':'Search','list-collections':'All collections'}[kind]));
   if(kind==='article')assert.equal(crumbs.length,3);
   const root=doc.querySelector('[data-breadcrumb-banner]');assert.equal(root.id,'custom:anchor');assert.equal(root.classList.contains('q-overlap'),preset.settings.layout_style==='media');
   assert(!doc.querySelector('style').textContent.includes('#custom:anchor'),'CSS scope independent of custom anchors');
   dom.window.close();
  }
 }
 const offers=component('special-offers-banner');
 for(const preset of offers.schema.presets){
  const blocks=(preset.blocks||[]).map((block,i)=>({id:'promo'+i,settings:defaults(offers.schema.blocks[0].settings),shopify_attributes:'data-editor-block="promo'+i+'"'}));
  const render=async(id,overrides={})=>engine.parseAndRender(offers.text,{section:{id,settings:{...defaults(offers.schema.settings),...preset.settings,...overrides},blocks},settings:globals});
  const defaultDom=new JSDOM(await render('defaults',{anchor_id:'offers-anchor'}));const doc=defaultDom.window.document;
  assert.equal(doc.querySelectorAll('.q-card').length,blocks.length);assert.equal(doc.querySelector('[data-video-hero]').id,'offers-anchor');assert.equal(doc.querySelector('[data-variant=primary]').getAttribute('href'),'/collections/all');
  if(blocks.length)assert(doc.querySelector('.q-card').hasAttribute('data-editor-block'));
  assert(!doc.querySelector('video'));defaultDom.window.close();
  const dom=new JSDOM(await render('one',{background_mode:'video',background_video:'/background.mp4',hide_on_mobile:true})+await render('two',{background_mode:'video',background_video:'/background.mp4'}),{runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window,queries=[];
  const motion=new w.EventTarget();motion.matches=false;const mobile=new w.EventTarget();mobile.matches=true;
  w.matchMedia=query=>{queries.push(query);return query.includes('reduced')?motion:mobile};
  w.HTMLMediaElement.prototype.play=function(){this.dataset.playing='true';return Promise.resolve()};w.HTMLMediaElement.prototype.pause=function(){this.dataset.playing='false'};
  w.eval(read('assets/video-hero-banner.js'));w.eval(read('assets/video-hero-banner.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  const roots=[...w.document.querySelectorAll('[data-video-hero]')];assert(queries.includes('(max-width: 767px)'));assert.equal(roots[0].querySelector('video').dataset.playing,'false');assert.equal(roots[1].querySelector('video').dataset.playing,'true');assert(!roots[1].querySelector('video').hasAttribute('autoplay'));
  roots[1].querySelector('[data-video-hero-toggle]').click();assert.equal(roots[1].querySelector('video').dataset.playing,'false');
  roots[1].dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert(roots[1].querySelector('[data-video-hero-toggle]').hidden);
  roots[1].dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));assert.equal(roots[1].querySelector('video').dataset.playing,'true');w.close();
 }
 console.log('PASS Breadcrumb: eight page contexts, both presets, article chain, matching JSON-LD/visible labels, title escaping, custom anchor, overlap gating.');
 console.log('PASS Special Offers: all three actual presets, promo counts/editor attributes, default links, two-instance media, viewport boundary, pause and unload/reload.');
})().catch(error=>{console.error(error);process.exitCode=1});
