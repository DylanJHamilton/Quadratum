# Feeds - products

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Feeds - products.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Carousel button background

Choose a color for carousel button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_button_bg`. Type: `color`.

</details>

### Carousel button text

Choose a color for carousel button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_button_color`. Type: `color`.

</details>

## Section styling

### Section background

Choose a color for section background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `transparent`.

<details><summary>Reference for connected builders</summary>

Setting: `section_bg`. Type: `color`.

</details>

### Section border

Choose a color for section border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `transparent`.

<details><summary>Reference for connected builders</summary>

Setting: `section_border`. Type: `color`.

</details>

### Section radius (px)

Drag the control to adjust section radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `section_radius`. Type: `range`.

</details>

### Padding Y (px)

Drag the control to adjust padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Padding X (px)

Drag the control to adjust padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

## Source

### Source mode

Choose one of the supported options below for source mode. Only the selected option applies; other settings can further customize its appearance.

Default: `all_products`.

Options: All products (default), Collection (manual), Dynamic: current collection, Manual product selection.

<details><summary>Reference for connected builders</summary>

Setting: `source_mode`. Type: `select`.

`all_products`, `collection`, `dynamic_collection`, `manual_products`

</details>

### Collection (manual mode)

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `collection`. Type: `collection`.

</details>

### Products (manual selection)

Choose existing products in the order you want to feature them. Edit product information in Products.

<details><summary>Reference for connected builders</summary>

Setting: `manual_products`. Type: `product_list`.

</details>

### If manual products is empty

Choose one of the supported options below for if manual products is empty. Only the selected option applies; other settings can further customize its appearance.

Default: `all_products`.

Options: Fallback to all products, Fallback to collection, Show empty state.

<details><summary>Reference for connected builders</summary>

Setting: `manual_products_fallback`. Type: `select`.

`all_products`, `collection`, `empty`

</details>

## Layout mode

### Feed layout (base)

Choose one of the supported options below for feed layout (base). Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid, Carousel.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode`. Type: `select`.

`grid`, `carousel`

</details>

### Layout on mobile (< 990px)

Choose one of the supported options below for layout on mobile (< 990px). Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit base, Grid, Carousel.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode_mobile`. Type: `select`.

`inherit`, `grid`, `carousel`

</details>

### Layout on desktop (≥ 990px)

Choose one of the supported options below for layout on desktop (≥ 990px). Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit base, Grid, Carousel.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode_desktop`. Type: `select`.

`inherit`, `grid`, `carousel`

</details>

## Carousel options

### Show carousel prev/next buttons (header)

Turn on “Show carousel prev/next buttons (header)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_nav`. Type: `checkbox`.

</details>

### Prev label

Enter the prev label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Prev`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_prev_label`. Type: `text`.

</details>

### Next label

Enter the next label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Next`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_next_label`. Type: `text`.

</details>

### Scroll amount

Choose one of the supported options below for scroll amount. Only the selected option applies; other settings can further customize its appearance.

Default: `page`.

Options: One viewport width, One card.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_scroll_amount`. Type: `select`.

`page`, `card`

</details>

### Enable snap-to-card

Turn on “Enable snap-to-card” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_snap`. Type: `checkbox`.

</details>

### Hide scrollbar (where supported)

Turn on “Hide scrollbar (where supported)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `carousel_hide_scrollbar`. Type: `checkbox`.

</details>

## Header

### Show header

Turn on “Show header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_header`. Type: `checkbox`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Browse products`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Explore the catalog.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

### Show collection title (when available)

Turn on “Show collection title (when available)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_collection_title`. Type: `checkbox`.

</details>

## Sorting + filters UI

### Show sort dropdown (collection feeds only)

Turn on “Show sort dropdown (collection feeds only)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_sort_dropdown`. Type: `checkbox`.

</details>

### Sort label

Enter the sort label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Sort`.

<details><summary>Reference for connected builders</summary>

Setting: `sort_label`. Type: `text`.

</details>

### Show active filter count badge (when possible)

Turn on “Show active filter count badge (when possible)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_filter_count`. Type: `checkbox`.

</details>

## Columns per breakpoint

### Columns (phone)

Drag the control to adjust columns (phone). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_phone`. Type: `range`.

</details>

### Columns (tablet)

Drag the control to adjust columns (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_tablet`. Type: `range`.

</details>

### Columns (laptop)

Drag the control to adjust columns (laptop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 1 to 8 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_laptop`. Type: `range`.

</details>

### Columns (desktop)

Drag the control to adjust columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `5`.

Range: 1 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Card density

Choose one of the supported options below for card density. Only the selected option applies; other settings can further customize its appearance.

Default: `compact`.

Options: Comfortable, Compact.

<details><summary>Reference for connected builders</summary>

Setting: `card_density`. Type: `select`.

`comfortable`, `compact`

</details>

## Filters (layout hook)

### Enable sidebar filters toggle (layout hook only)

Turn on “Enable sidebar filters toggle (layout hook only)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_filters_toggle`. Type: `checkbox`.

</details>

### Filters toggle label

Enter the filters toggle label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Filters`.

<details><summary>Reference for connected builders</summary>

Setting: `filters_toggle_label`. Type: `text`.

</details>

## Content

### Sort order (collection feeds only)

Choose one of the supported options below for sort order (collection feeds only). Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit collection default, Newest, Price (low → high), Price (high → low), Alphabetical.

<details><summary>Reference for connected builders</summary>

Setting: `sort_order`. Type: `select`.

`inherit`, `created-descending`, `price-ascending`, `price-descending`, `title-ascending`

</details>

### Products per page

Drag the control to adjust products per page. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 8 to 48 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `products_per_page`. Type: `range`.

</details>

## Behavior

### Pagination mode (collection feeds only)

Choose one of the supported options below for pagination mode (collection feeds only). Only the selected option applies; other settings can further customize its appearance.

Default: `load_more`.

Options: Standard pagination, Load more button, Infinite scroll.

<details><summary>Reference for connected builders</summary>

Setting: `pagination_mode`. Type: `select`.

`pagination`, `load_more`, `infinite`

</details>

### Previous label

Enter the previous label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Previous`.

<details><summary>Reference for connected builders</summary>

Setting: `prev_label`. Type: `text`.

</details>

### Next label

Enter the next label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Next`.

<details><summary>Reference for connected builders</summary>

Setting: `next_label`. Type: `text`.

</details>

### Load more label

Enter the load more label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Load more`.

<details><summary>Reference for connected builders</summary>

Setting: `load_more_label`. Type: `text`.

</details>

## Shapeshift preset

### Card preset

Choose one of the supported options below for card preset. Only the selected option applies; other settings can further customize its appearance.

Default: `catalog`.

Options: Editorial (fashion / ivy-style), Tech (dense / spec-forward), Catalog (universal default), Minimal (clean / airy), Pill (soft UI).

<details><summary>Reference for connected builders</summary>

Setting: `card_preset`. Type: `select`.

`editorial`, `tech`, `catalog`, `minimal`, `pill`

</details>

## Media

### Media mode

Choose one of the supported options below for media mode. Only the selected option applies; other settings can further customize its appearance.

Default: `single`.

Options: Single image, Hover swap (2nd image when available), Scroll gallery (no JS, swipeable).

<details><summary>Reference for connected builders</summary>

Setting: `media_mode`. Type: `select`.

`single`, `swap`, `scroll`

</details>

### Gallery image limit (scroll mode)

Drag the control to adjust gallery image limit (scroll mode). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 2 to 8 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `scroll_gallery_limit`. Type: `range`.

</details>

### Media ratio (padding-top %)

Drag the control to adjust media ratio (padding-top %). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `135`.

Range: 60 to 170 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `media_ratio`. Type: `range`.

</details>

### Media fit

Choose one of the supported options below for media fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `media_fit`. Type: `select`.

`cover`, `contain`

</details>

### Image hover zoom

Turn on “Image hover zoom” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `image_zoom`. Type: `checkbox`.

</details>

## Hover + actions

### Hover treatment

Choose one of the supported options below for hover treatment. Only the selected option applies; other settings can further customize its appearance.

Default: `overlay_actions`.

Options: None, Zoom only, Dim image, Overlay actions (quick add/view), Swap only (no overlay).

<details><summary>Reference for connected builders</summary>

Setting: `hover_treatment`. Type: `select`.

`none`, `media_zoom`, `media_dim`, `overlay_actions`, `swap_only`

</details>

### Hover overlay opacity (%)

Drag the control to adjust hover overlay opacity (%). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 0 to 80 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `hover_overlay_opacity`. Type: `range`.

</details>

### Show hover actions

Choose one of the supported options below for show hover actions. Only the selected option applies; other settings can further customize its appearance.

Default: `desktop_only`.

Options: Always, Desktop only, Never.

<details><summary>Reference for connected builders</summary>

Setting: `hover_actions_visibility`. Type: `select`.

`always`, `desktop_only`, `never`

</details>

### Actions layout

Choose one of the supported options below for actions layout. Only the selected option applies; other settings can further customize its appearance.

Default: `stack`.

Options: Stack, Split (side-by-side).

<details><summary>Reference for connected builders</summary>

Setting: `actions_layout`. Type: `select`.

`stack`, `split`

</details>

## Typography

### Text alignment

Choose one of the supported options below for text alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `text_align`. Type: `select`.

`left`, `center`

</details>

### Title size

Drag the control to adjust title size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `title_size`. Type: `range`.

</details>

### Title weight

Choose one of the supported options below for title weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: Regular (400), Medium (500), Semibold (600), Bold (700).

<details><summary>Reference for connected builders</summary>

Setting: `title_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

### Price size

Drag the control to adjust price size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `price_size`. Type: `range`.

</details>

### Price weight

Choose one of the supported options below for price weight. Only the selected option applies; other settings can further customize its appearance.

Default: `600`.

Options: Regular (400), Medium (500), Semibold (600), Bold (700).

<details><summary>Reference for connected builders</summary>

Setting: `price_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

## Title style preset

### Title style preset

Choose one of the supported options below for title style preset. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit theme, Coquette (uses --q-font-accent if available).

<details><summary>Reference for connected builders</summary>

Setting: `title_style`. Type: `select`.

`inherit`, `coquette`

</details>

## Badges

### Show badges

Turn on “Show badges” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_badges`. Type: `checkbox`.

</details>

### Sale badge

Turn on “Sale badge” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_sale`. Type: `checkbox`.

</details>

### New badge

Turn on “New badge” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_new`. Type: `checkbox`.

</details>

### Tag badges

Turn on “Tag badges” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_tags`. Type: `checkbox`.

</details>

### Fulfilled by supplier badge (future)

Turn on “Fulfilled by supplier badge (future)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_fulfilled`. Type: `checkbox`.

</details>

### Badge style

Choose one of the supported options below for badge style. Only the selected option applies; other settings can further customize its appearance.

Default: `pill`.

Options: Pill, Rectangle.

<details><summary>Reference for connected builders</summary>

Setting: `badge_style`. Type: `select`.

`pill`, `rect`

</details>

### Badge fill

Choose one of the supported options below for badge fill. Only the selected option applies; other settings can further customize its appearance.

Default: `filled`.

Options: Filled, Outline.

<details><summary>Reference for connected builders</summary>

Setting: `badge_fill`. Type: `select`.

`filled`, `outline`

</details>

### Badge position

Choose one of the supported options below for badge position. Only the selected option applies; other settings can further customize its appearance.

Default: `top_left`.

Options: Top left, Top right, Bottom left, Bottom right.

<details><summary>Reference for connected builders</summary>

Setting: `badge_position`. Type: `select`.

`top_left`, `top_right`, `bottom_left`, `bottom_right`

</details>

## Price display

### Price display

Choose one of the supported options below for price display. Only the selected option applies; other settings can further customize its appearance.

Default: `simple`.

Options: Simple price, Price range (variants).

<details><summary>Reference for connected builders</summary>

Setting: `price_mode`. Type: `select`.

`simple`, `range`

</details>

## Reviews

### Show rating summary (when available)

Turn on “Show rating summary (when available)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_reviews`. Type: `checkbox`.

</details>

### Reviews source

Choose one of the supported options below for reviews source. Only the selected option applies; other settings can further customize its appearance.

Default: `shopify`.

Options: Shopify standard metafields (reviews.rating), None.

<details><summary>Reference for connected builders</summary>

Setting: `reviews_source`. Type: `select`.

`shopify`, `none`

</details>

### Show review count (when available)

Turn on “Show review count (when available)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `reviews_show_count`. Type: `checkbox`.

</details>

## Variant display (swatches)

### Show swatches (when variants exist)

Turn on “Show swatches (when variants exist)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_variant_swatches`. Type: `checkbox`.

</details>

### Swatch option name (e.g., color)

Enter the swatch option name (e.g., color). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Color`.

<details><summary>Reference for connected builders</summary>

Setting: `swatch_option_name`. Type: `text`.

</details>

### Swatch style

Choose one of the supported options below for swatch style. Only the selected option applies; other settings can further customize its appearance.

Default: `dot`.

Options: Dots, Squares, Text pills.

<details><summary>Reference for connected builders</summary>

Setting: `swatch_style`. Type: `select`.

`dot`, `square`, `text`

</details>

### Swatch limit per product

Drag the control to adjust swatch limit per product. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 3 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `swatch_limit`. Type: `range`.

</details>

## Product meta

### Show product meta row

Turn on “Show product meta row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_product_meta`. Type: `checkbox`.

</details>

### Show vendor

Turn on “Show vendor” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `meta_show_vendor`. Type: `checkbox`.

</details>

### Show product type

Turn on “Show product type” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `meta_show_type`. Type: `checkbox`.

</details>

### Show SKU (from selected/first variant)

Turn on “Show SKU (from selected/first variant)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `meta_show_sku`. Type: `checkbox`.

</details>

### Show availability (in stock / sold out)

Turn on “Show availability (in stock / sold out)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `meta_show_availability`. Type: `checkbox`.

</details>

## Buttons + ctas

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `filled`.

Options: Filled, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_style`. Type: `select`.

`filled`, `outline`, `ghost`

</details>

### Button size

Choose one of the supported options below for button size. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `button_size`. Type: `select`.

`sm`, `md`, `lg`

</details>

### Buttons full width

Turn on “Buttons full width” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `button_full_width`. Type: `checkbox`.

</details>

### Button hover effect strength

Drag the control to adjust button hover effect strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `button_hover_strength`. Type: `range`.

</details>

## Button labels

### Add to cart label

Enter the add to cart label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add to cart`.

<details><summary>Reference for connected builders</summary>

Setting: `label_add_to_cart`. Type: `text`.

</details>

### Add to bag label

Enter the add to bag label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add to bag`.

<details><summary>Reference for connected builders</summary>

Setting: `label_add_to_bag`. Type: `text`.

</details>

### Select options label

Enter the select options label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Select options`.

<details><summary>Reference for connected builders</summary>

Setting: `label_select_options`. Type: `text`.

</details>

### Sold out label

Enter the sold out label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Sold out`.

<details><summary>Reference for connected builders</summary>

Setting: `label_sold_out`. Type: `text`.

</details>

### Learn more label (view product)

Enter the learn more label (view product). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `label_learn_more`. Type: `text`.

</details>

### Quick view label (modal/drawer trigger)

Enter the quick view label (modal/drawer trigger). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Quick view`.

<details><summary>Reference for connected builders</summary>

Setting: `label_quick_view`. Type: `text`.

</details>

## Quick add + quick view

### Enable quick add

Turn on “Enable quick add” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_quick_add`. Type: `checkbox`.

</details>

### Quick add presentation

Choose one of the supported options below for quick add presentation. Only the selected option applies; other settings can further customize its appearance.

Default: `sizes`.

Options: Button, Icon, Sizes grid (when applicable), Variants dropdown (when applicable).

<details><summary>Reference for connected builders</summary>

Setting: `quick_add_mode`. Type: `select`.

`button`, `icon`, `sizes`, `dropdown`

</details>

### Enable quick view

Turn on “Enable quick view” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_quick_view`. Type: `checkbox`.

</details>

### Quick view mode

Choose one of the supported options below for quick view mode. Only the selected option applies; other settings can further customize its appearance.

Default: `drawer`.

Options: Drawer, Modal.

<details><summary>Reference for connected builders</summary>

Setting: `quick_view_mode`. Type: `select`.

`drawer`, `modal`

</details>

## Quick view placement

### Quick view placement

Choose one of the supported options below for quick view placement. Only the selected option applies; other settings can further customize its appearance.

Default: `below_content`.

Options: Overlay (on image hover), Below title/price, Both, None.

<details><summary>Reference for connected builders</summary>

Setting: `quick_view_placement`. Type: `select`.

`overlay`, `below_content`, `both`, `none`

</details>

## Action row (bottom buttons)

### Show always-visible action row

Turn on “Show always-visible action row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_action_row`. Type: `checkbox`.

</details>

### Show learn more in row

Turn on “Show learn more in row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_secondary_row_cta`. Type: `checkbox`.

</details>

### Show quick view in row

Turn on “Show quick view in row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_row_quick_view`. Type: `checkbox`.

</details>

## Color overrides

### Enable color overrides (per-section)

Turn on “Enable color overrides (per-section)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_color_overrides`. Type: `checkbox`.

</details>

### Card background

Choose a color for card background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `card_bg`. Type: `color`.

</details>

### Card border

Choose a color for card border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e6e6e6`.

<details><summary>Reference for connected builders</summary>

Setting: `card_border`. Type: `color`.

</details>

### Title color

Choose a color for title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `title_color`. Type: `color`.

</details>

### Meta color

Choose a color for meta color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `meta_color`. Type: `color`.

</details>

### Price color

Choose a color for price color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `price_color`. Type: `color`.

</details>

### Compare price color

Choose a color for compare price color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#9ca3af`.

<details><summary>Reference for connected builders</summary>

Setting: `compare_price_color`. Type: `color`.

</details>

### Badge background

Choose a color for badge background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_bg`. Type: `color`.

</details>

### Badge text

Choose a color for badge text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text`. Type: `color`.

</details>

### Badge border (outline)

Choose a color for badge border (outline). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_border`. Type: `color`.

</details>

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text`. Type: `color`.

</details>

### Button border

Choose a color for button border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_border`. Type: `color`.

</details>

### Button background (hover)

Choose a color for button background (hover). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg_hover`. Type: `color`.

</details>

### Button text (hover)

Choose a color for button text (hover). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text_hover`. Type: `color`.

</details>

### Hover overlay color

Choose a color for hover overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `hover_overlay_color`. Type: `color`.

</details>

## Empty states

### No source title

Enter the no source title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Nothing to show`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_title`. Type: `text`.

</details>

### No source text

Enter the no source text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Choose a source in the section settings.`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_text`. Type: `text`.

</details>

### No products title

Enter the no products title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `No products found`.

<details><summary>Reference for connected builders</summary>

Setting: `no_products_title`. Type: `text`.

</details>

### No products text

Enter the no products text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Try a different collection or adjust filters.`.

<details><summary>Reference for connected builders</summary>

Setting: `no_products_text`. Type: `text`.

</details>

## File reference

`sections/feeds-product-grid.liquid`
