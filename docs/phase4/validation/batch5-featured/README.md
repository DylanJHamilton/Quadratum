# Batch 5 opening — Featured Deals and Blog Spotlight

Three individual files move to REQUIRES LIVE VERIFICATION: Featured Deals, q-deal and Blog Spotlight. Batch 5 remains open. No production file or merchant-state changes beyond these scoped repairs; no section/block addition or deletion.

- `regressions.txt`, `suite-summary.json`: all seven Phase 3 and 47 Phase 4 suites pass (54 total).
- `static-check.txt`, `static-audit.txt`, `register.json`: schema/reference/protected architecture/state checks pass; 150 sections and 102 Theme Blocks retained.
- `css-build.txt`: build passes; existing Browserslist notice retained.
- `source-hashes.json`: actual changed source and fixtures.
- `themecheck.json`: full Shopify CLI 4.8.0 output, exit 1.
- `themecheck-comparison.json`: 645 → 644 diagnostics (22 errors; 623 → 622 warnings); one unused assignment removed, no new signatures. Existing debt remains unsuppressed.

Fixtures adapt Shopify forms/data/filters and DOM context; date checks use a fixed fixture clock. This does not certify shop timezones, cache refresh timing, responsive rendering, assistive technology or Theme Editor behavior. The [Shopify date filter](https://shopify.dev/docs/api/liquid/filters/date) reflects render time; scheduling is display-only and may be cached. All B5-FEATURED live acceptance follows Batch 9 as directed. See the engineering report/register for individual obligations and remaining carousel findings.
