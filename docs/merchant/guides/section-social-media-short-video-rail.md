# Social media – videos

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media – videos.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Merchant-curated content and native links unless an explicit provider embed is configured. The theme does not fetch social posts, authorize accounts, verify claims or implement feed synchronization. Future feed/playlist choices are retained configuration placeholders, not connected integrations.

## Visibility

### Show this section

Turn on “Show this section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Social video highlights`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `See what we’re posting in short form`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Write the description. Keep paragraphs short and preview long text on mobile.

Default: `Showcase your latest Reels, TikToks, and YouTube Shorts to build trust and community.`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `align`. Type: `select`.

`left`, `center`

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `rail`.

Options: Horizontal scroll rail, Grid layout.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`rail`, `grid`

</details>

### Max videos to show

Drag the control to adjust max videos to show. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 1 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_items`. Type: `range`.

</details>

### Video aspect ratio

Choose one of the supported options below for video aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `9:16`.

Options: Vertical (reels / TikTok), Portrait (4:5), Square (1:1), Wide (16:9).

<details><summary>Reference for connected builders</summary>

Setting: `aspect_ratio`. Type: `select`.

`9:16`, `4:5`, `1:1`, `16:9`

</details>

### Card style

Choose one of the supported options below for card style. Only the selected option applies; other settings can further customize its appearance.

Default: `plain`.

Options: No card background, Card with background and border.

<details><summary>Reference for connected builders</summary>

Setting: `card_style`. Type: `select`.

`plain`, `elevated`

</details>

### Show video labels

Turn on “Show video labels” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_labels`. Type: `checkbox`.

</details>

### Show video ctas

Turn on “Show video ctas” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_cta`. Type: `checkbox`.

</details>

### ARIA label for section

Enter the aria label for section. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Short-form social video gallery`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Spacing and style

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `default`.

Options: Default, Contrast, Subtle.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`default`, `contrast`, `subtle`

</details>

### Gap (px)

Drag the control to adjust gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Rail card width (px)

Drag the control to adjust rail card width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `280`.

Range: 200 to 420 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `rail_card_width`. Type: `range`.

</details>

### Grid columns (mobile)

Choose one of the supported options below for grid columns (mobile). Only the selected option applies; other settings can further customize its appearance.

Default: `2`.

Options: 1, 2.

<details><summary>Reference for connected builders</summary>

Setting: `grid_cols_mobile`. Type: `select`.

`1`, `2`

</details>

### Grid columns (desktop)

Choose one of the supported options below for grid columns (desktop). Only the selected option applies; other settings can further customize its appearance.

Default: `3`.

Options: 2, 3, 4.

<details><summary>Reference for connected builders</summary>

Setting: `grid_cols_desktop`. Type: `select`.

`2`, `3`, `4`

</details>

### Section padding top (px)

Drag the control to adjust section padding top (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `section_padding_top`. Type: `range`.

</details>

### Section padding bottom (px)

Drag the control to adjust section padding bottom (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `section_padding_bottom`. Type: `range`.

</details>

## Blocks you can add

### Video

#### Platform

Choose one of the supported options below for platform. Only the selected option applies; other settings can further customize its appearance.

Default: `instagram`.

Options: Instagram, TikTok, YouTube, Facebook, Pinterest, Other / generic.

<details><summary>Reference for connected builders</summary>

Setting: `platform`. Type: `select`.

`instagram`, `tiktok`, `youtube`, `facebook`, `pinterest`, `other`

</details>

#### Video embed URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `video_url`. Type: `url`.

</details>

#### Label (optional)

Enter the label (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Short video`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Button label (optional)

Enter the button label (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Watch now`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

#### Open CTA in new tab

Turn on “Open CTA in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

#### ARIA label (optional)

Enter the aria label (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Open social video in a new tab`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## File reference

`sections/social-media-short-video-rail.liquid`
