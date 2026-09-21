# Supply
ID: GG-D1-SUPPLY · RESOURCE — Concurrent Execution / Runner / Worker Headroom
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

The hive knows how many bodies can move now without confusing concurrency with quota.

## Hyperstition
The hive knows how many bodies can move now without confusing concurrency with quota.

## Engineering
- pattern: semaphore / worker-pool concurrency / capacity planning
- origin: OS semaphores and batch worker pools; mature
- exemplar: GitHub self-hosted runner slots; semantic max-inflight; evaluator backlog ceilings
- maturity: tested

## Checks
- Supply != provider quota amount
- host/runner failure != provider failure
- queue delay is metered separately from model latency
- nonnumeric supply requires explicit freshness evidence

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
An overlord grants room for bodies; minerals alone cannot hatch another brood.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-SUPPLY.yaml)

## Typed links
- provided-by -> CORE-10 Vendor
- consumed-by -> HFO-G143-C016 Larva
- observed-by -> GG-D9-SIGRUN-CAPACITY-LEDGER Sigrun Capacity Ledger

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Supply. Show a measured reservoir with an explicit containing boundary. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
