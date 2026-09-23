# Phase 5 account validation

Run from the repository root. Install this directory's dependencies, then make them available to the reused Phase 4 helpers:

```sh
npm install --prefix tests/phase5
export NODE_PATH="$PWD/tests/phase5/node_modules${NODE_PATH:+:$NODE_PATH}"
node tests/phase5/source.cjs
node tests/phase5/auth.cjs
node tests/phase5/dashboard.cjs
node tests/phase5/orders.cjs
node tests/phase5/addresses.cjs
node tests/phase5/reconciliation.cjs
node tests/phase4/account-auth.cjs
node tests/phase4/account-pages.cjs
python tests/phase5/reconcile.py
```

The reconciliation script verifies the original 35 filenames, every account asset/snippet consumer, the 8 customer template paths, the component register, section setting references and protected change scope. It writes a dependency graph and source SHA-256 manifest to `docs/phase5/validation/final/reconciliation.json`.

For local browser evidence, install Chromium through Playwright, then run:

```sh
npx --prefix tests/phase5 playwright install chromium
node tests/phase5/browser.cjs
node tests/phase5/browser-layouts.cjs
```

Alternatively point `CHROMIUM_PATH` (browser.cjs) and `CHROMIUM_EXECUTABLE` (browser-layouts.cjs) to an installed Chromium binary. The recorded environment used Chromium 138.0.7204.0, Node 24.19.0, Playwright 1.62.1 and axe-core 4.10.3. Browser fixtures render actual Liquid and account styles/scripts together with shared theme/token/base styles; network requests are handled locally or blocked.

`browser.cjs` retains the initial checkpoint E suite: 54 enhanced data/error/dark-card cases with axe audits plus nine no-JS cases. Its `ACCOUNT_BROWSER_OUTPUT` is an output directory for JSON and intermediate screenshots. `browser-layouts.cjs` adds 90 viewport/layout/maximum-size cases, 18 axe audits, explicit element-bound overflow checks, no-JS availability and four keyboard focus transitions. Its `ACCOUNT_BROWSER_OUTPUT` is a JSON file path. Run them with separate output destinations. Screenshots are intermediate visual checks, not required repository outputs.

The retained broader regression run covers every top-level executable Phase 3/4 `.cjs` suite (112 suites at closure). Nested historical closure/browser scripts are not included in that count:

```sh
python tests/phase5/regressions.py
```

Theme Check is separate. Recorded with Shopify CLI 4.8.0 and its default checks; no suppressions added:

```sh
npx --package @shopify/cli@4.8.0 shopify theme check --path . --output json
git -c core.whitespace=cr-at-eol diff --check
```

LiquidJS/DOM fixtures use explicit Shopify form, filter and pagination adapters. They certify source and client behavior, not Shopify endpoint processing, email delivery, CAPTCHA, platform redirects or account migrations. The browser uses the same adapters, so it adds browser layout/focus/accessibility evidence without claiming a live Shopify test. See `docs/phase5/validation/` for recorded results and the engineering report for live acceptance boundaries.
