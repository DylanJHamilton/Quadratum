# Split content — banner

[All documentation](../README.md) · [Support](../SUPPORT.md)

Banners and imagery.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Split content — banner.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 8 blocks can be added.

## Media

### Desktop image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

### Image alt (desktop)

Enter the image alt (desktop). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `image_alt`. Type: `text`.

</details>

### Mobile image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_image`. Type: `image_picker`.

</details>

### Image alt (mobile)

Enter the image alt (mobile). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_image_alt`. Type: `text`.

</details>

### Image caption (optional)

Enter the image caption (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `image_caption`. Type: `text`.

</details>

### Image position (desktop)

Choose one of the supported options below for image position (desktop). Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `image_position`. Type: `select`.

`left`, `right`

</details>

## Mobile presentation

### Mobile layout

Choose one of the supported options below for mobile layout. Only the selected option applies; other settings can further customize its appearance.

Default: `stack`.

Options: Stacked (image then copy), Background image behind copy.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_presentation`. Type: `select`.

`stack`, `bg`

</details>

### Show image above content on mobile (stacked only)

Turn on “Show image above content on mobile (stacked only)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_image_first`. Type: `checkbox`.

</details>

### Mobile overlay color (bg mode)

Choose a color for mobile overlay color (bg mode). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_overlay_color`. Type: `color`.

</details>

### Mobile overlay opacity (bg mode)

Drag the control to adjust mobile overlay opacity (bg mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `35`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_overlay_opacity`. Type: `range`.

</details>

## Layout and spacing

### Minimum height

Choose one of the supported options below for minimum height. Only the selected option applies; other settings can further customize its appearance.

Default: `min-h-[60vh]`.

Options: 40% viewport, 50% viewport, 60% viewport, 75% viewport.

<details><summary>Reference for connected builders</summary>

Setting: `min_height`. Type: `select`.

`min-h-[40vh]`, `min-h-[50vh]`, `min-h-[60vh]`, `min-h-[75vh]`

</details>

### Container

Choose one of the supported options below for container. Only the selected option applies; other settings can further customize its appearance.

Default: `full`.

Options: Contained (side padding), Full-bleed (edge to edge).

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Content width (max measure)

Choose one of the supported options below for content width (max measure). Only the selected option applies; other settings can further customize its appearance.

Default: `max-w-3xl`.

Options: Narrow, Comfort, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `content_max_w`. Type: `select`.

`max-w-2xl`, `max-w-3xl`, `max-w-4xl`

</details>

### Use theme spacing (top/bottom/padding)

Turn on “Use theme spacing (top/bottom/padding)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_theme_spacing`. Type: `checkbox`.

</details>

### Content vertical padding (tailwind utilities)

Enter the content vertical padding (tailwind utilities). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `py-12 md:py-16`.

<details><summary>Reference for connected builders</summary>

Setting: `content_pad_y`. Type: `text`.

</details>

### Content horizontal padding (tailwind utilities)

Enter the content horizontal padding (tailwind utilities). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `px-6 md:px-10`.

<details><summary>Reference for connected builders</summary>

Setting: `content_pad_x`. Type: `text`.

</details>

## Content (desktop defaults)

### Content background (desktop and stacked mobile)

Choose a color for content background (desktop and stacked mobile). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `content_bg_color`. Type: `color`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Kicker color (desktop)

Choose a color for kicker color (desktop). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_color`. Type: `color`.

</details>

### Kicker size

Choose one of the supported options below for kicker size. Only the selected option applies; other settings can further customize its appearance.

Default: `sm`.

Options: Small, Normal, Large.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_size`. Type: `select`.

`sm`, `base`, `lg`

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Discover the collection`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h2`.

Options: H1 (page headline), H2 (section headline).

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h1`, `h2`

</details>

### Heading color (desktop)

Choose a color for heading color (desktop). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Heading size

Choose one of the supported options below for heading size. Only the selected option applies; other settings can further customize its appearance.

Default: `theme`.

Options: Use theme size, 2XL, 3XL, 4XL.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `select`.

`theme`, `2xl`, `3xl`, `4xl`

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `Crafted for style. Built for performance.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Subheading color (desktop)

Choose a color for subheading color (desktop). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#374151`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_color`. Type: `color`.

</details>

### Subheading size

Choose one of the supported options below for subheading size. Only the selected option applies; other settings can further customize its appearance.

Default: `base`.

Options: Base, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_size`. Type: `select`.

`base`, `lg`, `xl`

</details>

## Alignment and visibility

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Optional anchor ID

Enter the optional anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

### Accessible region label

Enter the accessible region label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Promotional banner`.

<details><summary>Reference for connected builders</summary>

Setting: `region_label`. Type: `text`.

</details>

### Hide on mobile

Turn on “Hide on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_on_mobile`. Type: `checkbox`.

</details>

### Hide on desktop

Turn on “Hide on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_on_desktop`. Type: `checkbox`.

</details>

## Section background (rare)

### Section background (CSS color / tailwind value)

Enter the section background (css color / tailwind value). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `transparent`.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg`. Type: `text`.

</details>

## Blocks you can add

### Button

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop now`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Default: `/collections/all`.

<details><summary>Reference for connected builders</summary>

Setting: `link`. Type: `url`.

</details>

#### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop now`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

#### Size

Choose one of the supported options below for size. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `size`. Type: `select`.

`sm`, `md`, `lg`

</details>

#### Open in new tab

Turn on “Open in new tab” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `new_tab`. Type: `checkbox`.

</details>

#### Style

Choose one of the supported options below for style. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_mode`. Type: `select`.

`solid`, `outline`, `ghost`

</details>

### Color overrides (optional)

#### Use theme colors

Turn on “Use theme colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_theme_colors`. Type: `checkbox`.

</details>

#### Background (solid)

Choose a color for background (solid). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

#### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

#### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

#### Icon (SVG/HTML)

Enter the icon (svg/html). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `text`.

</details>

#### Border width (px)

Drag the control to adjust border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 8 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

#### Radius (px)

Drag the control to adjust radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

### Badge

#### Badge text

Enter the badge text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore the collection`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text`. Type: `text`.

</details>

#### Icon (SVG/HTML)

Enter the icon (svg/html). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge_icon`. Type: `text`.

</details>

## File reference

`sections/split-banner.liquid`
