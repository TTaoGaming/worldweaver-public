# Grimoire Execution Projector
ID: GG-D1-GRIMOIRE-EXECUTION-PROJECTOR · TOOL — Receipt-to-Execution-State Reducer
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

No card stays green because someone forgot to refresh the board.

## Hyperstition
No card stays green because someone forgot to refresh the board.

## Engineering
- pattern: materialized view + TTL cache invalidation + fail-closed reducer
- origin: database views and cache-expiry controls; mature
- exemplar: tools/gleipnir_execution_projector.py
- maturity: tested

## Checks
- RUNNING requires fresh observed_utc + positive TTL
- stale/incomplete/future runtime evidence becomes HOLD
- tested persistent artifacts may remain EXECUTABLE
- explicit HOLD outranks RUNNING

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
A sliver's aura fades when the source creature leaves the battlefield.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-GRIMOIRE-EXECUTION-PROJECTOR.yaml)

## Typed links
- reads -> GG-D1-EXECUTION-BINDING Execution Binding
- projects -> GG-D1-EXECUTION-SNAPSHOT Execution Snapshot
- supports -> CORE-14 Topology Lint

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Grimoire Execution Projector. Show a precise inspection instrument with a clear input and output. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
