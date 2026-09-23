const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const dom = new JSDOM(`<!doctype html><button data-cart-drawer-open>Cart</button>
<div data-cart-drawer data-cart-url="/fr/cart" data-change-url="/fr/cart/change.js" hidden>
<div data-cart-drawer-panel><p data-cart-drawer-status></p><div data-cart-drawer-content><button data-cart-drawer-close>Close</button></div></div></div>
<form action="/fr/cart/add" data-cart-drawer-add><input name="id" value="123"><button type="submit">Add</button></form>
<section data-qtm-account-register><div class="qtmAccountRegister__passwordField"><input id="register-password" type="password" data-qtm-account-register-password-input><button data-qtm-account-register-password-toggle hidden aria-pressed="false" data-show-label="Show password" data-hide-label="Hide password"><span data-qtm-account-register-password-toggle-text>Show</span></button></div></section>`, {url:'https://example.test/fr/products/test',runScripts:'outside-only'});
const window=dom.window;const requests=[];
window.QuadratumSettings={cart:{ajaxDrawerEnabled:true,openAfterAdd:false}};
window.fetch=async (url,options={}) => {
 requests.push({url:String(url),options});
 return {ok:true,json:async()=>({id:123}),text:async()=>'<div data-cart-drawer-content><button data-cart-drawer-close>Close</button><span data-cart-count>1</span></div>'};
};
for (const name of ['cart-drawer.js','account-main-account-register.js']) {
 const script=fs.readFileSync('./assets/'+name,'utf8');window.eval(script);window.eval(script);
}
(async()=>{
 // Match the actual host mount and deferred asset lifecycle introduced in Batch 7.
 assert.match(fs.readFileSync('./sections/account-main-account-register.liquid','utf8'),/data-qtm-account-register\s/);
 window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
 const toggle=window.document.querySelector('[data-qtm-account-register-password-toggle]');toggle.click();
 assert.equal(window.document.querySelector('[data-qtm-account-register-password-input]').type,'text');
 assert.equal(toggle.hidden,false);assert.equal(toggle.getAttribute('aria-pressed'),'true');assert.equal(toggle.getAttribute('aria-controls'),'register-password');
 const opener=window.document.querySelector('[data-cart-drawer-open]');opener.click();
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(window.document.querySelector('[data-cart-drawer]').hidden,false);
 window.document.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 assert.equal(window.document.querySelector('[data-cart-drawer]').hidden,true);assert.equal(window.document.activeElement,opener);
 const form=window.document.querySelector('form');form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(requests.filter(r=>r.url.endsWith('/fr/cart/add.js')).length,1);
 assert.equal(form.getAttribute('aria-busy'),null);
 assert(form.textContent.includes('Added to cart.'));
 let resolveRefresh;
 window.fetch=async()=>({ok:true,text:()=>new Promise(resolve=>{resolveRefresh=resolve;})});
 const opening=window.QuadratumCartDrawer.open(opener);
 await new Promise(resolve=>setImmediate(resolve));
 window.QuadratumCartDrawer.close();
 resolveRefresh('<div data-cart-drawer-content><button data-cart-drawer-close>Close</button></div>');
 await opening;
 assert.equal(window.document.querySelector('[data-cart-drawer]').hidden,true);
 assert.equal(window.document.activeElement,opener);
 console.log('PASS close-during-refresh race.');
 console.log('PASS: duplicate script loading, existing password toggle, drawer open/Escape/focus restoration, and one locale-aware add-to-cart request. Mock DOM only.');
 window.close();
})().catch(error=>{console.error(error);process.exit(1)});
