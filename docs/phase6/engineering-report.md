# Phase 6 — Theme settings architecture

Pre-launch follow-up (2026-09-24): owner-authorized cleanup H1 starts at `2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27`, preserving the three Shopify commits after A–G closure. [The H1 audit](legacy-cleanup-audit.md) classifies all 37 deprecated controls before removal. The A–G counts and byte-preservation statements below describe that earlier closure; current owner state is captured separately in `validation/checkpoint-h1/owner-state.json`.

Branch: `release/v1-phase-6-theme-settings`
Baseline: `47664f217cc150b64d68158b3babd38bac2885d6`

Status: PHASE 6 THEME SETTINGS ENGINEERING COMPLETE — READY FOR OWNER REVIEW.

All 252 settings across 13 merchant groups are reconciled, including the 245 original settings. Seven settings were added, 112 existing settings repaired or clarified, 37 retained and deprecated, and none removed. A separate `theme_info` metadata entry was added. The final inventory contains 338 rows, including 86 explicitly documented legacy/dynamic/retired contracts. No unresolved source-level Theme Settings defect remains in the audited scope. Local fixture validation is complete; live Shopify acceptance remains in [owner-review.md](owner-review.md).

`settings-inventory.json` is the authoritative machine-readable contract. `validation/checkpoint-g/reconciliation.json` records exact changed IDs, compatibility assertions, hashes and all 49 changed runtime files' direct settings dependencies. Counts are disjoint: repairs include schema/help/default corrections and demonstrated direct/indirect consumer changes, excluding added and deprecated IDs. A clarification does not necessarily change runtime behavior.

## Checkpoint A

245 schema settings in 13 groups; 543 runtime source files scanned. Schema IDs, defaults, allowed options/ranges, saved values and direct/aliased/dynamic references are recorded in `settings-inventory.json`. `component-register.csv` is a compact review index; JSON is authoritative for contract detail. No duplicate IDs or invalid option/range defaults were found. Subsequent checkpoints must disposition every row and prove runtime behavior: a Liquid-to-JavaScript export alone is not implementation.

Inventory excludes section/block controls and snippets whose named `settings` argument is local. Global `g`/`t` aliases and explicitly passed `theme_settings` objects are included. Dynamic social network URLs resolve to six schema IDs. Warehouse compatibility resolves to 60 old global IDs (12 groups × five fields), retained from Phase 4 behind section mapping blocks. CSS token definition/use edges and JavaScript object readers are included. Static edges do not certify rendering, active template reachability or browser behavior.

All six owner-identified saved keys are explicitly retained and dispositioned. `sections`, `blocks` and `content_for_index` are Shopify structure, not missing global schema IDs. `platform_customizations` is preserved as platform state. The actual source is used; historic commit origin of a legacy value is not assumed.

`config/settings_data.json` is unchanged. SHA-256 before and after A: `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499`.

## Publication and scope

Every checkpoint must be published with a non-force branch update and independently verified before further engineering. No main writes, merges, demo-store QA, broad redesign, readability refactor or Phase 7. The final handoff will supply the verified remote SHA.

## Checkpoint sequence

B: branding, typography and tokens. C: headers, footers, commerce and search. D: media, 404, localization and performance. E: integrations against current official guidance. F: popup lifecycle/settings. G: complete dispositions and regression reconciliation. All engineering checkpoints are complete. See [publication.md](publication.md) for the verified publication chain and how to identify the closure commit.

## Checkpoint B — branding, typography and shared design tokens

A independently verified at `5754ce90cf801e40566e12cdaaac6a1574c62249`. The API normalized the CSV line endings; its content matches the local audit. Future publication preserves source bytes.

Reviewed all 64 original controls in the first three groups plus one added color-mode selector. Added social sharing metadata with page image → global sharing image → logo precedence and escaped attributes. Both layouts now expose the selected light/dark mode; the existing enable switch still gates dark tokens. New dark on-color text defaults to white for contrast on the existing blue primary. Explicit merchant colors remain respected. Shared chips now consume chip_shape, shared .btn defaults consume the global variant, and common page widths consume style_kit. Explicit section styles retain priority.

Corrected shared spacing output to pixels (12/16/24 spacing and 48px section spacing), matching the numeric range, component fallbacks and existing main-search pixel usage. Labels now state pixels. This fixes the 0.12/0.16/0.24rem compression; it is an intentional visible spacing correction requiring owner review. Numeric saved configuration is untouched. Typography keeps its existing rem×100 and em×1000 contracts with clearer help. Zero padding, zero border width and zero radius remain valid.

Six unused global blog/article controls are explicitly labeled legacy and deprecated. Blog/article sections already own these options; wiring a second hidden override would conflict with Phase 4. All IDs/types/options remain retained. `quadratum-tokens.css` is an unreferenced compatibility asset, not a second active token system; no source deletion. Missing legacy breakpoint/custom-CSS references remain for integration/reconciliation review.

B validation: schema/default checks pass; rendered token/metadata behavior passes; actual theme/password layout, base-token and all 66 Phase 5 header-account entry regressions pass. Full Theme Check is recorded in checkpoint-b. No merchant state change. These are source/fixture results, not live Shopify certification.

## Checkpoint C — headers, footers, commerce and search

B remote verified: `50de7bf4224fd2200fbc34ad52d33b0d84e6d371`. Header/footer selection remains in layout. Header One and Footer One global options are labeled for their actual scope; other variants retain local controls. Header Two navigation is block-based, so the global menu is explicitly not an override. Inactive legacy logo-helper/store-name and unused global drawer-position controls are deprecated with local ownership guidance. All five headers retain Phase 5 account entry. Cart triggers are now native links, including without JavaScript.

Drawer colors, panel colors, width, zero overlay opacity, continue-shopping visibility and product/card/add-on/header trigger flags are wired. Disabled forms retain native submission; disabled header triggers retain the localized cart route. Product cards use the modern drawer switch, preserving cart_mode only when that switch is absent. Explicit modern false wins. Shared card quick-add and badges inherit globals only when the host has not passed a value, including preserved false. Specialized bundle add modes remain local.

Added display-only shipping threshold progress, clamped to valid amounts and current cart currency. It does not grant shipping eligibility, rewards or currency conversion. Cart-page reward/add-on blocks remain unchanged and tested. Removed unreachable reward/add-on renders from the global drawer: layout provides no section blocks. Unsupported drawer tier/add-on and metaobject controls are explicitly deprecated, as are unimplemented gift-wrap/coupon controls and duplicated collection/PDP globals. No schema ID, option or saved value was removed. These controls do not secretly override retained Phase 4 sections. Checkout note now renders escaped in the summary.

Four existing search consumer IDs receive schema controls: search-page placeholder, popup heading, subheading and width. Existing predictive sources, false toggles, per-resource limits, master switch, popup mode, main-search layout and empty browse links pass retained tests. Collection suggestions remain predictive-only per Shopify's search model.

Validation: new commerce permutations, strict changed-source parsing, Phase 4 cart, collection hosts, search contracts, main search, global modal/header surfaces and all 66 Phase 5 entry scenarios pass. Full Theme Check is in checkpoint-c. Native transport and hosted account behavior still require live owner acceptance. Merchant settings_data remains byte-identical.

## Checkpoint D — media, 404, localization and performance

C remote verified: `0ee1c88000a0ed929af2f53e442d45fd92d9a0fc`. Shared product-card loading and missing ratio arguments now inherit global defaults; explicit host ratios, eager heroes and component loading policies remain local. The loading label/help names its actual shared-card/social scope instead of promising to rewrite every image. Lottie has no renderer and is explicitly deprecated. Decorative background videos are now always muted and do not expose inaccessible native controls; existing motion buttons, autoplay/loop defaults, reduced-motion and visibility handling remain. Deprecated mute/controls values are retained; content-video sections keep their own sound/control settings.

404 text URL fields retain type and saved values, but destinations pass the existing Phase 5 safe-web-link helper with localized fallbacks. The search form honors native searchable sources; all-off/collection-only mode does not offer an ineffective search. The principal 404 image is eager because it is primary page media.

Footers One/Three/Four now use a native localization form when the corresponding global selector is enabled and multiple options exist. It uses Shopify's country/region and locale objects; it does not create currencies or translations. Footers Two/Five retain their explicit local native selectors. The old icon option renders an icon with readable labels. Shared direction logic supports explicit Arabic/Hebrew scripts and avoids forcing Latin-script variants into RTL; both layouts use it.

Normal and password layouts share font-face loading with a validated swap/fallback value; legacy async explicitly aliases swap. Duplicate selected fonts are emitted once. Preconnect values are normalized to HTTPS origins, escaped, deduplicated and reject credential/encoded-invalid authority strings. No additional renderer or external tracking dependency was installed.

Validation covers source parsing, media/default/override behavior, native localization fields/options, RTL/script cases, safe 404 routes and source-disabled search, layout/collection/modal regressions and retained banner lifecycle suites. One Phase 4 expectation was deliberately updated: global mute=false no longer produces audible decorative backgrounds; autoplay=false and loop=false still work. Full Theme Check is recorded in checkpoint-d. No live platform form submission or media certification is claimed. settings_data remains byte-identical.

## Checkpoint E — truthful integrations and compatibility boundaries

D remote verified: `6383f91d25599323b346a4757461c9dc62f5ae91`. Current official Shopify Theme Store, Web Pixels, Customer Privacy, theme CAPTCHA and app-extension documentation was reviewed before integration changes. `integration-contracts.md` records sources, runtime ownership, trust boundaries and required provider configuration.

Deprecated inert analytics IDs, unused consent-label/checked controls, the unenforced browser score threshold and unused global map coordinates. Consent-mode options now clearly describe legacy metadata only. Native newsletter confirmation remains explicit. Bulk-order backend labels describe actual native/endpoint behavior; legacy option values are retained. The canonical global public CAPTCHA key now reaches all nine form hosts, after local and retained provider-specific keys and only for the matching global provider. Native forms retain Shopify CAPTCHA; custom endpoints verify their own tokens. Endpoint credential/control-character checks are hardened.

Merchant script hooks are deliberately retained as privileged trusted-code compatibility points, with explicit help and a functional master off switch. Default enabled preserves earlier behavior; current saved configuration adds no code. They do not enforce privacy or install pixels. Owner decisions for migration/distribution are explicit, not silently destructive. Optional Maps stays default-off and its automatic provider loading is accurately disclosed; section coordinates and native list fallback remain. Social global consumers now validate destinations and escape attributes. Legacy CSS cannot terminate its style element with HTML markup.

Validation covers actual key precedence in nine hosts, unsafe social destinations, credential-bearing endpoints, CSS containment, code gates, retained native/custom forms, social links and locator behavior. No provider network call, real form delivery or privacy certification is claimed. settings_data remains byte-identical.

## Checkpoint F — global popup contracts

E remote verified: `636148bc96a1f5de9219878a84bfeb750c5abb82`. Wired all popup palette, overlay/zero opacity, radius/zero radius, width and padding settings. Existing eight placements and seven animation values now have distinct behavior; screen limits and reduced motion win. Fullscreen uses full screen/square edges; minimal hides its image. Explicit help describes those overrides. Removed conflicting forced-center behavior and inherited duplicate padding without redesigning the content system.

Added the previously consumed editor-preview checkbox. Preview opens once per render without writing frequency state; closing stays closed. The unused popup_type selector is deprecated, preserving every option. Its age_gate option never verified age or restricted access. Trigger and actual content controls determine behavior. Labels/help now make this clear.

Repaired enable/device gates for manual opening, first-visit recording, expiry, stale close timers, host replacement/unload, and native newsletter response visibility. Escape, overlay policy, focus trapping/restoration, inert background and reduced motion are covered. Native signup now requires explicit marketing confirmation and preserves Shopify CAPTCHA markup; this does not set tracking consent. Text/links are escaped and destinations validated.

Frequency uses existing session/day/week keys plus a first-visit flag. Browser persistence is accessed only when Shopify Customer Privacy reports preference processing allowed; otherwise memory is limited to the page. The documented API loader is requested, but no consent is asserted or changed. This can cause repeat display across pages when permission is unavailable and is disclosed in the editor. Manual open bypasses frequency but respects enable/device policy. Automatic promotions yield to an existing visible modal.

Validation includes 49 schema-option permutations and lifecycle/privacy/trigger cases. Real Chromium fixtures additionally check placement, focus, overflow, colors, reduced motion, RTL and native form markup. A browser-only initial-focus failure exposed a visibility-transition timing conflict; removing that conflict made focus available as the dialog opens. Full results are in checkpoint-f; they are local fixtures, not a live Shopify certification.

## Checkpoint G — final reconciliation

F remote verified: `7252d3a0ee294c9fea0ef3155c9d448a7dd024c4`. Every schema control and reverse global read now has a disposition, consumer or explicit compatibility purpose. The final inventory scans 550 runtime source files, resolves all seven dynamic access expressions, distinguishes local form parameters from global settings and traces cart JavaScript property readers beyond the Liquid export. There are no unresolved dispositions, unmapped global reads or active settings without implementation evidence.

Removed the unused `QuadratumSettings.customer` export, which had no JavaScript reader; no account section/template implementation or saved value changed. `account_layout` remains legacy saved state. The exported `orders_show_reorder` and `customer_help_text` names had no schema or saved state and are recorded as retired exports. Retained theme/search exports remain compatibility transport; their Liquid/DOM implementations supply the active behavior. The unused `--c-danger` alias and unloaded `quadratum-tokens.css` asset are documented compatibility surfaces, not evidence of active settings implementation.

Added theme metadata for Quadratum, author DylanJHamilton, engineering version 1.0.0, branch documentation and repository issues. Owner confirmation of the distribution version/support policy remains required. This metadata does not claim a published product release or Theme Store certification.

All 245 original IDs and types, select/radio option values, and range bounds/steps are unchanged. Section/block/platform state is preserved. `settings_data.json` was never rewritten: before and after SHA-256 are both `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499`. All 55 saved global keys are accounted for, including the six owner-identified legacy keys. See [owner-review.md](owner-review.md) for their exact values and dispositions.

### Reviewed groups

| Merchant group | Final settings |
| --- | ---: |
| Theme Settings | 2 |
| Branding | 41 |
| User Interface | 22 |
| Header | 7 |
| Footer | 5 |
| Commerce Defaults | 35 |
| Search Settings | 44 |
| 404 Settings | 19 |
| Media Settings | 7 |
| Integrations | 28 |
| Popups | 36 |
| Performance Settings | 2 |
| Localization Settings | 4 |
| Total | 252 |

Added IDs: `color_scheme`, `custom_scripts_enabled`, `popup_editor_preview`, `search_page_placeholder`, `search_popup_heading`, `search_popup_max_width`, `search_popup_subheading`. The reconciliation JSON lists every repaired and deprecated ID; the inventory records why each retained setting exists and what takes precedence.

### Final validation

| Gate | Result and evidence |
| --- | --- |
| Schema, inventory and compatibility | Pass: no duplicate/invalid defaults, unresolved consumer contracts or merchant-state drift; `checkpoint-g/inventory-summary.json` and `reconciliation.json`. |
| Phase 3/4 regressions | All 112 executable suites pass; `checkpoint-g/regressions/results.json` and individual logs. |
| Phase 5/6 targeted suites | All 13 pass, including 66 Phase 5 account-entry scenarios and Phase 6 source/branding/commerce/media/integration/popup contracts; `checkpoint-g/targeted-results.json`. |
| Popup/commerce/localization browser | 41 Chromium fixtures pass with no runtime errors, axe violations or overflow; `checkpoint-f/browser-results.json`. |
| Header browser | 72 cases pass, plus 20 account accessibility audits, 15 keyboard checks and five lifecycle checks; `checkpoint-g/header-browser/browser.json`. |
| Account browser | 63 fixtures pass, including nine no-JavaScript cases; no runtime errors, axe violations or overflow; `checkpoint-g/account-browser-results.json`. |
| Theme Check 4.8.0 | Zero errors, 517 warnings; baseline zero errors, 510 warnings. Raw output and reconciliation in `checkpoint-g/theme-check*.json`. |

The seven additional Theme Check warnings are `OrphanedSnippet` reports for helpers with real render callers; each caller is recorded in the summary and exercised by fixtures. Existing Footer Two complexity remains 135 with shifted source lines. Existing product-card complexity rises from 122 to 137 for the bounded image default and drawer compatibility logic. These warnings are disclosed, not suppressed; a broad readability refactor remains outside Phase 6.

Retained regression fixtures were adjusted only for the metadata-only schema entry, corrected pixel spacing, nested native localization form parsing, source-aware 404 hidden fields, decorative muted backgrounds and explicit preference permission in the popup persistence fixture. No behavior assertion was removed to conceal a defect. Source/parser and browser adapters approximate platform objects; external requests are intercepted. Provider delivery, Shopify account transport, Markets, real native CAPTCHA, Theme Editor and manual assistive-technology behavior still require live acceptance.

The branch is ready for owner review of the documented visible corrections and integration/distribution decisions. No demo store, preset migration, Phase 7 work, main write or merge is included.
