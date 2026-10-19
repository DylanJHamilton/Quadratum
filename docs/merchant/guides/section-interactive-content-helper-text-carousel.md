# Text carousel

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Text carousel.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Content header

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Highlights`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Why customers choose us`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subtitle

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Quick reasons to act, updated anytime.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `richtext`.

</details>

### Show header

Turn on “Show header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_header`. Type: `checkbox`.

</details>

## Layout / motion

### Motion mode

Choose one of the supported options below for motion mode. Only the selected option applies; other settings can further customize its appearance.

Default: `marquee`.

Options: Marquee (continuous ticker), Carousel (engine slides).

<details><summary>Reference for connected builders</summary>

Setting: `motion_mode`. Type: `select`.

`marquee`, `carousel`

</details>

### Marquee speed (seconds per loop)

Drag the control to adjust marquee speed (seconds per loop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 6 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `marquee_speed`. Type: `range`.

</details>

### Marquee direction

Choose one of the supported options below for marquee direction. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `marquee_direction`. Type: `select`.

`left`, `right`

</details>

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `single_line`.

Options: Single line, Card, Badge strip.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`single_line`, `card`, `badge_strip`

</details>

### Alignment

Choose one of the supported options below for alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`

</details>

## Carousel behavior (engine mode)

### Slides per view (desktop)

Drag the control to adjust slides per view (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `slides_desktop`. Type: `range`.

</details>

### Slides per view (tablet)

Drag the control to adjust slides per view (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `slides_tablet`. Type: `range`.

</details>

### Slides per view (mobile)

Drag the control to adjust slides per view (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `slides_mobile`. Type: `range`.

</details>

### Autoplay (carousel mode)

Turn on “Autoplay (carousel mode)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay`. Type: `checkbox`.

</details>

### Autoplay speed (ms)

Drag the control to adjust autoplay speed (ms). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4500`.

Range: 3000 to 8000 ; step 500.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay_speed`. Type: `range`.

</details>

### Loop (carousel mode)

Turn on “Loop (carousel mode)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `loop`. Type: `checkbox`.

</details>

### Pause on hover

Turn on “Pause on hover” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `pause_on_hover`. Type: `checkbox`.

</details>

### Show arrows (carousel mode)

Turn on “Show arrows (carousel mode)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_arrows`. Type: `checkbox`.

</details>

### Show dots (carousel mode)

Turn on “Show dots (carousel mode)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_dots`. Type: `checkbox`.

</details>

## A11y

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Key messages carousel`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

### Announce manual slide changes

Turn on “Announce manual slide changes” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Automatic rotation is not announced.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `announce_changes`. Type: `checkbox`.

</details>

## Layout controls

### Max width

Choose one of the supported options below for max width. Only the selected option applies; other settings can further customize its appearance.

Default: `full`.

Options: Full width, Standard, Narrow.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`full`, `standard`, `narrow`

</details>

### Vertical padding token

Choose one of the supported options below for vertical padding token. Only the selected option applies; other settings can further customize its appearance.

Default: `sm`.

Options: XS, SM, MD, LG.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `select`.

`xs`, `sm`, `md`, `lg`

</details>

### Horizontal padding token

Choose one of the supported options below for horizontal padding token. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: XS, SM, MD, LG.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `select`.

`xs`, `sm`, `md`, `lg`

</details>

## Colors

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#0B1220`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Muted text color

Choose a color for muted text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#CBD5E1`.

<details><summary>Reference for connected builders</summary>

Setting: `muted_text_color`. Type: `color`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FBBF24`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

### Surface color

Choose a color for surface color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `surface_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF1A`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

## Typography

### Label size (px)

Drag the control to adjust label size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `34`.

Range: 14 to 56 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `label_size`. Type: `range`.

</details>

### Label weight

Choose one of the supported options below for label weight. Only the selected option applies; other settings can further customize its appearance.

Default: `800`.

Options: 500, 600, 700, 800.

<details><summary>Reference for connected builders</summary>

Setting: `label_weight`. Type: `select`.

`500`, `600`, `700`, `800`

</details>

### Subtext size (px)

Drag the control to adjust subtext size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 10 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subtext_size`. Type: `range`.

</details>

### Subtext opacity (%)

Drag the control to adjust subtext opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `85`.

Range: 40 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subtext_opacity`. Type: `range`.

</details>

### Meta size (px)

Drag the control to adjust meta size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `meta_size`. Type: `range`.

</details>

### Meta opacity (%)

Drag the control to adjust meta opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `75`.

Range: 40 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `meta_opacity`. Type: `range`.

</details>

### Letter spacing (em)

Drag the control to adjust letter spacing (em). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0.1`.

Range: -0.2 to 0.2 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `letter_spacing`. Type: `range`.

</details>

## Card / badge styling

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card border width (px)

Drag the control to adjust card border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_border_width`. Type: `range`.

</details>

### Card shadow token (advanced)

Enter the card shadow token (advanced). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `text`.

</details>

### Badge radius (px)

Choose one of the supported options below for badge radius (px). Only the selected option applies; other settings can further customize its appearance.

Default: `999`.

Options: Pill (999), Large (24), Medium (16), Small (10), Square (0).

<details><summary>Reference for connected builders</summary>

Setting: `badge_radius`. Type: `select`.

`999`, `24`, `16`, `10`, `0`

</details>

### Badge border width (px)

Drag the control to adjust badge border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_border_width`. Type: `range`.

</details>

### Badge padding Y token

Choose one of the supported options below for badge padding y token. Only the selected option applies; other settings can further customize its appearance.

Default: `xs`.

Options: XS, SM, MD.

<details><summary>Reference for connected builders</summary>

Setting: `badge_pad_y`. Type: `select`.

`xs`, `sm`, `md`

</details>

### Badge padding X token

Choose one of the supported options below for badge padding x token. Only the selected option applies; other settings can further customize its appearance.

Default: `sm`.

Options: XS, SM, MD.

<details><summary>Reference for connected builders</summary>

Setting: `badge_pad_x`. Type: `select`.

`xs`, `sm`, `md`

</details>

## Controls styling (carousel mode)

### Control size (px)

Drag the control to adjust control size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 28 to 72 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `control_size`. Type: `range`.

</details>

### Control radius (px)

Choose one of the supported options below for control radius (px). Only the selected option applies; other settings can further customize its appearance.

Default: `999`.

Options: Pill (999), Large (24), Medium (16), Small (10), Square (0).

<details><summary>Reference for connected builders</summary>

Setting: `control_radius`. Type: `select`.

`999`, `24`, `16`, `10`, `0`

</details>

### Control border width (px)

Drag the control to adjust control border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `control_border_width`. Type: `range`.

</details>

### Dot size (px)

Drag the control to adjust dot size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 6 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `dot_size`. Type: `range`.

</details>

### Dot active scale (%)

Drag the control to adjust dot active scale (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `125`.

Range: 100 to 160 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `dot_active_scale`. Type: `range`.

</details>

## Blocks you can add

### Item

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Your message`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Subtext

Enter the subtext. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `subtext`. Type: `text`.

</details>

#### Meta

Enter the meta. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `meta`. Type: `text`.

</details>

## File reference

`sections/interactive-content-helper-text-carousel.liquid`
