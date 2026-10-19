# Product wishlist

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product wishlist.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Content

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Wishlist`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

### Empty title

Enter the empty title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Your wishlist is empty`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_title`. Type: `text`.

</details>

### Empty text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Save products you love and come back anytime. Add items from a product page using the wishlist button.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_text`. Type: `richtext`.

</details>

### Empty button label

Enter the empty button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Browse products`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_button_label`. Type: `text`.

</details>

### Empty button link

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `empty_button_link`. Type: `url`.

</details>

## Behavior

### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

Default: `list_only`.

Options: Button only, List only, Button and list.

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`button_only`, `list_only`, `button_and_list`

</details>

### Wishlist storage key (advanced)

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Default: `q:wishlist:v1`.

<details><summary>Reference for connected builders</summary>

Setting: `wishlist_key`. Type: `text`.

</details>

### Deduplicate by variant ID (recommended)

Turn on “Deduplicate by variant ID (recommended)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `use_variant_id`. Type: `checkbox`.

</details>

### Show count badge

Turn on “Show count badge” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_count_badge`. Type: `checkbox`.

</details>

### Show clear all button

Turn on “Show clear all button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_clear_all`. Type: `checkbox`.

</details>

### Max products to render

Drag the control to adjust max products to render. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 2 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_products`. Type: `range`.

</details>

## Layout (list)

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid, Carousel.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`grid`, `carousel`

</details>

### Columns desktop

Drag the control to adjust columns desktop. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Columns tablet

Drag the control to adjust columns tablet. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_tablet`. Type: `range`.

</details>

### Columns mobile

Drag the control to adjust columns mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_mobile`. Type: `range`.

</details>

### Show price (if supported by product card)

Turn on “Show price (if supported by product card)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_price`. Type: `checkbox`.

</details>

### Show vendor (if supported by product card)

Turn on “Show vendor (if supported by product card)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_vendor`. Type: `checkbox`.

</details>

### Show remove buttons

Turn on “Show remove buttons” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_remove_buttons`. Type: `checkbox`.

</details>

## Styling

This section inherits the theme colors.

### Button style

Choose one of the supported options below for button style. Only the selected option applies; other settings can further customize its appearance.

Default: `secondary`.

Options: Primary, Secondary, Text.

<details><summary>Reference for connected builders</summary>

Setting: `button_style`. Type: `select`.

`primary`, `secondary`, `text`

</details>

### Icon style

Choose one of the supported options below for icon style. Only the selected option applies; other settings can further customize its appearance.

Default: `heart`.

Options: Heart, Bookmark.

<details><summary>Reference for connected builders</summary>

Setting: `icon_style`. Type: `select`.

`heart`, `bookmark`

</details>

### Padding top

Drag the control to adjust padding top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_top`. Type: `range`.

</details>

### Padding bottom

Drag the control to adjust padding bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_bottom`. Type: `range`.

</details>

## File reference

`sections/product-wishlist.liquid`
