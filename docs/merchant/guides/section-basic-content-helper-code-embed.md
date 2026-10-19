# Content embed

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Content embed.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Header content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Optional embed context`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Embedded content`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Use this section to place third-party content inside a frame. Add your provider’s embed code.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `richtext`.

</details>

## Embed

### Embed code

Write the embed code. Keep paragraphs short and preview long text on mobile.

Paste your provider’s iframe, script or HTML. Give iframes a descriptive title. Empty sections hide on the storefront. Provider behavior must be checked after editor reloads.

<details><summary>Reference for connected builders</summary>

Setting: `embed_code`. Type: `textarea`.

</details>

### Embed mode

Choose one of the supported options below for embed mode. Only the selected option applies; other settings can further customize its appearance.

Default: `raw`.

Options: Raw (default), Iframe ratio wrapper.

<details><summary>Reference for connected builders</summary>

Setting: `embed_mode`. Type: `select`.

`raw`, `iframe_ratio`

</details>

### Aspect ratio

Choose one of the supported options below for aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `16_9`.

Options: 16:9, 4:3, 1:1, Custom (%).

<details><summary>Reference for connected builders</summary>

Setting: `aspect_ratio`. Type: `select`.

`16_9`, `4_3`, `1_1`, `custom`

</details>

### Custom ratio (padding-top %)

Drag the control to adjust custom ratio (padding-top %). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `55`.

Range: 25 to 150 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `aspect_ratio_custom`. Type: `range`.

</details>

### Allow horizontal scroll inside frame

Turn on “Allow horizontal scroll inside frame” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `allow_horizontal_scroll`. Type: `checkbox`.

</details>

## Layout and framing

### Max width

Choose one of the supported options below for max width. Only the selected option applies; other settings can further customize its appearance.

Default: `default`.

Options: Narrow, Default, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`narrow`, `default`, `wide`

</details>

### Section padding (Y)

Drag the control to adjust section padding (y). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `56`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Section padding (X)

Drag the control to adjust section padding (x). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 80 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Space between header and embed

Drag the control to adjust space between header and embed. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 60 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap_header`. Type: `range`.

</details>

### Frame style

Choose one of the supported options below for frame style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Minimal, Outline.

<details><summary>Reference for connected builders</summary>

Setting: `frame_style`. Type: `select`.

`card`, `minimal`, `outline`

</details>

### Frame padding

Drag the control to adjust frame padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 48 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `frame_padding`. Type: `range`.

</details>

### Frame radius

Drag the control to adjust frame radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `frame_radius`. Type: `range`.

</details>

### Show frame border

Turn on “Show frame border” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `frame_border`. Type: `checkbox`.

</details>

### Shadow strength

Drag the control to adjust shadow strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 0 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `frame_shadow_strength`. Type: `range`.

</details>

## Header typography

### Kicker size

Drag the control to adjust kicker size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_size`. Type: `range`.

</details>

### Kicker weight

Choose one of the supported options below for kicker weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: Regular, Medium, Semibold, Bold.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

### Title size

Drag the control to adjust title size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `32`.

Range: 18 to 54 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_size`. Type: `range`.

</details>

### Title weight

Choose one of the supported options below for title weight. Only the selected option applies; other settings can further customize its appearance.

Default: `700`.

Options: Medium, Semibold, Bold.

<details><summary>Reference for connected builders</summary>

Setting: `title_weight`. Type: `select`.

`500`, `600`, `700`

</details>

### Description size

Drag the control to adjust description size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `desc_size`. Type: `range`.

</details>

## Colors

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Muted text color

Choose a color for muted text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `muted_text_color`. Type: `color`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

### Surface color (frame)

Choose a color for surface color (frame). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `surface_color`. Type: `color`.

</details>

### Border color (frame)

Choose a color for border color (frame). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

## File reference

`sections/basic-content-helper-code-embed.liquid`
