# Zerg Memory Palace Capacity Map v2

Status: `PUBLIC_DESIGN_PROJECTION_NOT_AUTHORITY`

This document uses Zerg names as mnemonic handles for technology-independent capacity concepts. The name is not the implementation.

Hard laws:

- `ARCHETYPE != CARRIER != MODEL != PROVIDER != TOOL != AUTHORITY`
- `CAPABILITY_ROLE_IS_RELATIVE_TO_CURRENT_ECONOMICS`
- `AVAILABLE_CAPACITY != WORK_DEMAND`
- `RAW_INTENT -> ULTRALISK` is forbidden
- `PRODUCER != VERIFIER`
- `LOCAL_TERMINAL != TELOS_PROGRESS != GLOBAL_COMPLETION`

A carrier can change archetype over time as cost, capability, latency, quota and reliability change. A frontier model may be an Ultra carrier today and a Ling carrier years later.

## Core unit memory palace

| Zerg donor | Game/lore function | Capacity concept | HFO archetype |
|---|---|---|---|
| Larva / Egg / Cocoon | undifferentiated production state | optional capacity before demand binding | LARVA |
| Drone | worker sacrificed into structures | infrastructure actuator | DRONE |
| Zergling | cheap fast swarm body | disposable breadth/exploration | LING |
| Baneling | sacrificial explosive morph | one-shot destructive falsification | BANELING |
| Roach | durable attrition unit; burrow/recover | recoverable bounded work | ROACH |
| Ravager | Roach morph with focused siege effect | blocker-bound escalation | RAVAGER |
| Hydralisk | flexible ranged workhorse | balanced general throughput | HYDRALISK |
| Lurker | burrowed conditional ambush | event-triggered persistent sentinel | LURKER |
| Queen | local production/creep/defense support | local deterministic allocator/maintainer | QUEEN |
| Overlord | supply + relay/transport | telemetry, supply projection, relay | OVERLORD |
| Overseer | detector/support morph | active anomaly/provenance/attestation | OVERSEER |
| Mutalisk | highly mobile harassment/scout | mobile cross-domain reconnaissance | MUTALISK |
| Corruptor | specialized anti-air | domain-specific interceptor | SPECIALIST/INTERCEPTOR |
| Brood Lord | durable parent projecting broodlings | standoff child-emitter | BROOD_LORD |
| Broodling | temporary spawned attack unit | ephemeral child worker | EPHEMERAL_CHILD |
| Swarm Host | persistent parent spawning locust waves | periodic bounded wave emitter | SWARM_HOST |
| Locust | disposable timed child | ephemeral wave worker | EPHEMERAL_CHILD |
| Infestor | control/influence caster | external-system influence adapter | INFESTOR |
| Viper | pull/disrupt/reposition support | surgical integration/repositioning | VIPER |
| Changeling | cheap disguise/intel | low-cost identity/protocol probe | CHANGELING |
| Ultralisk | expensive durable heavy assault | evidence-promoted heavy executor | ULTRALISK |
| Nydus Worm | transport endpoint | routing/handoff edge | NYDUS |
| Scourge (BW) | disposable anti-air suicide unit | sacrificial interceptor/falsifier | BANELING-family |
| Defiler (BW) | high-impact control/support caster | environment/control-plane support | DEFILER-family |
| Guardian (BW) | long-range siege air morph | standoff heavy specialist | GUARDIAN |
| Devourer (BW) | anti-air debuff specialist | domain suppression specialist | DEVOURER |
| Infested Terran (BW) | disposable explosive unit | sacrificial effect packet | BANELING-family |

## Lore command/capital donors

| Lore donor | Swarm role | Engineering lesson |
|---|---|---|
| Overmind | strategic global integration | strategic-integration donor; centralization/SPOF warning |
| Cerebrate | intermediate brood commander | brittle hierarchical dependency warning |
| Broodmother | autonomous brood commander | delegated mission command under bounded intent |
| Queen of Blades / Overqueen | strategic sovereign | Telos/strategy donor, not a routine worker slot |
| Leviathan | massive mobile organism/platform | capital hosting platform, not intelligence identity |
| Brutalisk / Omegalisk | extreme heavy organisms | heavy-concentration donor; usually folds into Ultra family |
| Primal Zerg / pack leaders | decentralized evolutionary competition | local adaptation, diversity, selection pressure |

## Infrastructure memory palace

| Zerg infrastructure | Game function | HFO concept |
|---|---|---|
| Hatchery | central larva/production base | admission + production locus using existing runtime |
| Lair | mid-tier tech expansion | expanded capability tier / richer eligible phenotypes |
| Hive | top-tier tech expansion | high-end capability tier; does not itself imply authority |
| Creep | shared movement/building substrate | common schemas, provenance, memory indexes, trace context, adapters |
| Creep Tumor | extends creep locally | local substrate propagation/beacon |
| Extractor | resource extraction | quota/cost/resource adapter |
| Spawning Pool | unlocks ling/queen tech | low-cost worker capability gate |
| Baneling Nest | unlocks Baneling | falsification/sacrificial-test capability gate |
| Roach Warren | unlocks Roach/Ravager | durable-work/recovery capability gate |
| Hydralisk Den | unlocks Hydralisk | generalist workhorse capability gate |
| Lurker Den | unlocks Lurker | condition-watch/sentinel capability gate |
| Infestation Pit | unlocks Infestor/Swarm Host + Hive | influence/control + wave-generation capability gate |
| Spire | air units + air upgrades | mobile/remote carrier capability gate |
| Greater Spire | Brood Lord | standoff-heavy capability gate |
| Ultralisk Cavern | Ultralisk | evidence-promoted heavy-execution gate |
| Nydus Network | summons Nydus Worm | transport/routing fabric owner |
| Evolution Chamber | global ground upgrades | mutation/selection/archive mechanism; frozen evaluator required |
| Spine Crawler | static ground defense | local guardrail/reference-monitor enforcement |
| Spore Crawler | static anti-air + detection | boundary detection + defensive monitor |

## Upgrade semantics

Upgrades are not new identities. They modify a capacity phenotype while preserving its archetype unless behavior crosses a real semantic boundary.

| Upgrade family | Game examples | Engineering analogue |
|---|---|---|
| Speed | Metabolic Boost, Glial Reconstitution, Muscular Augments, Pneumatized Carapace, Anabolic Synthesis | lower latency / faster handoff / shorter cycle time |
| Range | Grooved Spines, Seismic Spines | wider information or effect horizon |
| Survivability | Ground/Flyer Carapace, Chitinous Plating | stronger retry/recovery/isolation/fault tolerance |
| Throughput | Adrenal Glands, attack upgrades | more useful work per unit time |
| Mobility-under-state | Tunneling Claws, Burrow | continuation under degraded/hidden conditions |
| Detection/control | Neural Parasite, Viper abilities, Overseer functions | influence, attestation, anomaly handling |
| Morph unlock | Lair/Hive/Greater Spire tech transitions | capability-tier admission after prerequisites/evidence |

Rule: if an upgrade changes only degree, keep the same archetype. If it changes kind, morph.

## Relative resource classes

| Class | Relative economics | Typical archetypes | Allocation rule |
|---|---|---|---|
| Disposable | abundant, cheap, short horizon | Ling, Baneling, Changeling, ephemeral child | maximize breadth/information cheaply |
| Generalist | moderate cost, balanced capability | Hydralisk | default ordinary work |
| Durable | persistence/recovery justified | Roach, Lurker | pay for state because interruption cost matters |
| Specialist | narrow high-value ability | Ravager, Viper, Infestor, Corruptor | allocate only to matching blocker/domain |
| Command/support | coordination/sensing, not primary output | Queen, Overlord, Overseer, Broodmother | minimize self-work; improve fleet effectiveness |
| Heavy | scarce/high opportunity cost | Ultralisk | only after evidence and falsification |
| Platform | hosts other work | Leviathan, Nydus, Creep, Hatchery | never confuse platform size with cognitive authority |

## Two-stage allocation

1. `MISSION -> FORCE_COMPOSITION` in archetype/capability space.
2. `FORCE_COMPOSITION -> CARRIER_BINDING` using current eligible technologies.

Example:

`8 Lings + 3 Banelings + 3 Roaches + 1 Overseer + 1 Queen`

Only afterward bind slots to current carriers such as cloud chat, API models, local models, VPS workers or future technologies.

Carrier assignment must consider capability fit, marginal cost, latency, reliability, quota scarcity, privacy, independence from producer/verifier, recovery support, and current empirical closure rate.

## Semantic law

A Zergling that is super-frontier, scarce and expensive by default is usually a category error because it violates the Ling concept: cheap disposable breadth. If tomorrow's frontier model becomes abundant and cheap, that same model may legitimately fill Ling slots.

The ontology is therefore **relative and ecological, not model-branded**.

## Morph law

`Larva -> Ling -> {retire | Baneling | Roach}`

`Roach -> {Ravager for a blocker | retire with Strife/Splendor | Ultra candidate}`

`Ultra candidate -> independent allocation gate -> Ultra -> independent verifier`

Banelings do not promote upward; they detonate and leave evidence.

## JADC2 / Mosaic translation

- Sense: Overlord, Overseer, Mutalisk, Lurker
- Make sense / allocate: Queen, Broodmother, Reducer, Evolution Chamber
- Act: Ling, Baneling, Hydralisk, Roach, Ravager, Ultra
- Assurance: Overseer + independent Verifier
- Data/transport: Creep, Nydus, Overlord
- Adaptation: Evolution Chamber
- Capital hosting: Leviathan
- Whole compound actor: HIVE/Sigrun

The stable doctrine is:

> Compose in capability space, bind in technology space, select by evidence, and preserve mission identity across carrier churn.
