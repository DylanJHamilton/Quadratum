# Social media - icon row

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media - icon row.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 12 blocks can be added.

Native profile links only. A block URL takes precedence over the matching global social URL. Configure actual profiles; no account connection or live feed is provided.

## Content

### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Connect with us`.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

### Hide heading and description

Turn on “Hide heading and description” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_text`. Type: `checkbox`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Follow us`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Write the description. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

### Show network labels (Facebook, Instagram, etc.)

Turn on “Show network labels (Facebook, Instagram, etc.)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_labels`. Type: `checkbox`.

</details>

## Layout

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `align`. Type: `select`.

`left`, `center`, `right`

</details>

### Icon layout

Choose one of the supported options below for icon layout. Only the selected option applies; other settings can further customize its appearance.

Default: `inline`.

Options: Inline row, Wrapped row.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`inline`, `wrap`

</details>

### Icon alignment

Choose one of the supported options below for icon alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `justify`. Type: `select`.

`flex-start`, `center`, `flex-end`

</details>

### Icon style

Choose one of the supported options below for icon style. Only the selected option applies; other settings can further customize its appearance.

Default: `pill`.

Options: Pill buttons, Soft background, Icons only (no box).

<details><summary>Reference for connected builders</summary>

Setting: `style`. Type: `select`.

`pill`, `soft`, `bare`

</details>

### Icon size (px)

Drag the control to adjust icon size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `22`.

Range: 16 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `icon_size`. Type: `range`.

</details>

### Gap between icons (px)

Drag the control to adjust gap between icons (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 4 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Wrap icons on small screens

Turn on “Wrap icons on small screens” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `wrap_on_mobile`. Type: `checkbox`.

</details>

### Open links in a new tab

Turn on “Open links in a new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

## Accessibility

### Section aria-label

Enter the section aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Social media links`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Social link

#### Network

Choose one of the supported options below for network. Only the selected option applies; other settings can further customize its appearance.

Default: `facebook`.

Options: Facebook, Instagram, TikTok, Twitter / X, YouTube, Pinterest, LinkedIn, Other.

<details><summary>Reference for connected builders</summary>

Setting: `network`. Type: `select`.

`facebook`, `instagram`, `tiktok`, `twitter`, `youtube`, `pinterest`, `linkedin`, `other`

</details>

#### Profile URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `url`. Type: `url`.

</details>

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Screen reader label

Enter the screen reader label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `sr_label`. Type: `text`.

</details>

## File reference

`sections/social-media-social-icons.liquid`
