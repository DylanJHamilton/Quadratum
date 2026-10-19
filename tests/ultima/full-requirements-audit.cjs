// Shopify tags/media services are explicit adapters; these checks do not certify provider playback or delivery.
const assert=require('node:assert/strict'),fs=require('node:fs'),f=require('../phase4/support/commerce.cjs');
const translations=JSON.parse(f.read('locales/en.default.json'));
f.engine.registerFilter('t',key=>key.split('.').reduce((a,b)=>a?.[b],translations)||key);
f.engine.registerFilter('default_errors',errors=>'<ul><li>'+String(errors.message||'Invalid input')+'</li></ul>');
f.engine.registerFilter('video_tag',()=>'<video controls preload="metadata"></video>');
f.engine.registerFilter('external_video_url',()=> 'https://www.youtube.com/embed/fixture');
f.engine.registerFilter('external_video_tag',url=>'<iframe title="Product video" src="'+url+'"></iframe>');
f.engine.registerFilter('model_viewer_tag',()=>'<model-viewer></model-viewer>');
async function fragment(name,data){return f.dom(await f.engine.parseAndRender(f.platform(f.read('snippets/'+name+'.liquid')),data));}
(async()=>{
 const article={id:1,title:'Article',comments_count:1,comments:[{id:7,author:'Name <safe>',content:'<p>A useful comment</p>',created_at:'2026-10-19'}]};
 const base={section:{id:'blog-one'},article,blog:{'comments_enabled?':true,'moderated?':false},form:{author:'A <safe>',email:'test@example.test',body:'<script>no</script>'},paginate:{pages:2,current_page:1,parts:[{title:1},{title:2,is_link:true,url:'/blogs/news/post?page=2'}],next:{url:'/blogs/news/post?page=2'}}};
 let d=await fragment('article-comments',base),doc=d.window.document;
 assert.equal(doc.querySelectorAll('form').length,1);assert.equal(doc.querySelectorAll('ol > li').length,1);assert(!doc.querySelector('safe'));assert(!doc.querySelector('script'));
 assert.equal(doc.querySelector('[name="comment[body]"]').value,'<script>no</script>');assert.equal(doc.querySelector('[name="comment[author]"]').value,'A <safe>');
 for(const field of doc.querySelectorAll('input,textarea'))assert(doc.querySelector('label[for="'+field.id+'"]'));
 assert(doc.querySelector('nav a[rel=next]').href.includes('page=2#ArticleComments-blog-one'));d.window.close();
 for(const moderated of [false,true]){d=await fragment('article-comments',{...base,blog:{...base.blog,'moderated?':moderated},form:{'posted_successfully?':true}});assert(d.window.document.querySelector('[role=status]').textContent.includes(moderated?'approved':'submitted'));d.window.close();}
 d=await fragment('article-comments',{...base,form:{errors:{message:'Invalid input',email:'invalid'}}});assert(d.window.document.querySelector('[role=alert]'));d.window.close();
 d=await fragment('article-comments',{...base,blog:{'comments_enabled?':false}});assert(!d.window.document.querySelector('section'));d.window.close();
 assert.match(f.read('snippets/article-comments.liquid'),/paginate article.comments by 10/);assert.match(f.read('snippets/article-comments.liquid'),/form 'new_comment', article/);
 assert.match(f.read('sections/main-blog-single.liquid'),/render 'article-comments'/);
 assert.match(f.read('sections/main-product-simple.liquid'),/p \| structured_data/);
 for(const name of ['call-to-action-featured-product','featured-product-hero-banner']){const {schema}=f.unpack(name);assert(schema.blocks.some(b=>b.type==='@app'));assert(schema.blocks.some(b=>b.type==='custom_liquid'&&b.settings.some(s=>s.type==='liquid')));assert.match(f.read('sections/'+name+'.liquid'),/render 'featured-product-rich-media'/);}
 const media=[{id:2,media_type:'video'},{id:3,media_type:'external_video',host:'youtube',external_id:'fixture',preview_image:f.photo(3)},{id:4,media_type:'model',sources:[{url:'/model.glb',format:'glb'}]}];
 d=await fragment('featured-product-rich-media',{product:{...f.product,media}});doc=d.window.document;
 assert(doc.querySelector('video[controls]'));assert(doc.querySelector('template[data-gallery-embed-template]').content.querySelector('iframe[title]'));assert(doc.querySelector('model-viewer'));assert(doc.querySelector('script[type=module][src*="q-model-viewer"]'));assert.equal(doc.querySelectorAll('[data-gallery-item]').length,3);d.window.close();
 d=await fragment('featured-product-rich-media',{product:{...f.product,media:[]}});assert(!d.window.document.querySelector('details'));d.window.close();
 const variant={...f.variants[0],unit_price:500,unit_price_measurement:{reference_value:1,reference_unit:'kg'}},product={...f.product,price_varies:true,price_min:1000,price_max:2000,selected_or_first_available_variant:variant,variants:[variant],price:1000};
 for(const name of ['product-card','collection-simple-product-card']){d=await fragment(name,{product,show_price:true,s:{show_price:true},settings:{},section:{id:'pricing'}});const text=d.window.document.body.textContent;assert(text.includes('$10.00')&&text.includes('$20.00'),name);assert(text.includes('$5.00 / kg'),name);d.window.close();}
 assert.match(f.read('sections/main-collection-list.liquid'),/paginate collections by collections_per_page/);assert.match(f.read('snippets/collection-list-card.liquid'),/assign img = c.featured_image/);
 for(const name of ['before-after','instagram-basic-feed','pinterest-grid','youtube-grid','micro-post-strip']){const {schema}=f.unpack('social-media-'+name);assert(!schema.settings.some(s=>s.id==='data_source_mode'));assert(!schema.settings.some(s=>s.options?.some(o=>/requires integration|integration required/i.test(o.label))));}
 for(const folder of ['sections','blocks'])for(const file of fs.readdirSync(folder).filter(f=>f.endsWith('.liquid'))){const text=f.read(folder+'/'+file),m=text.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/);if(!m)continue;const schema=JSON.parse(m[1]);function walk(o){if(Array.isArray(o))return o.forEach(walk);if(!o||typeof o!=='object')return;for(const [key,value]of Object.entries(o)){if(['label','info','name','content'].includes(key)&&typeof value==='string')assert(!/\bCTAs?\b/.test(value),folder+'/'+file+': '+value);else walk(value);}}walk(schema);}
 d=await fragment('responsive-image-attributes',{image:{...f.photo(),width:1800},max_width:1200,sizes:'50vw',focal_style:true});const attrs=d.window.document.body.textContent;assert(attrs.includes('160w')&&attrs.includes('1200w'));assert(!attrs.includes('1600w'));assert(attrs.includes('50vw'));assert.match(attrs,/width=160 160w/);assert.match(attrs,/width=1200 1200w/);d.window.close();
 for(const name of ['main-product-simple','main-product-modern-variant']){
  d=f.dom(await f.render(name,{settings:{gallery_layout:'thumbnails'}}));const w=d.window;
  f.boot(w,['product-selling-plans.js','product-purchase-sync.js','product-gallery-options.js']);
  const select=w.document.querySelector('form [name=id]');select.value='100';select.dispatchEvent(new w.Event('change',{bubbles:true}));
  const main=w.document.querySelector('[id^="QtmMainImage-"]');assert(main.srcset.includes('image-3')&&main.srcset.includes('800w'),name+' retains responsive selected media');
  d.window.close();
 }
 d=await fragment('product-services',{product:{...f.product,media:[{media_type:'model'}]},form:{},id:'model'});assert(d.window.document.querySelector('script[type=module][src*="q-model-viewer"]'));d.window.close();
 for(const name of ['frontend-form-logic.js','frontend-form-logic-form-sections.js','maps-locator.js'])assert(!/https:\/\/(challenges.cloudflare.com|www.google.com|maps.googleapis.com)/.test(f.read('assets/'+name)));
 assert.match(f.read('sections/hero-banner.liquid'),/b.image.presentation.focal_point/);assert.match(f.read('sections/sub-banner-classic.liquid'),/b.mobile_image.presentation.focal_point/);
 assert.match(f.read('scripts/build-submission-candidate.py'),/EXCLUDED_TEMPLATES = \{'page.northstar-theme.json', 'page.morrow-theme.json'/);
 console.log('PASS full-audit repairs: article native form structure/feedback/escaping/pagination; app schemas; mixed media and empty states; collection price variation and units; directory fallback; schema terminology; responsive candidates; package exclusions. Shopify service playback, comment submission, device layout and final package verification remain separate.');
})().catch(error=>{console.error(error);process.exitCode=1;});
