# Main product master

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Legacy product composition layout. Use the current product templates for new product pages.
2. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Main product master.
3. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
4. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
5. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Product layout

### Layout mode

Choose one of the supported options below for layout mode. Only the selected option applies; other settings can further customize its appearance.

Default: `classic`.

Options: Classic, Classic reverse, Stacked, Stacked: summary top, Media focus, Scroll gallery left, Scroll gallery right, Service mode.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode`. Type: `select`.

`classic`, `classic_reverse`, `stacked`, `stacked_summary_top`, `media_focus`, `scroll_gallery_left`, `scroll_gallery_right`, `service_mode`

</details>

### Enable sticky summary (desktop)

Turn on “Enable sticky summary (desktop)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_sticky_summary`. Type: `checkbox`.

</details>

## Below the fold

### Below-the-fold layout

Choose one of the supported options below for below-the-fold layout. Only the selected option applies; other settings can further customize its appearance.

Default: `sectionized`.

Options: Sectionized (stacked), Tabbed (no JS), Disabled.

<details><summary>Reference for connected builders</summary>

Setting: `below_fold_layout`. Type: `select`.

`sectionized`, `tabbed`, `disabled`

</details>

## Sticky content and thumbnails

### Desktop sticky target

Choose one of the supported options below for desktop sticky target. Only the selected option applies; other settings can further customize its appearance.

Default: `summary`.

Options: Sticky: summary, Sticky: media, Sticky: none.

<details><summary>Reference for connected builders</summary>

Setting: `desktop_sticky_target`. Type: `select`.

`summary`, `media`, `none`

</details>

### Thumbnails placement (desktop)

Choose one of the supported options below for thumbnails placement (desktop). Only the selected option applies; other settings can further customize its appearance.

Default: `below`.

Options: Below, Above, Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `thumb_placement_desktop`. Type: `select`.

`below`, `above`, `left`, `right`

</details>

### Thumbnails placement (mobile)

Choose one of the supported options below for thumbnails placement (mobile). Only the selected option applies; other settings can further customize its appearance.

Default: `below`.

Options: Below, Above, Hidden.

<details><summary>Reference for connected builders</summary>

Setting: `thumb_placement_mobile`. Type: `select`.

`below`, `above`, `hidden`

</details>

### Show vendor

Turn on “Show vendor” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_vendor`. Type: `checkbox`.

</details>

### Show availability

Turn on “Show availability” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_inventory`. Type: `checkbox`.

</details>

## Media gallery

### Media limit

Drag the control to adjust media limit. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 1 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `media_limit`. Type: `range`.

</details>

### Thumbnail size

Choose one of the supported options below for thumbnail size. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `thumb_size`. Type: `select`.

`sm`, `md`, `lg`

</details>

## Container

### Max width

Choose one of the supported options below for max width. Only the selected option applies; other settings can further customize its appearance.

Default: `xl`.

Options: Small, Medium, Large, Extra large, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`sm`, `md`, `lg`, `xl`, `full`

</details>

### Vertical padding

Choose one of the supported options below for vertical padding. Only the selected option applies; other settings can further customize its appearance.

Default: `lg`.

Options: None, Small, Medium, Large, Extra large.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `select`.

`none`, `sm`, `md`, `lg`, `xl`

</details>

### Horizontal padding

Choose one of the supported options below for horizontal padding. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: None, Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `select`.

`none`, `sm`, `md`, `lg`

</details>

## Accessibility

### Section aria-label

Enter the section aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product details`.

<details><summary>Reference for connected builders</summary>

Setting: `section_aria_label`. Type: `text`.

</details>

### Media aria-label

Enter the media aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product media`.

<details><summary>Reference for connected builders</summary>

Setting: `media_aria_label`. Type: `text`.

</details>

### Summary aria-label

Enter the summary aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product summary`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_aria_label`. Type: `text`.

</details>

## Colors (inherit by default)

### Use custom colors (override theme tokens)

Turn on “Use custom colors (override theme tokens)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e6e6e6`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `button_bg`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `button_text`. Type: `color`.

</details>

### Button border

Choose a color for button border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `button_border`. Type: `color`.

</details>

### Button background hover

Choose a color for button background hover. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `button_bg_hover`. Type: `color`.

</details>

### Button text hover

Choose a color for button text hover. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `button_text_hover`. Type: `color`.

</details>

### Button border hover

Choose a color for button border hover. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `button_border_hover`. Type: `color`.

</details>

## Typography (override theme)

### Title font size (px)

Drag the control to adjust title font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 24 to 64 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_size`. Type: `range`.

</details>

### Price font size (px)

Drag the control to adjust price font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `22`.

Range: 16 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `price_size`. Type: `range`.

</details>

### Form label font size (px)

Drag the control to adjust form label font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 11 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `label_size`. Type: `range`.

</details>

### Button font size (px)

Drag the control to adjust button font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_size`. Type: `range`.

</details>

## Blocks you can add

### Custom Liquid

#### Custom Liquid

Advanced: add trusted Liquid or HTML only when native settings cannot meet the need. Work in a duplicated unpublished theme. Do not paste credentials, untrusted scripts, or a second product form inside purchase controls.

<details><summary>Reference for connected builders</summary>

Setting: `liquid`. Type: `liquid`.

</details>

### Metafield block

#### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `More details`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

#### Namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `namespace`. Type: `text`.

</details>

#### Key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `pdp_highlights`.

<details><summary>Reference for connected builders</summary>

Setting: `key`. Type: `text`.

</details>

#### Render mode

Choose one of the supported options below for render mode. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (metafield_tag), Raw value.

<details><summary>Reference for connected builders</summary>

Setting: `render_mode`. Type: `select`.

`auto`, `raw`

</details>

#### Hide if blank

Turn on “Hide if blank” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_if_blank`. Type: `checkbox`.

</details>

#### Empty text (optional)

Enter the empty text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `empty_text`. Type: `text`.

</details>

### @app

Select a compatible installed app. The app provides its settings and service.

## File reference

`sections/main-product-master.liquid`
