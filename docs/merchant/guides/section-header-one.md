# Compact header

[All documentation](../README.md) · [Support](../SUPPORT.md)

Navigation.

## Add and configure

1. Open Online Store > Themes > Customize for an unpublished copy. Choose the page template, select Add section, and choose Compact header.
2. Connect your own content and media before adjusting layout, typography, color, and spacing. Section overrides take priority where the section offers them.
3. Preview desktop and mobile, test any links or controls, and save. Publish only after reviewing the complete customer journey.

Template availability: `{"enabled_on": {"groups": ["header"]}, "disabled_on": null}`.

### Transparent header on homepage

Turn on “Transparent header on homepage” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `home_transparent`. Type: `checkbox`.

</details>

## Layout

### Header width

Choose one of the supported options below for header width. Only the selected option applies; other settings can further customize its appearance.

Default: `full_width`.

Options: Full width, Contained, Wide.

<details><summary>Reference for connected builders</summary>

Setting: `header_width`. Type: `select`.

`full_width`, `contained`, `wide`

</details>

### Desktop layout

Choose one of the supported options below for desktop layout. Only the selected option applies; other settings can further customize its appearance.

Default: `logo_left`.

Options: Logo left, Logo center, Logo left, nav left.

<details><summary>Reference for connected builders</summary>

Setting: `header_layout`. Type: `select`.

`logo_left`, `logo_center`, `logo_left_nav_left`

</details>

### Sticky mode

Choose one of the supported options below for sticky mode. Only the selected option applies; other settings can further customize its appearance.

Default: `inherit_global`.

Options: Inherit global setting, None, Sticky, Sticky with shadow.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_mode`. Type: `select`.

`inherit_global`, `none`, `sticky`, `sticky_shadow`

</details>

### Sticky z-index

Drag the control to adjust sticky z-index. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `80`.

Range: 20 to 500 ; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `sticky_z_index`. Type: `range`.

</details>

### Radius

Drag the control to adjust radius. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `16`.

Range: 0 to 28 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `radius`. Type: `range`.

</details>

## Navigation

### Menu

Create or edit a menu in Content > Menus, then select it here. Nest links to create dropdown levels. Preview both desktop navigation and the mobile menu.

Optional. If blank, Header One uses the global desktop menu setting.

Default: `main-menu`.

<details><summary>Reference for connected builders</summary>

Setting: `menu`. Type: `link_list`.

</details>

## Logo

### Logo override

Select or upload an image. Add descriptive alt text and set its focal point in Shopify Files. Check the crop on both desktop and mobile; the image does not change the original file.

<details><summary>Reference for connected builders</summary>

Setting: `logo`. Type: `image_picker`.

</details>

### Logo alt text

Enter the logo alt text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `logo_alt`. Type: `text`.

</details>

### Logo height desktop

Drag the control to adjust logo height desktop. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `38`.

Range: 20 to 120 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `logo_height_desktop`. Type: `range`.

</details>

### Logo height mobile

Drag the control to adjust logo height mobile. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `30`.

Range: 18 to 80 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `logo_height_mobile`. Type: `range`.

</details>

## Search

### Header search display

Choose one of the supported options below for header search display. Only the selected option applies; other settings can further customize its appearance.

Default: `none`.

Options: No search, Inline static search form, Search icon button.

<details><summary>Reference for connected builders</summary>

Setting: `search_display`. Type: `select`.

`none`, `inline_static`, `search_button`

</details>

### Search button action

Choose one of the supported options below for search button action. Only the selected option applies; other settings can further customize its appearance.

Default: `popup`.

Options: Open popup, Go to search page.

<details><summary>Reference for connected builders</summary>

Setting: `search_button_action`. Type: `select`.

`popup`, `page`

</details>

### Header search placeholder override

Enter the header search placeholder override. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Default: `Search products, articles, and pages`.

<details><summary>Reference for connected builders</summary>

Setting: `search_placeholder`. Type: `text`.

</details>

### Inline search width

Drag the control to adjust inline search width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `320`.

Range: 220 to 420 px; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `search_width`. Type: `range`.

</details>

### Show inline search button

Turn on “Show inline search button” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_inline_search_button`. Type: `checkbox`.

</details>

## Account

### Show account icon

Turn on “Show account icon” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_account_icon`. Type: `checkbox`.

</details>

### Customer account menu

Create or edit a menu in Content > Menus, then select it here. Nest links to create dropdown levels. Preview both desktop navigation and the mobile menu.

Used by Shopify customer accounts. Edit links in Content > Menus.

Default: `customer-account-main-menu`.

<details><summary>Reference for connected builders</summary>

Setting: `customer_account_menu`. Type: `link_list`.

</details>

## Header colors

### Background

Choose a color for background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_color`. Type: `color`.

</details>

### Soft hover background

Choose a color for soft hover background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f5f7fa`.

<details><summary>Reference for connected builders</summary>

Setting: `bg_soft_color`. Type: `color`.

</details>

### Text

Choose a color for text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `text_color`. Type: `color`.

</details>

### Border

Choose a color for border. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#e5e7eb`.

<details><summary>Reference for connected builders</summary>

Setting: `border_color`. Type: `color`.

</details>

### Link color

Choose a color for link color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `link_color`. Type: `color`.

</details>

### Link hover color

Choose a color for link hover color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `link_hover_color`. Type: `color`.

</details>

### Menu underline color

Choose a color for menu underline color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#2563eb`.

<details><summary>Reference for connected builders</summary>

Setting: `nav_underline_color`. Type: `color`.

</details>

## Icon buttons

### Icon button size

Drag the control to adjust icon button size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `44`.

Range: 38 to 56 px; step 2.

<details><summary>Reference for connected builders</summary>

Setting: `icon_button_size`. Type: `range`.

</details>

### Icon button border width

Drag the control to adjust icon button border width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `1`.

Range: 0 to 3 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `icon_button_border_width`. Type: `range`.

</details>

### Show icon button shadow

Turn on “Show icon button shadow” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_button_shadow`. Type: `checkbox`.

</details>

### Icon background

Choose a color for icon background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_bg`. Type: `color`.

</details>

### Icon background hover

Choose a color for icon background hover. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#f5f7fa`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_bg_hover`. Type: `color`.

</details>

### Icon color

Choose a color for icon color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `icon_color`. Type: `color`.

</details>

### Cart count background

Choose a color for cart count background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_count_bg`. Type: `color`.

</details>

### Cart count text

Choose a color for cart count text. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `cart_count_text`. Type: `color`.

</details>

## Mobile menu

### Mobile menu style

Choose one of the supported options below for mobile menu style. Only the selected option applies; other settings can further customize its appearance.

Default: `dropdown`.

Options: Dropdown, Drawer-like, Minimal.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_menu_style`. Type: `select`.

`dropdown`, `drawer_like`, `minimal`

</details>

### Mobile drawer width

Drag the control to adjust mobile drawer width. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `380`.

Range: 280 to 520 px; step 10.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_drawer_width`. Type: `range`.

</details>

### Mobile drawer z-index

Drag the control to adjust mobile drawer z-index. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `4000`.

Range: 500 to 9500 ; step 100.

<details><summary>Reference for connected builders</summary>

Setting: `mobile_z_index`. Type: `range`.

</details>

### Show mobile account link

Turn on “Show mobile account link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_mobile_account_link`. Type: `checkbox`.

</details>

### Show mobile cart link

Turn on “Show mobile cart link” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `show_mobile_cart_link`. Type: `checkbox`.

</details>

## Announcement bar

### Announcement alignment

Choose one of the supported options below for announcement alignment. Only the selected option applies; other settings can further customize its appearance.

Default: `center`.

Options: Left, Center, Right.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_alignment`. Type: `select`.

`left`, `center`, `right`

</details>

### Announcement font size

Drag the control to adjust announcement font size. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Default: `14`.

Range: 11 to 18 px; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_font_size`. Type: `range`.

</details>

### Announcement link URL

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_link_url`. Type: `url`.

</details>

### Announcement link label

Enter the announcement link label. Replace sample wording with your own content; leave optional fields empty when you do not need them.

<details><summary>Reference for connected builders</summary>

Setting: `announcement_link_label`. Type: `text`.

</details>

### Announcement background

Choose a color for announcement background. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#111111`.

<details><summary>Reference for connected builders</summary>

Setting: `announce_bg`. Type: `color`.

</details>

### Announcement text color

Choose a color for announcement text color. Check the paired background or text color: body text needs readable contrast, including hover and focus states.

Default: `#ffffff`.

<details><summary>Reference for connected builders</summary>

Setting: `announce_text`. Type: `color`.

</details>

## File reference

`sections/header-one.liquid`
