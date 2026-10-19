# Forms – compact

[All documentation](../README.md) · [Support](../SUPPORT.md)

Forms and support.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Forms – compact.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Quote request form`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Layout

### Template style

Choose one of the supported options below for template style. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card, Split, Steps.

<details><summary>Reference for connected builders</summary>

Setting: `template_style`. Type: `select`.

`card`, `split`, `steps`

</details>

### Surface

Choose one of the supported options below for surface. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card surface, Frameless (no card).

<details><summary>Reference for connected builders</summary>

Setting: `surface_style`. Type: `select`.

`card`, `frameless`

</details>

### Split media side

Choose one of the supported options below for split media side. Only the selected option applies; other settings can further customize its appearance.

Default: `right`.

Options: Left, Right.

<details><summary>Reference for connected builders</summary>

Setting: `split_media_side`. Type: `select`.

`left`, `right`

</details>

### Split media image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `split_image`. Type: `image_picker`.

</details>

## Background and overlay (root only)

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Background video URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Decorative background; image/color remains without playback. Provide an HTTPS URL. Videos must allow embedding.

<details><summary>Reference for connected builders</summary>

Setting: `bg_video`. Type: `url`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Overlay type

Choose one of the supported options below for overlay type. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: None, Solid, Gradient.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_type`. Type: `select`.

`none`, `solid`, `gradient`

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_color`. Type: `color`.

</details>

### Overlay opacity (×100)

Drag the control to adjust overlay opacity (×100). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions. This editor value is scaled by 100: 150 means 1.5, in the unit shown in the label.

Default: `24`.

Range: 0 to 100 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Gradient from

Choose a color for gradient from. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `gradient_from`. Type: `color`.

</details>

### Gradient to

Choose a color for gradient to. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `gradient_to`. Type: `color`.

</details>

### Gradient angle

Drag the control to adjust gradient angle. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 360 ; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `gradient_angle`. Type: `range`.

</details>

## Content

### Kicker

Enter the kicker. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Request a quote`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Get a Fast, Accurate Quote`.

<details><summary>Reference for connected builders</summary>

Setting: `heading`. Type: `text`.

</details>

### Heading level

Choose one of the supported options below for heading level. Only the selected option applies; other settings can further customize its appearance.

Default: `h2`.

Options: H2, H3.

<details><summary>Reference for connected builders</summary>

Setting: `heading_level`. Type: `select`.

`h2`, `h3`

</details>

### Subheading

Write the subheading. Keep paragraphs short and preview long text on mobile.

Default: `Tell us a few details and we’ll reply within 1 business day.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Success message

Enter the success message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Thanks! Your request has been sent.`.

<details><summary>Reference for connected builders</summary>

Setting: `success_text`. Type: `text`.

</details>

### Error message

Enter the error message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Please fix the highlighted fields and try again.`.

<details><summary>Reference for connected builders</summary>

Setting: `error_text`. Type: `text`.

</details>

## Destination

### Submission destination

Choose one of the supported options below for submission destination. Only the selected option applies; other settings can further customize its appearance.

Shopify handles delivery and spam protection. Contact sends inquiries; marketing signup records consent according to store settings.

Default: `shopify_contact`.

Options: Shopify contact, Shopify marketing signup.

<details><summary>Reference for connected builders</summary>

Setting: `destination`. Type: `select`.

`shopify_contact`, `shopify_customer`

</details>

### Hidden tags (comma-separated)

Enter the hidden tags (comma-separated). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `form, web, quote-full`.

<details><summary>Reference for connected builders</summary>

Setting: `hidden_tags`. Type: `text`.

</details>

## Captcha

## Button and inputs

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Request Quote`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Button variant

Choose one of the supported options below for button variant. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: Inherit (theme default), Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_variant`. Type: `select`.

`inherit`, `solid`, `outline`, `ghost`

</details>

### Form surface color

Choose a color for form surface color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `form_bg`. Type: `color`.

</details>

### Input radius (px)

Drag the control to adjust input radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `input_radius`. Type: `range`.

</details>

### Input border (px)

Drag the control to adjust input border (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `input_border`. Type: `range`.

</details>

## Sizing and visibility

### Container width

Choose one of the supported options below for container width. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained, Full width.

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Section padding Y (rem ×10)

Drag the control to adjust section padding y (rem ×10). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 96 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `padding_y`. Type: `range`.

</details>

### Section padding X (rem ×10)

Drag the control to adjust section padding x (rem ×10). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 96 ; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `padding_x`. Type: `range`.

</details>

### Card radius (px)

Drag the control to adjust card radius (px). Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 28 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card shadow

Choose one of the supported options below for card shadow. Only the selected option applies; other settings can further customize its appearance.

Default: `md`.

Options: None, Small, Medium, Large.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `select`.

`none`, `sm`, `md`, `lg`

</details>

### Anchor id (optional)

Enter the anchor id (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

### Hide on mobile

Turn on “Hide on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_on_mobile`. Type: `checkbox`.

</details>

### Hide on desktop

Turn on “Hide on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `hide_on_desktop`. Type: `checkbox`.

</details>

## Blocks you can add

### Field

#### Field type

Choose one of the supported options below for field type. Only the selected option applies; other settings can further customize its appearance.

File uploads and passwords use custom endpoints. Shopify forms use a file link and omit passwords.

Default: `text`.

Options: Text, Email, Phone, Textarea, Select, Radio, Checkbox, Consent, Hidden, Number, URL, Date, Time, Password, File, HTML.

<details><summary>Reference for connected builders</summary>

Setting: `field_type`. Type: `select`.

`text`, `email`, `tel`, `textarea`, `select`, `radio`, `checkbox`, `consent`, `hidden`, `number`, `url`, `date`, `time`, `password`, `file`, `html`

</details>

#### Input name

Enter the input name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Use a unique field name. Blank/default names receive a stable block suffix. The first native email field is contact[email].

Default: `contact[field]`.

<details><summary>Reference for connected builders</summary>

Setting: `name_attr`. Type: `text`.

</details>

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Field`.

<details><summary>Reference for connected builders</summary>

Setting: `label`. Type: `text`.

</details>

#### Placeholder

Enter the placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `placeholder`. Type: `text`.

</details>

#### Required

Turn on “Required” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `required`. Type: `checkbox`.

</details>

#### Help text

Enter the help text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `help_text`. Type: `text`.

</details>

#### Default value

Enter the default value. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `default_value`. Type: `text`.

</details>

#### Options (value\|label per line)

Write the options (value\|label per line). Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `options`. Type: `textarea`.

</details>

#### Accept (file types)

Enter the accept (file types). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `accept`. Type: `text`.

</details>

#### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `full`.

Options: Full, Half.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `select`.

`full`, `half`

</details>

### Conditional display

#### Enable condition

Turn on “Enable condition” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Requires JavaScript. Hidden fields are omitted from submission. The native email field always stays available.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `condition_enable`. Type: `checkbox`.

</details>

#### When field name is

Enter the when field name is. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `condition_field`. Type: `text`.

</details>

#### Operator

Choose one of the supported options below for operator. Only the selected option applies; other settings can further customize its appearance.

Default: `equals`.

Options: Equals, Contains, Checked.

<details><summary>Reference for connected builders</summary>

Setting: `condition_operator`. Type: `select`.

`equals`, `contains`, `checked`

</details>

#### Value

Enter the value. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `condition_value`. Type: `text`.

</details>

### HTML field

#### HTML content

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Rich text</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `html_content`. Type: `richtext`.

</details>

### Step (for steps layout)

#### Step title

Enter the step title. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Step`.

<details><summary>Reference for connected builders</summary>

Setting: `step_title`. Type: `text`.

</details>

#### Step description

Write the step description. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `step_desc`. Type: `textarea`.

</details>

## File reference

`sections/form-compact.liquid`
