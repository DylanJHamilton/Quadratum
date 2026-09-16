Run from the repository root:

```sh
npm ci --prefix tests/phase3
node tests/phase3/liquid-tests.cjs
node tests/phase3/dependency-tests.cjs
node tests/phase3/shared-ui-tests.cjs
node tests/phase3/hero-ui-tests.cjs
```

These tests execute selected source mechanisms in LiquidJS and a mock DOM. They do not replace Shopify Liquid rendering, Theme Editor tests, browser CSS checks, or checkout verification.
