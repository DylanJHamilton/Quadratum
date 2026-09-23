# Phase 6 — Theme settings architecture

Branch: `release/v1-phase-6-theme-settings`
Baseline: `47664f217cc150b64d68158b3babd38bac2885d6`

Status: IN PROGRESS. Checkpoint A inventories the complete global contract; source repairs and final acceptance are not yet complete.

## Checkpoint A

245 schema settings in 13 groups; 543 runtime source files scanned. Schema IDs, defaults, allowed options/ranges, saved values and direct/aliased/dynamic references are recorded in `settings-inventory.json`. `component-register.csv` is a compact review index; JSON is authoritative for contract detail. No duplicate IDs or invalid option/range defaults were found. Subsequent checkpoints must disposition every row and prove runtime behavior: a Liquid-to-JavaScript export alone is not implementation.

Inventory excludes section/block controls and snippets whose named `settings` argument is local. Global `g`/`t` aliases and explicitly passed `theme_settings` objects are included. Dynamic social network URLs resolve to six schema IDs. Warehouse compatibility resolves to 60 old global IDs (12 groups × five fields), retained from Phase 4 behind section mapping blocks. CSS token definition/use edges and JavaScript object readers are included. Static edges do not certify rendering, active template reachability or browser behavior.

All six owner-identified saved keys are explicitly retained and dispositioned. `sections`, `blocks` and `content_for_index` are Shopify structure, not missing global schema IDs. `platform_customizations` is preserved as platform state. The actual source is used; historic commit origin of a legacy value is not assumed.

`config/settings_data.json` is unchanged. SHA-256 before and after A: `ffc244582d58f3e6e07713abd6ab1de2cdef7ba109fc00a60cef886235b6b499`.

## Publication and scope

Every checkpoint must be published with a non-force branch update and independently verified before further engineering. No main writes, merges, demo-store QA, broad redesign, readability refactor or Phase 7. The final handoff will supply the verified remote SHA.

## Remaining sequence

B: branding, typography and tokens. C: headers, footers, commerce and search. D: media, 404, localization and performance. E: integrations against current official guidance. F: popup lifecycle/settings. G: complete dispositions and regression reconciliation.

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
