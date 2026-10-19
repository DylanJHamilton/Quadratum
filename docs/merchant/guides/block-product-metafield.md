# Product metafield

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Product metafield. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Product block section.

## Metafield

### Namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `namespace`. Type: `text`.

</details>

### Key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `details`.

<details><summary>Reference for connected builders</summary>

Setting: `key`. Type: `text`.

</details>

### Show label

Turn on “Show label” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_label`. Type: `checkbox`.

</details>

### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product detail`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

### Show fallback when blank

Turn on “Show fallback when blank” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_fallback`. Type: `checkbox`.

</details>

### Fallback text

Enter the fallback text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Additional product details will appear here when available.`.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_text`. Type: `text`.

</details>

## Display style

### Display style

Choose one of the supported options below for display style. Only the selected option applies; other settings can further customize its appearance.

Default: `text`.

Options: Text, Rich text, Badge, List, Image, File link.

<details><summary>Reference for connected builders</summary>

Setting: `display_style`. Type: `select`.

`text`, `rich_text`, `badge`, `list`, `image`, `file_link`

</details>

### File link label

Enter the file link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Download file`.

<details><summary>Reference for connected builders</summary>

Setting: `file_link_label`. Type: `text`.

</details>

## Typography

### Label size

Drag the control to adjust label size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 32 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `label_size`. Type: `range`.

</details>

### Label size mobile

Drag the control to adjust label size mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 28 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `label_size_mobile`. Type: `range`.

</details>

### Text size

Drag the control to adjust text size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 24 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `text_size`. Type: `range`.

</details>

### Text size mobile

Drag the control to adjust text size mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 22 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `text_size_mobile`. Type: `range`.

</details>

### Badge text size

Drag the control to adjust badge text size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `13`.

Range: 11 to 22 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text_size`. Type: `range`.

</details>

## Image

### Image width

Drag the control to adjust image width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `520`.

Range: 120 to 1200 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `image_width`. Type: `range`.

</details>

### Image radius

Drag the control to adjust image radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 48 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `image_radius`. Type: `range`.

</details>

## Badge

### Badge horizontal padding

Drag the control to adjust badge horizontal padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 8 to 32 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `badge_padding_x`. Type: `range`.

</details>

### Badge vertical padding

Drag the control to adjust badge vertical padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 20 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `badge_padding_y`. Type: `range`.

</details>

### Badge radius

Drag the control to adjust badge radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 60 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `badge_radius`. Type: `range`.

</details>

## List

### List gap

Drag the control to adjust list gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 32 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `list_gap`. Type: `range`.

</details>

### List item radius

Drag the control to adjust list item radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 40 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `list_item_radius`. Type: `range`.

</details>

### List item background

Choose a color for list item background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f7f7f7`.

<details><summary>Reference for connected builders</summary>

Setting: `list_item_background_color`. Type: `color`.

</details>

## File link

### File link height

Drag the control to adjust file link height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `46`.

Range: 36 to 72 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `file_link_height`. Type: `range`.

</details>

### File link radius

Drag the control to adjust file link radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 40 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `file_link_radius`. Type: `range`.

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

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Link / accent color

Choose a color for link / accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `link_color`. Type: `color`.

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

Default: `14`.

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

Default: `8`.

Range: 4 to 40 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `content_gap`. Type: `range`.

</details>

### Card padding

Drag the control to adjust card padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 56 px; step 4.

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

Default: `20`.

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

Options: None, Fade, Fade up, Zoom.

<details><summary>Reference for connected builders</summary>

Setting: `animation_style`. Type: `select`.

`none`, `fade`, `fade_up`, `zoom`

</details>

## File reference

`blocks/product-metafield.liquid`
