# 3rd party - warehouse

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3rd party - warehouse.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 12 blocks can be added.

## Content

Product template only. Curated merchandising; shipping and warehouse availability are managed outside this section. Add Warehouse mapping blocks to connect codes to collections. Up to the first 50 collection products are inspected.

### Kicker

Add a short line of text. Use the available emphasis and link tools; this field is intended for inline content.

Default: `Selected for this product`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `inline_richtext`.

</details>

### Heading

Add a short line of text. Use the available emphasis and link tools; this field is intended for inline content.

Default: `Explore related products`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `inline_richtext`.

</details>

### Body

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Browse this curated collection of related products.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body_richtext`. Type: `richtext`.

</details>

## Behavior

### Source mode

Choose one of the supported options below for source mode. Only the selected option applies; other settings can further customize its appearance.

Auto: product fulfillment.warehouse metaobject with code and collection, then Warehouse mapping blocks by fulfillment.warehouse_code or warehouse:CODE tag. First matching block wins.

Default: `auto_from_warehouse_code`.

Options: Auto from warehouse code, Force collection.

<details><summary>Reference for connected builders</summary>

Setting: `source_mode`. Type: `select`.

`auto_from_warehouse_code`, `force_collection`

</details>

### Force collection (used when source mode = force collection)

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `force_collection`. Type: `collection`.

</details>

### Fallback collection (used when no warehouse match found)

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_collection`. Type: `collection`.

</details>

### Hide if no results

Turn on “Hide if no results” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_if_no_results`. Type: `checkbox`.

</details>

### Empty message (only shown if hide if no results = false)

Add a short line of text. Use the available emphasis and link tools; this field is intended for inline content.

Default: `No related products are available right now.`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_message`. Type: `inline_richtext`.

</details>

### Max products

Drag the control to adjust max products. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 12 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_products`. Type: `range`.

</details>

## Design

### Layout variant

Choose one of the supported options below for layout variant. Only the selected option applies; other settings can further customize its appearance.

Default: `carousel`.

Options: Carousel (scroll-snap), Grid.

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`carousel`, `grid`

</details>

### Columns (desktop)

Drag the control to adjust columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4`.

Range: 3 to 5 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `range`.

</details>

### Show mapped group chip

Turn on “Show mapped group chip” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Labels the curated mapped collection. Forced and fallback collections have no group chip. This does not verify inventory or combined shipping.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_warehouse_chip`. Type: `checkbox`.

</details>

### Chip position

Choose one of the supported options below for chip position. Only the selected option applies; other settings can further customize its appearance.

Default: `card_top_left`.

Options: Card top left, Card top right, Below title (card content).

<details><summary>Reference for connected builders</summary>

Setting: `chip_position`. Type: `select`.

`card_top_left`, `card_top_right`, `below_title`

</details>

## Styling

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Card background color

Choose a color for card background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `card_bg_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Muted text color

Choose a color for muted text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `muted_text_color`. Type: `color`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

### Chip background color

Choose a color for chip background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `chip_bg_color`. Type: `color`.

</details>

### Chip text color

Choose a color for chip text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `chip_text_color`. Type: `color`.

</details>

## Blocks you can add

### Warehouse mapping

#### Warehouse code

Enter the warehouse code. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Matches the current product code, ignoring case and surrounding spaces.

<details><summary>Reference for connected builders</summary>

Setting: `code`. Type: `text`.

</details>

#### Group label

Enter the group label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `richtext`.

</details>

#### Curated collection

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `collection`. Type: `collection`.

</details>

#### Group chip background

Choose a color for group chip background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

<details><summary>Reference for connected builders</summary>

Setting: `chip_color`. Type: `color`.

</details>

## File reference

`sections/3rd-party-warehouse-merch.liquid`
