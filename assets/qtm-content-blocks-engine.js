(function () {
  if (window.QuadratumContentBlocksEngineLoaded) return;

  window.QuadratumContentBlocksEngineLoaded = true;

  const styles = `
    .qtm-content-block,
    .qtm-content-block *,
    .qtm-content-block *::before,
    .qtm-content-block *::after {
      box-sizing: border-box;
    }

    .qtm-content-block {
      width: 100%;
      margin-top: var(--qtm-block-margin-top, 0);
      margin-bottom: var(--qtm-block-margin-bottom, 24px);
      padding-top: var(--qtm-block-padding-top, 0);
      padding-bottom: var(--qtm-block-padding-bottom, 0);
      padding-left: var(--qtm-block-padding-left, 0);
      padding-right: var(--qtm-block-padding-right, 0);
      background: var(--qtm-block-background, transparent);
      border: var(--qtm-block-border-width, 0) solid var(--qtm-block-border-color, transparent);
      border-radius: var(--qtm-block-border-radius, 0);
    }

    .qtm-content-block__inner {
      width: 100%;
    }

    .qtm-content-width--auto .qtm-content-block__inner {
      max-width: none;
    }

    .qtm-content-width--small .qtm-content-block__inner {
      max-width: 480px;
    }

    .qtm-content-width--medium .qtm-content-block__inner {
      max-width: 720px;
    }

    .qtm-content-width--large .qtm-content-block__inner {
      max-width: 960px;
    }

    .qtm-content-width--full .qtm-content-block__inner {
      max-width: 100%;
    }

    .qtm-content-width--custom .qtm-content-block__inner {
      max-width: var(--qtm-block-custom-width, 100%);
    }

    .qtm-content-align--left .qtm-content-block__inner {
      margin-left: 0;
      margin-right: auto;
      text-align: left;
    }

    .qtm-content-align--center .qtm-content-block__inner {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }

    .qtm-content-align--right .qtm-content-block__inner {
      margin-left: auto;
      margin-right: 0;
      text-align: right;
    }

    .qtm-desktop-width--25 {
      max-width: 25%;
    }

    .qtm-desktop-width--50 {
      max-width: 50%;
    }

    .qtm-desktop-width--75 {
      max-width: 75%;
    }

    .qtm-desktop-width--100 {
      max-width: 100%;
    }

    @media screen and (min-width: 990px) {
      .qtm-hide-desktop {
        display: none !important;
      }
    }

    @media screen and (min-width: 750px) and (max-width: 989px) {
      .qtm-hide-tablet {
        display: none !important;
      }

      .qtm-desktop-width--25,
      .qtm-desktop-width--50,
      .qtm-desktop-width--75,
      .qtm-desktop-width--100 {
        max-width: 100%;
      }
    }

    @media screen and (max-width: 749px) {
      .qtm-hide-mobile {
        display: none !important;
      }

      .qtm-desktop-width--25,
      .qtm-desktop-width--50,
      .qtm-desktop-width--75,
      .qtm-desktop-width--100 {
        max-width: 100%;
      }

      .qtm-mobile-width--25 {
        max-width: 25%;
      }

      .qtm-mobile-width--50 {
        max-width: 50%;
      }

      .qtm-mobile-width--75 {
        max-width: 75%;
      }

      .qtm-mobile-width--100 {
        max-width: 100%;
      }
    }

    .qtm-animate {
      opacity: 0;
      transition:
        opacity 0.55s ease,
        transform 0.55s ease;
      will-change: opacity, transform;
    }

    .qtm-animate.is-visible {
      opacity: 1;
      transform: none;
    }

    .qtm-animate--fade {
      transform: none;
    }

    .qtm-animate--fade-up {
      transform: translateY(20px);
    }

    .qtm-animate--fade-down {
      transform: translateY(-20px);
    }

    .qtm-animate--fade-left {
      transform: translateX(20px);
    }

    .qtm-animate--fade-right {
      transform: translateX(-20px);
    }

    .qtm-animate--zoom {
      transform: scale(0.96);
    }

    .qtm-heading {
      display: block;
      max-width: var(--qtm-heading-max-width, 760px);
      margin: 0;
      color: var(--qtm-heading-color, currentColor);
      font-family: var(--qtm-heading-font-family, inherit);
      font-weight: var(--qtm-heading-font-weight, inherit);
      letter-spacing: var(--qtm-heading-letter-spacing, normal);
      line-height: var(--qtm-heading-line-height, 1.1);
    }

    .qtm-content-align--left .qtm-heading {
      margin-left: 0;
      margin-right: auto;
    }

    .qtm-content-align--center .qtm-heading {
      margin-left: auto;
      margin-right: auto;
    }

    .qtm-content-align--right .qtm-heading {
      margin-left: auto;
      margin-right: 0;
    }

    .qtm-heading--display {
      font-size: clamp(3rem, 7vw, 6.75rem);
      line-height: 0.95;
      letter-spacing: -0.055em;
    }

    .qtm-heading--large {
      font-size: clamp(2.25rem, 5vw, 4.5rem);
      line-height: 1;
      letter-spacing: -0.045em;
    }

    .qtm-heading--medium {
      font-size: clamp(1.75rem, 3.5vw, 3rem);
      line-height: 1.08;
      letter-spacing: -0.035em;
    }

    .qtm-heading--small {
      font-size: clamp(1.25rem, 2vw, 1.75rem);
      line-height: 1.18;
      letter-spacing: -0.02em;
    }

    .qtm-heading--gradient {
      background: var(--qtm-heading-gradient, linear-gradient(90deg, currentColor, currentColor));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .qtm-heading--underline {
      position: relative;
      display: inline-block;
    }

    .qtm-heading--underline::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.18em;
      width: 100%;
      height: 0.12em;
      min-height: 4px;
      background: var(--qtm-heading-underline-color, currentColor);
      border-radius: 999px;
    }

    .qtm-content-align--center .qtm-heading--underline::after {
      left: 50%;
      transform: translateX(-50%);
      width: 72%;
    }

    .qtm-heading__highlight {
      color: var(--qtm-heading-highlight-color, currentColor);
      background: var(--qtm-heading-highlight-background, transparent);
      border-radius: var(--qtm-heading-highlight-radius, 0.2em);
      padding-inline: var(--qtm-heading-highlight-padding-x, 0);
    }

    @media screen and (max-width: 749px) {
      .qtm-heading--display {
        font-size: clamp(2.5rem, 12vw, 4rem);
      }

      .qtm-heading--large {
        font-size: clamp(2rem, 10vw, 3.25rem);
      }

      .qtm-heading--medium {
        font-size: clamp(1.6rem, 8vw, 2.35rem);
      }

      .qtm-heading--small {
        font-size: clamp(1.2rem, 6vw, 1.5rem);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .qtm-animate {
        opacity: 1;
        transform: none;
        transition: none;
        will-change: auto;
      }
    }
  `;

  function injectStyles() {
    if (document.getElementById('qtm-content-blocks-engine-styles')) return;

    const styleTag = document.createElement('style');
    styleTag.id = 'qtm-content-blocks-engine-styles';
    styleTag.textContent = styles;

    document.head.appendChild(styleTag);
  }

  function initAnimations(scope) {
    const root = scope || document;
    const animatedBlocks = root.querySelectorAll('.qtm-animate:not(.is-observed)');

    if (!animatedBlocks.length) return;

    if (!('IntersectionObserver' in window)) {
      animatedBlocks.forEach((block) => {
        block.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15
      }
    );

    animatedBlocks.forEach((block) => {
      block.classList.add('is-observed');
      observer.observe(block);
    });
  }

  function initContentBlocks(scope) {
    injectStyles();
    initAnimations(scope);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initContentBlocks(document);
  });

  document.addEventListener('shopify:section:load', function (event) {
    initContentBlocks(event.target);
  });

  document.addEventListener('shopify:block:select', function (event) {
    if (!event.target) return;

    const animatedBlock = event.target.classList && event.target.classList.contains('qtm-animate')
      ? event.target
      : event.target.querySelector && event.target.querySelector('.qtm-animate');

    if (animatedBlock) {
      animatedBlock.classList.add('is-visible');
    }
  });

  window.QuadratumContentBlocksEngine = {
    init: initContentBlocks
  };
})();