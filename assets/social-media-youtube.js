/* Native links first; recognized YouTube IDs can open a disposable native dialog. */
(() => {
  'use strict';
  if(window.__qSocialYouTube)return;window.__qSocialYouTube=true;
  const instances=new Map(),selector='.q-social-youtube-grid';
  function mount(root){
    if(instances.has(root))return;
    const dialog=root.querySelector('[data-social-youtube-dialog]'),host=root.querySelector('[data-q-yt-player]'),fallback=root.querySelector('[data-q-yt-fallback]');
    if(!dialog||!host||!fallback||typeof dialog.showModal!=='function')return;
    const abort=new AbortController(),on=(el,type,fn)=>el.addEventListener(type,fn,{signal:abort.signal});let opener=null;
    const clear=(focus=true)=>{host.replaceChildren();if(focus&&opener?.isConnected)opener.focus();opener=null;};
    const close=(focus=true)=>{if(dialog.open)dialog.close();clear(focus);};
    on(dialog,'close',()=>clear());on(dialog,'cancel',event=>{event.preventDefault();close();});
    on(dialog,'click',event=>{if(event.target===dialog)close();});
    on(root.querySelector('[data-q-yt-close]'),'click',()=>close());
    root.querySelectorAll('[data-q-yt-trigger]').forEach(link=>on(link,'click',event=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const id=link.dataset.qYtId;if(!/^[\w-]{11}$/.test(id||''))return;
      for(const [other,instance] of instances)if(other!==root)instance.close(false);
      try{if(!dialog.open)dialog.showModal();}catch(_){return;}
      event.preventDefault();opener=link;host.replaceChildren();
      const iframe=document.createElement('iframe');iframe.title=link.getAttribute('aria-label')||'YouTube video';iframe.src='https://www.youtube.com/embed/'+id+'?autoplay=1&playsinline=1&rel=0';iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';host.append(iframe);
      fallback.href=link.href;if(link.target){fallback.target=link.target;fallback.rel='noopener noreferrer';}else{fallback.removeAttribute('target');fallback.removeAttribute('rel');}
      root.querySelector('[data-q-yt-close]').focus();
    }));
    instances.set(root,{close,dispose:()=>{close(false);abort.abort();instances.delete(root);}});
  }
  const scan=scope=>{if(scope.matches?.(selector))mount(scope);scope.querySelectorAll?.(selector).forEach(mount);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true});else scan(document);
  document.addEventListener('shopify:section:load',e=>scan(e.target));
  document.addEventListener('shopify:section:unload',e=>{for(const[root,instance]of instances)if(root===e.target||e.target.contains(root))instance.dispose();});
})();
