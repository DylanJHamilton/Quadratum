# User interface

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and User interface.
2. Choose a design kit and button style, then set container widths, shared gaps, and section padding. Start with the defaults and change one scale at a time.
3. Top and bottom section padding combine with the neighboring section. Reduce one side when two large gaps meet; keep useful separation between distinct sections.
4. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
5. Preview a home, product, collection, and cart page before saving shared changes.

## Buttons

### Default button variant

Choose one of the supported options below for default button variant. Only the selected option applies; other settings can further customize its appearance.

Used by buttons set to inherit and the shared button class. Explicit section button styles take priority.

Default: `solid`.

Options: Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_variant_default`. Type: `select`.

`solid`, `outline`, `ghost`

</details>

### Button radius (px)

Drag the control to adjust button radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_radius`. Type: `range`.

</details>

### Button border width (px)

Drag the control to adjust button border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_border_width`. Type: `range`.

</details>

### Hover opacity

Drag the control to adjust hover opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `92`.

Range: 60 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_hover_opacity`. Type: `range`.

</details>

### Pressed scale (×100)

Drag the control to adjust pressed scale (×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `98`.

Range: 95 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_active_scale`. Type: `range`.

</details>

## Chips / badges

### Chip/badge shape

Choose one of the supported options below for chip/badge shape. Only the selected option applies; other settings can further customize its appearance.

Default: `pill`.

Options: Rounded, Pill, Square.

<details><summary>Reference for connected builders</summary>

Setting: `chip_shape`. Type: `select`.

`rounded`, `pill`, `square`

</details>

## Layout settings

### Design kit

Choose one of the supported options below for design kit. Only the selected option applies; other settings can further customize its appearance.

Default content width. Sections with explicit width modes retain priority.

Default: `comfort`.

Options: Cozy (1088px), Comfort (1152px), Wide (1440px), Full width.

<details><summary>Reference for connected builders</summary>

Setting: `style_kit`. Type: `select`.

`cozy`, `comfort`, `wide`, `full`

</details>

### Container sm (px)

Drag the control to adjust container sm (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `720`.

Range: 640 to 960 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `container_sm`. Type: `range`.

</details>

### Container md (px)

Drag the control to adjust container md (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `960`.

Range: 880 to 1200 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `container_md`. Type: `range`.

</details>

### Container lg (px)

Drag the control to adjust container lg (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1152`.

Range: 1088 to 1440 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `container_lg`. Type: `range`.

</details>

### Container xl (px)

Drag the control to adjust container xl (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1440`.

Range: 1280 to 1680 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `container_xl`. Type: `range`.

</details>

### Small spacing

Drag the control to adjust small spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Shared theme spacing. Sections with explicit spacing controls keep their own values.

Default: `12`.

Range: 8 to 20 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `space_sm`. Type: `range`.

</details>

### Medium spacing

Drag the control to adjust medium spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Shared theme spacing. Sections with explicit spacing controls keep their own values.

Default: `16`.

Range: 12 to 28 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `space_md`. Type: `range`.

</details>

### Large spacing

Drag the control to adjust large spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Shared theme spacing. Sections with explicit spacing controls keep their own values.

Default: `24`.

Range: 16 to 40 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `space_lg`. Type: `range`.

</details>

### Default section top spacing

Drag the control to adjust default section top spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Shared theme spacing. Sections with explicit spacing controls keep their own values.

Default: `48`.

Range: 0 to 96 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `section_padding_top`. Type: `range`.

</details>

### Default section bottom spacing

Drag the control to adjust default section bottom spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Shared theme spacing. Sections with explicit spacing controls keep their own values.

Default: `48`.

Range: 0 to 96 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `section_padding_bottom`. Type: `range`.

</details>

## File reference

`config/settings_schema.json`
