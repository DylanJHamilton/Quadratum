# Phase 6 pre-launch legacy settings cleanup

Status: H2 implemented and validated; H3 retained-component regressions and final closure follow.

Starting remote: `2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27`. H1 audit published and verified at `03c2edb89ee80dc6b31d0c3ead60410c417bcd2f`. The three owner/Shopify commits after `f39eb7239f0ac6892fe5258e05a3683e2f9289fe` remain ancestors. No older owner state was restored.

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

Theme Check 4.8.0: zero errors, 517 warnings, unchanged from checkpoint G with no new or resolved diagnostic messages. `validation/checkpoint-h2` contains complete output and reconciliation. Existing helper-reference and complexity warning dispositions remain those documented at G. H3 will exercise retained Phase 4/5 consumers and browser fixtures against the cleaned schema before closure.
