# Header

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Header.
2. Select your Main menu and sticky preference, then open the active header section to review its own settings. Each header layout can offer local overrides.
3. Preview dropdowns and the mobile menu after adding nested menu items. Keep announcement copy brief and truthful.
4. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
5. Preview a home, product, collection, and cart page before saving shared changes.

## Header layout choice

Choose and arrange header designs in the Header section group in the editor sidebar.

## Header one — announcement bar

### Enable announcement bar

Turn on “Enable announcement bar” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Header One default. Other header designs use their own section controls.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `header_announce_enable`. Type: `checkbox`.

</details>

### Announcement text

Enter the announcement text. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Header One default. Other header designs use their own section controls.

Default: `Free shipping on orders over $75!`.

<details><summary>Reference for connected builders</summary>

Setting: `header_announce_text`. Type: `text`.

</details>

## Header one — navigation and behavior

### Desktop primary navigation

Create or edit a menu in Content > Menus, then select it here. Nest links to create dropdown levels. Preview both desktop navigation and the mobile menu.

Fallback for Headers One, Three, Four and Five when their menu is blank. Header Two uses menu blocks.

Default: `main-menu`.

<details><summary>Reference for connected builders</summary>

Setting: `desktop_menu`. Type: `link_list`.

</details>

### Sticky header

Turn on “Sticky header” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Header One default. Other header designs use their own section controls.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `header_sticky`. Type: `checkbox`.

</details>

## File reference

`config/settings_schema.json`
