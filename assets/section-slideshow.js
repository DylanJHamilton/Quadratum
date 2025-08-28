/* Quadratum Slideshow (v4.6) — hardened
   - Fade always stacks (absolute) even with reduced motion; RM disables transition only
   - Progress double-rAF restart; pauses on hover/focus
   - Dots aria-current tidy; active slide pointer-events enabled
   - Resize snap for slide mode; multi-instance safe
*/
(function () {
  function initCarousel(root) {
    if (!root || root.__q_inited) return;
    root.__q_inited = true;

    const track     = root.querySelector('[data-q-carousel-track]');
    const slides    = Array.from(root.querySelectorAll('[data-q-slide]'));
    if (!track || slides.length === 0) return;

    const dots      = Array.from(root.querySelectorAll('[data-q-carousel-dot]'));
    const btnPrev   = root.querySelector('[data-q-carousel-prev]');
    const btnNext   = root.querySelector('[data-q-carousel-next]');
    const btnToggle = root.querySelector('[data-q-carousel-toggle]');
    const progress  = root.querySelector('[data-q-progress]');

    const transition     = root.dataset.transition || 'slide';
    const autoplay       = String(root.dataset.autoplay) === 'true';
    const intervalSec    = Math.max(3, parseInt(root.dataset.interval || '5', 10));
    const showProgress   = String(root.dataset.showProgress) === 'true';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let idx = 0;
    let timer = null;
    let paused = false;
    let resizing = false;

    // Mark ready so CSS text motion can kick in
    root.setAttribute('data-q-ready', 'true');

    // ---------- helpers ----------
    const setActiveClass = () => {
      slides.forEach((el, n) => {
        const active = n === idx;
        el.classList.toggle('is-active', active);
        if (transition === 'fade') {
          // Only the active slide should be interactive
          el.style.pointerEvents = active ? 'auto' : 'none';
        }
      });
    };

    const updateDots = () => {
      dots.forEach((d, n) => {
        const active = n === idx;
        d.classList.toggle('is-active', active);
        if (active) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    };

    const animateText = () => {
      slides.forEach((s, n) => {
        s.querySelectorAll('.q-anim').forEach(el => {
          if (n === idx) el.classList.add('is-in');
          else el.classList.remove('is-in');
        });
      });
    };

    const resetProgress = () => {
      if (!progress || !autoplay || !showProgress || prefersReduced || slides.length < 2) return;
      progress.style.transition = 'none';
      progress.style.width = '0%';
      // double rAF to ensure layout & transition reset
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = `width ${intervalSec}s linear`;
          progress.style.width = '100%';
        });
      });
    };

    const moveTo = (i, snap = false) => {
      if (transition === 'fade') return;
      if (snap) track.style.transition = 'none';
      track.style.transform = `translateX(${i * -100}%)`;
      if (snap) {
        requestAnimationFrame(() => {
          track.style.transition = 'transform 500ms ease';
        });
      }
    };

    const goTo = (i) => {
      idx = (i + slides.length) % slides.length;

      if (transition === 'fade') {
        // Always drive opacity, even if reduced motion — we’ll disable transition in RM
        slides.forEach((el, n) => { el.style.opacity = (n === idx) ? '1' : '0'; });
      } else {
        moveTo(idx);
      }

      setActiveClass();
      updateDots();
      animateText();
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
      if (progress) { progress.style.transition = 'none'; }
    };

    // ---------- events ----------
    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { paused = false; });
    root.addEventListener('focusin',  () => { paused = true; });
    root.addEventListener('focusout', () => { paused = false; });

    if (btnPrev) btnPrev.addEventListener('click', prev);
    if (btnNext) btnNext.addEventListener('click', next);

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const k = parseInt(dot.dataset.index || '0', 10);
        if (!Number.isNaN(k)) goTo(k);
      });
    });

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

    // Keep alignment on resize without animating
    const onResize = () => {
      if (resizing) return;
      resizing = true;
      requestAnimationFrame(() => {
        if (transition === 'slide') moveTo(idx, true);
        resizing = false;
      });
    };
    window.addEventListener('resize', onResize);

    // Optional: pause autoplay when tab hidden (keeps progress honest)
    document.addEventListener('visibilitychange', () => {
      if (!autoplay) return;
      if (document.hidden) stop(); else start();
    });

    // ---------- prepare DOM for transition ----------
    if (transition === 'fade') {
      // Always stack absolutely; RM handled by removing the opacity transition in CSS/JS
      track.style.position = 'relative';
      slides.forEach(el => {
        el.style.position = 'absolute';
        el.style.inset = '0';
        if (prefersReduced) {
          el.style.transition = 'none';
        } else {
          // Ensure we have a transition if theme CSS was modified
          if (!el.style.transition) el.style.transition = 'opacity 500ms ease';
        }
      });
    } else {
      track.style.display = 'flex';
      track.style.transition = 'transform 500ms ease';
    }

    // ---------- first render ----------
    goTo(0);
    start();
  }

  // Lazy init via IntersectionObserver (falls back to eager)
  const onIntersect = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCarousel(entry.target);
        obs.unobserve(entry.target);
      }
    });
  };

  function boot() {
    const roots = document.querySelectorAll('[data-q-carousel]');
    if (roots.length === 0) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(onIntersect, { threshold: 0.1 });
      roots.forEach(r => io.observe(r));
    } else {
      roots.forEach(initCarousel);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
