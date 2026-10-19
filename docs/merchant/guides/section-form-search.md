# Form – site search

[All documentation](../README.md) · [Support](../SUPPORT.md)

Store essentials.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Form – site search.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Site search`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Mode and sources

### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

Default: `basic`.

Options: Submit (basic), Predictive search (typeahead), Finder (guided filters).

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`basic`, `predictive`, `finder`

</details>

### Show scope select

Turn on “Show scope select” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_scope`. Type: `checkbox`.

</details>

### Default scope

Choose one of the supported options below for default scope. Only the selected option applies; other settings can further customize its appearance.

Full Shopify search supports products, articles and pages. Collections are predictive suggestions only; full submission falls back to all supported types.

Default: `all`.

Options: All, Products, Collections, Articles, Pages.

<details><summary>Reference for connected builders</summary>

Setting: `scope_default`. Type: `select`.

`all`, `product`, `collection`, `article`, `page`

</details>

## Predictive settings

### Sources (csv)

Enter the sources (csv). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Use products, collections, articles and pages. Requests use the saved section settings and per-source limit.

Default: `products,collections,articles,pages`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_sources`. Type: `text`.

</details>

### Max per source

Drag the control to adjust max per source. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `5`.

Range: 1 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_limit`. Type: `range`.

</details>

### Min characters to trigger

Drag the control to adjust min characters to trigger. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_minchars`. Type: `range`.

</details>

### Debounce (ms)

Drag the control to adjust debounce (ms). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `160`.

Range: 80 to 600 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_debounce`. Type: `range`.

</details>

## Finder filters

### Enable category

Turn on “Enable category” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_category`. Type: `checkbox`.

</details>

### Category label

Enter the category label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Category`.

<details><summary>Reference for connected builders</summary>

Setting: `category_label`. Type: `text`.

</details>

### Category placeholder

Enter the category placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Any`.

<details><summary>Reference for connected builders</summary>

Setting: `category_placeholder`. Type: `text`.

</details>

### Category options (value\|label per line)

Write the category options (value\|label per line). Keep paragraphs short and preview long text on mobile.

Use Shopify category IDs, for example aa-1\|Category label, matching an enabled category filter. Blank options omit the control.

<details><summary>Reference for connected builders</summary>

Setting: `category_options`. Type: `textarea`.

</details>

### Enable price band

Turn on “Enable price band” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_price`. Type: `checkbox`.

</details>

### Price label

Enter the price label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Price`.

<details><summary>Reference for connected builders</summary>

Setting: `price_label`. Type: `text`.

</details>

### Price placeholder

Enter the price placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Any`.

<details><summary>Reference for connected builders</summary>

Setting: `price_placeholder`. Type: `text`.

</details>

### Price options (value\|label per line)

Write the price options (value\|label per line). Keep paragraphs short and preview long text on mobile.

Optional JS shortcuts in shop currency: <50, 50-150 or 150+. Under uses an upper bound one cent below the value. Native min/max controls work without JS; enable the Shopify price filter.

Default: `<50|Under $50
50-150|$50–$150
150+|$150+`.

<details><summary>Reference for connected builders</summary>

Setting: `price_options`. Type: `textarea`.

</details>

### Enable tag filter

Turn on “Enable tag filter” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_tag`. Type: `checkbox`.

</details>

### Tag label

Enter the tag label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Tag`.

<details><summary>Reference for connected builders</summary>

Setting: `tag_label`. Type: `text`.

</details>

### Tag placeholder

Enter the tag placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Any`.

<details><summary>Reference for connected builders</summary>

Setting: `tag_placeholder`. Type: `text`.

</details>

### Tag options (value\|label per line)

Write the tag options (value\|label per line). Keep paragraphs short and preview long text on mobile.

Use exact catalog tags matching an enabled Shopify tag filter. Blank options omit the control.

<details><summary>Reference for connected builders</summary>

Setting: `tag_options`. Type: `textarea`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Find what you need`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h3`.

Options: H2, H3.

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h2`, `h3`

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Query label

Enter the query label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `query_label`. Type: `text`.

</details>

### Query placeholder

Enter the query placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search products, articles, and more`.

<details><summary>Reference for connected builders</summary>

Setting: `query_placeholder`. Type: `text`.

</details>

### Help text

Write the help text. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `help_text`. Type: `textarea`.

</details>

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

## Navigation

### Target path

Enter the target path. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Use /search or another store-relative path that accepts native search/filter parameters. Locale prefix is retained. External URLs, query strings and fragments fall back to Shopify search.

Default: `/search`.

<details><summary>Reference for connected builders</summary>

Setting: `nav_target`. Type: `text`.

</details>

## Styling

### Template

Choose one of the supported options below for template. Only the selected option applies; other settings can further customize its appearance.

Default: `inline`.

Options: Inline, Card, Split (media + form).

<details><summary>Reference for connected builders</summary>

Setting: `template_style`. Type: `select`.

`inline`, `card`, `split`

</details>

### Surface chrome

Choose one of the supported options below for surface chrome. Only the selected option applies; other settings can further customize its appearance.

Inline always uses a minimal frameless surface. Card and Split use this setting.

Default: `card`.

Options: Card, Frameless (no card).

<details><summary>Reference for connected builders</summary>

Setting: `surface_style`. Type: `select`.

`card`, `frameless`

</details>

### Split media side

Choose one of the supported options below for split media side. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `split_media_side`. Type: `select`.

`left`, `right`

</details>

### Split image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `split_image`. Type: `image_picker`.

</details>

### Form background

Choose a color for form background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `form_bg`. Type: `color`.

</details>

### Input radius

Drag the control to adjust input radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `input_radius`. Type: `range`.

</details>

### Input border color

Choose a color for input border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `input_border`. Type: `color`.

</details>

## Section spacing and BG

### Container width

Choose one of the supported options below for container width. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Padding Y (px)

Drag the control to adjust padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 200 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_y`. Type: `range`.

</details>

### Padding X (px)

Drag the control to adjust padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_x`. Type: `range`.

</details>

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card elevation

Drag the control to adjust card elevation. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 0 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `range`.

</details>

## Overlay (optional)

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Overlay

Choose one of the supported options below for overlay. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Solid, Gradient.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_type`. Type: `select`.

`none`, `solid`, `gradient`

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `30`.

Range: 0 to 100 ; step 5.

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

Default: `35`.

Range: 0 to 100 ; step 5.

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

Range: 0 to 100 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end_opacity`. Type: `range`.

</details>

### Gradient angle

Drag the control to adjust gradient angle. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `180`.

Range: 0 to 360 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_angle`. Type: `range`.

</details>

## Visibility

### Anchor ID

Enter the anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

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

### Quick link

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Best Sellers`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `url`. Type: `url`.

</details>

## File reference

`sections/form-search.liquid`
