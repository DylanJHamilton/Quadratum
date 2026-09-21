const assert = require('node:assert/strict'), f = require('./support/commerce.cjs');
f.engine.registerFilter('handle', x => String(x || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const tabs = 'interactive-content-helper-tabs-accordion', toc = 'interactive-content-helper-toc-page-nav';
const items = ['Same', 'Same', 'Same-2'].map((label,i) => ({ type:'item', settings:{label,anchor_id:label,content:`<p id="content-${i}">Content ${i} <a href="/about">More</a></p>`} }));
const tocItems = [{type:'item',settings:{label:'One <safe>',anchor_id:'#one',indent_level:0}},{type:'item',settings:{label:'Two',anchor_id:'日本 語',indent_level:2}}];
const markup = async (name,settings={},blocks=name===tabs?items:tocItems,id='one',design=false) => `<div id="shopify-section-${id}">${await f.render(name,{id,settings,blocks,data:{request:{design_mode:design}}})}</div>`;
function harness(html, { narrow=false, hash='#unrelated', reduced=false }={}) {
 const d=f.dom(html,'https://shop.test/fr/pages/test'+hash), w=d.window, queries=[], observers=[], frames=new Map(), calls=[];let serial=0;
 w.matchMedia=q=>{const listeners=new Set(), obj={matches:q.includes('reduced')?reduced:q.includes('max-width')?narrow:!narrow,addEventListener(_,fn){listeners.add(fn)},removeEventListener(_,fn){listeners.delete(fn)},listeners};queries.push({q,obj});return obj;};
 w.requestAnimationFrame=fn=>{frames.set(++serial,fn);return serial};w.cancelAnimationFrame=id=>frames.delete(id);
 w.IntersectionObserver=class{constructor(fn){this.fn=fn;this.disconnected=false;observers.push(this)}observe(){}disconnect(){this.disconnected=true}};
 w.scrollTo=x=>calls.push(x); let writes=0;const replace=w.history.replaceState.bind(w.history);w.history.replaceState=(...args)=>{writes++;replace(...args)};
 return {d,w,queries,observers,frames,calls,get writes(){return writes},resize(small){queries.forEach(({q,obj})=>{if(q.includes('reduced'))return;obj.matches=q.includes('max-width')?small:!small;obj.listeners.forEach(fn=>fn())})},flush(){for(const [id,fn]of frames){frames.delete(id);fn()}}};
}
(async()=>{
 for(const name of [tabs,toc]) {
  const schema=f.unpack(name).schema;
  for(const preset of schema.presets) {const d=f.dom(await markup(name,preset.settings||{},preset.blocks||[], 'preset',true));assert.ok(d.window.document.querySelector('section,[role=status]'));d.window.close()}
  for(const setting of schema.settings){const values=setting.options?.map(o=>o.value)||(setting.type==='range'?[setting.min,setting.max]:setting.type==='checkbox'?[false,true]:[]);for(const value of values){const d=f.dom(await markup(name,{[setting.id]:value}));assert.doesNotMatch(d.window.document.body.innerHTML,/Liquid error|NaN|undefined/); for(const sheet of d.window.document.styleSheets){const walk=rules=>{for(const rule of rules){if(rule.selectorText)assert.ok(rule.selectorText.startsWith(name===tabs?'#section-one':'#shopify-section-one'),'scoped CSS: '+rule.selectorText);if(rule.cssRules)walk(rule.cssRules)}};walk(sheet.cssRules)}d.window.close()}}
  const d=f.dom(await markup(name,{},[]));assert.equal(d.window.document.querySelector('section'),null);d.window.close();
 }
 for(const layout_mode of ['tabs_horizontal','tabs_vertical','accordion'])for(const mobile_mode of ['auto','keep_tabs','force_accordion'])for(const narrow of [false,true]){
  const h=harness(await markup(tabs,{layout_mode,mobile_mode}),{narrow});const doc=h.w.document;
  assert.equal(doc.querySelector('[role=tablist]').hidden,true,'unenhanced UI uses native details');assert.equal(doc.querySelectorAll('details').length,3);assert.equal(doc.querySelectorAll('#content-0').length,1,'rich text rendered only once');
  const ids=[...doc.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size,'collision-safe native anchors');
  f.boot(h.w,['interactive-content-tabs.js']);assert.equal(h.w.location.hash,'#unrelated');assert.equal(h.writes,0,'initialization never writes URL');
  const enhanced=layout_mode!=='accordion'&&!(narrow&&mobile_mode!=='keep_tabs');assert.equal(doc.querySelector('[role=tablist]').hidden,!enhanced);
  if(enhanced){doc.querySelectorAll('[role=tab]')[2].click();assert.equal(doc.querySelectorAll('details')[2].hidden,false);assert.equal(doc.querySelectorAll('details')[0].hidden,true);assert.equal(h.writes,1,'duplicate boot binds once');}
  else {doc.querySelectorAll('summary')[2].click();assert.equal(doc.querySelectorAll('details')[2].open,true);assert.equal(h.writes,1);}
  h.d.window.close();
 }
 const h=harness(await markup(tabs,{accordion_behavior:'single_open_only'})+await markup(tabs,{update_hash:false},items,'two'));
 const doc=h.w.document;f.boot(h.w,['interactive-content-tabs.js']);const root=doc.querySelector('[data-q-tac-root]'), triggers=[...root.querySelectorAll('[role=tab]')];
 triggers[0].dispatchEvent(new h.w.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true}));assert.equal(doc.activeElement,triggers[2],'keyboard wraps');
 h.resize(true);assert.equal(root.querySelectorAll('details')[2].open,true);assert.equal(doc.activeElement,root.querySelectorAll('summary')[2]);
 for(let i=0;i<6;i++)root.querySelectorAll('summary')[1].click();assert.equal(root.querySelectorAll('details')[1].open,false,'rapid toggles end in requested state');
 root.querySelectorAll('summary')[0].click();assert.equal(root.querySelectorAll('details[open]').length,1);
 h.resize(false);const count=h.writes;doc.querySelector('#shopify-section-two [role=tab]:last-child').click();assert.equal(h.writes,count,'hash false preserved');
 root.querySelectorAll('details')[1].dispatchEvent(new h.w.CustomEvent('shopify:block:select',{bubbles:true}));assert.equal(root.querySelectorAll('details')[1].hidden,false);
 h.w.history.replaceState(null,'','#one-same-2');h.w.dispatchEvent(new h.w.Event('hashchange'));assert.equal(root.querySelectorAll('details')[1].hidden,false);
 root.dispatchEvent(new h.w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(h.queries[0].obj.listeners.size,0);const old=h.writes;triggers[2].click();assert.equal(h.writes,old);assert.equal(root.querySelector('summary').hidden,false);root.dispatchEvent(new h.w.CustomEvent('shopify:section:load',{bubbles:true}));assert.equal(h.queries.at(-1).obj.listeners.size,1);h.d.window.close();
 const t=harness('<main><h2 id="one">First</h2><h3 id="日本 語">Second</h3><h2>日本 語</h2><div hidden><h2>Hidden</h2></div></main>'+await markup(toc)+await markup(toc,{mode:'auto_blog_headings',max_depth:'h2_h3'},[], 'auto'),{reduced:true});
 const td=t.w.document;f.boot(t.w,['interactive-content-toc.js']);const manual=td.querySelector('[data-q-toc]'),auto=td.querySelector('#shopify-section-auto [data-q-toc]');
 assert.equal(manual.querySelector('details').open,true,'desktop starts expanded');assert.equal(manual.querySelector('a').textContent.trim(),'One <safe>');assert.equal(auto.querySelectorAll('a').length,3);assert.equal(auto.hidden,false);
 assert.equal(new Set([...td.querySelectorAll('main [id]')].map(x=>x.id)).size,3);t.resize(true);assert.equal(manual.querySelector('details').open,false);manual.querySelector('summary').click();assert.equal(manual.querySelector('details').open,true);t.resize(false);assert.equal(manual.querySelector('details').open,true);
 manual.querySelectorAll('a')[1].click();assert.equal(t.calls.at(-1).behavior,'auto');assert.equal(td.activeElement,td.getElementById('日本 語'));assert.equal(decodeURIComponent(t.w.location.hash),'#日本 語');
 const sc=t.calls.length;manual.querySelector('a').dispatchEvent(new t.w.MouseEvent('click',{bubbles:true,ctrlKey:true,cancelable:true}));assert.equal(t.calls.length,sc);
 td.getElementById('one').getBoundingClientRect=()=>({top:-10});td.getElementById('日本 語').getBoundingClientRect=()=>({top:60});t.w.dispatchEvent(new t.w.Event('scroll'));t.flush();assert.equal(manual.querySelectorAll('a')[1].getAttribute('aria-current'),'location');
 const added=td.createElement('section');added.innerHTML='<h2>Editor heading</h2>';td.querySelector('main').append(added);added.dispatchEvent(new t.w.CustomEvent('shopify:section:load',{bubbles:true}));assert.equal(auto.querySelectorAll('a').length,4);added.dispatchEvent(new t.w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(auto.querySelectorAll('a').length,3);added.remove();
 const previousObservers=t.observers.length;manual.dispatchEvent(new t.w.CustomEvent('shopify:section:unload',{bubbles:true}));assert.equal(t.queries[0].obj.listeners.size,0);assert.ok(t.observers.slice(0,previousObservers).every(o=>o.disconnected));t.d.window.close();
 console.log('PASS actual Tabs/Accordion and TOC settings/presets, native fallback, unique rich text/anchors, all mobile modes, hash ownership, rapid toggles, keyboard, independent roots, reduced motion, Unicode heading discovery, focus/highlight and editor disposal/reload. Live Shopify/browser acceptance remains queued.');
})().catch(e=>{console.error(e);process.exitCode=1});
