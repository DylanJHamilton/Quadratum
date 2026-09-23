# Batch 4 individual product-host checkpoint

This is an intermediate engineering checkpoint. Batch 4 remains open, PR #22 remains draft, and live acceptance follows engineering Batches 4–9.

- `regressions.txt` and `suite-summary.json`: all seven Phase 3 and 39 Phase 4 suites pass (46 total).
- `affected-final.txt`: final wishlist read/write/storage-event/focus checks and Classic/Master media-data/lifecycle checks.
- `static-check.txt`, `static-audit.txt`, `register.json`, `protected-state.json`: schema, references, architecture and unchanged merchant state.
- `css-build.txt`: successful CSS build.
- `themecheck.json`: unmodified Shopify CLI 4.8.0 diagnostic output; exit 1.
- `themecheck-comparison.json`: 670 → 655 diagnostics (37 → 25 errors, 633 → 630 warnings). Twelve image errors and five unused assignments removed; two new complexity warnings and one increased existing complexity warning are explicit retained debt.

Liquid fixtures adapt Shopify forms, media and app output. DOM fixtures adapt native dialogs and media methods. Actual Shopify carts/subscriptions/accelerated checkout, media providers/models, CSS rendering, assistive technology, storage persistence and Theme Editor acceptance remain mandatory. See B4-PRODUCT-HOSTS and B4-WISHLIST-OPEN in the engineering report.

Native media output follows [Shopify media_tag](https://shopify.dev/docs/api/liquid/filters/media_tag) and [product media support](https://shopify.dev/docs/storefronts/themes/product-merchandising/media/support-media). Provider/model runtime acceptance remains queued.
