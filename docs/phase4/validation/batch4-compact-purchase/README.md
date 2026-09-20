# Batch 4 — Compact and shared purchase controls

Source/Liquid/DOM evidence only. PR #22 remains DRAFT; Shopify storefront/editor acceptance is deferred until engineering through Batches 4–9 is complete.

- `suite-summary.json` / `regressions.txt`: seven Phase 3 and 34 Phase 4 suites pass (41 total).
- `compact-purchase-final.txt` / `phase3-final-acceptance.txt`: final affected-suite reruns after adding native variant navigation without JavaScript and source-width bounds for responsive images. The Compact suite uses real section/snippet Liquid, Shopify-shaped product fixtures and explicit money/image/structured-data/form/comment adapters. Browser geometry and real commerce are not certified by these fixtures.
- Compact coverage: all section settings/endpoints, actual default preset and all eight block types, repeated singleton controls, price copies, blank/default-only/selected/missing media, safe text/JSON, native variant links, optional/required/incompatible plans, allocation prices, quantity min/max/increment, invalid combinations, locale-aware native/AJAX payloads, two products in one wrapper, both asset orders, missing/malformed data, URL/back and editor unload/reload. Classic/Master fixtures cover dependency placement and price updates only.
- `structural.json` / `references.json`: schemas, JavaScript syntax, references, protected architecture, 150 sections, 102 Theme Blocks, unchanged merchant state and no deletions.
- `inventory.json` / `register-summary.json`: 461 primary entries, 310 NOT REVIEWED, 129 live queued, 20 retained dormant, one build-only, one retained deletion candidate. Batch 4: six of 35 have source dispositions; 29 remain NOT REVIEWED.
- `source-hashes.json` / `consumer-trace.json`: changed runtime files and literal dependency evidence. Shared purchase data belongs inside Compact, Classic and Master. Shared selling-plan controls retain the existing main-product, hero/CTA and Theme Block entry points; passing regression contracts does not approve every host's settings/presentation.
- `css-build.txt`: CSS build passed. Whitespace validation also passed.
- `themecheck.json` / `themecheck-movement.json`: Shopify CLI 4.8.0 exited 1 with existing debt, unchanged at 670 diagnostics (37 errors / 633 warnings). No added or removed path/check/severity/message signatures. No diagnostics were suppressed.

The source-complete components are Main Product Compact, Product Purchase Data, Product Purchase Sync, Product Selling Plans Liquid and Product Selling Plans JS. Classic and Master remain NOT REVIEWED. Classic's wishlist integration, optional style/swatch/sparse-variant controls, lightbox and complete settings/preset pass remain open; see B4-CLASSIC-OPEN in the engineering report.

B4-COMPACT-PURCHASE joins all earlier live queues after Batch 9: real variants/plans/currencies/quantity rules/cart, image/layout/long-text states, keyboard/screen readers, native JavaScript-disabled navigation, multiple products, actual editor lifecycle and host-specific subscription/accelerated-checkout acceptance. No merge or Shopify publication is authorized by this evidence.
