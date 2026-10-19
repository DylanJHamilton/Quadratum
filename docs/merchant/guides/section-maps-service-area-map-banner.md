# Maps - service area

[All documentation](../README.md) · [Support](../SUPPORT.md)

Banners and imagery.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Maps - service area.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Configure your real location, coverage and contact information. Native links open Google Maps; embeds load external content. The theme does not verify addresses, coverage, opening hours or service availability. Blank location fields do not select a sample place.

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Service Coverage`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Our service area`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Contact us to confirm service availability for your location.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

### Primary button label

Enter the primary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View All Service Areas`.

<details><summary>Reference for connected builders</summary>

Setting: `primary_label`. Type: `text`.

</details>

### Primary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `primary_url`. Type: `url`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Get a Quote`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_label`. Type: `text`.

</details>

### Secondary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_url`. Type: `url`.

</details>

## Map

### Map mode

Choose one of the supported options below for map mode. Only the selected option applies; other settings can further customize its appearance.

Default: `static_image`.

Options: Static image (recommended), Google maps embed (iframe), Coordinates (link fallback).

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`static_image`, `embed`, `coords`

</details>

### Map image (static mode)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `map_image`. Type: `image_picker`.

</details>

### Image alt text

Enter the image alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Service area coverage map`.

<details><summary>Reference for connected builders</summary>

Setting: `image_alt`. Type: `text`.

</details>

### Google maps iframe embed code (embed mode)

Write the google maps iframe embed code (embed mode). Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `embed_code`. Type: `textarea`.

</details>

### Allow map interaction (not recommended on mobile)

Turn on “Allow map interaction (not recommended on mobile)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `embed_interactive`. Type: `checkbox`.

</details>

### Latitude (coords mode)

Enter the latitude (coords mode). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lat`. Type: `text`.

</details>

### Longitude (coords mode)

Enter the longitude (coords mode). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lng`. Type: `text`.

</details>

### Zoom (coords mode)

Drag the control to adjust zoom (coords mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 1 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `zoom`. Type: `range`.

</details>

### Map link override (optional)

Enter the map link override (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `map_link`. Type: `text`.

</details>

### Show 'open in Google maps' link

Turn on “Show 'open in Google maps' link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_map_link`. Type: `checkbox`.

</details>

### Map link label

Enter the map link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Open in Google Maps`.

<details><summary>Reference for connected builders</summary>

Setting: `map_link_label`. Type: `text`.

</details>

## Overlay and layout

### Overlay opacity (%)

Drag the control to adjust overlay opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 0 to 90 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Use gradient overlay

Turn on “Use gradient overlay” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_gradient`. Type: `checkbox`.

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `content_align`. Type: `select`.

`left`, `center`

</details>

### Vertical alignment

Choose one of the supported options below for vertical alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Center, Bottom.

<details><summary>Reference for connected builders</summary>

Setting: `vertical_align`. Type: `select`.

`center`, `bottom`

</details>

### Content max width (px)

Drag the control to adjust content max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `560`.

Range: 360 to 860 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `content_max`. Type: `range`.

</details>

### Section height

Choose one of the supported options below for section height. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Auto, Small, Medium, Large, 50% viewport, 70% viewport, 90% viewport.

<details><summary>Reference for connected builders</summary>

Setting: `height_mode`. Type: `select`.

`auto`, `sm`, `md`, `lg`, `vh50`, `vh70`, `vh90`

</details>

### Vertical padding (px)

Drag the control to adjust vertical padding (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `64`.

Range: 16 to 140 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Horizontal padding (px)

Drag the control to adjust horizontal padding (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 14 to 80 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Surface radius (px)

Drag the control to adjust surface radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

## Fallback copy

### Placeholder title

Enter the placeholder title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Service coverage map`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_title`. Type: `text`.

</details>

### Placeholder subtext

Enter the placeholder subtext. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Upload a shaded service-area map image to visually communicate coverage.`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_sub`. Type: `text`.

</details>

### Invalid embed title

Enter the invalid embed title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Map preview unavailable`.

<details><summary>Reference for connected builders</summary>

Setting: `invalid_embed_title`. Type: `text`.

</details>

### Invalid embed note

Enter the invalid embed note. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Paste a valid Google Maps <iframe> embed code, or switch to Static Image mode.`.

<details><summary>Reference for connected builders</summary>

Setting: `invalid_embed_note`. Type: `text`.

</details>

## Custom colors (scoped)

### Use custom colors (scoped)

Turn on “Use custom colors (scoped)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_bg`. Type: `color`.

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_overlay`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_text`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_muted`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_accent`. Type: `color`.

</details>

### Border

Choose a color for border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_border`. Type: `color`.

</details>

## File reference

`sections/maps-service-area-map-banner.liquid`
