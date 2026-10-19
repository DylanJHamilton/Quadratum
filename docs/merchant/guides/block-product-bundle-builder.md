# Product bundle builder

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Product bundle builder. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Product block section.

## Bundle

### Bundle title

Enter the bundle title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Selected products`.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_title`. Type: `text`.

</details>

### Bundle description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_description`. Type: `richtext`.

</details>

### Optional bundle offer text

Enter the optional bundle offer text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Merchant-written offer only. This text does not create a discount.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_savings`. Type: `text`.

</details>

### Total label

Enter the total label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bundle total`.

<details><summary>Reference for connected builders</summary>

Setting: `total_label`. Type: `text`.

</details>

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add bundle to cart`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

### Unavailable label

Enter the unavailable label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bundle unavailable`.

<details><summary>Reference for connected builders</summary>

Setting: `unavailable_label`. Type: `text`.

</details>

### Include current product

Turn on “Include current product” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `include_current_product`. Type: `checkbox`.

</details>

### Number of bundle products

Drag the control to adjust number of bundle products. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `product_count`. Type: `range`.

</details>

### Bundle product 1

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_product_1`. Type: `product`.

</details>

### Bundle product 2

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_product_2`. Type: `product`.

</details>

### Bundle product 3

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_product_3`. Type: `product`.

</details>

### Bundle product 4

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_product_4`. Type: `product`.

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `cards`.

Options: Inline, Cards, Grid.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`inline`, `cards`, `grid`

</details>

### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto, Small, Medium, Large, Full.

<details><summary>Reference for connected builders</summary>

Setting: `block_width`. Type: `select`.

`auto`, `small`, `medium`, `large`, `full`

</details>

### Alignment

Choose one of the supported options below for alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Gap

Drag the control to adjust gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 80 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Card padding

Drag the control to adjust card padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 80 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `card_padding`. Type: `range`.

</details>

## Colors

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `rgba(0,0,0,0)`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

### Card background color

Choose a color for card background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `card_background_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Link color

Choose a color for link color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `link_color`. Type: `color`.

</details>

### Badge background

Choose a color for badge background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_background_color`. Type: `color`.

</details>

### Badge text

Choose a color for badge text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text_color`. Type: `color`.

</details>

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `button_background_color`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `button_text_color`. Type: `color`.

</details>

## Border

### Border width

Drag the control to adjust border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 8 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

### Border radius

Drag the control to adjust border radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 80 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `border_radius`. Type: `range`.

</details>

## Spacing

### Margin top

Drag the control to adjust margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_top`. Type: `range`.

</details>

### Margin bottom

Drag the control to adjust margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_bottom`. Type: `range`.

</details>

### Padding

Drag the control to adjust padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding`. Type: `range`.

</details>

## Visibility

### Show on desktop

Turn on “Show on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_desktop`. Type: `checkbox`.

</details>

### Show on tablet

Turn on “Show on tablet” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_tablet`. Type: `checkbox`.

</details>

### Show on mobile

Turn on “Show on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_mobile`. Type: `checkbox`.

</details>

## Animation

### Animation

Choose one of the supported options below for animation. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Fade, Fade up, Fade down, Fade left, Fade right, Zoom.

<details><summary>Reference for connected builders</summary>

Setting: `animation_style`. Type: `select`.

`none`, `fade`, `fade_up`, `fade_down`, `fade_left`, `fade_right`, `zoom`

</details>

### Quantity label

Enter the quantity label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Quantity:`.

<details><summary>Reference for connected builders</summary>

Setting: `quantity_label`. Type: `text`.

</details>

### Item unavailable label

Enter the item unavailable label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Unavailable`.

<details><summary>Reference for connected builders</summary>

Setting: `item_unavailable_label`. Type: `text`.

</details>

### Purchase options required message

Enter the purchase options required message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Choose purchase options on the product page.`.

<details><summary>Reference for connected builders</summary>

Setting: `options_required_label`. Type: `text`.

</details>

## File reference

`blocks/product-bundle-builder.liquid`
