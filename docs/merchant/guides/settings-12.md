# Performance settings

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Performance settings.
2. Keep the default font-loading strategy unless you have measured an improvement. Compare multiple page types after any performance-related change.
3. Preconnect hints should match origins used by your real storefront. They cannot compensate for oversized imagery, heavy app scripts, or too much content above the fold.
4. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
5. Preview a home, product, collection, and cart page before saving shared changes.

### Font loading strategy

Choose one of the supported options below for font loading strategy. Only the selected option applies; other settings can further customize its appearance.

Swap shows fallback text immediately. Fallback limits the font swap period. Legacy async uses swap; it is not a separate loader.

Default: `swap`.

Options: swap, fallback, Swap (legacy async).

<details><summary>Reference for connected builders</summary>

Setting: `font_loading`. Type: `select`.

`swap`, `fallback`, `async`

</details>

### Preconnect hosts (comma-separated)

Advanced: list only origins the storefront actually needs, separated by commas. Keep Shopify CDN origins unless you have measured a reason to change them. This hints at connections; it does not load a script or make an external service faster by itself.

Comma-separated HTTPS origins. Invalid entries and duplicates are ignored; paths are reduced to their origin. Avoid unused connections.

Default: `https://cdn.shopify.com, https://fonts.shopifycdn.com`.

<details><summary>Reference for connected builders</summary>

Setting: `preconnect_hosts`. Type: `textarea`.

</details>

## File reference

`config/settings_schema.json`
