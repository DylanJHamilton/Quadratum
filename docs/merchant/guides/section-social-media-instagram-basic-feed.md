# Social media · IG grid

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media · IG grid.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 24 blocks can be added.

Merchant-curated content and native links unless an explicit provider embed is configured. The theme does not fetch social posts, authorize accounts, verify claims or implement feed synchronization. Future feed/playlist choices are retained configuration placeholders, not connected integrations.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Instagram gallery`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `See what we’re sharing on Instagram`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body text

Write the body text. Keep paragraphs short and preview long text on mobile.

Default: `Highlight your latest posts, behind-the-scenes moments, and UGC in a simple manual grid.`.

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

### Columns on desktop

Drag the control to adjust columns on desktop. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_columns_desktop`. Type: `range`.

</details>

### Columns on mobile

Drag the control to adjust columns on mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_columns_mobile`. Type: `range`.

</details>

### Grid gap (px)

Drag the control to adjust grid gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 32 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Tile aspect ratio

Choose one of the supported options below for tile aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `1:1`.

Options: Square (1:1), Portrait (4:5), Portrait (3:4), Landscape (16:9).

<details><summary>Reference for connected builders</summary>

Setting: `aspect_ratio`. Type: `select`.

`1:1`, `4:5`, `3:4`, `16:9`

</details>

### Card style

Choose one of the supported options below for card style. Only the selected option applies; other settings can further customize its appearance.

Default: `plain`.

Options: No background, Soft surface, Elevated card.

<details><summary>Reference for connected builders</summary>

Setting: `card_style`. Type: `select`.

`plain`, `soft`, `elevated`

</details>

## Captions and overlay

### Show caption under image

Turn on “Show caption under image” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_captions`. Type: `checkbox`.

</details>

### Caption max lines

Drag the control to adjust caption max lines. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `caption_max_lines`. Type: `range`.

</details>

### Hover overlay mode

Choose one of the supported options below for hover overlay mode. Only the selected option applies; other settings can further customize its appearance.

Default: `scrim`.

Options: None, Scrim (soft overlay), Solid overlay.

<details><summary>Reference for connected builders</summary>

Setting: `hover_overlay_mode`. Type: `select`.

`none`, `scrim`, `solid`

</details>

### Overlay icon

Choose one of the supported options below for overlay icon. Only the selected option applies; other settings can further customize its appearance.

Default: `instagram`.

Options: None, Instagram, Heart, Play.

<details><summary>Reference for connected builders</summary>

Setting: `hover_overlay_icon`. Type: `select`.

`none`, `instagram`, `heart`, `play`

</details>

### Open links in a new tab

Turn on “Open links in a new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

## Data source (Quadratum link ready)

### Data source

Choose one of the supported options below for data source. Only the selected option applies; other settings can further customize its appearance.

Manual blocks are implemented. Other choices require an external integration; without one, the section shows setup guidance only in the editor.

Default: `manual`.

Options: Manual tiles (theme editor), Feed (requires integration).

<details><summary>Reference for connected builders</summary>

Setting: `data_source_mode`. Type: `select`.

`manual`, `feed`

</details>

### Feed handle (for Quadratum link)

Enter the feed handle (for quadratum link). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `instagram_default`.

<details><summary>Reference for connected builders</summary>

Setting: `feed_handle`. Type: `text`.

</details>

### ARIA label for section

Enter the aria label for section. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Instagram style gallery`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Instagram tile

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Instagram gallery image`.

<details><summary>Reference for connected builders</summary>

Setting: `alt_text`. Type: `text`.

</details>

#### Caption

Write the caption. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `caption`. Type: `textarea`.

</details>

#### Link URL (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `link_url`. Type: `url`.

</details>

#### Link ARIA label

Enter the link aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View this post on Instagram`.

<details><summary>Reference for connected builders</summary>

Setting: `link_aria_label`. Type: `text`.

</details>

#### Overlay text (optional)

Enter the overlay text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_label`. Type: `text`.

</details>

## File reference

`sections/social-media-instagram-basic-feed.liquid`
