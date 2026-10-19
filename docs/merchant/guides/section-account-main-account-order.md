# Account main order

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Account main order.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Legacy customer-account theme surface. Shopify owns authentication, account data and native form processing; current customer accounts are managed outside the theme. Tracking links require merchant configuration or native fulfillment data.

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `summary_sidebar`.

Options: Classic, Summary sidebar, Stacked.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`classic`, `summary_sidebar`, `stacked`

</details>

### Back link label

Enter the back link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Back to account`.

<details><summary>Reference for connected builders</summary>

Setting: `back_link_label`. Type: `text`.

</details>

### Orders page URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `orders_page_url`. Type: `url`.

</details>

## Tracking CTA

### Show tracking CTA

Turn on “Show tracking CTA” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_tracking_cta`. Type: `checkbox`.

</details>

### Tracking button label

Enter the tracking button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Track this order`.

<details><summary>Reference for connected builders</summary>

Setting: `tracking_button_label`. Type: `text`.

</details>

### Tracking page URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `tracking_page_url`. Type: `url`.

</details>

## Typography

### Heading font size

Drag the control to adjust heading font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `44`.

Range: 24 to 72 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_font_size`. Type: `range`.

</details>

### Body font size

Drag the control to adjust body font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 13 to 22 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `body_font_size`. Type: `range`.

</details>

### Meta font size

Drag the control to adjust meta font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 11 to 18 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `meta_font_size`. Type: `range`.

</details>

## Cards

### Card background

Choose a color for card background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `card_background`. Type: `color`.

</details>

### Card border

Choose a color for card border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `card_border`. Type: `color`.

</details>

### Card radius

Drag the control to adjust card radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 40 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card padding

Drag the control to adjust card padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 16 to 64 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_padding`. Type: `range`.

</details>

### Row gap

Drag the control to adjust row gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 8 to 40 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `row_gap`. Type: `range`.

</details>

## Badges

### Badge radius

Drag the control to adjust badge radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 40 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_radius`. Type: `range`.

</details>

## Buttons

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_style`. Type: `select`.

`solid`, `outline`, `ghost`

</details>

## File reference

`sections/account-main-account-order.liquid`
