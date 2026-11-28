# Future Design Backlog

> Status: brainstorming / post-#299 parking lot. Items here are not commitments and must not expand active #299 scope without being promoted into a scoped implementation plan or PR.

## Design north star

Grasstex should feel like a procedurally generated WWII battle against an opposing command system rather than bots selecting canned scripts. Information should remain grounded in what soldiers and commanders could plausibly know.

**Information rule:** if the player knows something, the game should be able to explain how the player's soldier learned it: direct observation, squad report, radio/command report, reconnaissance, or another legitimate source.

## Immediate sequencing

Updated 2026-11-07. The AI architecture order lives in `docs/architecture/AI_SKILLS_ROADMAP.md` sections 7 to 9.

1. Turn the guarded tactical controller (Meso) on by default (#785), legacy rollback kept.
2. Port the Macro (General) and Micro (soldier) layers onto the controller, then retire legacy decision code.
3. Complete tactical-map and presentation work that exposes existing state without changing tactical authority.
4. Formation-completeness pass for specialist capabilities.
5. Playable commander and pre-battle planning.
6. Logistics/economy and reconnaissance layers.
7. Revisit Genome and learned tactical reasoning only after the deterministic tactical baseline is stable.

The tactics campaign tracker is issue #786 (formerly PR #299, record in `docs/reference/AI_TACTICS_CAMPAIGN_V1_PR299_RECORD.md`); its remaining phases are audited for reuse against controller skills, not merged wholesale.

## Tactical map and battlefield presentation

- Battle momentum / tug-of-war meter derived from underlying battle state; presentation must not drive AI decisions.
- 360-degree HUD compass and consistent map bearings.
- Structured contact reports with threat type, bearing/direction, estimated range, location/landmark, age, and confidence.
- Prefer audible soldier callouts over supernatural 3D enemy pings.
- Immediate local reports may use clock direction; deliberate reports should favor absolute bearings.
- Reported contacts should create uncertain/fuzzy map intelligence, not perfect enemy coordinates.
- Contact precision/confidence should improve as observations corroborate.
- Tactical map should share the same information model used by AI TacticalSituation and player-facing reports.

## Minimal HUD philosophy

Avoid exposing omniscient engine state simply because it exists.

Candidate default HUD information:
- current weapon / weapon state
- stance
- immediate medical state such as bleeding
- contextual interactions
- compass/bearing information where appropriate
- squad information the soldier could plausibly know

Long-term candidates for removal/replacement:
- conventional health bar
- exact arcade-style ammunition counter

Prefer physical/audio/inventory cues for ammunition and wounds where practical.

## Formation completeness and specialist units

Treat specialists as tactical capabilities understood by the planner, not merely NPC classes.

- Medics: casualty response, treatment priorities, casualty collection behavior.
- Snipers: observation, overwatch, interdiction, priority-target tasks.
- Engineers: explicit engineering objectives/tasks rather than opportunistic generic behavior.
- Extend planning vocabulary and TacticalSituation only when the capability has a clear command/execution contract.

## Playable commander / HQ layer

- Persistent physical commander entity.
- Historically grounded HQ detachment/security rather than an arcade elite bodyguard.
- Player can assume commander authority through the same planning primitives used by AI command.
- Clean AI -> player -> AI authority handoff without immediate countermanding.
- Commander may still enter/possess frontline soldiers after issuing plans.
- Physical command post creates meaningful location/risk and possible enemy command disruption.

## Pre-battle planning phase

- Generated battlefield briefing and legitimate initial intelligence.
- Choose command-post/start location.
- Review objectives and known/suspected enemy information.
- Allocate squads and designate main/supporting efforts, axes, roles, reserves, etc.
- Potential limited pre-battle reconnaissance spending.
- Transition: planning -> briefing -> deployment -> execution -> reports/contact -> replanning -> outcome.
- Future AI voice briefing should render the actual structured plan rather than inventing a separate narrative plan.

## Logistics, reconnaissance, and battle economy

Start at engagement logistics before attempting a broad strategic production economy.

Potential constrained resources:
- ammunition/resupply
- artillery shell/allocation pool
- fuel
- aerial reconnaissance sorties
- reinforcements/replacements
- transport and supply vehicles
- depots/supply points

Resources should constrain real tactical choices rather than exist as abstract currencies. Losing or capturing logistics assets may affect battlefield capability.

## Doctrine and Genome revival

#299 establishes tactical competence; Genome should later create bounded variation.

- Doctrine provides broad tendencies/constraints.
- Genome biases valid decision weights rather than directly overriding behavior.
- Candidate traits: aggression, casualty tolerance, reserve commitment, maneuver preference, defensive depth, reconnaissance emphasis, disengagement willingness.
- Tactical legality and situational awareness remain authoritative.
- Do not reintroduce Genome until the deterministic planner is stable enough to distinguish intentional variation from bugs.

## Bespoke tactical reasoning model — long-term research

Potential future experiment: a compact specialized learned model at commander reasoning/planning level, not an LLM controlling soldiers.

Conceptual interface:

`TacticalSituation + memory + doctrine/Genome -> structured tactical intent`

The deterministic tactical stack remains authoritative for legality and execution.

Research principles:
- tightly structured inputs and outputs
- wake at meaningful decision/replan events, not every simulation tick
- preserve fog of war and human-scale command latency outside the model
- validate/repair proposed plans through #299 primitives
- begin with compact pretrained/fine-tuned/distilled models rather than training a general model from scratch
- preserve #299 decision traces, situations, plans, and outcomes as possible future training/evaluation data
- investigate whether a sub-1B to low-single-digit-billion-parameter specialized model is sufficient; do not commit to a size before evaluation

## Difficulty philosophy

Do not make competent AI fun by making it artificially stupid or psychic.

Difficulty should primarily tune bounded human limitations:
- information quality and propagation delay
- recognition/reaction latency
- uncertainty/confidence thresholds
- planning sophistication
- memory quality/decay
- reserve efficiency and coordination

Even high difficulty should operate from legitimate battlefield information and human-scale command tempo.

## Promotion rule

When an item becomes actionable, move its detailed design into a dedicated `docs/plans/` document and scope it to its own PR/issue. This backlog remains the cross-cutting parking lot and roadmap, not an implementation specification.

## Deferred 2026-09-29 (from the battle architecture page)

**Kind:** deferred or future proposals, not commitments and not a task list. Check GitHub issues and `main` before acting on any item. Moved from `docs/agents/battle-architecture.md` at d15687b.

**Residual small debt (track individually, not as “AI polish”).**

- `objectiveHoldWin` remains an unread legacy genome parameter while the genome is stashed; remove/settle it during
  the eventual genome rewrite rather than reviving it now.

**Deferred / future — not V1 blockers**

Deferred 2026-09-29, none is a broken system. The first five were open items: sniper roles is a feature
that waits for models, the next four are measured tuning questions that each need a paired benchmark
before any effect is claimed.

- **Sniper roles.** Loadouts, MG-by-kind and the sidearm switch are shipped (see Loadouts and
  sidearms). Left: sniper roles (M1903A4 / Kar98k ZF39). They need a model and a weapon seat measured in
  Motion Lab, so they wait for that; the sidearm's pose and grip on the sergeant and gunner models is
  also worth a Motion Lab look once a close fight shows it. Any new role changes combat: benchmark it paired.
- **Grenades** (#409, **ON by default**; `?grenades=0` turns the whole system off and leaves it inert). `modules/23-grenades.js`
  owns carried counts, commitments, releases and bursts. Loadouts issue 2 to leaders/riflemen/scouts,
  1 to gunners and 3 to engineers; possession and weapon rearming do not refill them, battle restart does.
  The player chooses the grenade with G/controller RB (press again to put it away), aim mode
  (RMB/LT) then shows the owner's arc and landing point, and fire (LMB/RT) throws it, one press one
  throw, never a rifle round while it is chosen. Engagement's `throw` action uses the same 0.9 s
  commitment. Only death
  before release cancels it; retreat, a changed target or a skipped AI tick do not. Release consumes
  one, starts an 18 s cooldown and freezes the physical arc. The fuse expires 3.6 s after landing.
  AI requires a fresh confident personal contact within 30 m, blocked rifle fire, fire authorization,
  a clear arc and no friendly (including itself) within 13 m of the intended landing. Scatter uses
  a separate scenario-seeded `grenades` RNG stream and fragment hits a second, `grenade-fragments`;
  neither draws combat randomness. Physical cover/walls/terrain use
  `BattleBallistics.environmentLineBlocked`. A burst gives every man within 22 m with a clear line a
  Poisson number of fragment hits (mean `hits5 x stance area x (5 / d)^spread`, legs and low torso
  favoured; crouched men present 0.6 and prone men 0.3 of the standing silhouette) plus one
  overpressure chest wound inside the kind's blast radius. Each is an ordinary `BattleWounds` blast
  hit whose energy decays with range, so a man is wounded, bled and dropped by the existing owner.
  The US Mk 2 (57 g TNT, serrated cast iron) and the German M24 (170 g TNT in a thin steel head:
  bigger overpressure radius, fewer and shorter-ranged fragments) have their own constants. They are
  fitted to the published figures for the class (lethal radius about 5 m, casualty radius about 15 m,
  fragments to hundreds of metres at negligible density; TC 3-23.30 for the M67, Mk 2 fill 52-66 g
  by period): a standing man in the open is a casualty about 95 % of the time at 2 m, half the time
  at 5 m and rarely at 15 m, and lying down cuts that by roughly two thirds. Ordinary suppression
  events reach 16 m. Friendly/self injuries retain attribution and earn no kill credit. Imported
  Mk 2/M24 props, three stance-specific throw clips and a brief flash plus an **instant full-footprint
  3D smoke density volume** are presentation only (`24-grenade-fx.js`). Smoke replaces the old
  expanding dust billboards: one shader-integrated world-space field per explosion, no center-emitting
  particle generator. The footprint is 5.5 m horizontally and 2.3 m half-height at the moment
  of detonation; the density holds for ~3 simulated seconds, then dissipates by 10 seconds
  (8 active volumes max, no screen-size postprocess). `?grenadeFog=off` or `grenadeFog=0`
  disables only the fog, not flash, damage, audio or grenade behavior. Restart clears it.
  Player aim displays the owner's arc and landing point. Default-enabled in #442 after a
  paired 100-seed benchmark (quiet: casualties +0.4 %, p 0.625) and owner review. Arming, spoon
  and burst audio are presentation only (`24a-grenade-audio.js`, `?grenadeAudio=0` off; see Audio).
- **FG 42 balance.** The four-arm benchmark attributed the scout balance shift to the FG 42, not
  the perception cones. Test one lever at a time: Kar98k assignment, shorter practical FG 42 range,
  or wider dispersion/grouping at range. Use the existing `perception=0` / `geScout=carbine`
  arms and paired benchmark; do not bundle this with unrelated tactics changes.
- **Fighting stance doctrine.** Ownership is fixed: Engagement is the only stance writer. The open
  question is tactical policy only: whether long/medium/close combat should map more aggressively
  to prone/crouch/stand than the current `fightingStance` thresholds. Treat any change as tactics
  and benchmark it.
- **Strategic-stall scoring.** The stall mechanism is working, but ~43-46% of live-policy wakes can
  repeat the same effort because distance can outweigh `stallCost`. If revisited, tune score
  weighting with the existing `stallOutcomes`/ `stall-wakes` evidence and a paired benchmark;
  claim outcome effects only from the large benchmark.
- **Movement tolerance audit.** Cover-bound deadlock: fixed, see `bound-episodes`. Movement Progress still uses a
  3 m arrival band while some destinations require tighter placement; cover has its own bound
  window now. Audit another destination kind only if a real stuck case appears.
- **Performance:** the 100-soldier targets are met. Do not restart the audit without a measured
  regression. Startup prebaking of the 10 model FBXs / far-LOD lists is worth at most ~1 s;
  retargeted clip prebaking stays rejected at ~45 MiB. Sim CPU work (Engagement/sight and movement
  resolver) is deferred until `ww2fps` decides it will reuse this AI implementation. The trainer
  and headless benchmark staying on the procedural rig is also deferred.
- **Damage asset upgrade:** UV-painted body wounds V1 is accepted on the monolithic FBX. When Tripo
  or manual segmentation provides separate helmet/holster/major-gear meshes, add material-specific
  impact layers and detachable-equipment effects. Segmentation is not required for V1.
- **Command architecture / tactics outline:** the General/Squad Leader/Engagement ownership split and
  mission contract are already shipped. The larger next AI phase remains intentionally out of the current queue:
  versioned `SquadIntent`/single intent resolver, the stronger Squad Leader local planner, structure-control and
  street/route-transition state machines, objective secure/exploit/handoff, then platoon/company command,
  fallback/counterattack and combined arms when force size/vehicle work justifies them. The detailed source of
  truth is `docs/reference/AI_TACTICS_OUTLINE.md` (introduced by `f71ab0dd55cd03daae4b07c81665d3d74452618c`); do not
  duplicate that roadmap here or implement isolated pieces as ad-hoc substitutes. ~5 squads per side still does
  not justify a platoon layer yet.
- **Height-aware window LOS, window animation.** The limits under Window firing port: global LOS ignores the sill and the lintel, the
  sector does not follow the pose, and there is no firing, braced or reload pose at a window. Any change to global LOS is a behaviour
  change for every ray through a window: its own flag and a paired benchmark.
- **Genome rewrite and AI Graph return.** Both are stashed (see the top of this file), so the genome is the
  code defaults. When the whole AI system rewrite is finished, rewrite the genome against the finished layers
  (what it parameterises, what the layers own, one owner per number, the unread `objectiveHoldWin` settled), bring the graph back to mirror the layers and their mapping,
  then flip `STASHED` in `ai-policy.js` and run `probe_ai_graph_stash.cjs` with `STASH_EXPECT=present` and a
  paired benchmark against the defaults baseline. Not before. It must settle two things, and one direction is
  recorded:
  - **One default parameter surface.** The machines' numbers live in five places today: `BattleEngagement.tuning`,
    module 16's bound timing and `cfg()` defaults, `BattleSoldierMind.tuning`, `commander-doctrine.js`
    `FALLBACK`/`FALLBACK_DOCTRINE` and the genome's `DEFAULT_PARAMETERS`/`DEFAULT_DOCTRINE`. Make it one declared
    table (name, owner layer, default, range, unit, the states that read it) that the genome, the harness and the
    graph all read, so the duplicated defaults and `genome-gate-check.js`'s agreement test go away.
  - **The genome tunes, it never rewires.** It may change the numbers and scoring weights the declared states read
    (thresholds, holds, wake times, weights, inside their ranges) and pick among declared actions by weighted
    score with a deterministic tiebreak. States, legal transitions and owners stay code (the Phase 1 tables), so
    the ownership checks hold whatever a genome says: a genome cannot add a transition or a writer.
  - **Direction, not committed: the genome as the basis for a very light LLM planner.** It would compose a
    standing order from the declared vocabulary, e.g. "we need to retreat; base is reachable but the route
    crosses enemy ground, so retreat to the last known safe location, wait there for reinforcement or another
    retreating squad, and hold at the rally point to the last man until then". Its limits: it runs only on the
    General's and Squad Leader's declared wakes (never per soldier or per tick); its output is data checked
    against the vocabulary and executed through the existing owners (`transitionMission`, leases, the resolver),
    so a bad output is rejected, not obeyed; it is deterministic (decisions recorded with the seed and replayed,
    no live model call in a benchmark or fingerprint run, no combat-RNG draw). The example needs pieces that do not
    exist yet, each a code state or action first, with the model only choosing among them: a per-side memory of
    safe points ("last known safe location"), an assessment of a route through enemy ground, a hold with an exit
    condition ("until reinforced or joined by a retreating squad"; today a retreating squad walks `to-base` and
    reconstitution groups the `at-base` survivors at a rally point), and a hold-to-the-last-man terminal.
