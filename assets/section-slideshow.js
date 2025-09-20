/* Quadratum Slideshow (v4.6) — hardened
   - No lazy gaps: pre-decode active slide img
   - Eager-init all section roots + IO as backup
   - Fade pointer-events managed; progress double-rAF
*/
(function () {
  function initCarousel(root) {
    if (!root || root.__q_inited) return;
    const track = root.querySelector('[data-q-carousel-track]');
    const slides = Array.from(root.querySelectorAll('[data-q-slide]'));
    if (!track || slides.length === 0) return;
    root.__q_inited = true;

    const dots = Array.from(root.querySelectorAll('[data-q-carousel-dot]'));
    const btnPrev = root.querySelector('[data-q-carousel-prev]');
    const btnNext = root.querySelector('[data-q-carousel-next]');
    const btnToggle = root.querySelector('[data-q-carousel-toggle]');
    const progress = root.querySelector('[data-q-progress]');

    const transition = root.dataset.transition || 'slide';
    const autoplay = String(root.dataset.autoplay) === 'true';
    const intervalSec = Math.max(3, parseInt(root.dataset.interval || '5', 10));
    const showProgress = String(root.dataset.showProgress) === 'true';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let idx = 0, timer = null, paused = false, resizing = false;

    // Mark ready so CSS text motion can run
    root.setAttribute('data-q-ready', 'true');
    function updateVideoPlayback(activeIndex){
      slideVideos.forEach((v,i) => {
        if (!v) return;
        if (i === activeIndex) {
          v.play?.().catch(()=>{});       // start only the active slide
        } else {
          v.pause?.();
          try { v.currentTime = 0; } catch(e) {}
        }
      });
    }
    const setActiveClass = () => {
      slides.forEach((el, n) => {
        const active = n === idx;
        el.classList.toggle('is-active', active);
        if (transition === 'fade') el.style.pointerEvents = active ? 'auto' : 'none';
      });
    };

    const updateDots = () => {
      dots.forEach((d, n) => {
        const active = n === idx;
        d.classList.toggle('is-active', active);
        if (active) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    };

    const animateText = () => {
      slides.forEach((s, n) => {
        s.querySelectorAll('.q-anim').forEach(el => {
          if (n === idx) el.classList.add('is-in'); else el.classList.remove('is-in');
        });
      });
    };

    const resetProgress = () => {
      if (!progress || !autoplay || prefersReduced || !showProgress) return;
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = `width ${intervalSec}s linear`;
          progress.style.width = '100%';
        });
      });
    };

     // replace your existing moveTo with this
    const moveTo = (i, snap = false) => {
      if (transition === 'fade') return;

      const slideW = root.getBoundingClientRect().width; // one slide = root width
      if (snap) track.style.transition = 'none';
      track.style.transform = `translate3d(${i * -slideW}px,0,0)`;
      if (snap) requestAnimationFrame(() => { track.style.transition = 'transform 500ms ease'; });
    };

    const predecodeActive = () => {
      const s = slides[idx];
      if (!s) return;
      const img = s.querySelector('img.q-img');
      if (img && typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
    };

    const goTo = (i) => {
      idx = (i + slides.length) % slides.length;
      if (transition === 'fade' && !prefersReduced) {
        slides.forEach((el, n) => { el.style.opacity = (n === idx) ? '1' : '0'; });
      } else {
        moveTo(idx);
      }
      setActiveClass();
      updateDots();
      animateText();
      updateVideoPlayback(idx);  
      predecodeActive();
      resetProgress();
    };

    const next = () => goTo(idx + 1);
    const prev = () => goTo(idx - 1);

    const start = () => {
      if (!autoplay || prefersReduced || slides.length < 2) return;
      stop();
      timer = setInterval(() => { if (!paused) next(); }, intervalSec * 1000);
      resetProgress();
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
      if (progress) progress.style.transition = 'none';
    };

    // Hover/focus pause
    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { paused = false; });
    root.addEventListener('focusin',  () => { paused = true; });
    root.addEventListener('focusout', () => { paused = false; });

    btnPrev && btnPrev.addEventListener('click', prev);
    btnNext && btnNext.addEventListener('click', next);
    dots.forEach(dot => dot.addEventListener('click', () => {
      const k = parseInt(dot.dataset.index || '0', 10);
      if (!Number.isNaN(k)) goTo(k);
    }));

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    });

    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        if (!autoplay) return;
        paused = !paused;
        btnToggle.setAttribute('aria-label', paused ? 'Start autoplay' : 'Pause autoplay');
        btnToggle.innerHTML = paused ? '<span aria-hidden="true">▶</span>' : '<span aria-hidden="true">❚❚</span>';
        if (paused && progress) progress.style.transition = 'none';
        if (!paused) resetProgress();
      });
    }

    // Keep aligned on resize (no animation)
    const onResize = () => {
      if (resizing) return;
      resizing = true;
      requestAnimationFrame(() => {
        if (transition === 'slide') moveTo(idx, true);
        resizing = false;
      });
    };
    window.addEventListener('resize', onResize);

    // Prepare DOM for chosen transition
    if (transition === 'fade' && !prefersReduced) {
      track.style.position = 'relative';
      slides.forEach(el => { el.style.position = 'absolute'; el.style.inset = '0'; });
    } else {
      track.style.display = 'flex';
      track.style.transition = 'transform 500ms ease';
    }

    // First render
    goTo(0);
    start();

    document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    slideVideos.forEach(v => v && v.pause?.());
  } else {
    updateVideoPlayback(idx);
  }
});

  }

  function eagerInitAll() {
    document.querySelectorAll('[data-q-carousel]').forEach(initCarousel);
  }

  // IO as *backup* (e.g., if a section gets added later or off-DOM)
  const onIntersect = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCarousel(entry.target);
        obs.unobserve(entry.target);
      }
    });
  };

  function boot() {
    eagerInitAll();

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(onIntersect, { threshold: 0.1 });
      document.querySelectorAll('[data-q-carousel]').forEach(r => io.observe(r));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Theme editor hooks
  document.addEventListener('shopify:section:load', (e) => {
    const root = e.target.querySelector('[data-q-carousel]');
    if (root) initCarousel(root);
  });
  document.addEventListener('shopify:section:select', (e) => {
    const root = e.target.querySelector('[data-q-carousel]');
    if (root) initCarousel(root);
  });
})();
