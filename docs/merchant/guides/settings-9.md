# Media settings

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Media settings.
2. These settings affect shared components that use the global media defaults. Individual sections can expose separate ratios, autoplay, and loop controls.
3. Keep lazy loading on for images below the first screen. Check video posters, playback controls, and reduced-motion behavior on the actual page.
4. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
5. Preview a home, product, collection, and cart page before saving shared changes.

### Lazy load shared card images

Turn on “Lazy load shared card images” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Defaults for shared product cards and social profiles/Instagram. Critical images and sections with explicit loading policies retain control.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `images_lazyload`. Type: `checkbox`.

</details>

### Shared product-card image ratio

Choose one of the supported options below for shared product-card image ratio. Only the selected option applies; other settings can further customize its appearance.

Used when the card host does not provide a ratio. Explicit section card ratios retain priority.

Default: `adapt`.

Options: Adapt to image, Square (1:1), Portrait (4:5), Landscape (3:2), Widescreen (16:9).

<details><summary>Reference for connected builders</summary>

Setting: `image_default_ratio`. Type: `select`.

`adapt`, `square`, `portrait`, `landscape`, `widescreen`

</details>

### Video autoplay

Turn on “Video autoplay” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Defaults for Transparent Hero and Transparent/Web3 Sub Page Banners. Reduced motion, visibility and pause controls take priority. Other video sections own their media settings.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `video_autoplay`. Type: `checkbox`.

</details>

### Video loop

Turn on “Video loop” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Defaults for Transparent Hero and Transparent/Web3 Sub Page Banners. Reduced motion, visibility and pause controls take priority. Other video sections own their media settings.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `video_loop`. Type: `checkbox`.

</details>

## File reference

`config/settings_schema.json`
