# Maps - basic Google map

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Maps - basic Google map.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Configure your real location, coverage and contact information. Native links open Google Maps; embeds load external content. The theme does not verify addresses, coverage, opening hours or service availability. Blank location fields do not select a sample place.

### Map mode

Choose one of the supported options below for map mode. Only the selected option applies; other settings can further customize its appearance.

Default: `embed`.

Options: Embed code (iframe), Address (open in Google maps), Coordinates + zoom (open in Google maps).

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`embed`, `address`, `coords`

</details>

### Google maps embed code (iframe)

Write the google maps embed code (iframe). Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `embed_code`. Type: `textarea`.

</details>

### Address (used for address mode + general fallback link)

Enter the address (used for address mode + general fallback link). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `address`. Type: `text`.

</details>

### Latitude (blank uses theme default)

Enter the latitude (blank uses theme default). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lat`. Type: `text`.

</details>

### Longitude (blank uses theme default)

Enter the longitude (blank uses theme default). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lng`. Type: `text`.

</details>

### Zoom

Drag the control to adjust zoom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 3 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `zoom`. Type: `range`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Directions & Location`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Find us in person`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Body

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Find location details and ways to get in touch.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

### Primary button label

Enter the primary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Open in Google Maps`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Contact us`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_label`. Type: `text`.

</details>

### Secondary button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_url`. Type: `url`.

</details>

### Optional details (hours / parking / notes)

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `details`. Type: `richtext`.

</details>

## Layout

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `split`.

Options: Split (content + map).

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`split`

</details>

### Map side

Choose one of the supported options below for map side. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Right, Left.

<details><summary>Reference for connected builders</summary>

Setting: `map_side`. Type: `select`.

`right`, `left`

</details>

### Style

Choose one of the supported options below for style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Bordered, Minimal, Bleed.

<details><summary>Reference for connected builders</summary>

Setting: `style`. Type: `select`.

`card`, `bordered`, `minimal`, `bleed`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `content_align`. Type: `select`.

`left`, `center`

</details>

### Map height

Drag the control to adjust map height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `380`.

Range: 260 to 760 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `map_height`. Type: `range`.

</details>

## Accessibility + fallback UI

### Iframe title

Enter the iframe title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Map showing our location`.

<details><summary>Reference for connected builders</summary>

Setting: `iframe_title`. Type: `text`.

</details>

### Map panel ARIA label

Enter the map panel aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Location map`.

<details><summary>Reference for connected builders</summary>

Setting: `map_aria_label`. Type: `text`.

</details>

### Placeholder title

Enter the placeholder title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Get directions instantly`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_title`. Type: `text`.

</details>

### Placeholder subtitle

Enter the placeholder subtitle. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Open Google Maps to view routes, ETA, and nearby landmarks.`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_sub`. Type: `text`.

</details>

### Invalid embed note

Enter the invalid embed note. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Tip: Paste a valid Google Maps <iframe> embed code to display the map inline.`.

<details><summary>Reference for connected builders</summary>

Setting: `invalid_embed_note`. Type: `text`.

</details>

## Custom colors (scoped)

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

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

### Surface

Choose a color for surface. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_surface`. Type: `color`.

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

`sections/maps-basic-google-map.liquid`
