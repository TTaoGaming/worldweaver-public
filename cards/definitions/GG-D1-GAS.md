# Gas
ID: GG-D1-GAS · RESOURCE — Metered / Marginal-Cost Capacity
Definition: CANDIDATE / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

The hive never spends scarce gas silently.

## Hyperstition
The hive never spends scarce gas silently.

## Engineering
- pattern: budget envelope + circuit breaker + cost accounting
- origin: financial controls and SRE circuit breakers; mature
- exemplar: max_marginal_usd gate + observed_cost receipt + paid-fallback deny
- maturity: tested

## Checks
- default max_marginal_usd = 0
- paid fallback requires explicit authority
- unknown cost is HOLD
- gas cannot be substituted for minerals silently

## Behavioral target
Apply this card's explicit checks before making its associated claim or action.

Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json.

## Myth
Vespene is potent because it is scarce; the swarm never vents it unnoticed.

## Sources and technology
- [Pinned card definition](https://github.com/TTaoGaming/hfo-gen-143/blob/c4427795dbd64510fdef162dfcff616c33f27558/cards/deck1/GG-D1-GAS.yaml)

## Typed links
- produced-by -> CORE-10 Vendor
- gated-by -> HFO-G143-C049 Tao's Seal
- metered-by -> GG-D9-DRONE-QUOTA-METER Drone Quota Meter

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: Gas. Show a measured reservoir with an explicit containing boundary. Express the intended role without depicting deployment, victory or authority.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
