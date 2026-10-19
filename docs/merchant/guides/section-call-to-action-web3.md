# CTA — web3

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose CTA — web3.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Eyebrow

Enter the eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Web3 Ready`.

<details><summary>Reference for connected builders</summary>

Setting: `eyebrow`. Type: `text`.

</details>

### Headline

Enter the headline. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore your community`.

<details><summary>Reference for connected builders</summary>

Setting: `headline`. Type: `text`.

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `Discover your next community experience.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Primary button label

Enter the primary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore`.

<details><summary>Reference for connected builders</summary>

Setting: `primary_label`. Type: `text`.

</details>

### Primary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Link to your destination or wallet service. This theme does not establish a wallet connection.

<details><summary>Reference for connected builders</summary>

Setting: `primary_url`. Type: `url`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn More`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_label`. Type: `text`.

</details>

### Secondary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_url`. Type: `url`.

</details>

### Right-side illustration

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

### Background image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Show wallet icons row

Turn on “Show wallet icons row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_icons`. Type: `checkbox`.

</details>

### Preview connected appearance (editor only)

Turn on “Preview connected appearance (editor only)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `simulate_connected`. Type: `checkbox`.

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `accent`.

Options: Default surface, Accent surface, Dark surface.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`default`, `accent`, `dark`

</details>

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Start, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`start`, `center`

</details>

## Blocks you can add

### Wallet icon

#### Icon library

Choose one of the supported options below for icon library. Only the selected option applies; other settings can further customize its appearance.

Legacy Tabler filled/outline choices use the shared bundled symbol. Custom uploaded SVG assets retain their tint control.

Default: `lucide`.

Options: Lucide (bundled sprite), Tabler (legacy filled selection), Tabler (bundled sprite), Custom uploaded asset.

<details><summary>Reference for connected builders</summary>

Setting: `icon_library`. Type: `select`.

`lucide`, `tabler-filled`, `tabler-outline`, `custom`

</details>

#### Filename (no .svg)

Enter the filename (no .svg). Replace sample wording with your own content; leave optional fields empty when you do not need them.

e.g., wallet, arrow-up, brand-ethereum

<details><summary>Reference for connected builders</summary>

Setting: `icon_filename`. Type: `text`.

</details>

#### Custom relative path

Enter the custom relative path. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Filename of an uploaded theme asset, e.g. custom-logo.svg. For bundled icons use the library controls.

<details><summary>Reference for connected builders</summary>

Setting: `icon_custom_path`. Type: `text`.

</details>

#### Icon color (tint)

Choose a color for icon color (tint). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `icon_color`. Type: `color`.

</details>

#### Inline SVG (overrides file). use currentcolor in your SVG.

Advanced: add trusted HTML. Keep headings, image alternatives, and links accessible. Use a duplicated unpublished theme for code changes.

<details><summary>Reference for connected builders</summary>

Setting: `icon_svg`. Type: `html`.

</details>

#### Alt text / name

Enter the alt text / name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `alt_text`. Type: `text`.

</details>

## File reference

`sections/call-to-action-web3.liquid`
