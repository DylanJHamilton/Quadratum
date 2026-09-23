# Global settings dependency map

`config/settings_schema.json` defines merchant controls. `config/settings_data.json` stores explicit merchant values and Shopify section/block/platform state. Defaults apply only when the platform has no explicit value. False and zero must remain valid values.

`layout/theme.liquid` selects Headers 1–5 and Footers 1–5, emits shared head assets, renders CSS tokens and exports selected JS configuration. `global-theme-vars` → `theme-tokens` + `utilities` defines the shared CSS contract; `q-base.css.liquid` and `styles.css` consume those tokens. Most retained components explicitly own local layout/colors/typography. A global default does not override an explicit component setting.

Search uses search-controller/static/predictive/popup snippets and main-search. Commerce uses product-card and cart drawer/shared snippets/controllers. Media defaults are consumed selectively by sections; explicit local media modes and critical hero loading retain priority. Forms pass local controls through a parameter also named `settings`; their `theme_settings` parameter carries actual globals. Social profiles dynamically choose six social URL keys. Warehouse mapping blocks win over the retained 12-group legacy global lookup.

See `settings-inventory.json` for every setting, source path/line, alias, dynamic expansion, CSS use edge and JS consumer. The `transport_only` marker means a JS export by itself, not a working feature. Checkpoints B–G add verified precedence and external integration contracts here.
