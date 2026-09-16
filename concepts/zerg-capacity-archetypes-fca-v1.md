# Zerg Capacity Archetypes — Formal Concept Analysis v1

Status: `PUBLIC_DESIGN_PROJECTION_NOT_AUTHORITY`

This document treats Zerg vocabulary as **engineering capacity handles**, not fictional authority and not role-play.

Hard laws:

- `ARCHETYPE != ACTOR != MODEL != SKILL != TOOL != AUTHORITY`
- `AVAILABLE_CAPACITY != WORK_DEMAND`
- `LOCAL_TERMINAL != TELOS_PROGRESS != GLOBAL_COMPLETION`
- `PRODUCER != VERIFIER`
- a vendor/model/tool may change without changing the archetype.

## Why this exists

The useful invariant is not “which model is strongest?” It is:

> **What mission function, state semantics, time horizon, cost class, effect ceiling, recovery policy, verification contract, and morph rules does this slot have?**

That lets a Queen/Sigrun allocator compose a force package from capabilities while carriers remain replaceable. A Ling could be ChatGPT today and a local model tomorrow. A Roach could run on Oracle, OVH, Cloudflare, or a laptop. The archetype survives the technology.

Formal tuple:

`CapacityArchetype = <mission_function, time_horizon, state_class, cost_class, effect_ceiling, spawn_rights, recovery_policy, verification_contract, morph_edges>`

## Source corpus

The game/lore inventory was used as a donor corpus, not as a binding ontology.

Current SC2 multiplayer includes Larva/Cocoon, Drone, Queen, Zergling/Baneling, Roach/Ravager, Hydralisk/Lurker, Infestor, Swarm Host/Locust, Ultralisk, Broodling, Changeling, Nydus Worm, Overlord/Overseer, Mutalisk, Corruptor/Brood Lord, and Viper.

Legacy StarCraft/Brood War adds or emphasizes Scourge, Defiler, Guardian, Devourer, the older Queen role, and Infested Terran.

Lore adds command castes/functions such as Overmind, Cerebrate, Broodmother, Queen of Blades/Overqueen, plus capital/heavy organisms such as Leviathan, Brutalisk, and Omegalisk.

Campaign/co-op/evolution variants **do not automatically mint new engineering archetypes**. They inherit their parent concept unless ablation shows a distinct measurable capability.

## Formal Concept Analysis

Use a formal context `K=(G,M,I)`:

- `G`: source Zerg objects/castes/structures.
- `M`: engineering capacity attributes such as disposable, persistent, recoverable, relay, detection, delegated command, sacrificial effect, heavy concentration, spawn-ephemeral, routing, evolution.
- `I`: whether a source object materially exhibits an attribute.

A formal concept is retained as a named engineering archetype only when its ablation removes a measurable reachable capability.

### Stable concepts

| FCA concept | Donor extent | Shared intent | Engineering projection |
|---|---|---|---|
| ATTRITABLE_SWARM | Zergling, Baneling, Scourge, Locust, Broodling | cheap/disposable/parallel effects | Ling/Baneling family |
| SACRIFICIAL_FALSIFIER | Baneling, Scourge | one-shot sacrificial targeted effect | **BANELING** |
| RECOVERABLE_WORKER | Roach, Ravager | persistent + recoverable + effectful | **ROACH**, Ravager escalation |
| OBSERVE_RELAY | Overlord, Overseer | sensing/relay with low direct effect | **OVERLORD**, **OVERSEER** |
| DELEGATED_COMMAND | Broodmother, Cerebrate | local command of a brood/formation | **BROODMOTHER**; Cerebrate is a central-dependency warning |
| REMOTE_EPHEMERAL_GENERATION | Swarm Host, Brood Lord | durable parent spawning disposable children | **SWARM_HOST**, **BROOD_LORD** |
| HEAVY_CONCENTRATION | Ultralisk, Brutalisk/Omegalisk, Leviathan | durable high-capacity concentration | **ULTRALISK**, **LEVIATHAN** |
| CONTROL_SUPPORT | Viper, Infestor, Defiler, Devourer | reshape/control/support rather than raw throughput | **VIPER**, **INFESTOR** family |
| DISTRIBUTED_SUBSTRATE | Nydus, Creep, Hatchery/Hive | persistent network/logistics substrate | **NYDUS**, **CREEP**, Hatchery |
| EVOLUTION_SELECTION | Evolution Chamber / Abathur-function | mutation + archive + selection | **EVOLUTION_CHAMBER** |

## Canonical capacity archetypes

### LARVA — uncommitted capacity

A fresh carrier is not work.

`RECOVER -> SELECT_EXISTING_WORKLOAD -> CHECK_CAPABILITY -> CHECK_AUTHORITY -> MORPH`

- state: unbound/ephemeral
- cost: zero until admitted
- authority: none
- purpose: preserve optionality
- failure to avoid: spending quota merely because capacity exists

### LING — cheap breadth

A Ling is a short-lived probe: one scout, mutation, donor inspection, hypothesis, or narrow coding/research attempt.

- cost: low
- state: ephemeral
- lifecycle: minutes
- authority: observe/draft/sandbox by default
- retry: zero or one bounded retry
- spawn rights: none
- fitness: useful information gain per cost
- promote to Roach only when persistence is justified
- morph to Baneling when the useful next action is destructive falsification

### BANELING — sacrificial falsifier

A Baneling is **not a stronger Ling**. It is a Ling deliberately converted into a one-use hostile test.

- exactly one target/artifact/claim/integration seam
- target identity/hash bound before execution
- destructive effects confined to sandbox or pre-authorized blast radius
- cannot repair the thing it attacks
- cannot self-verify
- no retry; repetition is a new Baneling with a new receipt
- output is STRIFE evidence or a falsifier PASS
- it dies after detonation

This is the disposable Red-Queen phenotype.

### ROACH — recoverable bounded work

A Roach owns one meaningful work item through turbulence.

- durable checkpoint
- bounded retry/resume/deadline
- reversible internal effects
- may survive carrier death
- does not self-mint children or authority
- terminal is not promotion: independent verifier + ConsumerAck still select

Fitness:

`verified useful closure / operator touch`

### RAVAGER — targeted blocker breaker

A Ravager is a Roach temporarily promoted for one specific obstacle that requires stronger tools, context, or effect authority.

- escalation is blocker-bound, not prestige-bound
- effect ceiling increases only enough to attack the blocker
- must demonstrate blocker removal without scope creep
- normally collapses back to Roach semantics afterward

### HYDRALISK — general-purpose throughput

Balanced medium-cost workhorse for ordinary coding, research, and tool execution.

Use when a task needs more substance than a Ling but not durable recovery or champion-level concentration.

### LURKER — event-triggered sentinel

A buried persistent watcher that wakes only when a condition changes.

Good mapping:
- scheduled/conditional monitors
- regression sentinels
- quota/health/leaderboard condition watches
- “notify only on meaningful delta”

Idle cost should be near zero.

### MUTALISK — mobile reconnaissance

Fast cross-domain scout for:
- web/repo/provider reconnaissance
- opportunistic probes
- quick pivots between underexplored niches

The distinguishing attribute is **mobility across domains**, not persistence.

### OVERLORD — telemetry and relay

Overlord means:
- observation
- capacity beaconing
- message/telemetry relay
- current-state projection

It has **no material-effect authority by default**.

### OVERSEER — active detection/attestation

An Overlord morphed for uncertainty:
- active anomaly detection
- provenance/currentness checks
- identity/health attestation
- hidden-state discovery

An Overseer may HOLD work; it does not self-promote a claim into truth.

### QUEEN — local macro allocator

Queen is the local deterministic/neurosymbolic allocator and maintainer:

- admitted demand -> eligible capacity
- resource/capacity accounting
- hatch/production maintenance
- bounded local defense/recovery

Queen is **not** semantic truth authority and should not verify its own allocation outcome.

### BROODMOTHER — delegated mission commander

This is one of the most useful lore donors.

A Broodmother owns a heterogeneous **mission** rather than one task. It receives bounded senior intent, composes a force package through existing Queen/Hatchery mechanisms, and may adapt locally if upstream communications disappear.

- durable mission state
- heterogeneous subunits
- bounded delegated authority
- local replanning
- survives loss of one carrier/vendor
- requires mission outcome + Telos gate + independent verification

This is the best Zerg analogue for Mission Command/JADC2 delegated execution.

### CEREBRATE — legacy command anti-pattern

Cerebrates are useful as a warning:

- intermediate commander
- highly coupled to a central strategic controller
- can create a hierarchy with brittle authority assumptions

Do not make Cerebrate a preferred production archetype unless a specific hierarchical dependency is desired and independently justified.

### SWARM HOST — periodic wave emitter

A mission-scoped parent that uses an **existing scheduler** to emit bounded disposable waves.

It is not permission to create a second scheduler.

### BROOD LORD — standoff child-emitter

Durable parent, disposable children.

Useful when the parent must retain context while projecting short-lived workers at range. Children inherit only the exact effect ceiling they need.

### VIPER — surgical integration/repositioning

Viper represents controlled reshaping:
- isolate a blocked dependency
- move a component to a different execution surface
- pull a high-value artifact into an integration context
- disrupt a bad local configuration

This is a narrow integration/control archetype, not a general commander.

### INFESTOR — external-system influence adapter

Infestor maps to working *through* another system:
- plugins/connectors
- adapters
- context/control injection
- external tool state

Because this can cross authority boundaries, it requires strict policy/readback. The useful abstraction is **controlled influence**, not “hijacking.”

### ULTRALISK — evidence-promoted heavy executor

An Ultra is not “the biggest model.”

It is a **rare concentration decision**.

Preconditions:
1. lane is valuable;
2. cheaper Lings/Roaches already produced evidence;
3. independent falsification did not kill it;
4. decomposition is no longer the obviously better use of resources.

Then the Ultra gets:
- long lease
- rich CoALA context
- larger compute budget
- durable checkpoints
- broader reversible internal effects
- explicit mission success contract

It still cannot modify Telos, evaluator, or its own authority.

**Raw intent must never hatch directly into an Ultra.**

### LEVIATHAN — capital platform, not intelligence

A Leviathan is the large carrier/platform:
- rented GPU machine
- large cloud work environment
- high-capacity runtime
- container for multiple admitted force packages

A Leviathan can host Ultras, Roaches, or waves. It is **not Sigrun** and is not necessarily cognitively superior.

This distinction is important for vendor independence.

### DRONE — infrastructure actuator

Drone converts capacity into durable infrastructure.

- effectful
- often one-shot
- requires explicit infrastructure-mutation authority
- success is artifact readback/tests, not “command completed”

### NYDUS — routing and handoff fabric

Nydus is a transport overlay connecting otherwise separated execution domains.

Examples:
- VPS <-> Cloudflare
- cloud chat <-> GitHub
- Slack ingress <-> private actor
- artifact/result handoff paths

Transport grants no semantic authority.

### CREEP — shared operating substrate

Creep is the common environment/data fabric that makes coordination cheap:
- schemas
- provenance conventions
- trace context
- shared memory indexes
- standard adapters

The goal is that units work better *because* they share substrate, without becoming coupled to one vendor.

### EVOLUTION CHAMBER — mutation + frozen selection

The Evolution Chamber:
- proposes mutations
- maintains QD/Pareto archives
- evaluates against **frozen independent fitness**
- performs successive halving
- promotes heritage only after verifier + downstream consumption

`SELF_REPORTED_FITNESS = 0`

### HIVE / SIGRUN — composed organism

Sigrun should not be modeled as one Overmind process.

The HIVE is the durable compound virtual actor:
- Telos
- CoALA memory
- identity
- evidence
- reference monitor
- heterogeneous capacity
- recovery/regeneration
- reducer/fan-in

Individual carriers may disappear without identity death.

The Overmind is therefore a useful **strategic-integration donor and centralization warning**. Broodmother-style delegated command is the better donor for resilient execution.

## Morph graph

```text
LARVA
  ├─> LING ──────────────> RETIRE
  │     ├─ evidence needs persistence ─> ROACH
  │     └─ hypothesis needs destruction -> BANELING -> RETIRE
  │
  ├─> HYDRALISK
  ├─> OVERLORD -> OVERSEER
  └─> other admitted phenotype

ROACH
  ├─ hard narrow blocker -> RAVAGER -> ROACH
  ├─ verified failure -> STRIFE -> RETIRE
  ├─ useful closure -> SPLENDOR -> RETIRE
  └─ champion evidence -> ULTRALISK_CANDIDATE
                         |
                         v
             independent allocation gate
                         |
                         v
                    ULTRALISK
                         |
                         v
              independent verification
```

Banelings do not promote upward. They detonate and leave evidence.

## Mission Control / JADC2 / Mosaic projection

The match is structural, not military cosplay.

JADC2's broad functions are **sense -> make sense -> act**, with emphasis on resilient data/communications and mission command. DARPA Mosaic emphasizes composable tiles, distributed sense-decide-act functions, substitution after losses, and heterogeneous force packages.

| Function | Capacity archetypes |
|---|---|
| Sense | Overlord, Overseer, Mutalisk, Lurker |
| Make sense / allocate | Queen, Broodmother, Reducer, Evolution Chamber |
| Act | Ling, Baneling, Roach, Ravager, Hydralisk, Ultralisk |
| Assurance | Overseer + independent Verifier |
| Data/transport | Creep, Nydus, Overlord |
| Adaptation | Evolution Chamber |
| Local mission command | Broodmother |
| Capital hosting | Leviathan |
| Composed enterprise | HIVE/Sigrun |

### Mosaic rule

The force package should be expressed in **capabilities**, not provider names.

Bad:

`2 GPT-5.6 + 3 Kimi + 1 Gemini`

Better:

`8 Lings + 3 Banelings + 3 Roaches + 1 Broodmother + 2 Overseers`

Then the Queen maps those archetypes onto whatever carriers are currently eligible.

This is the point of vendor independence.

## Example compositions

### Broad exploration

`12 Lings + 3 Mutalisks + 4 Banelings + 2 Overseers + 1 Queen`

Goal: maximize useful coverage and kill bad hypotheses cheaply.

### Build-and-falsify

`4 Lings + 3 Roaches + 2 Banelings + 1 Overseer + 1 Queen`

Goal: turn one promising direction into independently checked artifacts.

### Champion exploitation

`1 Broodmother + 1 Ultra + 2 Roaches + 2 Banelings + 1 Overseer`

The Ultra is surrounded by things trying to kill its assumptions.

### Long asynchronous mission

`1 Broodmother + 1 Queen + 3 Roaches + 2 Lurkers + 1 Overlord + Nydus routes`

Goal: continue through carrier churn, wait conditions, and checkpoints without Tao CPR.

## Admission schema

Every archetype instance should be machine-readable:

```json
{
  "archetype": "ROACH",
  "work_id": "uuid",
  "mission_function": "...",
  "time_horizon_s": 3600,
  "cost_class": "MEDIUM",
  "state_class": "DURABLE_CHECKPOINT",
  "effect_ceiling": "REVERSIBLE_INTERNAL",
  "spawn_rights": "REQUEST_VIA_QUEEN_ONLY",
  "retry_policy": {"max_attempts": 3, "deadline_s": 3600},
  "verification_contract": "INDEPENDENT_VERIFIER_PLUS_CONSUMER_ACK",
  "morph_allowed": ["RAVAGER", "ULTRALISK_CANDIDATE"],
  "telos_binding": "intent/version/hash"
}
```

Provider/model is an **assignment field**, not part of the archetype identity.

## Ablation law

Before adding another unit name, ask:

> If this archetype disappears, what independently measurable capability becomes unreachable or systematically underexplored?

If the answer is “none,” fold it into an existing concept.

That is how the vocabulary remains an executable ontology instead of turning into Zerg-themed prompt sprawl.

## Sources / provenance

Game and lore facts are donor observations. The engineering projection above is HFO design work.

- Liquipedia, current SC2 Zerg unit inventory: https://liquipedia.net/starcraft2/Zerg_Units_%28Legacy_of_the_Void%29
- Liquipedia, Brood War production/morph inventory: https://liquipedia.net/starcraft/Shortcuts
- StarCraft Wiki, Broodmother: https://starcraft.fandom.com/wiki/Broodmother
- StarCraft Wiki, Cerebrate: https://starcraft.fandom.com/wiki/Cerebrate
- StarCraft Wiki, Overlord: https://starcraft.fandom.com/wiki/Overlord
- StarCraft Wiki, Leviathan: https://starcraft.fandom.com/wiki/Leviathan
- DARPA, Mosaic Warfare: https://www.darpa.mil/news/mosaic-warfare
- DoD, JADC2 strategy summary: https://media.defense.gov/2022/Mar/17/2002958406/-1/-1/1/SUMMARY-OF-THE-JOINT-ALL-DOMAIN-COMMAND-AND-CONTROL-STRATEGY.pdf

No source above grants HFO authority. The model is explicitly a technology-agnostic engineering projection.
