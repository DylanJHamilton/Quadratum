# Social media - results

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media - results.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 12 blocks can be added.

Merchant-curated content and native links unless an explicit provider embed is configured. The theme does not fetch social posts, authorize accounts, verify claims or implement feed synchronization. Future feed/playlist choices are retained configuration placeholders, not connected integrations.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Real results`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `TikTok before & after showcases`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body text

Write the body text. Keep paragraphs short and preview long text on mobile.

Default: `Showcase real transformations with side-by-side before media and embedded TikTok or Reels content.`.

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

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Before/after side by side, Before on top, after below.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`split`, `stacked`

</details>

### Gap between before and after (px)

Drag the control to adjust gap between before and after (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 48 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_gap`. Type: `range`.

</details>

### Card style

Choose one of the supported options below for card style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Soft surface, Bordered card, Minimal, no background.

<details><summary>Reference for connected builders</summary>

Setting: `card_style`. Type: `select`.

`surface`, `bordered`, `minimal`

</details>

### Media aspect ratio

Choose one of the supported options below for media aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `9:16`.

Options: Square (1:1), Portrait (4:5), Vertical (9:16, TikTok style), Landscape (16:9).

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `select`.

`1:1`, `4:5`, `9:16`, `16:9`

</details>

## Labels and button

### Show before / after labels on cards

Turn on “Show before / after labels on cards” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_before_after_labels`. Type: `checkbox`.

</details>

### Default before label

Enter the default before label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Before`.

<details><summary>Reference for connected builders</summary>

Setting: `before_label_default`. Type: `text`.

</details>

### Default after label

Enter the default after label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `After`.

<details><summary>Reference for connected builders</summary>

Setting: `after_label_default`. Type: `text`.

</details>

### Show platform badge (TikTok / reels / shorts)

Turn on “Show platform badge (TikTok / reels / shorts)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_platform_badge`. Type: `checkbox`.

</details>

### Open button links in new tab

Turn on “Open button links in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_cta_in_new_tab`. Type: `checkbox`.

</details>

## Data source (Quadratum link ready)

### Data source

Choose one of the supported options below for data source. Only the selected option applies; other settings can further customize its appearance.

Manual blocks are implemented. Other choices require an external integration; without one, the section shows setup guidance only in the editor.

Default: `manual`.

Options: Manual items (theme editor), Feed (requires integration).

<details><summary>Reference for connected builders</summary>

Setting: `data_source_mode`. Type: `select`.

`manual`, `feed`

</details>

### Feed handle (for Quadratum link)

Enter the feed handle (for quadratum link). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `before_after_default`.

<details><summary>Reference for connected builders</summary>

Setting: `feed_handle`. Type: `text`.

</details>

### ARIA label for section

Enter the aria label for section. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Before and after showcase`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Before and after item

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Media highlight`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Description

Write the description. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `textarea`.

</details>

### Before media

#### Before media type

Choose one of the supported options below for before media type. Only the selected option applies; other settings can further customize its appearance.

Default: `image`.

Options: Image, Uploaded video.

<details><summary>Reference for connected builders</summary>

Setting: `before_media_type`. Type: `select`.

`image`, `video`

</details>

#### Before image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `before_image`. Type: `image_picker`.

</details>

#### Before image alt text

Enter the before image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Before result`.

<details><summary>Reference for connected builders</summary>

Setting: `before_alt_text`. Type: `text`.

</details>

#### Before video (optional)

Select a video uploaded to Shopify Files. Supply a clear poster image where offered. Leave autoplay off for content that needs sound.

<details><summary>Reference for connected builders</summary>

Setting: `before_video`. Type: `video`.

</details>

#### Override before label

Enter the override before label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `before_label`. Type: `text`.

</details>

### After embed

#### Platform

Choose one of the supported options below for platform. Only the selected option applies; other settings can further customize its appearance.

Default: `tiktok`.

Options: TikTok, Instagram reel, YouTube short, Other embed.

<details><summary>Reference for connected builders</summary>

Setting: `after_platform`. Type: `select`.

`tiktok`, `instagram_reel`, `youtube_short`, `other`

</details>

#### After embed HTML (or URL)

Write the after embed html (or url). Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `after_embed_html`. Type: `textarea`.

</details>

#### Override after label

Enter the override after label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `after_label`. Type: `text`.

</details>

#### ARIA label for embedded video

Enter the aria label for embedded video. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `After result video`.

<details><summary>Reference for connected builders</summary>

Setting: `after_aria_label`. Type: `text`.

</details>

### CTA

#### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

#### CTA URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta_url`. Type: `url`.

</details>

## File reference

`sections/social-media-before-after.liquid`
