# Account order tracking

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Account order tracking.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Legacy customer-account theme surface. Shopify owns authentication, account data and native form processing; current customer accounts are managed outside the theme. Tracking links require merchant configuration or native fulfillment data.

### Tracking provider URL

Enter the tracking provider url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

HTTPS URL or store-relative path. No credentials or placeholders in the host. Optional {order}, {email}, {tracking} placeholders are encoded. Otherwise values are sent as order, email and tracking query parameters. Configure only a provider that accepts this contract. Blank disables the form.

<details><summary>Reference for connected builders</summary>

Setting: `provider_url`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Order Tracking`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Enter the subheading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Find available order and shipment information.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `text`.

</details>

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Classic, Card, Split.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`classic`, `card`, `split`

</details>

### Show tracking number field

Turn on “Show tracking number field” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_tracking_number_field`. Type: `checkbox`.

</details>

### Show explanatory shipment stages

Turn on “Show explanatory shipment stages” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Static guidance only; never live order status.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_timeline`. Type: `checkbox`.

</details>

## Support CTA

### Show support CTA

Turn on “Show support CTA” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_support_cta`. Type: `checkbox`.

</details>

### Support heading

Enter the support heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Need help with your order?`.

<details><summary>Reference for connected builders</summary>

Setting: `support_heading`. Type: `text`.

</details>

### Support text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>If your tracking information has not updated yet, contact support and our team can help review your order.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `support_text`. Type: `richtext`.

</details>

### Support button label

Enter the support button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Contact Support`.

<details><summary>Reference for connected builders</summary>

Setting: `support_button_label`. Type: `text`.

</details>

### Support button URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `support_button_url`. Type: `url`.

</details>

## Account links

### Back to account label

Enter the back to account label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Back to account`.

<details><summary>Reference for connected builders</summary>

Setting: `back_to_account_label`. Type: `text`.

</details>

### Back to orders label

Enter the back to orders label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Back to orders`.

<details><summary>Reference for connected builders</summary>

Setting: `back_to_orders_label`. Type: `text`.

</details>

### Orders page URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `orders_page_url`. Type: `url`.

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

## Timeline

### Stage marker color

Choose a color for stage marker color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Decorative stage markers; does not indicate a live status.

Default: `#14532d`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_active_color`. Type: `color`.

</details>

### Stage connector color

Choose a color for stage connector color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#d1d5db`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_inactive_color`. Type: `color`.

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

`sections/account-main-account-order-tracking.liquid`
