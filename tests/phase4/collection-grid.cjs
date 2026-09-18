const fs = require('node:fs'), assert = require('node:assert/strict');
const {Liquid} = require('liquidjs'), {JSDOM} = require('jsdom');
const engine = new Liquid({root:'snippets',extname:'.liquid'});
engine.registerFilter('image_url', () => '/collection.jpg');
const read = p => fs.readFileSync(p,'utf8');
const source = read('sections/feeds-collection-grid.liquid');
const schema = JSON.parse(source.split('{% schema %}')[1].split('{% endschema %}')[0]);
const defaults = fields => Object.fromEntries(fields.filter(f=>f.id).map(f=>[f.id,f.default??null]));
const collections = ['alpha','alphabet','beta'].map((handle,i)=>({handle,url:'/collections/'+handle,title:handle+' <sale>',description:'<p>Good & useful</p>',products_count:i,featured_image:{width:600,height:400,alt:'Image'}}));
async function feed(overrides={},all=collections){return new JSDOM(await engine.parseAndRender(source.split('{% schema %}')[0],{section:{id:'grid',settings:{...defaults(schema.settings),manual_collections:collections,...overrides}},collections:all,request:{page_type:'index'}}));}
const handles = d => [...d.window.document.querySelectorAll('.q-collection-card__link')].map(a=>a.getAttribute('href').split('/').at(-1));
(async()=>{
 for(const source_mode of ['manual','dynamic_all']){
  for(const [settings,expected] of [
   [{},['alpha','alphabet','beta']],
   [{include_handles:' ALPHA, beta '},['alpha','beta']],
   [{exclude_handles:' alpha, BETA '},['alphabet']],
   [{include_handles:'alpha,beta',exclude_handles:'beta'},['alpha']],
   [{title_contains:' ALPHA '},['alpha','alphabet']],
   [{include_handles:'missing'},[]]
  ]){const d=await feed({source_mode,...settings});assert.deepEqual(handles(d),expected);assert.equal(!!d.window.document.querySelector('.q-feed__empty'),!expected.length);d.window.close();}
 }
 for(const mode of ['manual','dynamic_all']){const d=await feed({source_mode:mode,manual_collections:[null,{title:'No URL'}]},[]);assert.equal(handles(d).length,0);assert(d.window.document.querySelector('.q-feed__empty'));assert(!d.window.document.querySelector('.q-feed__item'));d.window.close();}
 for(const value of [50,85,100]){const d=await feed({meta_opacity:value});assert(d.window.document.querySelector('article').getAttribute('style').includes('--q-cc-meta-opacity:'+value/100+';'));d.window.close();}
 const d=await feed({show_header:true,heading:'Shop <now>',show_image:false,show_count:false,show_description:true,enable_color_overrides:true,title_color:'#123456'});const doc=d.window.document;assert.equal(doc.querySelector('h2').textContent,'Shop <now>');assert(!doc.querySelector('img'));assert(!doc.querySelector('.q-collection-card__meta'));assert.equal(doc.querySelector('h3').textContent,'alpha <sale>');assert.equal(doc.querySelector('.q-collection-card__desc').textContent,'Good & useful');assert(doc.querySelector('article').getAttribute('style').includes('--q-cc-title-color:#123456'));d.window.close();
 for(const collection of [null,{}, {title:'No URL'}])assert.equal((await engine.renderFile('collection-card',{collection})).trim(),'');
 const card=new JSDOM(await engine.renderFile('collection-card',{collection:collections[0],subtitle:'A <subtitle>',body:'Plain <copy>',cta_label:'Shop <now>',overlay_text_enabled:true,overlay_text_source:'custom',overlay_custom_text:'Overlay <text>'}));const c=card.window.document;assert.equal(c.querySelector('.q-collection-card__subtitle').textContent,'A <subtitle>');assert.equal(c.querySelector('.q-collection-card__body').textContent,'Plain <copy>');assert.equal(c.querySelector('.q-collection-card__overlay-text').textContent,'Overlay <text>');assert.equal(c.querySelectorAll('a').length,2);assert(!c.querySelector('a a'));assert.equal(c.querySelector('.q-collection-card__cta-link').getAttribute('href'),collections[0].url);card.window.close();
 const spot=read('sections/featured-content-collection-spotlight.liquid'),ss=JSON.parse(spot.split('{% schema %}')[1].split('{% endschema %}')[0]);
 for(const layout of ['grid','carousel','split']){const html=await engine.parseAndRender(spot.split('{% schema %}')[0],{section:{id:'spot',settings:{...defaults(ss.settings),layout},blocks:collections.map((collection,i)=>({id:'b'+i,type:'collection',settings:{...defaults(ss.blocks[0].settings),collection,subtitle:'Safe <subtitle>',body:'Plain <body>'}}))}});const dom=new JSDOM(html);assert.equal(dom.window.document.querySelectorAll('[data-collection-card]').length,3);assert.equal(dom.window.document.querySelector('.q-collection-card__body').textContent,'Plain <body>');assert(!dom.window.document.querySelector('a a'));dom.window.close();}
 const preset=await feed(schema.presets[0].settings||{},[]);preset.window.close();
 console.log('PASS Collection Grid partial hardening: exact normalized include/exclude filters, source parity, title filtering, empty/missing collections, opacity endpoints, escaped text, false display controls, card CTA fallback and three Spotlight host layouts. Preset styling and complete host review remain open; no live certification.');
})().catch(e=>{console.error(e);process.exitCode=1});
