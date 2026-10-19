# 3rd party - CRM embed

[All documentation](../README.md) · [Support](../SUPPORT.md)

Forms and support.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3rd party - CRM embed.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Merchant-owned provider code runs as supplied. The provider must supply accessible iframe titles, its form/calendar configuration, and any editor reload support. Add an actual configured embed; this wrapper does not submit data or confirm bookings.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Get started today`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Book your call or request a quote`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading / description

Write the subheading / description. Keep paragraphs short and preview long text on mobile.

Default: `Use the form below to request a quote, schedule a call, or take the next step with our team.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Show bullet list

Turn on “Show bullet list” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_bullets`. Type: `checkbox`.

</details>

### Embed type

Choose one of the supported options below for embed type. Only the selected option applies; other settings can further customize its appearance.

Describes this embed for theme integrations. Rendering and behavior are determined by the provider code.

Default: `form`.

Options: Form, Full funnel page.

<details><summary>Reference for connected builders</summary>

Setting: `embed_type`. Type: `select`.

`form`, `funnel`

</details>

### Embed code (form, funnel, or calendar)

Write the embed code (form, funnel, or calendar). Keep paragraphs short and preview long text on mobile.

Paste the full provider HTML/iframe/script snippet. Minimum iframe heights below frame the widget; its script owns resizing and behavior. Test multiple instances and Theme Editor reload with your provider.

<details><summary>Reference for connected builders</summary>

Setting: `embed_code`. Type: `textarea`.

</details>

### Show trust badges / logos

Turn on “Show trust badges / logos” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_trust_row`. Type: `checkbox`.

</details>

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Stacked (content above embed), Split: content + embed side by side.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`stacked`, `split`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `content_align`. Type: `select`.

`left`, `center`

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Surface, Contrast, Brand color.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`surface`, `contrast`, `brand`

</details>

### Content width

Choose one of the supported options below for content width. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Narrow, Medium, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`sm`, `md`, `lg`

</details>

### Section aria label

Enter the section aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `CRM form and booking section`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

### Minimum iframe height (desktop)

Drag the control to adjust minimum iframe height (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `740`.

Range: 240 to 1200 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `iframe_min_height`. Type: `range`.

</details>

### Minimum iframe height (mobile)

Drag the control to adjust minimum iframe height (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `740`.

Range: 240 to 1200 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `iframe_mobile_min_height`. Type: `range`.

</details>

## Blocks you can add

### Bullet

#### Bullet text

Enter the bullet text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Share your requirements`.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `text`.

</details>

### Trust badge

#### Logo / badge image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `logo`. Type: `image_picker`.

</details>

#### Alt text

Enter the alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Trust badge`.

<details><summary>Reference for connected builders</summary>

Setting: `alt`. Type: `text`.

</details>

#### Caption (optional)

Enter the caption (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add your verified credential`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

## File reference

`sections/3rd-party-crm-form-funnel-embed.liquid`
