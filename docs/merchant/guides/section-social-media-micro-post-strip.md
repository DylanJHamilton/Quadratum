# Social media - micro post

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media - micro post.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 8 blocks can be added.

Manual highlights only; names, handles and timestamps are merchant text, not live or verified posts. Timeline mode requires a separately implemented provider/app integration.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `From our socials`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Recent highlights from X and Bluesky`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body text

Write the body text. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

## Layout

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `strip`.

Options: Horizontal strip (scroll on mobile), Grid (wrap to multiple rows).

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`strip`, `grid`

</details>

### Max columns on desktop

Drag the control to adjust max columns on desktop. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_columns_desktop`. Type: `range`.

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `default`.

Options: Default, Contrast surface, Soft tint.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`default`, `contrast`, `soft`

</details>

## Micro-post chrome

### Show platform badge (icon + label)

Turn on “Show platform badge (icon + label)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_platform_badge`. Type: `checkbox`.

</details>

### Show handle

Turn on “Show handle” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_handle`. Type: `checkbox`.

</details>

### Show timestamp text

Turn on “Show timestamp text” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_timestamp`. Type: `checkbox`.

</details>

### Open micro-post links in new tab

Turn on “Open micro-post links in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_links_in_new_tab`. Type: `checkbox`.

</details>

## Data source

### Data source mode

Choose one of the supported options below for data source mode. Only the selected option applies; other settings can further customize its appearance.

Default: `manual`.

Options: Manual micro-posts (theme editor), External timeline (integration required).

<details><summary>Reference for connected builders</summary>

Setting: `data_source_mode`. Type: `select`.

`manual`, `timeline`

</details>

### Timeline ID (metadata only)

Enter the timeline id (metadata only). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `timeline_id`. Type: `text`.

</details>

### ARIA label for section

Enter the aria label for section. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Micro-post highlight strip from X and Bluesky`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Micro-post

#### Platform

Choose one of the supported options below for platform. Only the selected option applies; other settings can further customize its appearance.

Default: `x`.

Options: X (twitter), Bluesky.

<details><summary>Reference for connected builders</summary>

Setting: `platform`. Type: `select`.

`x`, `bluesky`

</details>

#### Display name

Enter the display name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `display_name`. Type: `text`.

</details>

#### Handle

Enter the handle. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `handle`. Type: `text`.

</details>

#### Post text

Write the post text. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `post_text`. Type: `textarea`.

</details>

#### Timestamp / meta

Enter the timestamp / meta. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `timestamp`. Type: `text`.

</details>

#### Original post URL (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `post_url`. Type: `url`.

</details>

#### Link label

Enter the link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View post`.

<details><summary>Reference for connected builders</summary>

Setting: `link_label`. Type: `text`.

</details>

## File reference

`sections/social-media-micro-post-strip.liquid`
