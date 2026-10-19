# Button banner

[All documentation](../README.md) · [Support](../SUPPORT.md)

Banners and imagery.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Button banner.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Section behavior

### Anchor ID

Enter the anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `auto`.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `CTA banner`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

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

## Layout

### Banner corner radius (px)

Drag the control to adjust banner corner radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 48 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `section_radius`. Type: `range`.

</details>

### Layout variant

Choose one of the supported options below for layout variant. Only the selected option applies; other settings can further customize its appearance.

Default: `classic`.

Options: Classic, Web3, Modernized, Product-based, Newsletter sign-up.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`classic`, `web3`, `modern`, `product`, `newsletter`

</details>

### Background mode

Choose one of the supported options below for background mode. Only the selected option applies; other settings can further customize its appearance.

Default: `plain`.

Options: Plain (color), Media (image/video).

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`plain`, `media`

</details>

### Min height (vh, desktop)

Drag the control to adjust min height (vh, desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 24 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `min_height_vh`. Type: `range`.

</details>

### Min height (vh, mobile)

Drag the control to adjust min height (vh, mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `42`.

Range: 24 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `min_height_vh_mobile`. Type: `range`.

</details>

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Content max width

Choose one of the supported options below for content max width. Only the selected option applies; other settings can further customize its appearance.

Default: `max-w-3xl`.

Options: Max w 3xl, Max w 4xl, Max w 5xl, Max w 6xl.

<details><summary>Reference for connected builders</summary>

Setting: `content_max_w`. Type: `select`.

`max-w-3xl`, `max-w-4xl`, `max-w-5xl`, `max-w-6xl`

</details>

### Enable header overlap safety offset

Turn on “Enable header overlap safety offset” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_header_overlap`. Type: `checkbox`.

</details>

### Safe offset (px)

Drag the control to adjust safe offset (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 200 ; step 2.

Availability condition: `{{ section.settings.enable_header_overlap }}`.

<details><summary>Reference for connected builders</summary>

Setting: `safe_offset_px`. Type: `range`.

</details>

## Colors

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Subheading color

Choose a color for subheading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#4B5563`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_color`. Type: `color`.

</details>

### Section background color

Choose a color for section background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#F5F1EA`.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg_color`. Type: `color`.

</details>

### Section background opacity (%)

Drag the control to adjust section background opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `100`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg_opacity`. Type: `range`.

</details>

## Background media

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `CTA image`.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `image_alt`. Type: `text`.

</details>

### Background video URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `video_url`. Type: `url`.

</details>

### Autoplay video

Turn on “Autoplay video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `video_autoplay`. Type: `checkbox`.

</details>

### Loop video

Turn on “Loop video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `video_loop`. Type: `checkbox`.

</details>

### Mute video

Turn on “Mute video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `video_muted`. Type: `checkbox`.

</details>

### Show video controls

Turn on “Show video controls” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

Availability condition: `{{ section.settings.mode == 'media' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `video_controls`. Type: `checkbox`.

</details>

## Background overlay

### Overlay type

Choose one of the supported options below for overlay type. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Solid, Gradient.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_type`. Type: `select`.

`none`, `solid`, `gradient`

</details>

### Solid overlay color

Choose a color for solid overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

Availability condition: `{{ section.settings.overlay_type == 'solid' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Solid overlay opacity (%)

Drag the control to adjust solid overlay opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `36`.

Range: 0 to 100 ; step 1.

Availability condition: `{{ section.settings.overlay_type == 'solid' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Gradient start

Choose a color for gradient start. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

Availability condition: `{{ section.settings.overlay_type == 'gradient' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start`. Type: `color`.

</details>

### Start opacity (%)

Drag the control to adjust start opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `36`.

Range: 0 to 100 ; step 1.

Availability condition: `{{ section.settings.overlay_type == 'gradient' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start_opacity`. Type: `range`.

</details>

### Gradient end

Choose a color for gradient end. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

Availability condition: `{{ section.settings.overlay_type == 'gradient' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end`. Type: `color`.

</details>

### End opacity (%)

Drag the control to adjust end opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 ; step 1.

Availability condition: `{{ section.settings.overlay_type == 'gradient' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end_opacity`. Type: `range`.

</details>

### Gradient angle (deg)

Drag the control to adjust gradient angle (deg). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `135`.

Range: 0 to 360 ; step 5.

Availability condition: `{{ section.settings.overlay_type == 'gradient' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_angle`. Type: `range`.

</details>

## Content

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Refresh your space`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h2`.

Options: H1, H2.

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h1`, `h2`

</details>

### Heading size

Choose one of the supported options below for heading size. Only the selected option applies; other settings can further customize its appearance.

Default: `3xl`.

Options: Theme, 2XL, 3XL, 4XL.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `select`.

`theme`, `2xl`, `3xl`, `4xl`

</details>

### Subheading

Enter the subheading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Modern sofas, tables and accents—crafted to last.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `text`.

</details>

### Microcopy / kicker (web3/modern)

Enter the microcopy / kicker (web3/modern). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Flexible financing. Sustainable materials.`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

## Buttons

### Button button background

Choose a color for button button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#D97745`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_bg`. Type: `color`.

</details>

### Button button text

Choose a color for button button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1F130D`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_text`. Type: `color`.

</details>

### Button button border

Choose a color for button button border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#D97745`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_border`. Type: `color`.

</details>

### Button button radius (px)

Drag the control to adjust button button radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_radius`. Type: `range`.

</details>

### Button hover opacity (%)

Drag the control to adjust button hover opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `92`.

Range: 50 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_hover_opacity`. Type: `range`.

</details>

### Button hover background

Choose a color for button hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1E40AF`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_hover_bg`. Type: `color`.

</details>

### Button hover text

Choose a color for button hover text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_hover_text`. Type: `color`.

</details>

### Button hover border

Choose a color for button hover border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1E40AF`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_hover_border`. Type: `color`.

</details>

### Button active scale (%)

Drag the control to adjust button active scale (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `98`.

Range: 95 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cta_btn_active_scale`. Type: `range`.

</details>

## Product layout

### Product split direction

Choose one of the supported options below for product split direction. Only the selected option applies; other settings can further customize its appearance.

Default: `media-left`.

Options: Media left, Media right.

Availability condition: `{{ section.settings.layout_variant == 'product' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `layout_dir`. Type: `select`.

`media-left`, `media-right`

</details>

### Product media fit

Choose one of the supported options below for product media fit. Only the selected option applies; other settings can further customize its appearance.

Default: `contain`.

Options: Contain (no crop), Cover (fill box).

Availability condition: `{{ section.settings.layout_variant == 'product' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `prod_media_mode`. Type: `select`.

`contain`, `cover`

</details>

### Product media aspect

Choose one of the supported options below for product media aspect. Only the selected option applies; other settings can further customize its appearance.

Default: `natural`.

Options: Natural, 1:1 (square), 4:5 (portrait), 16:9 (landscape).

Availability condition: `{{ section.settings.layout_variant == 'product' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `prod_media_aspect`. Type: `select`.

`natural`, `1_1`, `4_5`, `16_9`

</details>

### Product media max height (px, desktop)

Drag the control to adjust product media max height (px, desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `520`.

Range: 240 to 800 ; step 10.

Availability condition: `{{ section.settings.layout_variant == 'product' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `prod_media_max_h_desktop`. Type: `range`.

</details>

### Product media max height (px, mobile)

Drag the control to adjust product media max height (px, mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `340`.

Range: 160 to 600 ; step 10.

Availability condition: `{{ section.settings.layout_variant == 'product' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `prod_media_max_h_mobile`. Type: `range`.

</details>

### Hard crop to aspect (use Shopify crop)

Turn on “Hard crop to aspect (use Shopify crop)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

Availability condition: `{{ section.settings.layout_variant == 'product' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `prod_media_hard_crop`. Type: `checkbox`.

</details>

## Newsletter integration

### Newsletter form action (API/app proxy URL)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_action_url`. Type: `url`.

</details>

### Newsletter method

Choose one of the supported options below for newsletter method. Only the selected option applies; other settings can further customize its appearance.

Default: `post`.

Options: POST, GET.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_method`. Type: `select`.

`post`, `get`

</details>

### Newsletter success redirect (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_success_redirect`. Type: `url`.

</details>

## Newsletter button

### Newsletter button background

Choose a color for newsletter button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#D97745`.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_bg`. Type: `color`.

</details>

### Newsletter button text

Choose a color for newsletter button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1F130D`.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_text`. Type: `color`.

</details>

### Newsletter button border

Choose a color for newsletter button border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#D97745`.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_border`. Type: `color`.

</details>

### Newsletter button radius (px)

Drag the control to adjust newsletter button radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 32 ; step 1.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_radius`. Type: `range`.

</details>

### Newsletter hover background

Choose a color for newsletter hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#C2410C`.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_hover_bg`. Type: `color`.

</details>

### Newsletter hover text

Choose a color for newsletter hover text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_hover_text`. Type: `color`.

</details>

### Newsletter hover border

Choose a color for newsletter hover border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#C2410C`.

Availability condition: `{{ section.settings.layout_variant == 'newsletter' }}`.

<details><summary>Reference for connected builders</summary>

Setting: `newsletter_btn_hover_border`. Type: `color`.

</details>

## Content backdrop

### Enable content overlay panel

Turn on “Enable content overlay panel” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `content_overlay_enabled`. Type: `checkbox`.

</details>

### Content overlay color

Choose a color for content overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

Availability condition: `{{ section.settings.content_overlay_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `content_overlay_color`. Type: `color`.

</details>

### Content overlay opacity (%)

Drag the control to adjust content overlay opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 ; step 1.

Availability condition: `{{ section.settings.content_overlay_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `content_overlay_opacity`. Type: `range`.

</details>

### Content overlay blur (px)

Drag the control to adjust content overlay blur (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 20 ; step 1.

Availability condition: `{{ section.settings.content_overlay_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `content_overlay_blur`. Type: `range`.

</details>

### Content overlay radius (px)

Drag the control to adjust content overlay radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 32 ; step 1.

Availability condition: `{{ section.settings.content_overlay_enabled }}`.

<details><summary>Reference for connected builders</summary>

Setting: `content_overlay_radius`. Type: `range`.

</details>

## Outline button colors

### Outline text

Choose a color for outline text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Use a color that contrasts with the banner background.

Default: `#2B2117`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_outline_text`. Type: `color`.

</details>

### Outline border

Choose a color for outline border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2B2117`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_outline_border`. Type: `color`.

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

Default: `/`.

<details><summary>Reference for connected builders</summary>

Setting: `link`. Type: `url`.

</details>

#### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `CTA button`.

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

#### Use section button colors

Turn on “Use section button colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_theme_colors`. Type: `checkbox`.

</details>

#### Override: background

Choose a color for override: background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#D97745`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

#### Override: text

Choose a color for override: text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

#### Override: border

Choose a color for override: border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#D97745`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

#### Override: border width (px)

Drag the control to adjust override: border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_width`. Type: `range`.

</details>

#### Override: radius (px)

Drag the control to adjust override: radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

#### Leading icon (HTML/SVG)

Advanced: add trusted HTML. Keep headings, image alternatives, and links accessible. Use a duplicated unpublished theme for code changes.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `html`.

</details>

#### Hover: background

Choose a color for hover: background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `hover_bg_color`. Type: `color`.

</details>

#### Hover: text

Choose a color for hover: text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `hover_text_color`. Type: `color`.

</details>

#### Hover: border

Choose a color for hover: border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `hover_border_color`. Type: `color`.

</details>

#### Active scale (%)

Drag the control to adjust active scale (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `98`.

Range: 95 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `active_scale`. Type: `range`.

</details>

### Badge (web3)

#### Badge text

Enter the badge text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Verified`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text`. Type: `text`.

</details>

#### Icon (optional HTML/SVG)

Advanced: add trusted HTML. Keep headings, image alternatives, and links accessible. Use a duplicated unpublished theme for code changes.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_icon`. Type: `html`.

</details>

### Product (data)

#### Product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

#### Fallback title

Enter the fallback title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured product`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Fallback price

Enter the fallback price. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `$199`.

<details><summary>Reference for connected builders</summary>

Setting: `price`. Type: `text`.

</details>

#### Fallback link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `link`. Type: `url`.

</details>

#### Fallback image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_image`. Type: `image_picker`.

</details>

#### Fallback image alt

Enter the fallback image alt. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product image`.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_image_alt`. Type: `text`.

</details>

#### Enable product content panel

Turn on “Enable product content panel” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `content_panel_enabled`. Type: `checkbox`.

</details>

#### Product panel color

Choose a color for product panel color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#22D3EE`.

<details><summary>Reference for connected builders</summary>

Setting: `content_panel_color`. Type: `color`.

</details>

#### Product panel opacity (%)

Drag the control to adjust product panel opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `88`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `content_panel_opacity`. Type: `range`.

</details>

#### Product panel blur (px)

Drag the control to adjust product panel blur (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 0 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `content_panel_blur`. Type: `range`.

</details>

#### Product panel radius (px)

Drag the control to adjust product panel radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `content_panel_radius`. Type: `range`.

</details>

### Newsletter form

#### Email placeholder

Enter the email placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Enter your email`.

<details><summary>Reference for connected builders</summary>

Setting: `email_placeholder`. Type: `text`.

</details>

#### Consent label

Enter the consent label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `I agree to receive marketing emails.`.

<details><summary>Reference for connected builders</summary>

Setting: `consent_label`. Type: `text`.

</details>

#### Submit label

Enter the submit label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Subscribe`.

<details><summary>Reference for connected builders</summary>

Setting: `submit_label`. Type: `text`.

</details>

## File reference

`sections/call-to-action-banner.liquid`
