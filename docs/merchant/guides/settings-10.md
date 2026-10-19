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

### Bulk-order default destination

Choose one of the supported options below for bulk-order default destination. Only the selected option applies; other settings can further customize its appearance. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

Only used by Bulk order when its destination is Global default. Both legacy custom choices post to the configured endpoint; they do not render HTML or Liquid. Other forms own their destination.

Default: `shopify`.

Options: Shopify (built-in), Custom endpoint (legacy html), Custom endpoint (legacy liquid).

<details><summary>Reference for connected builders</summary>

Setting: `forms_backend`. Type: `select`.

`shopify`, `custom_html`, `custom_liquid`

</details>

### Custom form CAPTCHA default

Choose one of the supported options below for custom form captcha default. Only the selected option applies; other settings can further customize its appearance. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

Used only when a custom-endpoint form inherits this choice. Explicit section choices, including None, win. Shopify protects its native forms separately. Your server must verify custom tokens.

Default: `none`.

Options: None, Cloudflare turnstile, reCAPTCHA v3.

<details><summary>Reference for connected builders</summary>

Setting: `forms_captcha_provider`. Type: `select`.

`none`, `turnstile`, `recaptcha_v3`

</details>

### Public CAPTCHA site key

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

For the selected global provider. Section keys and retained provider-specific legacy keys take priority. Enter a public browser site key only; keep verification secrets on your server. Blank or none disables the key.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `captcha_site_key`. Type: `text`.

</details>

### Default hidden tags

Enter the default hidden tags. Replace sample wording with your own content; leave optional fields empty when you do not need them.

Base tags for supported forms; section tags are appended. Tags do not subscribe customers or configure an external app.

Default: `form, web`.

<details><summary>Reference for connected builders</summary>

Setting: `forms_default_tags`. Type: `text`.

</details>

### Default custom endpoint (optional)

Enter the default custom endpoint (optional). Replace sample wording with your own content; leave optional fields empty when you do not need them. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

HTTPS or store-relative POST endpoint for custom forms. Local destinations take priority. Configure validation, token verification, consent and delivery on your server. Never include secrets in this URL.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `forms_global_endpoint`. Type: `text`.

</details>

## Google maps

### Enable optional Google maps loader

Turn on “Enable optional Google maps loader” to apply that behavior. Turn it off to remove that behavior. Other settings can affect whether the result is visible; check the section preview after changing it. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

Locator sections also require their local map switch and a public key. Enabling loads Google automatically. This is not visitor consent. Review provider privacy requirements; native location cards work without Google.

Default: `False`.

<details><summary>Reference for connected builders</summary>

Setting: `gmap_enable`. Type: `checkbox`.

</details>

### Google maps API key (public)

Advanced: enter the existing metafield key or content field key described below. Match the spelling exactly and use the data type expected by this section. Use manual content first if no matching definition exists. This is an optional external integration. Configure the corresponding service first; the setting does not provision a service or guarantee delivery. Public site keys must be restricted to the intended domain. Native Shopify forms remain available without this integration.

Public browser key for enabled locator sections. Restrict it to your storefront and required APIs with Google. Never enter a server secret.

Default: `none`.

<details><summary>Reference for connected builders</summary>

Setting: `gmap_api_key`. Type: `text`.

</details>

### Map banner fallback zoom

Drag the control to adjust map banner fallback zoom. Use only the range and increments shown below. Preview at mobile and desktop widths after changing spacing or dimensions.

Fallback for the Service area map banner when its local zoom is missing. Locator sections use their own zoom.

Default: `12`.

Range: 1 to 20 ; step 1.

<details><summary>Reference for connected builders</summary>

Setting: `gmap_default_zoom`. Type: `range`.

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
