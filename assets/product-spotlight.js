(() => {
  if(window.qtmProductSpotlightReady)return;window.qtmProductSpotlightReady=true;
  const instances=new WeakMap(),selector='[data-spotlight]';
  const each=(scope,fn)=>{if(scope.matches?.(selector))fn(scope);scope.querySelectorAll(selector).forEach(fn)};
  function init(root){
    if(instances.has(root))return;
    const controller=new AbortController(),listen=(target,type,fn)=>target?.addEventListener(type,fn,{signal:controller.signal});
    const wrap=root.querySelector('[data-supporting-wrap]'),prev=root.querySelector('[data-prev]'),next=root.querySelector('[data-next]');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)'),video=root.querySelector('.q-spotlight__bg video'),motion=root.querySelector('[data-spotlight-motion]');
    function controls(){if(!wrap)return;const overflow=wrap.scrollWidth>wrap.clientWidth+1;if(prev)prev.disabled=!overflow||wrap.scrollLeft<=1;if(next)next.disabled=!overflow||wrap.scrollLeft+wrap.clientWidth>=wrap.scrollWidth-1;}
    function step(dir){const first=wrap?.querySelector('[data-supporting-item]');if(!wrap)return;wrap.scrollBy({left:((first?.getBoundingClientRect().width||wrap.clientWidth)+(parseFloat(getComputedStyle(wrap).gap)||0))*dir,behavior:reduced.matches?'auto':'smooth'});}
    listen(prev,'click',()=>step(-1));listen(next,'click',()=>step(1));listen(wrap,'scroll',controls);listen(window,'resize',controls);controls();
    function pause(){video?.pause();if(motion){motion.textContent='Play background video';motion.setAttribute('aria-pressed','true');}}
    if(video&&motion){
      motion.hidden=false;video.controls=false;
      listen(motion,'click',()=>{if(!video.paused){pause();return;}const playing=video.play();playing?.catch(pause);});
      listen(video,'play',()=>{motion.textContent='Pause background video';motion.setAttribute('aria-pressed','false');});listen(video,'pause',pause);
      listen(reduced,'change',()=>{if(reduced.matches)pause()});listen(document,'visibilitychange',()=>{if(document.hidden)pause()});
      // Static preview is safe before JS and for reduced motion; start only when allowed.
      if(!reduced.matches&&!document.hidden)video.play()?.catch(pause);
    }
    instances.set(root,()=>{controller.abort();pause()});
  }
  document.addEventListener('shopify:section:load',e=>each(e.target,init));
  document.addEventListener('shopify:section:unload',e=>each(e.target,root=>{instances.get(root)?.();instances.delete(root)}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>each(document,init),{once:true});else each(document,init);
})();
