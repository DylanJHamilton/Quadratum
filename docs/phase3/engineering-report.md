# Quadratum V1.0 — Phase 3 engineering review checkpoint

**PHASE 3 INCOMPLETE — BLOCKED**

The branch contains substantial systemic repairs across 3A–3F, but Phase 3 is not certified complete. Closure is blocked by 38 original confirmed setting/token findings without conclusive source/runtime resolution, plus the unclosed Header Five legacy-label dependency and blog tag-count control. This is a draft review checkpoint, not merge approval. Further offline investigation can continue; storefront cascade behavior also needs a Shopify preview/browser test environment. No GitHub permission blocker was encountered.

## Source baseline

- Repository: `DylanJHamilton/Quadratum` (not Astral or a historical repository).
- Base: `bcb6f48440241356c34ffb6d31afa8441e54bdb2`; PR #20 merged baseline.
- Branch: `release/v1-phase-3-systemic-repair`.
- Production implementation checkpoint: `2c1cf7ef668a1c09c354fd71e36d7db865c5a70d`. Subsequent report/test commits do not imply further storefront changes.
- Remote main was rechecked and still matches the base. Main has not been changed by Phase 3.
- 150 sections and 102 theme blocks retained; zero Phase 3 deletions.
- `config/settings_data.json` is byte-for-byte unchanged against the base; its SHA-256 is recorded in static-validation.json.
- No merge, live theme publication, Phase 4 work, or sample-store rollout.

## QA accounting

Original classifications remain **506 cleared / 232 confirmed defects / 605 requires live verification**. The original QA package was not edited. Phase 3 dispositions are separate fields, not replacements for Claude’s classifications.

| Disposition among the original 232 | Count |
|---|---:|
| NO LONGER APPLICABLE | 47 |
| FIXED — REQUIRES LIVE SHOPIFY VERIFICATION | 147 |
| NOT FIXED | 38 |

47 no-longer-applicable outcomes cite current source evidence, including BEM suffixes incorrectly treated as custom properties and retained sale-highlight snippet consumers. These are not 47 runtime-tested fixes.

## Root-cause engineering map

### RC-01 — Source/load/build integrity

Renamed references corrected; genuine missing assets implemented; retained schema JSON repaired; ESM Tailwind build and lockfile committed. Official MissingAsset/MissingTemplate/ValidSchema counts are zero.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-12 | social-media-pinterest-idea-board | INTENTIONALLY REMOVED |
| P6-09 | 22 orphaned assets, 13 broken references, 9 sections | PARTIALLY FIXED |
| P2-11 | layout/theme.liquid | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-13 | snippets/collection-modern-active-filters.liquid | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P4-03 | assets/ | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P5-01 | layout/theme.liquid | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-02 — Builder admission and foundation styles

Page columns admit 61 page-safe types; product columns admit 98 content types. Both layout chains and all 102 blocks remain. Shared primitive styling, fonts, section surfaces and nonempty product presets are supplied.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P4-02 | the 12 content blocks in the general builder | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P4-01 | blocks/layout-column.liquid | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P4-04 | content-heading | NO LONGER APPLICABLE |
| P5-04 | 15 sections | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-03 — Form geometry

Global text-field rules exclude checkbox/radio/hidden/button/range/color controls. Simple/Modern product forms use one valid Shopify product form; dynamic payment buttons share that form.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P6-01 | assets/styles.css:310 — affects every section with a checkbox or radio; measured on main-product-simple, main-product-modern-variant | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P6-13 | main-collection-classic | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-04 — Image output and arguments

89 retained image_tag sites had filtered argument expressions hoisted before the tag; image HTML is not escaped as text. Gallery loading uses eager/lazy values.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P6-04 | 10 files, 23 call sites — confirmed visible on main-cart, call-to-action-featured-product, main-blog-single, main-product-compact | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P5-02 | 31 files | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-10 | call-to-action-reviews | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-05 — Liquid collection operations

Unsupported push/pop/to_s/parse_json/video_url mechanisms replaced with supported source-array, string and Shopify object access. Pricing cells retain physical column alignment when headings are blank.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-16 | 6 files (see detail) | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-17 | interactive-content-pricing-data-table | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-06 — Social settings references

Footer Two/Three read actual social_url_* schema IDs for configured networks. LinkedIn legacy fallback remains because that global schema ID does not exist.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-01 | footer-two, footer-three | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-07 — Unit conversion

Blog kicker and bundle tracking values divide by 100 before em output.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P6-02 | featured-content-blog-spotlight | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P6-03 | product-bundles | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-08 — Intrinsic responsive sizing

Waitlist field minima are bounded; shared split grids use minmax(0,...); account wrappers retain horizontal scrolling; Web3 stage/grid can shrink.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P6-05 | form-waitlist, account-main-account-dashboard, sub-banner-web3 | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P6-06 | account-main-account-order, account-main-account-orders | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-09 — Color alpha

Alpha calculations precede color_modify; nested rgba()/incorrect filter chains removed from the affected backgrounds/gradients.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-03 | sub-banner-transparent, transparent-hero-banner | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-09 | call-to-action-banner | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-10 — Dependent controls/preset assumptions

CTA badges and button sizes, hero animation, UGC accessible labels, reward display and empty product presets repaired. Header Five legacy-label dependency and blog tag counts remain unclosed.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-07 | call-to-action-banner | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-20 | product-block-section | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-05 | multipurpose-hero-banner | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-08 | call-to-action-banner | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-14 | social-media-ugc-hashtag-gallery | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P2-02 | header-five | NOT FIXED |
| P2-18 | main-blog-collection | NOT FIXED |
| P2-19 | main-cart | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-11 — Unsafe defaults

Example video URL is removed as a new-slide default and ignored as a saved placeholder. Powered-by text/surfaces have readable defaults. Gallery caption defaults account for overlay/below layouts.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-04 | sub-banner-transparent | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |
| P5-03 | 3rd-party-powered-by | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-12 — Shared accessibility

Drawer close/refresh race, focus restoration, hero pause/reduced motion/inactive slide semantics, per-instance lifecycle, and shared focus indicators repaired. Full per-component contrast/tap-target polish remains outside this systemic pass.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P5-07 | theme-wide | PARTIALLY FIXED |
| P6-07 | 37 sections | PARTIALLY FIXED |
| P6-08 | header-four, sub-banner-web3 | PARTIALLY FIXED |

### RC-13 — Dormant code

Excluded from Phase 3. No broad cleanup or further section/block removal.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P6-10 | section-slideshow.js (7,821 bytes) and section-slideshow.css (7,932 bytes) | NOT FIXED |
| P6-12 | collection-modern cluster | NOT FIXED |
| P6-11 | global-popup.js | NOT FIXED |
| P5-05 | snippets/ | NOT FIXED |

### RC-14 — Hero parent/child association

Blank parent follows the nearest preceding slide; explicit saved Shopify IDs remain supported; unknown IDs do not attach to another slide. Downstream snippets consume the already-scoped child array.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-06 | multipurpose-hero-banner | FIXED — REQUIRES LIVE SHOPIFY VERIFICATION |

### RC-15 — CSS architecture

Wholesale CSS delivery rewrite excluded. Local scope/consumer fixes only; generated Tailwind output is reproducible.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P5-06 | theme-wide | NOT FIXED |

### RC-16 — Unconsumed declarations

Cart, FAQ, form/card shadow/background, collection card, gallery, hero, embed and shared surface consumers repaired. The finding-level ledger distinguishes concrete repairs from class-suffix false diagnoses and unresolved cases.

Original confirmed setting/token rows: 30 NO LONGER APPLICABLE, 101 FIXED — REQUIRES LIVE SHOPIFY VERIFICATION, 6 NOT FIXED. See the full 232-row ledger for each setting, original evidence and current source references.

### RC-17 — Cascade and scope

Grid/team/TOC selectors scoped to their own Shopify wrapper; Footer Five has explicit opt-in section inheritance that preserves saved overrides by default. Remaining reported cascade cases are not declared fixed from variable occurrences.

Original confirmed setting/token rows: 37 FIXED — REQUIRES LIVE SHOPIFY VERIFICATION, 32 NOT FIXED. See the full 232-row ledger for each setting, original evidence and current source references.

### RC-18 — Render/class attribution

Simple card stylesheet selectors corrected; column-builder explicit button color is preserved. Sale-highlight q-deal emits and consumes the purportedly missing classes; that source-only diagnosis is contradicted, without claiming live sale behavior passes.

Original confirmed setting/token rows: 3 FIXED — REQUIRES LIVE SHOPIFY VERIFICATION, 17 NO LONGER APPLICABLE. See the full 232-row ledger for each setting, original evidence and current source references.

### RC-19 — Unused setting relationships

Existing container choice, checkout style, native Facebook loading, reward message type and product rating toggle are wired. Ratings are sourced from native review metafields; no fabricated storefront review counts.

Original confirmed setting/token rows: 6 FIXED — REQUIRES LIVE SHOPIFY VERIFICATION. See the full 232-row ledger for each setting, original evidence and current source references.

### - — Removal outcomes

Calendar, Pinterest idea board and old scaffolding stubs are absent in the approved baseline.

| Finding | Affected components | Phase 3 status |
|---|---|---|
| P2-15 | interactive-content-helper-calendar | INTENTIONALLY REMOVED |
| P6-14 | sections/header.liquid, sections/footer.liquid | INTENTIONALLY REMOVED |

## Subphase implementation and verification

| Subphase | Outcome | Evidence and limits |
|---|---|---|
| 3A | Schema, references, build and missing shared assets repaired | All 252 schemas parse; static reference categories clear. Theme Check as a whole does not pass. |
| 3B | Shared Liquid/image/array/color mechanisms repaired | Actual selected Liquid source executes in LiquidJS; this is not Shopify’s production Liquid engine. |
| 3C | Builder gates, form foundation, surface contract and empty presets repaired | Preset nesting types validated; 61 page-safe and 98 product-column content types. Theme Editor remains untested. |
| 3D | Main consumer/unit/scope repairs implemented | 147 confirmed rows have repair dispositions requiring live Shopify verification; 38 remain NOT FIXED. |
| 3E | Hero relationships and multiple dependent settings repaired | Tests cover blank/explicit/unknown parent references. Two master controls remain unclosed. |
| 3F | Shared responsive, focus and lifecycle repairs implemented | Mock DOM tests cover duplicate loading, cart race and hero instances/timers. No pixel, contrast or mobile-browser certification. |

## Presets and compatibility

Only the three already-existing product builder presets were populated to repair P2-20. They use retained gallery/title/price/form/description blocks. This affects newly inserted preset layouts; existing merchant templates were not rewritten. No Atelier/Signal/Terrace rollout or default product-template decision was made.

Footer Five’s new inheritance option defaults off, preserving saved per-block colors/radius. Enable it to make section controls govern those blocks. Gallery caption color defaults now defer to layout-appropriate values; explicit saved colors remain intact and need contrast testing. The missing default product.json remains a separate product-template architecture decision.

## Validation

See static-validation.json, theme-check.json and tests/phase3. Passed checks: retained schema JSON; JavaScript syntax; protected files; zero deletions; unchanged merchant data; sparse pricing columns; media order; hero child association; cart duplicate initialization, locale-aware add request and close-during-refresh race; independent hero instances, timer count, pause and unload cleanup. `npm run build:css` succeeds.

Official Theme Check is **not clean**. MissingAsset, MissingTemplate, ValidSchema and UnknownFilter have zero findings. Remaining categories and full messages are retained in theme-check.json. Some parser findings involve split wrapper/capture markup, but they are not blanket-dismissed. Translation, image dimension and other component-level findings remain visible.

## Live verification queues

1. `original-live-candidates-605.csv`: original candidates only, unchanged classifications; not automatically defects.
2. `confirmed-runtime-followup.csv`: 38 original confirmed findings still NOT FIXED. This includes cascade reproduction and token-intent investigation; not every row is solvable by a browser test alone.
3. The 147 repair rows in `confirmed-findings-232.csv`: exercise the changed setting with gates open/closed, two contrasting section instances, Theme Editor add/remove/reload, desktop/mobile, and keyboard/reduced-motion modes.
4. Commerce: Simple/Compact/Modern product variants, dynamic checkout, cart add/change/remove/failure, locale routing, real review metafields and sale schedules. Account testing must use the store’s supported account mode.
5. Builder: both admission chains, saved layouts, all three repaired product presets, product context, app blocks and real editor lifecycle. Forms: native Shopify submission, errors, success, consent and captcha integrations.

## New discoveries and material review risks

| Discovery | Severity | Treatment |
|---|---|---|
| Nested invalid Shopify product forms in Simple/Modern | High | Replaced with one product form; real checkout remains live-test required. |
| Simple collection card CSS targeted Modern root | High | Corrected selector contract and per-card media ratio. |
| Liquid interpolation inside a static quote-form CSS asset | Medium | Emit SVG chevron variable from Liquid; consume it in CSS. |
| Percentage values divided by 100 a second time | Medium | Form hover and collection overlay emit the units their consumers expect. |
| CSS variables used inside media-query conditions | Medium | Numeric Liquid breakpoints, per-instance scope and dual-mode gates. |
| Hero initialization/timers duplicated; inactive slides remained focusable | High | Singleton lifecycle, one timer, unload cleanup, pause/reduced motion and inert inactive slides. |
| In-flight cart refresh reopened a closed drawer | Medium | Request generation prevents reopening; mock race test passes. |
| Broad source-scoping rewrite initially damaged Liquid during local work | High | Discarded before commit; reapplied line-preserving selector scoping with Liquid-tag equality check. No damaged version is in the branch history. |

## Remaining implementation sequence

1. Close the 38 unresolved confirmed findings by family: footer/header override gates; predictive/timeline/pricing cascade; motion controls; remaining global-token intent and collection truncation. Identify the winning declaration before editing.
2. Resolve Header Five legacy-label behavior and implement accurate blog tag counts without reporting counts from a truncated article collection.
3. Re-run targeted checks for those repairs and the Shopify test queues above. Update dispositions individually.
4. Complete the Phase 3 exit review. Do not merge or start Phase 4 based on this checkpoint.

## Commits

```text
969c7dc Phase 3A: repair source, build and schema integrity
740b02f Phase 3B: repair shared Liquid rendering mechanisms
54aad4a Phase 3C: repair builder admission and shared form foundations
c7715f7 Phase 3D: restore scoped collection, cart, form and gallery settings
49fa659 Phase 3E: reconnect existing controls and hero child blocks
dd64497 Phase 3F: contain responsive layouts and preserve keyboard interaction
a5b419d Phase 3D: complete FAQ consumers and repair token units and breakpoints
bbfd2f1 Phase 3E: honor embed loading and product and reward controls
b2b30b6 Phase 3F: make hero initialization and autoplay accessible and repeatable
08c5e63 Phase 3C: populate empty product builder presets and expose font aliases
41361c8 Phase 3E: make footer inheritance explicit and expose reward type
3fec86d Phase 3D: keep gallery caption defaults readable across layouts
ed1ff6c Phase 3F: connect embed accent to its keyboard focus indicator
2c1cf7e Phase 3C: implement the shared section surface contract
```

## Files and full evidence

- [45 master findings](master-findings-45.csv)
- [232 confirmed setting/token findings](confirmed-findings-232.csv)
- [605 original live candidates](original-live-candidates-605.csv)
- [38 unresolved confirmed findings](confirmed-runtime-followup.csv)
- [Static validation](static-validation.json)
- [Official Theme Check output](theme-check.json)
- [Changed-file inventory](changed-files.txt)
- [Reproducible mechanism tests](../../tests/phase3/README.md)
