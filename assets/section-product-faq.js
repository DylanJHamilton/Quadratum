(() => {
  if(window.qtmProductFAQReady)return;window.qtmProductFAQReady=true;
  const instances=new WeakMap(),selector='[data-product-faq]';
  const each=(scope,fn)=>{if(scope.matches?.(selector))fn(scope);scope.querySelectorAll(selector).forEach(fn)};
  function init(root){
    if(instances.has(root))return;
    const controller=new AbortController(),buttons=[...root.querySelectorAll('[data-faq-index].q-pfaq__btn')],stages=[...root.querySelectorAll('[data-faq-stage-node]')];
    const panel=button=>root.querySelector(`[id="${button.getAttribute('aria-controls')}"]`);
    function pause(scope){scope.querySelectorAll('video, model-viewer').forEach(media=>media.pause?.());scope.querySelectorAll('iframe[data-faq-player]').forEach(frame=>frame.remove());scope.querySelectorAll('[data-faq-external]').forEach(link=>link.hidden=false);}
    function media(scope){
      scope.querySelectorAll('[data-faq-external]').forEach(link=>{
        if(link.hidden||link.closest('[hidden]'))return;
        let url;try{url=new URL(link.href,location.href)}catch{return;}
        if(!['https:','http:'].includes(url.protocol))return;
        let id;
        if(['youtube.com','www.youtube.com','m.youtube.com','youtu.be','www.youtube-nocookie.com'].includes(url.hostname)){
          id=url.hostname==='youtu.be'?url.pathname.slice(1):url.searchParams.get('v')||url.pathname.split('/').pop();
          if(!/^[\w-]+$/.test(id||''))return;
          url=new URL('https://www.youtube-nocookie.com/embed/'+id);
        }else if(['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(url.hostname)){
          id=url.pathname.split('/').filter(Boolean).pop();if(!/^\d+$/.test(id||''))return;url=new URL('https://player.vimeo.com/video/'+id);
        }
        const frame=document.createElement('iframe');frame.dataset.faqPlayer='';frame.className='q-pfaq__iframe';frame.src=url.href;frame.title=link.dataset.title||'Product video';frame.loading='lazy';frame.allowFullscreen=true;frame.allow='fullscreen; picture-in-picture';link.after(frame);link.hidden=true;
      });
    }
    function open(button,toggle=true){
      const expanded=button.getAttribute('aria-expanded')==='true';
      buttons.forEach(other=>{other.setAttribute('aria-expanded','false');const target=panel(other);if(target){target.hidden=true;pause(target)}});
      stages.forEach(stage=>{stage.hidden=true;pause(stage)});
      if(expanded&&toggle)return;
      button.setAttribute('aria-expanded','true');const target=panel(button);if(target){target.hidden=false;media(target)};
      const stage=stages.find(node=>node.dataset.faqIndex===button.dataset.faqIndex&&node.dataset.hasMedia==='true');if(stage){stage.hidden=false;media(stage)}
    }
    buttons.forEach(button=>{button.setAttribute('aria-expanded','false');if(panel(button))panel(button).hidden=true;button.addEventListener('click',()=>open(button),{signal:controller.signal})});
    stages.forEach(stage=>{stage.hidden=true;pause(stage)});
    if(root.dataset.openFirst==='true'&&buttons[0])open(buttons[0],false);
    root.addEventListener('shopify:block:select',event=>{const button=event.target.closest('.q-pfaq__item')?.querySelector('.q-pfaq__btn');if(button)open(button,false)},{signal:controller.signal});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause(root)},{signal:controller.signal});
    instances.set(root,()=>{controller.abort();pause(root)});
  }
  document.addEventListener('shopify:section:load',event=>each(event.target,init));
  document.addEventListener('shopify:section:unload',event=>each(event.target,root=>{instances.get(root)?.();instances.delete(root)}));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>each(document,init),{once:true});else each(document,init);
})();
