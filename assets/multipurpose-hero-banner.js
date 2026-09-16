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
      if (this.mode !== "slideshow") return;

      this.wrapper = el.querySelector(".q-mpb-slides-wrapper");
      this.slides  = el.querySelectorAll(".q-mpb-slide");
      this.dots    = el.querySelectorAll(".q-mpb-dot");
      this.currentIndex = 0;

      this.autoplay        = el.dataset.autoplay === "true";
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
      this.reducedMotion.addEventListener('change', () => this.startAutoplay(), { signal: this.events.signal });
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
        slide.inert = index !== this.currentIndex;
        slide.setAttribute('aria-hidden', String(index !== this.currentIndex));
      });
    }

    next() { this.goTo((this.currentIndex + 1) % this.slides.length); }
    prev() { this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length); }

    startAutoplay() {
      clearTimeout(this.autoplayTimer);
      if (!this.autoplay || this.slides.length < 2 || this.paused || this.hovered || this.focused || this.reducedMotion.matches || !this.el.isConnected) return;
      this.autoplayTimer = setTimeout(() => this.next(), this.autoplaySpeed);
    }
  }

  function init(scope = document) {
    scope.querySelectorAll('.q-multipurpose-banner').forEach(el => {
      if (!instances.has(el)) instances.set(el, new MultipurposeBanner(el));
    });
  }
  document.addEventListener('shopify:section:load', event => init(event.target));
  document.addEventListener('shopify:section:unload', event => {
    event.target.querySelectorAll('.q-multipurpose-banner').forEach(el => {
      const instance = instances.get(el);
      if (instance) { clearTimeout(instance.autoplayTimer); instance.events.abort(); instances.delete(el); }
    });
  });
  window.QuadratumMultipurposeBanner = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  else init();
})();
