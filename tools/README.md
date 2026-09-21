# Rebuild the public card projection

Requirements: Python, Git and `PyYAML==6.0.3`. The generator makes no provider calls. It verifies the source checkout commit, clean card files and exact Sigrun source blob before writing. Unexpected output files are refused rather than included or deleted.

1. Obtain an authorized checkout of `TTaoGaming/hfo-gen-143` at `c4427795dbd64510fdef162dfcff616c33f27558`, including its `cards` tree.
2. Obtain `candidates/cards/SIGRUN-ORACLE-v0.6.0.yaml` from that repository at `2cc7acb589d94adf58f024abf8853ebfd1ebbe40` (Git blob `1de10bd6fd771c665b3765f8be747f4cace5e024`). Original repositories may require separate access.
3. Preserve the reviewed browser files, art guide, assay and README in the output directory. Use the versioned `core-views.json` beside this script.
4. Run with the actual build time in UTC, or the prior catalog's `generated_at` for byte-for-byte reproduction:

```text
python tools/build-card-projection.py --source SOURCE_CHECKOUT --sigrun ORACLE_FILE --views tools/core-views.json --out cards --generated-at UTC_TIME
```

The generator selects descriptive fields and excludes structured execution snapshots. Free text still needs publication review; field selection is not a general privacy guarantee. Review the exact changes before publication. `cards/integrity.json` covers the output bytes except itself. Site deployment and runtime acceptance are separate operations.
