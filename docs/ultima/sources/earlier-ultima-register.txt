# ULTIMA V1 — Verified / Reported Defect Register

**Statuses are branch-specific.** 'Fixed on demo' never means confirmed fixed in `main`. All bugs require independent reproduction, scope checking, regression testing and sign-off before a shared fix is marked closed.

| Priority | Source | ID | Finding | Verified source status | Shared action |
|---|---|---|---|---|---|
| P0 | EVERREAL | Q-HEADER3-001 | Header Three desktop dropdown clips past left viewport near 1135px | OPEN per 2026-10-14 log | Reproduce at narrow desktop widths, fix collision/anchor positioning, test keyboard/RTL/mobile. |
| P0 | main | ULT-CORE-001 | `config/settings_data.json` contains ARC demo data including ~25KB `script_head` and numerous ARC product references | Confirmed in main source | Split demo data from clean install defaults; audit CSP/security and editor behavior. |
| P0 | main | ULT-CORE-002 | Home and other default JSON templates contain `shopify://` ARC-specific references | Confirmed in main source | Replace only release defaults, preserving original ARC demonstration configuration separately; verify empty merchant install. |
| P0 | main | ULT-HEADER-001 | Header selected from global `settings.header_layout`, Header Three transparency is globally configured and not controlled per template | Confirmed in `layout/theme.liquid` and `header-three.liquid` | Implement explicit page/template transparent/solid mode with scroll transition and accessible contrasts. |
| P1 | Northstar | NS-04 | HTML stripping removes paragraph boundaries in classic PDP excerpt | Fixed on Northstar branch | Port generic paragraph/list/BR whitespace normalization with regression test. |
| P1 | Northstar | NS-05 | Classic collection filter fieldsets ignore dark surface token | Fixed on Northstar branch | Adopt configured surface token, verify WCAG contrast. |
| P1 | Northstar | NS-06 | Collection Sort label and 404 search button get squeezed at desktop widths | Fixed on Northstar branch | Compare and port non-shrinking flex behavior. |
| P1 | Northstar | NS-08 | Site branding currently follows `shop.name` even when previewing distinct demo brands | Implemented on Northstar branch | Check optional `storefront_brand_name` implementation and any SEO effects. |
| P1 | Northstar | NS-11 | `product-recommend.liquid` stylesheet was nested inside conditional and failed Shopify import | Fixed earlier on Northstar branch | Audit current main and all related sections for compile legality. |
| P1 | Northstar | NS-12 | Support form select, input and textarea field backgrounds inconsistent | Fixed on Northstar branch | Port shared field-surface token and audit form contrast. |
| P1 | EVERREAL | Q-CARDSTACK-002 | Card text inherits unsuitable section colors | Patched on EVERREAL branch | Port optional per-card color controls with safe fallback. |
| P1 | EVERREAL | Q-SPOTLIGHT-003 | Missing explicitly selected source incorrectly falls back to all products | Patched on EVERREAL branch | Preserve manual source intent and honest empty-state behavior. |
| P1 | EVERREAL | Q-SPOTLIGHT-005 | Hero selection using sliced/indexed products hides populated products | Patched on EVERREAL branch | Port bounded Liquid iteration and test manual vs collection sources. |
| P2 | EVERREAL | Q-BLOG-004 | Blog container insufficient side inset and max width | Patched on EVERREAL branch | Incorporate responsive content gutters. |
| P2 | Northstar | NS-09 | Concurrent Shopify draft previews can inherit wrong preview theme session | Documented platform/workflow limitation | Always use explicit `preview_theme_id` in testing, keep browser sessions isolated. |

Additional cases from Northstar NS-01–03, NS-07, NS-10, NS-13–14 were implementation/design issues fixed in that draft and must be reviewed for generic reproducibility before treating as core defects.

## Mandatory regression suites

- Header: solid, overlay, transparent-until-scroll, announcement bars, sticky modes, all five header layouts, full-width mega dropdown near viewport edges, logo swaps, touch, keyboard, mobile, RTL, theme editor, no JS.
- Product: variant/price/media/SKU changes, sold-out and unavailable, stock thresholds, subscription/selling plans where supported, unit prices, dynamic checkout, image ratios, quick view, product recommendations.
- Collection: empty catalog, manual selection versus auto, filters, sorting, pagination, contrast and responsive labels.
- Content: long rich text, lists and headings, article typography, tabs/accordions, HTML filtering, missing images, overflow.
- Commerce: add to cart, updates/remove, drawer and full cart, gift wrap/add-ons with actual configured products, selling plans, discounts/shipping messages without false promises.
- Service: contact forms, FAQ, search and 404, account/login/logout/orders/addresses, accessibility of errors and notifications.

## Closure standard

Issue closes only when generic fix is merged onto approved release branch; automated static/test checks pass; Shopify draft tested on all relevant template types and mobile/desktop; no regressions; screenshots or steps logged. No change to `main` without explicit sign-off.
