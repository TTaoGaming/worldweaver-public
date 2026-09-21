# Cloudflare Durability
ID: WW-EQ-CLOUDFLARE-DURABILITY-001 · EQUIPMENT — Durable Objects adapter (proposal)
Definition: PROPOSED_PUBLIC_EXTENSION / full. Runtime: UNVERIFIED. Behavior: NOT_TESTED.

A concrete durability capability: bind actor state to a named Cloudflare Durable Object and recover it through an explicit storage contract.

## Hyperstition
A carrier can end while a source-bound obligation remains recoverable.

## Engineering
- pattern: Cloudflare Durable Objects + durable storage + explicit adapter contract
- origin: Cloudflare platform documentation; HFO example source is separately pinned.
- exemplar: Worldweaver's PublicOasis class wraps OasisStore using Durable Object storage. This is an implementation example, not proof of Sigrun mission continuity.
- maturity: Documentation and implementation source linked; hosted recovery assay not performed for this card.

## Checks
- Bind a specific actor ID, class and namespace; never treat the model session as the durable actor.
- Declare the storage, schema, idempotency and recovery contract.
- Test duplicate delivery and recovery against exact code/configuration before claiming the equipped system is durable.
- Keep documented vendor capability, HFO implementation and observed hosted behavior separate.

## Behavioral target
Choose actual Durable Object/storage interfaces when durability is required, and demand recovery evidence before claiming end-to-end continuity.

Given an ephemeral chat and a task needing resumable state, identify the missing durable binding; propose a bounded duplicate/restart test; refuse to equate a storage API link with tested mission recovery.

## Myth
The vessel rests; the inscription remains.

## Sources and technology
- [HFO Durable Object class — exact source](https://github.com/TTaoGaming/hfo-swarm-factory/blob/42f8df9a5cc316670131310246ab4c4e51dc76fc/cloudflare/worldweaver-frontdoor/src/entry.js)
- [HFO storage adapter — exact source](https://github.com/TTaoGaming/hfo-swarm-factory/blob/42f8df9a5cc316670131310246ab4c4e51dc76fc/cloudflare/worldweaver-frontdoor/src/oasis-store.js)
- [Cloudflare Durable Objects — official documentation](https://developers.cloudflare.com/durable-objects/)
- [Cloudflare rules of Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/)

## Typed links
- equips through -> CORE-11 Loadout
- supports -> CORE-04 Actor
- records -> CORE-07 Receipt

## Art prompt
Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, franchise characters or recognizable franchise art. Conceptual illustration only. Subject: a detachable obsidian archive module with layered chambers and an exposed adapter attached to a separate worker silhouette. Depict recoverable inscription, not immortality or infinite capacity. No vendor logo.

This public projection grants no authority. No behavioral improvement or live binding is claimed.
