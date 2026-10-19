# 404 Settings

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and 404 Settings.
2. Use a clear error message, a Home or collection destination, and a search form. Add optional imagery after the navigation is useful.
3. Preview a nonexistent storefront path. The page must remain helpful even if the optional image is absent.
4. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
5. Preview a home, product, collection, and cart page before saving shared changes.

## Content

### Headline

Enter the headline. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Page not found`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_heading`. Type: `text`.

</details>

### Message

Write the message. Keep paragraphs short and preview long text on mobile.

Default: `We couldn’t find what you were looking for.`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_body`. Type: `textarea`.

</details>

## Primary action

### Primary button label

Enter the primary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Back to home`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_cta_label`. Type: `text`.

</details>

### Primary button link

Enter the primary button link. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Store-relative or HTTP(S) URL. Invalid destinations fall back to the localized store route.

Default: `/`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_cta_link`. Type: `text`.

</details>

## Secondary action

### Show continue shopping button

Turn on “Show continue shopping button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_show_continue_shopping`. Type: `checkbox`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Continue shopping`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_continue_shopping_label`. Type: `text`.

</details>

### Secondary button link

Enter the secondary button link. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Store-relative or HTTP(S) URL. Invalid destinations fall back to the localized store route.

Default: `/collections`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_continue_shopping_link`. Type: `text`.

</details>

## Search

### Show search form

Turn on “Show search form” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_show_search`. Type: `checkbox`.

</details>

### Search label

Enter the search label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search store`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_search_label`. Type: `text`.

</details>

### Search placeholder

Enter the search placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search our store`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_search_placeholder`. Type: `text`.

</details>

### Search button label

Enter the search button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_search_button_label`. Type: `text`.

</details>

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `centered`.

Options: Centered, Split content left, Split content right.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_layout`. Type: `select`.

`centered`, `split_left`, `split_right`

</details>

### Feature image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_image`. Type: `image_picker`.

</details>

### Show feature image

Turn on “Show feature image” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_show_image`. Type: `checkbox`.

</details>

## Background

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_bg_image`. Type: `image_picker`.

</details>

### Enable background image

Turn on “Enable background image” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_show_bg_image`. Type: `checkbox`.

</details>

### Enable background overlay

Turn on “Enable background overlay” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_overlay`. Type: `checkbox`.

</details>

## Spacing

### Top padding

Drag the control to adjust top padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `64`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_section_padding_top`. Type: `range`.

</details>

### Bottom padding

Drag the control to adjust bottom padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `64`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `notfound_section_padding_bottom`. Type: `range`.

</details>

## File reference

`config/settings_schema.json`
