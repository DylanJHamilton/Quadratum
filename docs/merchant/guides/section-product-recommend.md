# Product recommended

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product recommended.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Template availability: `{"enabled_on": {"templates": ["product"]}, "disabled_on": null}`.

### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Recommended for you`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

Default: `dynamic`.

Options: Dynamic, Collection, Manual.

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`dynamic`, `collection`, `manual`

</details>

### Collection fallback

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

Used when Mode is Collection, or as fallback when Dynamic returns no products.

<details><summary>Reference for connected builders</summary>

Setting: `collection`. Type: `collection`.

</details>

### Max products

Drag the control to adjust max products. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Dynamic recommendations return up to 10 products; manual and collection lists use this limit.

Default: `4`.

Range: 2 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_products`. Type: `range`.

</details>

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid, Carousel.

<details><summary>Reference for connected builders</summary>

Setting: `layout`. Type: `select`.

`grid`, `carousel`

</details>

### Columns (desktop)

Drag the control to adjust columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 2 to 6 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Columns (tablet)

Drag the control to adjust columns (tablet). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `3`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_tablet`. Type: `range`.

</details>

### Columns (mobile)

Drag the control to adjust columns (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_mobile`. Type: `range`.

</details>

### Intent

Choose one of the supported options below for intent. Only the selected option applies; other settings can further customize its appearance.

Default: `related`.

Options: Related, Complementary.

<details><summary>Reference for connected builders</summary>

Setting: `intent`. Type: `select`.

`related`, `complementary`

</details>

## Card actions

### Enable add to cart (quick add)

Turn on “Enable add to cart (quick add)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_quick_add`. Type: `checkbox`.

</details>

### Quick add mode

Choose one of the supported options below for quick add mode. Only the selected option applies; other settings can further customize its appearance.

Default: `button`.

Options: Button, Variant dropdown, Sizes (if size option exists).

<details><summary>Reference for connected builders</summary>

Setting: `quick_add_mode`. Type: `select`.

`button`, `dropdown`, `sizes`

</details>

### Enable quick view

Turn on “Enable quick view” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

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

### Quick view placement

Choose one of the supported options below for quick view placement. Only the selected option applies; other settings can further customize its appearance.

Default: `overlay`.

Options: None, Overlay, Below content, Both.

<details><summary>Reference for connected builders</summary>

Setting: `quick_view_placement`. Type: `select`.

`none`, `overlay`, `below_content`, `both`

</details>

### Show action row below card

Turn on “Show action row below card” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_action_row`. Type: `checkbox`.

</details>

### Show secondary row button

Turn on “Show secondary row button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

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

### Add to cart label

Enter the add to cart label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add to cart`.

<details><summary>Reference for connected builders</summary>

Setting: `primary_cta_label`. Type: `text`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Learn more`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_cta_label`. Type: `text`.

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

### Quick view label

Enter the quick view label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Quick view`.

<details><summary>Reference for connected builders</summary>

Setting: `qv_label`. Type: `text`.

</details>

## Button styling (this section only)

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

### Full width buttons

Turn on “Full width buttons” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `button_full_width`. Type: `checkbox`.

</details>

### Hover strength

Drag the control to adjust hover strength. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_hover_strength`. Type: `range`.

</details>

### Button background

Choose a color for button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg`. Type: `color`.

</details>

### Button text

Choose a color for button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text`. Type: `color`.

</details>

### Button background (hover)

Choose a color for button background (hover). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg_hover`. Type: `color`.

</details>

### Button text (hover)

Choose a color for button text (hover). Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#FFFFFF`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text_hover`. Type: `color`.

</details>

### Button border color

Choose a color for button border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `rgba(0,0,0,0.15)`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_border`. Type: `color`.

</details>

### Button radius (px)

Drag the control to adjust button radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_radius`. Type: `range`.

</details>

### Button font size (px)

Drag the control to adjust button font size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_font_size`. Type: `range`.

</details>

### Button padding Y (px)

Drag the control to adjust button padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `9`.

Range: 6 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_padding_y`. Type: `range`.

</details>

### Button padding X (px)

Drag the control to adjust button padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 8 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_padding_x`. Type: `range`.

</details>

## Blocks you can add

### Product

#### Product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

## File reference

`sections/product-recommend.liquid`
