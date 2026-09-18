/* Web3 Hero motion and carousel lifecycle. Wallet integration is a separate contract. */
(() => {
  if (window.qtmWeb3HeroBound) return;
  window.qtmWeb3HeroBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const events = new AbortController(), on = (node, name, fn) => node?.addEventListener(name, fn, {signal:events.signal});
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)'), mobile = window.matchMedia('(max-width:767px)');
    const slider = root.querySelector('[data-q-slideshow]'), track = root.querySelector('[data-q-slides]');
    const slides = [...root.querySelectorAll('.q-slide')], dots = [], card = root.querySelector('.q-card');
    const toggle = root.querySelector('[data-q-pp]') || root.querySelector('[data-web3-pause]');
    const extraToggle = root.querySelector('[data-web3-pause]');
    const autoplay = slider?.dataset.autoplay === 'true' && slides.length > 1;
    const glow = root.querySelector('.q-cursor-glow'), primary = root.querySelector('[data-cta="primary"]');
    const hasMotion = autoplay || root.querySelector('video,[style*="qWeb3Glow"],.q-btn--gradient');
    let paused = motion.matches, index = 0, hovered = false, focused = false, timer, frame, observer;
    const stopped = () => paused || motion.matches || document.hidden || root.classList.contains(mobile.matches ? 'hide-mobile' : 'hide-desktop');
    function resetEffects() {
      if (card) {card.style.transform='';card.style.backgroundPosition='';}
      if (glow) glow.style.opacity='0';
      if (primary) primary.style.transform='';
    }
    function sync() {
      clearTimeout(timer);
      const halt = stopped();
      root.dataset.motionPaused = String(halt);
      if (track) {track.style.transition=motion.matches ? 'none' : '';track.style.transform=`translate3d(${-index*100}%,0,0)`;}
      slides.forEach((slide, i) => {slide.inert = i !== index;slide.setAttribute('aria-hidden', String(i !== index));});
      dots.forEach((dot, i) => {dot.classList.toggle('is-active', i === index);dot.setAttribute('aria-pressed', String(i === index));});
      root.querySelectorAll('video').forEach(video => {if (halt) video.pause();else video.play()?.catch(() => {});});
      if (toggle) {
        toggle.hidden = !hasMotion;toggle.setAttribute('aria-pressed', String(paused));
        toggle.setAttribute('aria-label', paused ? 'Resume background motion' : 'Pause background motion');
        toggle.classList.toggle('is-paused', paused);
        if (toggle === extraToggle) toggle.textContent=paused ? 'Resume background motion' : 'Pause background motion';
      }
      if (halt) resetEffects();
      if (autoplay && !halt && !hovered && !focused) timer=setTimeout(() => {index=(index+1)%slides.length;sync();},Math.max(3,Number(slider.dataset.interval)||8)*1000);
    }
    function go(i) {if (!slides.length) return;index=(i+slides.length)%slides.length;sync();}
    const dotWrap=root.querySelector('[data-q-dots]');
    if (dotWrap) {
      dotWrap.replaceChildren();
      slides.forEach((_,i) => {const button=document.createElement('button');button.type='button';button.dataset.qDot=String(i);button.setAttribute('aria-label',`Go to slide ${i+1}`);on(button,'click',()=>{paused=true;go(i);});dotWrap.append(button);dots.push(button);});
    }
    on(root.querySelector('[data-q-prev]'),'click',()=>{paused=true;go(index-1);});
    on(root.querySelector('[data-q-next]'),'click',()=>{paused=true;go(index+1);});
    on(toggle,'click',()=>{paused=!paused;sync();});
    on(root,'mouseenter',()=>{hovered=true;sync();});on(root,'mouseleave',()=>{hovered=false;sync();resetEffects();});
    on(root,'focusin',()=>{focused=true;sync();});on(root,'focusout',event=>{focused=root.contains(event.relatedTarget);sync();});
    on(root,'keydown',event=>{if (!event.target.matches('[data-q-dot],[data-q-prev],[data-q-next]') || !['ArrowLeft','ArrowRight'].includes(event.key)) return;event.preventDefault();paused=true;go(index+(event.key==='ArrowRight'?1:-1));dots[index]?.focus();});
    on(document,'visibilitychange',sync);on(mobile,'change',sync);
    const reveals=[...root.querySelectorAll('.q-reveal')];
    const showAll=()=>{reveals.forEach(node=>{node.classList.remove('q-reveal-pending');node.classList.add('is-revealed');});observer?.disconnect();};
    if (!motion.matches && root.dataset.scrollReveal==='true' && 'IntersectionObserver' in window) {
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('q-reveal-pending');entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}}),{threshold:.2});
      reveals.forEach(node=>{node.classList.add('q-reveal-pending');observer.observe(node);});
    } else showAll();
    on(motion,'change',()=>{if(motion.matches){paused=true;showAll();cancelAnimationFrame(frame);frame=null;}sync();});
    on(root,'shopify:block:select',event=>{const i=slides.findIndex(slide=>slide.dataset.blockId===event.detail?.blockId||slide===event.target);if(i>=0){paused=true;showAll();go(i);}});
    if (card?.dataset.parallax==='true') on(document,'scroll',()=>{
      if(stopped() || frame) return;
      frame=requestAnimationFrame(()=>{frame=null;if(stopped())return;const rect=card.getBoundingClientRect(),delta=rect.top+rect.height/2-window.innerHeight/2;card.style.backgroundPosition=`center calc(50% + ${Math.max(-50,Math.min(50,delta/20))/Math.max(1,Number(card.dataset.parallaxStrength)||12)}px)`;});
    });
    if(card?.dataset.tilt==='true') on(card,'mousemove',event=>{
      if(stopped())return;const rect=card.getBoundingClientRect();if(!rect.width||!rect.height)return;
      const max=Number(card.dataset.tiltMax)||8,dx=(event.clientX-rect.left-rect.width/2)/(rect.width/2),dy=(event.clientY-rect.top-rect.height/2)/(rect.height/2);
      card.style.transform=`rotateX(${-dy*max}deg) rotateY(${dx*max}deg)`;
    });
    on(card,'mouseleave',()=>{card.style.transform='';});
    if(card?.dataset.cursorGlow==='true' && glow) on(root,'mousemove',event=>{
      if(stopped())return;const rect=root.getBoundingClientRect();glow.style.opacity='1';glow.style.background=`radial-gradient(160px 120px at ${event.clientX-rect.left}px ${event.clientY-rect.top}px,rgba(99,102,241,.28),rgba(16,185,129,.15) 40%,transparent 70%)`;
    });
    if(root.dataset.buttonMagnet==='true') on(primary,'mousemove',event=>{if(stopped())return;const rect=primary.getBoundingClientRect();primary.style.transform=`translate(${(event.clientX-rect.left-rect.width/2)/24}px,${(event.clientY-rect.top-rect.height/2)/24}px)`;});
    on(primary,'mouseleave',()=>{primary.style.transform='';});
    instances.set(root,()=>{if(slider)delete slider.dataset.ready;if(track)track.style.transform='';slides.forEach(slide=>{slide.inert=false;slide.removeAttribute('aria-hidden');});events.abort();clearTimeout(timer);cancelAnimationFrame(frame);observer?.disconnect();showAll();resetEffects();root.querySelectorAll('video').forEach(video=>video.pause());root.dataset.motionPaused='true';if(toggle)toggle.hidden=true;instances.delete(root);});
    if (slider) slider.dataset.ready = 'true';
    sync();
  }
  const roots=scope=>[...(scope.matches?.('[data-web3-hero]')?[scope]:[]),...scope.querySelectorAll('[data-web3-hero]')];
  const boot=()=>roots(document).forEach(init);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  document.addEventListener('shopify:section:load',event=>roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload',event=>roots(event.target).forEach(root=>instances.get(root)?.()));
})();
