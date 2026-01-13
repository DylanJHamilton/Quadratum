/* Quadratum — interactive-content-carousel-media.js (shared engine)
   File: assets/interactive-content-carousel-media.js

   Progressive enhancement:
   - baseline = overflow scroll + scroll-snap
   - enhanced = buttons/dots/autoplay/loop/responsive perView + reduced motion compliance
*/
(() => {
  const SELECTOR = "[data-q-carousel]";
  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function getPerView(root) {
    const host = root.closest(".q-carousel-ml") || root;
    const cs = getComputedStyle(host);
    const d = parseInt(cs.getPropertyValue("--q-ml-spv-d").trim() || "4", 10);
    const t = parseInt(cs.getPropertyValue("--q-ml-spv-t").trim() || "2", 10);
    const m = parseInt(cs.getPropertyValue("--q-ml-spv-m").trim() || "1", 10);

    const isDesktop = window.matchMedia("(min-width: 990px)").matches;
    const isTablet = window.matchMedia("(min-width: 750px)").matches;

    let perView = isDesktop ? d : isTablet ? t : m;

    // Logos min-width constraint: if computed perView would make slides too small, reduce perView.
    const type = root.getAttribute("data-type");
    if (type === "logos") {
      const minW = parseInt(root.getAttribute("data-logo-minw") || "120", 10);
      const viewport = root.querySelector(".q-carousel__viewport");
      if (viewport && minW > 0) {
        const vw = viewport.clientWidth || 0;
        if (vw > 0) {
          const maxAllowed = Math.max(1, Math.floor(vw / minW));
          perView = clamp(perView, 1, maxAllowed);
        }
      }
    }

    return clamp(perView, 1, 12);
  }

  class QCarousel {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector(".q-carousel__viewport");
      this.track = root.querySelector(".q-carousel__track");
      this.slides = Array.from(root.querySelectorAll(".q-carousel__slide"));

      this.btnPrev = root.querySelector("[data-q-carousel-prev]");
      this.btnNext = root.querySelector("[data-q-carousel-next]");
      this.dotsHost = root.querySelector("[data-q-carousel-dots]");

      this.loop = root.getAttribute("data-loop") === "true";
      this.autoplayEnabled = root.getAttribute("data-autoplay") === "true";
      this.autoplaySpeed = parseInt(root.getAttribute("data-autoplay-speed") || "4000", 10);
      this.showDots = root.getAttribute("data-show-dots") === "true";
      this.showArrows = root.getAttribute("data-show-arrows") === "true";
      this.pauseHover = root.getAttribute("data-pause-hover") === "true";
      this.pauseFocus = root.getAttribute("data-pause-focus") === "true";

      this.timer = null;
      this.index = 0;
      this.perView = 1;
      this.pages = 1;

      this._onResize = this._onResize.bind(this);
      this._onScroll = this._onScroll.bind(this);
      this._onKeydown = this._onKeydown.bind(this);
      this._pause = this._pause.bind(this);
      this._resume = this._resume.bind(this);

      this.init();
    }

    init() {
      if (!this.viewport || !this.track || this.slides.length < 2) return;

      this._recalc();
      this._bind();
      this._renderDots();
      this._syncActiveFromScroll();

      if (this.autoplayEnabled && !prefersReducedMotion()) {
        this._startAutoplay();
      }
    }

    _bind() {
      window.addEventListener("resize", this._onResize);
      this.viewport.addEventListener("scroll", this._onScroll, { passive: true });
      this.viewport.addEventListener("keydown", this._onKeydown);

      if (this.showArrows) {
        this.btnPrev?.addEventListener("click", () => this.prev());
        this.btnNext?.addEventListener("click", () => this.next());
      }

      if (this.pauseHover) {
        this.root.addEventListener("mouseenter", this._pause);
        this.root.addEventListener("mouseleave", this._resume);
      }

      if (this.pauseFocus) {
        this.root.addEventListener("focusin", this._pause);
        this.root.addEventListener("focusout", this._resume);
      }

      // If a video/iframe is interacted with, pause autoplay (simple v1 heuristic).
      this.root
        .querySelectorAll("[data-q-carousel-video] iframe, [data-q-carousel-video] video")
        .forEach((el) => {
          el.addEventListener("focus", this._pause);
          el.addEventListener("mouseenter", this._pause);
        });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this._pause();
        else this._resume();
      });
    }

    _recalc() {
      this.perView = getPerView(this.root);
      this.pages = Math.max(1, Math.ceil(this.slides.length / this.perView));
      this.index = clamp(this.index, 0, this.pages - 1);
    }

    _renderDots() {
      if (!this.showDots || !this.dotsHost) return;

      this.dotsHost.innerHTML = "";
      for (let i = 0; i < this.pages; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "q-carousel__dot";
        b.setAttribute("aria-label", `Go to slide ${i + 1}`);
        b.addEventListener("click", () => this.goTo(i));
        this.dotsHost.appendChild(b);
      }
      this._setActiveDot();
    }

    _setActiveDot() {
      if (!this.showDots || !this.dotsHost) return;
      const dots = Array.from(this.dotsHost.querySelectorAll(".q-carousel__dot"));
      dots.forEach((d, i) => d.setAttribute("aria-current", i === this.index ? "true" : "false"));
    }

    _onResize() {
      const prevPages = this.pages;
      this._recalc();
      if (this.showDots && this.dotsHost && prevPages !== this.pages) {
        this._renderDots();
      } else {
        this._setActiveDot();
      }
      this.goTo(this.index, { behavior: "auto" });
    }

    _onScroll() {
      this._syncActiveFromScroll();
    }

    _syncActiveFromScroll() {
      const slideW = this._slideWidth();
      if (!slideW) return;
      const pageW = slideW * this.perView;
      const page = Math.round(this.viewport.scrollLeft / pageW);
      this.index = clamp(page, 0, this.pages - 1);
      this._setActiveDot();
    }

    _onKeydown(e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        this.next();
      }
    }

    _slideWidth() {
      const first = this.slides[0];
      if (!first) return 0;
      const rect = first.getBoundingClientRect();
      return rect.width || 0;
    }

    _scrollTo(left, opts = {}) {
      const behavior = prefersReducedMotion() ? "auto" : (opts.behavior || "smooth");
      this.viewport.scrollTo({ left, behavior });
    }

    goTo(pageIndex, opts = {}) {
      this.index = clamp(pageIndex, 0, this.pages - 1);
      const slideW = this._slideWidth();
      if (!slideW) return;
      const left = slideW * this.perView * this.index;
      this._scrollTo(left, opts);
      this._setActiveDot();
    }

    next() {
      if (this.index < this.pages - 1) {
        this.goTo(this.index + 1);
        return;
      }
      if (this.loop) this.goTo(0);
    }

    prev() {
      if (this.index > 0) {
        this.goTo(this.index - 1);
        return;
      }
      if (this.loop) this.goTo(this.pages - 1);
    }

    _startAutoplay() {
      this._stopAutoplay();
      this.timer = window.setInterval(() => this.next(), clamp(this.autoplaySpeed, 800, 60000));
    }

    _stopAutoplay() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }

    _pause() {
      this._stopAutoplay();
    }

    _resume() {
      if (this.autoplayEnabled && !prefersReducedMotion()) {
        this._startAutoplay();
      }
    }
  }

  function boot() {
    document.querySelectorAll(SELECTOR).forEach((root) => {
      if (root.__qCarousel) return;
      root.__qCarousel = new QCarousel(root);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
