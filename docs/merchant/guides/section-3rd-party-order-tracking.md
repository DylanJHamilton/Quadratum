# 3P - order tracking

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3P - order tracking.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Redirect helper only. Configure your order-help page or provider URL. It does not authenticate customers or retrieve order/shipment data. Enable email only if required by the provider; values are sent in the destination URL.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Section aria-label

Enter the section aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Track your order`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Order tracking`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Track your order`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Explanation

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Enter your tracking details to open the configured order-help or tracking service.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

## Inputs

### Ask for email address

Turn on “Ask for email address” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_email_field`. Type: `checkbox`.

</details>

### Tracking field label

Enter the tracking field label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Order number or tracking ID`.

<details><summary>Reference for connected builders</summary>

Setting: `tracking_label`. Type: `text`.

</details>

### Tracking field placeholder

Enter the tracking field placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `e.g. #1234 or 1Z999...`.

<details><summary>Reference for connected builders</summary>

Setting: `tracking_placeholder`. Type: `text`.

</details>

### Tracking helper text

Enter the tracking helper text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Example: #1234, 9400 1000 0000 0000 0000, or 1Z…`.

<details><summary>Reference for connected builders</summary>

Setting: `tracking_helper`. Type: `text`.

</details>

### Email field label

Enter the email field label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Email address`.

<details><summary>Reference for connected builders</summary>

Setting: `email_label`. Type: `text`.

</details>

### Email field placeholder

Enter the email field placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `you@example.com`.

<details><summary>Reference for connected builders</summary>

Setting: `email_placeholder`. Type: `text`.

</details>

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Track my order`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Show additional help text/link

Turn on “Show additional help text/link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_secondary_help`. Type: `checkbox`.

</details>

### Secondary help text

Enter the secondary help text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Can’t find your order?`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_help_text`. Type: `text`.

</details>

### Secondary help URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_help_url`. Type: `url`.

</details>

## Button options

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `primary`.

Options: Primary, Secondary, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_style`. Type: `select`.

`primary`, `secondary`, `ghost`

</details>

### Open destination in new tab

Turn on “Open destination in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

## Mode and routing

### Tracking mode

Choose one of the supported options below for tracking mode. Only the selected option applies; other settings can further customize its appearance.

Default: `shopify_help`.

Options: Send to Shopify order help / status page, Redirect to external tracking URL pattern.

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`shopify_help`, `external_pattern`

</details>

## Shopify help mode

### Shopify order help URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `shopify_help_url`. Type: `url`.

</details>

### Append tracking ID as query parameter

Turn on “Append tracking ID as query parameter” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `shopify_help_append_query`. Type: `checkbox`.

</details>

### Query parameter name

Enter the query parameter name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `tracking`.

<details><summary>Reference for connected builders</summary>

Setting: `shopify_help_query_param`. Type: `text`.

</details>

## External pattern mode

### External tracking URL pattern

Enter the external tracking url pattern. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `external_pattern_url`. Type: `text`.

</details>

### Order help URL (no-JS / invalid pattern fallback)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `external_fallback_url`. Type: `url`.

</details>

## Layout and styling

### Layout variant

Choose one of the supported options below for layout variant. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Full width, Split.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`card`, `full_width`, `split`

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Surface, Contrast, Brand color.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`surface`, `contrast`, `brand`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`

</details>

### Show tracking icon

Turn on “Show tracking icon” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_icon`. Type: `checkbox`.

</details>

### Icon style

Choose one of the supported options below for icon style. Only the selected option applies; other settings can further customize its appearance.

Default: `package`.

Options: Package, Truck, Clock, Custom.

<details><summary>Reference for connected builders</summary>

Setting: `icon_style`. Type: `select`.

`package`, `truck`, `clock`, `custom`

</details>

### Custom icon (optional when icon style = custom)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `custom_icon`. Type: `image_picker`.

</details>

## File reference

`sections/3rd-party-order-tracking.liquid`
