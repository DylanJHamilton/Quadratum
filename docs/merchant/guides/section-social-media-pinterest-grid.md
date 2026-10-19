# Social - Pinterest board

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social - Pinterest board.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 16 blocks can be added.

Merchant-curated content and native links unless an explicit provider embed is configured. The theme does not fetch social posts, authorize accounts, verify claims or implement feed synchronization. Future feed/playlist choices are retained configuration placeholders, not connected integrations.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Moodboard`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Pinterest-inspired ideas`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body text

Write the body text. Keep paragraphs short and preview long text on mobile.

Default: `Curate scenes, layouts, and style ideas that inspire your customers.`.

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

Default: `3`.

Range: 2 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Columns on mobile

Choose one of the supported options below for columns on mobile. Only the selected option applies; other settings can further customize its appearance.

Default: `1`.

Options: 1, 2.

<details><summary>Reference for connected builders</summary>

Setting: `columns_mobile`. Type: `select`.

`1`, `2`

</details>

### Gap between pins (px)

Drag the control to adjust gap between pins (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 8 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_gap`. Type: `range`.

</details>

### Card style

Choose one of the supported options below for card style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Soft surface, Bordered, Minimal (no background).

<details><summary>Reference for connected builders</summary>

Setting: `card_style`. Type: `select`.

`surface`, `bordered`, `minimal`

</details>

### Image aspect ratio

Choose one of the supported options below for image aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `2:3`.

Options: Adapt to image, Square (1:1), Portrait (2:3), Portrait (4:5).

<details><summary>Reference for connected builders</summary>

Setting: `image_ratio`. Type: `select`.

`adapt`, `1:1`, `2:3`, `4:5`

</details>

## Display

### Show title

Turn on “Show title” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_title`. Type: `checkbox`.

</details>

### Show short copy

Turn on “Show short copy” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_copy`. Type: `checkbox`.

</details>

### Show Pinterest badge on pin

Turn on “Show Pinterest badge on pin” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_pinterest_badge`. Type: `checkbox`.

</details>

### Show "view on Pinterest" label

Turn on “Show "view on Pinterest" label” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_view_label`. Type: `checkbox`.

</details>

### Open pins in new tab

Turn on “Open pins in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

## Data source (Quadratum link ready)

### Data source

Choose one of the supported options below for data source. Only the selected option applies; other settings can further customize its appearance.

Manual blocks are implemented. Other choices require an external integration; without one, the section shows setup guidance only in the editor.

Default: `manual`.

Options: Manual pins (theme editor), Board feed (requires integration).

<details><summary>Reference for connected builders</summary>

Setting: `data_source_mode`. Type: `select`.

`manual`, `board`

</details>

### Board handle (for Quadratum link)

Enter the board handle (for quadratum link). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `pinterest_board_default`.

<details><summary>Reference for connected builders</summary>

Setting: `board_handle`. Type: `text`.

</details>

### ARIA label for section

Enter the aria label for section. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Pinterest moodboard grid`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Pin

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Idea`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Short line of copy

Write the short line of copy. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `copy`. Type: `textarea`.

</details>

#### View on Pinterest URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `pinterest_url`. Type: `url`.

</details>

#### ARIA label for pin link

Enter the aria label for pin link. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View this idea on Pinterest`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## File reference

`sections/social-media-pinterest-grid.liquid`
