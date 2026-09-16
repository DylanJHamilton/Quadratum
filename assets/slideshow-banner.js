(function(){
  if (window.qtmSlideshowBannerBound) return;
  window.qtmSlideshowBannerBound = true;
  function init(root){
    if(!root || root.__inited) return;
    const track = root.querySelector('[data-qsl-track]');
    const slides = Array.from(root.querySelectorAll('[data-qsl-slide]'));
    if(!track || slides.length === 0){ return; }
    root.__inited = true;
    const events = new AbortController();
    function on(target, type, callback) { target.addEventListener(type, callback, {signal:events.signal}); }

    const dots = Array.from(root.querySelectorAll('[data-qsl-dot]'));
    const prevBtn = root.querySelector('[data-qsl-prev]');
    const nextBtn = root.querySelector('[data-qsl-next]');
    const progress = root.querySelector('[data-qsl-progress]');

    const transition = root.dataset.transition || 'slide';
    const autoplay = String(root.dataset.autoplay) === 'true';
    const intervalSec = Math.max(3, parseInt(root.dataset.interval || '5', 10));
    const showProgress = String(root.dataset.progress) === 'true';
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = motion.matches;

    let idx = Math.max(0, slides.findIndex(s => s.hasAttribute('data-active')));
    if(idx === -1) idx = 0;
    let timer = null, paused = false, hovered = false, focused = false, resizing = false;

    root.setAttribute('data-q-ready', 'true');

    function setActive(){
      slides.forEach((s,i)=>{
        const on = i===idx;
        s.inert = !on;
        s.setAttribute('aria-hidden', String(!on));
        s.querySelectorAll('video').forEach(video => {
          if (!on || document.hidden || prefersReduced) video.pause();
          else if (video.autoplay) video.play()?.catch(() => {});
        });
        s.querySelectorAll('iframe[data-video-src]').forEach(frame => {
          if (on && !document.hidden && !prefersReduced) {
            if (!frame.hasAttribute('src')) frame.src = frame.dataset.videoSrc;
          } else frame.removeAttribute('src');
        });
        if(on){ s.setAttribute('data-active',''); } else { s.removeAttribute('data-active'); }
        if(transition==='fade'){
          s.style.opacity = on ? '1' : '0';
          s.style.pointerEvents = on ? 'auto' : 'none';
        }
      });
      dots.forEach((d,i)=>{ if(i===idx){ d.setAttribute('aria-current','true'); d.classList.add('is-active'); }
                            else { d.removeAttribute('aria-current'); d.classList.remove('is-active'); }});
      // animate all .q-anim items in the active slide
      slides.forEach((s,i)=> s.querySelectorAll('.q-anim').forEach(el=> i===idx ? el.classList.add('is-in') : el.classList.remove('is-in')));
    }

    function slideWidth(){ return root.getBoundingClientRect().width; }

    function moveTo(i, snap){
      if(transition==='fade'){ return; }
      const x = -i * slideWidth();
      if(snap){ track.style.transition = 'none'; }
      track.style.transform = 'translate3d('+x+'px,0,0)';
      if(snap){ requestAnimationFrame(()=>{ track.style.transition = 'transform 500ms ease'; }); }
    }

    function resetProgress(){
      if(!progress || !autoplay || prefersReduced || !showProgress) return;
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(()=>{ requestAnimationFrame(()=>{
        progress.style.transition = 'width '+intervalSec+'s linear';
        progress.style.width = '100%';
      });});
    }

    function goTo(i){
      idx = (i + slides.length) % slides.length;
      if(transition==='slide'){ moveTo(idx, false); }
      setActive();
      resetProgress();
      const img = slides[idx].querySelector('img.qsl__img');
      if(img && img.decode){ img.decode().catch(()=>{}); }
    }

    function next(){ goTo(idx+1); }
    function prev(){ goTo(idx-1); }

    function start(){
      if(!autoplay || prefersReduced || slides.length < 2) return;
      stop();
      timer = setInterval(()=>{ if(!paused && !hovered && !focused && !document.hidden && root.isConnected) next(); }, intervalSec*1000);
      resetProgress();
    }
    function stop(){
      if(timer){ clearInterval(timer); timer = null; }
      if(progress){ progress.style.transition = 'none'; }
    }

    prevBtn && on(prevBtn, 'click', prev);
    nextBtn && on(nextBtn, 'click', next);
    dots.forEach(d => on(d, 'click', ()=>{ const k = parseInt(d.dataset.index || '0',10); if(!isNaN(k)) goTo(k); }));
    on(track, 'keydown', (e)=>{ if(e.key==='ArrowRight'){ e.preventDefault(); next(); } if(e.key==='ArrowLeft'){ e.preventDefault(); prev(); }});
    on(root, 'mouseenter', ()=> hovered=true);
    on(root, 'mouseleave', ()=> hovered=false);
    on(root, 'focusin',  ()=> focused=true);
    on(root, 'focusout', event=> { if (!root.contains(event.relatedTarget)) focused=false; });

    const toggle = root.querySelector('[data-qsl-toggle]');
    if (toggle) on(toggle, 'click', () => {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? 'Resume slides' : 'Pause slides';
    });
    on(document, 'visibilitychange', setActive);
    on(motion, 'change', () => { prefersReduced = motion.matches; stop(); setActive(); if (!prefersReduced) start(); });
    on(document, 'shopify:section:unload', event => {
      if (!event.target.contains(root)) return;
      stop(); events.abort(); delete root.__inited;
      slides.forEach(slide => {
        slide.querySelectorAll('video').forEach(video => video.pause());
        slide.querySelectorAll('iframe[data-video-src]').forEach(frame => frame.removeAttribute('src'));
      });
    });
    function onResize(){
      if(resizing) return; resizing = true;
      requestAnimationFrame(()=>{ if(transition==='slide') moveTo(idx, true); resizing=false; });
    }
    on(window, 'resize', onResize);

    if(transition==='slide'){ track.style.transition = 'transform 500ms ease'; moveTo(idx, true); }
    setActive();
    start();
  }

  function boot(){ document.querySelectorAll('[data-qsl]').forEach(init); }
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); }

  document.addEventListener('shopify:section:load', (e)=> { const root = e.target.querySelector('[data-qsl]'); if(root) init(root); });
  document.addEventListener('shopify:section:select', (e)=> { const root = e.target.querySelector('[data-qsl]'); if(root) init(root); });
})();
