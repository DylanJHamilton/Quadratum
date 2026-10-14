/* Accessible product image rotation. */
(() => {
  if (customElements.get('q-frame-spin')) return;
  customElements.define('q-frame-spin', class extends HTMLElement {
    connectedCallback() {
      this.life?.abort(); this.life = new AbortController();
      const on = (node, type, fn) => node?.addEventListener(type, fn, { signal: this.life.signal });
      const frames = [...this.querySelectorAll('[data-frame]')];
      const viewport = this.querySelector('[data-frame-viewport]');
      if (!viewport || !frames.length) return;
      let index = 0, pointer = null, startX = 0, startY = 0;
      const caption = this.querySelector('[data-frame-caption]');
      const pause = this.querySelector('[data-frame-pause]');
      const reduced = matchMedia('(prefers-reduced-motion: reduce)');
      const stop = () => { clearInterval(this.timer); this.timer = null; if (pause) pause.hidden = true; };
      const show = next => {
        index = (next + frames.length) % frames.length;
        frames.forEach((frame, i) => { frame.hidden = i !== index; });
        const text = `View ${index + 1} of ${frames.length}${frames[index].dataset.frameTitle ? ', ' + frames[index].dataset.frameTitle : ''}`;
        viewport.setAttribute('aria-valuenow', String(index + 1)); viewport.setAttribute('aria-valuetext', text);
        if (caption) caption.textContent = text;
      };
      this.querySelector('[data-frame-controls]').hidden = frames.length < 2;
      on(this.querySelector('[data-frame-prev]'), 'click', () => { stop(); show(index - 1); });
      on(this.querySelector('[data-frame-next]'), 'click', () => { stop(); show(index + 1); });
      on(viewport, 'keydown', event => {
        if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
        event.preventDefault(); stop();
        show(event.key === 'Home' ? 0 : event.key === 'End' ? frames.length - 1 : index + (['ArrowLeft','ArrowDown'].includes(event.key) ? -1 : 1));
      });
      on(viewport, 'pointerdown', event => { if (!event.isPrimary || event.button !== 0) return; stop(); pointer = event.pointerId; startX = event.clientX; startY = event.clientY; viewport.setPointerCapture(pointer); });
      on(viewport, 'pointermove', event => {
        if (event.pointerId !== pointer) return;
        const distance = event.clientX - startX;
        if (Math.abs(event.clientY - startY) > Math.abs(distance) && Math.abs(event.clientY - startY) > 20) { pointer = null; return; }
        if (Math.abs(distance) >= 40) { const steps = Math.trunc(distance / 40); show(index - steps); startX += steps * 40; }
      });
      for (const type of ['pointerup','pointercancel','lostpointercapture']) on(viewport, type, () => { pointer = null; });
      on(viewport, 'dragstart', event => event.preventDefault());
      on(this, 'focusin', stop); on(pause, 'click', stop); on(reduced, 'change', stop);
      on(document, 'visibilitychange', () => { if (document.hidden) stop(); });
      show(0);
      if (this.dataset.autoAdvance === 'true' && frames.length > 1 && !reduced.matches) {
        if (pause) pause.hidden = false;
        this.timer = setInterval(() => { if (!document.hidden) show(index + 1); }, 3500);
      }
    }
    disconnectedCallback() { clearInterval(this.timer); this.life?.abort(); }
  });
})();
