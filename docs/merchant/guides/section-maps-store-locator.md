# Maps - store locator

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Maps - store locator.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Location cards, contact links and directions work without an API key. Search matches your configured location text. Directions open Google Maps in a new tab; no geocoding or distance calculation is performed by the theme.

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Locations`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Find a Location Near You`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Browse our locations and get directions in seconds.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

## Map + list layout

### Show editor location preview

Turn on “Show editor location preview” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Editor only: relative pin layout, not a real map or geographic service.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `dev_preview_map`. Type: `checkbox`.

</details>

### Layout direction

Choose one of the supported options below for layout direction. Only the selected option applies; other settings can further customize its appearance.

Default: `map_left`.

Options: Map left / list right, List left / map right.

<details><summary>Reference for connected builders</summary>

Setting: `layout_direction`. Type: `select`.

`map_left`, `list_left`

</details>

### Map height (px)

Drag the control to adjust map height (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `520`.

Range: 320 to 760 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `map_height`. Type: `range`.

</details>

### Map ARIA label

Enter the map aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Store locator map`.

<details><summary>Reference for connected builders</summary>

Setting: `map_aria_label`. Type: `text`.

</details>

## Search + filters

### Enable search

Turn on “Enable search” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_search`. Type: `checkbox`.

</details>

### Search field label

Enter the search field label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search locations`.

<details><summary>Reference for connected builders</summary>

Setting: `search_label`. Type: `text`.

</details>

### Search placeholder

Enter the search placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search by city, ZIP, or keyword…`.

<details><summary>Reference for connected builders</summary>

Setting: `search_placeholder`. Type: `text`.

</details>

### Enable tag filters

Turn on “Enable tag filters” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_filters`. Type: `checkbox`.

</details>

### All filter label

Enter the all filter label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `All`.

<details><summary>Reference for connected builders</summary>

Setting: `filter_all_label`. Type: `text`.

</details>

## Map defaults

## Card + pin labels

### Card primary button label

Enter the card primary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View Location`.

<details><summary>Reference for connected builders</summary>

Setting: `card_primary_label`. Type: `text`.

</details>

### Card directions label

Enter the card directions label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Directions`.

<details><summary>Reference for connected builders</summary>

Setting: `card_directions_label`. Type: `text`.

</details>

## Design + spacing

### Max width (px)

Drag the control to adjust max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 900 to 1700 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Section padding Y (px)

Drag the control to adjust section padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Section padding X (px)

Drag the control to adjust section padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 60 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Column gap (px)

Drag the control to adjust column gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 10 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Surface radius (px)

Drag the control to adjust surface radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

### Shadow strength

Drag the control to adjust shadow strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0.4`.

Range: 0 to 1 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `shadow_strength`. Type: `range`.

</details>

## Custom colors

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

## Blocks you can add

### Location

#### Location name

Enter the location name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `name`. Type: `text`.

</details>

#### Address

Write the address. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `address`. Type: `textarea`.

</details>

#### Latitude

Enter the latitude. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lat`. Type: `text`.

</details>

#### Longitude

Enter the longitude. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lng`. Type: `text`.

</details>

#### Phone

Enter the phone. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `phone`. Type: `text`.

</details>

#### Email

Enter the email. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `email`. Type: `text`.

</details>

#### Hours

Enter the hours. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `hours`. Type: `text`.

</details>

#### Tags (comma-separated)

Enter the tags (comma-separated). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `tags`. Type: `text`.

</details>

#### Location page URL (optional)

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `url`. Type: `url`.

</details>

## File reference

`sections/maps-store-locator.liquid`
