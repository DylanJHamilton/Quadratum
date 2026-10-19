# Product bundles

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Product bundles.
2. Select manual products or a collection first. Choose an optional product metafield reference only when you already have a suitable definition.
3. The section adds selected products as separate cart lines. It does not create a bundle SKU or apply a discount. Configure real automatic discounts separately in Shopify.
4. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
5. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
6. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

## Source

### Bundle source mode

Choose one of the supported options below for bundle source mode. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (metaobject + blocks + collection), Metaobject only, Blocks only, Collection + rules only.

<details><summary>Reference for connected builders</summary>

Setting: `source_mode`. Type: `select`.

`auto`, `metaobject`, `blocks`, `collection`

</details>

### When multiple sources exist

Choose one of the supported options below for when multiple sources exist. Only the selected option applies; other settings can further customize its appearance.

Checks Metaobjects, Blocks, then Collection.

Default: `append`.

Options: Append (combine sources), Use first nonempty source.

<details><summary>Reference for connected builders</summary>

Setting: `merge_mode`. Type: `select`.

`append`, `replace`

</details>

### Max bundle items rendered

Drag the control to adjust max bundle items rendered. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 1 to 16 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_items`. Type: `range`.

</details>

### Show currency code

Turn on “Show currency code” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_currency_code`. Type: `checkbox`.

</details>

## Metaobject bundle (A)

### Bundle reference metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `custom`.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_reference_namespace`. Type: `text`.

</details>

### Bundle reference metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Optional product metafield containing a metaobject reference. Manual content works without a metafield.

Default: `bundle`.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_reference_key`. Type: `text`.

</details>

## Collection bundle (C)

### Collection source

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `bundle_collection`. Type: `collection`.

</details>

### Max collection products to scan

Drag the control to adjust max collection products to scan. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 1 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `collection_limit`. Type: `range`.

</details>

### Require tag (optional)

Enter the require tag (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `rule_tag`. Type: `text`.

</details>

### Exclude tag (optional)

Enter the exclude tag (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `exclude_tag`. Type: `text`.

</details>

### Require vendor (optional)

Enter the require vendor (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `rule_vendor`. Type: `text`.

</details>

### Require product type

Enter the require product type. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `rule_type`. Type: `text`.

</details>

### Default quantity per collection item

Enter a number for default quantity per collection item. Follow the unit and instructions shown below. A number alone does not create a Shopify discount, shipping rate, or inventory rule.

Default: `1`.

<details><summary>Reference for connected builders</summary>

Setting: `collection_item_qty`. Type: `number`.

</details>

### Collection items are optional

Turn on “Collection items are optional” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `collection_items_optional`. Type: `checkbox`.

</details>

### Collection badge text (optional)

Enter the collection badge text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `collection_badge`. Type: `text`.

</details>

## Header content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bundle & Save`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Recommended Bundle`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Enter the subheading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add everything you need in one click`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `text`.

</details>

### Description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Choose your bundle items below. Optional add-ons can be toggled on or off.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `richtext`.

</details>

## Behavior

### Allow quantity per item

Turn on “Allow quantity per item” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `allow_item_qty`. Type: `checkbox`.

</details>

### Disable unavailable items

Turn on “Disable unavailable items” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `disable_unavailable_items`. Type: `checkbox`.

</details>

### Redirect to cart after add

Turn on “Redirect to cart after add” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `redirect_to_cart`. Type: `checkbox`.

</details>

## Labels and microcopy

### Included label

Enter the included label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Included`.

<details><summary>Reference for connected builders</summary>

Setting: `included_label`. Type: `text`.

</details>

### Optional label

Enter the optional label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add to bundle`.

<details><summary>Reference for connected builders</summary>

Setting: `optional_label`. Type: `text`.

</details>

### Quantity label

Enter the quantity label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Qty`.

<details><summary>Reference for connected builders</summary>

Setting: `qty_label`. Type: `text`.

</details>

### Button text

Enter the button text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add bundle to cart`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text`. Type: `text`.

</details>

### Success message

Enter the success message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bundle added to cart.`.

<details><summary>Reference for connected builders</summary>

Setting: `msg_added`. Type: `text`.

</details>

### Error fallback message

Enter the error fallback message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Sorry — something went wrong adding your bundle.`.

<details><summary>Reference for connected builders</summary>

Setting: `msg_error`. Type: `text`.

</details>

### No items selected error

Enter the no items selected error. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Please select at least one bundle item.`.

<details><summary>Reference for connected builders</summary>

Setting: `err_no_items`. Type: `text`.

</details>

### Out of stock text

Enter the out of stock text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Unavailable`.

<details><summary>Reference for connected builders</summary>

Setting: `oos_text`. Type: `text`.

</details>

## Summary panel

### Summary title

Enter the summary title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bundle Summary`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_title`. Type: `text`.

</details>

### Items label

Enter the items label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Items`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_items_label`. Type: `text`.

</details>

### Subtotal label

Enter the subtotal label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Subtotal`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_subtotal_label`. Type: `text`.

</details>

### Show compare total

Turn on “Show compare total” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_compare_total`. Type: `checkbox`.

</details>

### Compare label

Enter the compare label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Compare`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_compare_label`. Type: `text`.

</details>

### Show savings

Turn on “Show savings” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_savings`. Type: `checkbox`.

</details>

### Savings prefix

Enter the savings prefix. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `You save `.

<details><summary>Reference for connected builders</summary>

Setting: `savings_prefix`. Type: `text`.

</details>

### Savings default text

Enter the savings default text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Bundle savings will appear here.`.

<details><summary>Reference for connected builders</summary>

Setting: `savings_default_text`. Type: `text`.

</details>

### Sticky summary (desktop)

Turn on “Sticky summary (desktop)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_summary`. Type: `checkbox`.

</details>

### Sticky offset top (px)

Drag the control to adjust sticky offset top (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_top`. Type: `range`.

</details>

## Trust row

### Show trust row

Turn on “Show trust row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_trust_row`. Type: `checkbox`.

</details>

### Trust line 1

Enter the trust line 1. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fast shipping`.

<details><summary>Reference for connected builders</summary>

Setting: `trust_text_1`. Type: `text`.

</details>

### Trust line 2

Enter the trust line 2. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Easy returns`.

<details><summary>Reference for connected builders</summary>

Setting: `trust_text_2`. Type: `text`.

</details>

### Trust line 3

Enter the trust line 3. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Secure checkout`.

<details><summary>Reference for connected builders</summary>

Setting: `trust_text_3`. Type: `text`.

</details>

### Trust margin top

Drag the control to adjust trust margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `trust_mt`. Type: `range`.

</details>

### Trust gap

Drag the control to adjust trust gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 0 to 20 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `trust_gap`. Type: `range`.

</details>

### Trust color

Choose a color for trust color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `trust_color`. Type: `color`.

</details>

### Trust font size

Drag the control to adjust trust font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `13`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `trust_size`. Type: `range`.

</details>

### Trust font weight

Drag the control to adjust trust font weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `500`.

Range: 300 to 800 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `trust_weight`. Type: `range`.

</details>

## Empty state

### Empty title

Enter the empty title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `No bundle items configured`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_title`. Type: `text`.

</details>

### Empty text

Enter the empty text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add bundle items via metaobject, blocks, or collection mode.`.

<details><summary>Reference for connected builders</summary>

Setting: `empty_text`. Type: `text`.

</details>

## Layout

### Layout mode

Choose one of the supported options below for layout mode. Only the selected option applies; other settings can further customize its appearance.

Default: `grid`.

Options: Grid (items + summary below on mobile), Stack (single column), Split (items left, summary right).

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode`. Type: `select`.

`grid`, `stack`, `split`

</details>

### Grid columns (desktop)

Drag the control to adjust grid columns (desktop). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 1 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `grid_cols`. Type: `range`.

</details>

### Gap

Drag the control to adjust gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 40 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

## Container styling

### Max width (px)

Drag the control to adjust max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 680 to 1400 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `container_max_width`. Type: `range`.

</details>

### Padding Y

Drag the control to adjust padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 80 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `container_pad_y`. Type: `range`.

</details>

### Padding X

Drag the control to adjust padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 80 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `container_pad_x`. Type: `range`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `container_bg`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e6e6e6`.

<details><summary>Reference for connected builders</summary>

Setting: `container_border_color`. Type: `color`.

</details>

### Border radius

Drag the control to adjust border radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `container_radius`. Type: `range`.

</details>

### Box shadow

Enter the box shadow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `0 6px 20px rgba(0,0,0,.06)`.

<details><summary>Reference for connected builders</summary>

Setting: `container_shadow`. Type: `text`.

</details>

## Header styling

### Header alignment

Choose one of the supported options below for header alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `header_align`. Type: `select`.

`left`, `center`, `right`

</details>

### Header margin bottom

Drag the control to adjust header margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 60 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `header_mb`. Type: `range`.

</details>

## Kicker styling

### Kicker color

Choose a color for kicker color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_color`. Type: `color`.

</details>

### Kicker size

Drag the control to adjust kicker size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_size`. Type: `range`.

</details>

### Kicker weight

Drag the control to adjust kicker weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `600`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_weight`. Type: `range`.

</details>

### Kicker letter spacing (x100 em)

Drag the control to adjust kicker letter spacing (x100 em). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `6`.

Range: 0 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_letter_spacing`. Type: `range`.

</details>

### Kicker line height

Drag the control to adjust kicker line height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1.2`.

Range: 1 to 2 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_line_height`. Type: `range`.

</details>

### Kicker margin bottom

Drag the control to adjust kicker margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_mb`. Type: `range`.

</details>

## Heading styling

### Heading color

Choose a color for heading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `heading_color`. Type: `color`.

</details>

### Heading size

Drag the control to adjust heading size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `32`.

Range: 18 to 64 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_size`. Type: `range`.

</details>

### Heading weight

Drag the control to adjust heading weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `heading_weight`. Type: `range`.

</details>

### Heading letter spacing (x100 em)

Drag the control to adjust heading letter spacing (x100 em). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `0`.

Range: 0 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_letter_spacing`. Type: `range`.

</details>

### Heading line height

Drag the control to adjust heading line height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_line_height`. Type: `range`.

</details>

### Heading margin bottom

Drag the control to adjust heading margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 0 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_mb`. Type: `range`.

</details>

## Subheading styling

### Subheading color

Choose a color for subheading color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#333333`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_color`. Type: `color`.

</details>

### Subheading size

Drag the control to adjust subheading size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_size`. Type: `range`.

</details>

### Subheading weight

Drag the control to adjust subheading weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `500`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_weight`. Type: `range`.

</details>

### Subheading letter spacing (x100 em)

Drag the control to adjust subheading letter spacing (x100 em). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `0`.

Range: 0 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_letter_spacing`. Type: `range`.

</details>

### Subheading line height

Drag the control to adjust subheading line height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1.4`.

Range: 1 to 2 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_line_height`. Type: `range`.

</details>

### Subheading margin bottom

Drag the control to adjust subheading margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 50 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_mb`. Type: `range`.

</details>

## Description styling

### Description color

Choose a color for description color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `description_color`. Type: `color`.

</details>

### Description size

Drag the control to adjust description size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `description_size`. Type: `range`.

</details>

### Description weight

Drag the control to adjust description weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `400`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `description_weight`. Type: `range`.

</details>

### Description letter spacing (x100 em)

Drag the control to adjust description letter spacing (x100 em). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `0`.

Range: 0 to 10 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `description_letter_spacing`. Type: `range`.

</details>

### Description line height

Drag the control to adjust description line height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1.6`.

Range: 1 to 2.2 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `description_line_height`. Type: `range`.

</details>

## Item card styling

### Item background

Choose a color for item background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `item_bg`. Type: `color`.

</details>

### Item border color

Choose a color for item border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e6e6e6`.

<details><summary>Reference for connected builders</summary>

Setting: `item_border_color`. Type: `color`.

</details>

### Item radius

Drag the control to adjust item radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_radius`. Type: `range`.

</details>

### Item shadow

Enter the item shadow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `0 4px 14px rgba(0,0,0,.05)`.

<details><summary>Reference for connected builders</summary>

Setting: `item_shadow`. Type: `text`.

</details>

### Item padding

Drag the control to adjust item padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_pad`. Type: `range`.

</details>

### Item inner gap

Drag the control to adjust item inner gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 6 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_inner_gap`. Type: `range`.

</details>

### Image column width

Drag the control to adjust image column width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `110`.

Range: 70 to 180 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `item_image_col`. Type: `range`.

</details>

### Image column width (mobile)

Drag the control to adjust image column width (mobile). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `90`.

Range: 56 to 140 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `item_image_col_mobile`. Type: `range`.

</details>

## Image styling

### Image ratio

Choose one of the supported options below for image ratio. Only the selected option applies; other settings can further customize its appearance.

Default: `square`.

Options: Square, Portrait, Landscape.

<details><summary>Reference for connected builders</summary>

Setting: `image_ratio`. Type: `select`.

`square`, `portrait`, `landscape`

</details>

### Image fit

Choose one of the supported options below for image fit. Only the selected option applies; other settings can further customize its appearance.

Default: `cover`.

Options: Cover, Contain.

<details><summary>Reference for connected builders</summary>

Setting: `image_fit`. Type: `select`.

`cover`, `contain`

</details>

### Image background

Choose a color for image background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f6f6`.

<details><summary>Reference for connected builders</summary>

Setting: `image_bg`. Type: `color`.

</details>

### Image border color

Choose a color for image border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#eeeeee`.

<details><summary>Reference for connected builders</summary>

Setting: `image_border_color`. Type: `color`.

</details>

### Image radius

Drag the control to adjust image radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `image_radius`. Type: `range`.

</details>

## Typography: item

### Title color

Choose a color for title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `title_color`. Type: `color`.

</details>

### Title size

Drag the control to adjust title size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_title_size`. Type: `range`.

</details>

### Title weight

Drag the control to adjust title weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `item_title_weight`. Type: `range`.

</details>

### Title line height

Drag the control to adjust title line height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_title_line_height`. Type: `range`.

</details>

### Title margin bottom

Drag the control to adjust title margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_title_mb`. Type: `range`.

</details>

### Meta color

Choose a color for meta color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `meta_color`. Type: `color`.

</details>

### Meta size

Drag the control to adjust meta size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_meta_size`. Type: `range`.

</details>

### Meta weight

Drag the control to adjust meta weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `500`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `item_meta_weight`. Type: `range`.

</details>

### Meta line height

Drag the control to adjust meta line height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 1 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_meta_line_height`. Type: `range`.

</details>

### Meta margin bottom

Drag the control to adjust meta margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `item_meta_mb`. Type: `range`.

</details>

## Typography: price

### Price color

Choose a color for price color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `price_color`. Type: `color`.

</details>

### Price size

Drag the control to adjust price size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `price_size`. Type: `range`.

</details>

### Price weight

Drag the control to adjust price weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `price_weight`. Type: `range`.

</details>

### Compare color

Choose a color for compare color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#666666`.

<details><summary>Reference for connected builders</summary>

Setting: `compare_color`. Type: `color`.

</details>

### Compare size

Drag the control to adjust compare size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `13`.

Range: 10 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `compare_size`. Type: `range`.

</details>

### Compare weight

Drag the control to adjust compare weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `600`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `compare_weight`. Type: `range`.

</details>

### Compare opacity

Drag the control to adjust compare opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0.6`.

Range: 0.2 to 1 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `compare_opacity`. Type: `range`.

</details>

## Badge styling

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

### Badge radius

Drag the control to adjust badge radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 0 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_radius`. Type: `range`.

</details>

### Badge padding Y

Drag the control to adjust badge padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `6`.

Range: 2 to 14 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_pad_y`. Type: `range`.

</details>

### Badge padding X

Drag the control to adjust badge padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 6 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_pad_x`. Type: `range`.

</details>

### Badge font size

Drag the control to adjust badge font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `badge_size`. Type: `range`.

</details>

### Badge font weight

Drag the control to adjust badge font weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `badge_weight`. Type: `range`.

</details>

## Toggle styling

### Toggle accent

Choose a color for toggle accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `toggle_accent`. Type: `color`.

</details>

### Toggle text color

Choose a color for toggle text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `toggle_text_color`. Type: `color`.

</details>

### Toggle text size

Drag the control to adjust toggle text size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `toggle_text_size`. Type: `range`.

</details>

### Toggle text weight

Drag the control to adjust toggle text weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `600`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `toggle_text_weight`. Type: `range`.

</details>

## Quantity styling

### Qty label color

Choose a color for qty label color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `qty_label_color`. Type: `color`.

</details>

### Qty label size

Drag the control to adjust qty label size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `qty_label_size`. Type: `range`.

</details>

### Qty label weight

Drag the control to adjust qty label weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `600`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `qty_label_weight`. Type: `range`.

</details>

### Qty input width

Drag the control to adjust qty input width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `68`.

Range: 54 to 120 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `qty_input_w`. Type: `range`.

</details>

### Qty input padding Y

Drag the control to adjust qty input padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 16 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `qty_input_pad_y`. Type: `range`.

</details>

### Qty input padding X

Drag the control to adjust qty input padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 6 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `qty_input_pad_x`. Type: `range`.

</details>

### Qty border

Choose a color for qty border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#dddddd`.

<details><summary>Reference for connected builders</summary>

Setting: `qty_border`. Type: `color`.

</details>

### Qty background

Choose a color for qty background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `qty_bg`. Type: `color`.

</details>

### Qty text

Choose a color for qty text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `qty_text`. Type: `color`.

</details>

### Qty text size

Drag the control to adjust qty text size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `13`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `qty_text_size`. Type: `range`.

</details>

### Qty radius

Drag the control to adjust qty radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `qty_radius`. Type: `range`.

</details>

## Controls spacing

### Controls gap

Drag the control to adjust controls gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 6 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `controls_gap`. Type: `range`.

</details>

### Controls margin top

Drag the control to adjust controls margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `controls_mt`. Type: `range`.

</details>

## Item extras

### Show vendor

Turn on “Show vendor” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_vendor`. Type: `checkbox`.

</details>

### Show SKU

Turn on “Show SKU” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_sku`. Type: `checkbox`.

</details>

### Show view link

Turn on “Show view link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_view_link`. Type: `checkbox`.

</details>

### View link text

Enter the view link text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View`.

<details><summary>Reference for connected builders</summary>

Setting: `view_link_text`. Type: `text`.

</details>

### View link color

Choose a color for view link color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `view_link_color`. Type: `color`.

</details>

### View link size

Drag the control to adjust view link size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `view_link_size`. Type: `range`.

</details>

### View link weight

Drag the control to adjust view link weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `view_link_weight`. Type: `range`.

</details>

### Show item note

Turn on “Show item note” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_item_note`. Type: `checkbox`.

</details>

### Note margin top

Drag the control to adjust note margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `note_mt`. Type: `range`.

</details>

### Note color

Choose a color for note color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `note_color`. Type: `color`.

</details>

### Note size

Drag the control to adjust note size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `note_size`. Type: `range`.

</details>

### OOS margin top

Drag the control to adjust oos margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `oos_mt`. Type: `range`.

</details>

### OOS color

Choose a color for oos color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#B00020`.

<details><summary>Reference for connected builders</summary>

Setting: `oos_color`. Type: `color`.

</details>

### OOS size

Drag the control to adjust oos size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `oos_size`. Type: `range`.

</details>

### OOS weight

Drag the control to adjust oos weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `oos_weight`. Type: `range`.

</details>

## Summary styling

### Summary background

Choose a color for summary background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_bg`. Type: `color`.

</details>

### Summary border

Choose a color for summary border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e6e6e6`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_border_color`. Type: `color`.

</details>

### Summary radius

Drag the control to adjust summary radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_radius`. Type: `range`.

</details>

### Summary shadow

Enter the summary shadow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `0 6px 20px rgba(0,0,0,.06)`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_shadow`. Type: `text`.

</details>

### Summary padding

Drag the control to adjust summary padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_pad`. Type: `range`.

</details>

### Summary title color

Choose a color for summary title color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_title_color`. Type: `color`.

</details>

### Summary title size

Drag the control to adjust summary title size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_title_size`. Type: `range`.

</details>

### Summary title weight

Drag the control to adjust summary title weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `800`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `summary_title_weight`. Type: `range`.

</details>

### Summary title margin bottom

Drag the control to adjust summary title margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_title_mb`. Type: `range`.

</details>

### Rows gap

Drag the control to adjust rows gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_rows_gap`. Type: `range`.

</details>

### Rows margin bottom

Drag the control to adjust rows margin bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_rows_mb`. Type: `range`.

</details>

### Label color

Choose a color for label color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_label_color`. Type: `color`.

</details>

### Label size

Drag the control to adjust label size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_label_size`. Type: `range`.

</details>

### Label weight

Drag the control to adjust label weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `600`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `summary_label_weight`. Type: `range`.

</details>

### Value color

Choose a color for value color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_value_color`. Type: `color`.

</details>

### Value size

Drag the control to adjust value size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_value_size`. Type: `range`.

</details>

### Value weight

Drag the control to adjust value weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `800`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `summary_value_weight`. Type: `range`.

</details>

### Divider color

Choose a color for divider color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e6e6e6`.

<details><summary>Reference for connected builders</summary>

Setting: `summary_divider`. Type: `color`.

</details>

### Divider margin Y

Drag the control to adjust divider margin y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 6 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_divider_my`. Type: `range`.

</details>

### Divider opacity

Drag the control to adjust divider opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0.6`.

Range: 0.2 to 1 ; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `summary_divider_opacity`. Type: `range`.

</details>

## Savings styling

### Savings background

Choose a color for savings background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f2f7ff`.

<details><summary>Reference for connected builders</summary>

Setting: `savings_bg`. Type: `color`.

</details>

### Savings color

Choose a color for savings color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#0b3d91`.

<details><summary>Reference for connected builders</summary>

Setting: `savings_color`. Type: `color`.

</details>

### Savings radius

Drag the control to adjust savings radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `savings_radius`. Type: `range`.

</details>

### Savings padding Y

Drag the control to adjust savings padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 6 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `savings_pad_y`. Type: `range`.

</details>

### Savings padding X

Drag the control to adjust savings padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 8 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `savings_pad_x`. Type: `range`.

</details>

### Savings size

Drag the control to adjust savings size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `savings_size`. Type: `range`.

</details>

### Savings weight

Drag the control to adjust savings weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `savings_weight`. Type: `range`.

</details>

## Button styling

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

Setting: `btn_text_color`. Type: `color`.

</details>

### Button border

Choose a color for button border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_border_color`. Type: `color`.

</details>

### Button radius

Drag the control to adjust button radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_radius`. Type: `range`.

</details>

### Button shadow

Enter the button shadow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `0 10px 20px rgba(0,0,0,.12)`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_shadow`. Type: `text`.

</details>

### Button padding Y

Drag the control to adjust button padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 8 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_pad_y`. Type: `range`.

</details>

### Button padding X

Drag the control to adjust button padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 10 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_pad_x`. Type: `range`.

</details>

### Button font size

Drag the control to adjust button font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 12 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `btn_size`. Type: `range`.

</details>

### Button font weight

Drag the control to adjust button font weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `800`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `btn_weight`. Type: `range`.

</details>

### Button hover background

Choose a color for button hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_bg_hover`. Type: `color`.

</details>

### Button hover text

Choose a color for button hover text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `btn_text_hover`. Type: `color`.

</details>

## Message styling

### Message margin top

Drag the control to adjust message margin top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 30 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `msg_mt`. Type: `range`.

</details>

### Message radius

Drag the control to adjust message radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 0 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `msg_radius`. Type: `range`.

</details>

### Message padding Y

Drag the control to adjust message padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 6 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `msg_pad_y`. Type: `range`.

</details>

### Message padding X

Drag the control to adjust message padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 8 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `msg_pad_x`. Type: `range`.

</details>

### Message font size

Drag the control to adjust message font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 10 to 18 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `msg_size`. Type: `range`.

</details>

### Message font weight

Drag the control to adjust message font weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `msg_weight`. Type: `range`.

</details>

### Success background

Choose a color for success background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e9f7ee`.

<details><summary>Reference for connected builders</summary>

Setting: `msg_ok_bg`. Type: `color`.

</details>

### Success text

Choose a color for success text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#0a5b2a`.

<details><summary>Reference for connected builders</summary>

Setting: `msg_ok_text`. Type: `color`.

</details>

### Error background

Choose a color for error background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#fdeaea`.

<details><summary>Reference for connected builders</summary>

Setting: `msg_err_bg`. Type: `color`.

</details>

### Error text

Choose a color for error text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#8a1111`.

<details><summary>Reference for connected builders</summary>

Setting: `msg_err_text`. Type: `color`.

</details>

## Blocks you can add

### Bundle item

#### Product

Choose an existing product from Products. Edit its price, inventory, variants, and media in the product record; this control chooses what the section displays.

<details><summary>Reference for connected builders</summary>

Setting: `product`. Type: `product`.

</details>

#### Custom title (optional)

Enter the custom title (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Meta text (optional)

Enter the meta text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `meta_text`. Type: `text`.

</details>

#### Image override (optional)

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `image`. Type: `image_picker`.

</details>

#### Default quantity

Enter a number for default quantity. Follow the unit and instructions shown below. A number alone does not create a Shopify discount, shipping rate, or inventory rule.

Default: `1`.

<details><summary>Reference for connected builders</summary>

Setting: `quantity`. Type: `number`.

</details>

#### Optional item

Turn on “Optional item” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `optional`. Type: `checkbox`.

</details>

#### Badge (optional)

Enter the badge (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge`. Type: `text`.

</details>

#### Note (optional)

Enter the note (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `note`. Type: `text`.

</details>

## File reference

`sections/product-bundles.liquid`
