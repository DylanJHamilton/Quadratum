# Social media - profile

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Social media - profile.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 12 blocks can be added.

Profile content and links are manual. Global URLs use Theme Settings → Integrations. No account connection, verification badge or automatic social data is supplied.

## Content

### Avatar image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `avatar`. Type: `image_picker`.

</details>

### Name

Enter the name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `name`. Type: `text`.

</details>

### Role / title

Enter the role / title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `role`. Type: `text`.

</details>

### Short bio

Write the short bio. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `bio`. Type: `textarea`.

</details>

### Use global social urls (theme settings → integrations)

Turn on “Use global social urls (theme settings → integrations)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_global_social_urls`. Type: `checkbox`.

</details>

### Show network labels next to icons

Turn on “Show network labels next to icons” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_labels`. Type: `checkbox`.

</details>

### Icon size (px)

Drag the control to adjust icon size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 14 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `icon_size`. Type: `range`.

</details>

### Icon gap (px)

Drag the control to adjust icon gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 6 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `icon_gap`. Type: `range`.

</details>

## Button (optional)

### Show button

Turn on “Show button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_button`. Type: `checkbox`.

</details>

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Follow`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `button_link`. Type: `url`.

</details>

## Layout

### Alignment

Choose one of the supported options below for alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `align`. Type: `select`.

`left`, `center`

</details>

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Use contrast surface background

Turn on “Use contrast surface background” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_contrast_surface`. Type: `checkbox`.

</details>

### Card padding Y (px)

Drag the control to adjust card padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 12 to 72 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `padding_y`. Type: `range`.

</details>

### Card padding X (px)

Drag the control to adjust card padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 12 to 72 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `padding_x`. Type: `range`.

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

### Social link

#### Network

Choose one of the supported options below for network. Only the selected option applies; other settings can further customize its appearance.

Default: `instagram`.

Options: Facebook, Instagram, TikTok, YouTube, Pinterest, X, Bluesky, LinkedIn, Custom.

<details><summary>Reference for connected builders</summary>

Setting: `network`. Type: `select`.

`facebook`, `instagram`, `tiktok`, `youtube`, `pinterest`, `x`, `bluesky`, `linkedin`, `custom`

</details>

#### Custom label (only if network = custom)

Enter the custom label (only if network = custom). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Website`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_label`. Type: `text`.

</details>

#### Profile URL

Enter the profile url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Enter an http(s) URL or a site path beginning with /.

<details><summary>Reference for connected builders</summary>

Setting: `url`. Type: `text`.

</details>

#### Screen reader label

Enter the screen reader label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

#### Open in new tab

Turn on “Open in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `new_tab`. Type: `checkbox`.

</details>

## File reference

`sections/social-media-profile-card.liquid`
