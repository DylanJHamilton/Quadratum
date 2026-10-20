# Bulk order request

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Bulk order request.
2. Configure company, product, quantity and purchase-order inquiry fields. Use the same layout controls as other forms.
3. This sends a quote request through Shopify. It does not create orders, apply wholesale prices or reserve inventory.
4. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
5. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
6. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Uses Shopify’s native contact form. This requests a quote; it does not create an order or reserve inventory.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Section aria-label

Enter the section aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bulk order and purchase order request form`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bulk & wholesale`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Request a bulk order quote`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Tell us what you need and our team will prepare a custom quote for your bulk or purchase order request, including lead times and shipping options.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Stack, Split, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`stack`, `split`, `wide`

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Surface, Contrast, Brand.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`surface`, `contrast`, `brand`

</details>

### Max content width

Choose one of the supported options below for max content width. Only the selected option applies; other settings can further customize its appearance.

Default: `lg`.

Options: sm, md, lg.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`sm`, `md`, `lg`

</details>

### Show top divider

Turn on “Show top divider” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_divider`. Type: `checkbox`.

</details>

### Recipient metadata (custom endpoint only)

Enter the recipient metadata (custom endpoint only). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Does not route Shopify contact notifications. Configure the Shopify recipient in store settings; custom servers must implement their own routing.

<details><summary>Reference for connected builders</summary>

Setting: `target_email`. Type: `text`.

</details>

### Hidden source tag

Enter the hidden source tag. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `bulk_order_request`.

<details><summary>Reference for connected builders</summary>

Setting: `hidden_source`. Type: `text`.

</details>

### Additional tags (comma-separated)

Enter the additional tags (comma-separated). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `b2b,bulk,quote`.

<details><summary>Reference for connected builders</summary>

Setting: `hidden_tags`. Type: `text`.

</details>

### On successful submission

Choose one of the supported options below for on successful submission. Only the selected option applies; other settings can further customize its appearance.

Shopify mode: store-relative redirects use the native return path; external URLs appear as a success link. External endpoint responses and redirects are owned by that provider.

Default: `inline_message`.

Options: Inline message, Redirect.

<details><summary>Reference for connected builders</summary>

Setting: `success_mode`. Type: `select`.

`inline_message`, `redirect`

</details>

### Success heading

Enter the success heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Request received`.

<details><summary>Reference for connected builders</summary>

Setting: `success_heading`. Type: `text`.

</details>

### Success message

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Thank you. Your request has been received.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `success_body`. Type: `richtext`.

</details>

### Redirect URL (if chosen above)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `success_redirect_url`. Type: `url`.

</details>

### Submit button label

Enter the submit button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Submit bulk order request`.

<details><summary>Reference for connected builders</summary>

Setting: `submit_label`. Type: `text`.

</details>

### Show “I already have a PO #” toggle

Turn on “Show “I already have a PO #” toggle” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_po_toggle`. Type: `checkbox`.

</details>

### PO toggle label

Enter the po toggle label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `I already have a purchase order number`.

<details><summary>Reference for connected builders</summary>

Setting: `po_toggle_label`. Type: `text`.

</details>

### PO number label

Enter the po number label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Purchase order number`.

<details><summary>Reference for connected builders</summary>

Setting: `po_number_label`. Type: `text`.

</details>

### PO number placeholder

Enter the po number placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `e.g., PO-10294`.

<details><summary>Reference for connected builders</summary>

Setting: `po_number_placeholder`. Type: `text`.

</details>

### Minimum quantity hint

Enter the minimum quantity hint. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Minimum order quantities may apply depending on product and region.`.

<details><summary>Reference for connected builders</summary>

Setting: `min_quantity_hint`. Type: `text`.

</details>

## Field labels and placeholders

### Company label

Enter the company label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Company name`.

<details><summary>Reference for connected builders</summary>

Setting: `company_label`. Type: `text`.

</details>

### Company placeholder

Enter the company placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Your company`.

<details><summary>Reference for connected builders</summary>

Setting: `company_placeholder`. Type: `text`.

</details>

### Contact name label

Enter the contact name label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Contact name`.

<details><summary>Reference for connected builders</summary>

Setting: `contact_name_label`. Type: `text`.

</details>

### Contact name placeholder

Enter the contact name placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Your name`.

<details><summary>Reference for connected builders</summary>

Setting: `contact_name_placeholder`. Type: `text`.

</details>

### Email label

Enter the email label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Email`.

<details><summary>Reference for connected builders</summary>

Setting: `email_label`. Type: `text`.

</details>

### Email placeholder

Enter the email placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `you@company.com`.

<details><summary>Reference for connected builders</summary>

Setting: `email_placeholder`. Type: `text`.

</details>

### Phone (optional)

Enter the phone (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Phone (optional)`.

<details><summary>Reference for connected builders</summary>

Setting: `phone_label`. Type: `text`.

</details>

### (555) 555-5555

Enter the (555) 555-5555. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `phone_placeholder`. Type: `text`.

</details>

### Products of interest

Enter the products of interest. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Products of interest`.

<details><summary>Reference for connected builders</summary>

Setting: `products_label`. Type: `text`.

</details>

### Paste links, skus, or describe what you need…

Enter the paste links, skus, or describe what you need…. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `products_placeholder`. Type: `text`.

</details>

### Link to product pages, collections, or describe skus here.

Enter the link to product pages, collections, or describe skus here.. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `products_hint`. Type: `text`.

</details>

### Estimated quantity

Enter the estimated quantity. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Estimated quantity`.

<details><summary>Reference for connected builders</summary>

Setting: `quantity_label`. Type: `text`.

</details>

### e.g., 50–100 units

Enter the e.g., 50–100 units. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `quantity_placeholder`. Type: `text`.

</details>

### Approximate units or ranges are fine.

Enter the approximate units or ranges are fine.. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `quantity_hint`. Type: `text`.

</details>

### Desired delivery date / deadline

Enter the desired delivery date / deadline. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Desired delivery date`.

<details><summary>Reference for connected builders</summary>

Setting: `delivery_date_label`. Type: `text`.

</details>

### If you don’t have a firm date, give your best estimate.

Enter the if you don’t have a firm date, give your best estimate.. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `delivery_date_hint`. Type: `text`.

</details>

### Additional notes

Enter the additional notes. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Additional notes`.

<details><summary>Reference for connected builders</summary>

Setting: `notes_label`. Type: `text`.

</details>

### Delivery instructions, special requirements, questions…

Enter the delivery instructions, special requirements, questions…. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `notes_placeholder`. Type: `text`.

</details>

## Blocks you can add

### Custom field

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Additional field`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Field key (used in name=contact[...])

Enter the field key (used in name=contact[...]). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `custom_field`.

<details><summary>Reference for connected builders</summary>

Setting: `name`. Type: `text`.

</details>

#### Placeholder

Enter the placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Enter value`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder`. Type: `text`.

</details>

#### Type

Choose one of the supported options below for type. Only the selected option applies; other settings can further customize its appearance.

Default: `text`.

Options: Text, Textarea.

<details><summary>Reference for connected builders</summary>

Setting: `field_type`. Type: `select`.

`text`, `textarea`

</details>

#### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `full`.

Options: Full, Half.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `select`.

`full`, `half`

</details>

#### Required

Turn on “Required” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `required`. Type: `checkbox`.

</details>

## File reference

`sections/3rd-party-bulk-ordering.liquid`
