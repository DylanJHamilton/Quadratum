/* Quadratum — Maps Locator JS
   File: assets/maps-locator.js

   - Loads Google Maps JS API once
   - Powers:
      - pin <-> card sync
      - search + tag filter
*/

(function () {
  const state = {
    loaderPromise: null,
    mapsReady: false
  };

  function qs(root, sel) { return root.querySelector(sel); }
  function qsa(root, sel) { return Array.from(root.querySelectorAll(sel)); }

  function loadGoogleMaps(apiKey) {
    if (!apiKey) return Promise.reject(new Error("Missing Google Maps API key"));
    if (state.loaderPromise) return state.loaderPromise;

    state.loaderPromise = new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        state.mapsReady = true;
        resolve(window.google.maps);
        return;
      }

      const cbName = "QMapsInit_" + Math.random().toString(16).slice(2);
      window[cbName] = () => {
        state.mapsReady = true;
        resolve(window.google.maps);
        try { delete window[cbName]; } catch (e) {}
      };

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        encodeURIComponent(apiKey) +
        "&callback=" +
        encodeURIComponent(cbName);

      script.onerror = () => reject(new Error("Failed to load Google Maps JS API"));
      document.head.appendChild(script);
    });

    return state.loaderPromise;
  }

  function parseData(sectionId) {
    const el = document.getElementById("QMapLocatorData-" + sectionId);
    if (!el) return null;
    try { return JSON.parse(el.textContent || "{}"); } catch (e) { return null; }
  }

  function normalize(str) {
    return (str || "").toLowerCase().trim();
  }

  function collectTags(cards) {
    const set = new Set();
    cards.forEach(card => {
      const tags = (card.getAttribute("data-location-tags") || "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
      tags.forEach(t => set.add(t));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  function initFilters(root, cards) {
    const chipsWrap = qs(root, "[data-filter-chips]");
    if (!chipsWrap) return;

    const tags = collectTags(cards);
    chipsWrap.innerHTML = "";
    tags.forEach(tag => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "q-map-chip";
      btn.textContent = tag;
      btn.setAttribute("data-filter", tag);
      chipsWrap.appendChild(btn);
    });
  }

  function applyFiltering(root, cards, activeTag, query) {
    const q = normalize(query);
    cards.forEach(card => {
      const name = normalize(card.getAttribute("data-location-name"));
      const tags = normalize(card.getAttribute("data-location-tags"));
      const addr = normalize(card.innerText);

      const matchesQuery = !q || name.includes(q) || tags.includes(q) || addr.includes(q);
      const matchesTag = !activeTag || activeTag === "all" || (card.getAttribute("data-location-tags") || "")
        .split(",").map(t => t.trim()).includes(activeTag);

      card.style.display = (matchesQuery && matchesTag) ? "" : "none";
    });
  }

  function setActiveCard(cards, idx) {
    cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
  }

  function scrollCardIntoView(card) {
    try {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (e) {
      card.scrollIntoView();
    }
  }

  function initMapInstance(root, data, cards) {
    const mapEl = document.getElementById("QMap-" + data.sectionId);
    if (!mapEl) return;

    const centerLat = parseFloat(data.center.lat);
    const centerLng = parseFloat(data.center.lng);
    const zoom = Number(data.zoom || 11);

    const map = new window.google.maps.Map(mapEl, {
      center: { lat: isFinite(centerLat) ? centerLat : 37.7749, lng: isFinite(centerLng) ? centerLng : -122.4194 },
      zoom: isFinite(zoom) ? zoom : 11,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false
    });

    const bounds = new window.google.maps.LatLngBounds();
    const markers = [];

    cards.forEach((card, idx) => {
      const lat = parseFloat(card.getAttribute("data-location-lat"));
      const lng = parseFloat(card.getAttribute("data-location-lng"));
      if (!isFinite(lat) || !isFinite(lng)) return;

      const pos = { lat, lng };
      bounds.extend(pos);

      const marker = new window.google.maps.Marker({
        position: pos,
        map,
        title: card.getAttribute("data-location-name") || "Location"
      });

      marker.addListener("click", () => {
        setActiveCard(cards, idx);
        scrollCardIntoView(card);
      });

      markers.push({ marker, idx });
    });

    if (markers.length > 1) {
      map.fitBounds(bounds, 40);
    } else if (markers.length === 1) {
      map.setCenter(markers[0].marker.getPosition());
      map.setZoom(Math.max(zoom, 13));
    }

    // card -> map sync
    cards.forEach((card, idx) => {
      const focus = () => {
        setActiveCard(cards, idx);

        const lat = parseFloat(card.getAttribute("data-location-lat"));
        const lng = parseFloat(card.getAttribute("data-location-lng"));
        if (isFinite(lat) && isFinite(lng)) {
          map.panTo({ lat, lng });
          map.setZoom(Math.max(map.getZoom() || zoom, 13));
        }
      };

      card.addEventListener("click", focus);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          focus();
        }
      });
    });
  }

  function initLocator(sectionId) {
    const root = document.querySelector(`.q-map-locator[data-section-id="${sectionId}"]`);
    if (!root) return;

    const data = parseData(sectionId);
    if (!data) return;

    const cards = qsa(root, "[data-location-card]");
    const searchInput = qs(root, ".q-map-locator__search");
    const allChip = qs(root, '.q-map-chip[data-filter="all"]');

    let activeTag = "all";
    let query = "";

    initFilters(root, cards);

    // filter click handling (including dynamically created chips)
    root.addEventListener("click", (e) => {
      const btn = e.target && e.target.closest && e.target.closest(".q-map-chip");
      if (!btn) return;

      const val = btn.getAttribute("data-filter") || "all";
      activeTag = val;

      qsa(root, ".q-map-chip").forEach(ch => ch.classList.toggle("is-active", (ch.getAttribute("data-filter") || "all") === activeTag));
      applyFiltering(root, cards, activeTag, query);
    });

    if (allChip) allChip.classList.add("is-active");

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        query = searchInput.value || "";
        applyFiltering(root, cards, activeTag, query);
      });
    }

    // map init if enabled
    const listOnly = root.getAttribute("data-list-only") === "true";
    if (listOnly || !data.mapEnabled || !data.google.enabled) return;

    loadGoogleMaps(data.google.apiKey)
      .then(() => initMapInstance(root, data, cards))
      .catch(() => {
        // degrade gracefully: keep list usable
        root.setAttribute("data-list-only", "true");
        const frame = qs(root, ".q-map-locator__mapframe");
        if (frame) frame.classList.add("q-map-locator__mapframe--hidden");
      });
  }

  function boot() {
    const ids = window.QuadratumMapLocators || [];
    ids.forEach(initLocator);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
