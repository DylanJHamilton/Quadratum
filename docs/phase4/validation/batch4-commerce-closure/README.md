# Batch 4 formal engineering closure

69 individually disposed Product / Commerce components: 64 require live verification and five are retained dormant/source-reviewed. Zero assigned entries remain NOT REVIEWED. PR #22 remains DRAFT. Engineering continues through Batches 5–9 before mandatory live Shopify acceptance.

- `regressions.txt`, `suite-summary.json`: all seven Phase 3 and 46 Phase 4 suites pass (53 total).
- `affected-final.txt`: final content/recommendation/legacy-bundle follow-ups.
- `static-check.txt`, `static-audit.txt`, `register.json`, `protected-state.json`: schema/reference and architecture/state checks; 150 sections, 102 Theme Blocks, no deletions and unchanged merchant state.
- `css-build.txt`, `diff-check.txt`: successful build/whitespace gates; existing Browserslist notice retained.
- `source-hashes.json`: actual reviewed source, fixtures and ledger hashes. Local parent commit names in earlier static output are not a claim that uncommitted files were absent.
- `dispositions.json`: 470 primary components; Batch 4 and overall disposition totals.
- `themecheck.json`: full unmodified Shopify CLI 4.8.0 output, exit 1.
- `themecheck-comparison.json`: 655 → 645 diagnostics (25 → 22 errors; 630 → 623 warnings), with changed/new complexity and helper orphan warnings retained. No suppression or clean-certification claim.

Fixtures use actual repository Liquid and controllers, with explicit adapters for Shopify forms, filters, product/media/metaobject data, DOM geometry, native dialogs and fetch. They do not certify live Shopify APIs, browser layout, checkout, subscriptions, accelerated payments, presentment currency, provider/model media, app blocks or Theme Editor acceptance. See the report's B4-FINAL and prior individual-host queues.

The inventory audit moved existing cart, Quick View, FAQ/review, Product Slider and legacy bundle dependencies into their actual commerce family. Seven active dependencies were added; no section or block was added. Dormant helpers remain unreferenced, with no activation or deletion. Content/third-party hosts that happen to render Product Card retain their separate pending host reviews.

The Collection Modern fixture now resolves its actual Liquid response before delivering the fetch result. All original assertions remain. The earlier failure was a fixture timing assumption, not storefront evidence.

Implementation contracts were checked against [Shopify Section Rendering](https://shopify.dev/docs/api/ajax/section-rendering), [product recommendations](https://shopify.dev/docs/api/ajax/reference/product-recommendations), [recommendations state](https://shopify.dev/docs/api/liquid/objects/recommendations), [native cart requests](https://shopify.dev/docs/api/ajax/reference/cart), [line-item fields](https://shopify.dev/docs/api/liquid/objects/line_item), [metaobjects](https://shopify.dev/docs/api/liquid/objects/metaobject), [native media](https://shopify.dev/docs/api/liquid/filters/media_tag) and [model output](https://shopify.dev/docs/api/liquid/filters/model_viewer_tag). Base-currency money-format handling follows [Shopify currency formatting](https://help.shopify.com/en/manual/international/pricing/currency-formatting); actual presentment-currency behavior remains live acceptance.
