# Main product — simple

[All documentation](../README.md) · [Support](../SUPPORT.md)

Products.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Main product — simple.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Product content layout

Choose one of the supported options below for product content layout. Only the selected option applies; other settings can further customize its appearance.

Use blocks to add, remove, and reorder product information.

Default: `blocks`.

Options: Reorderable blocks, Legacy fixed layout.

<details><summary>Reference for connected builders</summary>

Setting: `content_layout`. Type: `select`.

`blocks`, `legacy`

</details>

### Section ARIA label

Enter the section aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product details`.

<details><summary>Reference for connected builders</summary>

Setting: `section_aria_label`. Type: `text`.

</details>

### Sticky content

Turn on “Sticky content” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_sticky_info`. Type: `checkbox`.

</details>

## Media

### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `medium`.

Options: Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `media_size`. Type: `select`.

`small`, `medium`, `large`

</details>

### Constrain to screen height

Turn on “Constrain to screen height” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `constrain_to_viewport`. Type: `checkbox`.

</details>

### Fit

Choose one of the supported options below for fit. Only the selected option applies; other settings can further customize its appearance.

Default: `original`.

Options: Original, Fill.

<details><summary>Reference for connected builders</summary>

Setting: `media_fit`. Type: `select`.

`original`, `fill`

</details>

### Layout

Choose one of the supported options below for layout. Only the selected option applies; other settings can further customize its appearance.

Default: `stacked`.

Options: Stacked, 2 columns, Thumbnails, Thumbnail carousel.

<details><summary>Reference for connected builders</summary>

Setting: `gallery_layout`. Type: `select`.

`stacked`, `columns`, `thumbnails`, `thumbnail_carousel`

</details>

### Mobile layout

Choose one of the supported options below for mobile layout. Only the selected option applies; other settings can further customize its appearance.

Default: `show`.

Options: Hide thumbnails, 2 columns, Show thumbnails.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_thumbnails`. Type: `select`.

`hide`, `columns`, `show`

</details>

### Position

Choose one of the supported options below for position. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `media_position`. Type: `select`.

`left`, `right`

</details>

### Zoom

Choose one of the supported options below for zoom. Only the selected option applies; other settings can further customize its appearance.

Default: `lightbox`.

Options: Open lightbox, None.

<details><summary>Reference for connected builders</summary>

Setting: `image_zoom`. Type: `select`.

`lightbox`, `none`

</details>

### Hide other variant media after one is selected

Turn on “Hide other variant media after one is selected” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_variants`. Type: `checkbox`.

</details>

### Loop video

Turn on “Loop video” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_video_looping`. Type: `checkbox`.

</details>

## Purchase

### Variant picker

Choose one of the supported options below for variant picker. Only the selected option applies; other settings can further customize its appearance.

Default: `buttons`.

Options: Buttons, Dropdown.

<details><summary>Reference for connected builders</summary>

Setting: `variant_picker_type`. Type: `select`.

`buttons`, `dropdown`

</details>

### Show dynamic checkout button

Turn on “Show dynamic checkout button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_dynamic_checkout`. Type: `checkbox`.

</details>

## Below add to cart

### Content below add to cart

Choose one of the supported options below for content below add to cart. Only the selected option applies; other settings can further customize its appearance.

Default: `short`.

Options: None, Short description, Full description.

<details><summary>Reference for connected builders</summary>

Setting: `below_atc_content`. Type: `select`.

`none`, `short`, `description`

</details>

### Short description metafield key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Enter as namespace.key (example: custom.short_description). Used when 'Short description' is selected. Fallback: truncated product description.

Default: `custom.short_description`.

<details><summary>Reference for connected builders</summary>

Setting: `short_description_metafield_key`. Type: `text`.

</details>

## Spacing

### Padding top

Drag the control to adjust padding top. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `36`.

Range: 0 to 100 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_top`. Type: `range`.

</details>

### Padding bottom

Drag the control to adjust padding bottom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `36`.

Range: 0 to 100 px; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_bottom`. Type: `range`.

</details>

## Blocks you can add

### Product title

### Price

### Inventory and SKU

### Purchase controls

### @app

Select a compatible installed app. The app provides its settings and service.

### Custom Liquid

#### Custom Liquid

Advanced: add trusted Liquid or HTML only when native settings cannot meet the need. Work in a duplicated unpublished theme. Do not paste credentials, untrusted scripts, or a second product form inside purchase controls.

<details><summary>Reference for connected builders</summary>

Setting: `liquid`. Type: `liquid`.

</details>

### Accordion — description

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product description`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Open by default

Turn on “Open by default” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `open_by_default`. Type: `checkbox`.

</details>

### Accordion — reviews

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Reviews`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Open by default

Turn on “Open by default” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_by_default`. Type: `checkbox`.

</details>

#### Placeholder text

Write the placeholder text. Keep paragraphs short and preview long text on mobile.

Default: `Reviews will display here once your reviews app is embedded (use a Custom liquid accordion, or add the app block elsewhere on the product template).`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_text`. Type: `textarea`.

</details>

### Accordion — metafield

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Product details`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Open by default

Turn on “Open by default” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_by_default`. Type: `checkbox`.

</details>

#### Metafield key (namespace.key)

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists.

Enter as namespace.key (example: custom.product_details).

Default: `custom.product_details`.

<details><summary>Reference for connected builders</summary>

Setting: `metafield_key`. Type: `text`.

</details>

#### Fallback text (optional)

Enter the fallback text (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_text`. Type: `text`.

</details>

### Accordion — page

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `More info`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Open by default

Turn on “Open by default” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_by_default`. Type: `checkbox`.

</details>

#### Page

Choose an existing Shopify page. Edit the page’s content separately in Online Store > Pages.

<details><summary>Reference for connected builders</summary>

Setting: `page`. Type: `page`.

</details>

### Accordion — custom liquid

#### Title

Enter the title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Details`.

<details><summary>Reference for connected builders</summary>

Setting: `title`. Type: `text`.

</details>

#### Open by default

Turn on “Open by default” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `open_by_default`. Type: `checkbox`.

</details>

#### Custom liquid

Advanced: add trusted Liquid or HTML only when native settings cannot meet the need. Work in a duplicated unpublished theme. Do not paste credentials, untrusted scripts, or a second product form inside purchase controls.

<details><summary>Reference for connected builders</summary>

Setting: `custom_liquid`. Type: `liquid`.

</details>

## File reference

`sections/main-product-simple.liquid`
