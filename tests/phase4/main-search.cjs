const fs=require('node:fs'),assert=require('node:assert/strict'),{Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const source=fs.readFileSync('sections/main-search.liquid','utf8');
// The platform supplies an already-paginated result array. This adapter does not certify Shopify pagination.
const template=source.split('{% schema %}')[0].replace(/{% paginate search.results by per_page %}/g,'').replace(/{% endpaginate %}/g,'');
const engine=new Liquid({root:'snippets',extname:'.liquid'});engine.registerFilter('money',v=>'$'+(Number(v||0)/100).toFixed(2));engine.registerFilter('json',JSON.stringify);engine.registerFilter('image_url',()=>'/fixture.jpg');engine.registerFilter('image_tag',()=>'<img src="/fixture.jpg" width="600" height="600" alt="">');engine.registerFilter('default_pagination',p=>'<a href="'+p.next.url.replace(/&/g,'&amp;')+'">2</a>');
const defaults={search_src_products:true,search_src_articles:true,search_src_pages:true,search_src_collections:true,search_default_form_type:'predictive',enable_predictive_search:true,search_empty_recommendations:true,search_placeholder:'Find <items>',search_submit_label:'Find <now>'};
const product={object_type:'product',id:1,handle:'test',title:'Product',url:'/products/test',available:true,price:1599,compare_at_price:1999,featured_image:{width:600,height:600},images:[],variants:[{id:1,available:true,price:1599}],has_only_default_variant:true};product.selected_or_first_available_variant=product.variants[0];
const results=[product,{object_type:'article',title:'Article <title>',url:'/blogs/news/test',excerpt:'<p>Safe & readable</p>'},{object_type:'page',title:'Page <title>',url:'/pages/test',content:'<p>Page & text</p>'}];
const render=(settings={},items=results,performed=true,id='one',blogs={},server={})=>{
 const globals={settings:{...defaults,...settings},search:{performed,results:items,results_count:items.length,terms:'query <safe>',...server},blogs,routes:{search_url:'/fr/search',root_url:'/fr/',all_products_collection_url:'/fr/collections/all'}};
 return engine.parseAndRender(template,{section:{id,settings:{}},paginate:{pages:2,next:{url:'/fr/search?q=query&type=product%2Carticle%2Cpage&page=2'}}},{globals});
};
(async()=>{
 for(const formType of ['static','predictive'])for(const enabled of [true,false])for(const layout of ['grid','list']){
  const dom=new JSDOM(await render({search_default_form_type:formType,enable_predictive_search:enabled,search_results_layout:layout}));const doc=dom.window.document;
  assert.equal(!!doc.querySelector('[data-qtm-predictive-search]'),formType==='predictive'&&enabled);assert.equal(doc.querySelector('form[role=search]').getAttribute('action'),'/fr/search');assert.equal(doc.querySelector('input[name=q]').value,'query <safe>');assert.equal(doc.querySelector('input[name=q]').placeholder,'Find <items>');assert.equal(doc.querySelector('form[role=search] button').textContent.trim(),'Find <now>');assert(doc.querySelector('.q-product-card'));assert.equal(doc.querySelector('.q-product-card__price-main').textContent,'$15.99');assert(!doc.querySelector('.qcmCard'));assert.equal(doc.querySelector('.qtm-search-result--article h2').textContent,'Article <title>');assert(doc.querySelector('.qtm-search-result--article').classList.contains('qtm-search-result--no-image'));assert.equal(doc.querySelectorAll('.qtm-search-result').length,3);dom.window.close();
 }
 for(const search_default_form_type of ['static','predictive']){const dom=new JSDOM(await render({search_default_form_type},[]));const doc=dom.window.document;assert.equal(doc.querySelectorAll('form[role=search]').length,1);assert(doc.querySelector('.qtm-search__empty'));assert(!doc.querySelector('a[href="/blogs/news"]'));assert.equal(doc.querySelector('a[href="/fr/"]').textContent,'Home');dom.window.close();}
 const unperformed=new JSDOM(await render({},[],false));assert(!unperformed.window.document.querySelector('.qtm-search__empty'));unperformed.window.close();
 const blog=new JSDOM(await render({},[],true,'blog',{news:{url:'/fr/blogs/news'}}));assert(blog.window.document.querySelector('a[href="/fr/blogs/news"]'));blog.window.close();
 const multiple=new JSDOM(await render({},[],true,'first')+await render({},[],true,'second'));const ids=[...multiple.window.document.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);multiple.window.close();
 // Submitted requests filter at Shopify; a direct URL's returned page stays intact.
 const direct=new JSDOM(await render({search_src_products:false},results,true,'direct',{}, {results_count:60}));
 assert.equal(direct.window.document.querySelector('input[name=type]').value,'article,page');
 assert.equal(direct.window.document.querySelectorAll('.qtm-search-result').length,3);
 assert(direct.window.document.querySelector('.qtm-search__meta').textContent.includes('60 results'));
 const next=new URL(direct.window.document.querySelector('.qtm-search__pagination a').href,'https://example.test');
 assert.equal(next.searchParams.get('type'),'product,article,page');assert.equal(next.searchParams.get('page'),'2');direct.window.close();
 for(const search_default_form_type of ['static','predictive']) for(const search_src_collections of [true,false]) {
  const disabled=new JSDOM(await render({search_default_form_type,search_src_collections,search_src_products:false,search_src_articles:false,search_src_pages:false}));const d=disabled.window.document;
  assert.equal(d.querySelectorAll('.qtm-search-result').length,0);assert(!d.querySelector('.qtm-search__meta'));assert(!d.querySelector('.qtm-search__pagination'));
  assert(!d.querySelector('input[name=q]'));assert(d.querySelector('button[type=submit]').disabled);
  assert(d.querySelector('section').textContent.includes(search_default_form_type==='predictive'&&search_src_collections?'Choose a collection':'Search is currently unavailable'));disabled.window.close();
 }
 console.log('PASS Main Search source filtering checkpoint: actual static/predictive setting and master switch, localized form, single empty-state form, retained query, shared product card/price in grid/list, safe text, missing-media class, existing-blog recommendation, two identities. Typed native forms, intact direct-URL server counts/page links and all-disabled/collections-only states pass. Pagination uses a fixture adapter; shared commerce review remains open.');
})().catch(e=>{console.error(e);process.exitCode=1});
