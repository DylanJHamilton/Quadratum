const fs = require('node:fs');
const assert = require('node:assert/strict');
const { Liquid } = require('liquidjs');
const { JSDOM } = require('jsdom');
const read = path => fs.readFileSync(path, 'utf8');
const engine = new Liquid({root: 'snippets', extname: '.liquid'});
engine.registerFilter('json', JSON.stringify);
const defaults = Object.assign({}, ...JSON.parse(read('config/settings_schema.json')).map(group => Object.fromEntries((group.settings || []).filter(s => s.id).map(s => [s.id, s.default ?? null]))));
const globals = settings => ({settings: {...defaults, ...settings}, search: {terms: 'red & <blue>'}, routes: {search_url: '/fr/search', root_url: '/fr/', collections_url: '/fr/collections'}, shop: {currency: 'EUR'}, cart: {currency: {iso_code: 'EUR'}}});
const render = (name, settings = {}, params = {}) => engine.parseAndRender(read('snippets/'+name+'.liquid'), {input_id:'input',panel_id:'panel', ...params}, {globals: globals(settings)});
const payload = {resources:{results:{products:[
 {title:'Price <safe>',url:'/fr/products/one?variant=2&ref=search',price:'19.95',image:'/fixture.jpg'},
 {title:'Free',url:'/fr/products/free',price:0,featured_image:{url:'/square.jpg'}},
 {title:'Numeric',url:'/fr/products/numeric',price:32.5},
 {title:'Blank link',url:''}
],collections:[{title:'Collection',url:'/fr/collections/one'}],articles:[{title:'Article',url:'/fr/blogs/news/one',author:'Author <safe>'}],pages:[{title:'Page',url:'/fr/pages/one'}]}}};
const drain = async () => { for (let i=0;i<8;i++) await Promise.resolve(); };
function fixture(html) {
 const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://example.test/fr/'}),w=dom.window;
 w.HTMLElement.prototype.scrollIntoView=function(){};
 w.Shopify={routes:{root:'/fr/'},currency:{active:'EUR'}};
 const timers=new Map();let serial=0;
 w.setTimeout=fn=>{timers.set(++serial,fn);return serial;};w.clearTimeout=id=>timers.delete(id);
 const requests=[];
 w.fetch=(url,options)=>new Promise((resolve,reject)=>requests.push({url:new URL(url),...options,resolve,reject}));
 const boot=()=>{w.eval(read('assets/predictive-search.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));};
 const tick=async()=>{const current=[...timers.values()];timers.clear();current.forEach(fn=>fn());await drain();};
 const type=(value,root=w.document)=>{const input=root.querySelector('[data-qtm-predictive-input]');input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));return input;};
 const answer=async(request,data=payload)=>{request.resolve({ok:true,json:async()=>data});await drain();};
 return {dom,w,requests,timers,boot,tick,type,answer};
}
(async()=>{
 // All sixteen source combinations in each shared helper: native request contract, no unsupported collection type.
 for(let mask=0;mask<16;mask++) {
  const settings=Object.fromEntries(['products','articles','pages','collections'].map((key,i)=>['search_src_'+key,!!(mask&(1<<i))]));
  const expected=['product','article','page'].filter((_,i)=>mask&(1<<i)).join(',');
  for(const name of ['search-form-static','search-form-predictive','predictive-search']) {
   const dom=new JSDOM(await render(name,settings));const d=dom.window.document,form=d.querySelector('form'),data=new dom.window.FormData(form);
   assert.equal(form.getAttribute('action'),'/fr/search');assert.equal(data.get('type'),expected||null);
   assert.equal(data.get('q'),expected?'red & <blue>':null);assert.equal(d.querySelector('button[type=submit]').disabled,!expected);
   if(!expected) assert.equal(d.querySelector('input[type=search]').disabled,name==='search-form-static'||!settings.search_src_collections);
   dom.window.close();
  }
 }
 for(const name of ['search-form-predictive','predictive-search']) {
  const d=new JSDOM(await render(name,{enable_predictive_search:false,search_submit_label:'Find <safe>'}));
  assert(!d.window.document.querySelector('[data-qtm-predictive-search]'));assert(!d.window.document.querySelector('[role=combobox]'));
  assert.equal(d.window.document.querySelector('button').textContent.trim(),'Find <safe>');d.window.close();
 }
 const headerSource=read('sections/header-two.liquid').split('{% schema %}')[0];
 const header=new JSDOM(await engine.parseAndRender(headerSource,{section:{id:'two',settings:{search_display:'inline'},blocks:[]}},{globals:globals({search_src_articles:false})}));
 assert.equal(header.window.document.querySelectorAll('form[role=search]').length,2);
 for(const form of header.window.document.querySelectorAll('form[role=search]'))assert.equal(new header.window.FormData(form).get('type'),'product,page');header.window.close();
 // Retained dormant configuration hook matches current settings; it is not activated by this repair.
 for(const mode of ['static','predictive'])for(const enabled of [true,false]) {
  const html=await render('search-controller',{search_default_form_type:mode,enable_predictive_search:enabled,search_src_articles:false});
  const d=new JSDOM(html,{runScripts:'dangerously'});assert.equal(d.window.QTM_SEARCH.mode,enabled?mode:'static');assert.equal(d.window.QTM_SEARCH.sources.articles,false);assert.equal(d.window.QTM_SEARCH.limits.products,4);d.window.close();
 }
 // Both helpers emit the same settings, including explicit false and zero values, for all visual choices.
 const css=read('assets/predictive-search.css');
 for(const helper of ['search-form-predictive','predictive-search'])for(const style of ['minimal','soft','outline','glass'])for(const layout of ['list','compact','grid']) {
  const f=fixture(await render(helper,{predictive_search_panel_style:style,predictive_search_products_layout:layout,predictive_search_panel_radius:0,predictive_search_item_radius:0,predictive_search_show_group_headings:false,predictive_search_show_thumbnails:false,predictive_search_show_view_all:false,predictive_search_products_limit:2}));
  const root=f.w.document.querySelector('[data-qtm-predictive-search]');assert(root.classList.contains('qtm-search-form--predictive-'+style));assert.equal(root.style.getPropertyValue('--qtm-ps-panel-radius'),'0px');
  for(const variable of [...root.getAttribute('style').matchAll(/(--qtm-ps-[\w-]+):/g)].map(x=>x[1]))assert(css.includes('var('+variable+','),variable+' has a CSS consumer');
  f.boot();f.type('red');await f.tick();assert.equal(f.requests.length,1);
  const request=f.requests[0];assert.equal(request.url.pathname,'/fr/search/suggest.json');assert.equal(request.url.searchParams.get('resources[limit_scope]'),'each');
  await f.answer(request);assert.equal(root.querySelectorAll('.qtm-search-predictive__item').length,5);
  assert(!root.querySelector('h3'));assert(!root.querySelector('img'));assert(!root.querySelector('.qtm-search-predictive__view-all'));
  assert(root.querySelector('.qtm-search-predictive__items--'+layout));assert.equal(root.querySelector('.qtm-search-predictive__title').textContent,'Price <safe>');
  assert.match(root.querySelector('.qtm-search-predictive__price').textContent,/19[.,]95/);assert(!root.querySelector('safe'));
  assert.match(root.querySelectorAll('.qtm-search-predictive__price')[1].textContent,/0[.,]00/);f.dom.window.close();
 }
 // Limits include only enabled sources, with typed view-all links and actionable options.
 const f=fixture(await render('search-form-predictive',{search_src_collections:false,search_src_articles:false,search_src_pages:false,predictive_search_products_limit:3,predictive_search_pages_limit:10}));
 f.boot();f.boot();const input=f.type('price');await f.tick();assert.equal(f.requests.length,1);assert.equal(f.requests[0].url.searchParams.get('resources[limit]'),'3');assert.equal(f.requests[0].url.searchParams.get('resources[type]'),'product');
 await f.answer(f.requests[0]);const panel=f.w.document.querySelector('[data-qtm-predictive-panel]');assert(!panel.hidden);assert.equal(panel.querySelectorAll('img').length,2);
 assert.match(panel.querySelectorAll('.qtm-search-predictive__price')[2].textContent,/32[.,]50/);
 const viewAll=panel.querySelector('.qtm-search-predictive__view-all');assert.equal(new URL(viewAll.href).searchParams.get('type'),'product');assert.equal(new URL(viewAll.href).pathname,'/fr/search');
 input.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'ArrowUp',bubbles:true,cancelable:true}));assert.equal(input.getAttribute('aria-activedescendant'),viewAll.id);
 let selected=false;viewAll.addEventListener('click',e=>{e.preventDefault();selected=true;});input.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));assert(selected);
 // A new query closes stale options immediately; late completion and rejection cannot replace new results.
 f.type('first');assert(panel.hidden);assert(!input.hasAttribute('aria-activedescendant'));await f.tick();const first=f.requests.at(-1);
 f.type('second');assert(first.signal.aborted);await f.tick();const second=f.requests.at(-1);await f.answer(second);
 first.reject(new Error('late failure'));await drain();assert(!panel.hidden);
 f.type('third');await f.tick();const third=f.requests.at(-1);
 input.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));assert(third.signal.aborted);await f.answer(third);assert(panel.hidden);
 // IME waits for composition; section unload aborts work and removes handlers; same root reloads once.
 input.dispatchEvent(new f.w.CompositionEvent('compositionstart'));f.type('composing');await f.tick();const before=f.requests.length;
 input.dispatchEvent(new f.w.CompositionEvent('compositionend'));await f.tick();assert.equal(f.requests.length,before+1);const pending=f.requests.at(-1);
 const root=f.w.document.querySelector('[data-qtm-predictive-search]');root.dispatchEvent(new f.w.Event('shopify:section:unload',{bubbles:true}));assert(pending.signal.aborted);assert(!root.dataset.qtmPredictiveReady);
 f.type('unloaded');await f.tick();assert.equal(f.requests.length,before+1);await f.answer(pending);assert(panel.hidden);
 root.dispatchEvent(new f.w.Event('shopify:section:load',{bubbles:true}));f.type('reload');await f.tick();assert.equal(f.requests.length,before+2);await f.answer(f.requests.at(-1),{resources:{results:{}}});assert(panel.textContent.includes('No matches'));
 input.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Tab',bubbles:true}));assert(panel.hidden);
 f.type('error');await f.tick();f.requests.at(-1).resolve({ok:false});await drain();assert(panel.hidden);f.dom.window.close();
 // Collection-only suggestions have no full-search link or native query submission; all-off never fetches.
 for(const collections of [true,false]) {
  const x=fixture(await render('search-form-predictive',{search_src_products:false,search_src_articles:false,search_src_pages:false,search_src_collections:collections},{show_button:false}));x.boot();x.type('test');await x.tick();assert.equal(x.requests.length,collections?1:0);
  if(collections){assert(x.w.document.querySelector('noscript').textContent.includes('Browse collections'));assert.equal(x.requests[0].url.searchParams.get('resources[type]'),'collection');await x.answer(x.requests[0]);assert.equal(x.w.document.querySelectorAll('[data-qtm-option]').length,1);assert(!x.w.document.querySelector('.qtm-search-predictive__view-all'));}
  const submit=new x.w.Event('submit',{bubbles:true,cancelable:true});x.w.document.querySelector('form').dispatchEvent(submit);assert(submit.defaultPrevented);x.dom.window.close();
 }
 // Simultaneous hosts keep identities/state independent; popup mode/master switch and close integration.
 for(const mode of ['static','predictive'])for(const enabled of [true,false]) {
  const html=await render('search-popup',{enable_search_popup:true,search_popup_form_type:mode,enable_predictive_search:enabled});
  const d=new JSDOM(html);assert.equal(!!d.window.document.querySelector('[data-qtm-predictive-search]'),mode==='predictive'&&enabled);d.window.close();
 }
 const pair=fixture('<button data-search-popup-open>Open</button>'+await render('search-popup',{enable_search_popup:true,search_popup_form_type:'predictive'})+await render('search-form-predictive',{}, {input_id:'second-input',panel_id:'second-panel'}));
 pair.w.eval(read('assets/search-popup.js'));pair.boot();pair.w.document.querySelector('[data-search-popup-open]').click();await pair.tick();
 const popup=pair.w.document.querySelector('#QtmSearchPopup');pair.type('popup',popup);await pair.tick();await pair.answer(pair.requests.at(-1));
 const popupInput=popup.querySelector('input[type=search]');popupInput.dispatchEvent(new pair.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));assert(!popup.hidden,'First Escape closes suggestions');
 popupInput.dispatchEvent(new pair.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));assert(popup.hidden,'Second Escape closes dialog');
 pair.w.document.querySelector('[data-search-popup-open]').click();await pair.tick();pair.type('close during request',popup);await pair.tick();const inFlight=pair.requests.at(-1);pair.w.document.querySelector('[data-search-popup-close]').click();assert(inFlight.signal.aborted);await pair.answer(inFlight);assert(popup.querySelector('[data-qtm-predictive-panel]').hidden);
 const other=pair.w.document.querySelector('#second-input').closest('[data-qtm-predictive-search]');pair.type('other',other);await pair.tick();await pair.answer(pair.requests.at(-1));assert(!other.querySelector('[data-qtm-predictive-panel]').hidden);assert(popup.querySelector('[data-qtm-predictive-panel]').hidden);
 const ids=[...pair.w.document.querySelectorAll('[id]')].map(n=>n.id);assert.equal(ids.length,new Set(ids).size);pair.dom.window.close();
 console.log('PASS shared search contracts: 16 source combinations, localized typed forms/Header Two/view-all, master/popup modes, both predictive helpers × 4 panel styles × 3 product layouts, display toggles/style-variable consumers, decimal prices, per-type limits, safe text, keyboard/IME, request races/errors, two hosts, popup close, editor unload/reload. DOM fixtures are not Shopify/browser acceptance.');
})().catch(error=>{console.error(error);process.exitCode=1;});
