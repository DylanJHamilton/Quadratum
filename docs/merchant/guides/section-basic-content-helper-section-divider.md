# Section divider

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Section divider.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Content

### Variant

Choose one of the supported options below for variant. Only the selected option applies; other settings can further customize its appearance.

Default: `divider_with_label`.

Options: Divider only, Divider with label, Section chapter.

<details><summary>Reference for connected builders</summary>

Setting: `variant`. Type: `select`.

`divider_only`, `divider_with_label`, `section_chapter`

</details>

### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Next Section`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

### Subtitle (chapter only)

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>A quick break before what’s next.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `richtext`.

</details>

### Anchor ID

Enter the anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Optional unique page anchor. Blank or section-divider uses this section’s unique ID. Use a different custom value for each divider.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

### Show icon

Turn on “Show icon” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_icon`. Type: `checkbox`.

</details>

### Icon name

Enter the icon name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Lucide icon name, for example sparkle, star or check. Uses the theme’s existing icon sprite.

Default: `sparkle`.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `text`.

</details>

## Line and layout

### Line alignment

Choose one of the supported options below for line alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Center, Left, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `line_alignment`. Type: `select`.

`center`, `left`, `full_width`

</details>

### Line style

Choose one of the supported options below for line style. Only the selected option applies; other settings can further customize its appearance.

Default: `soft`.

Options: Solid, Soft, Dotted, Dashed.

<details><summary>Reference for connected builders</summary>

Setting: `line_style`. Type: `select`.

`solid`, `soft`, `dotted`, `dashed`

</details>

### Line thickness

Choose one of the supported options below for line thickness. Only the selected option applies; other settings can further customize its appearance.

Default: `hairline`.

Options: Hairline, Normal, Strong.

<details><summary>Reference for connected builders</summary>

Setting: `line_thickness`. Type: `select`.

`hairline`, `normal`, `strong`

</details>

## Spacing (token-mapped)

### Space above

Choose one of the supported options below for space above. Only the selected option applies; other settings can further customize its appearance.

Default: `medium`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `space_above`. Type: `select`.

`small`, `medium`, `large`

</details>

### Space below

Choose one of the supported options below for space below. Only the selected option applies; other settings can further customize its appearance.

Default: `medium`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `space_below`. Type: `select`.

`small`, `medium`, `large`

</details>

## Layout primitives

### Max width

Choose one of the supported options below for max width. Only the selected option applies; other settings can further customize its appearance.

Default: `standard`.

Options: Narrow, Standard, Wide, Full.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`narrow`, `standard`, `wide`, `full`

</details>

### Side padding

Choose one of the supported options below for side padding. Only the selected option applies; other settings can further customize its appearance.

Default: `normal`.

Options: Tight, Normal, Roomy.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `select`.

`tight`, `normal`, `roomy`

</details>

## Visual context

### Use alternate background (chapter only)

Turn on “Use alternate background (chapter only)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_alt_background`. Type: `checkbox`.

</details>

## Colors

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#4b5563`.

<details><summary>Reference for connected builders</summary>

Setting: `muted_text_color`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

### Line / border

Choose a color for line / border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `surface_color`. Type: `color`.

</details>

## File reference

`sections/basic-content-helper-section-divider.liquid`
