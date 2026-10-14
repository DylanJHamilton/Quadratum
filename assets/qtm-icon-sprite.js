/* Quadratum: localize external SVG sprite references */
(function () {
  'use strict';
  var HOST_ID = 'qtm-icon-sprite-host';
  var cache = {};
  var pending = {};

  function hostSvg() {
    var host = document.getElementById(HOST_ID);
    if (!host) {
      host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      host.setAttribute('id', HOST_ID);
      host.setAttribute('aria-hidden', 'true');
      host.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
      document.body.insertBefore(host, document.body.firstChild);
    }
    return host;
  }

  function loadSprite(url) {
    if (cache[url]) return Promise.resolve(cache[url]);
    if (pending[url]) return pending[url];
    pending[url] = fetch(url, { mode: 'cors', credentials: 'omit' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (txt) { cache[url] = txt; delete pending[url]; return txt; })
      .catch(function () { delete pending[url]; return ''; });
    return pending[url];
  }

  function symbolMarkup(txt, id) {
    var start = txt.indexOf('<symbol id="' + id + '"');
    if (start < 0) return '';
    var end = txt.indexOf('</symbol>', start);
    return end < 0 ? '' : txt.slice(start, end + 9);
  }

  function localize(use) {
    var href = use.getAttribute('href') || use.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || '';
    var hash = href.indexOf('#');
    if (hash <= 0) return;
    var url = href.slice(0, hash);
    var id = href.slice(hash + 1);
    if (!/\.svg(\?|$)/.test(url) || !id) return;
    use.setAttribute('data-qtm-sprite', url);
    loadSprite(url).then(function (txt) {
      if (!txt) return;
      if (!document.getElementById(id)) {
        var markup = symbolMarkup(txt, id);
        if (!markup) return;
        var tpl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tpl.innerHTML = markup;
        var symbol = tpl.firstElementChild;
        if (symbol && !document.getElementById(id)) hostSvg().appendChild(symbol);
      }
      use.setAttribute('href', '#' + id);
      use.removeAttributeNS('http://www.w3.org/1999/xlink', 'href');
    });
  }

  function scan(root) {
    var list = (root || document).querySelectorAll('svg use[href*=".svg#"], svg use[*|href*=".svg#"]');
    for (var i = 0; i < list.length; i++) {
      if (!list[i].hasAttribute('data-qtm-sprite')) localize(list[i]);
    }
  }

  function start() {
    scan(document);
    if ('MutationObserver' in window) {
      new MutationObserver(function (records) {
        for (var i = 0; i < records.length; i++) {
          var added = records[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            if (added[j].nodeType === 1) scan(added[j]);
          }
        }
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
    document.addEventListener('shopify:section:load', function (e) { scan(e.target); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
