# Full regression fixture reconciliation

The full run executed all seven Phase 3 and all 104 Phase 4 suites. The initial result was 110 passing suites and one failing suite: `tests/phase4/featured-content.cjs`.

The fixture already froze time at `2026-09-20T15:00:00Z`, but the inherited host timezone was Asia/Tokyo. Liquid date formatting therefore produced September 21, invalidating the fixture's September 20 boundary expectations. Runtime section sources were unchanged.

An intermediate attempt set only Liquid's output timezone to UTC. It fixed formatting of `now` but native parsing of timezone-less merchant dates still used the host timezone. That attempt failed under Asia/Tokyo and passed under UTC; both outputs are retained in `featured-content-timezone-offset-attempt.*`.

The final correction pins the fixture process timezone to UTC before loading the existing adapter, then restores the original timezone on completion. The original frozen date and every existing assertion remain; one explicit assertion verifies the intended calendar day. Targeted reruns pass when launched from both Asia/Tokyo and UTC hosts. No runtime section/helper source was modified.

`suite-summary-initial.json` and `regressions-initial.txt` preserve the full initial run. `featured-content-rerun.*` records the passing reruns. `suite-summary.json` is the final 111-suite manifest, retaining the initial failure metadata for the corrected suite. `regressions.txt` preserves the original log and appends the final reruns. No other suite was skipped or weakened. Earlier-group assertions and their original live limitations remain.
