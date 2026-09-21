# Execution Snapshot
ID: GG-D1-EXECUTION-SNAPSHOT · PROJECTION — Volatile Card Execution State
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

One recomputable board says what is RUNNING, EXECUTABLE, HOLD, CANDIDATE or PROSE right now.

## Hyperstition
One recomputable board says what is RUNNING, EXECUTABLE, HOLD, CANDIDATE or PROSE right now.

## Engineering
- pattern: materialized view + TTL-aware state reduction
- origin: database materialized views and monitoring projections; mature
- exemplar: EXECUTION_SNAPSHOT_*.yaml produced by gleipnir_execution_projector.py
- maturity: executable

## Checks
- card set equals decklist
- RUNNING is never inherited without a fresh binding
- snapshot observed UTC is explicit

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
The battlefield map is alive only while fresh scouts keep painting it.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-EXECUTION-SNAPSHOT.yaml)

## Typed links
- projected-by -> GG-D1-GRIMOIRE-EXECUTION-PROJECTOR Grimoire Execution Projector
- watched-by -> GG-D9-GRIMOIRE-CURRENTNESS-DRONE Grimoire Currentness Drone
- read-by -> GG-D1-GRIMOIRE-EXECUTION-REPORT Grimoire Execution Report

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Execution Snapshot. Show an organized archive object with a visible relationship to another distinct object. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
