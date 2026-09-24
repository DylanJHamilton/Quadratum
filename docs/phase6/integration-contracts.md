# Integration contracts and current guidance

Reviewed 2026-09-23. These are source contracts, not certification of a merchant's providers, consent setup or Theme Store eligibility.

## Official sources

- [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements): truthful functionality, restrictions on app dependencies and API-dependent app features, Shopify-hosted scripts with approved exceptions, intuitive settings, theme metadata and header/footer section groups. These affect distribution review; Phase 6 does not migrate static header/footer architecture or erase merchant resources to prepare a submission package.
- [Web pixels](https://shopify.dev/docs/apps/build/marketing/pixels): app pixels use a sandbox and honor Shopify consent signals. Use provider apps/customer events for tracking; merely storing an ID is not integration.
- [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy): purpose-specific permission methods and `visitorConsentCollected` expose current permission. Only actual visitor interaction may register consent. Theme form metadata and newsletter signup are not Shopify tracking consent.
- [Theme CAPTCHA](https://shopify.dev/docs/storefronts/themes/trust-security/captcha): Shopify owns native form CAPTCHA; `content_for_header`, native form markup and the documented dynamic protection API must remain intact. Custom endpoint tokens must be verified by that endpoint.
- [Theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration#app-embed-blocks): app embeds provide an app-managed insertion point. They do not make arbitrary tracking automatically consent-safe.

The decisions below are Quadratum's compatibility policy, not quotations or claims that Shopify approves each legacy integration.

## Runtime ownership

| Contract | Effective behavior and precedence | External responsibility |
| --- | --- | --- |
| `script_head`, `script_body_open`, `script_body_close` | Privileged merchant-authored HTML/JavaScript in the normal layout only. Empty/`none` emits nothing. `custom_scripts_enabled=false` disables all three. Default true preserves previously entered code, including editor behavior. | Trusted administrators must review code, performance, consent and provider requirements. These hooks are not sandboxed or a consent manager. Prefer app embeds and pixels for new integrations. Never store secrets. |
| GA4, Meta, TikTok ID fields | Removed from the pre-V1 schema in H2; no loader, event subscription or tracking is installed. Historical contracts remain documented and existing saved state is untouched. | Configure provider apps or Shopify pixels. |
| `marketing_consent_mode` | Retained metadata sent by supported form hosts. Option values unchanged, labels now say metadata. No UI/consent mutation. Unused checked/label controls removed before V1. | Native newsletter confirmation remains explicit; external handlers must independently process lawful opt-in. Shopify privacy settings/API own tracking permission. |
| `forms_backend` | Only Bulk order's Global default destination. `shopify` → native contact. Both legacy custom values → configured POST endpoint. No HTML/Liquid execution is provided by these choices. | Endpoint operation, spam controls, delivery and CRM integration. |
| Custom form CAPTCHA | Section provider choice (including none) wins; absent/inherit falls back globally. Key: nonblank section key → retained provider-specific key → `captcha_site_key` only for matching global provider. `none` is not a usable key. Native forms do not use custom CAPTCHA. | Public browser keys only. Endpoint verifies tokens and scores with server-side secrets. The unused global score threshold was removed before V1; server enforcement remains external. |
| `forms_global_endpoint` and tags | Explicit local endpoint wins. HTTPS/store-relative endpoints only; credentials and control characters rejected. Global tags form the base and section tags append. | Tags and transport metadata do not install an app or send notifications. No client secret belongs in an endpoint URL. |
| Google Maps | Default off. Locator requires global enable, local enable, usable public key and coordinates. Once enabled, Google loads automatically; native cards remain usable when disabled or failed. Unused global lat/lng controls were removed before V1 because sections own coordinates; global zoom is a Service area map banner fallback. | Public key restrictions, quotas, provider terms and visitor privacy configuration. Enable is a merchant capability switch, not visitor consent. Owner must approve provider loading policy before deployment. |
| Social URLs | Plain links with local block override where supported. Shared footer/block/profile consumers reject unsafe schemes; attributes escaped. | Does not install a feed, pixel or social API. Provider embeds remain explicitly configured section features. |
| `custom_css`, `header_custom_css`, `footer_custom_css` | Retained legacy CSS only; `<` escaped as a CSS code point to prevent closing the style element. No new editor control. | Merchant CSS can still change styling and request external assets. Review before use. |
| Popup frequency and newsletter | Existing session/day/week keys and first-visit flag are read/written only when `preferencesProcessingAllowed() === true`; otherwise page memory. Editor preview never persists frequency. The documented `consent-tracking-api` loader is requested with version `0.1`. Native newsletter confirmation is required and unchecked. | Shopify privacy configuration supplies permission. The popup never sets consent or verifies age. Native form delivery/CAPTCHA and provider subscriptions require live QA. |

## Explicit compatibility justification and owner decisions

Removing script fields or silently escaping their HTML would break the existing advanced configuration contract. Phase 6 therefore retains their intentional execution capability, documents the trust boundary and provides a real off switch. No script content or merchant state has been added. This does not imply Theme Store approval; owner review must choose migration to app embeds/pixels and a supported distribution policy.

Google Maps and custom endpoints remain optional external enhancements. Their current switches do not impersonate Shopify's privacy state. Retiring these capabilities or requiring a new consent provider needs an owner migration decision, not a hidden change to existing settings. Production enablement requires provider-specific QA. Existing global/local choices remain intact.

Legacy `email_marketing_app`, `marketing_*`, `proxy_forms_endpoint` and provider-specific CAPTCHA IDs remain documented transport/fallback contracts in the inventory. No undocumented server integration is inferred from their names. No credentials were obtained, configured or changed in Phase 6.
