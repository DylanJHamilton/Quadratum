const assert=require('node:assert/strict'),postcss=require('postcss'),f=require('./support.cjs');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function fixture(settings={},options={}){
 const html=await f.popup(settings,options.data),d=f.dom('<button id="open" data-qtm-popup-open>Open</button>'+html),w=d.window;
 w.Shopify={designMode:!!options.editor,customerPrivacy:{preferencesProcessingAllowed:()=>options.permission??true}};
 w.matchMedia=q=>({matches:q.includes('749')?!!options.mobile:!!options.reduce,addEventListener(){},removeEventListener(){}});
 options.before?.(w);f.boot(w,['global-popup.js']);return {d,w,el:w.document.querySelector('[data-qtm-popup]')};
}
(async()=>{
 const schema=JSON.parse(f.read('config/settings_schema.json')).find(g=>g.name==='Popups');let count=0;
 for(const setting of schema.settings)for(const value of setting.options?.map(x=>x.value) || (setting.type==='checkbox'?[false,true]:[])){
  const html=await f.popup({[setting.id]:value});const d=f.dom(html);for(const style of d.window.document.querySelectorAll('style'))postcss.parse(style.textContent);
  if(setting.id==='popup_enable'&&!value)assert(!d.window.document.querySelector('[data-qtm-popup]'));
  else assert(d.window.document.querySelector('[data-qtm-popup]'));
  d.window.close();count++;
 }
 let x=await fixture({popup_overlay_opacity:0,popup_radius:0,popup_width:960,popup_heading:'<Unsafe>'});
 assert.equal(x.el.style.getPropertyValue('--popup-overlay-opacity'),'0');assert.equal(x.el.style.getPropertyValue('--popup-radius'),'0px');assert.equal(x.el.style.getPropertyValue('--popup-width'),'960px');assert.equal(x.el.querySelector('h2').textContent.trim(),'<Unsafe>');
 assert(x.el.querySelector('[name="contact[marketing_confirmation]"]').required);assert(!x.el.querySelector('[name="contact[marketing_confirmation]"]').checked);x.d.window.close();
 for(const settings of [{popup_show_on_desktop:false},{popup_enable:false}]){
  x=await fixture(settings);assert.equal(x.w.QuadratumPopup.open(),false);x.d.window.close();
 }
 x=await fixture({popup_show_on_mobile:false},{mobile:true});assert.equal(x.w.QuadratumPopup.open(),false);x.d.window.close();
 for(const [frequency,kind,key] of [['once_per_session','sessionStorage','qtm_global_popup_seen_session'],['once_per_day','localStorage','qtm_global_popup_seen'],['once_per_week','localStorage','qtm_global_popup_seen']]){
  x=await fixture({popup_trigger:'delay',popup_delay_seconds:0,popup_frequency:frequency},{before:w=>w[kind].setItem(key,kind==='sessionStorage'?'true':String(Date.now()))});await pause(15);assert(x.el.hidden,frequency);assert(x.w.QuadratumPopup.open(),'manual bypasses frequency');x.d.window.close();
 }
 for(const [frequency,age]of [['once_per_day',2*86400000],['once_per_week',8*86400000]]){
  x=await fixture({popup_trigger:'delay',popup_delay_seconds:0,popup_frequency:frequency},{before:w=>w.localStorage.setItem('qtm_global_popup_seen',String(Date.now()-age))});await pause(15);assert(!x.el.hidden);x.d.window.close();
 }
 x=await fixture({popup_trigger:'first_visit',popup_delay_seconds:0,popup_frequency:'always'});await pause(15);assert(!x.el.hidden);assert.equal(x.w.localStorage.getItem('qtm_global_popup_first_visit'),'true');x.d.window.close();
 x=await fixture({popup_trigger:'first_visit',popup_delay_seconds:0},{before:w=>w.localStorage.setItem('qtm_global_popup_first_visit','true')});await pause(15);assert(x.el.hidden);x.d.window.close();
 let writes=0,reads=0;x=await fixture({popup_trigger:'delay',popup_delay_seconds:0},{permission:false,before:w=>{Object.defineProperty(w,'localStorage',{get(){reads++;throw Error('must not access')}});Object.defineProperty(w,'sessionStorage',{get(){writes++;throw Error('must not access')}})}});await pause(15);assert(!x.el.hidden);assert.equal(reads+writes,0);x.w.QuadratumPopup.close();x.w.QuadratumPopup.open();assert.equal(reads+writes,0);x.d.window.close();
 x=await fixture({popup_trigger:'scroll',popup_scroll_percent:50},{before:w=>{Object.defineProperty(w.document.documentElement,'scrollHeight',{value:2000});Object.defineProperty(w,'innerHeight',{value:1000});}});assert(x.el.hidden);x.w.scrollY=499;x.w.dispatchEvent(new x.w.Event('scroll'));assert(x.el.hidden);x.w.scrollY=500;x.w.dispatchEvent(new x.w.Event('scroll'));assert(!x.el.hidden);x.d.window.close();
 x=await fixture({popup_trigger:'exit_intent'});x.w.document.dispatchEvent(new x.w.MouseEvent('mouseout',{clientY:0,relatedTarget:x.el}));assert(x.el.hidden);x.w.document.dispatchEvent(new x.w.MouseEvent('mouseout',{clientY:0}));assert(!x.el.hidden);x.d.window.close();
 x=await fixture({popup_trigger:'exit_intent'},{mobile:true});x.w.document.dispatchEvent(new x.w.MouseEvent('mouseout',{clientY:0}));assert(x.el.hidden);x.d.window.close();
 x=await fixture({popup_trigger:'delay',popup_delay_seconds:60});await pause(15);assert(x.el.hidden);x.d.window.close();
 x=await fixture({popup_editor_preview:true,popup_enable:false},{editor:true,data:{request:{design_mode:true}}});await pause(120);assert(!x.el.hidden);assert.equal(x.w.localStorage.length+x.w.sessionStorage.length,0);x.w.QuadratumPopup.close();await pause(750);assert(x.el.hidden,'editor does not reopen after close');x.d.window.close();
 x=await fixture({popup_editor_preview:false,popup_trigger:'delay',popup_delay_seconds:0},{editor:true});await pause(15);assert(x.el.hidden);x.d.window.close();
 x=await fixture({popup_overlay_click_close:false});x.w.QuadratumPopup.open();x.el.querySelector('[data-qtm-popup-overlay]').click();assert.equal(x.el.getAttribute('aria-hidden'),'false');x.w.document.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(x.el.getAttribute('aria-hidden'),'true');x.d.window.close();
 x=await fixture({popup_trigger:'manual'},{data:{form:{errors:{email:'Invalid'}}}});assert(!x.el.hidden,'native feedback bypasses frequency and manual trigger');assert(x.el.querySelector('[role="alert"]'));x.d.window.close();
 x=await fixture();const old=x.el;old.dispatchEvent(new x.w.Event('shopify:section:unload',{bubbles:true}));old.remove();x.w.document.body.insertAdjacentHTML('beforeend',await f.popup());x.el=x.w.document.querySelector('[data-qtm-popup]');x.el.dispatchEvent(new x.w.Event('shopify:section:load',{bubbles:true}));assert(x.w.QuadratumPopup.open());assert(!x.el.hidden);x.el.querySelector('[data-qtm-popup-close]').click();assert.equal(x.el.getAttribute('aria-hidden'),'true');x.d.window.close();
 console.log('PASS '+count+' popup setting permutations; zero styles; native confirmation/feedback; delay/scroll/exit/first-visit; device/enable gates; session/day/week expiry; denied privacy/storage; one-shot editor; overlay/Escape; replacement lifecycle.');
})().catch(e=>{console.error(e);process.exitCode=1;});
