# Code / custom Liquid

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open a compatible section or parent block in the theme editor, select Add block, and choose Code / custom Liquid. The parent controls its available space and overall layout.
2. Configure the block’s content first, then its presentation. Drag the block in its parent to change its position.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Compatible sections: Block section, Product block section.

## Code

### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

All modes use the native Shopify Custom Liquid field. This choice supplies editor guidance; Embed also bounds embedded media.

Default: `html`.

Options: HTML, Liquid, Embed.

<details><summary>Reference for connected builders</summary>

Setting: `code_mode`. Type: `select`.

`html`, `liquid`, `embed`

</details>

### Custom code

Advanced: add trusted Liquid or HTML only when native settings cannot meet the need. Work in a duplicated unpublished theme. Do not paste credentials, untrusted scripts, or a second product form inside purchase controls.

Default: `<div>Custom content goes here.</div>`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_code`. Type: `liquid`.

</details>

### Fallback message

Enter the fallback message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add custom code, Liquid, or embed content here.`.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_message`. Type: `text`.

</details>

### Contain overflow

Turn on “Contain overflow” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `contain_overflow`. Type: `checkbox`.

</details>

### Show editor warning

Turn on “Show editor warning” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_warning`. Type: `checkbox`.

</details>

### Warning text

Enter the warning text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Custom code can affect layout, performance, and theme behavior.`.

<details><summary>Reference for connected builders</summary>

Setting: `warning_text`. Type: `text`.

</details>

### Max width

Drag the control to adjust max width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 320 to 1600 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Code area padding

Drag the control to adjust code area padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 80 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `code_padding`. Type: `range`.

</details>

### Code area radius

Drag the control to adjust code area radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 80 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `code_radius`. Type: `range`.

</details>

### Code area border width

Drag the control to adjust code area border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 8 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `code_border_width`. Type: `range`.

</details>

## Code area colors

### Code area background

Choose a color for code area background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `rgba(0,0,0,0)`.

<details><summary>Reference for connected builders</summary>

Setting: `code_background`. Type: `color`.

</details>

### Code area border color

Choose a color for code area border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e5e5`.

<details><summary>Reference for connected builders</summary>

Setting: `code_border_color`. Type: `color`.

</details>

### Code area text color

Choose a color for code area text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `code_text_color`. Type: `color`.

</details>

## Block layout

### Content width

Choose one of the supported options below for content width. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto, Small, Medium, Large, Full, Custom.

<details><summary>Reference for connected builders</summary>

Setting: `content_width`. Type: `select`.

`auto`, `small`, `medium`, `large`, `full`, `custom`

</details>

### Custom content width

Drag the control to adjust custom content width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Used when Content width is Custom.

Default: `720`.

Range: 240 to 1600 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `custom_width`. Type: `range`.

</details>

### Alignment

Choose one of the supported options below for alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Desktop width

Choose one of the supported options below for desktop width. Only the selected option applies; other settings can further customize its appearance.

Default: `100`.

Options: 25%, 50%, 75%, 100%.

<details><summary>Reference for connected builders</summary>

Setting: `desktop_width`. Type: `select`.

`25`, `50`, `75`, `100`

</details>

### Mobile width

Choose one of the supported options below for mobile width. Only the selected option applies; other settings can further customize its appearance.

Default: `100`.

Options: 25%, 50%, 75%, 100%.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_width`. Type: `select`.

`25`, `50`, `75`, `100`

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

### Padding top

Drag the control to adjust padding top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_top`. Type: `range`.

</details>

### Padding bottom

Drag the control to adjust padding bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 160 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_bottom`. Type: `range`.

</details>

### Padding left

Drag the control to adjust padding left. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_left`. Type: `range`.

</details>

### Padding right

Drag the control to adjust padding right. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_right`. Type: `range`.

</details>

## Visibility

### Show on desktop

Turn on “Show on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_desktop`. Type: `checkbox`.

</details>

### Show on tablet

Turn on “Show on tablet” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_tablet`. Type: `checkbox`.

</details>

### Show on mobile

Turn on “Show on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_mobile`. Type: `checkbox`.

</details>

## Animation

### Animation

Choose one of the supported options below for animation. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Fade, Fade up, Fade down, Fade left, Fade right, Zoom.

<details><summary>Reference for connected builders</summary>

Setting: `animation`. Type: `select`.

`none`, `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom`

</details>

## Background

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `rgba(0,0,0,0)`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

### Background gradient

Choose a background fill. Check every foreground label and button against the resulting background.

<details><summary>Reference for connected builders</summary>

Setting: `background_gradient`. Type: `color_background`.

</details>

## Border

### Border width

Drag the control to adjust border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 12 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Border radius

Drag the control to adjust border radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 80 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `border_radius`. Type: `range`.

</details>

## File reference

`blocks/content-code.liquid`
