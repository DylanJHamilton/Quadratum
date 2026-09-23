// Actual Liquid/native-wrapper/image adapters and shared carousel controller.
// Geometry and timer adapters are explicit; live Shopify/browser acceptance remains queued.
const assert = require('node:assert/strict'), cp = require('node:child_process'), f = require('./support/theme-blocks.cjs');
const names = ['content-collection-banner', 'content-collection-cards', 'content-collection-carousel', 'content-featured-collection'];
const collections = Array.from({length: 5}, (_, i) => ({id: i + 1, title: 'Collection <safe> '+i, url: '/fr/collections/real-'+i+'?q="safe"', image: i===1?null:f.photo(i+1), products_count: i===0?0:3, description: '<p>Actual collection description.</p>', products: [{...f.product, price: 0, price_varies: true}, {...f.product, id: 2, featured_image: null, price: 2000}]}));
const sample = {collection: collections[2], collections, show_product_preview: true, heading:'Actual heading', description:'Actual copy'};
let cases=0;
async function inspect(name, settings={}, check=()=>{}, design=false) {
  const d=f.dom(await f.html(name,settings,'One_A',design));
  try {
    const doc=d.window.document;assert.equal(doc.querySelectorAll('[data-editor-block]').length,1);assert.equal(doc.querySelector('script'),null);assert.doesNotMatch(doc.body.innerHTML,/Liquid error|NaN|undefined/);
    const ids=[...doc.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
    for(const a of doc.querySelectorAll('a')) {assert.ok(a.getAttribute('href'));assert.ok(a.textContent.trim()||a.getAttribute('aria-label'));}
    for(const b of doc.querySelectorAll('button'))assert.ok(b.textContent.trim()||b.getAttribute('aria-label'));
    check(doc,d.window);cases++;
  } finally { d.window.close(); }
}
function geometry(root,w,rtl=false) {
  const viewport=root.querySelector('.q-carousel__viewport'),track=root.querySelector('.q-carousel__track'),slides=[...root.querySelectorAll('.q-carousel__slide')];let width=520;
  root.getClientRects=()=>[{}];track.style.columnGap='20px';viewport.style.direction=rtl?'rtl':'ltr';
  Object.defineProperties(viewport,{clientWidth:{get:()=>width},scrollWidth:{get:()=>slides.length*250+(slides.length-1)*20}});
  viewport.getBoundingClientRect=()=>({left:0,right:width,width});
  slides.forEach((el,i)=>el.getBoundingClientRect=()=>{const left=rtl?width-250-i*270+Math.abs(viewport.scrollLeft):i*270-viewport.scrollLeft;return {left,right:left+250,width:250};});
  viewport.scrollTo=o=>{viewport.lastScroll=o;viewport.scrollLeft=o.left;viewport.dispatchEvent(new w.Event('scroll'));};
  return {viewport,slides,resize(v){width=v;w.dispatchEvent(new w.Event('resize'));}};
}
(async()=>{
  for(const name of names) {
    const {schema,liquid}=f.unpack(name),old=JSON.parse(cp.execFileSync('git',['show','61109f1bd931091bd4b5cdfd44139473efc4d1a3:blocks/'+name+'.liquid'],{encoding:'utf8'}).split('{% schema %}')[1].split('{% endschema %}')[0]);
    const map=Object.fromEntries(schema.settings.filter(s=>s.id).map(s=>[s.id,s]));
    for(const s of old.settings.filter(s=>s.id)){assert.equal(map[s.id]?.type,s.type);assert.deepEqual(map[s.id]?.options,s.options);}
    for(const p of [{settings:{}},...schema.presets]) {
      for(const[k,v]of Object.entries(p.settings||{})){const s=map[k];assert.ok(s);if(s.options)assert.ok(s.options.some(x=>x.value===v));if(s.type==='range')assert.ok(v>=s.min&&v<=s.max&&(v-s.min)%s.step===0);}
      await inspect(name,p.settings,doc=>assert.equal(doc.querySelector('[data-'+name+']').hidden,true));
      await inspect(name,{...p.settings,...sample});
    }
    for(const s of Object.values(map))for(const v of s.options?.map(x=>x.value)||(s.type==='range'?[s.min,s.max]:s.type==='checkbox'?[true,false]:[]))await inspect(name,{...sample,[s.id]:v});
    await inspect(name,{},doc=>assert.ok(doc.querySelector('[role=note]')),true);
    await inspect(name,{...sample,show_on_desktop:false,show_on_tablet:false,show_on_mobile:false,animation_style:'fade'},doc=>assert.equal(doc.querySelector('[class*="--hide-"],[class*="--animate"]'),null),true);
    assert.match(liquid,/box-sizing: border-box/);assert.match(liquid,/min-width: 750px\) and \(max-width: 989px/);assert.match(liquid,/@container/);assert.match(liquid,/prefers-reduced-motion/);
  }
  for(const name of names.slice(1,3)) {
    await inspect(name,{...sample,collection_source:'manual'},doc=>{assert.equal(doc.querySelectorAll('.'+name+'__card').length,5);assert.equal(doc.querySelectorAll('img').length,4);assert.equal(doc.querySelector('img').alt,f.photo(1).alt);assert.equal(doc.querySelector('a').getAttribute('href'),collections[0].url);assert.equal(doc.querySelector('.'+name+'__card--no-image img'),null);});
    await inspect(name,{...sample,collection_source:'featured'},doc=>assert.equal(doc.querySelectorAll('.'+name+'__card').length,1));
    await inspect(name,{...sample,collection_source:'featured',collection:null,collection_limit:2},doc=>assert.equal(doc.querySelectorAll('.'+name+'__card').length,2,'saved manual fallback retained'));
    await inspect(name,{collections:[{...collections[0],description:'',image:null}],show_collection_description:true,fallback_description:'',button_label:''},doc=>assert.equal(doc.querySelector('.'+name+'__copy,.'+name+'__button,img'),null));
    await inspect(name,{collections:[{...collections[0],title:'<img src=x onerror=bad>'}],heading:'<script>bad</script>',overlay_text_color:'#fedcba'},doc=>{assert.equal(doc.querySelector('[onerror],script'),null);assert.ok(doc.querySelector('style').textContent.includes('#fedcba'));});
  }
  await inspect(names[0],{collection:collections[0],custom_button_link:'/custom',text_source:'collection'},doc=>{assert.equal(doc.querySelector('.content-collection-banner__heading').textContent,collections[0].title);assert.equal(doc.querySelector('.content-collection-banner__button').getAttribute('href'),collections[0].url);assert.match(doc.querySelector('.content-collection-banner__meta').textContent,/0 products/);});
  await inspect(names[0],{heading:'Custom banner',custom_button_link:'/custom?x="safe"'},doc=>{assert.equal(doc.querySelector('a').getAttribute('href'),'/custom?x="safe"');assert.equal(doc.querySelector('.content-collection-banner__media'),null);});
  await inspect(names[0],{heading:'Custom banner',primary_button_label:'',show_secondary_button:true,secondary_button_label:'',secondary_button_link:'/real'},doc=>assert.equal(doc.querySelector('a,.content-collection-banner__buttons'),null));
  await inspect(names[0],{heading:'Custom banner',allow_custom_banner:false},doc=>assert.equal(doc.querySelector('[data-content-collection-banner]').hidden,true));
  await inspect(names[0],{image:f.photo()},doc=>assert.equal(doc.querySelector('.content-collection-banner__content-wrap'),null));
  await inspect(names[3],{...sample,collection:{...collections[2],image:null,description:''},primary_button_label:'',secondary_button_label:'',show_secondary_button:true,price_from_label:'À partir de'},doc=>{assert.equal(doc.querySelector('.content-featured-collection__media-column,.content-featured-collection__description,.content-featured-collection__buttons'),null);assert.match(doc.querySelector('.content-featured-collection__product-price').textContent,/À partir de.*0\.00/);assert.equal(doc.querySelector('.content-featured-collection__product--no-image img'),null);});
  await inspect(names[2],{...sample,show_header:false,previous_label:'',next_label:'',carousel_label:'',dots_label:'',enable_autoplay:true},doc=>{assert.ok(doc.querySelector('[data-q-carousel-next]'));assert.equal(doc.querySelector('[data-q-carousel-next]').hidden,true);assert.ok(doc.querySelector('.q-carousel__viewport').getAttribute('aria-label'));assert.equal(doc.querySelector('[data-q-carousel-pause]').hidden,true);});
  const name=names[2],opts={collections,enable_autoplay:true,show_header:false,go_to_slide_label:'Aller à la page',pause_label:'Pause',resume_label:'Reprendre'};
  const d=f.dom(await f.html(name,opts,'One_A')+await f.html(name,opts,'one-a'));const w=d.window,doc=w.document,roots=[...doc.querySelectorAll('[data-qtm-block-carousel]')],timers=new Map(),motions=[],intersections=[],resizes=[];let timerId=0,hidden=false;
  w.setInterval=fn=>{timers.set(++timerId,fn);return timerId;};w.clearInterval=id=>timers.delete(id);Object.defineProperty(doc,'hidden',{get:()=>hidden});
  w.matchMedia=()=>{const listeners=new Set(),m={matches:false,addEventListener:(_,fn)=>listeners.add(fn),removeEventListener:(_,fn)=>listeners.delete(fn),listeners,change(v){this.matches=v;listeners.forEach(fn=>fn());}};motions.push(m);return m;};
  w.IntersectionObserver=class{constructor(fn){this.fn=fn;intersections.push(this);}observe(){}disconnect(){this.disconnected=true;}};
  w.ResizeObserver=class{constructor(fn){this.fn=fn;resizes.push(this);}observe(){}disconnect(){this.disconnected=true;}};
  const [a,b]=roots,[ga,gb]=roots.map((r,i)=>geometry(r,w,i===1));f.boot(w,['interactive-content-carousel-media.js','interactive-content-carousel-media.js']);
  assert.equal(timers.size,0,'blocks wait for actual intersection');intersections.forEach(o=>o.fn([{isIntersecting:true}]));assert.equal(timers.size,2);assert.deepEqual(Array.from(a.__qCarousel.targets),[0,540,810]);assert.match(a.querySelector('[data-carousel-page]').getAttribute('aria-label'),/Aller à la page 1/);
  a.querySelector('[data-q-carousel-next]').click();assert.equal(ga.viewport.scrollLeft,540);assert.equal(gb.viewport.scrollLeft,0);assert.equal(timers.size,1);a.dispatchEvent(new w.Event('mouseenter'));a.dispatchEvent(new w.Event('mouseleave'));assert.equal(timers.size,1,'manual pause persists');assert.equal(a.querySelector('[data-q-carousel-pause]').textContent,'Reprendre');
  const key=(el,k)=>{const e=new w.KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true});el.dispatchEvent(e);return e;};key(gb.viewport,'ArrowLeft');assert.equal(gb.viewport.scrollLeft,-540);key(gb.viewport,'End');assert.equal(gb.viewport.scrollLeft,-810);key(gb.viewport,'Home');assert.equal(Math.abs(gb.viewport.scrollLeft),0);assert.equal(key(ga.slides[0].querySelector('a'),'ArrowRight').defaultPrevented,false);
  a.querySelector('[data-q-carousel-pause]').click();assert.equal(timers.size,1);motions[0].change(true);assert.equal(timers.size,0);motions[0].change(false);assert.equal(timers.size,1);hidden=true;doc.dispatchEvent(new w.Event('visibilitychange'));assert.equal(timers.size,0);hidden=false;doc.dispatchEvent(new w.Event('visibilitychange'));assert.equal(timers.size,1);
  a.querySelector('[data-carousel-page="2"]').focus();ga.resize(1000);assert.equal(doc.activeElement.dataset.carouselPage,'1');
  const original=a.__qCarousel;doc.body.append(a);await new Promise(r=>w.setTimeout(r,0));assert.equal(a.__qCarousel,original,'reorder retains one controller');a.remove();await new Promise(r=>w.setTimeout(r,0));assert.equal(a.__qCarousel,undefined);assert.equal(motions[0].listeners.size,0);assert.equal(intersections[0].disconnected,true);assert.equal(resizes[0].disconnected,true);
  doc.body.append(a);await new Promise(r=>w.setTimeout(r,0));assert.ok(a.__qCarousel);assert.notEqual(a.__qCarousel,original);a.dispatchEvent(new w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(a.__qCarousel,undefined);a.dispatchEvent(new w.CustomEvent('shopify:section:load',{bubbles:true}));assert.ok(a.__qCarousel);
  roots.forEach(r=>r.__qCarousel?.destroy());d.window.close();
  const ed=f.dom(await f.html(name,opts,'editor',true));const er=ed.window.document.querySelector('[data-qtm-block-carousel]');geometry(er,ed.window);let started=0;ed.window.setInterval=()=>{started++;return 1;};f.boot(ed.window,['interactive-content-carousel-media.js']);assert.equal(started,0);assert.equal(er.__qCarousel.editorPause,true);er.dispatchEvent(new ed.window.CustomEvent('shopify:block:deselect',{bubbles:true}));assert.equal(started,0);er.__qCarousel.destroy();ed.window.close();
  console.log('PASS '+cases+' collection banner/card/carousel/featured renders: all controls/defaults/presets, native list/single/manual fallback, truthful empty states, complete destinations/names, native image/price fallbacks and wrapper IDs. Shared actual controller covers two instances, measured RTL pages, persistent pause, reduced motion, visibility/intersection, nested keyboard, resize focus, mutation/reorder and editor disposal. No live certification.');
})().catch(e=>{console.error(e);process.exitCode=1;});
