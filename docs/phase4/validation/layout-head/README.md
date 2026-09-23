# Scoped layout head repair

The active head include now wraps existing token/utility CSS. Dedicated popup body ownership and normal-layout cascade order are preserved. Inert script text inside the token CSS is removed; full token/settings review remains pending.

- All seven Phase 3 + 50 Phase 4 suites pass (57 total).
- Actual normal/password layout fixtures cover enabled/disabled/editor popup settings, one dedicated body popup, no head body markup, token placement, custom CSS and actual popup control. Explicit Shopify section/font/form adapters are used; this is not live Shopify/browser certification.
- Schema/reference/protected architecture/state checks and CSS build pass. All 150 sections, 102 Theme Blocks and protected merchant state remain.
- Shopify CLI 4.8.0 exits 1: 636 diagnostics (17 errors / 619 warnings). One missing-image-dimension error disappears with the duplicate popup markup; no added diagnostic signatures. Existing debt remains unsuppressed.
- Normal/password layout CSS, popup/editor behavior and real saved settings remain mandatory live acceptance after Batch 9. Token mapping and utility review remain open in Batch 9.

GitGuardian incident 37480944 identified the former filename-keyed digest for the password layout. Each recorded value was recomputed from its file and matches. Evidence now uses explicit `path` / `sha256` fields; no credential was involved, no scanner suppression or history rewrite. The follow-up check at commit `ebe9972194f0d96a67c7e7178df4a8bef156221c` still flags only the original occurrence in `b72a704ae6e76c1434616f61198a1b7d56ec03f0`. [Check output](https://github.com/DylanJHamilton/Quadratum/runs/106147395927). Owner GitGuardian false-positive triage of incident 37480944 remains queued; no new detection is reported, and engineering continues.
