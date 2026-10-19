# Popups

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Popups.
2. Write the offer, choose imagery, and select the signup form or link destination before enabling the popup. A newsletter form collects an opt-in; it does not create or send a discount code.
3. Choose a trigger and frequency, then preview desktop and mobile. Use the editor preview option to inspect it when stored frequency rules would hide it.
4. Check Escape, the close button, focus return, and readability. Keep the underlying page usable when the popup is dismissed.
5. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
6. Preview a home, product, collection, and cart page before saving shared changes.

## Enable / behavior

### Enable global popup

Turn on “Enable global popup” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_enable`. Type: `checkbox`.

</details>

### Preview popup in theme editor

Turn on “Preview popup in theme editor” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it. Saved frequency state can prevent the popup from appearing again in the same browser. Use the editor preview control to review content without treating it as a new customer subscription.

Opens once per preview render without storing frequency. Works while the storefront popup is disabled. Close it normally to continue editing.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_editor_preview`. Type: `checkbox`.

</details>

### Popup trigger

Choose one of the supported options below for popup trigger. Only the selected option applies; other settings can further customize its appearance.

Exit intent works on desktop pointer exit only. First visit uses browser storage only when Shopify permits preference storage; otherwise it lasts for this page. Manual uses a configured popup opener.

Default: `delay`.

Options: Delay, Scroll, Exit intent, Manual, First visit.

<details><summary>Reference for connected builders</summary>

Setting: `popup_trigger`. Type: `select`.

`delay`, `scroll`, `exit_intent`, `manual`, `first_visit`

</details>

### Delay before showing

Drag the control to adjust delay before showing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `8`.

Range: 0 to 60 s; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `popup_delay_seconds`. Type: `range`.

</details>

### Scroll trigger percent

Drag the control to adjust scroll trigger percent. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `45`.

Range: 10 to 100 %; step 5.

<details><summary>Reference for connected builders</summary>

Setting: `popup_scroll_percent`. Type: `range`.

</details>

### Popup frequency

Choose one of the supported options below for popup frequency. Only the selected option applies; other settings can further customize its appearance. Saved frequency state can prevent the popup from appearing again in the same browser. Use the editor preview control to review content without treating it as a new customer subscription.

Automatic display occurs at most once per page. Session/day/week memory requires Shopify preference permission and usable browser storage; otherwise page memory only. Manual open bypasses frequency. This is not tracking consent.

Default: `once_per_session`.

Options: Every eligible page, Once per session, Once per day, Once per week.

<details><summary>Reference for connected builders</summary>

Setting: `popup_frequency`. Type: `select`.

`always`, `once_per_session`, `once_per_day`, `once_per_week`

</details>

### Show on mobile

Turn on “Show on mobile” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_show_on_mobile`. Type: `checkbox`.

</details>

### Show on desktop

Turn on “Show on desktop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_show_on_desktop`. Type: `checkbox`.

</details>

### Close when overlay is clicked

Turn on “Close when overlay is clicked” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_overlay_click_close`. Type: `checkbox`.

</details>

## Placement

### Popup placement

Choose one of the supported options below for popup placement. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Center, Top, Bottom, Bottom right, Bottom left, Right drawer, Left drawer, Fullscreen.

<details><summary>Reference for connected builders</summary>

Setting: `popup_placement`. Type: `select`.

`center`, `top`, `bottom`, `bottom_right`, `bottom_left`, `right_drawer`, `left_drawer`, `fullscreen`

</details>

## Animation

### Popup animation

Choose one of the supported options below for popup animation. Only the selected option applies; other settings can further customize its appearance.

Reduced-motion preferences disable movement. None opens and closes without transitions.

Default: `fade`.

Options: Fade, Slide up, Slide down, Slide left, Slide right, Zoom, None.

<details><summary>Reference for connected builders</summary>

Setting: `popup_animation`. Type: `select`.

`fade`, `slide_up`, `slide_down`, `slide_left`, `slide_right`, `zoom`, `none`

</details>

## Content

### Popup eyebrow

Enter the popup eyebrow. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Exclusive update`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_eyebrow`. Type: `text`.

</details>

### Popup heading

Enter the popup heading. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Get store updates`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_heading`. Type: `text`.

</details>

### Popup text

Use the rich text editor for paragraphs, lists, emphasis, and links. Use descriptive link text and headings in a logical order.

Default: `<p>Get updates, offers, and helpful store news delivered occasionally.</p>`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_text`. Type: `richtext`.

</details>

### Popup image

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `popup_image`. Type: `image_picker`.

</details>

### Primary button label

Enter the primary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Shop Now`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_button_label`. Type: `text`.

</details>

### Primary button URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `popup_button_url`. Type: `url`.

</details>

### Secondary button label

Enter the secondary button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `No thanks`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_secondary_label`. Type: `text`.

</details>

### Secondary button URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `popup_secondary_url`. Type: `url`.

</details>

### Show newsletter form

Turn on “Show newsletter form” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Native Shopify newsletter signup with explicit email marketing confirmation. Does not install an email app or change Shopify tracking consent.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_show_newsletter_form`. Type: `checkbox`.

</details>

### Newsletter placeholder

Enter the newsletter placeholder. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Enter your email`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_newsletter_placeholder`. Type: `text`.

</details>

### Newsletter button label

Enter the newsletter button label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Sign Up`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_newsletter_button_label`. Type: `text`.

</details>

## Style

### Popup style

Choose one of the supported options below for popup style. Only the selected option applies; other settings can further customize its appearance.

Minimal hides the image; Commerce adjusts heading measure. Width, padding and colors below apply to every style.

Default: `editorial`.

Options: Editorial, Minimal, Commerce.

<details><summary>Reference for connected builders</summary>

Setting: `popup_style`. Type: `select`.

`editorial`, `minimal`, `commerce`

</details>

### Popup image position

Choose one of the supported options below for popup image position. Only the selected option applies; other settings can further customize its appearance.

Default: `top`.

Options: Top, Left, Right, Hidden.

<details><summary>Reference for connected builders</summary>

Setting: `popup_image_position`. Type: `select`.

`top`, `left`, `right`, `hidden`

</details>

### Popup background

Choose a color for popup background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_bg`. Type: `color`.

</details>

### Popup text

Choose a color for popup text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_text_color`. Type: `color`.

</details>

### Popup heading

Choose a color for popup heading. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_heading_color`. Type: `color`.

</details>

### Popup border

Choose a color for popup border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_border_color`. Type: `color`.

</details>

### Popup button background

Choose a color for popup button background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111827`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_button_bg`. Type: `color`.

</details>

### Popup button text

Choose a color for popup button text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_button_text`. Type: `color`.

</details>

### Overlay color

Choose a color for overlay color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#000000`.

<details><summary>Reference for connected builders</summary>

Setting: `popup_overlay_color`. Type: `color`.

</details>

### Overlay opacity

Drag the control to adjust overlay opacity. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `48`.

Range: 0 to 90 %; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `popup_overlay_opacity`. Type: `range`.

</details>

### Popup radius

Drag the control to adjust popup radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Fullscreen uses square screen edges; other placements use this radius.

Default: `20`.

Range: 0 to 40 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `popup_radius`. Type: `range`.

</details>

### Popup width

Drag the control to adjust popup width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Maximum dialog width; constrained by the screen. Fullscreen fills the screen. Side images stack on smaller screens.

Default: `520`.

Range: 320 to 960 px; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `popup_width`. Type: `range`.

</details>

### Popup padding

Drag the control to adjust popup padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Content padding. Extra space at the top keeps the close button clear of the heading.

Default: `28`.

Range: 16 to 64 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `popup_padding`. Type: `range`.

</details>

## File reference

`config/settings_schema.json`
