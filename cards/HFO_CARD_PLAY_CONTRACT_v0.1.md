# HFO cards: from memory palace to command interface

Status: proposed product contract. This document creates no runtime route or authority.

Tao plays intent through cards. Sigrun composes and remembers the work. Replaceable carriers execute bounded steps. Evidence determines what the battlefield can truthfully show.

## The smallest useful interaction

Choose a card, choose a target, and choose a budget or an already admitted preset. Preview the expected result and cost. Play once. Receive a result, a named blocker, or a stopped attempt. The system owns scheduling, context assembly, progress collection and recovery inside that play's limits.

Scheduling delegates only to the incumbent scheduler/continuation owner. The card interface introduces no scheduler of its own.

Do not make Tao assemble leases, provider prompts or receipts. Those are engineering details unfolded behind the card. Ask only for a genuinely missing outcome, budget or consequential authorization.

## Card grammar

| Card type | Meaning when played |
|---|---|
| Land | Offers observed capacity from a vendor or host; spending requires current availability. |
| Unit | Selects a worker archetype and loadout, such as Larva, Ling or Roach. |
| Equipment | Attaches a capability, such as Cloudflare durability, tools or a checkpoint store. |
| Spell | Requests a bounded transformation of a target into a useful artifact. |
| Instant | Changes an existing play at a supported boundary: pause, cancel, checkpoint or redirect within authority. |
| Artifact | Supplies reusable machinery, such as a frozen evaluator or index. |
| Sigrun | Carries continuing intent and coordinates composition through the existing actor lifecycle. |

Keep existing card IDs and contracts. A spell may compose several cards. It should not duplicate their definitions or introduce a second dispatcher.

## One face, progressively unfolded

Front: name; types; prerequisite cost; target; at most three short abilities; scoped stats; flavor.

Back: exact behavior; allowed effects; dependencies; evaluator; result shape; failure/recovery behavior; provenance. A third evidence view shows observed runs. Descriptive text, an executable binding and a verified run are distinct.

Example face, composed from the existing Frozen Judge and Crown the Champion concepts:

> **Evolve a Candidate** — Spell · Search
>
> **Cost:** admitted capacity, a frozen judge, a finite budget.
>
> **Target:** one candidate and one scored objective.
>
> **Vary:** produce bounded alternatives.
>
> **Judge:** test every alternative against the same frozen objective.
>
> **Keep:** return the winner with its lineage, or preserve the incumbent.
>
> *Let the many attempt; let the evidence choose.*

This is a proposed composed face, not a new canonical ID, launch route or verified capability. It may eventually drive leaderboard research, product experiments or other work; each domain needs its own valid evaluator and effect limits.

## Compile into the incumbent work contract

The card-play UI resolves the selected card revision, target, output, evaluator, budget, stop condition and allowed effects into the existing WorkItem. The current owner supplies admission, reservation and lease. The existing carrier performs the work; the existing verifier and consumer disposition determine acceptance. Do not introduce a separate play queue, scheduler, reservation system or lifecycle database.

Bind those ports to current admitted owners and revisions at execution time. The established lifecycle is Sigrun mission, actor-issued lease/fence, carrier, completion, HRIST verification, then P7 ConsumerAck. A card name or historical pointer does not establish that a route is currently bound. An ambiguous admission or send remains HOLD/UNKNOWN under its original owner; never retry it blindly.

For repeated play, use the existing scheduler/continuation owner. Bind an aggregate budget and stop rule. Reconcile the previous attempt before launching a successor; an uncertain send still occupies its reservation. Run priority and evergreen work through the same admitted path with the existing backpressure rules.

## Zones and progress

- Deck: available definitions and compositions.
- Hand: the operator's selected options. Selection alone does not establish readiness.
- Battlefield: played instances, each with its actual progress and current evidence.
- Graveyard: explicitly ended or superseded instances; definitions remain reusable.
- Exile: explicitly forbidden or quarantined instances.

Pending, running, awaiting review and accepted are instance states, not new card types. Unknown stays unknown. A card can have both historical successful runs and a currently blocked play.

## First readiness demonstration

### A card is a promise the swarm can be tested against

The public card explains the promise. The engineering binding translates it into the existing work contract. A separate evaluator decides whether the promise was kept. Merely loading a card into a prompt is not execution, and structural validation alone is not behavioral fitness.

Every executable card needs these answers, using the existing definition fields and linked contracts rather than a parallel schema:

| Contract element | Question it answers |
|---|---|
| Identity | Which exact card ID and revision are being played? |
| Target and inputs | What object changes, and which exact source material is available? |
| Preconditions and cost | Which capabilities, current capacity and finite budget are required? |
| Behavior and effects | What useful transformation must occur, and what may the worker change? |
| Return | Which durable artifact and provenance must be produced? |
| Evaluation | What independent check establishes that the result is useful and correct? |
| Recovery | What happens on interruption, expiry, provider throttle or uncertain delivery? |
| Continuation | When may the existing owner issue the next distinct work item, and when must it stop? |

Provide at least one positive completion case and one meaningful failure/recovery case for each executable behavior. Public examples teach the card. Unseen evaluator cases measure generalization and remain separate from the worker's inputs. A worker that refuses every valid task fails the positive cases.

### First composition: Larva plus a durable Brood Cycle

Start with existing cards: Larva (`HFO-G143-C016`), Kimi Code Harness (`HFO-G143-C023`), Cloudflare Durability (`WW-EQ-CLOUDFLARE-DURABILITY-001`), Frozen Judge (`HFO-G143-C005`) and Brood Cycle (`HFO-G143-C053`). These references define the first integration target; they do not assert those cards are all admitted or operational today.

Larva binds the bounded assignment. Its loadout selects Ling, Roach or another supported specialization. The harness supplies the actual model/tool interaction. The existing Sigrun actor retains mission identity and accounting across carrier lifetimes. The evaluator checks the result. Brood Cycle requests the next useful assignment through the incumbent continuation owner while the original aggregate budget permits it.

Target sequence: **play -> admitted work -> carrier -> durable result -> independent verification -> native consumer acceptance -> distinct successor**. A model response, schedule tick or accepted API call proves only its own step.

Harness interchangeability is demonstrated by running the same compatible contract and evaluation on another admitted carrier. It does not require making browser chats and HTTP APIs behave identically. Each adapter must declare supported tools, maximum turn/horizon limits, checkpoint behavior, cancellation support and how an uncertain send is reconciled. Unsupported capabilities must be visible before play.

The current implementation order is Kimi, GPT Account-B browser, Google API, then OpenRouter free. The architecture supports all four; a working first path is the base for additional adapters. Google API capacity must be measured on its actual project/account. A browser subscription is not API credit, and OpenRouter free has no paid fallback.

Cloudflare is the intended durable coordination substrate. Reuse the incumbent Cloudflare Agent, Workflow and Durable Object bindings where available. Record the actual package version, source binding and runtime receipt for each adopted mechanism. Keep HFO-specific mission policy and evaluation in the card/work layer; use supported platform machinery for generic persistence, waits and recovery. Browser and CLI workers may live on separate hosts and return through the same admitted lifecycle.

Use one already admitted worker route to play a bounded research or existing judge task. From one operator play, obtain its exact output and evaluation through the existing consumer path. Then exercise one admitted successor and one interruption/recovery case. The measurable target is fewer operator touches without duplicate effects, lost artifacts or an expanded budget.

The engineering receipt includes durable result identity, lineage, actual budget usage, distinct verification, native ConsumerAck, and the observed recovery/duplicate-effect outcome. Show the operator a concise result; keep this detail available behind it.

Until that demonstration exists, the public site is a readable deck and world-state projection. Do not add an apparently functional Play button backed only by a prompt or a model response.

## Publication and regeneration

Git versions the definitions and engineering contracts. Worldweaver.dev presents the current public deck and evidence. Arweave stores immutable public releases. ArNS provides a readable pointer to a verified release. Credentials, private state and current operational permission are not contained in the public deck.

Each public release records its source revision, public-mirror revision, artifact path and SHA-256, predecessor release, Arweave transaction ID when one exists, and observed ArNS resolution. A new release is append-only on Arweave; changing an ArNS pointer does not rewrite an old transaction. A prepared file has no transaction ID until the upload succeeds.

The initial undername targets are `cards_worldweaver.ar.io` for the card release and `regen_worldweaver.ar.io` for the tested public recovery package. Preserve the existing `worldweaver.ar.io` root lifeboat while introducing those undernames. Mark prepared, uploaded, bytes-verified, name-bound and resolution-verified separately. A regeneration package must say exactly what a fresh carrier can reconstruct without GitHub or Worldweaver.dev and which private runtime dependencies remain outside it.

For this release, preserve the existing worldweaver root lifeboat. The prepared card snapshot has a fixed hash; the existing wallet reports full free allowance, but the attempted unsigned upload returned HTTP402. A supported wallet-signed upload and exact gateway readback are still required before setting a new cards undername. A regen undername additionally needs an honest recovery index and a tested recovery scope.

## Division of labor

Frontier seat: elicit Tao's intent, refine the card ontology and compositions, choose priorities, judge difficult tradeoffs, and accept useful outcomes.

Cheaper carriers: implement agreed UI or adapter changes, publish exact releases, perform bounded research, normalize evidence and return concise receipts.

Deterministic tools: scheduling, admission, accounting, hashing, build checks, state transitions and mechanical evaluation wherever the existing implementation supports them.

No standing frontier polling loop is needed for card editing. Work one coherent change at a time and fan in once at completion or a real blocker.
