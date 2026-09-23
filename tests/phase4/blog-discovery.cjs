const fs=require('node:fs'),assert=require('node:assert/strict'),{Liquid}=require('liquidjs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
const engine=new Liquid({root:'snippets',extname:'.liquid'});
for(const [name,fn] of Object.entries({asset_url:x=>'/assets/'+x,stylesheet_tag:x=>`<link rel="stylesheet" href="${x}">`,image_url:(x)=>x?.url||'https://cdn.example.test/photo.jpg',image_tag:()=>'<img width="600" height="400" alt="" src="/photo.jpg">',json:JSON.stringify,t:x=>x}))engine.registerFilter(name,fn);
engine.registerFilter('handleize',x=>String(x).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''));
const unpack=name=>{const s=read('sections/'+name+'.liquid'),parts=s.split('{% schema %}');return {source:parts[0].replace(/{%-?\s*(?:paginate|endpaginate)\b[^%]*%}/g,''),schema:JSON.parse(parts[1].split('{% endschema %}')[0])};};
const defs=fields=>Object.fromEntries((fields||[]).filter(f=>f.id).map(f=>[f.id,f.default??null]));
const article=(id,tags=[])=>({id,title:'Article <'+id+'>',url:'/fr/blogs/news/'+id,author:'Writer <safe>',tags,published_at:'2026-09-20',content:'<p>'+Array(201).fill('word').join(' ')+'</p>',excerpt_or_content:'<p>Excerpt & safe text</p>',image:{url:'https://cdn.example.test/picture.jpg'}});
const articles=Array.from({length:15},(_,i)=>article(i+1,i===13?['Editor Picks']:[]));
const blog={id:1,url:'/fr/blogs/news',handle:'news',title:'Blog <safe>',articles,articles_count:15,all_tags:['Editor Picks'],previous_article:article('newer'),next_article:article('older')};
async function render(name,overrides={},data={},id='one',blocks=[]) {
 const {source,schema}=unpack(name);return engine.parseAndRender(source,{section:{id,settings:{...defs(schema.settings),...overrides},blocks},paginate:{items:15,pages:2,current_page:1,next:{url:'/fr/blogs/news?page=2'},parts:[{title:'1',is_link:false},{title:'2',is_link:true,url:'?page=2'}]}},{globals:{blog,article:articles[0],current_tags:[],request:{origin:'https://shop.test',design_mode:false},settings:{},...data}});
}
const drain=async()=>{for(let i=0;i<8;i++)await Promise.resolve();};
(async()=>{
 const empty=await engine.parseAndRender(read('snippets/blog-card.liquid'),{article:null});assert(!empty.trim());
 for(const layout of ['list','grid','masonry'])for(const pagination_mode of ['standard','load_more']){
  const d=new JSDOM(await render('feeds-blogs',{layout_mode:layout,pagination_mode}));const doc=d.window.document;
  assert.equal(doc.querySelectorAll('.q-feed__item').length,12);assert(doc.querySelector('a[href="/fr/blogs/news?page=2"]'));
  assert.equal(doc.querySelector('.q-feed__bloglink').textContent.trim(),'Blog <safe>');assert(!doc.querySelector('safe'));
  if(pagination_mode==='load_more')assert(doc.querySelector('[data-q-loadmore]').hidden,'Native links are present before JS');
  assert(doc.querySelector('.q-blogcard__meta').textContent.includes('2 min read'));d.window.close();
 }
 const filtered=new JSDOM(await render('feeds-blogs',{filter_tag:'Editor Picks',per_page:4}));
 assert.equal(filtered.window.document.querySelectorAll('.q-feed__item').length,1,'Filter before preview cap, including matches after the first four articles');
 assert(filtered.window.document.querySelector('a[href="/fr/blogs/news/tagged/editor-picks"]'));assert(!filtered.window.document.querySelector('[data-q-loadmore]'));filtered.window.close();
 const tagged=new JSDOM(await render('feeds-blogs',{filter_tag:'Editor Picks',pagination_mode:'load_more'},{current_tags:['Editor Picks'],blog:{...blog,articles:[articles[13]]}}));assert(tagged.window.document.querySelector('[data-q-loadmore]'));tagged.window.close();
 const noContext=new JSDOM(await render('feeds-blogs',{}, {blog:null}));assert(!noContext.window.document.querySelector('section'));noContext.window.close();
 for(const name of ['main-blog-collection','main-blog-single']) {
  const {schema}=unpack(name);
  const blocks=(schema.blocks||[]).map((b,i)=>({type:b.type,id:'block-'+i,shopify_attributes:`data-editor-block="${i}"`,settings:{...defs(b.settings),heading:'Heading <safe>',menu:{links:[{url:'/fr/pages/info',title:'Menu <safe>'}]},button_url:'/fr/pages/promo',button_label:'More <safe>',custom_liquid:'<strong>Archive custom</strong>',custom_code:'<strong>Article custom</strong>'}}));
  const layouts=name==='main-blog-single'?['classic','wide','sidebar']:['list','grid','masonry'];
  for(const layout of layouts){
   const opts=name==='main-blog-single'?{layout_style:layout}:{posts_layout:layout,page_layout:'sidebar',description:'<p>Archive description</p>'};
   const d=new JSDOM(await render(name,opts,{},'host',blocks));const doc=d.window.document;
   assert(!doc.querySelector('safe'));assert(doc.querySelector('h1').textContent.includes('<safe>')||name==='main-blog-single');
   if(name==='main-blog-single'){
    assert(doc.querySelector('a[href="/fr/blogs/news/newer"]'));assert(doc.querySelector('a[href="/fr/blogs/news/older"]'));
    assert.equal(doc.querySelector('meta[itemprop=image]').content,'https://cdn.example.test/picture.jpg');
    const share=new URL(doc.querySelector('.qtm-main-blog-single__share-link').href);assert.equal(share.searchParams.get('u'),'https://shop.test/fr/blogs/news/1');
   }else{assert(doc.querySelector('.qtm-main-blog-collection__description').textContent.includes('Archive description'));assert(doc.querySelector('[aria-current=page]'));}
   if(layout==='sidebar'||name==='main-blog-collection')assert(doc.querySelector('a[href="/fr/pages/info"]'));
   d.window.close();
  }
  // Exercise each schema choice and range endpoint through the actual section and block contract.
  for(const field of schema.settings){let values=field.type==='select'?field.options.map(o=>o.value):field.type==='checkbox'?[true,false]:field.type==='range'?[field.min,field.max]:[];for(const value of values)await render(name,{[field.id]:value},{},'settings',blocks);}
  for(const preset of schema.presets||[])await render(name,preset.settings||{});
 }
 const noTitle=new JSDOM(await render('main-blog-single',{show_title:false,share_facebook:false,share_x:false,share_pinterest:false,share_linkedin:false},{blog:{...blog,articles:[articles[0]]}}));assert(!noTitle.window.document.querySelector('[aria-labelledby]'));assert(!noTitle.window.document.querySelector('.qtm-main-blog-single__share'));assert(!noTitle.window.document.querySelector('.qtm-main-blog-single__related'));noTitle.window.close();
 const noCTA=new JSDOM(await render('main-blog-collection',{show_read_more:false}));assert(!noCTA.window.document.querySelector('.q-blogcard__cta'));noCTA.window.close();
 const hiddenAux=new JSDOM(await render('main-blog-collection',{page_layout:'sidebar',auxiliary_content_position:'hidden'}));assert(!hiddenAux.window.document.querySelector('.qtm-main-blog-collection--has-sidebar'));hiddenAux.window.close();
 // Real load-more controller, request response fixtures and editor lifecycle.
 const html=await render('feeds-blogs',{pagination_mode:'load_more'},{},'first')+await render('feeds-blogs',{pagination_mode:'load_more'},{},'second');
 const d=new JSDOM(html,{runScripts:'outside-only',url:'https://shop.test/fr/blogs/news'}),w=d.window,requests=[];
 w.fetch=(url,options)=>new Promise((resolve,reject)=>requests.push({url,options,resolve,reject}));w.eval(read('assets/feeds-blogs.js'));w.eval(read('assets/feeds-blogs.js'));w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 const root=w.document.querySelector('#QtmBlogFeed-first'),button=root.querySelector('[data-q-loadmore]');assert(!button.hidden);assert(root.querySelector('[data-q-pagination-fallback]').hidden);
 button.click();button.click();assert.equal(requests.length,1);
 const page2=(await render('feeds-blogs',{pagination_mode:'load_more'},{blog:{...blog,articles:[article('page-two')]}},'first')).replaceAll('/fr/blogs/news?page=2','/fr/blogs/news?page=3');
 requests[0].resolve({ok:true,text:async()=>page2});await drain();assert.equal(root.querySelectorAll('.q-feed__item').length,13);assert(button.dataset.nextUrl.endsWith('page=3'));assert.equal(w.document.querySelector('#QtmBlogFeed-second').querySelectorAll('.q-feed__item').length,12);
 button.click();const pending=requests[1];root.dispatchEvent(new w.Event('shopify:section:unload',{bubbles:true}));assert(pending.options.signal.aborted);pending.resolve({ok:true,text:async()=>page2});await drain();assert.equal(root.querySelectorAll('.q-feed__item').length,13);
 root.dispatchEvent(new w.Event('shopify:section:load',{bubbles:true}));button.click();assert.equal(requests.length,3);requests[2].reject(new Error('Network'));await drain();assert(!root.querySelector('[data-q-pagination-fallback]').hidden);assert(button.hidden);assert(root.querySelector('[role=status]').textContent.includes('Unable'));
 d.window.close();
 console.log('PASS blog discovery: actual Shopify-shaped article arrays/pagination adapters, three feed/archive/article layouts, tagged preview/archive URL, blank context, schema choices/endpoints/presets, safe owned text, native article navigation/share/menu, hidden CTA/title/empty related, load-more duplicate/error/stale/unload/reload and two instances. Live Shopify acceptance remains queued.');
})().catch(e=>{console.error(e);process.exitCode=1});
