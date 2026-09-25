# Global settings dependency map

`config/settings_schema.json` defines merchant controls. `config/settings_data.json` stores explicit merchant values and Shopify section/block/platform state. Defaults apply only when the platform has no explicit value. False and zero must remain valid values.

`layout/theme.liquid` selects Headers 1–5 and Footers 1–5, emits shared head assets, renders CSS tokens and exports selected JS configuration. `global-theme-vars` → `theme-tokens` + `utilities` defines the shared CSS contract; `q-base.css.liquid` and `styles.css` consume those tokens. Most retained components explicitly own local layout/colors/typography. A global default does not override an explicit component setting.

Search uses search-controller/static/predictive/popup snippets and main-search. Commerce uses product-card and cart drawer/shared snippets/controllers. Media defaults are consumed selectively by sections; explicit local media modes and critical hero loading retain priority. Forms pass local controls through a parameter also named `settings`; their `theme_settings` parameter carries actual globals. Social profiles dynamically choose six social URL keys. Warehouse mapping blocks win over the retained 12-group legacy global lookup.

See `settings-inventory.json` for every setting, source path/line, alias, dynamic expansion, CSS use edge and JS consumer. The `transport_only` marker means a JS export by itself, not a working feature. This map records the reconciled B–G precedence and integration contracts.

## Branding precedence

Page sharing image > social_share_image > logo_primary. Header-local logo (where supported) > global desktop/mobile image > store name. Font, size, line-height and heading-case tokens supply shared defaults; custom component fonts/sizes/colors remain authoritative. Light/dark selection applies to shared tokens, not section-local palettes. `.btn--solid/outline/ghost` overrides the global default variant; chip_shape supplies the shared chip radius. `style_kit` supplies common container width (cozy 1088px, comfort container_lg, wide container_xl, full 100%); explicit section width modes remain local. Spacing is now pixels; typography numeric scaling remains documented in schema help.

## Header/footer and commerce precedence

Global header_layout/footer_layout choose one of five sections. Header One uses global announcement defaults and optional sticky inheritance. Header Two uses navigation blocks; Headers One/Three/Four/Five use their selected menu before the global desktop_menu fallback. Footer One uses global column/announcement/bottom-text controls; Footers Two–Five own local presentation. All five headers use the Phase 5 current-account component and native fallback.

Global drawer enable → per-source trigger switch → native form/link when disabled. Explicit section-owned bundle add modes remain authoritative. Global drawer dimensions/colors/continue links apply to the layout-owned drawer only. Cart-page reward/add-on blocks are section-owned, not shared with layout. Shipping progress requires both its enable flag and a positive threshold, plus the drawer progress flag; display never grants a shipping rate or reward. No theme coupon, gift-wrap or metaobject integration is implied.

Shared card hosts may explicitly override quick-add and badge defaults, including false. Canonical enable_ajax_cart_drawer wins over legacy cart_mode; legacy fallback is consulted only when canonical state is absent. Search controllers resolve global defaults before explicit form arguments; main-search is globally controlled. Predictive collection suggestions do not become full-page collection search.

## Media, localization and performance ownership

Shared cards inherit global image loading and the shared product card inherits image_default_ratio only without a host ratio. Eager hero/primary images and explicitly configured section media retain their performance policy. Transparent/Transparent Sub Page/Web3 Sub Page backgrounds inherit autoplay/loop; accessible motion controllers can pause for reduced motion, inactive slides or visibility. Background audio and native controls are suppressed as these are decorative. Content-video sections remain local.

Global country/language selectors are native Shopify localization forms in Footers One/Three/Four. Two/Five have local controls. Published languages and enabled markets come from Shopify, not theme schema. theme-direction resolves RTL in both layouts. theme-fonts owns swap/fallback loading and async compatibility; theme-preconnect owns validated connection hints.

## Integration boundary

`form-captcha-key` resolves all nine hosts' public keys: local → retained provider-specific key → matching-provider global key. Native forms bypass third-party verification and retain Shopify markup. `forms_backend` only routes Bulk order's Global default choice. Form metadata and tags have no implicit marketing/consent effect. `integration-contracts.md` is authoritative for external ownership. Three legacy script locations share a real off switch; CSS hooks escape HTML delimiters. Social globals pass the retained safe-link helper before escaped output in footers, social blocks and profile rows.

## Popup ownership and precedence

The normal layout owns exactly one `global-popup` host. `popup_enable` controls storefront presence; `request.design_mode && popup_editor_preview` independently permits an editor host. `global-popup.js` reads DOM configuration before the retained JS fallback. Automatic trigger → enabled/device → page/frequency checks; manual open bypasses frequency only. Preview skips storefront eligibility and storage. Native form feedback reopens the eligible host to expose the response.

Popup CSS variables carry merchant styles; fullscreen geometry, screen constraints, image stacking/minimal style and reduced motion are explicit overrides. `popup_type` was removed from the pre-V1 schema because it never implemented content, age verification or a trigger; its saved value remains inert historical state. Newsletter display is independent of that label. Persistent frequency state requires Shopify preference permission; memory-only fallback does not impersonate consent. Provider-managed campaigns or age verification belong in an app with its own requirements.

## Final compatibility boundaries

`QuadratumSettings.theme` and `.search` remain compatibility transports with no in-repository JavaScript reader; their settings have actual Liquid/CSS/DOM consumers elsewhere. The unused `.customer` export was removed. `account_layout` stays saved and inactive; `orders_show_reorder` and `customer_help_text` are documented retired exports with no schema or saved state. Cart exports have explicit JavaScript consumer mappings in the inventory.

Legacy `bp_md`/`bp_lg` apply only where a retained consumer requests them, with 768/1024px fallbacks; they do not constitute a new global grid system. Legacy provider keys, form metadata, proxy endpoint, CSS hooks, Facebook page fallback and feed radius are explicitly typed and scoped in the inventory. Warehouse blocks take precedence over all 60 retained dynamic warehouse keys. Unsupported saved map/Facebook state has no active override effect.

`--c-danger` is retained as a semantic extension alias without an in-repository `var()` reader; `color_error` has actual form consumers. The unreferenced `assets/quadratum-tokens.css` is retained and not loaded. Neither is counted as functional settings implementation. All 37 audited deprecated controls were removed from the pre-V1 schema. Inventory records marked `RETIRED_PRE_V1` preserve their historical contract and replacement owner without displaying editor controls. No runtime reader remains for those global IDs; same-named section-local video controls are preserved.

`theme_info` is platform metadata rather than a merchant settings group. Future schema readers must tolerate entries without a `settings` array. H3 reconciliation preserves all 215 surviving IDs, types, defaults, option values and numeric bounds/steps, records the 37 authorized removals and asserts that current Shopify merchant state remains byte-identical. Small Theme/Performance/Localization groups remain because their controls perform supported functions.
