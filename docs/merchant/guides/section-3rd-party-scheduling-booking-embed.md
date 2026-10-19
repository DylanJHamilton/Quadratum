# 3rd party - booking embed

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3rd party - booking embed.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Merchant-owned provider code runs as supplied. The provider must supply accessible iframe titles, its form/calendar configuration, and any editor reload support. Add an actual configured embed; this wrapper does not submit data or confirm bookings.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Schedule your time`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Book your appointment`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Write the description. Keep paragraphs short and preview long text on mobile.

Default: `Use the scheduler below to pick a time that works best for you.`.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `textarea`.

</details>

### Embed code (calendar / booking widget)

Write the embed code (calendar / booking widget). Keep paragraphs short and preview long text on mobile.

Paste the full provider HTML/iframe/script snippet. Minimum iframe heights below frame the widget; its script owns resizing and behavior. Test multiple instances and Theme Editor reload with your provider.

<details><summary>Reference for connected builders</summary>

Setting: `embed_code`. Type: `textarea`.

</details>

### Show help link

Turn on “Show help link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_help_link`. Type: `checkbox`.

</details>

### Help link text

Enter the help link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Having trouble booking? Contact us directly.`.

<details><summary>Reference for connected builders</summary>

Setting: `help_text`. Type: `text`.

</details>

### Help link URL

Enter the help link url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `help_url`. Type: `text`.

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

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

Default: `Scheduling and booking section`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

### Minimum iframe height (desktop)

Drag the control to adjust minimum iframe height (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `640`.

Range: 240 to 1200 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `iframe_min_height`. Type: `range`.

</details>

### Minimum iframe height (mobile)

Drag the control to adjust minimum iframe height (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `560`.

Range: 240 to 1200 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `iframe_mobile_min_height`. Type: `range`.

</details>

## File reference

`sections/3rd-party-scheduling-booking-embed.liquid`
