# Phase 3 closure remediation — review handoff

Date: 2026-09-15. Repository: `DylanJHamilton/Quadratum`. Branch: `release/v1-phase-3-systemic-repair`. PR: #21, draft.

## Executive status

This pass implements source repairs for seven P0 categories and the thirteen P1 categories below. Static and mock-DOM results support the specified mechanisms; they do **not** establish live Shopify acceptance. **P0-3 remains open pending the expressly required Theme Editor insertion reproduction for Compact and Modern. Phase 3 is not merge-ready.**

The 13 required template paths now exist. Classic is the default product section. Variant prices, compare-at state, availability, submitted IDs and URL history are synchronized in Classic and Master. Main product forms share selling-plan selection with the Product Form block. Other changes address locale coverage, section colors, social settings, form geometry, predictive search, radio semantics, menu focus, heading defaults, wishlist rendering, deployed icons and empty-section output.

Low-risk P2 work includes Classic's 44px Add to Cart target, semantic compare-at markup in Classic/Master, and removal of three unused declarations from CTA Banner. Cart trigger hardening and article target enlargement are deferred; the live-passing cart implementation remains intact.

## Source control and preservation

- Remote starting SHA: `d6238e610090b181eae601c69f2412727a007893`.
- Main/Phase 2 baseline: `bcb6f48440241356c34ffb6d31afa8441e54bdb2`.
- Local closure baseline: `8c72025`; it imports Shopify's newer QA page. A final newline introduced during import was removed, restoring the exact remote blob `96ceeb7e345e23dc45fa36ea2be8f6bc9f1a7b1f`.
- Published implementation ending SHA and local/remote commit identities: see `closure-commit-map.json`. The final evidence commit follows that implementation SHA; a document cannot contain its own commit hash.
- Changed files: `closure-changed-files.txt`.
- `config/settings_data.json`: **byte-for-byte unchanged**. SHA-256: `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499`.
- Shopify's saved `templates/page.dynamic-section-test.json` is preserved exactly. Its saved localhost icon host is not rewritten; the repaired icon resolver uses a deployed theme asset for a non-HTTPS host.
- All **150 sections and 102 Theme Blocks** retained. No section or block deletion. No Phase 2 restoration.
- Both builders (`block-section`, `product-block-section`), both layout chains (`layout-row`/`layout-column`, `product-layout-row`/`product-layout-column`), Main Product Simple, Main Product Compact, Collection Modern Quick View, Headers One–Five and Footers One–Five remain.
- No main modification, merge, Shopify publication or Phase 4 work.

## P0 engineering matrix — root cause first

| Root cause / QA ID | Live symptom and current source evidence | Repair / files | Static verification and required runtime acceptance |
|---|---|---|---|
| Missing route wiring — P0-1 | Default product, page, collection-list, password, gift-card and legacy-customer templates absent. | Added all 13 listed paths. `product.json` uses `main-product-classic`; `page.json` enables a new opt-in merchant page-content slot in retained `block-section`; collection list uses retained `main-collection-list`. Seven customer templates render existing account sections. Password/gift-card use a minimal branded `layout/password.liquid`. Alternate templates preserved. | Template existence, duplicate/order/section reference checks pass. Claude must test normal URLs and relevant legacy customer, password and issued gift-card routes. Hosted customer accounts do not use legacy theme customer templates. |
| Missing variant state propagation — S3-1 / P0-2 | Classic native selector changed submitted ID but had no visible-price update mechanism. Master also lacked synchronized variant price/state. | `product-purchase-data.liquid`, `product-purchase-sync.js`, Classic/Master section consumers. Server-formatted prices; stable current/compare nodes; sale/availability/ATC updates; `pushState` and `popstate` synchronization. Native selector remains; each option includes its price for no-JS clarity. | Mock DOM verifies $10/$100 changes, equal-price change, compare-at visibility, sold-out button, submitted ID, URL/back state and singleton initialization. Claude must compare displayed, selected, URL and cart prices. Variant imagery is **not verified**. |
| Preset blocks versus API defaults — S7-1 / P0-3 — **OPEN** | Compact and Modern prices/forms are block-driven; both presets declare title, price, variant picker, quantity and buy buttons. A default Section Rendering request supplies no configured preset blocks. Compact also has a source risk: its option selectors have no evident variant-resolution handler. | Preserved both implementations. No speculative layout rewrite. Added only the shared selling-plan control required by P1-7. | Source preset inventory is verified. The master instructions require real Theme Editor insertion **before** repairing this finding. No authenticated editor reproduction was available in this pass. Claude must insert each preset and test purchases, including a different-price variant in Compact. Keep P0-3 open until resolved. |
| Incomplete English locale — S6-1 / P0-4 | Missing translation strings leaked into output and accessible labels. | `locales/en.default.json`: supplied required keys; all literal translation usages audited. | Zero missing literal keys in reference audit; Theme Check `TranslationKeyExists` zero. Claude searches tested DOM for `Translation missing:`. |
| Wrong section scope / ambiguous button surface — S6-2 / P0-5 | Hero selectors used section ID while markup used an anchor/prefixed ID. Video primary button used `currentColor` as its background while setting its own foreground black. Grid lacked a dependable empty-media surface. | `hero-banner`: stable Shopify-wrapper CSS scope, automatic contrast for unset button/text overrides, safe foreground based on fallback surface, explicit overrides retained. `video-hero-banner`: independent button background/foreground and explicit kicker/subheading color. `grid-banner`: fallback surfaces and no-media automatic text. Shared `contrast-text` snippet. | Source selectors and default contracts checked; schema passes. Claude must measure computed contrast for default, media/no-media, overlay on/off and dark/light configurations. Existing saved explicit color overrides remain merchant-controlled. |
| Global element color overriding inheritance / header control scope — S3-2, S3-4 / P0-6 | Base `p, li, span` rule assigns document foreground, overriding inherited footer body colors. Header visible controls need stronger local scope. | Footer One–Five restore inherited body/inline color inside their section scope; existing heading/link rules untouched. Header Five submit/cart badge use scoped department surface/text and inherited label span color. | Source cascade trace; no global typography rewrite. Claude must inspect Footer Two body text, other footer body overrides, H5 visible search and populated cart badge. |
| Social schema/consumer mismatch — S3-3 / P0-7 | Content Social Links still read old `social_*_link`; footers had unmatched LinkedIn and no X output. | Canonical `social_url_*` reads in Footer Two/Three and Content Social Links. Added `social_url_linkedin` schema and X consumers in both footers. | No legacy reads in affected files. Claude configures all seven networks, checks each surface, and verifies blank networks remain absent. |
| Overbroad field geometry — F3 / P0-8 | Earlier exclusion was on font reset; full-width/min-height field geometry still selected every input. | `assets/styles.css`: exclusions applied to actual width/min-height/padding/border/background field selector. | DOM selector test excludes checkbox, radio, hidden, submit, button, reset, image, range and color; retains text/email/search/tel/url/number/password. Claude measures real consent/radio/text controls. |

## P1 engineering matrix

| Root cause / QA ID | Symptom / source | Repair / files | Verification / runtime queue |
|---|---|---|---|
| Wrong markup branch — S4-1 / P1-1 | H5 predictive mode rendered static search. | H5 now selects `search-form-predictive`; unique input/panel IDs. Predictive root positioning matches actual hook, colors consume existing tokens. Script preserves locale prefixes, cancels closing requests, exposes active descendant. | Mock typing/request/result, ArrowDown, Escape and empty-query checks pass. Test real suggestions, no-results, keyboard and dismissal in Shopify. |
| Enhancement visibility — S2-7 / P1-2 | Native and enhanced pickers both visible. | Enhanced snippet hidden until successful initialization; native field then hidden while select stays enabled in form. | Actual Liquid markup + DOM test verifies synchronized submission and visibility. Test JS/no-JS presentation and selection. |
| Invalid single-selection semantics — S2-8 / P1-3 | Buttons with `aria-pressed` inside radiogroup. | Actual radio inputs inside labels; group labels use merchant option names; native radio keyboard behavior. `product-variant-ui.liquid/js/css`. | Render test verifies radios, Denominations label, absence of aria-pressed, selected-value text and native ID. Real keyboard/assistive-tech check queued. |
| Reusable headings defaulted H1 — S2-9, S3-9, S6-3 / P1-4 | Multiple page titles from repeatable sections. | H2 defaults/fallbacks and matching schema preset values in CTA Banner, Boxed Banner, Sub Banner Classic, Special Offers, Featured Product Hero, Hero Banner, Transparent Hero and Web3 Hero. Transparent slideshow uses section heading choice. | Schema/default audit. Existing saved H1 choices preserved; do not expect existing saved test pages to change heading level automatically. Check new insertion and intentional heading settings. |
| Focus target/return reliability — S3-6 / P1-5 | Live menu failed focus expectations despite partial focus code. | H5 explicitly focuses close button/dialog, restores opener immediately on close, avoids stale open callback, skips close delay for reduced motion. Dialog label is Navigation menu. | DOM open/Escape/return test passes. Test actual mobile drawer, Tab containment and scroll lock. |
| Button/token contrast — S3-5 / P1-6 | Cross-sell and Subscribe controls unreadable; Verified Purchase too faint. | Cross-sell emits valid fallback button tokens instead of empty custom properties; automatic foreground selects contrast against effective button background. Subscribe foreground likewise; button spans inherit. Verified badge gets a dark-green/pale-green pair. | Source trace. Claude measures actual normal/hover colors and badge contrast. Explicit section overrides retained. |
| Absent shared selling-plan UI — S3-8 / P1-7 | Main product paths omit plans although Product Form block has plan controls. | Extracted `product-selling-plans` snippet, reused by all five main products and Product Form block. Required-plan products omit one-time option. Shared JS filters variant allocations and validates required selection before submission. | Liquid form payload test verifies selected plan ID and required/optional one-time behavior. Allocation data explicitly serialized. Claude tests `selling-plans-ski-wax`, variant changes and cart selling-plan allocation. Compact variant-resolution risk remains under P0-3. |
| Wrong/empty Section Rendering contract — F1 / P1-8 | Wishlist requests absent `q-wishlist-card-render`; retained `product-wishlist-card-renderer` was empty. | Filled retained renderer with shared product card; JS requests it on locale-aware product path. Reference sweep also corrected recommendation endpoint to actual `section.id`. | No unresolved literal Section Rendering references; renderer uses retained card. Claude checks 200 + real card markup and recommendation loading. |
| Empty stat data — F2 / P1-9 | Stats strip returns empty wrapper. | Guard checks usable stat value/label, renders shared editor onboarding or hides empty storefront wrapper. | Source guard review. Test zero blocks, configured-empty stats and populated stats. |
| Undeployed default icon / local host — S5-1 / P1-10 | `worm.svg` unavailable at theme asset root; icon host default points to development server. | Copied existing licensed icon from nested icon library to deployed `assets/worm.svg`. Theme asset is default; optional HTTPS hosts retained. Removed local host from production section help/comments; fallback uses shipped asset. Transition/easing/lift untouched. | Asset existence and section-localhost scan pass. Saved QA template retained; resolver ignores its non-HTTPS host. Test default/saved QA icon and custom HTTPS host. |
| Blockless layout reserves space — S6-4, S7-3 / P1-11 | Empty slides/helpers retain layout height. | Shared `section-empty-state`; guards for Slideshow and 13 block-driven helper sections, including Stats. Web3 guard applies **only** to slideshow mode with zero slide blocks. Settings/data-driven helpers and Web3 single hero remain active. | Schema/parser checks pass; static guard review. Test zero-block editor/storefront output and populated examples. This does not claim every configured-but-visually-empty block combination has been runtime tested. |
| Dead unsupported control — P2-18 / B2 / P1-12 | `show_count` schema control had no render consumer. | Removed only dead Tags/Categories setting from `main-blog-collection`; no fabricated counts. | No `show_count` remains in that schema. Check editor control and unchanged tag navigation. |
| Unguarded JS animation — P1-13 | CTA Web3 used Web Animations and opacity feedback without motion preference; appended code also referenced out-of-scope `root`. | Moved effect into scoped initialization, guarded `animate`/transition and repeat initialization. H5 close timing respects preference. | JS syntax and source review. Other inspected header, popup, quick-view and wishlist frame callbacks serve layout/focus, not visual animation; retained them and live-passing global reduced-motion CSS. Check CTA reduced motion and H5 timing. |

## Historical QA corrections

The original Round 1 records remain historical and are not erased. The owner-supplied live QA establishes:

- **ROUND 1 CLASSIFICATION OVERTURNED BY LIVE EVIDENCE** — CTA Icon List `icon_transition_ms`, `icon_ease`, `icon_lift_px` work. No motion-setting repair made.
- **ROUND 1 CLASSIFICATION OVERTURNED BY LIVE EVIDENCE** — Special Offers `text_alignment` and `split_ratio` work in their applicable composition. Only heading defaults changed here.
- **ROUND 1 CLASSIFICATION OVERTURNED BY LIVE EVIDENCE** — Form Support Request `bg_color → --q-bg` works. Its source remains untouched in this closure pass.

Approximately 25 further possibly gated DEAD findings are **not** promoted to confirmed repairs. The original 605 live-verification candidates remain separate and unchanged. The old engineering report/232-row ledger describe the earlier checkpoint; this report supersedes its closure status only for the explicitly mapped findings above.

## P2 and unresolved limits

- Included: Classic 44px primary commerce target; `<s>` compare-at nodes in Classic/Master.
- Removed unused CTA Banner declarations `--sec-bg-o`, `--q-head-max`, `--prod-fit`. Breadcrumb and Transparent Banner have legitimate scoped consumers of similarly named tokens and retain them. No matching standalone `--soft`, `--hard`, `--neon` declarations were found in the inspected current paths; similarly named modifier classes are functioning CSS, not dead declarations.
- Deferred optional cart-trigger/inert hardening and article-tag enlargement to avoid changing live-passing systems.
- **Open P0-3:** actual Compact/Modern preset insertion and purchase reproduction must precede any further layout repair. In particular, inspect Compact's selected variant versus submitted hidden ID.
- Theme Check is **not clean overall**. Five existing LiquidHTMLSyntaxError findings remain: captured wrappers in `form-compact`/`form-quote-full`, collection inline-script parsing, and split content-wrapper snippets. Existing missing image dimensions and other diagnostics remain in the full JSON; no claim of complete theme lint compliance.
- Existing editor-only verification items (builder reachability/all three Product Builder presets, Footer 3–5 override gates, Header Five promo legacy label, pricing table, timeline, configured multipurpose hero and gated support layouts) remain pending from the preceding pass. They were not rewritten simply for lack of live evidence.

## Validation commands

Run from the repository root. Evidence lives in `closure-validation/`.

| Command / check | Result |
|---|---|
| `python tests/phase3/static-check.py` | PASS: all retained schema JSON and asset JavaScript syntax; 150 sections, 102 blocks; protected files; no deletions; merchant state unchanged. |
| `python tests/phase3/closure/static-audit.py` | PASS: JSON/template order and references; 13 required paths; no missing literal assets, translation keys or unresolved literal Section Rendering targets; canonical socials; shipped default icon. |
| `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase3/closure/mechanisms.cjs` | PASS: variant price/state/form/URL, selling-plan payload, geometry and predictive mechanisms. |
| `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase3/closure/interactions.cjs` | PASS: actual radio Liquid rendering, native synchronization and progressive visibility, H5 focus entry/return. |
| `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase3/liquid-tests.cjs` | PASS: existing media and sparse pricing-table mechanisms. |
| `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase3/dependency-tests.cjs` | PASS: existing hero child association. |
| `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase3/shared-ui-tests.cjs` | PASS: existing cart duplicate-init, close/refresh, locale submission and focus mechanisms. |
| `NODE_PATH=../analysis/phase3/test-tools/node_modules node tests/phase3/hero-ui-tests.cjs` | PASS: existing hero instances, pause, timers, unload/reload. |
| `npm run build:css` | PASS. |
| `npm exec --yes --package=@shopify/cli -- shopify theme check --path . --output json` | Executed; nonzero due retained diagnostics. MissingAsset, MissingTemplate, ValidSchema, UnknownFilter and TranslationKeyExists zero. Full output retained. |
| `git -c core.whitespace=cr-at-eol diff --check` | PASS. |

The initial attempt to invoke an old cached CLI path failed because that cache was absent; the npm-exec command above successfully ran Theme Check. Test dependencies are described in `tests/phase3/package.json`; the shown NODE_PATH is this workspace's installed test-tool location.

## Targeted independent regression queue

See `claude-closure-regression.md` for the exact handoff. It covers changed runtime behavior plus the explicitly blocking Compact/Modern insertion prerequisite. Do not repeat the entire one-day audit.
