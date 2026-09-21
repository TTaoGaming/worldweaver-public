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

## Use this card
Status: EDITORIAL_PROPOSAL_NOT_EXECUTED

Candidate behavior: make one unit of effort recoverable, bounded and decidable by its verifier and consumer.

When: When admitting work, transferring an attempt, or deciding whether a result closes the task.

### Inputs
- Stable semantic identity, exact inputs and requested output
- Owner, lease/fence, effect ceiling, budget, evaluator and consumer criteria

### Procedure
- Describe one semantic scope and retain its identity across carriers.
- Check the existing ownership record before proposing a claim or handoff.
- Record the bounded action, expected artifact and stopping condition.
- Attach returned output to the same work identity; retain open verifier and ConsumerAck requirements until fulfilled.

### Outputs
- Reviewable work packet or handoff proposal
- Result-to-work evidence mapping
- Explicit remaining acceptance conditions

### Failure modes
- New identity minted for the same unfinished scope
- Concurrent owners admitted for overlapping work
- Result presence treated as completion

### Worked example
- situation: A broken card link needs a source edit but no deployment.
- action: Bind the file revision, permitted edit, link check and designated consumer in one work packet.
- evidence: Expected: exact diff, relevant check output and the required independent dispositions.

### Neurosymbolic division of work
- neural: Translate a request into a useful bounded task.
- symbolic: Preserve identity, ownership, effects and acceptance transitions.

### Evolution contract
Mutable: Task instructions and handoff clarity
Frozen: Semantic identity and single-owner rule; Effect ceiling and comparison criteria
Fitness: Evaluate traceable outcomes and correct closure decisions under fixed handoff and duplicate-work cases.

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: WorkItem. Show an organized archive object with a visible relationship to another distinct object. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
