# CTA — featured product

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose CTA — featured product.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured product call to action`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Product (prod and dev)

### Product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

Pick in Theme Editor or pass "shopify://products/" / "" via JSON.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

### DEV ONLY: product handle (fallback)

Enter the dev only: product handle (fallback). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Used only when Product is empty. Example: cotton-tee

<details><summary>Reference for connected builders</summary>

Setting: `dev_product_handle`. Type: `text`.

</details>

## Appearance

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `color_bg`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `color_text`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `color_muted`. Type: `color`.

</details>

### Price text

Choose a color for price text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `color_price`. Type: `color`.

</details>

### Compare-at text

Choose a color for compare-at text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `color_compare`. Type: `color`.

</details>

### Savings badge background

Choose a color for savings badge background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ecfccb`.

<details><summary>Reference for connected builders</summary>

Setting: `color_savings_bg`. Type: `color`.

</details>

### Savings badge text

Choose a color for savings badge text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#365314`.

<details><summary>Reference for connected builders</summary>

Setting: `color_savings_fg`. Type: `color`.

</details>

### In-stock text

Choose a color for in-stock text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#166534`.

<details><summary>Reference for connected builders</summary>

Setting: `color_stock_in`. Type: `color`.

</details>

### Out-of-stock text

Choose a color for out-of-stock text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#991b1b`.

<details><summary>Reference for connected builders</summary>

Setting: `color_stock_out`. Type: `color`.

</details>

### Primary button background

Choose a color for primary button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `color_btn_bg`. Type: `color`.

</details>

### Primary button text

Choose a color for primary button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `color_btn_fg`. Type: `color`.

</details>

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `compact`.

Options: Compact card, Wide split, Spotlight minimal (no image).

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`compact`, `split`, `minimal`

</details>

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `start`.

Options: Start, Center.

<details><summary>Reference for connected builders</summary>

Setting: `align`. Type: `select`.

`start`, `center`

</details>

### Surface style

Choose one of the supported options below for surface style. Only the selected option applies; other settings can further customize its appearance.

Default: `default`.

Options: Default, Elevated (shadow), Outlined.

<details><summary>Reference for connected builders</summary>

Setting: `surface_style`. Type: `select`.

`default`, `elevated`, `outlined`

</details>

### Media width (split layout, %)

Drag the control to adjust media width (split layout, %). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `50`.

Range: 30 to 70 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `media_width`. Type: `range`.

</details>

### Media aspect ratio

Choose one of the supported options below for media aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (image natural ratio), 1:1, 4:3, 3:2, 16:9.

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `select`.

`auto`, `1:1`, `4:3`, `3:2`, `16:9`

</details>

## Slideshow

### Use slideshow (uses all product media)

Turn on “Use slideshow (uses all product media)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_slider`. Type: `checkbox`.

</details>

### Show arrows

Turn on “Show arrows” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_arrows`. Type: `checkbox`.

</details>

### Show dots

Turn on “Show dots” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_dots`. Type: `checkbox`.

</details>

### Custom image (used when slider is off)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `custom_media`. Type: `image_picker`.

</details>

## Content

### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Editor’s pick`.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

### Headline (≤ 8 words)

Enter the headline (≤ 8 words). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Discover your next favorite`.

<details><summary>Reference for connected builders</summary>

Setting: `headline`. Type: `text`.

</details>

### Subheading (1–2 sentences)

Write the subheading (1–2 sentences). Keep paragraphs short and preview long text on mobile.

Default: `Take a closer look at our featured product.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Show product rating

Turn on “Show product rating” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `social_proof`. Type: `checkbox`.

</details>

### Trust badges row (icons/text)

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `trust_badges`. Type: `richtext`.

</details>

### Microcopy / shipping line

Enter the microcopy / shipping line. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Add delivery or returns information that applies to this product.

<details><summary>Reference for connected builders</summary>

Setting: `microcopy`. Type: `text`.

</details>

### Quantity label (override)

Enter the quantity label (override). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Quantity`.

<details><summary>Reference for connected builders</summary>

Setting: `qty_label`. Type: `text`.

</details>

## Pricing visibility

### Show price

Turn on “Show price” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_price`. Type: `checkbox`.

</details>

### Show compare-at price

Turn on “Show compare-at price” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_compare`. Type: `checkbox`.

</details>

### Show savings badge

Turn on “Show savings badge” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_savings`. Type: `checkbox`.

</details>

## Variants and quantity

### Variant control style

Choose one of the supported options below for variant control style. Only the selected option applies; other settings can further customize its appearance.

Default: `dropdowns`.

Options: Dropdowns, Buttons, Swatches.

<details><summary>Reference for connected builders</summary>

Setting: `variant_style`. Type: `select`.

`dropdowns`, `buttons`, `swatches`

</details>

### Show quantity field

Turn on “Show quantity field” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_qty`. Type: `checkbox`.

</details>

### Show vendor

Turn on “Show vendor” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_vendor`. Type: `checkbox`.

</details>

### Show SKU

Turn on “Show SKU” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_sku`. Type: `checkbox`.

</details>

## Primary action

### Primary CTA

Choose one of the supported options below for primary cta. Only the selected option applies; other settings can further customize its appearance.

Default: `add`.

Options: Add to cart, Buy now, View product.

<details><summary>Reference for connected builders</summary>

Setting: `primary_cta_type`. Type: `select`.

`add`, `buy`, `view`

</details>

### Primary label (optional override)

Enter the primary label (optional override). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `primary_label`. Type: `text`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_label`. Type: `text`.

</details>

### Secondary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_url`. Type: `url`.

</details>

### CTA alignment

Choose one of the supported options below for cta alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `start`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `cta_align`. Type: `select`.

`start`, `center`, `end`

</details>

## Sticky CTA (mobile)

### Enable sticky CTA bar on mobile (≤ 749px)

Turn on “Enable sticky CTA bar on mobile (≤ 749px)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_mobile_cta`. Type: `checkbox`.

</details>

## Spacing and radius

### Padding top (rem ×100)

Drag the control to adjust padding top (rem ×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `32`.

Range: 0 to 96 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_top`. Type: `range`.

</details>

### Padding bottom (rem ×100)

Drag the control to adjust padding bottom (rem ×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `32`.

Range: 0 to 96 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_bottom`. Type: `range`.

</details>

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

## File reference

`sections/call-to-action-featured-product.liquid`
