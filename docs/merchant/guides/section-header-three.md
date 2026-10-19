# Editorial header

[All documentation](../README.md) · [Support](../SUPPORT.md)

Navigation.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Editorial header.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Template availability: `{"enabled_on": {"groups": ["header"]}, "disabled_on": null}`.

## Layout

### Header layout

Choose one of the supported options below for header layout. Only the selected option applies; other settings can further customize its appearance.

Default: `menu_left_logo_center`.

Options: Center logo, Menu left, logo center, Logo center, nav below, Minimal split.

<details><summary>Reference for connected builders</summary>

Setting: `header_layout`. Type: `select`.

`center_logo`, `menu_left_logo_center`, `logo_center_nav_below`, `minimal_split`

</details>

### Header width

Choose one of the supported options below for header width. Only the selected option applies; other settings can further customize its appearance.

Default: `wide`.

Options: Full width, Wide, Contained, Narrow.

<details><summary>Reference for connected builders</summary>

Setting: `header_width`. Type: `select`.

`full_width`, `wide`, `contained`, `narrow`

</details>

### Background mode

Choose one of the supported options below for background mode. Only the selected option applies; other settings can further customize its appearance.

Default: `solid`.

Options: Solid, Transparent overlay, Transparent until scroll.

<details><summary>Reference for connected builders</summary>

Setting: `background_mode`. Type: `select`.

`solid`, `transparent`, `transparent_until_scroll`

</details>

### Sticky mode

Choose one of the supported options below for sticky mode. Only the selected option applies; other settings can further customize its appearance.

Default: `sticky_shadow`.

Options: None, Sticky, Sticky with shadow, Transparent to solid.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_mode`. Type: `select`.

`none`, `sticky`, `sticky_shadow`, `transparent_to_solid`

</details>

### Mobile menu style

Choose one of the supported options below for mobile menu style. Only the selected option applies; other settings can further customize its appearance.

Default: `fullscreen`.

Options: Drawer, Fullscreen, Minimal.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_menu_style`. Type: `select`.

`drawer`, `fullscreen`, `minimal`

</details>

## Announcement bar

### Show announcement bar

Turn on “Show announcement bar” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_enable`. Type: `checkbox`.

</details>

### Announcement text

Enter the announcement text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Complimentary shipping on select orders`.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_text`. Type: `text`.

</details>

### Announcement link label

Enter the announcement link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_link_label`. Type: `text`.

</details>

### Announcement link URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_link_url`. Type: `url`.

</details>

### Announcement alignment

Choose one of the supported options below for announcement alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Announcement background

Choose a color for announcement background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_bg`. Type: `color`.

</details>

### Announcement text

Choose a color for announcement text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_text_color`. Type: `color`.

</details>

### Announcement font size

Drag the control to adjust announcement font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `12`.

Range: 11 to 16 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_font_size`. Type: `range`.

</details>

## Logo

### Transparent header logo

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `transparent_logo`. Type: `image_picker`.

</details>

### Desktop logo height

Drag the control to adjust desktop logo height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `34`.

Range: 18 to 110 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `logo_height_desktop`. Type: `range`.

</details>

### Mobile logo height

Drag the control to adjust mobile logo height. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 18 to 70 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `logo_height_mobile`. Type: `range`.

</details>

### Store name size

Drag the control to adjust store name size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `26`.

Range: 18 to 44 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `logo_text_size`. Type: `range`.

</details>

## Search

### Search display

Choose one of the supported options below for search display. Only the selected option applies; other settings can further customize its appearance.

Default: `search_button`.

Options: No search, Search button.

<details><summary>Reference for connected builders</summary>

Setting: `search_display`. Type: `select`.

`none`, `search_button`

</details>

### Search button action

Choose one of the supported options below for search button action. Only the selected option applies; other settings can further customize its appearance.

Default: `popup`.

Options: Open popup, Go to search page.

<details><summary>Reference for connected builders</summary>

Setting: `search_button_action`. Type: `select`.

`popup`, `page`

</details>

## Account

### Show account link

Turn on “Show account link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_account`. Type: `checkbox`.

</details>

### Customer account menu

Create or edit a menu in Content > Menus, then select it here. Nest links to create dropdown levels. Preview both desktop navigation and the mobile menu.

Used by Shopify customer accounts. Edit links in Content > Menus.

Default: `customer-account-main-menu`.

<details><summary>Reference for connected builders</summary>

Setting: `customer_account_menu`. Type: `link_list`.

</details>

### Account display

Choose one of the supported options below for account display. Only the selected option applies; other settings can further customize its appearance.

Default: `icon`.

Options: Icon, Text, Icon and text.

<details><summary>Reference for connected builders</summary>

Setting: `account_display`. Type: `select`.

`icon`, `text`, `icon_text`

</details>

## Cart

### Cart display

Choose one of the supported options below for cart display. Only the selected option applies; other settings can further customize its appearance.

Default: `icon`.

Options: Icon, Icon and text.

<details><summary>Reference for connected builders</summary>

Setting: `cart_display`. Type: `select`.

`icon`, `icon_text`

</details>

## Colors

### Header background

Choose a color for header background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `header_bg`. Type: `color`.

</details>

### Header text

Choose a color for header text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#121212`.

<details><summary>Reference for connected builders</summary>

Setting: `header_text`. Type: `color`.

</details>

### Header links

Choose a color for header links. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#121212`.

<details><summary>Reference for connected builders</summary>

Setting: `header_link`. Type: `color`.

</details>

### Header link hover

Choose a color for header link hover. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#7a5c3a`.

<details><summary>Reference for connected builders</summary>

Setting: `header_link_hover`. Type: `color`.

</details>

### Header border

Choose a color for header border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e8e2d8`.

<details><summary>Reference for connected builders</summary>

Setting: `header_border`. Type: `color`.

</details>

### Transparent text

Choose a color for transparent text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `transparent_text`. Type: `color`.

</details>

### Transparent links

Choose a color for transparent links. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `transparent_link`. Type: `color`.

</details>

### Dropdown background

Choose a color for dropdown background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `dropdown_bg`. Type: `color`.

</details>

### Dropdown text

Choose a color for dropdown text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#121212`.

<details><summary>Reference for connected builders</summary>

Setting: `dropdown_text`. Type: `color`.

</details>

### Dropdown border

Choose a color for dropdown border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e8e2d8`.

<details><summary>Reference for connected builders</summary>

Setting: `dropdown_border`. Type: `color`.

</details>

## Typography

### Menu font size

Drag the control to adjust menu font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `13`.

Range: 11 to 18 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `menu_font_size`. Type: `range`.

</details>

### Menu font weight

Choose one of the supported options below for menu font weight. Only the selected option applies; other settings can further customize its appearance.

Default: `500`.

Options: Regular, Medium, Semi-bold, Bold.

<details><summary>Reference for connected builders</summary>

Setting: `menu_font_weight`. Type: `select`.

`400`, `500`, `600`, `700`

</details>

### Letter spacing

Drag the control to adjust letter spacing. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `0.1`.

Range: 0 to 0.2 em; step 0.1.

<details><summary>Reference for connected builders</summary>

Setting: `letter_spacing`. Type: `range`.

</details>

### Text transform

Choose one of the supported options below for text transform. Only the selected option applies; other settings can further customize its appearance.

Default: `uppercase`.

Options: None, Uppercase, Capitalize.

<details><summary>Reference for connected builders</summary>

Setting: `text_transform`. Type: `select`.

`none`, `uppercase`, `capitalize`

</details>

## Spacing

### Vertical padding

Drag the control to adjust vertical padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `22`.

Range: 10 to 42 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `header_padding_y`. Type: `range`.

</details>

### Horizontal padding

Drag the control to adjust horizontal padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `32`.

Range: 12 to 70 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `header_padding_x`. Type: `range`.

</details>

### Menu gap

Drag the control to adjust menu gap. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `28`.

Range: 12 to 54 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `menu_gap`. Type: `range`.

</details>

### Dropdown padding

Drag the control to adjust dropdown padding. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `22`.

Range: 12 to 38 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `dropdown_padding`. Type: `range`.

</details>

## Radius

### Button radius

Drag the control to adjust button radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `24`.

Range: 0 to 40 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `button_radius`. Type: `range`.

</details>

### Dropdown radius

Drag the control to adjust dropdown radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `18`.

Range: 0 to 32 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `dropdown_radius`. Type: `range`.

</details>

## Effects

### Enable background blur

Turn on “Enable background blur” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `enable_blur`. Type: `checkbox`.

</details>

### Show header shadow

Turn on “Show header shadow” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `header_shadow`. Type: `checkbox`.

</details>

### Transition speed

Drag the control to adjust transition speed. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `260`.

Range: 120 to 600 ms; step 20.

<details><summary>Reference for connected builders</summary>

Setting: `transition_speed`. Type: `range`.

</details>

## File reference

`sections/header-three.liquid`
