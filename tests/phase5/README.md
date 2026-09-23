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
node tests/phase4/layout-head.cjs
node tests/phase4/batch9-delivery.cjs
node tests/phase4/batch9-header-lifecycle.cjs
shopify theme check --output json
```

LiquidJS/DOM fixtures use explicit Shopify form, filter and pagination adapters. They certify source and client behavior, not Shopify endpoint processing, email delivery, CAPTCHA, platform redirects or account migrations. Native Shopify parser and Theme Check are separate checks. See docs/phase5/validation for recorded results and live acceptance boundaries.

For browser checks, install Chromium using Playwright (`npx --prefix tests/phase5 playwright install chromium`), or set `CHROMIUM_PATH` to an existing executable. Run from the repository root:

```sh
node tests/phase5/browser.cjs
```

`ACCOUNT_BROWSER_OUTPUT` selects the output directory (default `/tmp/quadratum-phase5-browser`). All browser requests are intercepted locally; no store or carrier is contacted. The fixtures use actual account/global CSS and rendered default theme tokens, with explicit Shopify data/form/date adapters. They cover nine sections at 320/768/1440px in LTR/RTL, dark cards, long data, keyboard focus, axe WCAG A/AA checks, overflow/runtime errors and no-JS forms. They do not replace owner Shopify/AT acceptance. Recorded execution used Node 24.19.0, Shopify CLI 4.8.0, Chromium 138, Playwright 1.62.1 and axe-core 4.10.3.
