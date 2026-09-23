const assert=require('node:assert/strict'),postcss=require('postcss'),f=require('./support/forms.cjs');
const name='3rd-party-dropshipping-logo-carousel',asset='assets/3rd-party-partner-logos.js';
const logo=(settings={})=>({type:'logo',settings:{brand_name:'Brand <safe>',logo:f.photo(),link_url:'/fr/brands?a="safe"&b=2',...settings}});
let cases=0;
async function inspect(opts,fn){const html=await f.host(name,opts),d=f.dom(html);try{assert.doesNotMatch(html,/Liquid error|NaN|undefined/);for(const el of d.window.document.querySelectorAll('style'))postcss.parse(el.textContent).walkRules(rule=>{if(rule.parent.type==='atrule'&&rule.parent.name==='keyframes')return;for(const selector of rule.selectors)assert(selector.startsWith('#brand-logo-carousel-'+(opts.id||'one')),selector)});fn(d.window.document,html);cases++}finally{d.window.close()}}
function runtime(html,{reduced=false}={}){
 const d=f.dom(html),w=d.window,doc=w.document,timers=new Map(),motions=[],intersections=[],resizes=[];let nextTimer=0,hidden=false;
 Object.defineProperty(doc,'hidden',{get:()=>hidden,configurable:true});
 w.setInterval=(fn,ms)=>{const id=++nextTimer;timers.set(id,{fn,ms});return id};w.clearInterval=id=>timers.delete(id);
 w.matchMedia=()=>{const listeners=new Set(),m={matches:reduced,addEventListener:(_,fn)=>listeners.add(fn),removeEventListener:(_,fn)=>listeners.delete(fn),set(value){m.matches=value;listeners.forEach(fn=>fn({matches:value}))},listeners};motions.push(m);return m};
 class Observer {constructor(cb){this.cb=cb;this.observed=[];this.disconnected=false}observe(el){this.observed.push(el)}disconnect(){this.disconnected=true;this.observed=[]}}
 w.IntersectionObserver=class extends Observer{constructor(cb){super(cb);intersections.push(this)}fire(value){this.cb(this.observed.map(target=>({target,isIntersecting:value})))}};
 w.ResizeObserver=class extends Observer{constructor(cb){super(cb);resizes.push(this)}fire(){this.cb(this.observed.map(target=>({target})))}};
 for(const root of doc.querySelectorAll('[data-q-partner-logos]')){
  const viewport=root.querySelector('[data-q-logos-viewport]'),group=root.querySelector('[data-q-logos-original]');if(!viewport)continue;
  const dims={client:400,scroll:656,group:632,item:200};viewport.fixture=dims;
  Object.defineProperty(viewport,'clientWidth',{get:()=>dims.client});Object.defineProperty(viewport,'scrollWidth',{get:()=>dims.scroll});
  group.getBoundingClientRect=()=>({width:dims.group});group.style.gap='16px';
  [...group.children].forEach(el=>el.getBoundingClientRect=()=>({width:dims.item}));
  viewport.calls=[];viewport.scrollTo=opts=>{viewport.calls.push(opts);viewport.scrollLeft=opts.left};
 }
 w.eval(f.read(asset));doc.dispatchEvent(new w.Event('DOMContentLoaded'));
 return {d,w,doc,timers,motions,intersections,resizes,hidden(value){hidden=value;doc.dispatchEvent(new w.Event('visibilitychange'))},event(el,type,extra={}){el.dispatchEvent(new w.Event(type,{bubbles:true,...extra}))},close(){d.window.close()}};
}
(async()=>{
 const schema=f.unpack(name).schema;
 for(const preset of schema.presets)for(const design of [false,true])await inspect({settings:preset.settings,blocks:preset.blocks,globals:{request:{design_mode:design}}},doc=>{assert.equal(doc.querySelectorAll('[data-q-logos-original] .q-logos__item').length,4);assert.equal(doc.querySelector('.q-logos__motion').hidden,true);assert.equal(doc.querySelector('script').defer,true)});
 for(const st of schema.settings){const values=st.options?.map(x=>x.value)||(st.type==='checkbox'?[false,true]:st.type==='range'?[st.min,st.max]:[]);for(const value of values)await inspect({settings:{[st.id]:value},blocks:[logo(),logo({brand_name:'Second'})]},doc=>{const root=doc.querySelector('section');assert.equal(!!root,st.id!=='enable_section'||value);if(!root)return;if(st.id==='max_width')assert.match(root.style.getPropertyValue('--q-logos-max-width'),new RegExp('--container-'+value));if(st.id==='autoplay')assert.equal(root.dataset.autoplay,String(value));if(st.id==='gutter')assert.equal(root.style.getPropertyValue('--q-logos-gap'),value+'px');if(st.id==='logo_max_height')assert.equal(root.style.getPropertyValue('--q-logos-max-h'),value+'px');if(st.id==='autoplay_speed_ms')assert.equal(root.dataset.speed,String(value));if(st.id==='layout_mode')assert.equal(root.querySelector('[data-q-logos-viewport]').getAttribute('tabindex'),value==='grid'?null:'0')})}
 for(const design of [false,true])await inspect({settings:{kicker:'',heading:'',body:''},blocks:[logo({logo:null,brand_name:''})],globals:{request:{design_mode:design}}},doc=>{assert.equal(!!doc.querySelector('section'),design);if(design)assert(doc.querySelector('[data-editor-block]'))});
 await inspect({settings:{layout_mode:'marquee',aria_label:'',heading:'Logos <safe>'},blocks:[logo({open_in_new_tab:true}),logo({logo:null,brand_name:'Text <safe>'}),logo({logo:null,brand_name:''})]},doc=>{const root=doc.querySelector('section');assert.equal(root.getAttribute('aria-label'),'Logos <safe>');assert.equal(doc.querySelectorAll('[data-q-logos-original] .q-logos__item').length,2);const clone=doc.querySelector('.q-logos__group--clone');assert.equal(clone.getAttribute('aria-hidden'),'true');assert(clone.hasAttribute('inert'));assert.equal(clone.querySelector('a,button,[tabindex],[data-editor-block]'),null);const a=doc.querySelector('a');assert.equal(a.getAttribute('href'),'/fr/brands?a="safe"&b=2');assert.equal(a.target,'_blank');assert.equal(a.rel,'noopener noreferrer');assert.equal(doc.querySelector('img').alt,'Brand <safe>');assert.equal(doc.querySelectorAll('[data-editor-block]').length,2)});
 await inspect({settings:{kicker:'Header only',heading:'',body:''},blocks:[]},doc=>{assert(doc.querySelector('header'));assert.equal(doc.querySelector('[data-q-logos-viewport]'),null)});
 await inspect({settings:{layout_mode:'marquee'},blocks:[logo({brand_name:'',logo:f.photo()})]},doc=>{assert.equal(doc.querySelector('section').dataset.autoplay,'false');assert.equal(doc.querySelector('.q-logos__group--clone'),null);assert.equal(doc.querySelector('img').alt,'Photo <safe>')});
 const html=await f.host(name,{id:'strip',blocks:[logo(),logo(),logo()]})+await f.host(name,{id:'marquee',settings:{layout_mode:'marquee'},blocks:[logo(),logo(),logo()]});
 const rt=runtime(html);try{
  const {doc,w,timers,intersections,resizes,motions}=rt,roots=[...doc.querySelectorAll('section')],[strip,marquee]=roots,v=strip.querySelector('[data-q-logos-viewport]'),b=strip.querySelector('button');
  assert.equal(timers.size,0,'offscreen instances do not start');intersections.forEach(o=>o.fire(true));assert.equal(timers.size,1,'strip owns one timer; marquee uses scoped CSS');assert.equal(marquee.dataset.playing,'true');assert.equal(marquee.style.getPropertyValue('--q-logos-distance'),'632px');assert.equal(b.hidden,false);
  const tick=()=>[...timers.values()][0].fn();tick();assert.equal(v.calls.at(-1).left,216);tick();assert.equal(v.calls.at(-1).left,256);tick();assert.equal(Math.abs(v.calls.at(-1).left),0);assert.equal(v.calls.at(-1).behavior,'smooth');
  v.style.direction='rtl';tick();assert.equal(v.calls.at(-1).left,-216);tick();assert.equal(v.calls.at(-1).left,-256);tick();assert.equal(Math.abs(v.calls.at(-1).left),0);cases+=6;
  rt.event(v,'pointerenter');assert.equal(timers.size,0);assert.equal(strip.dataset.playing,'false');assert.equal(marquee.dataset.playing,'true');rt.event(v,'pointerleave');assert.equal(timers.size,1);
  b.click();assert.equal(timers.size,0);assert.equal(b.getAttribute('aria-pressed'),'true');assert.equal(b.textContent,'Start logo motion');rt.hidden(true);rt.hidden(false);rt.event(v,'pointerleave');assert.equal(timers.size,0,'manual stop persists through unrelated events');b.click();assert.equal(timers.size,1);
  rt.hidden(true);assert.equal(timers.size,0);assert.equal(marquee.dataset.playing,'false');rt.hidden(false);assert.equal(timers.size,1);assert.equal(marquee.dataset.playing,'true');
  v.focus();assert.equal(timers.size,0);v.blur();assert.equal(timers.size,1);cases+=6;
  motions[0].set(true);assert.equal(timers.size,0);assert.equal(b.hidden,true);motions[0].set(false);assert.equal(timers.size,1);
  intersections[0].fire(false);assert.equal(timers.size,0);intersections[0].fire(true);assert.equal(timers.size,1);
  v.fixture.client=1000;resizes[0].fire();assert.equal(timers.size,0);assert.equal(b.hidden,true);v.fixture.client=400;resizes[0].fire();assert.equal(timers.size,1);cases+=3;
  w.eval(f.read(asset));rt.event(strip,'shopify:section:load');assert.equal(timers.size,1);assert.equal(intersections.length,2,'duplicate asset/load does not duplicate controllers');
  rt.event(strip,'shopify:section:unload');assert.equal(timers.size,0);assert(intersections[0].disconnected);assert(resizes[0].disconnected);assert.equal(motions[0].listeners.size,0);assert.equal(strip.hasAttribute('data-playing'),false);assert.equal(b.hidden,true);rt.event(v,'pointerleave');rt.hidden(false);assert.equal(timers.size,0);
  rt.event(strip,'shopify:section:load');assert.equal(intersections.length,3);intersections[2].fire(true);assert.equal(timers.size,1);rt.event(strip,'shopify:section:unload');rt.event(marquee,'shopify:section:unload');assert.equal(timers.size,0);cases+=3;
 }finally{rt.close()}
 for(const opts of [{settings:{autoplay:false}},{settings:{layout_mode:'grid'}},{globals:{request:{design_mode:true}}},{blocks:[logo()]}]){
  const h=await f.host(name,{blocks:[logo(),logo()],...opts}),r=runtime(h);try{r.intersections.forEach(o=>o.fire(true));assert.equal(r.timers.size,0);assert.equal(r.doc.querySelector('button').hidden,true);cases++}finally{r.close()}}
 const r=runtime(await f.host(name,{settings:{respect_reduced_motion:false},blocks:[logo(),logo()]}),{reduced:true});try{r.intersections.forEach(o=>o.fire(true));assert.equal(r.timers.size,0);assert.equal(r.doc.querySelector('button').hidden,true);cases++}finally{r.close()}
 assert.match(f.read('sections/'+name+'.liquid'),/prefers-reduced-motion:reduce/);
 console.log('PASS '+cases+' independent Partner Logos native preset/settings/blank/clone/link/multi-instance, strip bounds/RTL, manual stop/focus/hover/visibility/reduced-motion, resize/offscreen, duplicate boot and editor disposal cases. Geometry/timer/media observers are explicit adapters; actual native scroll/animation/pixels/AT/editor remain live acceptance.');
})().catch(e=>{console.error(e);process.exit(1)});
