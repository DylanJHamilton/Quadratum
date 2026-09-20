const fs=require('node:fs'),assert=require('node:assert/strict'),{Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8'),engine=new Liquid({root:'snippets',extname:'.liquid'});
for(const [name,fn] of Object.entries({asset_url:x=>'/assets/'+x,stylesheet_tag:x=>`<link rel="stylesheet" href="${x}">`,image_url:x=>x?.url||'/image.jpg',image_tag:()=>'<img src="/image.jpg" width="600" height="400" alt="">',money:x=>'$'+(Number(x)/100).toFixed(2),json:JSON.stringify,t:x=>x,handleize:x=>String(x).toLowerCase().replace(/[^a-z0-9]+/g,'-')}))engine.registerFilter(name,fn);
const defs=fields=>Object.fromEntries((fields||[]).filter(f=>f.id).map(f=>[f.id,f.default??null]));
const source=name=>{const s=read('sections/'+name+'.liquid').split('{% schema %}');return {source:s[0].replace(/{%-?\s*(?:paginate|endpaginate)\b[^%]*%}/g,''),schema:JSON.parse(s[1].split('{% endschema %}')[0])};};
const variant=(id,available=true,price=1234)=>({id,title:'Option <'+id+'>',available,price,compare_at_price:2000,options:['M'],featured_media:{preview_image:{url:'/photo.jpg',width:600,height:400,aspect_ratio:1.5}}});
const v=variant(11),image={url:'/photo.jpg',width:600,height:400,aspect_ratio:1.5};
const product={id:1,url:'/fr/products/one',handle:'one',title:'Product <safe>',vendor:'Vendor <safe>',object_type:'product',available:true,has_only_default_variant:true,variants:[v],options:['Title'],selected_or_first_available_variant:v,price:1234,compare_at_price:2000,featured_media:{preview_image:image},featured_image:image,media:[{media_type:'image',preview_image:image},{media_type:'video',preview_image:image}],metafields:{reviews:{rating:{value:{rating:4,scale_max:5}},rating_count:{value:12}}}};
const av={param_name:'filter.v.option.color',value:'Red & blue',label:'Color <safe>',count:3,active:true,url_to_remove:'/fr/collections/all?sort_by=price-ascending'};
const price={type:'price_range',label:'Price',range_max:10000,min_value:{param_name:'filter.v.price.gte',value:1250},max_value:{param_name:'filter.v.price.lte',value:9875},url_to_remove:'/fr/collections/all?filter.v.option.color=red'};
const collection={title:'Collection <safe>',url:'/fr/collections/all',description:'<p>Rich description</p>',products:[product],products_count:25,sort_by:'price-ascending',default_sort_by:'manual',sort_options:[{value:'manual',name:'Featured'},{value:'price-ascending',name:'Price <safe>'}],filters:[{type:'list',label:'Color',values:[av,{...av,value:'None',count:0,active:false}],active_values:[av]},price]};
const page={items:25,pages:3,current_page:1,next:{url:'/fr/collections/all?page=2'},parts:[{title:'1',is_link:false},{title:'2',is_link:true,url:'?page=2'},{title:'…',is_link:false}]};
const globals={routes:{cart_url:'/fr/cart',cart_add_url:'/fr/cart/add',search_url:'/fr/search'},settings:{cart_mode:'ajax_drawer'},request:{page_type:'collection',design_mode:false},collection,search:{results:[],results_count:0}};
async function render(name,settings={},extra={},id='one') {const a=source(name);return engine.parseAndRender(a.source,{section:{id,settings:{...defs(a.schema.settings),...settings},blocks:[]},paginate:page,...extra},{globals:{...globals,...extra}});}
const snippet=(name,args={},extra={})=>engine.renderFile(name,args,{globals:{...globals,...extra}});
const doc=html=>new JSDOM(html).window.document;
const drain=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
(async()=>{
 for(const name of ['main-collection-classic','main-collection-simple']){
  const a=source(name),layouts=a.schema.settings.find(f=>f.id===(name.endsWith('simple')?'layout_preset':'layout')).options;
  for(const layout of layouts){
   const simple=name.endsWith('simple'),html=await render(name,{[simple?'layout_preset':'layout']:layout.value,show_quick_add:true,enable_quick_add:true,show_action_row:true,card_engine:'modern_card'}),d=doc(html);
   assert.equal(d.querySelector('h1').textContent.trim(),'Collection <safe>');assert(!d.querySelector('safe'));
   for(const form of d.querySelectorAll('form[method=post]')){assert.equal(form.getAttribute('action'),'/fr/cart/add');assert.equal(form.querySelector('[name=id]').value,'11');}
   assert.equal(d.querySelectorAll('input[type=checkbox][value="Red & blue"]').length,1,'Only one enabled filter copy '+layout.value);
   const min=d.querySelector('input[type=number][name="filter.v.price.gte"]');assert.equal(min.value,'12.5');assert(min.form,'Filter must have a real native form owner');
   assert.equal(new d.defaultView.FormData(min.form).get('filter.v.price.gte'),'12.5');
   assert(!min.form.querySelector('form'));assert(!min.form.querySelector('.q-product-card'));
   assert.equal(d.querySelectorAll('[aria-current=page]').length,1,'Ellipsis is not a current page');
   const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Unique IDs per host');d.defaultView.close();
  }
  // Full schema choice/boolean/range endpoint rendering plus presets through the actual section.
  for(const f of a.schema.settings){const values=f.type==='select'?f.options.map(o=>o.value):f.type==='checkbox'?[true,false]:f.type==='range'?[f.min,f.max]:[];for(const value of values)await render(name,{[f.id]:value});}
  for(const preset of a.schema.presets||[])await render(name,preset.settings||{});
 }
 for(const filter_presentation of ['sidebar','drawer','bar'])for(const sort_style of ['dropdown','pills']){
  const d=doc(await render('main-collection-simple',{filter_presentation,sort_style}));const form=d.querySelector('.qcmSortPills');const data=new d.defaultView.FormData(form);
  assert.equal(data.get('filter.v.option.color'),'Red & blue');assert.equal(data.get('filter.v.price.gte'),'12.5');assert(!data.has('page'));
  assert(d.querySelector('[data-qcm-facets-form] button[type=submit]'));assert(d.body.textContent.includes('25 results'));
  if(filter_presentation==='drawer')assert(!d.querySelector('[data-qcm-drawer-fallback]').hidden);
  d.defaultView.close();
 }
 const alternate={...collection,title:'Alternate',products_count:8};let d=doc(await render('main-collection-simple',{use_alt_collection:true,alt_collection:alternate},{request:{page_type:'search'}}));assert.equal(d.querySelectorAll('[data-qcm-item]').length,1);assert(d.body.textContent.includes('8 results'));d.defaultView.close();
 d=doc(await render('main-collection-simple',{}, {request:{page_type:'search'},search:{...collection,results:[product,{object_type:'page',url:'/fr/pages/a',title:'Page <safe>'}],results_count:2,terms:'boots & bags'}}));assert.equal(d.querySelectorAll('[data-qcm-item]').length,2);assert.equal(d.querySelector('[name=q]').value,'boots & bags');assert.equal(d.querySelector('[name=type]').value,'product');d.defaultView.close();
 // Shared card: concrete variant IDs, locale and subscription safeguards, escaped owned text and explicit false settings.
 for(const name of ['product-card','collection-simple-product-card','collection-modern-product-card']){
  assert(!(await snippet(name,{product:null,s:{}})).trim());
  for(const requires_selling_plan of [true,false]){
   const p={...product,requires_selling_plan};d=doc(await snippet(name,{product:p,s:{show_quick_add:true,show_price:true,show_vendor:true,show_rating:true},enable_quick_add:true,show_action_row:true}));assert(!d.querySelector('safe'));assert.equal(d.querySelectorAll('form').length,requires_selling_plan?0:(name==='product-card'?2:1));d.defaultView.close();
  }
 }
 d=doc(await snippet('product-card',{product:{...product,options:['Color','Size'],variants:[{...v,options:['Red','M']},{...v,id:12,options:['Blue','M']}],has_only_default_variant:false},enable_quick_add:true,quick_add_mode:'sizes'}));assert(!d.querySelector('form'),'Cannot silently choose a color from size only');assert(d.querySelector('.q-product-card__action[href]'));d.defaultView.close();
 d=doc(await snippet('product-card',{product:{...product,options:['Size'],variants:[variant(1,false),variant(2)],selected_or_first_available_variant:variant(2)},enable_quick_add:true,quick_add_mode:'dropdown'}));assert.equal(d.querySelector('select').value,'2');d.defaultView.close();
 d=doc(await snippet('product-card',{product,show_price:false,enable_quick_add:false,enable_quick_view:true,quick_view_placement:'none'}));assert(!d.querySelector('.q-product-card__price'));assert(!d.querySelector('[data-pc-hover]'));d.defaultView.close();
 d=doc(await snippet('collection-simple-product-card',{product,s:{show_rating:true,show_price:true}}));assert.equal(d.querySelector('.qcmRating').getAttribute('aria-label'),'4 out of 5 stars');assert(d.querySelector('article').getAttribute('style').includes('66.666'));d.defaultView.close();
 d=doc(await snippet('product-card',{product:{...product,price_varies:true,price_min:1234,price_max:2500},price_mode:'range'}));assert(d.querySelector('.q-product-card__price').textContent.includes('$12.34 – $25.00'));d.defaultView.close();
 // Legacy native contracts and quick filters; no unsupported sort_options.url fixture.
 for(const name of ['collection-modern-sort','section-collection-modern-sort'])for(const sort_style of ['pills','dropdown']){
  d=doc(await snippet(name,{section:{id:'legacy'},s:{sort_style},sort_options:collection.sort_options,filters:collection.filters,results_url:collection.url,sort_by:collection.sort_by}));assert(d.querySelector('form'));assert(!d.querySelector('a[href=""]'));assert.equal(new d.defaultView.FormData(d.querySelector('form')).get('filter.v.price.gte'),'12.5');d.defaultView.close();
 }
 for(const name of ['collection-modern-facets','section-collection-modern-facets'])assert(!(await snippet(name,{filters:[]})).trim());
 assert(!(await snippet('collection-modern-quick-filters',{section:{blocks:[]},filters:collection.filters})).trim());
 const url=(await snippet('section-collection-modern-utils',{is_search_context:true,terms_q:'boots & bags',sort_by:'price-ascending'})).trim();assert.equal(new URL(url,'https://shop.test').searchParams.get('q'),'boots & bags');assert(url.startsWith('/fr/search?'));assert(url.includes('&type=product')); 
 for(const requires_selling_plan of [true,false]){d=doc(await render('collection-modern-quick-view',{}, {product:{...product,requires_selling_plan,variants:[v,variant(22)]}}));assert.equal(d.querySelectorAll('form').length,requires_selling_plan?0:1);if(!requires_selling_plan){const select=d.querySelector('select');select.value='22';assert.equal(new d.defaultView.FormData(select.form).get('id'),'22');}d.defaultView.close();}
 // Real shared controller: two instances, modal focus, abort/stale response, native error recovery.
 const html=await render('main-collection-simple',{filter_presentation:'drawer',pagination_style:'load_more'}, {},'first')+await render('main-collection-simple',{pagination_style:'load_more'}, {},'second');
 const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://shop.test/fr/collections/all'}),w=dom.window,requests=[];
 w.fetch=(url,opts)=>new Promise((resolve,reject)=>requests.push({url,opts,resolve,reject}));w.eval(read('assets/section-collection-simple.js'));w.eval(read('assets/section-collection-simple.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 const root=w.document.querySelector('#QtmCollectionModern-first'),open=root.querySelector('[data-qcm-drawer-open]'),drawer=root.querySelector('[data-qcm-drawer]');assert(!open.hidden);assert(root.querySelector('[data-qcm-drawer-fallback]').hidden);open.focus();open.click();assert(!drawer.hidden);assert(drawer.contains(w.document.activeElement));w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(drawer.hidden);assert.equal(w.document.activeElement,open);
 const link=root.querySelector('[data-qcm-loadmore]');link.click();link.click();assert.equal(requests.length,1);
 const next=(await render('main-collection-simple',{pagination_style:'load_more'}, {},'first')).replaceAll('page=2','page=3');requests[0].resolve({ok:true,text:async()=>next});await drain();assert.equal(root.querySelectorAll('[data-qcm-item]').length,2);assert(link.href.endsWith('page=3'));assert.equal(w.document.querySelector('#QtmCollectionModern-second').querySelectorAll('[data-qcm-item]').length,1);
 link.click();root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert(requests[1].opts.signal.aborted);requests[1].resolve({ok:true,text:async()=>next});await drain();assert.equal(root.querySelectorAll('[data-qcm-item]').length,2);root.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));link.click();requests[2].reject(new Error('offline'));await drain();assert(root.querySelector('[data-qcm-status]').textContent.includes('next-page'));assert(link.href.endsWith('page=3'));dom.window.close();
 // Infinite scroll respects reduced motion and disposes observers; native links remain without fetch.
 for(const reduced of [true,false]){
  const testDom=new JSDOM(await render('main-collection-classic',{pagination_type:'infinite_scroll'}, {},'infinite'),{url:'https://shop.test/fr/collections/all',runScripts:'outside-only'}),tw=testDom.window,observers=[];
  tw.matchMedia=()=>({matches:reduced,addEventListener(){}});tw.fetch=async()=>({ok:false});
  tw.IntersectionObserver=class {constructor(fn){this.fn=fn;observers.push(this);}observe(el){this.el=el;}disconnect(){this.disconnected=true;}};
  tw.eval(read('assets/section-collection-simple.js'));tw.document.dispatchEvent(new tw.Event('DOMContentLoaded'));
  assert.equal(observers.length,reduced?0:1);const tr=tw.document.querySelector('#MainCollectionClassic-infinite');assert(tr.querySelector('[data-infinite-next]').getAttribute('href').includes('page=2'));
  if(!reduced){observers[0].fn([{isIntersecting:true}]);await drain();assert(tr.querySelector('[data-infinite-status]').textContent.includes('next-page'));assert(observers[0].disconnected);}
  tr.dispatchEvent(new tw.Event('shopify:section:unload',{bubbles:true}));testDom.window.close();
 }
 // Retained legacy adapter fixture: actual snippet contracts, deliberately no storefront activation.
 const legacySettings={show_title:true,show_sort:true,sort_style:'dropdown',show_active_filters:true,show_clear_all:true,enable_layout_controls:true,show_price:true,show_quick_add:true,enable_quick_view:true,enable_compare:true,media_mode:'slider',show_badges:true};
 const legacyArgs={section:{id:'legacy',blocks:[]},s:legacySettings,filters:collection.filters,results_url:collection.url,results_title:collection.title,sort_options:collection.sort_options,sort_by:collection.sort_by};
 const card=await snippet('collection-modern-product-card',{...legacyArgs,product:{...product,media:[{...image,media_type:'image'},{...image,media_type:'image'}]}});
 const legacyHTML=`<section id="legacy" class="q-collection-modern" data-qcm-qv-enabled="true" data-qcm-enable-compare="true" style="--qcm-cols-d:4">${await snippet('collection-modern-toolbar',legacyArgs)}<div data-qcm-grid><div data-qcm-item>${card}</div></div>${await snippet('collection-modern-compare-tray',legacyArgs)}<div data-qcm-qv hidden><button data-qcm-qv-close>Close</button><div data-qcm-qv-inner></div></div></section>`;
 const legacy=new JSDOM(legacyHTML,{url:'https://shop.test/fr/collections/all',runScripts:'outside-only'}),lw=legacy.window,lr=[];lw.localStorage.setItem('qcm:prefs:legacy','null');lw.fetch=(url,opts)=>new Promise((resolve,reject)=>lr.push({url,opts,resolve,reject}));lw.eval(read('assets/section-collection-simple.js'));lw.eval(read('assets/section-collection-modern.js'));lw.eval(read('assets/section-collection-modern.js'));lw.document.dispatchEvent(new lw.Event('DOMContentLoaded'));
 const lroot=lw.document.querySelector('#legacy'),qvButton=lroot.querySelector('[data-qcm-quick-view]'),qvHost=lroot.querySelector('[data-qcm-qv]');
 lroot.querySelector('[data-qcmc-next]').click();assert.equal(lroot.querySelector('[data-qcmc-slider]').dataset.qcmcIndex,'1');
 lroot.querySelector('[data-qcm-compare-toggle]').click();assert.equal(lroot.querySelector('[data-qcm-selected-links] a').getAttribute('href'),'https://shop.test/fr/products/one');assert.equal(lroot.querySelector('[data-qcm-compare-toggle]').getAttribute('aria-pressed'),'true');lroot.querySelector('[data-qcm-compare-clear]').click();assert(lroot.querySelector('[data-qcm-compare]').hidden);
 for(let i=0;i<12;i++)lroot.querySelector('[data-qcm-cols-step="1"]').click();assert.equal(lroot.style.getPropertyValue('--qcm-cols-d'),'6');
 qvButton.click();assert(lr[0].url.startsWith('https://shop.test/fr/products/one?'));lroot.querySelector('[data-qcm-qv-close]').click();assert(lr[0].opts.signal.aborted);lr[0].resolve({ok:true,text:async()=>await render('collection-modern-quick-view',{}, {product})});await drain();assert(qvHost.hidden,'Closed quick view must not reopen on stale response');
 qvButton.click();lr[1].resolve({ok:true,text:async()=>await render('collection-modern-quick-view',{}, {product:{...product,variants:[v,variant(22,true,2500)]}})});await drain();await new Promise(resolve=>setImmediate(resolve));assert(!qvHost.hidden);const variantSelect=qvHost.querySelector('select');assert(variantSelect);variantSelect.value='22';variantSelect.dispatchEvent(new lw.Event('change',{bubbles:true}));assert.equal(qvHost.querySelector('.qcmQv__priceNow').textContent,'$25.00');assert(qvHost.querySelector('.qcmQv__priceWas').hidden);assert.equal(new lw.FormData(variantSelect.form).get('id'),'22');
 qvButton.click();lroot.dispatchEvent(new lw.Event('shopify:section:unload',{bubbles:true}));assert(lr[2].opts.signal.aborted);assert(qvHost.hidden);lroot.dispatchEvent(new lw.Event('shopify:section:load',{bubbles:true}));qvButton.click();assert.equal(lr.length,4);lr[3].reject(new Error('offline'));await drain();assert(qvHost.textContent.includes('Unable to load'));legacy.window.close();
 for(const path of ['assets/main-collection-classic.css','assets/section-collection-modern.css','assets/section-collection-modern-simple.css','assets/section-collection-simple.css'])require('postcss').parse(read(path),{from:path});
 console.log('PASS collection hosts: actual Liquid sections/snippets, six Simple/three Classic layouts, schema choices/endpoints/presets, GET filter units/state and POST form ownership, native sort/drawer/pagination fallback, direct mixed-search parity, alternate context, shared/modern card locale/variant/subscription/price/rating contracts, protected quick-view native variants, controller two-instance focus/error/abort/editor reload. Shopify acceptance queued.');
})().catch(e=>{console.error(e);process.exitCode=1;});
