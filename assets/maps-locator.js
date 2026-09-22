/* One optional Google Maps loader; native cards remain complete without it. */
(() => {
  'use strict';
  if(window.__qMapLocators)return;window.__qMapLocators=true;
  const instances=new Map(),selector='.q-map-locator[data-section-id]';let loader=null;
  const normalize=value=>String(value||'').trim().toLocaleLowerCase();
  const pair=value=>{const parts=String(value||'').split(',');if(parts.length!==2||parts.some(x=>!/^[-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(x.trim())))return null;const[lat,lng]=parts.map(Number);return Math.abs(lat)<=90&&Math.abs(lng)<=180?{lat,lng}:null;};
  function load(key){
    if(window.google?.maps?.Map)return Promise.resolve(window.google.maps);
    if(loader)return loader;
    loader=new Promise((resolve,reject)=>{
      const callback='__qMapsReady',script=document.createElement('script');let finished=false;
      const done=error=>{if(finished)return;finished=true;clearTimeout(timer);script.onerror=null;if(error){script.remove();window[callback]=()=>{};reject(error);}else{delete window[callback];resolve(window.google.maps);}};
      window[callback]=()=>done(window.google?.maps?.Map?null:new Error('Maps unavailable'));
      const timer=setTimeout(()=>done(new Error('Maps timed out')),15000);
      script.async=true;script.src='https://maps.googleapis.com/maps/api/js?'+new URLSearchParams({key,loading:'async',callback});
      script.onerror=()=>done(new Error('Maps unavailable'));document.head.append(script);
    }).catch(error=>{loader=null;throw error;});return loader;
  }
  function mount(root){
    if(instances.has(root))return;
    const config=root.querySelector('[data-map-config]');if(!config)return;
    const abort=new AbortController(),on=(el,type,fn)=>el?.addEventListener(type,fn,{signal:abort.signal}),cards=[...root.querySelectorAll('[data-location-card]')];
    const controls=root.querySelector('[data-map-controls]'),search=root.querySelector('[data-map-search]'),chips=root.querySelector('[data-filter-chips]'),count=root.querySelector('[data-map-count]'),empty=root.querySelector('[data-map-empty]'),pane=root.querySelector('[data-map-pane]'),canvas=root.querySelector('[data-map]'),preview=root.querySelector('[data-map-preview]');
    let activeTag='',map=null,info=null,maps=null,markers=[],previewPins=[];
    const tags=card=>(card.dataset.locationTags||'').split(',').map(normalize).filter(Boolean);
    const positions=new Map(cards.map(card=>[card,pair(card.dataset.locationCoordinates)]));
    const select=card=>{cards.forEach(x=>x.classList.toggle('is-active',x===card));};
    const focusCard=card=>{select(card);card.focus({preventScroll:true});card.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
    const clearMap=()=>{for(const{marker,listener}of markers){listener?.remove();marker.setMap(null);}markers=[];info?.close();if(map){maps?.event?.clearInstanceListeners(map);map.unbindAll?.();}map=null;info=null;if(canvas)canvas.replaceChildren();};
    const mapFilter=()=>{if(!map)return;const visible=markers.filter(x=>!x.card.hidden),bounds=new maps.LatLngBounds();markers.forEach(x=>{x.marker.setMap(x.card.hidden?null:map);if(!x.card.hidden)bounds.extend(positions.get(x.card));});if(visible.length>1)map.fitBounds(bounds,40);else if(visible.length===1){map.setCenter(positions.get(visible[0].card));map.setZoom(Number(config.dataset.zoom)||12);}info?.close();};
    const apply=()=>{const query=normalize(search?.value);let visible=0;cards.forEach(card=>{card.hidden=!!((query&&!normalize(card.textContent).includes(query))||(activeTag&&!tags(card).includes(activeTag)));if(!card.hidden)visible++;});if(count){count.hidden=false;count.textContent=visible+' of '+cards.length+' locations shown';}if(empty)empty.hidden=visible!==0;for(const{card,pin}of previewPins)pin.hidden=card.hidden;mapFilter();};
    if(controls)controls.hidden=!(search||chips)||!cards.length;
    if(chips){chips.replaceChildren();const labels=new Map();cards.forEach(card=>(card.dataset.locationTags||'').split(',').forEach(t=>{if(t.trim()&&!labels.has(normalize(t)))labels.set(normalize(t),t.trim());}));for(const[value,label]of [['',chips.dataset.allLabel||'All'],...labels]){const button=document.createElement('button');button.type='button';button.className='q-map-chip';button.textContent=label;button.setAttribute('aria-pressed',String(!value));on(button,'click',()=>{activeTag=value;chips.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));apply();});chips.append(button);}}
    on(search,'input',apply);apply();
    for(const card of cards)on(card.querySelector('[data-focus-map]'),'click',()=>{const pos=positions.get(card);if(map&&pos){select(card);map.panTo(pos);}else if(preview){select(card);previewPins.find(x=>x.card===card)?.pin.focus();}});
    if(preview){const valid=cards.filter(c=>positions.get(c));if(valid.length){preview.hidden=false;const lats=valid.map(c=>positions.get(c).lat),lngs=valid.map(c=>positions.get(c).lng),minLat=Math.min(...lats),maxLat=Math.max(...lats),minLng=Math.min(...lngs),maxLng=Math.max(...lngs);for(const card of valid){const pos=positions.get(card),pin=document.createElement('button');pin.type='button';pin.textContent=card.dataset.locationName||'Location';pin.style.left=(10+80*((pos.lng-minLng)/(maxLng-minLng||1)))+'%';pin.style.top=(20+70*(1-(pos.lat-minLat)/(maxLat-minLat||1)))+'%';on(pin,'click',()=>focusCard(card));preview.append(pin);previewPins.push({card,pin});const button=card.querySelector('[data-focus-map]');if(button)button.hidden=false;}}}
    instances.set(root,()=>{abort.abort();clearMap();previewPins.forEach(x=>x.pin.remove());previewPins=[];if(preview)preview.hidden=true;if(pane)pane.hidden=true;root.dataset.listOnly='true';cards.forEach(c=>{c.hidden=false;c.classList.remove('is-active');c.querySelector('[data-focus-map]')?.setAttribute('hidden','');});if(controls)controls.hidden=true;if(count)count.hidden=true;if(empty)empty.hidden=true;chips?.replaceChildren();instances.delete(root);});
    const center=pair(config.dataset.center)||[...positions.values()].find(Boolean);
    if(config.dataset.enabled!=='true'||!config.dataset.key||config.dataset.key==='none'||!center)return;
    load(config.dataset.key).then(api=>{
      if(abort.signal.aborted)return;maps=api;pane.hidden=false;root.dataset.listOnly='false';
      map=new maps.Map(canvas,{center,zoom:Math.min(20,Math.max(1,Number(config.dataset.zoom)||12)),mapTypeControl:false,streetViewControl:false,fullscreenControl:true});info=new maps.InfoWindow();
      for(const card of cards){const position=positions.get(card);if(!position)continue;
        const marker=new maps.Marker({map,position,title:card.dataset.locationName||'Location'});
        const listener=marker.addListener('click',()=>{focusCard(card);const content=document.createElement('div'),title=document.createElement('strong');title.textContent=card.dataset.locationName||'Location';content.append(title);const link=card.querySelector('.q-map-card__actions a');if(link){const action=document.createElement('a');action.href=link.href;action.textContent=config.dataset.pinLabel||'Open details';content.append(document.createElement('br'),action);}info.setContent(content);info.open({map,anchor:marker});});
        markers.push({card,marker,listener});const button=card.querySelector('[data-focus-map]');if(button)button.hidden=false;
      }mapFilter();
    }).catch(()=>{if(abort.signal.aborted)return;clearMap();pane.hidden=true;root.dataset.listOnly='true';cards.forEach(c=>{const button=c.querySelector('[data-focus-map]');if(button)button.hidden=!previewPins.some(x=>x.card===c);});});
  }
  const scan=scope=>{if(scope.matches?.(selector))mount(scope);scope.querySelectorAll?.(selector).forEach(mount);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true});else scan(document);
  document.addEventListener('shopify:section:load',e=>scan(e.target));
  document.addEventListener('shopify:section:unload',e=>{for(const[root,dispose]of instances)if(root===e.target||e.target.contains(root))dispose();});
  document.addEventListener('shopify:block:select',e=>{const card=e.target.closest?.('[data-location-card]');if(card){card.hidden=false;card.focus({preventScroll:true});card.scrollIntoView({block:'nearest'});}});
})();
