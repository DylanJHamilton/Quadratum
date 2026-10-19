# 3P - fulfillment timeline

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose 3P - fulfillment timeline.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Static content only. Enter your actual fulfillment steps and current estimates; no shipping system updates these values automatically. Header colors follow the chosen theme surface; the color controls below apply to cards and their details.

### Enable section

Turn on “Enable section” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_section`. Type: `checkbox`.

</details>

### Section aria-label

Enter the section aria-label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fulfillment workflow timeline`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `How your order moves`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `From order to delivery`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Intro text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Here’s what to expect once you place your order, from initial processing to final delivery.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `body`. Type: `richtext`.

</details>

### Show current typical lead time

Turn on “Show current typical lead time” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_lead_time`. Type: `checkbox`.

</details>

### Lead time label

Enter the lead time label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Current typical lead time`.

<details><summary>Reference for connected builders</summary>

Setting: `lead_time_label`. Type: `text`.

</details>

### Lead time value

Enter the lead time value. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `lead_time_value`. Type: `text`.

</details>

### Timeline layout

Choose one of the supported options below for timeline layout. Only the selected option applies; other settings can further customize its appearance.

Default: `horizontal`.

Options: Horizontal rail on desktop, vertical on mobile, Vertical stacked timeline, Steps as stacked cards (no connectors).

<details><summary>Reference for connected builders</summary>

Setting: `layout_variant`. Type: `select`.

`horizontal`, `vertical`, `stacked`

</details>

### Content alignment

Choose one of the supported options below for content alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center.

<details><summary>Reference for connected builders</summary>

Setting: `align`. Type: `select`.

`left`, `center`

</details>

### Background style

Choose one of the supported options below for background style. Only the selected option applies; other settings can further customize its appearance.

Default: `surface`.

Options: Surface, Contrast, Brand.

<details><summary>Reference for connected builders</summary>

Setting: `background_style`. Type: `select`.

`surface`, `contrast`, `brand`

</details>

### Max content width

Choose one of the supported options below for max content width. Only the selected option applies; other settings can further customize its appearance.

Default: `lg`.

Options: sm, md, lg.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `select`.

`sm`, `md`, `lg`

</details>

### Show top divider

Turn on “Show top divider” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `show_divider`. Type: `checkbox`.

</details>

### Show step numbers

Turn on “Show step numbers” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_step_index`. Type: `checkbox`.

</details>

### Show per-step timeframe

Turn on “Show per-step timeframe” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_step_duration`. Type: `checkbox`.

</details>

### Connector style

Choose one of the supported options below for connector style. Only the selected option applies; other settings can further customize its appearance.

Vertical and horizontal layouts only; Stacked always omits connectors.

Default: `line`.

Options: Solid line between steps, Dotted connector, No connector (cards only).

<details><summary>Reference for connected builders</summary>

Setting: `connector_style`. Type: `select`.

`line`, `dots`, `none`

</details>

### Screen reader label prefix

Enter the screen reader label prefix. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Fulfillment step`.

<details><summary>Reference for connected builders</summary>

Setting: `sr_label_prefix`. Type: `text`.

</details>

## Style

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card border width (px)

Drag the control to adjust card border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_border_w`. Type: `range`.

</details>

### Card shadow

Choose one of the supported options below for card shadow. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: None, Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `select`.

`none`, `sm`, `md`, `lg`

</details>

### Card background

Choose a color for card background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `card_bg`. Type: `color`.

</details>

### Card border color

Choose a color for card border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `card_border_color`. Type: `color`.

</details>

### Connector color

Choose a color for connector color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#d1d5db`.

<details><summary>Reference for connected builders</summary>

Setting: `rail_color`. Type: `color`.

</details>

### Card text color

Choose a color for card text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Card secondary text color

Choose a color for card secondary text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `muted_text_color`. Type: `color`.

</details>

### Highlight accent color

Choose a color for highlight accent color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `accent_color`. Type: `color`.

</details>

## Blocks you can add

### Timeline step

#### Step title

Enter the step title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Order placed`.

<details><summary>Reference for connected builders</summary>

Setting: `step_title`. Type: `text`.

</details>

#### Step description

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Describe what happens in this step.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `step_body`. Type: `richtext`.

</details>

#### Estimated timeframe

Enter the estimated timeframe. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `step_duration`. Type: `text`.

</details>

#### Highlight this step

Turn on “Highlight this step” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `is_key_step`. Type: `checkbox`.

</details>

## File reference

`sections/3rd-party-shipping-explainer.liquid`
