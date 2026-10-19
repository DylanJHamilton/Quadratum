# Interactive cards engine

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Interactive cards engine.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Header

### Show header

Turn on “Show header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_header`. Type: `checkbox`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Why teams choose us`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Use this engine for features, services, steps, or portfolio tiles — with premium defaults.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

## Design

### Design preset

Choose one of the supported options below for design preset. Only the selected option applies; other settings can further customize its appearance.

Default: `classic`.

Options: Classic, Glass, Bold, Minimal.

<details><summary>Reference for connected builders</summary>

Setting: `design_preset`. Type: `select`.

`classic`, `glass`, `bold`, `minimal`

</details>

### Hover style

Choose one of the supported options below for hover style. Only the selected option applies; other settings can further customize its appearance.

Default: `lift`.

Options: Lift, Glow, None.

<details><summary>Reference for connected builders</summary>

Setting: `hover_style`. Type: `select`.

`lift`, `glow`, `none`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `content_align`. Type: `select`.

`left`, `center`

</details>

### Media aspect ratio (image cards)

Choose one of the supported options below for media aspect ratio (image cards). Only the selected option applies; other settings can further customize its appearance.

Default: `4_3`.

Options: Auto, Square (1:1), Standard (4:3), Wide (16:9).

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `select`.

`auto`, `1_1`, `4_3`, `16_9`

</details>

## Layout

### Layout mode

Choose one of the supported options below for layout mode. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid, Row (scroll rail), Stacked timeline.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode`. Type: `select`.

`grid`, `row`, `stacked_timeline`

</details>

### Card variant

Choose one of the supported options below for card variant. Only the selected option applies; other settings can further customize its appearance.

Default: `icon_card`.

Options: Icon card, Image box, Flip box, Stacked card.

<details><summary>Reference for connected builders</summary>

Setting: `card_variant`. Type: `select`.

`icon_card`, `image_box`, `flip_box`, `stacked_card`

</details>

## Columns (grid/row)

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

Range: 1 to 3 ; step 1.

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

## Behavior

### Equal height cards

Turn on “Equal height cards” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `equal_height_cards`. Type: `checkbox`.

</details>

### Card click behavior

Choose one of the supported options below for card click behavior. Only the selected option applies; other settings can further customize its appearance.

Default: `cta_only`.

Options: CTA only, Whole card if button link exists (no nested links).

<details><summary>Reference for connected builders</summary>

Setting: `card_click_behavior`. Type: `select`.

`cta_only`, `whole_card_if_link`

</details>

### Show row scroll hint (row layout)

Turn on “Show row scroll hint (row layout)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `row_scroll_hint`. Type: `checkbox`.

</details>

## Flip (flip_box)

### Flip trigger

Choose one of the supported options below for flip trigger. Only the selected option applies; other settings can further customize its appearance.

Default: `hover`.

Options: Hover (desktop), Click (accessible toggle).

<details><summary>Reference for connected builders</summary>

Setting: `flip_trigger`. Type: `select`.

`hover`, `click`

</details>

### Mobile fallback

Choose one of the supported options below for mobile fallback. Only the selected option applies; other settings can further customize its appearance.

Default: `stack_back_content`.

Options: Stack back content below (no 3D flip), Enable flip UI (JS toggle).

<details><summary>Reference for connected builders</summary>

Setting: `flip_mobile_fallback`. Type: `select`.

`stack_back_content`, `enable_flip`

</details>

## Timeline (stacked_timeline)

### Show connector line

Turn on “Show connector line” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_show_line`. Type: `checkbox`.

</details>

### Marker style

Choose one of the supported options below for marker style. Only the selected option applies; other settings can further customize its appearance.

Default: `dot`.

Options: Dot, Number (uses step number), Icon (uses icon field).

<details><summary>Reference for connected builders</summary>

Setting: `timeline_marker_style`. Type: `select`.

`dot`, `number`, `icon`

</details>

### Timeline alignment

Choose one of the supported options below for timeline alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_align`. Type: `select`.

`left`, `center`

</details>

## Spacing

### Max width (px)

Drag the control to adjust max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 720 to 1600 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Vertical padding (px)

Drag the control to adjust vertical padding (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 160 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Horizontal padding (px)

Drag the control to adjust horizontal padding (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Gap (px)

Drag the control to adjust gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 8 to 48 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Card padding (px)

Drag the control to adjust card padding (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 12 to 44 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_pad`. Type: `range`.

</details>

## Card styling

### Radius (px)

Drag the control to adjust radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 32 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Shadow strength (0–5)

Drag the control to adjust shadow strength (0–5). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 0 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `range`.

</details>

## Typography

### Title size (px)

Drag the control to adjust title size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 14 to 34 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_fs`. Type: `range`.

</details>

### Title weight

Choose one of the supported options below for title weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: 400, 500, 600, 700.

<details><summary>Reference for connected builders</summary>

Setting: `title_fw`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

### Subtitle size (px)

Drag the control to adjust subtitle size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle_fs`. Type: `range`.

</details>

### Body size (px)

Drag the control to adjust body size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `body_fs`. Type: `range`.

</details>

### Badge size (px)

Drag the control to adjust badge size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 16 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_fs`. Type: `range`.

</details>

### CTA size (px)

Drag the control to adjust cta size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cta_fs`. Type: `range`.

</details>

### CTA weight

Choose one of the supported options below for cta weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: 500, 600, 700.

<details><summary>Reference for connected builders</summary>

Setting: `cta_fw`. Type: `select`.

`500`, `600`, `700`

</details>

## Colors (scoped)

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Section background

Choose a color for section background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `color_bg`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `color_text`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#5b5b5b`.

<details><summary>Reference for connected builders</summary>

Setting: `color_muted`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `color_accent`. Type: `color`.

</details>

### Card surface

Choose a color for card surface. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `color_surface`. Type: `color`.

</details>

### Card border

Choose a color for card border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e8e8e8`.

<details><summary>Reference for connected builders</summary>

Setting: `color_border`. Type: `color`.

</details>

## Blocks you can add

### Card

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fast installation`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Subtitle

Enter the subtitle. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Built for busy teams`.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `text`.

</details>

#### Body

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Ship clean pages faster with a reusable card engine that stays consistent across layouts.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

#### Icon (emoji or short text)

Enter the icon (emoji or short text). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `⚡`.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `text`.

</details>

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Badge

Enter the badge. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Popular`.

<details><summary>Reference for connected builders</summary>

Setting: `badge`. Type: `text`.

</details>

#### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

#### CTA URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta_url`. Type: `url`.

</details>

### Flip (optional)

#### Back title

Enter the back title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `More details`.

<details><summary>Reference for connected builders</summary>

Setting: `back_title`. Type: `text`.

</details>

#### Back body

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Add a short explanation, a second CTA, or extra context without bloating the front card.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `back_body`. Type: `richtext`.

</details>

#### Back button label

Enter the back button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View details`.

<details><summary>Reference for connected builders</summary>

Setting: `back_cta_label`. Type: `text`.

</details>

#### Back CTA URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `back_cta_url`. Type: `url`.

</details>

### Timeline extras

#### Step number

Enter the step number. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `1`.

<details><summary>Reference for connected builders</summary>

Setting: `step_number`. Type: `text`.

</details>

#### Phase label

Enter the phase label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Discovery`.

<details><summary>Reference for connected builders</summary>

Setting: `phase_label`. Type: `text`.

</details>

## File reference

`sections/interactive-content-helper-cards.liquid`
