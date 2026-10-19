# Social media - share link

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media - share link.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 10 blocks can be added.

Native share links open the selected external service or email client. Publishing, login and service availability are controlled by that provider; no posting API or automatic confirmation is supplied.

## Content

### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Share this`.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

### Hide eyebrow and description

Turn on “Hide eyebrow and description” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_text`. Type: `checkbox`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Spread the word`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Write the description. Keep paragraphs short and preview long text on mobile.

Default: `If you found this helpful, share it with your audience.`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

### Show button labels

Turn on “Show button labels” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_labels`. Type: `checkbox`.

</details>

## Share data

### Share title override

Enter the share title override. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `share_title_override`. Type: `text`.

</details>

### Share URL override

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `share_url_override`. Type: `url`.

</details>

### Optional share message (used for X / email)

Write the optional share message (used for x / email). Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `share_message`. Type: `textarea`.

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

### Button row alignment

Choose one of the supported options below for button row alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right, Spread / space-between.

<details><summary>Reference for connected builders</summary>

Setting: `justify`. Type: `select`.

`left`, `center`, `right`, `between`

</details>

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `pill`.

Options: Pill, Soft outline, Bare (icon only, minimal chrome).

<details><summary>Reference for connected builders</summary>

Setting: `style`. Type: `select`.

`pill`, `soft`, `bare`

</details>

### Icon size (px)

Drag the control to adjust icon size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 16 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `icon_size`. Type: `range`.

</details>

### Gap between buttons (px)

Drag the control to adjust gap between buttons (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 4 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Open social networks in a new tab (email always opens in client)

Turn on “Open social networks in a new tab (email always opens in client)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

## Colors

### Icon color

Choose a color for icon color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `icon_color`. Type: `color`.

</details>

### Icon background color

Choose a color for icon background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `icon_bg_color`. Type: `color`.

</details>

### Label text color

Choose a color for label text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `label_color`. Type: `color`.

</details>

## Accessibility

### ARIA label for share navigation

Enter the aria label for share navigation. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Share this page on social media`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Share button

#### Network

Choose one of the supported options below for network. Only the selected option applies; other settings can further customize its appearance.

Default: `facebook`.

Options: Facebook, X (twitter), LinkedIn, Pinterest, Email.

<details><summary>Reference for connected builders</summary>

Setting: `network`. Type: `select`.

`facebook`, `x`, `linkedin`, `pinterest`, `email`

</details>

#### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Screen reader label (optional)

Enter the screen reader label (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `sr_label`. Type: `text`.

</details>

## File reference

`sections/social-media-social-share.liquid`
