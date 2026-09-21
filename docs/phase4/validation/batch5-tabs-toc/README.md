# Batch 5 — Tabs/Accordion and Table of Contents

Both independent hosts and their scoped controllers are source-reviewed / REQUIRES LIVE VERIFICATION. See engineering-report.md B5-TABS-TOC for findings and the complete live queue.

Four affected suites pass; structural/reference/merchant-state checks and CSS build pass. Theme Check 4.8.0 exits 1 with 632 diagnostics (16 errors / 616 warnings); unchanged signatures. No diagnostics suppressed. Generated theme.css is unchanged. Native Shopify globals and JSDOM geometry/media APIs are explicit fixture adapters, not live certification.
