# Interactive presearch

[All documentation](../README.md) · [Support](../SUPPORT.md)

Store essentials.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Interactive presearch.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Search products, collections, articles, and pages.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

## Scope

### Search scope

Choose one of the supported options below for search scope. Only the selected option applies; other settings can further customize its appearance.

Default: `all`.

Options: All, Products only, Articles only, Pages only.

<details><summary>Reference for connected builders</summary>

Setting: `search_scope`. Type: `select`.

`all`, `products_only`, `articles_only`, `pages_only`

</details>

### Restrict product results to collection (optional)

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

Filters returned product suggestions only; full search is not restricted. The API can return at most 10 suggestions per type before this filter.

<details><summary>Reference for connected builders</summary>

Setting: `restrict_to_collection`. Type: `collection`.

</details>

## Panel layout

### Results layout

Choose one of the supported options below for results layout. Only the selected option applies; other settings can further customize its appearance.

Default: `cards`.

Options: Cards (products grid), Rows, Compact, Media (thumbnails).

<details><summary>Reference for connected builders</summary>

Setting: `panel_layout`. Type: `select`.

`cards`, `rows`, `compact`, `media`

</details>

## Copy

### Placeholder

Enter the placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search products, articles, and more…`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_text`. Type: `text`.

</details>

### Input label (accessibility)

Enter the input label (accessibility). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `input_label`. Type: `text`.

</details>

### Submit label

Enter the submit label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `submit_label`. Type: `text`.

</details>

### No results text

Enter the no results text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `No results found for`.

<details><summary>Reference for connected builders</summary>

Setting: `no_results_text`. Type: `text`.

</details>

### View all results label

Enter the view all results label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View all results`.

<details><summary>Reference for connected builders</summary>

Setting: `view_all_results_label`. Type: `text`.

</details>

## Suggestions

### Max suggestions (request baseline)

Drag the control to adjust max suggestions (request baseline). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

The request uses this baseline or the largest enabled group limit, capped at Shopify’s 10 results per type.

Default: `8`.

Range: 4 to 16 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_suggestions`. Type: `range`.

</details>

### Min characters

Drag the control to adjust min characters. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `min_chars`. Type: `range`.

</details>

### Debounce (ms)

Drag the control to adjust debounce (ms). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `200`.

Range: 120 to 500 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `debounce_ms`. Type: `range`.

</details>

### Open on focus (when query is long enough)

Turn on “Open on focus (when query is long enough)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_on_focus`. Type: `checkbox`.

</details>

### Close on escape

Turn on “Close on escape” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `close_on_escape`. Type: `checkbox`.

</details>

## Per-group limits (display)

### Products shown

Drag the control to adjust products shown. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 1 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `limit_products`. Type: `range`.

</details>

### Collections shown

Drag the control to adjust collections shown. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 0 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `limit_collections`. Type: `range`.

</details>

### Articles shown

Drag the control to adjust articles shown. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 0 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `limit_articles`. Type: `range`.

</details>

### Pages shown

Drag the control to adjust pages shown. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 0 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `limit_pages`. Type: `range`.

</details>

### Show popular queries

Turn on “Show popular queries” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_popular_queries`. Type: `checkbox`.

</details>

### Popular queries (one per line)

Write the popular queries (one per line). Keep paragraphs short and preview long text on mobile.

Default: `Best sellers
New arrivals
Sale`.

<details><summary>Reference for connected builders</summary>

Setting: `popular_queries`. Type: `textarea`.

</details>

### Show recent searches (localstorage)

Turn on “Show recent searches (localstorage)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_recent_searches`. Type: `checkbox`.

</details>

## Layout

### Max width

Drag the control to adjust max width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `100`.

Range: 50 to 100 %; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Vertical padding

Drag the control to adjust vertical padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `56`.

Range: 0 to 100 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Horizontal padding

Drag the control to adjust horizontal padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 80 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Gap

Drag the control to adjust gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `22`.

Range: 8 to 60 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

### Panel max height

Drag the control to adjust panel max height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `62`.

Range: 30 to 90 vh; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `panel_max_h`. Type: `range`.

</details>

### Thumbnail size (media layout)

Drag the control to adjust thumbnail size (media layout). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `60`.

Range: 40 to 84 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `thumb_size`. Type: `range`.

</details>

## Colors (scoped)

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `color`.

</details>

### Muted

Choose a color for muted. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `muted`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `accent`. Type: `color`.

</details>

### Surface

Choose a color for surface. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f9`.

<details><summary>Reference for connected builders</summary>

Setting: `surface`. Type: `color`.

</details>

### Border

Choose a color for border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `border`. Type: `color`.

</details>

## Frame

### Radius

Drag the control to adjust radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 32 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

### Shadow strength

Choose one of the supported options below for shadow strength. Only the selected option applies; other settings can further customize its appearance.

Default: `soft`.

Options: None, Soft, Medium.

<details><summary>Reference for connected builders</summary>

Setting: `shadow_strength`. Type: `select`.

`none`, `soft`, `medium`

</details>

## Typography

### Input text size

Drag the control to adjust input text size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `input_fs`. Type: `range`.

</details>

### Group heading size

Drag the control to adjust group heading size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 16 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `group_heading_fs`. Type: `range`.

</details>

### Result title size

Drag the control to adjust result title size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 20 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `result_title_fs`. Type: `range`.

</details>

### Result meta size

Drag the control to adjust result meta size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 16 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `result_meta_fs`. Type: `range`.

</details>

## File reference

`sections/interactive-content-helper-predictive-search.liquid`
