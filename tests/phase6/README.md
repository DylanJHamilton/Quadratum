# Phase 6 validation

Run from the repository root. Dependencies are pinned in `tests/phase6/package.json`; the recorded environment used Node 24.19.0, Python 3, Shopify CLI 4.8.0 and Chromium 138.0.7204.0. These fixtures render source with explicit Shopify object/form adapters. Browser requests are intercepted; no live store or external provider is exercised.

Install the fixture dependencies and point Node at them:

```sh
npm install --prefix tests/phase6
export NODE_PATH="$PWD/tests/phase6/node_modules"
python3 tests/phase6/inventory.py --checkpoint checkpoint-g --final
python3 tests/phase6/reconciliation.py
for suite in source branding commerce media integrations popups; do
  node "tests/phase6/$suite.cjs" || exit 1
done
```

The inventory regenerates the authoritative JSON/CSV and fails on unresolved dispositions, invalid defaults, missing global contracts or active settings without an implemented consumer. Reconciliation compares original IDs/types/options/ranges, settings_data bytes and runtime scope against the Phase 5 baseline. Its repair count explicitly includes help/scope corrections; ID lists are in its output JSON.

For browser fixtures, install a Playwright-compatible Chromium or set `CHROMIUM_PATH` to an available executable:

```sh
node tests/phase6/browser.cjs
ACCOUNT_ENTRY_BROWSER_OUTPUT=docs/phase6/validation/checkpoint-g/header-browser \
  CHROMIUM_EXECUTABLE="$CHROMIUM_PATH" node tests/phase5/account-entry-browser.cjs
ACCOUNT_BROWSER_OUTPUT=/tmp/quadratum-phase6-account-browser node tests/phase5/browser.cjs
```

The Phase 6 browser writes its report to `docs/phase6/validation/checkpoint-f/browser-results.json`; screenshots default to `/tmp/quadratum-phase6-browser` or `PHASE6_BROWSER_OUTPUT`. The account browser writes its report/screenshots under `ACCOUNT_BROWSER_OUTPUT`. Preserve prior reports when recording a new audit.

The exact 112 retained Phase 3/4 executable suites and exit codes are listed in `docs/phase6/validation/checkpoint-g/regressions/results.json`. The 13 targeted Phase 5/6 suites are in `targeted-results.json`. Helpers and browser drivers are not counted as standalone unit suites. To replay the recorded Phase 3/4 suite set:

```sh
python3 - <<'PY'
import json, subprocess
from pathlib import Path
results = json.loads(Path('docs/phase6/validation/checkpoint-g/regressions/results.json').read_text())
for result in results:
    subprocess.run(['node', result['test']], check=True)
PY
shopify theme check --path . --output json
```

Theme Check is not warning-free: final 0 errors/517 warnings versus baseline 0/510. `theme-check-summary.json` reconciles all seven added helper-reference warnings and changed inherited complexity warnings. `owner-review.md` contains the required live platform, browser and provider acceptance queue.
