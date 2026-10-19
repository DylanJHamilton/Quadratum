# 3D tour - media showcase

[All documentation](../README.md) · [Support](../SUPPORT.md)

Media and interaction.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3D tour - media showcase.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Viewer mode

Choose one of the supported options below for viewer mode. Only the selected option applies; other settings can further customize its appearance.

Default: `model`.

Options: 3D model, Image rotation.

<details><summary>Reference for connected builders</summary>

Setting: `viewer_mode`. Type: `select`.

`model`, `frames`

</details>

### Auto-advance image rotation

Turn on “Auto-advance image rotation” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `frame_auto_advance`. Type: `checkbox`.

</details>

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `viewer_primary_gallery_below`.

Options: 3D viewer primary + gallery below, Split viewer and content.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`viewer_primary_gallery_below`, `split_viewer_and_content`

</details>

## Header

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Explore the space`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subtitle

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Inspect the space in 3D—with an interactive model and supporting images.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle`. Type: `richtext`.

</details>

## 3D model (self-hosted)

### Model GLB URL (required for 3D)

Enter the model glb url (required for 3d). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Upload a .glb to Shopify Files and paste the URL here.

<details><summary>Reference for connected builders</summary>

Setting: `model_glb_url`. Type: `text`.

</details>

### Model USDZ URL (optional for ios AR)

Enter the model usdz url (optional for ios ar). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Upload a .usdz to Shopify Files and paste the URL here.

<details><summary>Reference for connected builders</summary>

Setting: `model_usdz_url`. Type: `text`.

</details>

### Poster image (fallback)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `poster_image`. Type: `image_picker`.

</details>

### Viewer aspect ratio

Choose one of the supported options below for viewer aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `16:9`.

Options: 16:9, 4:3, 1:1, Custom height.

<details><summary>Reference for connected builders</summary>

Setting: `viewer_aspect_ratio`. Type: `select`.

`16:9`, `4:3`, `1:1`, `custom`

</details>

### Custom viewer height (% of width)

Drag the control to adjust custom viewer height (% of width). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `56`.

Range: 10 to 200 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `custom_aspect_height`. Type: `range`.

</details>

The viewer loads a pinned local Google model-viewer module when needed. Keep a poster image for browser or network fallback.

## Viewer behavior

### Enable camera controls

Turn on “Enable camera controls” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `camera_controls`. Type: `checkbox`.

</details>

### Auto rotate

Turn on “Auto rotate” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `auto_rotate`. Type: `checkbox`.

</details>

### Enable AR (requires USDZ)

Turn on “Enable AR (requires USDZ)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_ar`. Type: `checkbox`.

</details>

### Show loading bar

Turn on “Show loading bar” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_loading_ui`. Type: `checkbox`.

</details>

### Poster image fit

Choose one of the supported options below for poster image fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `poster_fit`. Type: `select`.

`cover`, `contain`

</details>

## Fallback messaging

### Show message while 3D is unavailable

Turn on “Show message while 3D is unavailable” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_fallback_message`. Type: `checkbox`.

</details>

### Fallback message

Enter the fallback message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Interactive 3D unavailable. Please view the images below.`.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_message`. Type: `text`.

</details>

## Styling (scoped variables)

### Section background

Choose a color for section background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg`. Type: `color`.

</details>

### Surface background

Choose a color for surface background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#F7F7F7`.

<details><summary>Reference for connected builders</summary>

Setting: `surface_bg`. Type: `color`.

</details>

### Surface border color

Choose a color for surface border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#E2E2E2`.

<details><summary>Reference for connected builders</summary>

Setting: `surface_border_color`. Type: `color`.

</details>

### Surface radius

Choose one of the supported options below for surface radius. Only the selected option applies; other settings can further customize its appearance.

Default: `18px`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `surface_radius`. Type: `select`.

`12px`, `18px`, `24px`

</details>

### Surface shadow strength

Choose one of the supported options below for surface shadow strength. Only the selected option applies; other settings can further customize its appearance.

Default: `0 10px 30px rgba(0,0,0,0.08)`.

Options: None, Soft, Medium, Strong.

<details><summary>Reference for connected builders</summary>

Setting: `surface_shadow`. Type: `select`.

`none`, `0 6px 18px rgba(0,0,0,0.06)`, `0 10px 30px rgba(0,0,0,0.08)`, `0 14px 44px rgba(0,0,0,0.10)`

</details>

### Viewer max width

Choose one of the supported options below for viewer max width. Only the selected option applies; other settings can further customize its appearance.

Default: `1200px`.

Options: Narrow, Standard, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `viewer_max_width`. Type: `select`.

`960px`, `1200px`, `1440px`

</details>

### Gallery gap

Choose one of the supported options below for gallery gap. Only the selected option applies; other settings can further customize its appearance.

Default: `12px`.

Options: Tight, Standard, Spacious.

<details><summary>Reference for connected builders</summary>

Setting: `gallery_gap`. Type: `select`.

`10px`, `12px`, `16px`

</details>

### Thumbnail radius

Choose one of the supported options below for thumbnail radius. Only the selected option applies; other settings can further customize its appearance.

Default: `14px`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `thumbnail_radius`. Type: `select`.

`10px`, `14px`, `18px`

</details>

### Thumbnail aspect ratio

Choose one of the supported options below for thumbnail aspect ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `1 / 1`.

Options: 1:1, 4:3, 16:9.

<details><summary>Reference for connected builders</summary>

Setting: `thumbnail_aspect_ratio`. Type: `select`.

`1 / 1`, `4 / 3`, `16 / 9`

</details>

### Title font size

Choose one of the supported options below for title font size. Only the selected option applies; other settings can further customize its appearance.

Default: `32px`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `title_font_size`. Type: `select`.

`26px`, `32px`, `38px`

</details>

### Subtitle font size

Choose one of the supported options below for subtitle font size. Only the selected option applies; other settings can further customize its appearance.

Default: `16px`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle_font_size`. Type: `select`.

`14px`, `16px`, `18px`

</details>

### Subtitle opacity

Choose one of the supported options below for subtitle opacity. Only the selected option applies; other settings can further customize its appearance.

Default: `0.85`.

Options: 100%, 90%, 85%, 75%.

<details><summary>Reference for connected builders</summary>

Setting: `subtitle_opacity`. Type: `select`.

`1`, `0.9`, `0.85`, `0.75`

</details>

### Loading bar height

Choose one of the supported options below for loading bar height. Only the selected option applies; other settings can further customize its appearance.

Default: `8px`.

Options: Thin, Medium, Thick.

<details><summary>Reference for connected builders</summary>

Setting: `loading_bar_height`. Type: `select`.

`6px`, `8px`, `10px`

</details>

### Loading fill color

Choose a color for loading fill color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `loading_fill_color`. Type: `color`.

</details>

### Loading track color

Choose a color for loading track color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#CFCFCF`.

<details><summary>Reference for connected builders</summary>

Setting: `loading_track_color`. Type: `color`.

</details>

## Blocks you can add

### Supporting media

#### Image (required)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Title (optional)

Enter the title (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Description (optional)

Enter the description (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `text`.

</details>

#### Link URL (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `link_url`. Type: `url`.

</details>

#### Use as rotation frame

Turn on “Use as rotation frame” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_as_frame`. Type: `checkbox`.

</details>

## File reference

`sections/interactive-content-helper-3d-tour-media-showcase.liquid`
