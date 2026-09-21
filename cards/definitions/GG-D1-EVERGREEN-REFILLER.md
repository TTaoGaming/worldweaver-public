# Evergreen Refiller
ID: GG-D1-EVERGREEN-REFILLER · WORKFLOW — READY Reservoir Pressure
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

The work reservoir stays deep enough that no useful mineral waits for Tao to invent the next task.

## Hyperstition
The work reservoir stays deep enough that no useful mineral waits for Tao to invent the next task.

## Engineering
- pattern: producer-consumer queue watermarks + bounded replenishment + backlog caps
- origin: high/low-water marks in operating systems, brokers and batch queues
- exemplar: message broker queue depth alarms; Kubernetes controller reconciliation
- maturity: tested

## Checks
- refiller owns pressure, not semantic meaning
- domain generator must be READY and source-bound
- READY floor and nonterminal ceiling are both enforced
- global refill budget is bounded
- per-lane refill cap prevents one lane monopolizing the reservoir
- STAGE_ONLY lanes do not gain send/apply/publish authority

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
The hatchery keeps larvae ready, but only the environment decides what they become.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-EVERGREEN-REFILLER.yaml)

## Typed links
- feeds -> GG-D1-READY-WORK-RESERVOIR READY Work Reservoir
- requests -> GG-D1-SOURCE-BOUND-GENERATOR Source-Bound Generator
- supports -> GG-D1-PERISHABLE-CAPACITY-RECONCILER Perishable Capacity Reconciler

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Evergreen Refiller. Show a finite sequence of connected stations with an unresolved final gate. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
