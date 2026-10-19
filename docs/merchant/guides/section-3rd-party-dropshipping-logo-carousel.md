# 3rd party - partner logos

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3rd party - partner logos.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Brand directory`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured brands`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Description

Write the description. Keep paragraphs short and preview long text on mobile.

Default: `Explore the brands and suppliers featured by our store.`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

## Layout and styling

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `content_align`. Type: `select`.

`left`, `center`

</details>

### Layout mode

Choose one of the supported options below for layout mode. Only the selected option applies; other settings can further customize its appearance.

Default: `strip`.

Options: Carousel strip, Continuous marquee, Static grid.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode`. Type: `select`.

`strip`, `marquee`, `grid`

</details>

### Logo alignment

Choose one of the supported options below for logo alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Center, Left.

<details><summary>Reference for connected builders</summary>

Setting: `logos_align`. Type: `select`.

`center`, `left`

</details>

### Max logo height (px)

Drag the control to adjust max logo height (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 24 to 96 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `logo_max_height`. Type: `range`.

</details>

### Logo style

Choose one of the supported options below for logo style. Only the selected option applies; other settings can further customize its appearance.

Default: `color`.

Options: Full color, Monochrome / subdued.

<details><summary>Reference for connected builders</summary>

Setting: `logo_style`. Type: `select`.

`color`, `mono`

</details>

### Gap between logos (px)

Drag the control to adjust gap between logos (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gutter`. Type: `range`.

</details>

## Motion

### Enable autoplay (strip/marquee)

Turn on “Enable autoplay (strip/marquee)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Requires at least two logos and JavaScript. Hover, keyboard focus, the stop button, hidden/offscreen pages, reduced motion and the Theme Editor use a static browsable list.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay`. Type: `checkbox`.

</details>

### Strip interval / marquee cycle (ms)

Drag the control to adjust strip interval / marquee cycle (ms). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4000`.

Range: 1000 to 9500 ; step 500.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay_speed_ms`. Type: `range`.

</details>

### Reduce decorative hover transitions

Turn on “Reduce decorative hover transitions” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Autoplay always respects the visitor’s reduced-motion preference. This also removes decorative hover transitions.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `respect_reduced_motion`. Type: `checkbox`.

</details>

## Background and accessibility

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

Default: `lg`.

Options: Narrow, Medium, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`sm`, `md`, `lg`

</details>

### Section aria label

Enter the section aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Supplier and brand logos`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Blocks you can add

### Logo

#### Logo image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `logo`. Type: `image_picker`.

</details>

#### Brand name

Enter the brand name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Brand name`.

<details><summary>Reference for connected builders</summary>

Setting: `brand_name`. Type: `text`.

</details>

#### Logo link (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `link_url`. Type: `url`.

</details>

#### Open link in new tab

Turn on “Open link in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_in_new_tab`. Type: `checkbox`.

</details>

#### Accessibility label (optional)

Enter the accessibility label (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## File reference

`sections/3rd-party-dropshipping-logo-carousel.liquid`
