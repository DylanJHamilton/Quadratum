# Integrations

[All documentation](../README.md) · [Support](../SUPPORT.md)

Theme Settings.

## Add and configure

1. Open Online Store > Themes > Customize, then select Theme Settings and Integrations.
2. Native storefront and Shopify forms do not require an external endpoint. Only configure optional third-party destinations when you have a working service and understand which data it receives.
3. Leave unused social URLs empty. A social link does not embed a feed or connect an account.
4. Do not paste private keys into theme settings. Public map or CAPTCHA keys require appropriate service and domain restrictions.
5. Set shared defaults here. A section with its own override may retain that override; select the section to adjust it.
6. Preview a home, product, collection, and cart page before saving shared changes.

## Code placement

### Allow legacy custom code

Turn on “Allow legacy custom code” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it.

Controls the three code fields below. Existing code stays enabled for compatibility. These fields run trusted HTML/JavaScript without consent handling. Prefer app embeds; configure tracking through Shopify pixels.

Default: `True`.

<details><summary>Reference for connected builders</summary>

Setting: `custom_scripts_enabled`. Type: `checkbox`.

</details>

### Legacy custom code: head

Advanced legacy integration slot. Prefer an app embed or native section. Only add code you own or trust; never enter credentials. Leave the default none when unused. The Allow legacy custom code switch controls these slots.

Advanced: trusted code only. Runs on storefront pages, including Theme Editor previews. Never paste secrets. This is not a pixel or consent manager. Blank or none outputs nothing.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `script_head`. Type: `textarea`.

</details>

### Legacy custom code: body start

Advanced legacy integration slot. Prefer an app embed or native section. Only add code you own or trust; never enter credentials. Leave the default none when unused. The Allow legacy custom code switch controls these slots.

Advanced: trusted code only. Runs on storefront pages, including Theme Editor previews. Never paste secrets. This is not a pixel or consent manager. Blank or none outputs nothing.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `script_body_open`. Type: `textarea`.

</details>

### Legacy custom code: body end

Advanced legacy integration slot. Prefer an app embed or native section. Only add code you own or trust; never enter credentials. Leave the default none when unused. The Allow legacy custom code switch controls these slots.

Advanced: trusted code only. Runs on storefront pages, including Theme Editor previews. Never paste secrets. This is not a pixel or consent manager. Blank or none outputs nothing.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `script_body_close`. Type: `textarea`.

</details>

## Form consent metadata

### Form consent metadata

Choose one of the supported options below for form consent metadata. Only the selected option applies; other settings can further customize its appearance.

Sends metadata to configured form handlers only. Does not add a checkbox, opt a customer in, or change Shopify tracking consent. Newsletter confirmation remains explicit.

Default: `optional`.

Options: Metadata: required, Metadata: optional, Metadata: hidden.

<details><summary>Reference for connected builders</summary>

Setting: `marketing_consent_mode`. Type: `select`.

`required`, `optional`, `hidden`

</details>

## Forms

### Default hidden tags

Enter the default hidden tags. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Base tags for supported forms; section tags are appended. Tags do not subscribe customers or configure an external app.

Default: `form, web`.

<details><summary>Reference for connected builders</summary>

Setting: `forms_default_tags`. Type: `text`.

</details>

## Social profile links

### Facebook page URL

Enter the facebook page url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_facebook`. Type: `text`.

</details>

### Instagram profile URL

Enter the instagram profile url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_instagram`. Type: `text`.

</details>

### TikTok profile URL

Enter the tiktok profile url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_tiktok`. Type: `text`.

</details>

### YouTube channel URL

Enter the youtube channel url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_youtube`. Type: `text`.

</details>

### X/twitter profile URL

Enter the x/twitter profile url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_twitter`. Type: `text`.

</details>

### LinkedIn

Select a Shopify destination or paste a valid URL. Use a descriptive button or link label. Empty destinations usually hide the associated action.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_linkedin`. Type: `url`.

</details>

### Pinterest profile URL

Enter the pinterest profile url. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Profile destination, not a live feed or tracking integration. Use an HTTP(S) URL. Explicit block links take priority; unsafe destinations are ignored.

<details><summary>Reference for connected builders</summary>

Setting: `social_url_pinterest`. Type: `text`.

</details>

## File reference

`config/settings_schema.json`
