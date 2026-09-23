/* Read-only product content: native radio panels and hosted media lifecycle. */
(() => {
  if(window.qtmProductContentReady)return;window.qtmProductContentReady=true;
  const instances=new WeakMap(),selector='[data-product-story]';
  const each=(scope,fn)=>{if(scope.matches?.(selector))fn(scope);scope.querySelectorAll(selector).forEach(fn)};
  function init(root){
    if(instances.has(root))return;
    const controller=new AbortController(),media=[...root.querySelectorAll('video')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const pause=()=>media.forEach(video=>video.pause());
    reduced.addEventListener('change',()=>{if(reduced.matches)pause()},{signal:controller.signal});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()},{signal:controller.signal});
    if(root.dataset.autoplay==='true'&&!reduced.matches&&!document.hidden)media.forEach(video=>video.play()?.catch(()=>{}));
    instances.set(root,()=>{controller.abort();pause()});
  }
  document.addEventListener('shopify:block:select',event=>{const panel=event.target.closest('[data-panel-radio]');if(panel){const radio=document.getElementById(panel.dataset.panelRadio);if(radio)radio.checked=true;}});
  document.addEventListener('shopify:section:load',event=>each(event.target,init));
  document.addEventListener('shopify:section:unload',event=>each(event.target,root=>{instances.get(root)?.();instances.delete(root)}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>each(document,init),{once:true});else each(document,init);
})();
