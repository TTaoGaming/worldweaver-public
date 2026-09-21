# Capacity Receipt Fan-In
ID: GG-D1-CAPACITY-RECEIPT-FANIN · TOOL — Probe Receipt / Ledger Freshness Reducer
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

A completed probe cannot become useful capacity truth until its fresh receipt is consumed into the ledger exactly once.

## Hyperstition
A completed probe cannot become useful capacity truth until its fresh receipt is consumed into the ledger exactly once.

## Engineering
- pattern: event fan-in + deduplicated ingest request + freshness gate
- origin: event-sourced reducers and idempotent ingestion pipelines; mature
- exemplar: capacity_receipt_fanin reducer on cdev-control donor shard/perishable-meter-modes-7023358b
- maturity: tested

## Checks
- newer fresh receipt may emit one deduped ingest request
- same-time conflicting receipts HOLD
- stale newer receipt HOLD
- unbound surface HOLD
- reducer itself performs no provider or ledger mutation

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
Fresh scout scent must reach the Overmind before the hive treats the field as live.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-CAPACITY-RECEIPT-FANIN.yaml)

## Typed links
- consumes -> CORE-07 Receipt
- supports -> GG-D9-SIGRUN-CAPACITY-LEDGER Sigrun Capacity Ledger
- reads -> CORE-10 Vendor
- records -> CORE-07 Receipt

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Capacity Receipt Fan-In. Show a precise inspection instrument with a clear input and output. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
