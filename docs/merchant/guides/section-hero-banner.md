# Hero banner - classic

[All documentation](../README.md) · [Support](../SUPPORT.md)

Banners and imagery.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Hero banner - classic.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 8 blocks can be added.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Hero banner`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Background media (single)

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `background_image`. Type: `image_picker`.

</details>

### Background video URL (MP4, YouTube, or Vimeo)

Enter the background video url (mp4, youtube, or vimeo). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `background_video`. Type: `text`.

</details>

### Background color (used when no image/video)

Choose a color for background color (used when no image/video). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `background_color`. Type: `color`.

</details>

## Overlay (global default)

### Overlay type

Choose one of the supported options below for overlay type. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid color, Gradient.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_type`. Type: `select`.

`solid`, `gradient`

</details>

### Overlay color (solid)

Choose a color for overlay color (solid). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

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

Default: `40`.

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

## Background slideshow

### Use background slideshow

Turn on “Use background slideshow” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_slideshow`. Type: `checkbox`.

</details>

### Auto-rotate slides

Turn on “Auto-rotate slides” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay`. Type: `checkbox`.

</details>

### Time between slides (sec)

Drag the control to adjust time between slides (sec). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `5`.

Range: 3 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `autoplay_interval`. Type: `range`.

</details>

### Show dots over banner

Turn on “Show dots over banner” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_dots`. Type: `checkbox`.

</details>

## Layout and sizing

### Minimum height (desktop default)

Choose one of the supported options below for minimum height (desktop default). Only the selected option applies; other settings can further customize its appearance.

Default: `min-h-[75vh]`.

Options: 50% viewport, 60% viewport, 75% viewport, Full screen.

<details><summary>Reference for connected builders</summary>

Setting: `min_height`. Type: `select`.

`min-h-[50vh]`, `min-h-[60vh]`, `min-h-[75vh]`, `min-h-screen`

</details>

### Minimum height (tablet)

Choose one of the supported options below for minimum height (tablet). Only the selected option applies; other settings can further customize its appearance.

Default: ``.

Options: — Inherit desktop —, 50% viewport, 60% viewport, 75% viewport, Full screen.

<details><summary>Reference for connected builders</summary>

Setting: `min_height_tablet`. Type: `select`.

``, `min-h-[50vh]`, `min-h-[60vh]`, `min-h-[75vh]`, `min-h-screen`

</details>

### Minimum height (mobile)

Choose one of the supported options below for minimum height (mobile). Only the selected option applies; other settings can further customize its appearance.

Default: ``.

Options: — Inherit tablet/desktop —, 50% viewport, 60% viewport, 75% viewport, Full screen.

<details><summary>Reference for connected builders</summary>

Setting: `min_height_mobile`. Type: `select`.

``, `min-h-[50vh]`, `min-h-[60vh]`, `min-h-[75vh]`, `min-h-screen`

</details>

### Container

Choose one of the supported options below for container. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained (side padding), Full-bleed (edge to edge).

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Content width

Choose one of the supported options below for content width. Only the selected option applies; other settings can further customize its appearance.

Default: `max-w-4xl`.

Options: Narrow, Comfort, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `content_max_w`. Type: `select`.

`max-w-2xl`, `max-w-3xl`, `max-w-4xl`

</details>

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

## Content

### Accent heading (kicker)

Enter the accent heading (kicker). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured collection`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_heading`. Type: `text`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

### Accent size

Choose one of the supported options below for accent size. Only the selected option applies; other settings can further customize its appearance.

Default: `lg`.

Options: Small, Normal, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `accent_size`. Type: `select`.

`sm`, `base`, `lg`, `xl`

</details>

### Accent size (mobile override, e.g. 18px / 1.1rem / 110%)

Enter the accent size (mobile override, e.g. 18px / 1.1rem / 110%). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `auto`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_size_mobile`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Welcome to our store`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h2`.

Options: H1 (page headline), H2 (sub-headline).

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h1`, `h2`

</details>

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Heading size

Choose one of the supported options below for heading size. Only the selected option applies; other settings can further customize its appearance.

Default: `5xl`.

Options: 3XL, 4XL, 5XL, 6XL.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `select`.

`3xl`, `4xl`, `5xl`, `6xl`

</details>

### Heading size (mobile override)

Enter the heading size (mobile override). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `auto`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size_mobile`. Type: `text`.

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `Discover your new favorite products.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Subheading color

Choose a color for subheading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_color`. Type: `color`.

</details>

### Subheading size

Choose one of the supported options below for subheading size. Only the selected option applies; other settings can further customize its appearance.

Default: `lg`.

Options: Base, Large, XL.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_size`. Type: `select`.

`base`, `lg`, `xl`

</details>

### Subheading size (mobile override)

Enter the subheading size (mobile override). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `auto`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_size_mobile`. Type: `text`.

</details>

## Alignment (text and content)

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Heading alignment

Choose one of the supported options below for heading alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit text alignment, Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `heading_alignment`. Type: `select`.

`inherit`, `left`, `center`, `right`

</details>

### Button alignment (optional)

Choose one of the supported options below for button alignment (optional). Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `cta_group_align`. Type: `select`.

`left`, `center`, `right`

</details>

## Content placement (9 positions)

### Mobile placement

Choose one of the supported options below for mobile placement. Only the selected option applies; other settings can further customize its appearance.

Default: `center_center`.

Options: Top left, Top center, Top right, Middle left, Middle center, Middle right, Bottom left, Bottom center, Bottom right.

<details><summary>Reference for connected builders</summary>

Setting: `content_position_mobile`. Type: `select`.

`start_start`, `start_center`, `start_end`, `center_start`, `center_center`, `center_end`, `end_start`, `end_center`, `end_end`

</details>

### Desktop placement

Choose one of the supported options below for desktop placement. Only the selected option applies; other settings can further customize its appearance.

Default: `center_center`.

Options: Top left, Top center, Top right, Middle left, Middle center, Middle right, Bottom left, Bottom center, Bottom right.

<details><summary>Reference for connected builders</summary>

Setting: `content_position`. Type: `select`.

`start_start`, `start_center`, `start_end`, `center_start`, `center_center`, `center_end`, `end_start`, `end_center`, `end_end`

</details>

## Buttons

### Button style (override theme default)

Choose one of the supported options below for button style (override theme default). Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: — Theme default —, Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_mode`. Type: `select`.

`inherit`, `solid`, `outline`, `ghost`

</details>

### Button background (solid)

Choose a color for button background (solid). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `button_bg_color`. Type: `color`.

</details>

### Button text color

Choose a color for button text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `button_text_color`. Type: `color`.

</details>

### Button border color (outline/ghost)

Choose a color for button border color (outline/ghost). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `button_border_color`. Type: `color`.

</details>

### Button border width

Drag the control to adjust button border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_border_width`. Type: `range`.

</details>

### Button radius

Drag the control to adjust button radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_radius`. Type: `range`.

</details>

### Button padding vertical

Drag the control to adjust button padding vertical. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 6 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_padding_vertical`. Type: `range`.

</details>

### Button padding horizontal

Drag the control to adjust button padding horizontal. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 10 to 36 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_padding_horizontal`. Type: `range`.

</details>

## Buttons

### Primary button text

Enter the primary button text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop now`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_text`. Type: `text`.

</details>

### Primary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Default: `/`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_link`. Type: `url`.

</details>

### Secondary button text

Enter the secondary button text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_text`. Type: `text`.

</details>

### Secondary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Default: `/`.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_link`. Type: `url`.

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

### Background slide

#### Image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Mobile image (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_image`. Type: `image_picker`.

</details>

#### Video URL (MP4)

Enter the video url (mp4). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Optional; uses image as poster if provided.

<details><summary>Reference for connected builders</summary>

Setting: `video_url`. Type: `text`.

</details>

#### Image focal point

Choose one of the supported options below for image focal point. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Center, Top, Bottom, Left, Right, Top left, Top right, Bottom left, Bottom right.

<details><summary>Reference for connected builders</summary>

Setting: `focal_point`. Type: `select`.

`center`, `top`, `bottom`, `left`, `right`, `top left`, `top right`, `bottom left`, `bottom right`

</details>

### Per-slide overlay (optional)

#### Overlay for this slide

Choose one of the supported options below for overlay for this slide. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit section default, Solid color, Gradient.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_mode`. Type: `select`.

`inherit`, `solid`, `gradient`

</details>

#### Solid color

Choose a color for solid color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

#### Solid opacity

Drag the control to adjust solid opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

#### Gradient start

Choose a color for gradient start. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start`. Type: `color`.

</details>

#### Start opacity

Drag the control to adjust start opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start_opacity`. Type: `range`.

</details>

#### Gradient end

Choose a color for gradient end. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end`. Type: `color`.

</details>

#### End opacity

Drag the control to adjust end opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end_opacity`. Type: `range`.

</details>

#### Angle

Drag the control to adjust angle. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `180`.

Range: 0 to 360 deg; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_angle`. Type: `range`.

</details>

### Motion (image only)

#### Ken burns / pan

Choose one of the supported options below for ken burns / pan. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Ken burns — zoom in, Ken burns — zoom out, Pan left, Pan right.

<details><summary>Reference for connected builders</summary>

Setting: `media_effect`. Type: `select`.

`none`, `ken_in`, `ken_out`, `pan_left`, `pan_right`

</details>

## File reference

`sections/hero-banner.liquid`
