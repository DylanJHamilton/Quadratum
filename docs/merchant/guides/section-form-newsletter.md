# Form – newsletter

[All documentation](../README.md) · [Support](../SUPPORT.md)

Forms and support.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Form – newsletter.
2. Select Add block inside this section. Use the supported block types listed below, then drag them into the desired reading order.
3. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
4. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Up to 20 blocks can be added.

### ARIA label

Enter the aria label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Newsletter signup form`.

<details><summary>Reference for connected builders</summary>

Setting: `aria_label`. Type: `text`.

</details>

## Layout

### Template

Choose one of the supported options below for template. Only the selected option applies; other settings can further customize its appearance.

Default: `card`.

Options: Card (incentive), Split (hero), Inline (bar).

<details><summary>Reference for connected builders</summary>

Setting: `template_style`. Type: `select`.

`card`, `split`, `inline`

</details>

### Split: media position

Choose one of the supported options below for split: media position. Only the selected option applies; other settings can further customize its appearance.

Default: `left`.

Options: Media left, Media right.

<details><summary>Reference for connected builders</summary>

Setting: `split_media_side`. Type: `select`.

`left`, `right`

</details>

### Split: image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `split_image`. Type: `image_picker`.

</details>

### Optional anchor ID

Enter the optional anchor id. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `anchor_id`. Type: `text`.

</details>

## Background (root)

### Background image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `bg_image`. Type: `image_picker`.

</details>

### Background video URL (MP4, YouTube, Vimeo)

Enter the background video url (mp4, youtube, vimeo). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Use an HTTPS MP4 or a YouTube/Vimeo video URL. Background image/color remains the fallback; playback starts paused for reduced motion and in the editor.

<details><summary>Reference for connected builders</summary>

Setting: `bg_video`. Type: `text`.

</details>

### Background color

Choose a color for background color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f6f7f8`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Overlay

Choose one of the supported options below for overlay. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

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

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `35`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `overlay_opacity`. Type: `range`.

</details>

### Gradient start

Choose a color for gradient start. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start`. Type: `color`.

</details>

### Start opacity

Drag the control to adjust start opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `40`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_start_opacity`. Type: `range`.

</details>

### Gradient end

Choose a color for gradient end. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end`. Type: `color`.

</details>

### End opacity

Drag the control to adjust end opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0`.

Range: 0 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_end_opacity`. Type: `range`.

</details>

### Gradient angle

Drag the control to adjust gradient angle. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `180`.

Range: 0 to 360 deg; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `grad_angle`. Type: `range`.

</details>

## Content

### Accent (kicker)

Enter the accent (kicker). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Join the list`.

<details><summary>Reference for connected builders</summary>

Setting: `kicker`. Type: `text`.

</details>

### Heading

Enter the heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Join & get updates`.

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

Default: `Be first to hear about new arrivals, sales, and exclusives.`.

<details><summary>Reference for connected builders</summary>

Setting: `subheading`. Type: `textarea`.

</details>

### Success message

Enter the success message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Shopify handles the submission and spam protection. Marketing confirmation follows the store’s consent and double opt-in settings.

Default: `Thanks! Check your inbox to confirm.`.

<details><summary>Reference for connected builders</summary>

Setting: `success_text`. Type: `text`.

</details>

### Error message

Enter the error message. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Please fix the highlighted fields and try again.`.

<details><summary>Reference for connected builders</summary>

Setting: `error_text`. Type: `text`.

</details>

## Form routing

### Destination

Choose one of the supported options below for destination. Only the selected option applies; other settings can further customize its appearance.

Shopify handles delivery and spam protection. Contact sends inquiries; marketing signup records consent according to store settings.

Default: `shopify_customer`.

Options: Shopify customer (accepts_marketing).

<details><summary>Reference for connected builders</summary>

Setting: `destination`. Type: `select`.

`shopify_customer`

</details>

### Hidden tags/params (comma-separated)

Enter the hidden tags/params (comma-separated). Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `newsletter, web`.

<details><summary>Reference for connected builders</summary>

Setting: `hidden_tags`. Type: `text`.

</details>

## CAPTCHA

## Button

### Button label

Enter the button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Subscribe`.

<details><summary>Reference for connected builders</summary>

Setting: `button_label`. Type: `text`.

</details>

### Variant

Choose one of the supported options below for variant. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit`.

Options: — Theme default —, Solid, Outline, Ghost.

<details><summary>Reference for connected builders</summary>

Setting: `button_variant`. Type: `select`.

`inherit`, `solid`, `outline`, `ghost`

</details>

## Form UI

### Form background

Choose a color for form background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `form_bg`. Type: `color`.

</details>

### Input radius

Drag the control to adjust input radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `10`.

Range: 0 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `input_radius`. Type: `range`.

</details>

### Input border color

Choose a color for input border color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `input_border`. Type: `color`.

</details>

## Sizing and spacing

### Container

Choose one of the supported options below for container. Only the selected option applies; other settings can further customize its appearance.

Default: `contained`.

Options: Contained, Full-bleed.

<details><summary>Reference for connected builders</summary>

Setting: `container_mode`. Type: `select`.

`contained`, `full`

</details>

### Padding Y

Drag the control to adjust padding y. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 160 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `padding_y`. Type: `range`.

</details>

### Padding X

Drag the control to adjust padding x. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 120 ; step 8.

<details><summary>Reference for connected builders</summary>

Setting: `padding_x`. Type: `range`.

</details>

### Card radius

Drag the control to adjust card radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 32 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_radius`. Type: `range`.

</details>

### Card elevation

Drag the control to adjust card elevation. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `2`.

Range: 0 to 3 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `card_shadow`. Type: `range`.

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

#### Type

Choose one of the supported options below for type. Only the selected option applies; other settings can further customize its appearance.

Default: `email`.

Options: Email, Text, Select, Checkbox, Consent, Hidden, HTML content.

<details><summary>Reference for connected builders</summary>

Setting: `field_type`. Type: `select`.

`email`, `text`, `select`, `checkbox`, `consent`, `hidden`, `html`

</details>

#### Input name

Enter the input name. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Native email uses contact[email]. A required, unconditional consent field named contact[consent_marketing] supplies marketing confirmation; use an explicit label. Other fields and custom endpoints keep their configured names.

Default: `email`.

<details><summary>Reference for connected builders</summary>

Setting: `name_attr`. Type: `text`.

</details>

#### Label

Enter the label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

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

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `required`. Type: `checkbox`.

</details>

#### Help text

Write the help text. Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `help_text`. Type: `textarea`.

</details>

#### Default/hidden value

Enter the default/hidden value. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `default_value`. Type: `text`.

</details>

#### Options (one per line, value\|label)

Write the options (one per line, value\|label). Keep paragraphs short and preview long text on mobile.

<details><summary>Reference for connected builders</summary>

Setting: `options`. Type: `textarea`.

</details>

#### Width

Choose one of the supported options below for width. Only the selected option applies; other settings can further customize its appearance.

Default: `full`.

Options: 1/2, Full.

<details><summary>Reference for connected builders</summary>

Setting: `width`. Type: `select`.

`half`, `full`

</details>

#### Show conditionally

Turn on “Show conditionally” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `condition_enable`. Type: `checkbox`.

</details>

#### When field name equals…

Enter the when field name equals…. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `condition_field`. Type: `text`.

</details>

#### …this value (or 'checked')

Enter the …this value (or 'checked'). Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `condition_value`. Type: `text`.

</details>

#### Operator

Choose one of the supported options below for operator. Only the selected option applies; other settings can further customize its appearance.

Default: `equals`.

Options: Equals, Contains, Checked.

<details><summary>Reference for connected builders</summary>

Setting: `condition_operator`. Type: `select`.

`equals`, `contains`, `checked`

</details>

#### HTML content (for HTML type)

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

<details><summary>Reference for connected builders</summary>

Setting: `html_content`. Type: `richtext`.

</details>

## File reference

`sections/form-newsletter.liquid`
