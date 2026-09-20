# Scoped layout head repair

The active head include now wraps existing token/utility CSS. Dedicated popup body ownership and normal-layout cascade order are preserved. Inert script text inside the token CSS is removed; full token/settings review remains pending.

- All seven Phase 3 + 50 Phase 4 suites pass (57 total).
- Actual normal/password layout fixtures cover enabled/disabled/editor popup settings, one dedicated body popup, no head body markup, token placement, custom CSS and actual popup control. Explicit Shopify section/font/form adapters are used; this is not live Shopify/browser certification.
- Schema/reference/protected architecture/state checks and CSS build pass. All 150 sections, 102 Theme Blocks and protected merchant state remain.
- Shopify CLI 4.8.0 exits 1: 636 diagnostics (17 errors / 619 warnings). One missing-image-dimension error disappears with the duplicate popup markup; no added diagnostic signatures. Existing debt remains unsuppressed.
- Normal/password layout CSS, popup/editor behavior and real saved settings remain mandatory live acceptance after Batch 9. Token mapping and utility review remain open in Batch 9.
