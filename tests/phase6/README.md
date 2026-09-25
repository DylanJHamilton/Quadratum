# Phase 6 validation

Run from the repository root. Dependencies are pinned in `tests/phase6/package.json`; the recorded environment used Node 24.19.0, Python 3, Shopify CLI 4.8.0 and Chromium 138.0.7204.0. These fixtures render source with explicit Shopify object/form adapters. Browser requests are intercepted; no live store or external provider is exercised.

Install the fixture dependencies and point Node at them:

```sh
npm install --prefix tests/phase6
export NODE_PATH="$PWD/tests/phase6/node_modules"
python3 tests/phase6/inventory.py --checkpoint checkpoint-h3 --final
python3 tests/phase6/reconciliation.py --checkpoint checkpoint-h3 --final
for suite in source branding commerce media integrations popups; do
  node "tests/phase6/$suite.cjs" || exit 1
done
```

The inventory regenerates the authoritative JSON/CSV and fails on unresolved dispositions, invalid defaults, missing global contracts, active settings without an implemented consumer or retired IDs with remaining schema/source dependencies. Current reconciliation uses the Shopify owner-state baseline `2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27`: it permits exactly the 37 H1-audited removals and preserves every surviving input contract and all settings_data bytes. `--final` also checks the recorded 125 suite/176 browser results and unchanged H2 runtime tree. A–G reports remain historical; do not overwrite them with current owner state.

Retained account source stays protected against its original Phase 5 baseline. Supply the current merchant-state baseline separately, and keep new source reports under H3:

```sh
export ACCOUNT_STATE_BASELINE=2d1d9b980c04e816e8c23309a3b3bc7a5ff37e27
export ACCOUNT_ENTRY_SOURCE_OUTPUT=docs/phase6/validation/checkpoint-h3/header-source
for suite in source auth dashboard orders addresses reconciliation account-entry; do
  node "tests/phase5/$suite.cjs" || exit 1
done
```

For browser fixtures, install a Playwright-compatible Chromium or set `CHROMIUM_PATH` to an available executable:

```sh
PHASE6_BROWSER_REPORT=docs/phase6/validation/checkpoint-h3/popup-browser-results.json node tests/phase6/browser.cjs
ACCOUNT_ENTRY_BROWSER_OUTPUT=docs/phase6/validation/checkpoint-h3/header-browser \
  CHROMIUM_EXECUTABLE="$CHROMIUM_PATH" node tests/phase5/account-entry-browser.cjs
ACCOUNT_BROWSER_OUTPUT=/tmp/quadratum-phase6-account-browser node tests/phase5/browser.cjs
```

The Phase 6 browser writes its report to `PHASE6_BROWSER_REPORT` (historical F path if omitted); screenshots default to `/tmp/quadratum-phase6-browser` or `PHASE6_BROWSER_OUTPUT`. The account browser writes its report/screenshots under `ACCOUNT_BROWSER_OUTPUT`; copy its `results.json` to `docs/phase6/validation/checkpoint-h3/account-browser-results.json` when recording H3. Preserve prior reports when recording a new audit.

The exact 112 retained Phase 3/4 executable suites and exit codes are listed in `docs/phase6/validation/checkpoint-h3/regressions/results.json`. The 13 targeted Phase 5/6 suites are in H3's `targeted-results.json`; its six Phase 6 results reference H2, whose runtime is unchanged. Helpers and browser drivers are not counted as standalone unit suites. To replay the recorded Phase 3/4 suite set:

```sh
python3 - <<'PY'
import json, subprocess
from pathlib import Path
results = json.loads(Path('docs/phase6/validation/checkpoint-h3/regressions/results.json').read_text())
for result in results:
    subprocess.run(['node', result['test']], check=True)
PY
shopify theme check --path . --output json
```

Theme Check remains 0 errors/517 warnings, unchanged by H1–H3. H2's `theme-check-summary.json` compares it with G; G records the seven helper-reference warnings and inherited complexity warnings from original Phase 6. `owner-review.md` contains the required live platform, browser and provider acceptance queue.
