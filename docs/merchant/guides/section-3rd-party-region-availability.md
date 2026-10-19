# 3rd party - regions

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3rd party - regions.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Informational messages from your published supplier metaobject and selected Markets country. This does not validate shipping rates, inventory, fulfillment, duties or checkout eligibility. Configure a list of ISO two-letter region_country_codes; legacy comma-separated text is accepted.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Region and availability information`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Where to show

### Show on product pages

Turn on “Show on product pages” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_product`. Type: `checkbox`.

</details>

### Enable cart rendering when section is on a cart template

Turn on “Enable cart rendering when section is on a cart template” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_on_cart`. Type: `checkbox`.

</details>

## Metafield mapping

### Metafield namespace

Advanced: enter the namespace of an existing Shopify metafield definition, such as custom. It must match the definition exactly. Pair it with the corresponding key; this setting does not create a definition.

Default: `fulfillment`.

<details><summary>Reference for connected builders</summary>

Setting: `metafield_namespace`. Type: `text`.

</details>

### Supplier reference key (metaobject reference)

Enter the supplier reference key (metaobject reference). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `supplier`.

<details><summary>Reference for connected builders</summary>

Setting: `key_supplier_ref`. Type: `text`.

</details>

## Product page content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Region information`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading label

Enter the heading label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Region & Availability`.

<details><summary>Reference for connected builders</summary>

Setting: `card_label`. Type: `text`.

</details>

### Append supplier regions_label to heading

Turn on “Append supplier regions_label to heading” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `append_regions_label_to_heading`. Type: `checkbox`.

</details>

### Message mode

Choose one of the supported options below for message mode. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (supplier region_country_codes etc), Always generic (ignore supplier regions).

<details><summary>Reference for connected builders</summary>

Setting: `region_message_mode`. Type: `select`.

`auto`, `always_generic`

</details>

### Show generic message when supplier/regions are not configured

Turn on “Show generic message when supplier/regions are not configured” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_generic_when_no_supplier_data`. Type: `checkbox`.

</details>

## Product page message templates

Use placeholders (safe in JSON): [[country_name]], [[country_code]], [[supplier_name]], [[warehouse_location]], [[regions_label]].

### Supported region template

Enter the supported region template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `[[country_name]] is listed in this supplier’s configured service regions. Confirm delivery options at checkout.`.

<details><summary>Reference for connected builders</summary>

Setting: `supported_template`. Type: `text`.

</details>

### Unsupported region template

Enter the unsupported region template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `This item may not be available to ship to [[country_name]]. Contact us before ordering.`.

<details><summary>Reference for connected builders</summary>

Setting: `unsupported_template`. Type: `text`.

</details>

### Unknown region template

Enter the unknown region template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shipping availability may vary by country. Please confirm during checkout.`.

<details><summary>Reference for connected builders</summary>

Setting: `unknown_template`. Type: `text`.

</details>

### Generic template

Enter the generic template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `International availability varies by product and destination. Please confirm during checkout.`.

<details><summary>Reference for connected builders</summary>

Setting: `generic_template`. Type: `text`.

</details>

## Secondary line and duty notice

### Show secondary line (warehouse/regions label)

Turn on “Show secondary line (warehouse/regions label)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_secondary_line`. Type: `checkbox`.

</details>

### Secondary line prefix (when warehouse exists)

Enter the secondary line prefix (when warehouse exists). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Ships from:`.

<details><summary>Reference for connected builders</summary>

Setting: `secondary_prefix`. Type: `text`.

</details>

### Duty notice display

Choose one of the supported options below for duty notice display. Only the selected option applies; other settings can further customize its appearance.

Default: `when_unsupported`.

Options: Never, Only when unsupported, Always when present.

<details><summary>Reference for connected builders</summary>

Setting: `duty_notice_mode`. Type: `select`.

`never`, `when_unsupported`, `always`

</details>

## Icon

### Show status icon

Turn on “Show status icon” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_icon`. Type: `checkbox`.

</details>

### Icon source

Choose one of the supported options below for icon source. Only the selected option applies; other settings can further customize its appearance.

Default: `glyph`.

Options: Built-in glyphs (no snippet), Theme icon snippet (uses your icon system).

<details><summary>Reference for connected builders</summary>

Setting: `icon_source`. Type: `select`.

`glyph`, `theme`

</details>

### Legacy icon snippet handle

Enter the legacy icon snippet handle. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Retained for compatibility. Theme icon mode uses the existing q-icon Lucide sprite helper; enter Lucide names in the controls below.

Default: `icon`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_snippet`. Type: `text`.

</details>

### Supported icon name

Enter the supported icon name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `check`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_supported`. Type: `text`.

</details>

### Unsupported icon name

Enter the unsupported icon name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `alert`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_unsupported`. Type: `text`.

</details>

### Unknown icon name

Enter the unknown icon name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `info`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_unknown`. Type: `text`.

</details>

## Cart (optional)

### Show region hints on cart page

Turn on “Show region hints on cart page” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_show_region_hints`. Type: `checkbox`.

</details>

### Cart ARIA label

Enter the cart aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Cart region availability hints`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_aria_label`. Type: `text`.

</details>

### Cart heading

Enter the cart heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Region & shipping availability`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_heading`. Type: `text`.

</details>

### Cart supplier prefix

Enter the cart supplier prefix. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Supplier:`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_meta_prefix`. Type: `text`.

</details>

### Cart message mode

Choose one of the supported options below for cart message mode. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (supplier regions + markets country), Always generic.

<details><summary>Reference for connected builders</summary>

Setting: `cart_message_mode`. Type: `select`.

`auto`, `always_generic`

</details>

Cart templates placeholders: [[country_name]], [[country_code]], [[supplier_name]], [[regions_label]].

### Cart supported template

Enter the cart supported template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `[[country_code]] is listed in this supplier’s configured regions.`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_supported_template`. Type: `text`.

</details>

### Cart unsupported template

Enter the cart unsupported template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `May not ship to [[country_code]] — verify before checkout.`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_unsupported_template`. Type: `text`.

</details>

### Cart unknown template

Enter the cart unknown template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Availability varies by destination — confirm at checkout.`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_unknown_template`. Type: `text`.

</details>

### Cart generic template

Enter the cart generic template. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shipping availability varies by destination.`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_generic_template`. Type: `text`.

</details>

### Cart chip label (supported)

Enter the cart chip label (supported). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `OK`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_chip_ok`. Type: `text`.

</details>

### Cart chip label (unsupported)

Enter the cart chip label (unsupported). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Check`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_chip_warn`. Type: `text`.

</details>

### Cart chip label (unknown/generic)

Enter the cart chip label (unknown/generic). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Info`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_chip_info`. Type: `text`.

</details>

### Show duty notice under items when unsupported

Turn on “Show duty notice under items when unsupported” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_show_duty_notice`. Type: `checkbox`.

</details>

## Layout and style

### Layout style

Choose one of the supported options below for layout style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Strip.

<details><summary>Reference for connected builders</summary>

Setting: `layout_style`. Type: `select`.

`card`, `strip`

</details>

### Alignment

Choose one of the supported options below for alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `alignment`. Type: `select`.

`left`, `center`

</details>

### Vertical padding (rem ×100)

Drag the control to adjust vertical padding (rem ×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `0`.

Range: 0 to 72 ; step 4.

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

Default: `18`.

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

Default: `True`.

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

Default: `#0f172a`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_surface_color`. Type: `color`.

</details>

### Text color

Choose a color for text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f8fafc`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_text_color`. Type: `color`.

</details>

### Muted text color

Choose a color for muted text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#cbd5e1`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_muted_text_color`. Type: `color`.

</details>

### Border color

Choose a color for border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#1f2a44`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_border_color`. Type: `color`.

</details>

### Accent color

Choose a color for accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#60a5fa`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_accent_color`. Type: `color`.

</details>

### OK tone color

Choose a color for ok tone color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#22c55e`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_ok_color`. Type: `color`.

</details>

### Warning tone color

Choose a color for warning tone color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f59e0b`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_warn_color`. Type: `color`.

</details>

### Info tone color

Choose a color for info tone color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#60a5fa`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_info_color`. Type: `color`.

</details>

### Highlight glow color

Choose a color for highlight glow color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#0b2a4a`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_pill_bg_color`. Type: `color`.

</details>

## Outside-context placeholder

### Show placeholder outside product/cart context

Turn on “Show placeholder outside product/cart context” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_placeholder_outside_context`. Type: `checkbox`.

</details>

### Placeholder heading

Enter the placeholder heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Region & Availability`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_heading`. Type: `text`.

</details>

### Placeholder body

Enter the placeholder body. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Add this section to a product template (or a cart template) to display region-aware availability messaging.`.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder_body`. Type: `text`.

</details>

## File reference

`sections/3rd-party-region-availability.liquid`
