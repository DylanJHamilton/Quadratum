# Phase 5 validation evidence

`baseline/` records the rerun of Phase 4 account evidence and the initial Theme Check inventory. The baseline is `d8e2c951d223cd8eac9c9b0adda26977856c405a`; prior Phase 4 results were inputs, not automatic approval.

`checkpoint-a/` through `checkpoint-d/` preserve each coherent repair/test boundary. Verified remote checkpoint SHAs are recorded in the engineering report.

`final/` contains closure results after the final source changes:

- `phase5-*.txt`: strict parser/reference/syntax checks, 56 new account behavior scenarios and reconciliation.
- `phase4-account-*.txt`: final reruns of 171 auth and 198 page regression cases.
- `browser.json` and `browser.txt`: 90 local Chromium layout cases, 18 axe audits, four keyboard transitions, no-JS availability and script-error checks. Actual theme sources with explicit Shopify adapters; network blocked.
- `browser-states.json` and `browser-states.txt`: retained checkpoint E browser script rerun against the combined final source, with 54 enhanced error/data/dark-card cases and nine no-JS cases.
- `phase5-reconciliation.txt`: retained checkpoint E dependency/style/search/quantity/title assertions rerun after reconciliation.
- `regressions/results.json` and adjacent logs: all 112 top-level Phase 3/4 source/DOM suites; zero failed.
- `reconciliation.json`: 38 account/direct-dependency source hashes, consumer graph, schema-reference inventory, retained original filenames and protected scope check.
- `theme-check.json`: complete final Theme Check output with repository-relative paths.
- `theme-check-summary.json`: baseline/final counts and semantic warning delta.
- `theme-check-account-findings.json`: all three account-specific orphan warnings and their source positions. Each is a verified false positive; see the dependency graph.

The engineering report lists remaining live Shopify acceptance items and the legacy/hosted-account boundary. These artifacts do not certify Shopify endpoints, emails, CAPTCHA, migrations, a carrier service, every browser or assistive technology. No demo store was contacted.
