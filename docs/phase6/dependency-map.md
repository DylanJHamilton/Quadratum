# Global settings dependency map

`config/settings_schema.json` defines merchant controls. `config/settings_data.json` stores explicit merchant values and Shopify section/block/platform state. Defaults apply only when the platform has no explicit value. False and zero must remain valid values.

`layout/theme.liquid` selects Headers 1–5 and Footers 1–5, emits shared head assets, renders CSS tokens and exports selected JS configuration. `global-theme-vars` → `theme-tokens` + `utilities` defines the shared CSS contract; `q-base.css.liquid` and `styles.css` consume those tokens. Most retained components explicitly own local layout/colors/typography. A global default does not override an explicit component setting.

Search uses search-controller/static/predictive/popup snippets and main-search. Commerce uses product-card and cart drawer/shared snippets/controllers. Media defaults are consumed selectively by sections; explicit local media modes and critical hero loading retain priority. Forms pass local controls through a parameter also named `settings`; their `theme_settings` parameter carries actual globals. Social profiles dynamically choose six social URL keys. Warehouse mapping blocks win over the retained 12-group legacy global lookup.

See `settings-inventory.json` for every setting, source path/line, alias, dynamic expansion, CSS use edge and JS consumer. The `transport_only` marker means a JS export by itself, not a working feature. Checkpoints B–G add verified precedence and external integration contracts here.

## Branding precedence

Page sharing image > social_share_image > logo_primary. Header-local logo (where supported) > global desktop/mobile image > store name. Font, size, line-height and heading-case tokens supply shared defaults; custom component fonts/sizes/colors remain authoritative. Light/dark selection applies to shared tokens, not section-local palettes. `.btn--solid/outline/ghost` overrides the global default variant; chip_shape supplies the shared chip radius. `style_kit` supplies common container width (cozy 1088px, comfort container_lg, wide container_xl, full 100%); explicit section width modes remain local. Spacing is now pixels; typography numeric scaling remains documented in schema help.
