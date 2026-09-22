/* Shared Media/Logos and testimonial carousel enhancement.
   Host CSS owns sizing; measurements, not another host's settings, own navigation.
   Native overflow/scroll-snap remains usable before JS. */
(() => {
  const selector = '[data-q-carousel-engine="shared"]';
  if (window.QuadratumCarousel) { window.QuadratumCarousel.scan(document); return; }
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const roots = scope => [...(scope.matches?.(selector) ? [scope] : []), ...scope.querySelectorAll(selector)];

  class QCarousel {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector('.q-carousel__viewport');
      this.track = root.querySelector('.q-carousel__track');
      this.slides = [...root.querySelectorAll('.q-carousel__slide')];
      this.prev = root.querySelector('[data-q-carousel-prev]');
      this.next = root.querySelector('[data-q-carousel-next]');
      this.dots = root.querySelector('[data-q-carousel-dots]');
      this.toggle = root.querySelector('[data-q-carousel-pause]');
      this.loop = root.dataset.loop === 'true';
      this.autoplay = root.dataset.autoplay === 'true';
      this.speed = clamp(Number(root.dataset.autoplaySpeed) || 4000, 1500, 60000);
      this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.abort = new AbortController();
      this.timer = null;
      this.index = 0;
      this.targets = [0];
      this.manualPause = false;
      this.hovered = false;
      this.focused = root.contains(document.activeElement);
      this.onScreen = !root.hasAttribute('data-qtm-block-carousel') || !window.IntersectionObserver;
      this.editorPause = root.dataset.designMode === 'true';
      this.destroyed = false;
      this.status = document.createElement('span');
      this.status.className = 'sr-only';
      this.status.setAttribute('role', 'status');
      this.status.setAttribute('aria-live', 'polite');
      this.root.append(this.status);
      this.listen = (node, event, fn, options = {}) => node?.addEventListener(event, fn, { ...options, signal: this.abort.signal });

      this.listen(this.prev, 'click', () => { this.pause(); this.step(-1, true); });
      this.listen(this.next, 'click', () => { this.pause(); this.step(1, true); });
      this.listen(this.dots, 'click', e => {
        const dot = e.target.closest('[data-carousel-page]');
        if (dot) { this.pause(); this.goTo(Number(dot.dataset.carouselPage), true); }
      });
      this.listen(this.toggle, 'click', () => {
        this.manualPause = !this.manualPause;
        if (!this.manualPause) this.stopMedia();
        this.syncAutoplay();
      });
      this.listen(this.viewport, 'scroll', () => { this.syncScroll(); this.stopHiddenMedia(); }, { passive: true });
      this.listen(this.viewport, 'pointerdown', () => this.pause(), { passive: true });
      this.listen(this.viewport, 'keydown', e => {
        if (e.target !== this.viewport || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault(); this.pause();
        if (e.key === 'Home') this.goTo(0, true);
        else if (e.key === 'End') this.goTo(this.targets.length - 1, true);
        else this.step((e.key === 'ArrowRight' ? 1 : -1) * (this.rtl ? -1 : 1), true);
      });
      this.listen(root, 'mouseenter', () => { this.hovered = true; this.syncAutoplay(); });
      this.listen(root, 'mouseleave', () => { this.hovered = false; this.syncAutoplay(); });
      this.listen(root, 'focusin', () => { this.focused = true; this.syncAutoplay(); });
      this.listen(root, 'focusout', e => { this.focused = root.contains(e.relatedTarget); this.syncAutoplay(); });
      this.listen(root, 'click', e => {
        const play = e.target.closest('[data-q-carousel-play]');
        if (!play) return;
        const container = play.closest('[data-q-carousel-video]');
        const template = container?.querySelector('template');
        if (!template || container.querySelector('[data-carousel-mounted]')) return;
        this.pause();
        const mounted = document.createElement('div');
        mounted.dataset.carouselMounted = '';
        mounted.className = 'q-ml-ratio';
        mounted.append(template.content.cloneNode(true));
        container.append(mounted);
        play.hidden = true;
        const control = mounted.querySelector('iframe, video, button, a[href]');
        if (control) control.focus();
      });
      this.listen(document, 'visibilitychange', () => {
        if (document.hidden) this.stopMedia();
        this.syncAutoplay();
      });
      this.listen(window, 'resize', () => this.recalc());
      this.onMotion = () => { if (this.motion.matches) this.stopMedia(); this.syncAutoplay(); };
      this.motion.addEventListener?.('change', this.onMotion);
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => this.recalc());
        this.resizeObserver.observe(this.viewport);
      }
      if (window.IntersectionObserver) {
        this.intersection = new IntersectionObserver(entries => {
          this.onScreen = entries[0].isIntersecting;
          if (!this.onScreen) this.stopMedia();
          this.syncAutoplay();
        });
        this.intersection.observe(root);
      }
      root.querySelectorAll('[data-q-carousel-play]').forEach(button => { button.hidden = false; });
      root.classList.add('is-enhanced');
      root.classList.toggle('has-arrows', root.dataset.showArrows === 'true' && this.slides.length > 1);
      this.recalc();
    }

    recalc() {
      if (this.destroyed) return;
      const width = this.viewport.clientWidth;
      const first = this.slides[0].getBoundingClientRect();
      const style = getComputedStyle(this.track);
      const gap = parseFloat(style.columnGap || style.gap) || 0;
      const step = first.width + gap;
      this.rtl = getComputedStyle(this.viewport).direction === 'rtl';
      this.maximum = Math.max(0, this.viewport.scrollWidth - width);
      const arrowsNeeded = this.root.dataset.showArrows === 'true' && this.maximum > 1;
      if (this.root.classList.contains('has-arrows') !== arrowsNeeded) {
        this.root.classList.toggle('has-arrows', arrowsNeeded);
        this.recalc();
        return;
      }
      this.perView = step > 0 ? Math.max(1, Math.floor((width + gap + 1) / step)) : 1;
      this.targets = [0];
      if (width > 0 && step > 0 && this.maximum > 1) {
        for (let i = this.perView; i < this.slides.length; i += this.perView) {
          const rect = this.slides[i].getBoundingClientRect();
          const measured = Math.abs(rect.left - first.left) || step * i;
          const target = Math.min(measured, this.maximum);
          if (target > this.targets[this.targets.length - 1] + 1) this.targets.push(target);
        }
        if (this.maximum > this.targets[this.targets.length - 1] + 1) this.targets.push(this.maximum);
      }
      this.renderDots();
      this.syncScroll();
      this.stopHiddenMedia();
      this.syncAutoplay();
    }

    renderDots() {
      if (!this.dots) return;
      if (this.dots.children.length === this.targets.length) return;
      const focused = this.dots.contains(document.activeElement);
      const focusedPage = Number(document.activeElement?.dataset.carouselPage) || 0;
      this.dots.replaceChildren(...this.targets.map((_, i) => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'q-carousel__dot q-th__dot';
        button.dataset.carouselPage = String(i);
        button.setAttribute('aria-label', `${this.root.dataset.goToLabel || 'Go to page'} ${i + 1}`);
        return button;
      }));
      if (focused) this.dots.children[Math.min(focusedPage, this.targets.length - 1)]?.focus();
    }

    syncScroll() {
      const position = clamp(Math.abs(this.viewport.scrollLeft), 0, this.maximum);
      this.index = this.targets.reduce((best, value, index) => Math.abs(value - position) < Math.abs(this.targets[best] - position) ? index : best, 0);
      this.syncControls();
    }

    syncControls() {
      const multiple = this.targets.length > 1;
      if (this.prev) { this.prev.hidden = !multiple; this.prev.disabled = !this.loop && this.index === 0; }
      if (this.next) { this.next.hidden = !multiple; this.next.disabled = !this.loop && this.index === this.targets.length - 1; }
      if (this.dots) {
        this.dots.hidden = !multiple;
        [...this.dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === this.index)));
      }
    }

    goTo(page, announce = false) {
      this.index = clamp(page, 0, this.targets.length - 1);
      this.stopMedia();
      if (announce && this.root.dataset.announce !== 'false') this.status.textContent = `Page ${this.index + 1} of ${this.targets.length}`;
      this.viewport.scrollTo({ left: this.targets[this.index] * (this.rtl ? -1 : 1), behavior: this.motion.matches ? 'auto' : 'smooth' });
      this.syncControls();
      this.syncAutoplay();
    }

    step(delta, announce = false) {
      const page = this.index + delta;
      this.goTo(this.loop ? (page + this.targets.length) % this.targets.length : page, announce);
    }

    pause() { this.manualPause = true; this.syncAutoplay(); }

    syncAutoplay() {
      window.clearInterval(this.timer); this.timer = null;
      if (this.toggle) {
        this.toggle.hidden = !this.autoplay || this.targets.length < 2;
        this.toggle.disabled = this.motion.matches;
        this.toggle.setAttribute('aria-pressed', String(this.manualPause || this.motion.matches));
        this.toggle.textContent = this.motion.matches ? (this.root.dataset.reducedMotionLabel || 'Rotation paused (reduced motion)') : this.manualPause ? (this.root.dataset.resumeLabel || 'Resume rotation') : (this.root.dataset.pauseLabel || 'Pause rotation');
      }
      const paused = this.manualPause || this.motion.matches || document.hidden || !this.onScreen || this.editorPause ||
        (this.root.hasAttribute('data-qtm-block-carousel') && !this.root.getClientRects().length) ||
        (this.hovered && this.root.dataset.pauseHover === 'true') || (this.focused && this.root.dataset.pauseFocus === 'true');
      if (!this.destroyed && this.autoplay && this.targets.length > 1 && !paused && (this.loop || this.index < this.targets.length - 1)) {
        this.timer = window.setInterval(() => this.step(1), this.speed);
      }
    }

    stopMedia(slide = this.root, restoreToPlay = true) {
      slide.querySelectorAll('[data-carousel-mounted]').forEach(mounted => {
        mounted.querySelectorAll('video, audio').forEach(media => media.pause());
        const play = mounted.parentElement.querySelector('[data-q-carousel-play]');
        const restoreFocus = mounted.contains(document.activeElement);
        mounted.remove();
        if (play) { play.hidden = false; if (restoreFocus && !this.destroyed) (restoreToPlay ? play : this.viewport).focus(); }
      });
    }

    stopHiddenMedia() {
      const viewport = this.viewport.getBoundingClientRect();
      this.slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        if (rect.right <= viewport.left + 1 || rect.left >= viewport.right - 1) this.stopMedia(slide, false);
      });
    }

    destroy() {
      this.destroyed = true;
      window.clearInterval(this.timer); this.timer = null;
      this.abort.abort();
      this.status.remove();
      this.motion.removeEventListener?.('change', this.onMotion);
      this.resizeObserver?.disconnect(); this.intersection?.disconnect();
      this.stopMedia();
      [this.prev, this.next, this.dots, this.toggle].forEach(control => { if (control) control.hidden = true; });
      this.root.querySelectorAll('[data-q-carousel-play]').forEach(button => { button.hidden = true; });
      this.root.classList.remove('is-enhanced', 'has-arrows');
      delete this.root.__qCarousel;
    }
  }

  function scan(scope = document) {
    if (!scope?.querySelectorAll) return;
    roots(scope).forEach(root => {
      if (!root.__qCarousel && root.querySelector('.q-carousel__viewport') && root.querySelector('.q-carousel__track') && root.querySelector('.q-carousel__slide')) root.__qCarousel = new QCarousel(root);
    });
  }
  window.QuadratumCarousel = { scan };
  function start() {
    scan();
    // Theme Blocks can be inserted/removed without replacing their host section.
    if (window.MutationObserver && document.body) new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (!node.isConnected && node.querySelectorAll) roots(node).filter(root => root.hasAttribute('data-qtm-block-carousel')).forEach(root => root.__qCarousel?.destroy());
        for (const node of record.addedNodes) if (node.querySelectorAll) roots(node).filter(root => root.hasAttribute('data-qtm-block-carousel')).forEach(root => scan(root));
      }
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  document.addEventListener('shopify:section:load', e => scan(e.target));
  document.addEventListener('shopify:section:unload', e => roots(e.target).forEach(root => root.__qCarousel?.destroy()));
  document.addEventListener('shopify:block:select', e => {
    const slide = e.target.closest('.q-carousel__slide');
    const instance = slide?.closest(selector)?.__qCarousel;
    if (instance) { instance.editorPause = true; instance.goTo(Math.floor(instance.slides.indexOf(slide) / instance.perView)); }
  });
  document.addEventListener('shopify:block:deselect', e => {
    const instance = e.target.closest(selector)?.__qCarousel;
    if (instance) { instance.editorPause = instance.root.dataset.designMode === 'true'; instance.syncAutoplay(); }
  });
})();
