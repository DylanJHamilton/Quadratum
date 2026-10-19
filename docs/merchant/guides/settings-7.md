# Search settings

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Search settings.
2. Choose result types and the main form style. Full results support products, pages, and articles; collections are predictive suggestions.
3. Enable predictive search, set its minimum characters, delay, and per-type limits, then style the result panel. Use actual catalog terms to review loading, no-results, and keyboard behavior.
4. The popup has its own heading, placeholder, size, and form style. Product filters require Shopify filter configuration.
5. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
6. Preview a home, product, collection, and cart page before saving shared changes.

## Search forms

### Default search form type

Choose one of the supported options below for default search form type. Only the selected option applies; other settings can further customize its appearance.

Default: `predictive`.

Options: Static search form, Predictive search form.

<details><summary>Reference for connected builders</summary>

Setting: `search_default_form_type`. Type: `select`.

`static`, `predictive`

</details>

### Default search placeholder

Enter the default search placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search products, articles, and pages`.

<details><summary>Reference for connected builders</summary>

Setting: `search_placeholder`. Type: `text`.

</details>

### Search button label

Enter the search button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `search_submit_label`. Type: `text`.

</details>

### View all results label

Enter the view all results label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View all results`.

<details><summary>Reference for connected builders</summary>

Setting: `search_view_all_label`. Type: `text`.

</details>

## Search results page

### Search results layout

Choose one of the supported options below for search results layout. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid, List.

<details><summary>Reference for connected builders</summary>

Setting: `search_results_layout`. Type: `select`.

`grid`, `list`

</details>

### Search results per page

Drag the control to adjust search results per page. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 48 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `search_results_per_page`. Type: `range`.

</details>

### Empty state message

Enter the empty state message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `No results found. Try searching for something else.`.

<details><summary>Reference for connected builders</summary>

Setting: `search_empty_message`. Type: `text`.

</details>

### Show browse links when no results

Turn on “Show browse links when no results” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `search_empty_recommendations`. Type: `checkbox`.

</details>

## Search sources

### Enable products

Turn on “Enable products” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `search_src_products`. Type: `checkbox`.

</details>

### Enable collections

Turn on “Enable collections” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `search_src_collections`. Type: `checkbox`.

</details>

### Enable articles

Turn on “Enable articles” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `search_src_articles`. Type: `checkbox`.

</details>

### Enable pages

Turn on “Enable pages” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `search_src_pages`. Type: `checkbox`.

</details>

## Predictive search behavior

### Enable predictive search

Turn on “Enable predictive search” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_predictive_search`. Type: `checkbox`.

</details>

### Predictive products limit

Drag the control to adjust predictive products limit. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 1 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_products_limit`. Type: `range`.

</details>

### Predictive collections limit

Drag the control to adjust predictive collections limit. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_collections_limit`. Type: `range`.

</details>

### Predictive articles limit

Drag the control to adjust predictive articles limit. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_articles_limit`. Type: `range`.

</details>

### Predictive pages limit

Drag the control to adjust predictive pages limit. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_pages_limit`. Type: `range`.

</details>

### Predictive min characters

Set how many characters a shopper must type before suggestions are requested. This does not prevent submitting a shorter search with the Search button.

Default: `2`.

Range: 1 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_min_chars`. Type: `range`.

</details>

### Predictive debounce (ms)

Set how long the search waits after the last keystroke before requesting suggestions, in milliseconds. For example, 250 means a quarter of a second. A longer delay reduces requests but makes suggestions feel slower.

Default: `250`.

Range: 100 to 500 ; step 25.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_debounce`. Type: `range`.

</details>

### Show group headings

Turn on “Show group headings” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_show_group_headings`. Type: `checkbox`.

</details>

### Show thumbnails

Turn on “Show thumbnails” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_show_thumbnails`. Type: `checkbox`.

</details>

### Show view all link

Turn on “Show view all link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_show_view_all`. Type: `checkbox`.

</details>

## Search popup

### Enable search popup

Turn on “Enable search popup” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_search_popup`. Type: `checkbox`.

</details>

### Popup form type

Choose one of the supported options below for popup form type. Only the selected option applies; other settings can further customize its appearance.

Default: `predictive`.

Options: Static search form, Predictive search form.

<details><summary>Reference for connected builders</summary>

Setting: `search_popup_form_type`. Type: `select`.

`static`, `predictive`

</details>

### Popup search placeholder

Enter the popup search placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search our store`.

<details><summary>Reference for connected builders</summary>

Setting: `search_popup_placeholder`. Type: `text`.

</details>

## Predictive search styling

### Predictive panel style

Choose one of the supported options below for predictive panel style. Only the selected option applies; other settings can further customize its appearance.

Default: `soft`.

Options: Minimal, Soft, Outline, Glass.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_panel_style`. Type: `select`.

`minimal`, `soft`, `outline`, `glass`

</details>

### Predictive products layout

Choose one of the supported options below for predictive products layout. Only the selected option applies; other settings can further customize its appearance.

Default: `list`.

Options: List, Compact list, Grid.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_products_layout`. Type: `select`.

`list`, `compact`, `grid`

</details>

### Thumbnail size

Drag the control to adjust thumbnail size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `56`.

Range: 32 to 96 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_thumbnail_size`. Type: `range`.

</details>

### Panel radius

Drag the control to adjust panel radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_panel_radius`. Type: `range`.

</details>

### Item radius

Drag the control to adjust item radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_item_radius`. Type: `range`.

</details>

### Panel padding

Drag the control to adjust panel padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 8 to 32 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_panel_padding`. Type: `range`.

</details>

### Item padding

Drag the control to adjust item padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 6 to 24 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_item_padding`. Type: `range`.

</details>

### Panel background

Choose a color for panel background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_panel_bg`. Type: `color`.

</details>

### Panel border color

Choose a color for panel border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_panel_border`. Type: `color`.

</details>

### Item background

Choose a color for item background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_item_bg`. Type: `color`.

</details>

### Item hover background

Choose a color for item hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#eef2ff`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_item_hover_bg`. Type: `color`.

</details>

### Group heading color

Choose a color for group heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_heading_color`. Type: `color`.

</details>

### Result title color

Choose a color for result title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_title_color`. Type: `color`.

</details>

### Result meta color

Choose a color for result meta color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_meta_color`. Type: `color`.

</details>

### Price color

Choose a color for price color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `predictive_search_price_color`. Type: `color`.

</details>

### Search page placeholder

Enter the search page placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Leave blank to use the shared search placeholder.

<details><summary>Reference for connected builders</summary>

Setting: `search_page_placeholder`. Type: `text`.

</details>

### Search popup heading

Enter the search popup heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search`.

<details><summary>Reference for connected builders</summary>

Setting: `search_popup_heading`. Type: `text`.

</details>

### Search popup description

Enter the search popup description. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `search_popup_subheading`. Type: `text`.

</details>

### Search popup maximum width

Drag the control to adjust search popup maximum width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `760`.

Range: 320 to 1280 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `search_popup_max_width`. Type: `range`.

</details>

## File reference

`config/settings_schema.json`
