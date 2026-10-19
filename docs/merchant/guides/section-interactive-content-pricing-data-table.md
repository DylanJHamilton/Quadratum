# Interactive pricing table

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Interactive pricing table.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Anchor ID

Enter the anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Optional; keep this anchor unique across the page.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

## Mode

### Mode

Choose one of the supported options below for mode. Only the selected option applies; other settings can further customize its appearance.

Default: `price_list`.

Options: Price list (service menu), Pricing table (plans), Data table (generic).

<details><summary>Reference for connected builders</summary>

Setting: `mode`. Type: `select`.

`price_list`, `pricing_table`, `data_table`

</details>

## Header

### Show header

Turn on “Show header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_header`. Type: `checkbox`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Pricing & details`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Present prices, plans, or comparison data with a clean, premium layout.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

## Layout and spacing

### Max width

Drag the control to adjust max width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1200`.

Range: 720 to 1600 ; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Vertical padding

Drag the control to adjust vertical padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `56`.

Range: 0 to 140 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Horizontal padding

Drag the control to adjust horizontal padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 72 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Section gap

Drag the control to adjust section gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `22`.

Range: 8 to 64 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

## Table behavior

### Show heading row (tables)

Turn on “Show heading row (tables)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_heading_row`. Type: `checkbox`.

</details>

### Responsive behavior (tables)

Choose one of the supported options below for responsive behavior (tables). Only the selected option applies; other settings can further customize its appearance.

Default: `stack_rows`.

Options: Stack rows (cards), Scroll horizontally.

<details><summary>Reference for connected builders</summary>

Setting: `responsive_behavior`. Type: `select`.

`stack_rows`, `scroll_horizontally`

</details>

## Pricing table options

### Highlight column (1-based). 0 = none

Drag the control to adjust highlight column (1-based). 0 = none. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

1 = first plan, 2 = second plan, etc. If out of range, highlight is ignored.

Default: `0`.

Range: 0 to 8 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `highlight_column_index`. Type: `range`.

</details>

### Highlight style

Choose one of the supported options below for highlight style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Surface, Outline, Shadow.

<details><summary>Reference for connected builders</summary>

Setting: `highlight_style`. Type: `select`.

`surface`, `outline`, `shadow`

</details>

### Mobile pricing layout

Choose one of the supported options below for mobile pricing layout. Only the selected option applies; other settings can further customize its appearance.

Default: `stack_plan_cards`.

Options: Stack plan cards, Scroll horizontally.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_pricing_layout`. Type: `select`.

`stack_plan_cards`, `scroll_horizontally`

</details>

### Show plan CTA

Turn on “Show plan CTA” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_cta`. Type: `checkbox`.

</details>

### Hide CTA if URL is blank (recommended)

Turn on “Hide CTA if URL is blank (recommended)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_cta_if_no_url`. Type: `checkbox`.

</details>

## Data table columns (v1 fixed columns)

### Column 1 label

Enter the column 1 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Feature`.

<details><summary>Reference for connected builders</summary>

Setting: `col_1_label`. Type: `text`.

</details>

### Column 2 label

Enter the column 2 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Basic`.

<details><summary>Reference for connected builders</summary>

Setting: `col_2_label`. Type: `text`.

</details>

### Column 3 label

Enter the column 3 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Pro`.

<details><summary>Reference for connected builders</summary>

Setting: `col_3_label`. Type: `text`.

</details>

### Column 4 label

Enter the column 4 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `col_4_label`. Type: `text`.

</details>

### Column 5 label

Enter the column 5 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `col_5_label`. Type: `text`.

</details>

### Column 6 label

Enter the column 6 label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `col_6_label`. Type: `text`.

</details>

## Styling

### Density

Choose one of the supported options below for density. Only the selected option applies; other settings can further customize its appearance.

Default: `comfortable`.

Options: Comfortable, Compact.

<details><summary>Reference for connected builders</summary>

Setting: `density`. Type: `select`.

`comfortable`, `compact`

</details>

### Row dividers

Turn on “Row dividers” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `row_dividers`. Type: `checkbox`.

</details>

### Cell padding

Drag the control to adjust cell padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 8 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `cell_padding`. Type: `range`.

</details>

### Border radius

Drag the control to adjust border radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `border_radius`. Type: `range`.

</details>

### Typography scale

Choose one of the supported options below for typography scale. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `ty_scale`. Type: `select`.

`sm`, `md`, `lg`

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

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `bg`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#bfbfbf`.

<details><summary>Reference for connected builders</summary>

Setting: `muted`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `accent`. Type: `color`.

</details>

### Surface

Choose a color for surface. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#101010`.

<details><summary>Reference for connected builders</summary>

Setting: `surface`. Type: `color`.

</details>

### Border

Choose a color for border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2a2a2a`.

<details><summary>Reference for connected builders</summary>

Setting: `border`. Type: `color`.

</details>

### Table header background

Choose a color for table header background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#151515`.

<details><summary>Reference for connected builders</summary>

Setting: `th_bg`. Type: `color`.

</details>

### Table header text

Choose a color for table header text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `th_text`. Type: `color`.

</details>

### Row hover background

Choose a color for row hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#141414`.

<details><summary>Reference for connected builders</summary>

Setting: `row_hover_bg`. Type: `color`.

</details>

### Highlight background

Choose a color for highlight background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1a1a1a`.

<details><summary>Reference for connected builders</summary>

Setting: `highlight_bg`. Type: `color`.

</details>

### Highlight border

Choose a color for highlight border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#444444`.

<details><summary>Reference for connected builders</summary>

Setting: `highlight_border`. Type: `color`.

</details>

### Badge background

Choose a color for badge background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1b1b1b`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_bg`. Type: `color`.

</details>

### Badge text

Choose a color for badge text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `badge_text`. Type: `color`.

</details>

## Blocks you can add

### Price list item

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Standard Service`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Short details about what’s included and who it’s for.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `description`. Type: `richtext`.

</details>

#### Price label

Enter the price label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `$199`.

<details><summary>Reference for connected builders</summary>

Setting: `price_label`. Type: `text`.

</details>

#### Badge (optional)

Enter the badge (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge`. Type: `text`.

</details>

### Plan column

#### Plan name

Enter the plan name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Pro`.

<details><summary>Reference for connected builders</summary>

Setting: `plan_name`. Type: `text`.

</details>

#### Price label

Enter the price label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `$49`.

<details><summary>Reference for connected builders</summary>

Setting: `price_label`. Type: `text`.

</details>

#### Billing cycle (fine print)

Enter the billing cycle (fine print). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `/month`.

<details><summary>Reference for connected builders</summary>

Setting: `billing_cycle`. Type: `text`.

</details>

#### Features

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<ul><li>Core feature</li><li>Another benefit</li><li>Support level</li></ul>`.

<details><summary>Reference for connected builders</summary>

Setting: `features`. Type: `richtext`.

</details>

#### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Choose plan`.

<details><summary>Reference for connected builders</summary>

Setting: `cta_label`. Type: `text`.

</details>

#### CTA URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `cta_url`. Type: `url`.

</details>

#### Badge (optional)

Enter the badge (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `badge`. Type: `text`.

</details>

### Data row

#### Cell 1

Enter the cell 1. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shipping`.

<details><summary>Reference for connected builders</summary>

Setting: `cell_1`. Type: `text`.

</details>

#### Cell 2

Enter the cell 2. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Standard`.

<details><summary>Reference for connected builders</summary>

Setting: `cell_2`. Type: `text`.

</details>

#### Cell 3

Enter the cell 3. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Priority`.

<details><summary>Reference for connected builders</summary>

Setting: `cell_3`. Type: `text`.

</details>

#### Cell 4

Enter the cell 4. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cell_4`. Type: `text`.

</details>

#### Cell 5

Enter the cell 5. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cell_5`. Type: `text`.

</details>

#### Cell 6

Enter the cell 6. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `cell_6`. Type: `text`.

</details>

## File reference

`sections/interactive-content-pricing-data-table.liquid`
