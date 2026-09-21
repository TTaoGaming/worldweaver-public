# Perishable Capacity Reconciler
ID: GG-D1-PERISHABLE-CAPACITY-RECONCILER · WORKFLOW — Demand/Supply Matcher
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

Useful READY work always finds the safest compatible mineral before that mineral expires.

## Hyperstition
Useful READY work always finds the safest compatible mineral before that mineral expires.

## Engineering
- pattern: earliest-deadline-first scheduling + admission control + capability matching
- origin: real-time scheduling / queueing; mature decades-old patterns
- exemplar: EDF scheduler, batch queue admission, token-bucket bulkheads
- maturity: tested

## Checks
- never invent work to burn quota
- queue priority outranks quota utilization
- paid/uncertain/stale capacity is HOLD
- provider != account != route != host != quota window

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
An overlord directs biomass to the brood that can still use it before it rots.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-PERISHABLE-CAPACITY-RECONCILER.yaml)

## Typed links
- consumes -> GG-D1-READY-WORK-RESERVOIR READY Work Reservoir
- reads -> CORE-10 Vendor
- supports -> HFO-G143-C045 Overlord Allocate
- emits -> CORE-07 Receipt

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Perishable Capacity Reconciler. Show a finite sequence of connected stations with an unresolved final gate. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
