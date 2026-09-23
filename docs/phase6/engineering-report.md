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
