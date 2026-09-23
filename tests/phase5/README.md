# Phase 5 account validation

Run from the repository root. Install this directory's dependencies, then make them available to the reused Phase 4 helpers:

```sh
npm install --prefix tests/phase5
export NODE_PATH="$PWD/tests/phase5/node_modules${NODE_PATH:+:$NODE_PATH}"
node tests/phase5/source.cjs
node tests/phase5/auth.cjs
node tests/phase4/account-auth.cjs
node tests/phase4/account-pages.cjs
```

LiquidJS/DOM fixtures use explicit Shopify form, filter and pagination adapters. They certify source and client behavior, not Shopify endpoint processing, email delivery, CAPTCHA, platform redirects or account migrations. Native Shopify parser and Theme Check are separate checks. See docs/phase5/validation for recorded results and live acceptance boundaries.
