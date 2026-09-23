const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const {Liquid}=require('liquidjs');
const source=p=>fs.readFileSync(p,'utf8');
function dom(html){const d=new JSDOM(html,{url:'https://shop.test/?preview_theme_id=123',runScripts:'outside-only',pretendToBeVisual:true});d.window.matchMedia=()=>({matches:true,addEventListener(){},addListener(){}});return d;}
const pause=ms=>new Promise(r=>setTimeout(r,ms));
function fixture(n,id){
 const word=['','one','two','three','four','five'][n];
 if(n===1)return `<section id="${id}"><header data-qtm-header-one class="q-header-one--mobile-drawer_like"><button data-qh1-mobile-toggle aria-expanded="false">Open</button><div data-qh1-mobile-panel hidden tabindex="-1"><button data-qh1-mobile-close>Close</button><a href="/">Last</a></div></header></section>`;
 if(n===2)return `<section id="${id}"><header data-qh2b-header><button data-qh2b-mobile-open>Open</button><div data-qh2b-mobile-drawer hidden tabindex="-1"><button data-qh2b-mobile-close>Close</button><a href="/">Last</a></div></header></section>`;
 return `<section id="${id}"><header data-qtm-header-${word}><button data-qtm-h${n}-mobile-open aria-expanded="false">Open</button><div data-qtm-h${n}-mobile-panel hidden><div role="dialog" tabindex="-1"><button data-qtm-h${n}-mobile-close>Close</button><a href="/">Last</a></div></div></header></section>`;
}
(async()=>{
 for(let n=1;n<=5;n++){
  const word=['','one','two','three','four','five'][n];const d=dom('<button id="outside">Outside</button>'+fixture(n,'a')+fixture(n,'b'));const doc=d.window.document;
  const src=source('assets/header-'+word+'.js');d.window.eval(src);d.window.eval(src);doc.dispatchEvent(new d.window.Event('DOMContentLoaded'));
  const section=doc.querySelector('#a');const root=section.querySelector('header');const open=root.querySelector('button');const panel=root.querySelector('[hidden]');const close=panel.querySelector('button');
  // Repeated editor load must not rebind the existing element.
  for(let i=0;i<3;i++)section.dispatchEvent(new d.window.CustomEvent('shopify:section:load',{bubbles:true}));
  open.click();assert(!panel.hidden,word+' opens once');assert.equal(doc.activeElement,close,word+' immediate focus');
  doc.querySelector('#outside').focus();assert(panel.contains(doc.activeElement),word+' contains external focus');
  close.focus();close.dispatchEvent(new d.window.KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));assert.equal(doc.activeElement,panel.querySelector('a'));
  doc.querySelector('#b button').click();assert.equal(open.getAttribute('aria-expanded'),'false',word+' other instance closes old modal');
  doc.dispatchEvent(new d.window.KeyboardEvent('keydown',{key:'Escape'}));
  open.click();close.click();open.click();await pause(35);assert(!panel.hidden,word+' rapid reopen');
  section.dispatchEvent(new d.window.CustomEvent('shopify:section:unload',{bubbles:true}));assert(panel.hidden,word+' unload closes modal');
  section.dispatchEvent(new d.window.CustomEvent('shopify:section:load',{bubbles:true}));open.click();assert(!panel.hidden,word+' reload binds one instance');
  doc.dispatchEvent(new d.window.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(doc.activeElement,open,word+' restores opener');d.window.close();
 }
 console.log('PASS Headers 1–5: duplicate asset/editor loads, two instances, immediate entry, external focus containment, reverse Tab, Escape/return, rapid reopening and unload/reload.');
 const rotation=dom('<section id="rotation"><header data-qtm-header-four data-announcement-auto-rotate="true"><div data-qtm-h4-announcements><p data-qtm-h4-announcement-slide>First</p><p data-qtm-h4-announcement-slide class="is-hidden">Second</p><button data-qtm-h4-announcement-pause hidden>Pause</button></div></header></section>');
 rotation.window.matchMedia=()=>({matches:false});let ticks=[],cleared=[];
 rotation.window.setInterval=callback=>{ticks.push(callback);return ticks.length;};rotation.window.clearInterval=id=>cleared.push(id);
 rotation.window.eval(source('assets/header-four.js'));rotation.window.document.dispatchEvent(new rotation.window.Event('DOMContentLoaded'));
 const rq=s=>rotation.window.document.querySelector(s);const slides=rotation.window.document.querySelectorAll('p');assert.equal(ticks.length,1);
 ticks[0]();assert(slides[0].classList.contains('is-hidden'));rq('button').click();ticks[0]();assert(slides[0].classList.contains('is-hidden'),'pause persists across ticks');
 rq('button').click();ticks[0]();assert(!slides[0].classList.contains('is-hidden'));rq('section').dispatchEvent(new rotation.window.CustomEvent('shopify:section:unload',{bubbles:true}));assert(cleared.includes(1));rotation.window.close();
 console.log('PASS Header Four announcements: one timer, rotation, persistent pause/resume and unload cancellation.');
 const popupMarkup='<button id="opener" data-qtm-popup-open>Open</button><div id="QuadratumGlobalPopup" data-popup-enabled="true" data-popup-trigger="delay" data-popup-delay="0" data-popup-frequency="once_per_session" data-popup-desktop="true" data-popup-mobile="true" data-popup-editor-preview="false" hidden><div data-qtm-popup-dialog role="dialog" tabindex="-1"><button data-qtm-popup-close>Close</button></div></div>';
 const d=dom(popupMarkup);d.window.Shopify={customerPrivacy:{preferencesProcessingAllowed:()=>true}};d.window.sessionStorage.setItem('qtm_global_popup_seen_session','true');
 d.window.eval(source('assets/global-popup.js'));d.window.document.dispatchEvent(new d.window.Event('DOMContentLoaded'));await pause(25);
 assert(d.window.document.querySelector('[data-popup-enabled]').hidden,'frequency survives page load even on preview URL');assert.equal(d.window.sessionStorage.getItem('qtm_global_popup_seen_session'),'true');
 d.window.QuadratumPopup.open();assert(!d.window.document.querySelector('[data-popup-enabled]').hidden);d.window.QuadratumPopup.close();d.window.QuadratumPopup.open();await pause(30);assert(!d.window.document.querySelector('[data-popup-enabled]').hidden,'stale close timer cannot hide reopened popup');
 d.window.document.dispatchEvent(new d.window.CustomEvent('shopify:section:load'));assert.equal(d.window.sessionStorage.getItem('qtm_global_popup_seen_session'),'true');d.window.close();
 const denied=dom(popupMarkup);Object.defineProperty(denied.window,'sessionStorage',{get(){throw new Error('Storage denied')}});denied.window.eval(source('assets/global-popup.js'));denied.window.document.dispatchEvent(new denied.window.Event('DOMContentLoaded'));assert.doesNotThrow(()=>denied.window.QuadratumPopup.open());denied.window.close();
 console.log('PASS global popup: stored frequency retained, preview URL not treated as editor, rapid close/reopen safe, storage-denied fallback.');
 const search=dom('<button data-search-popup-open>Open</button><button id="outside">Outside</button><div id="QtmSearchPopup" hidden><div class="qtm-search-popup__dialog"><button data-search-popup-close>Close</button><input type="search"><button id="last">Search</button></div></div>');
 search.window.eval(source('assets/search-popup.js'));search.window.document.dispatchEvent(new search.window.Event('DOMContentLoaded'));
 const q=s=>search.window.document.querySelector(s);q('[data-search-popup-open]').click();await pause(25);assert.equal(search.window.document.activeElement,q('input'));q('#outside').focus();assert.equal(search.window.document.activeElement,q('input'));
 q('#last').focus();q('#last').dispatchEvent(new search.window.KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));assert.equal(search.window.document.activeElement,q('[data-search-popup-close]'));
 q('[data-search-popup-close]').click();assert.equal(search.window.document.activeElement,q('[data-search-popup-open]'));search.window.close();
 console.log('PASS search popup: input focus, outside containment, Tab wrap and opener restoration.');
 const engine=new Liquid({root:['snippets'],extname:'.liquid'});
 const renderDrawer=id=>engine.parseAndRender(source('snippets/header-marketplace-category-drawer.liquid'),{section_id:id,section_settings:{},search_display:'inline_static',settings:{},routes:{root_url:'/',search_url:'/search'}});
 const html=await renderDrawer('one')+await renderDrawer('two');const h=dom(html);assert.equal(new Set([...h.window.document.querySelectorAll('input[type=search]')].map(e=>e.id)).size,2);h.window.close();
 for(const word of ['two','three','four','five']){
  const s=source('sections/footer-'+word+'.liquid');assert.match(s,/form 'customer', id: newsletter_form_id/);
 }
 console.log('PASS actual H5 drawer Liquid: two distinct mobile search input IDs; Footer 2–5 explicit newsletter form identity contracts.');
})().catch(e=>{console.error(e);process.exitCode=1});
