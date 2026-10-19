# Column builder

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Column builder.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Layout

### Columns (desktop)

Drag the control to adjust columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Columns (tablet)

Drag the control to adjust columns (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_tablet`. Type: `range`.

</details>

### Columns (mobile)

Drag the control to adjust columns (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_mobile`. Type: `range`.

</details>

## Section header

### Region label (accessibility)

Enter the region label (accessibility). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Column builder`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

### Anchor id

Enter the anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Column Builder`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subtitle

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Build feature tiles in a clean, responsive grid—designer-safe and fast.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `richtext`.

</details>

## Controlled styles

### Style

Choose one of the supported options below for style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card (border + shadow), Soft (surface + shadow), Bare (no card).

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`card`, `soft`, `bare`

</details>

### Image ratio

Choose one of the supported options below for image ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `ratio_16_9`.

Options: 16:9, 4:3, 1:1, Natural.

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `select`.

`ratio_16_9`, `ratio_4_3`, `ratio_1_1`, `ratio_natural`

</details>

### Image max height

Choose one of the supported options below for image max height. Only the selected option applies; other settings can further customize its appearance.

Default: `360px`.

Options: Small, Medium, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `media_max_h`. Type: `select`.

`240px`, `300px`, `360px`, `440px`

</details>

### Image fit

Choose one of the supported options below for image fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `media_fit`. Type: `select`.

`cover`, `contain`

</details>

### Image radius

Choose one of the supported options below for image radius. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-radius-md)`.

Options: None, Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `media_radius`. Type: `select`.

`0px`, `var(--q-radius-sm)`, `var(--q-radius-md)`, `var(--q-radius-lg)`

</details>

## Standard controls

### Max width

Drag the control to adjust max width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 720 to 1600 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Vertical padding

Choose one of the supported options below for vertical padding. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-10)`.

Options: Small, Medium, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `select`.

`var(--q-space-6)`, `var(--q-space-8)`, `var(--q-space-10)`, `var(--q-space-12)`

</details>

### Horizontal padding

Choose one of the supported options below for horizontal padding. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-6)`.

Options: Tight, Comfortable, Spacious.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `select`.

`var(--q-space-4)`, `var(--q-space-6)`, `var(--q-space-8)`

</details>

### Background surface

Choose one of the supported options below for background surface. Only the selected option applies; other settings can further customize its appearance.

Default: `transparent`.

Options: Surface, Surface 2, Surface 3, Transparent.

<details><summary>Reference for connected builders</summary>

Setting: `surface`. Type: `select`.

`var(--q-surface)`, `var(--q-surface-2)`, `var(--q-surface-3)`, `transparent`

</details>

## Design system

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `text_align`. Type: `select`.

`left`, `center`

</details>

### Spacing between tiles

Choose one of the supported options below for spacing between tiles. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-8)`.

Options: Tight, Comfortable, Spacious, Extra spacious.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `select`.

`var(--q-space-4)`, `var(--q-space-6)`, `var(--q-space-8)`, `var(--q-space-10)`

</details>

### Tile padding

Choose one of the supported options below for tile padding. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-8)`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `tile_pad`. Type: `select`.

`var(--q-space-6)`, `var(--q-space-8)`, `var(--q-space-10)`

</details>

### Spacing inside tile

Choose one of the supported options below for spacing inside tile. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-5)`.

Options: Tight, Comfortable, Spacious, Extra spacious.

<details><summary>Reference for connected builders</summary>

Setting: `tile_inner_gap`. Type: `select`.

`var(--q-space-3)`, `var(--q-space-4)`, `var(--q-space-5)`, `var(--q-space-6)`

</details>

## Tile styling

### Tile background

Choose one of the supported options below for tile background. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-surface-2)`.

Options: Surface, Surface 2, Surface 3, Transparent.

<details><summary>Reference for connected builders</summary>

Setting: `tile_surface`. Type: `select`.

`var(--q-surface)`, `var(--q-surface-2)`, `var(--q-surface-3)`, `transparent`

</details>

### Border width

Choose one of the supported options below for border width. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-border-width)`.

Options: None, Default, Thick.

<details><summary>Reference for connected builders</summary>

Setting: `tile_border_width`. Type: `select`.

`0px`, `var(--q-border-width)`, `var(--q-border-width-2)`

</details>

### Border color

Choose one of the supported options below for border color. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-border)`.

Options: Default, Strong, Muted.

<details><summary>Reference for connected builders</summary>

Setting: `tile_border_color`. Type: `select`.

`var(--q-border)`, `var(--q-border-strong)`, `var(--q-border-muted)`

</details>

### Radius

Choose one of the supported options below for radius. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-radius-lg)`.

Options: Medium, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `tile_radius`. Type: `select`.

`var(--q-radius-md)`, `var(--q-radius-lg)`, `var(--q-radius-xl)`

</details>

### Shadow

Choose one of the supported options below for shadow. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-shadow-1)`.

Options: None, Subtle, Medium, Strong.

<details><summary>Reference for connected builders</summary>

Setting: `tile_shadow`. Type: `select`.

`none`, `var(--q-shadow-1)`, `var(--q-shadow-2)`, `var(--q-shadow-3)`

</details>

## Type defaults

### Icon size

Choose one of the supported options below for icon size. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-font-size-xl)`.

Options: Large, XL, 2XL.

<details><summary>Reference for connected builders</summary>

Setting: `icon_size`. Type: `select`.

`var(--q-font-size-lg)`, `var(--q-font-size-xl)`, `var(--q-font-size-2xl)`

</details>

### Icon color

Choose a color for icon color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#10b981`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_color`. Type: `color`.

</details>

### Title color

Choose a color for title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `title_color`. Type: `color`.

</details>

### Body color

Choose a color for body color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#4b5563`.

<details><summary>Reference for connected builders</summary>

Setting: `body_color`. Type: `color`.

</details>

## Button defaults

### Link color

Choose a color for link color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `link_color`. Type: `color`.

</details>

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_fg`. Type: `color`.

</details>

### Button border

Choose a color for button border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_border`. Type: `color`.

</details>

### Button radius

Choose one of the supported options below for button radius. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-radius-md)`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `btn_radius`. Type: `select`.

`var(--q-radius-sm)`, `var(--q-radius-md)`, `var(--q-radius-lg)`

</details>

### Button padding (Y)

Choose one of the supported options below for button padding (y). Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-3)`.

Options: Tight, Comfortable, Spacious.

<details><summary>Reference for connected builders</summary>

Setting: `btn_pad_y`. Type: `select`.

`var(--q-space-2)`, `var(--q-space-3)`, `var(--q-space-4)`

</details>

### Button padding (X)

Choose one of the supported options below for button padding (x). Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-space-5)`.

Options: Tight, Comfortable, Spacious.

<details><summary>Reference for connected builders</summary>

Setting: `btn_pad_x`. Type: `select`.

`var(--q-space-4)`, `var(--q-space-5)`, `var(--q-space-6)`

</details>

## Button hover + motion

### Hover background

Choose a color for hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1d4ed8`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_hover_bg`. Type: `color`.

</details>

### Hover text

Choose a color for hover text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_hover_fg`. Type: `color`.

</details>

### Hover border

Choose a color for hover border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1d4ed8`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_hover_border`. Type: `color`.

</details>

### Hover lift

Choose one of the supported options below for hover lift. Only the selected option applies; other settings can further customize its appearance.

Default: `2px`.

Options: None, Subtle, Standard, Strong.

<details><summary>Reference for connected builders</summary>

Setting: `btn_hover_lift`. Type: `select`.

`0px`, `1px`, `2px`, `3px`

</details>

### Transition speed

Choose one of the supported options below for transition speed. Only the selected option applies; other settings can further customize its appearance.

Default: `160ms`.

Options: None, Fast, Standard, Smooth.

<details><summary>Reference for connected builders</summary>

Setting: `btn_transition`. Type: `select`.

`0ms`, `120ms`, `160ms`, `220ms`

</details>

### Hover shadow

Choose one of the supported options below for hover shadow. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-shadow-2)`.

Options: None, Subtle, Medium, Strong.

<details><summary>Reference for connected builders</summary>

Setting: `btn_hover_shadow`. Type: `select`.

`none`, `var(--q-shadow-1)`, `var(--q-shadow-2)`, `var(--q-shadow-3)`

</details>

## Custom colors (optional)

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

Setting: `custom_bg`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_text`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_muted`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_accent`. Type: `color`.

</details>

## Blocks you can add

### Tile

#### Icon (optional)

Choose one of the supported options below for icon (optional). Only the selected option applies; other settings can further customize its appearance.

Default: ``.

Options: None, Check, Star, Shield, Bolt, Truck, Clock, Phone.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `select`.

``, `check`, `star`, `shield`, `bolt`, `truck`, `clock`, `phone`

</details>

#### Icon color

Choose a color for icon color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#10b981`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_color`. Type: `color`.

</details>

#### Image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Tile title`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Title size

Choose one of the supported options below for title size. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-font-size-lg)`.

Options: Base, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `title_size`. Type: `select`.

`var(--q-font-size-base)`, `var(--q-font-size-lg)`, `var(--q-font-size-xl)`

</details>

#### Title color

Choose a color for title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `title_color`. Type: `color`.

</details>

#### Body

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Short supporting copy that stays readable on every breakpoint.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

#### Body size

Choose one of the supported options below for body size. Only the selected option applies; other settings can further customize its appearance.

Default: `var(--q-font-size-base)`.

Options: Small, Base, Large.

<details><summary>Reference for connected builders</summary>

Setting: `body_size`. Type: `select`.

`var(--q-font-size-sm)`, `var(--q-font-size-base)`, `var(--q-font-size-lg)`

</details>

#### Body color

Choose a color for body color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#4b5563`.

<details><summary>Reference for connected builders</summary>

Setting: `body_color`. Type: `color`.

</details>

#### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `link`.

Options: Text link, Button.

<details><summary>Reference for connected builders</summary>

Setting: `cta_style`. Type: `select`.

`link`, `button`

</details>

#### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid, Outline.

<details><summary>Reference for connected builders</summary>

Setting: `button_style`. Type: `select`.

`solid`, `outline`

</details>

#### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

#### Button URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta_url`. Type: `url`.

</details>

## File reference

`sections/basic-content-helper-column-builder.liquid`
