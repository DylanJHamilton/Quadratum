# Product inventory status

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Product inventory status. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Product block section.

## Inventory status

### Show inventory status

Turn on “Show inventory status” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_inventory`. Type: `checkbox`.

</details>

### Show tracked low-stock quantity

Turn on “Show tracked low-stock quantity” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_stock_count`. Type: `checkbox`.

</details>

### Low-stock threshold

Set the actual cart amount for the corresponding shipping or promotional milestone. Configure the matching shipping rate or discount separately in Shopify; this display does not apply a benefit.

Default: `5`.

Range: 1 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `low_stock_threshold`. Type: `range`.

</details>

### Available label

Enter the available label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Available`.

<details><summary>Reference for connected builders</summary>

Setting: `in_stock_text`. Type: `text`.

</details>

### Sold-out label

Enter the sold-out label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Sold out`.

<details><summary>Reference for connected builders</summary>

Setting: `sold_out_text`. Type: `text`.

</details>

### Backorder label

Enter the backorder label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Available to order`.

<details><summary>Reference for connected builders</summary>

Setting: `backorder_text`. Type: `text`.

</details>

### Low-stock label

Enter the low-stock label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

[quantity] is replaced only by actual tracked inventory.

Default: `[quantity] available`.

<details><summary>Reference for connected builders</summary>

Setting: `low_stock_text`. Type: `text`.

</details>

### Invalid variant label

Enter the invalid variant label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Unavailable`.

<details><summary>Reference for connected builders</summary>

Setting: `unavailable_text`. Type: `text`.

</details>

## Badges

### Number of badges

Drag the control to adjust number of badges. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 1 to 8 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_count`. Type: `range`.

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Inline, Grid, Cards, Minimal.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`inline`, `grid`, `cards`, `minimal`

</details>

### Desktop columns

Choose one of the supported options below for desktop columns. Only the selected option applies; other settings can further customize its appearance.

Default: `4`.

Options: 1 column, 2 columns, 3 columns, 4 columns.

<details><summary>Reference for connected builders</summary>

Setting: `desktop_columns`. Type: `select`.

`1`, `2`, `3`, `4`

</details>

### Mobile columns

Choose one of the supported options below for mobile columns. Only the selected option applies; other settings can further customize its appearance.

Default: `1`.

Options: 1 column, 2 columns.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_columns`. Type: `select`.

`1`, `2`

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

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Gap

Drag the control to adjust gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

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

### Icon size

Drag the control to adjust icon size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `52`.

Range: 32 to 96 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `icon_size`. Type: `range`.

</details>

### Image size

Drag the control to adjust image size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `44`.

Range: 24 to 96 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `image_size`. Type: `range`.

</details>

## Badge 1

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_1_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_1_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_1_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_1_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_1_text`. Type: `richtext`.

</details>

## Badge 2

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_2_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_2_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_2_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_2_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_2_text`. Type: `richtext`.

</details>

## Badge 3

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_3_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_3_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_3_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_3_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_3_text`. Type: `richtext`.

</details>

## Badge 4

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_4_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_4_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_4_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_4_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_4_text`. Type: `richtext`.

</details>

## Badge 5

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_5_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_5_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_5_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_5_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_5_text`. Type: `richtext`.

</details>

## Badge 6

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_6_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_6_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_6_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_6_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_6_text`. Type: `richtext`.

</details>

## Badge 7

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_7_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_7_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_7_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_7_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_7_text`. Type: `richtext`.

</details>

## Badge 8

### Icon

Enter the icon. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_8_icon`. Type: `text`.

</details>

### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `badge_8_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_8_image_alt`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_8_heading`. Type: `text`.

</details>

### Text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `badge_8_text`. Type: `richtext`.

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

### Icon color

Choose a color for icon color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_color`. Type: `color`.

</details>

### Icon background

Choose a color for icon background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f4f4f4`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_background_color`. Type: `color`.

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

## File reference

`blocks/product-inventory-status.liquid`
