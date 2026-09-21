/* Native legacy login/recovery forms; progressive panels, never cloned forms. */
(() => {
  'use strict';
  if(window.__qAccountLogin) return;
  window.__qAccountLogin = true;
  const selector='[data-account-main-account-login]',instances=new Map();
  function mount(root){
    if(instances.has(root)) return;
    const abort=new AbortController(),on=(el,type,fn)=>el?.addEventListener(type,fn,{signal:abort.signal});
    const login=root.querySelector('[data-account-main-account-login-panel="login"]'),recover=root.querySelector('[data-account-main-account-login-panel="recover"]')||root.querySelector('[data-account-main-account-login-recover-inline]');
    const trigger=root.querySelector('[data-account-main-account-login-recover-trigger]'),back=root.querySelector('[data-account-main-account-login-login-trigger]');
    const mode=root.dataset.recoverDisplay;
    const show=(open,focus=false)=>{
      if(!recover)return;
      recover.hidden=mode==='inline'?false:!open;
      if(login)login.hidden=mode==='panel'&&open;
      trigger?.setAttribute('aria-expanded',String(open));
      if(focus)(open?recover.querySelector('[role="alert"],[role="status"],input:not([type="hidden"])'):trigger||login?.querySelector('input:not([type="hidden"])'))?.focus();
    };
    if(trigger)trigger.hidden=false;
    if(back)back.hidden=false;
    show(!!recover?.querySelector('[role="alert"],[role="status"]')||location.hash==='#recover');
    on(trigger,'click',()=>show(recover.hidden,true));on(back,'click',()=>show(false,true));
    const resets=[];
    root.querySelectorAll('[data-account-main-account-login-password-toggle]').forEach(button=>{
      const input=button.closest('.account-main-account-login__password-wrap')?.querySelector('input');if(!input)return;
      const text=button.querySelector('[data-account-main-account-login-password-toggle-text]');
      const paint=reveal=>{input.type=reveal?'text':'password';button.setAttribute('aria-pressed',String(reveal));button.setAttribute('aria-controls',input.id);button.setAttribute('aria-label',(reveal?button.dataset.hideLabel:button.dataset.showLabel)||(reveal?'Hide password':'Show password'));if(text)text.textContent=(reveal?button.dataset.hideText:button.dataset.showText)||(reveal?'Hide':'Show');};
      paint(false);button.hidden=false;on(button,'click',()=>paint(input.type==='password'));resets.push(()=>{paint(false);button.hidden=true;});
    });
    instances.set(root,()=>{abort.abort();resets.forEach(reset=>reset());if(login)login.hidden=false;if(recover)recover.hidden=false;if(trigger){trigger.hidden=true;trigger.setAttribute('aria-expanded','false');}if(back)back.hidden=true;instances.delete(root);});
  }
  const scan=scope=>{if(scope.matches?.(selector))mount(scope);scope.querySelectorAll?.(selector).forEach(mount);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true});else scan(document);
  document.addEventListener('shopify:section:load',event=>scan(event.target));
  document.addEventListener('shopify:section:unload',event=>{for(const[root,dispose]of instances)if(root===event.target||event.target.contains(root))dispose();});
})();
