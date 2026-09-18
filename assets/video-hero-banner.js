/* Decorative video backgrounds must remain controllable and disposable. */
(() => {
  if (window.qtmVideoHeroBound) return;
  window.qtmVideoHeroBound = true;
  const instances = new WeakMap();
  function init(root) {
    if (instances.has(root)) return;
    const toggle = root.querySelector('[data-video-hero-toggle]');
    if (!toggle) return;
    const events = new AbortController();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia(root.dataset.videoHeroMobileQuery || '(max-width: 749px)');
    let paused = motion.matches;
    const videos = root.querySelectorAll('video');
    const frames = root.querySelectorAll('iframe[data-video-hero-src]');
    function playback() {
      const hiddenBySetting = root.classList.contains(mobile.matches ? 'hide-mobile' : 'hide-desktop');
      const playing = !paused && !document.hidden && !hiddenBySetting;
      videos.forEach(video => {
        if (playing) video.play()?.catch(() => {}); else video.pause();
      });
      frames.forEach(frame => {
        frame.hidden = !playing;
        if (playing) { if (!frame.hasAttribute('src')) frame.src = frame.dataset.videoHeroSrc; }
        else frame.removeAttribute('src');
      });
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? 'Play background video' : 'Pause background video';
    }
    toggle.hidden = false;
    toggle.addEventListener('click', () => { paused = !paused; playback(); }, {signal:events.signal});
    motion.addEventListener('change', () => { if (motion.matches) paused = true; playback(); }, {signal:events.signal});
    mobile.addEventListener('change', playback, {signal:events.signal});
    document.addEventListener('visibilitychange', playback, {signal:events.signal});
    instances.set(root, () => {
      events.abort(); videos.forEach(video => video.pause());
      frames.forEach(frame => { frame.removeAttribute('src'); frame.hidden = true; });
      toggle.hidden = true; instances.delete(root);
    });
    playback();
  }
  const roots = scope => [...(scope.matches?.('[data-video-hero]') ? [scope] : []), ...scope.querySelectorAll('[data-video-hero]')];
  const boot = () => roots(document).forEach(init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
  document.addEventListener('shopify:section:load', event => roots(event.target).forEach(init));
  document.addEventListener('shopify:section:unload', event => roots(event.target).forEach(root => instances.get(root)?.()));
})();
