(() => {
  if (window.QuadratumMultipurposeBanner) return;
  const instances = new WeakMap();
  class MultipurposeBanner {
    constructor(el) {
      this.el = el;
      this.events = new AbortController();
      this.paused = false;
      this.hovered = false;
      this.focused = false;
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.mode = el.dataset.mode;

      this.wrapper = el.querySelector(".q-mpb-slides-wrapper");
      this.slides  = el.querySelectorAll(".q-mpb-slide");
      this.dots    = el.querySelectorAll(".q-mpb-dot");
      this.currentIndex = 0;

      this.autoplay        = this.mode === "slideshow" && el.dataset.autoplay === "true";
      this.autoplaySpeed   = parseInt(el.dataset.autoplaySpeed) || 5000;
      this.transitionSpeed = parseInt(el.dataset.transitionSpeed) || 500;
      this.transition      = el.dataset.transition || "fade";
      this.autoplayTimer   = null;

      this.init();
    }

    init() {
      if (this.slides.length === 0) return;
      this.slides[0].classList.add("active");
      this.updateVisibility();
      this.bindEvents();
      if (this.autoplay && this.slides.length > 1) this.startAutoplay();
    }

    bindEvents() {
      this.el.querySelector(".q-mpb-arrow-prev")?.addEventListener("click", () => this.prev(), { signal: this.events.signal });
      this.el.querySelector(".q-mpb-arrow-next")?.addEventListener("click", () => this.next(), { signal: this.events.signal });
      this.dots.forEach((dot, i) => dot.addEventListener("click", () => this.goTo(i), { signal: this.events.signal }));
      this.el.querySelector('[data-mpb-pause]')?.addEventListener('click', event => {
        this.paused = !this.paused;
        event.currentTarget.setAttribute('aria-pressed', String(this.paused));
        event.currentTarget.textContent = this.paused ? 'Resume slides' : 'Pause slides';
        this.startAutoplay();
      }, { signal: this.events.signal });
      for (const [event, state, value] of [['mouseenter', 'hovered', true], ['mouseleave', 'hovered', false], ['focusin', 'focused', true], ['focusout', 'focused', false]]) {
        this.el.addEventListener(event, e => {
          if (event === 'focusout' && this.el.contains(e.relatedTarget)) return;
          this[state] = value;
          this.startAutoplay();
        }, { signal: this.events.signal });
      }
      const updatePlayback = () => { this.updateVisibility(); this.startAutoplay(); };
      this.reducedMotion.addEventListener('change', updatePlayback, { signal: this.events.signal });
      document.addEventListener('visibilitychange', updatePlayback, { signal: this.events.signal });
    }

    goTo(index) {
      if (index === this.currentIndex || index < 0 || index >= this.slides.length) return;
      this.slides[this.currentIndex]?.classList.remove("active");
      this.dots[this.currentIndex]?.classList.remove("active");
      this.dots[this.currentIndex]?.setAttribute("aria-current", "false");

      this.currentIndex = index;

      this.slides[this.currentIndex]?.classList.add("active");
      this.dots[this.currentIndex]?.classList.add("active");
      this.dots[this.currentIndex]?.setAttribute("aria-current", "true");

      this.updateVisibility();
      if (this.autoplay) {
        clearTimeout(this.autoplayTimer);
        this.startAutoplay();
      }
    }

    updateVisibility() {
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentIndex);
        this.dots[index]?.classList.toggle('active', index === this.currentIndex);
        this.dots[index]?.setAttribute('aria-current', String(index === this.currentIndex));
        slide.inert = index !== this.currentIndex;
        slide.setAttribute('aria-hidden', String(index !== this.currentIndex));
        const playing = index === this.currentIndex && !this.reducedMotion.matches && !document.hidden;
        slide.querySelectorAll('video').forEach(video => {
          if (!playing) video.pause();
          else if (video.autoplay) video.play()?.catch(() => {});
        });
        slide.querySelectorAll('iframe[data-mpb-video-src]').forEach(frame => {
          if (playing) {
            if (!frame.hasAttribute('src')) frame.src = frame.dataset.mpbVideoSrc;
          } else frame.removeAttribute('src');
        });
      });
    }

    next() { this.goTo((this.currentIndex + 1) % this.slides.length); }
    prev() { this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length); }

    startAutoplay() {
      clearTimeout(this.autoplayTimer);
      if (!this.autoplay || this.slides.length < 2 || this.paused || this.hovered || this.focused || this.reducedMotion.matches || document.hidden || !this.el.isConnected) return;
      this.autoplayTimer = setTimeout(() => this.next(), this.autoplaySpeed);
    }
  }

  const roots = scope => [...(scope.matches?.('.q-multipurpose-banner') ? [scope] : []), ...scope.querySelectorAll('.q-multipurpose-banner')];
  function init(scope = document) {
    roots(scope).forEach(el => {
      if (!instances.has(el)) instances.set(el, new MultipurposeBanner(el));
    });
  }
  document.addEventListener('shopify:section:load', event => init(event.target));
  document.addEventListener('shopify:section:unload', event => {
    roots(event.target).forEach(el => {
      const instance = instances.get(el);
      if (instance) {
        clearTimeout(instance.autoplayTimer);
        instance.events.abort();
        el.querySelectorAll('video').forEach(video => video.pause());
        el.querySelectorAll('iframe[data-mpb-video-src]').forEach(frame => frame.removeAttribute('src'));
        instances.delete(el);
      }
    });
  });
  window.QuadratumMultipurposeBanner = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  else init();
})();
