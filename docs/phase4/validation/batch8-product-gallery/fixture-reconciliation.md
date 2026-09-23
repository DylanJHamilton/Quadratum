# Fixture reconciliation

The first gallery render run reached the native-image loading assertion and failed because this JSDOM version does not expose HTMLImageElement.loading (actual undefined, expected eager). The actual source emitted loading="eager". The fixture now checks getAttribute("loading") and passes; no runtime change was made for that adapter limitation.

The runtime fixtures use explicit native media filters and declared horizontal scroll rectangles. They test real generated markup and controllers without claiming provider playback, native model registration, pixels or Shopify execution.
