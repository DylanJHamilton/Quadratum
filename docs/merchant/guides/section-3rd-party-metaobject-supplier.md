# 3P - metaobjects

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3P - metaobjects.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Use a published, storefront-accessible metaobject page with name or title (text). Optional fields: logo (image file), short_description and shipping_notes (text/rich text), default_lead_time (text), regions_served (text or text list), website_url (URL), catalog_collection (collection reference). Definition setup and fulfillment are managed outside this section.

## Header

### Kicker label

Enter the kicker label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fulfillment partner`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker_label`. Type: `text`.

</details>

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `hero`.

Options: Hero card, Strip.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`hero`, `strip`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`

</details>

## Content toggles

### Show logo

Turn on “Show logo” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_logo`. Type: `checkbox`.

</details>

### Show short description

Turn on “Show short description” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_short_description`. Type: `checkbox`.

</details>

### Show fulfillment facts row

Turn on “Show fulfillment facts row” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_facts`. Type: `checkbox`.

</details>

### Show lead time

Turn on “Show lead time” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_lead_time`. Type: `checkbox`.

</details>

### Show regions served

Turn on “Show regions served” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_regions`. Type: `checkbox`.

</details>

### Show shipping notes

Turn on “Show shipping notes” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_shipping_notes`. Type: `checkbox`.

</details>

### Lead time label

Enter the lead time label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Lead time`.

<details><summary>Reference for connected builders</summary>

Setting: `label_lead_time`. Type: `text`.

</details>

### Regions label

Enter the regions label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Regions served`.

<details><summary>Reference for connected builders</summary>

Setting: `label_regions`. Type: `text`.

</details>

### Notes label

Enter the notes label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shipping notes`.

<details><summary>Reference for connected builders</summary>

Setting: `label_notes`. Type: `text`.

</details>

## Buttons

### Show website button (uses supplier.website_url)

Turn on “Show website button (uses supplier.website_url)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_website_button`. Type: `checkbox`.

</details>

### Website button label

Enter the website button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Visit supplier`.

<details><summary>Reference for connected builders</summary>

Setting: `website_button_label`. Type: `text`.

</details>

### Website button style

Choose one of the supported options below for website button style. Only the selected option applies; other settings can further customize its appearance.

Default: `secondary`.

Options: Primary, Secondary, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `website_button_variant`. Type: `select`.

`primary`, `secondary`, `outline`, `ghost`

</details>

### Show storefront metaobject page link (supplier.system.url)

Turn on “Show storefront metaobject page link (supplier.system.url)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_storefront_link`. Type: `checkbox`.

</details>

### Storefront button label

Enter the storefront button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `View supplier page`.

<details><summary>Reference for connected builders</summary>

Setting: `storefront_button_label`. Type: `text`.

</details>

### Storefront button style

Choose one of the supported options below for storefront button style. Only the selected option applies; other settings can further customize its appearance.

Default: `ghost`.

Options: Primary, Secondary, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `storefront_button_variant`. Type: `select`.

`primary`, `secondary`, `outline`, `ghost`

</details>

## Products grid

### Show products grid

Turn on “Show products grid” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_product_grid`. Type: `checkbox`.

</details>

### Products heading

Enter the products heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Supplier catalog`.

<details><summary>Reference for connected builders</summary>

Setting: `products_heading`. Type: `text`.

</details>

### Collection source

Choose one of the supported options below for collection source. Only the selected option applies; other settings can further customize its appearance.

Metaobject mode uses the section collection when catalog_collection is missing. Section mode always uses the section collection.

Default: `metaobject`.

Options: Supplier metaobject field (catalog_collection), Section collection.

<details><summary>Reference for connected builders</summary>

Setting: `collection_source`. Type: `select`.

`metaobject`, `section`

</details>

### Section / fallback collection

Choose an existing collection. Manage its products, title, image, and description under Products > Collections.

<details><summary>Reference for connected builders</summary>

Setting: `fallback_collection`. Type: `collection`.

</details>

### Show collection link button (when collection exists)

Turn on “Show collection link button (when collection exists)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_collection_link`. Type: `checkbox`.

</details>

### Collection link label

Enter the collection link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop all`.

<details><summary>Reference for connected builders</summary>

Setting: `collection_link_label`. Type: `text`.

</details>

### Collection link style

Choose one of the supported options below for collection link style. Only the selected option applies; other settings can further customize its appearance.

Default: `outline`.

Options: Primary, Secondary, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `collection_link_variant`. Type: `select`.

`primary`, `secondary`, `outline`, `ghost`

</details>

### Columns (desktop)

Choose one of the supported options below for columns (desktop). Only the selected option applies; other settings can further customize its appearance.

Default: `4`.

Options: 2, 3, 4.

<details><summary>Reference for connected builders</summary>

Setting: `columns_desktop`. Type: `select`.

`2`, `3`, `4`

</details>

### Max products

Drag the control to adjust max products. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 4 to 24 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `max_products`. Type: `range`.

</details>

## Spacing and shape

### Vertical padding (rem ×100)

Drag the control to adjust vertical padding (rem ×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `36`.

Range: 12 to 72 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_y`. Type: `range`.

</details>

### Horizontal padding (rem ×100)

Drag the control to adjust horizontal padding (rem ×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `0`.

Range: 0 to 40 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `padding_x`. Type: `range`.

</details>

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `20`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card shadow

Choose one of the supported options below for card shadow. Only the selected option applies; other settings can further customize its appearance.

Default: `soft`.

Options: None, Soft, Medium, Strong.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow_strength`. Type: `select`.

`none`, `soft`, `medium`, `strong`

</details>

## Design overrides

### Use custom colors for this section

Turn on “Use custom colors for this section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#0b1120`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_bg_color`. Type: `color`.

</details>

### Surface / card color

Choose a color for surface / card color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#020617`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_surface_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_text_color`. Type: `color`.

</details>

### Muted text color

Choose a color for muted text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#9ca3af`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_muted_text_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1f2933`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_border_color`. Type: `color`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#22c55e`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_accent_color`. Type: `color`.

</details>

### Highlight background

Choose a color for highlight background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#022c22`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_highlight_bg_color`. Type: `color`.

</details>

## File reference

`sections/3rd-party-metaobject-supplier.liquid`
