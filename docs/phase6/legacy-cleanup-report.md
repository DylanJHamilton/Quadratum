# Phase 6 pre-launch legacy settings cleanup

Status: PHASE 6 PRE-LAUNCH LEGACY SETTINGS CLEANUP COMPLETE — READY FOR OWNER REVIEW.

PR #24 owner-review follow-up: `theme_documentation_url` now targets `https://github.com/DylanJHamilton/Quadratum/tree/main/docs/phase6` so the metadata remains useful after the release branch is removed. The support URL remains `https://github.com/DylanJHamilton/Quadratum/issues`. The current inventory and reconciliation gate reflect this single approved metadata change; all merchant settings and Shopify saved state remain unchanged. H1–H3 evidence below describes the published cleanup checkpoints before this follow-up.

Starting remote: `2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27`. H1 audit published and verified at `03c2edb89ee80dc6b31d0c3ead60410c417bcd2f`; H2 removals published and verified at `66e61f8d6e4557831880b47ada3746e9653249f8`. H3 is the commit containing this completed report; its independently verified SHA is supplied in the final handoff and branch history. The three owner/Shopify commits after `f39eb7239f0ac6892fe5258e05a3683e2f9289fe` remain ancestors. No older owner state was restored.

All 37 deprecated controls qualify for category A, remove before V1. Removed 37; retained active from this set 0; retained hidden/compatibility from this set 0; unresolved removal decisions 0. The schema now has 215 supported controls: 211 ACTIVE, three explicitly privileged code hooks and one form metadata transport. All 13 merchant groups remain useful. No new feature, setting, override or visibility workaround was added.

## Schema and source changes

The exact IDs, former schemas, saved values, individual safety findings and replacement owners remain in [legacy-cleanup-audit.json](legacy-cleanup-audit.json) and its [readable table](legacy-cleanup-audit.md). Authoritative inventory version 3 marks removed controls `RETIRED_PRE_V1`, keeps their previous group/type/default and links their complete historical contract. These records are documentation; they do not expose controls in the editor.

Removed the empty Blog (global), Collection, Single Product and Analytics IDs headings. The cart summary note heading/label now describes its actual cart-page location, and the active form metadata label no longer implies a deprecated control. Surviving IDs, types, defaults, option values, range bounds/steps, group order and theme metadata remain exact. The actual form metadata transport and trusted code boundaries remain explicit.

The only Liquid change removes the unused `header_show_store_name` conditional and comment from `header-two-logo`. That helper is reachable only from another unused helper; active headers do not render either chain. After cleanup no removed ID has any global consumer, including inactive helpers. Same-named `video_muted`/`video_controls` section settings and template values remain intact. No section, block, template, JavaScript or CSS implementation was modified.

| Group | Before | Removed | After |
| --- | ---: | ---: | ---: |
| User Interface | 22 | 6 | 16 |
| Header | 7 | 2 | 5 |
| Commerce Defaults | 35 | 17 | 18 |
| Media Settings | 7 | 3 | 4 |
| Integrations | 28 | 8 | 20 |
| Popups | 36 | 1 | 35 |

The other seven groups remain unchanged: Theme Settings 2, Branding 41, Footer 5, Search Settings 44, 404 Settings 19, Performance Settings 2, Localization Settings 4. Small groups retain meaningful supported functions.

## Owner state preservation

`settings_data.json` is unchanged byte-for-byte from the current Shopify baseline. Before and after SHA-256: `00683165515aa22401fd3793bfca9561df0a20f3f41d113690839b255d77f9b4`.

All 63 saved global keys and all section/block/platform state are preserved, including the 17 owner edits since A–G closure. The eight saved values associated with removed controls remain inert historical state: `blog_list_style=magazine`, `cart_gift_wrap_enable=true`, `gmap_default_lat=37.7749`, `gmap_default_lng=-122.4194`, `marketing_consent_default_checked=true`, `mobile_drawer_position=right`, `pdp_tabs_mode=tabs`, `popup_type=promo`. Removing their editor definitions loses no implemented behavior. No settings_data pruning or migration was performed.

## H2 validation

Inventory and reconciliation pass: zero unresolved global reads, zero dependencies on removed controls, valid schema/defaults and exact preservation of every surviving input contract. The Phase 6 source, branding, commerce, media, integrations and popup suites all pass. The popup suite now runs 43 real option permutations; the six removed popup_type options no longer inflate that count.

Theme Check 4.8.0: zero errors, 517 warnings, unchanged from checkpoint G with no new or resolved diagnostic messages. `validation/checkpoint-h2` contains complete output and reconciliation. Existing helper-reference and complexity warning dispositions remain those documented at G. H3 verifies that runtime source is byte-identical to this validated H2 checkpoint, so this Theme Check result remains current.

## Exact removed IDs

| Group | Removed global setting IDs |
| --- | --- |
| User Interface | `article_measure`, `blog_list_style`, `blog_show_author`, `blog_show_date`, `blog_show_tags`, `reading_progress` |
| Header | `header_show_store_name`, `mobile_drawer_position` |
| Commerce Defaults | `cart_coupon_input_enable`, `cart_drawer_show_addons`, `cart_drawer_show_rewards_tiers`, `cart_gift_wrap_enable`, `collection_card_ratio`, `collection_cols_d`, `collection_cols_m`, `collection_cols_t`, `collection_show_filters`, `collection_show_sort`, `pcard_show_swatches`, `pdp_show_compare_at`, `pdp_show_unit_price`, `pdp_sticky_add_to_cart`, `pdp_tabs_mode`, `use_metaobject_cart_addons`, `use_metaobject_cart_rewards` |
| Media Settings | `enable_lottie`, `video_controls`, `video_muted` |
| Integrations | `ga4_id`, `gmap_default_lat`, `gmap_default_lng`, `marketing_consent_default_checked`, `marketing_consent_label`, `meta_pixel_id`, `recaptcha_v3_threshold`, `tiktok_pixel_id` |
| Popups | `popup_type` |

Retained deprecated IDs: none. There is no remaining removal decision. The eight inert saved values above are preserved owner state, not hidden or active schema controls.

## H3 final validation

| Gate | Result | Evidence |
| --- | --- | --- |
| Schema, defaults, reverse mapping and compatibility | Pass; 215 supported controls, 13 groups, no unresolved global reads or removed-ID dependencies. | `validation/checkpoint-h3/inventory-summary.json`, `reconciliation.json` |
| Retained Phase 3/4 components | All 112 suites pass with the cleaned defaults. | `validation/checkpoint-h3/regressions/results.json` and individual logs |
| Phase 5 accounts and headers | All seven source/behavior suites pass, including 66 account-entry scenarios. | `validation/checkpoint-h3/targeted-results.json`, `header-source/source.json` |
| Phase 6 settings contracts | All six H2 suites pass; H3 verifies unchanged runtime source. Popup suite covers 43 supported option permutations. | `validation/checkpoint-h2/results.json` and individual logs |
| Popup/cart/localization browser | 41 Chromium fixtures pass. | `validation/checkpoint-h3/popup-browser-results.json` |
| Header browser | 72 fixtures plus 20 account axe audits, 15 keyboard checks and five lifecycle checks pass. | `validation/checkpoint-h3/header-browser/browser.json` |
| Account browser | 63 fixtures pass, including nine without JavaScript. | `validation/checkpoint-h3/account-browser-results.json` |
| Theme Check 4.8.0 | 0 errors, 517 warnings; no new diagnostics compared with G. | `validation/checkpoint-h2/theme-check-summary.json` and raw output |

Total: 125 suites and 176 browser fixtures pass. Browser reports contain no runtime errors or axe violations; responsive overflow and focus gates pass. Strict Liquid parsing covers 46 changed files across Phase 6, with JavaScript syntax, JSON and CSS/token checks retained. H3 changes only tests and documentation; runtime remains exactly the H2 tree.

One historical account-suite guard initially failed because it compared merchant state with its pre-Phase-5-header baseline. The harness now accepts an explicit `ACCOUNT_STATE_BASELINE`; H3 supplies the current Shopify starting SHA and still compares the entire file byte-for-byte. All protected account implementation files continue to use their original Phase 5 baseline. No account behavior assertion was weakened. Output destinations were parameterized so new evidence does not overwrite A–G/Phase 5 reports. The single affected suite was rerun successfully; already passing suites were not rerun unnecessarily.

## Owner handoff

The 37 removals are resolved and authorized; no feature was invented to justify an unused control. Check the 13 groups in the live Theme Editor for the intended streamlined presentation and confirm normal local controls, saved styling and account menus. Local Chromium fixtures do not replace live Shopify/editor, native form/provider or manual assistive-technology acceptance. The existing trusted-code, Maps, endpoint, privacy and distribution choices remain in [owner-review.md](owner-review.md); this cleanup introduces no new provider decision.

Publication is non-force on `release/v1-phase-6-theme-settings`. All three Shopify commits remain ancestors. Main is untouched; no merge, store QA session, broad refactor or Phase 7 work is included.
