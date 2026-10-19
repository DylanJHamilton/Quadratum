# CTA – audience source

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose CTA – audience source.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 8 blocks can be added.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Audience source call to action`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Background (root only)

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `background_image`. Type: `image_picker`.

</details>

### Background video URL (MP4, YouTube, Vimeo)

Enter the background video url (mp4, youtube, vimeo). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `background_video`. Type: `text`.

</details>

### Background color (used when no image/video)

Choose a color for background color (used when no image/video). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

## Overlay

### Overlay type

Choose one of the supported options below for overlay type. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid color, Gradient, None.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_type`. Type: `select`.

`solid`, `gradient`, `none`

</details>

### Overlay color (solid)

Choose a color for overlay color (solid). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Gradient start

Choose a color for gradient start. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start`. Type: `color`.

</details>

### Start opacity

Drag the control to adjust start opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start_opacity`. Type: `range`.

</details>

### Gradient end

Choose a color for gradient end. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end`. Type: `color`.

</details>

### End opacity

Drag the control to adjust end opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end_opacity`. Type: `range`.

</details>

### Gradient angle

Drag the control to adjust gradient angle. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `180`.

Range: 0 to 360 deg; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_angle`. Type: `range`.

</details>

## Content

### Accent heading (kicker)

Enter the accent heading (kicker). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Personalized for you`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_heading`. Type: `text`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Pick your path`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h2`.

Options: H2, H3.

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h2`, `h3`

</details>

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `Choose the experience tailored to where you discovered us.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Subheading color

Choose a color for subheading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_color`. Type: `color`.

</details>

## Audience logic

### Highlight by UTM/source

Turn on “Highlight by UTM/source” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Reads ?utm_source= or ?source= and matches block 'source_key' (case-insensitive).

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_utm_match`. Type: `checkbox`.

</details>

### Hide non-matching when UTM present

Turn on “Hide non-matching when UTM present” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_non_matching`. Type: `checkbox`.

</details>

### Default active source key (fallback)

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `default_active_key`. Type: `text`.

</details>

## Layout and alignment

### Heading/subheading alignment

Choose one of the supported options below for heading/subheading alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Cards alignment

Choose one of the supported options below for cards alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `grid_align`. Type: `select`.

`left`, `center`, `right`

</details>

### Columns (mobile)

Choose one of the supported options below for columns (mobile). Only the selected option applies; other settings can further customize its appearance.

Default: `1`.

Options: 1, 2.

<details><summary>Reference for connected builders</summary>

Setting: `columns_mobile`. Type: `select`.

`1`, `2`

</details>

### Columns (tablet)

Drag the control to adjust columns (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_tablet`. Type: `range`.

</details>

### Columns (desktop)

Drag the control to adjust columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Card gap (px)

Drag the control to adjust card gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_gap`. Type: `range`.

</details>

### Card padding (px)

Drag the control to adjust card padding (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 8 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `card_padding`. Type: `range`.

</details>

## CTA row

### Global CTA text (optional)

Enter the global cta text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Continue`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_global_text`. Type: `text`.

</details>

### Global button link (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Default: `/`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_global_link`. Type: `url`.

</details>

### CTA alignment

Choose one of the supported options below for cta alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `cta_group_align`. Type: `select`.

`left`, `center`, `right`

</details>

## Buttons (style override)

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: — Theme default —, Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_mode`. Type: `select`.

`inherit`, `solid`, `outline`, `ghost`

</details>

## Spacing

### Padding top

Drag the control to adjust padding top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 0 to 200 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `padding_top`. Type: `range`.

</details>

### Padding bottom

Drag the control to adjust padding bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 0 to 200 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `padding_bottom`. Type: `range`.

</details>

### Margin top

Drag the control to adjust margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `margin_top`. Type: `range`.

</details>

### Margin bottom

Drag the control to adjust margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `margin_bottom`. Type: `range`.

</details>

## Visibility and anchors

### Optional anchor ID

Enter the optional anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

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

## Blocks you can add

### Audience card

#### Source key (match UTM: google, facebook, tiktok)

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `google`.

<details><summary>Reference for connected builders</summary>

Setting: `source_key`. Type: `text`.

</details>

#### Icon filename (lucide/* or tabler/* .svg)

Enter the icon filename (lucide/* or tabler/* .svg). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `tabler/brand-google.svg`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_filename`. Type: `text`.

</details>

#### Icon image (overrides filename, optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image_icon`. Type: `image_picker`.

</details>

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Found us on Google?`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Body

Write the body. Keep paragraphs short and preview long text on mobile.

Default: `Start with our most popular picks curated for search shoppers.`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `textarea`.

</details>

#### CTA text

Enter the cta text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore picks`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_text`. Type: `text`.

</details>

#### Button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Default: `/collections/all`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_link`. Type: `url`.

</details>

#### Badge text (optional)

Enter the badge text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Yep, we're here!`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text`. Type: `text`.

</details>

## File reference

`sections/call-to-action-audience-source.liquid`
