# Command Reception and the order lifecycle

**Kind:** current implementation contract. **Read when:** changing how a published squad order reaches each man (receipt, adoption, execution). Index and layer map: [battle architecture](../agents/battle-architecture.md). **Status:** the phased plan below shipped (Phase 0 of [AI Tactics Campaign V1](../reference/AI_TACTICS_CAMPAIGN_V1.md) is complete); the text is kept because it states the contract. Its "next" steps are historical framing: check the [roadmap](AI_SKILLS_ROADMAP.md) for what is planned now.

<!-- Moved verbatim from `docs/agents/battle-architecture.md` at d15687b; edit here, not there. -->

**Active AI queue — immediate prerequisite: individual command reception/execution.** Before adding new
urban/route tactics, remove the remaining "psychic squad bus": publishing a squad/fireteam order must not make every
soldier know, orient to, or execute it on the same tick. Squad/Meso remains the command owner, but each man gets a
personal receipt/adoption state between the published order and Engagement/Movement execution. That state may record
`issued -> heard/seen -> processing -> adopted -> executing` (exact field names are implementation detail), and it
must not become another stance, destination, target, or path owner.

The same contract applies to both classes of currently synchronized behavior:

- **Posture/fire-control orders.** A shared HOLD FIRE / prepare / "get down" decision is published once, then each
  soldier receives and adopts it on his own deterministic timing. Recognition/TAC, stress, current task, distance,
  audibility/visibility and a stable per-soldier offset may affect latency. Immediate survival reactions (incoming
  fire, suppression, wounds, personally seeing a threat) stay individual and may pre-empt or beat the command.
- **Movement orders.** Regroup, new anchor/fireteam destinations, move-to-cover/structure and later directional
  commands must not expose a new exact destination to every man immediately. A soldier keeps executing his last
  adopted order until he personally receives/processes the replacement. Spatial orders may require a brief
  orient/locate step when the reference is not already obvious; simple already-forward commands need not force a
  theatrical turn.

Command Reception owns one immutable adopted read model per recipient/category/scope in
`_commandReception.adoptedBySoldier`. Gameplay consumers use `BattleCommandReception.adoptedView`:
repeated reads reuse the same frozen record (including its current scalar-only `data` and `point`),
and a replacement becomes visible only when that recipient adopts it. Pending replacements retain
the previous view; reset releases the slots. `adopted` and `snapshot` retain detached mutable copies
for external/diagnostic callers. Adding nested payloads must extend the freeze boundary as well as
`copyData`; callers must never mutate a shared view. The owner and timing rules remain unchanged.
`command-read-model-check.js` covers identity, mutation isolation, replacement and reset;
`scripts/profile_command_read_model.cjs` measures lookup copying separately from battle performance.

Implement this in **small phases**, each with its own deterministic harness/probe and no combat-RNG draw:

1. **Receipt telemetry, behavior-neutral — shipped in #212.** Versioned command envelopes and per-soldier
   receive/process/adopt diagnostics now observe current posture/fire-control and movement publications with no
   combat-RNG draw and no gameplay write.
2. **Posture/fire-control adoption — shipped in #214, opt-in pending paired benchmark.** Engagement can consume
   each soldier's adopted HOLD/OPEN/precision version with `?commandPosture=1`; under-fire reflexes remain immediate,
   Squad/Meso still owns the shared decision, and the default/off arm remains Phase 0A behavior.
3. **Movement adoption — shipped in #215, opt-in pending paired benchmark.** With `?commandMovement=1`,
   Squad Command applies only each soldier's personally adopted replacement while Movement Resolver remains the
   final-destination arbiter; a pending order cannot erase the previous adopted slot. The default/off arm remains
   immediate publication.
   Arrival acknowledges the latest personally published movement envelope, not the old destination
   retained during reception. The Squad Leader cannot repeatedly spend the same old arrival to advance
   its anchor while replacement orders are pending. Destination coalescing must also verify that
   execution acknowledges the current envelope: returning to an earlier mission with the same point
   still supersedes an intervening pending order. These are issuer/execution checks; Command Reception
   remains information-only and tactical combat commitments retain Movement Resolver arbitration.
4. **Orientation and relay — current phase, split small.**
   - **0D1 reference-sensitive orientation — shipped in #216.** Distinguish simple, directional, point and object
     references so "get down", "shift fire left", "move there" and "get in that building" pay bounded,
     deterministic processing/orient/locate costs appropriate to the reference instead of one generic spatial delay.
     Command Reception still must not physically turn a man or become a stance/movement owner.
   - **0D2 relay topology — shipped in #223, opt-in via `?commandRelay=1`.** Add bounded direct voice/visual receipt and, where needed,
     Squad Leader -> fireteam relay -> member timing.
5. **Close the direct-read gaps — Phase 0E in progress.** Add a static/runtime ratchet for command-bearing squad fields so new behavior
   cannot bypass personal adoption, then run fixed-seed and paired benchmarks for churn, stalls, response latency,
   cohesion and mission progress.
6. **Inter-squad tactical broadcast — Phase 0F, design in `docs/reference/AI_TACTICS_OUTLINE.md`.** Nearby squads
   share tactical contact beyond the General's stale intel rollup. Today a squad creeping up a hill, a squad
   watching from a distance, and a squad fighting for its life from sniper fire each act on their own picture.
   0F adds a Meso-layer broadcast channel: when a squad's contact picture changes meaningfully it publishes a
   tactical broadcast to nearby squads within `BROADCAST_RANGE`; receiving squads merge the broadcast into their
   own `squad.contact` picture and the Squad Leader can react. Sliced as 0F1 (telemetry, behavior-neutral),
   0F2 (reception, default-on; `?squadBroadcast=0` is the telemetry-only control), 0F3 (reaction, shipped with reception). This is squad-to-squad, not
   Macro and not Micro; it does not bypass Movement Resolver or Engagement ownership.
7. **Multi-contact awareness — Phase 0G, design in `docs/reference/AI_TACTICS_OUTLINE.md`.** Today every layer
   tracks one threat at a time: `selectBelief` returns one winner, `squad.contact` is a single object,
   Engagement's `decide()` reads one contact. A soldier being shot at from the north while engaging an enemy
   to the south _knows_ about both (both are in `_beliefs.byKey`) but _acts on_ only one. 0G makes the existing
   multi-belief data consumable: Perception exposes a prioritized list, Engagement reacts to secondary threats,
   and the Squad Leader can assign fireteams to different threat sectors. Sliced as 0G1 (secondary threat
   awareness, opt-in `?secondaryThreat=1`), 0G2 (the read-only squad-level contacts map, available whenever default-on soldier beliefs are active; the old `?squadContacts=1` documentation is obsolete), 0G3
   (fireteam split on multi-contact, default-on; `?fireteamSplit=0` is the legacy control).

**After that prerequisite ships**, return to `docs/reference/AI_TACTICS_OUTLINE.md`'s tactical control-plane sequence:
`TacticalSituation` + read-only street/building-control diagnostics, richer `SquadIntent` metadata, then one named
`route-transition` lease before new route/structure behavior.
