# Product size chart

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Product size chart. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Product block section.

## Chart source

### Chart source

Choose one of the supported options below for chart source. Only the selected option applies; other settings can further customize its appearance.

Default: `rich_text`.

Options: Rich text, Image, Table, Product metafield.

<details><summary>Reference for connected builders</summary>

Setting: `chart_source`. Type: `select`.

`rich_text`, `image`, `table`, `metafield`

</details>

### Chart image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `chart_image`. Type: `image_picker`.

</details>

### Rich text chart

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `chart_rich_text`. Type: `richtext`.

</details>

### Metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `metafield_namespace`. Type: `text`.

</details>

### Metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `size_chart`.

<details><summary>Reference for connected builders</summary>

Setting: `metafield_key`. Type: `text`.

</details>

## Table chart

### Column 1 heading

Enter the column 1 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Size`.

<details><summary>Reference for connected builders</summary>

Setting: `table_heading_1`. Type: `text`.

</details>

### Column 2 heading

Enter the column 2 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Chest`.

<details><summary>Reference for connected builders</summary>

Setting: `table_heading_2`. Type: `text`.

</details>

### Column 3 heading

Enter the column 3 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Waist`.

<details><summary>Reference for connected builders</summary>

Setting: `table_heading_3`. Type: `text`.

</details>

### Column 4 heading

Enter the column 4 heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Length`.

<details><summary>Reference for connected builders</summary>

Setting: `table_heading_4`. Type: `text`.

</details>

### Table rows

Write the table rows. Keep paragraphs short and preview long text on mobile.

Use one row per line. Separate columns with \| characters.

<details><summary>Reference for connected builders</summary>

Setting: `table_rows`. Type: `textarea`.

</details>

## Header content

### Show header

Turn on “Show header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_header`. Type: `checkbox`.

</details>

### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fit guide`.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Size chart`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Enter the description. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Use this guide to choose the best size or compare product dimensions.`.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `text`.

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `inline`.

Options: Inline, Modal, Accordion.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`inline`, `modal`, `accordion`

</details>

### Accordion open by default

Turn on “Accordion open by default” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `accordion_open_default`. Type: `checkbox`.

</details>

## Modal

### Modal button label

Enter the modal button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View size chart`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Modal heading

Enter the modal heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Size chart`.

<details><summary>Reference for connected builders</summary>

Setting: `modal_heading`. Type: `text`.

</details>

### Close label

Enter the close label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Close size chart`.

<details><summary>Reference for connected builders</summary>

Setting: `close_label`. Type: `text`.

</details>

### Modal width

Drag the control to adjust modal width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `760`.

Range: 420 to 1200 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `modal_width`. Type: `range`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 20 to 90 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

## Typography

### Heading size

Drag the control to adjust heading size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `30`.

Range: 18 to 56 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `range`.

</details>

### Heading size mobile

Drag the control to adjust heading size mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `26`.

Range: 18 to 44 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size_mobile`. Type: `range`.

</details>

### Modal heading size

Drag the control to adjust modal heading size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `30`.

Range: 18 to 56 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `modal_heading_size`. Type: `range`.

</details>

### Modal heading size mobile

Drag the control to adjust modal heading size mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `26`.

Range: 18 to 44 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `modal_heading_size_mobile`. Type: `range`.

</details>

### Description size

Drag the control to adjust description size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 22 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `description_size`. Type: `range`.

</details>

### Content size

Drag the control to adjust content size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 22 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `content_size`. Type: `range`.

</details>

## Sizing

### Table minimum width

Drag the control to adjust table minimum width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `560`.

Range: 360 to 1000 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `table_min_width`. Type: `range`.

</details>

### Table cell padding

Drag the control to adjust table cell padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 6 to 24 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `table_cell_padding`. Type: `range`.

</details>

### Button height

Drag the control to adjust button height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `46`.

Range: 36 to 72 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `button_height`. Type: `range`.

</details>

### Button radius

Drag the control to adjust button radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 48 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `button_radius`. Type: `range`.

</details>

### Accordion toggle height

Drag the control to adjust accordion toggle height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `58`.

Range: 44 to 84 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `accordion_toggle_height`. Type: `range`.

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

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6f6f6f`.

<details><summary>Reference for connected builders</summary>

Setting: `muted_color`. Type: `color`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

### Card background

Choose a color for card background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `card_background_color`. Type: `color`.

</details>

### Table header background

Choose a color for table header background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f7f7f7`.

<details><summary>Reference for connected builders</summary>

Setting: `table_header_background_color`. Type: `color`.

</details>

### Table row background

Choose a color for table row background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `table_row_background_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

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

### Modal overlay

Choose a color for modal overlay. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Focus color

Choose a color for focus color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `focus_color`. Type: `color`.

</details>

## Border

### Border width

Drag the control to adjust border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 8 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

### Card radius

Drag the control to adjust card radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 48 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

## Container

### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto, Small, Medium, Large, Full.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `select`.

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

## Spacing

### Content gap

Drag the control to adjust content gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 4 to 40 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `content_gap`. Type: `range`.

</details>

### Card padding

Drag the control to adjust card padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 64 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `card_padding`. Type: `range`.

</details>

### Margin top

Drag the control to adjust margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `margin_top`. Type: `range`.

</details>

### Margin bottom

Drag the control to adjust margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

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

## Empty state

### Show empty state

Turn on “Show empty state” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_empty_state`. Type: `checkbox`.

</details>

### Empty state text

Enter the empty state text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add a size chart, fit guide, dimension table, image, or metafield to display this block.`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_text`. Type: `text`.

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

Options: None, Fade, Fade up, Zoom.

<details><summary>Reference for connected builders</summary>

Setting: `animation_style`. Type: `select`.

`none`, `fade`, `fade_up`, `zoom`

</details>

## File reference

`blocks/product-size-chart.liquid`
