# Video hero banner

[All documentation](../README.md) · [Support](../SUPPORT.md)

Banners and imagery.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Video hero banner.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Video source

Choose one of the supported options below for video source. Only the selected option applies; other settings can further customize its appearance.

Default: `mp4`.

Options: MP4, YouTube, Vimeo.

<details><summary>Reference for connected builders</summary>

Setting: `video_source`. Type: `select`.

`mp4`, `youtube`, `vimeo`

</details>

### MP4 URL

Enter the mp4 url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `mp4_url`. Type: `text`.

</details>

### YouTube ID or URL

Enter the youtube id or url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `youtube_input`. Type: `text`.

</details>

### Vimeo ID or URL

Enter the vimeo id or url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `vimeo_input`. Type: `text`.

</details>

### Poster image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

Used if no video is set and as MP4 poster.

<details><summary>Reference for connected builders</summary>

Setting: `poster_image`. Type: `image_picker`.

</details>

### Background image (fallback)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 %; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Featured`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bring your story to life`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Enter the subheading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Autoplaying background video with clean, bold messaging.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `text`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Horizontal align

Choose one of the supported options below for horizontal align. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `text_align_h`. Type: `select`.

`left`, `center`, `right`

</details>

### Vertical align

Choose one of the supported options below for vertical align. Only the selected option applies; other settings can further customize its appearance.

Default: `middle`.

Options: Top, Middle, Bottom.

<details><summary>Reference for connected builders</summary>

Setting: `text_align_v`. Type: `select`.

`top`, `middle`, `bottom`

</details>

### Container max width

Drag the control to adjust container max width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 480 to 1600 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `container_max_w`. Type: `range`.

</details>

### Min height

Drag the control to adjust min height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `70`.

Range: 30 to 100 vh; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `min_height_vh`. Type: `range`.

</details>

### Padding top

Drag the control to adjust padding top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 200 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_top`. Type: `range`.

</details>

### Padding bottom

Drag the control to adjust padding bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 200 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_bottom`. Type: `range`.

</details>

### Primary button text

Enter the primary button text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop now`.

<details><summary>Reference for connected builders</summary>

Setting: `cta1_text`. Type: `text`.

</details>

### Primary button link

Enter the primary button link. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `/collections/all`.

<details><summary>Reference for connected builders</summary>

Setting: `cta1_link`. Type: `text`.

</details>

### Secondary button text

Enter the secondary button text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_text`. Type: `text`.

</details>

### Secondary button link

Enter the secondary button link. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cta2_link`. Type: `text`.

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

## File reference

`sections/video-hero-banner.liquid`
