# WorkItem
ID: GG-D1-WORKITEM · PRIMITIVE — Admitted Unit of Work
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

Every unit of swarm effort has one recoverable identity, scope, authority ceiling, evaluator and consumer.

## Hyperstition
Every unit of swarm effort has one recoverable identity, scope, authority ceiling, evaluator and consumer.

## Engineering
- pattern: job record + lease/fence + idempotency key
- origin: batch job systems, transactional work queues and distributed leases; mature
- exemplar: Gen143 queue/WorkItem receipts with work_ref, semantic key, lease, effect ceiling and lifecycle state
- maturity: running

## Checks
- semantic identity is stable across carriers
- one live owner per semantic scope
- effect ceiling is explicit
- Result is not completion until verifier and ConsumerAck rules close

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
A single scent packet on the creep tells any larva exactly what prey to pursue and when to stop.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-WORKITEM.yaml)

## Typed links
- queued-in -> GG-D1-READY-WORK-RESERVOIR READY Work Reservoir
- claimed-by -> HFO-G143-C016 Larva
- records -> CORE-07 Receipt

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: WorkItem. Show an organized archive object with a visible relationship to another distinct object. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
