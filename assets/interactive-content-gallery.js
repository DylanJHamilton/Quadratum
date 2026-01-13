(() => {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function closest(el, sel) {
    while (el && el.nodeType === 1) {
      if (el.matches(sel)) return el;
      el = el.parentElement;
    }
    return null;
  }

  function getGapPx(track) {
    const cs = window.getComputedStyle(track);
    const gap = cs.columnGap || cs.gap || "0px";
    const n = parseFloat(gap);
    return Number.isFinite(n) ? n : 0;
  }

  function getStep(track) {
    const first = track.children && track.children.length ? track.children[0] : null;
    if (!first) return 0;
    const gap = getGapPx(track);
    return first.getBoundingClientRect().width + gap;
  }

  function scrollBySlides(track, dir) {
    const step = getStep(track);
    if (!step) return;

    // scroll 1 full card at a time (feels right for snap)
    const delta = step * dir;
    track.scrollBy({ left: delta, behavior: "smooth" });
  }

  function initCarouselFallback(carouselEl) {
    const track = carouselEl.querySelector("[data-q-carousel-track]");
    if (!track) return;

    const prev = carouselEl.querySelector("[data-q-carousel-prev]");
    const next = carouselEl.querySelector("[data-q-carousel-next]");

    // Buttons
    if (prev) prev.addEventListener("click", () => scrollBySlides(track, -1));
    if (next) next.addEventListener("click", () => scrollBySlides(track, 1));

    // Keyboard: left/right when focused inside carousel
    carouselEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBySlides(track, -1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBySlides(track, 1);
      }
    });

    // Make it focusable for keyboard users
    if (!carouselEl.hasAttribute("tabindex")) carouselEl.setAttribute("tabindex", "0");
  }

  function initAccordion(sectionEl) {
    const mode = sectionEl.getAttribute("data-mode");
    if (mode !== "image_accordion") return;

    const expandMode = sectionEl.getAttribute("data-accordion-mode") || "hover";
    const defaultActive = parseInt(sectionEl.getAttribute("data-accordion-default") || "1", 10);

    const panels = $$(".q-gallery__item", sectionEl);
    if (!panels.length) return;

    const setActive = (idx1) => {
      panels.forEach((p, i) => {
        const on = (i + 1) === idx1;
        p.classList.toggle("is-active", on);
        p.setAttribute("aria-selected", on ? "true" : "false");
      });
    };

    setActive(Math.min(Math.max(defaultActive, 1), panels.length));

    panels.forEach((panel, i) => {
      const idx1 = i + 1;

      const activate = () => setActive(idx1);

      if (expandMode === "click") {
        panel.addEventListener("click", (e) => {
          // don’t hijack link clicks
          const a = closest(e.target, "a");
          if (a) return;
          activate();
        });
      } else {
        panel.addEventListener("mouseenter", activate);
        panel.addEventListener("focusin", activate);
      }
    });
  }

  function initGallery(sectionEl) {
    // 1) Carousel fallback (works even if canonical engine fails)
    const carousels = $$("[data-q-carousel]", sectionEl);
    carousels.forEach(initCarouselFallback);

    // 2) Accordion behavior (v1)
    initAccordion(sectionEl);

    // Lightbox wiring is assumed elsewhere; if you want, I can harden it next.
  }

  // Boot
  const galleries = $$("[data-q-gallery]");
  galleries.forEach(initGallery);
})();
