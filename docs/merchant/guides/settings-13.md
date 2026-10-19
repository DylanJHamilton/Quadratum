# Localization settings

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Localization settings.
2. Set up Shopify Markets and publish translated languages before enabling selectors. Review country and language changes using the actual storefront.
3. RTL changes direction and needs translated content as well as a visual review. Theme settings do not translate product descriptions or create exchange rates.
4. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
5. Preview a home, product, collection, and cart page before saving shared changes.

### Show country/region selector

Turn on “Show country/region selector” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it. Configure countries, currencies, and published languages in Shopify first. Enabling a selector does not add a market or translate your content. RTL changes layout direction; review translated content and icons separately.

Footers One, Three and Four. Shopify Markets controls available countries and currencies. Footers Two and Five use their local controls.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `currency_selector_enable`. Type: `checkbox`.

</details>

### Show language selector

Turn on “Show language selector” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it. Configure countries, currencies, and published languages in Shopify first. Enabling a selector does not add a market or translate your content. RTL changes layout direction; review translated content and icons separately.

Footers One, Three and Four; shown when multiple languages are available. Footers Two and Five use their local controls.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `locale_selector_enable`. Type: `checkbox`.

</details>

### Enable RTL styles

Turn on “Enable RTL styles” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it. Configure countries, currencies, and published languages in Shopify first. Enabling a selector does not add a market or translate your content. RTL changes layout direction; review translated content and icons separately.

Use right-to-left document direction for supported RTL locales. Does not translate content. Review custom sections in each target locale.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `rtl_enable`. Type: `checkbox`.

</details>

### Language switcher style

Choose one of the supported options below for language switcher style. Only the selected option applies; other settings can further customize its appearance.

Shared selector appearance in Footers One, Three and Four.

Default: `text`.

Options: Text, Text with icon.

<details><summary>Reference for connected builders</summary>

Setting: `language_switcher_style`. Type: `select`.

`text`, `icon`

</details>

## File reference

`config/settings_schema.json`
