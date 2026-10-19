# Content - tab/accordion

[All documentation](../README.md) · [Support](../SUPPORT.md)

Content and merchandising.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Content - tab/accordion.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### Use short anchor links

Turn on “Use short anchor links” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Keep anchor names unique across the page. Off preserves section-prefixed IDs.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_short_anchors`. Type: `checkbox`.

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

Default: `FAQs & details`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Subheading

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Organize policies, specs, and answers into a clean interactive UI.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `richtext`.

</details>

## Layout and behavior

### Layout mode

Choose one of the supported options below for layout mode. Only the selected option applies; other settings can further customize its appearance.

Default: `tabs_horizontal`.

Options: Tabs (horizontal), Tabs (vertical), Accordion.

<details><summary>Reference for connected builders</summary>

Setting: `layout_mode`. Type: `select`.

`tabs_horizontal`, `tabs_vertical`, `accordion`

</details>

### Style preset

Choose one of the supported options below for style preset. Only the selected option applies; other settings can further customize its appearance.

Default: `default`.

Options: Default, FAQ, Minimal, Boxed.

<details><summary>Reference for connected builders</summary>

Setting: `style_preset`. Type: `select`.

`default`, `faq`, `minimal`, `boxed`

</details>

### Tab alignment (horizontal tabs)

Choose one of the supported options below for tab alignment (horizontal tabs). Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, Center, Justify.

<details><summary>Reference for connected builders</summary>

Setting: `tab_alignment`. Type: `select`.

`left`, `center`, `justify`

</details>

### Icon position

Choose one of the supported options below for icon position. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Left, None.

<details><summary>Reference for connected builders</summary>

Setting: `icon_position`. Type: `select`.

`left`, `none`

</details>

### Accordion default open

Choose one of the supported options below for accordion default open. Only the selected option applies; other settings can further customize its appearance.

Default: `first_open`.

Options: First open, All closed.

<details><summary>Reference for connected builders</summary>

Setting: `accordion_default_open`. Type: `select`.

`first_open`, `all_closed`

</details>

### Accordion behavior

Choose one of the supported options below for accordion behavior. Only the selected option applies; other settings can further customize its appearance.

Default: `multi_open`.

Options: Allow multiple open, Single open only.

<details><summary>Reference for connected builders</summary>

Setting: `accordion_behavior`. Type: `select`.

`multi_open`, `single_open_only`

</details>

### Mobile behavior

Choose one of the supported options below for mobile behavior. Only the selected option applies; other settings can further customize its appearance.

Default: `auto`.

Options: Auto (horizontal tabs → accordion on mobile), Keep tabs, Force accordion.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_mode`. Type: `select`.

`auto`, `keep_tabs`, `force_accordion`

</details>

### Mobile breakpoint (px)

Enter a number for mobile breakpoint (px). Follow the unit and instructions shown below. A number alone does not create a Shopify discount, shipping rate, or inventory rule.

Default: `768`.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_breakpoint`. Type: `number`.

</details>

### Update URL hash on activate (section-id + anchor_id)

Turn on “Update URL hash on activate (section-id + anchor_id)” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `update_hash`. Type: `checkbox`.

</details>

## Layout sizing

### Max width (px)

Drag the control to adjust max width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1152`.

Range: 720 to 1440 ; step 24.

<details><summary>Reference for connected builders</summary>

Setting: `max_width`. Type: `range`.

</details>

### Padding Y (px)

Drag the control to adjust padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 120 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_y`. Type: `range`.

</details>

### Padding X (px)

Drag the control to adjust padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 80 ; step 4.

<details><summary>Reference for connected builders</summary>

Setting: `pad_x`. Type: `range`.

</details>

### Gap (px)

Drag the control to adjust gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 8 to 48 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `gap`. Type: `range`.

</details>

## Typography

### Heading size (px)

Drag the control to adjust heading size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `32`.

Range: 18 to 56 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `heading_fs`. Type: `range`.

</details>

### Heading weight

Drag the control to adjust heading weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `700`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `heading_fw`. Type: `range`.

</details>

### Subheading size (px)

Drag the control to adjust subheading size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_fs`. Type: `range`.

</details>

### Subheading line-height (×100)

Drag the control to adjust subheading line-height (×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `160`.

Range: 120 to 220 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `subheading_lh_x100`. Type: `range`.

</details>

### Label size (px)

Drag the control to adjust label size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `15`.

Range: 12 to 26 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `label_fs`. Type: `range`.

</details>

### Label weight

Drag the control to adjust label weight. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `600`.

Range: 300 to 900 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `label_fw`. Type: `range`.

</details>

### Label letter-spacing (em ×1000)

Drag the control to adjust label letter-spacing (em ×1000). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 1,000: 20 means 0.02em of letter spacing.

Default: `0`.

Range: -20 to 80 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `label_ls_x1000`. Type: `range`.

</details>

### Label font family

Choose one of the supported options below for label font family. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit, Body font, Heading font.

<details><summary>Reference for connected builders</summary>

Setting: `label_font_mode`. Type: `select`.

`inherit`, `body`, `heading`

</details>

### Label font style

Choose one of the supported options below for label font style. Only the selected option applies; other settings can further customize its appearance.

Default: `normal`.

Options: Normal, Italic.

<details><summary>Reference for connected builders</summary>

Setting: `label_font_style`. Type: `select`.

`normal`, `italic`

</details>

### Label text transform

Choose one of the supported options below for label text transform. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Uppercase, Lowercase, Capitalize.

<details><summary>Reference for connected builders</summary>

Setting: `label_transform`. Type: `select`.

`none`, `uppercase`, `lowercase`, `capitalize`

</details>

### Body size (px)

Drag the control to adjust body size (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 12 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `body_fs`. Type: `range`.

</details>

### Body line-height (×100)

Drag the control to adjust body line-height (×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `170`.

Range: 120 to 220 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `body_lh_x100`. Type: `range`.

</details>

## Surface style

### Outer radius (px)

Drag the control to adjust outer radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

### Shadow strength (×100)

Drag the control to adjust shadow strength (×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `40`.

Range: 0 to 100 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `shadow_strength_x100`. Type: `range`.

</details>

## Tabs — pill styling

### Tab radius (px)

Drag the control to adjust tab radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `tab_radius`. Type: `range`.

</details>

### Tab padding Y (px)

Drag the control to adjust tab padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 6 to 22 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `tab_pad_y`. Type: `range`.

</details>

### Tab padding X (px)

Drag the control to adjust tab padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 10 to 34 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `tab_pad_x`. Type: `range`.

</details>

### Tab gap (px)

Drag the control to adjust tab gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 4 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `tab_gap`. Type: `range`.

</details>

### Tab border width (px)

Drag the control to adjust tab border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `tab_border_w`. Type: `range`.

</details>

### Active tab indicator

Choose one of the supported options below for active tab indicator. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Underline.

<details><summary>Reference for connected builders</summary>

Setting: `tab_active_indicator`. Type: `select`.

`none`, `underline`

</details>

## Accordion — header styling

### Accordion item radius (px)

Drag the control to adjust accordion item radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 0 to 40 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `acc_radius`. Type: `range`.

</details>

### Accordion header padding Y (px)

Drag the control to adjust accordion header padding y (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 10 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `acc_pad_y`. Type: `range`.

</details>

### Accordion header padding X (px)

Drag the control to adjust accordion header padding x (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 10 to 34 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `acc_pad_x`. Type: `range`.

</details>

### Accordion item gap (px)

Drag the control to adjust accordion item gap (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 4 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `acc_gap`. Type: `range`.

</details>

### Accordion border width (px)

Drag the control to adjust accordion border width (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 4 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `acc_border_w`. Type: `range`.

</details>

## Base colors

### Use custom colors

Turn on “Use custom colors” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `use_custom_colors`. Type: `checkbox`.

</details>

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text`. Type: `color`.

</details>

### Muted text

Choose a color for muted text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#6b7280`.

<details><summary>Reference for connected builders</summary>

Setting: `muted`. Type: `color`.

</details>

### Accent

Choose a color for accent. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `accent`. Type: `color`.

</details>

### Surface

Choose a color for surface. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `surface`. Type: `color`.

</details>

### Border

Choose a color for border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `border`. Type: `color`.

</details>

## Tabs — colors

### Tab background

Choose a color for tab background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_bg`. Type: `color`.

</details>

### Tab text

Choose a color for tab text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_text`. Type: `color`.

</details>

### Tab border

Choose a color for tab border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_border`. Type: `color`.

</details>

### Active tab background

Choose a color for active tab background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_active_bg`. Type: `color`.

</details>

### Active tab text

Choose a color for active tab text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_active_text`. Type: `color`.

</details>

### Active tab border

Choose a color for active tab border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `tab_active_border`. Type: `color`.

</details>

## Accordion — colors

### Accordion header background

Choose a color for accordion header background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `acc_bg`. Type: `color`.

</details>

### Accordion header text

Choose a color for accordion header text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `acc_text`. Type: `color`.

</details>

### Accordion header border

Choose a color for accordion header border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `acc_border`. Type: `color`.

</details>

### Active accordion background

Choose a color for active accordion background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `acc_active_bg`. Type: `color`.

</details>

### Active accordion text

Choose a color for active accordion text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `acc_active_text`. Type: `color`.

</details>

### Active accordion border

Choose a color for active accordion border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `acc_active_border`. Type: `color`.

</details>

## Blocks you can add

### Item

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shipping`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Icon (emoji or short text)

Enter the icon (emoji or short text). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `🚚`.

<details><summary>Reference for connected builders</summary>

Setting: `icon`. Type: `text`.

</details>

#### Anchor ID (optional)

Enter the anchor id (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `shipping`.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

#### Content

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Add your content here. This supports links, lists, and basic formatting.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `content`. Type: `richtext`.

</details>

## File reference

`sections/interactive-content-helper-tabs-accordion.liquid`
