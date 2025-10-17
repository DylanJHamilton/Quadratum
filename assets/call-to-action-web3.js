// assets/cta-web3.js
// Quadratum — CTA: Web3 (≤1KB, section-scoped, no external deps)
/* global window, document */
(function () {
  function boot(root) {
    if (!root) return;
    var btn = root.querySelector('.js-connect');
    if (!btn) return;

    // Don’t attach if section is already set to connected state via setting
    if (btn.classList.contains('is-connected') || btn.getAttribute('aria-disabled') === 'true') return;

    btn.addEventListener('click', function () {
      // Mark connected
      btn.classList.add('is-connected');
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = 'Connected ✅';

      // Subtle feedback (respects reduced motion via CSS override)
      root.style.transition = 'opacity 160ms ease';
      root.style.opacity = '0.98';
      setTimeout(function () { root.style.opacity = ''; }, 200);

      // Analytics hook
      try {
        window.dispatchEvent(new CustomEvent('quadratum:cta-web3:connected', {
          detail: { sectionId: root.id.replace('cta-web3-', '') }
        }));
      } catch (e) { /* no-op */ }
    }, { passive: true });
  }

  // Initialize all instances on page (supports multiple sections)
  document.querySelectorAll('.q-cta-web3[id^="cta-web3-"]').forEach(boot);

  // Optional: observe new sections injected by Theme Editor
  if ('MutationObserver' in window) {
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes && m.addedNodes.forEach(function (n) {
          if (n.nodeType === 1 && n.matches && n.matches('.q-cta-web3[id^="cta-web3-"]')) boot(n);
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
(function(){
  var root=document.getElementById('cta-web3-{{ section.id }}');
  if(!root) return;
  var card=root.querySelector('.q-card,.qw3-card');
  if(!card) return;
  if(!('IntersectionObserver'in window)){ card.classList.add('is-visible'); return; }
  var io=new IntersectionObserver(function(e){ e.forEach(function(x){ if(x.isIntersecting){ card.classList.add('is-visible'); io.disconnect(); } });},{threshold:0.2});
  io.observe(card);
})();

const media = root.querySelector('.qw3-media-wrap,.media-wrap');
if(media){
  media.animate([
    { opacity: 0, transform: 'translateY(20px) scale(.95)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' }
  ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
}
