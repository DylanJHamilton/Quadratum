# Model Viewer runtime

Pinned `@google/model-viewer` 4.3.1, [upstream release](https://github.com/google/model-viewer/releases/tag/v4.3.1). The downloaded distribution matched the server-provided SHA-256 content digest. Source and installed digests are recorded in provenance.json; upstream license and bundled notices are retained.

The local distribution has only a registration adaptation: `qtm-model-viewer`, an idempotence guard, and a removed unavailable source-map reference. This isolates the standalone Showcase from Shopify's native `model-viewer` registration. Existing commerce media is not replaced or re-registered. The scoped host loads this theme asset as a module only on intersection; complete poster/gallery/file links remain available if it fails.

Compressed GLB/KTX textures may request upstream Draco/Basis decoder assets from gstatic.com; animated image texture support includes a jsdelivr loader. Actual model formats, network/CSP behavior, GPU/WebGL, AR devices, multiple model hosts and coexistence with Shopify product media remain in the live acceptance queue. Fixture adapters do not render 3D or certify third-party runtime internals.
