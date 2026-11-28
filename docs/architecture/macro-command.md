# Macro: the General (force command)

**Kind:** current implementation contract. **Read when:** changing objectives, briefs, strategic recovery, reconstitution or main effort. Index and layer map: [battle architecture](../agents/battle-architecture.md). 

<!-- Moved verbatim from `docs/agents/battle-architecture.md` at d15687b; edit here, not there. -->

**Fixed-policy baseline (October 2026; #360):** Genome v2 is stashed (`battle/ai-policy.js`), and
commander *action doctrine* is independently disabled (`commander-doctrine.js`,
`ACTION_DOCTRINE_ON = false`). The four legacy conditional action overrides do **not** decide
missions; the General defaults to its explicit assault action unless objective ownership,
prepared-garrison requests, capture-zone security or reserve/hold contracts justify something else.
Fixed numeric settings for objective scoring, force allocation and cohesion remain operational:
turning action doctrine off is **not** turning the General or Squad Leader off. A `DEFEND` phase
with no doctrine rule is possible by design; trace its request/owner before labelling it a stall.

Brief lifecycle: `issued → executing → completed | invalid | failed | superseded`. The General
wakes only on: initial brief, mission complete or invalid, reserve due, a defence request that
changes the task, an objective vacated or changing control on a defend brief, a 120 s strategic
stall (`STRATEGIC_STALL_REPLAN`, the one stall clock: the coordination-health sampler's `replanDue` is that same number read from the General, an export flag nothing reads), a Squad Leader `doctrine-review` escalation, or a merge (`squad-reconstituted`). Wakes are
exported under `macroCommand`.

Strategic-recovery validity and lifecycle (module 22a, the strategic-freeze fix): the stall
ladder (reconcile 120 s → release 180 s → main-effort 240 s → reset 300 s of faction objective
stall) is one pass per episode, the episode keyed to the last objective progress — and a side
that recovers nothing makes none, so the ladder alone could leave a front unreviewed for the
rest of the battle. Three lifecycle rules close that without touching Squad Leader ownership:

- a later stage holds (bounded by one 60 s adoption window) while a brief the previous stage
  published is still young and unaccepted, instead of superseding an in-flight adoption;
- once the ladder is exhausted, a review pass re-runs the reset population every
  `STRATEGIC_STALL_REPLAN` of continued stall — deterministic cadence, never a new timer. The
  population still excludes useful defenders and squads with a measurable-progress pulse, and a
  pass that re-derives the identical brief is deduped into a recorded ineffective wake
  (`recovery.history` stage `review` with `pass`/`issued`/`ineffective`), so a static world
  produces no churn;
- a strategic reset that keeps the squad on its failing objective re-briefs it through the
  objective's flank point rather than re-deriving the identical brief (which `issueMission`
  dedup would leave in place — the no-new-brief lock). The flank point is a deterministic
  function of objective and squad, so the rule is stable: an unmoved squad re-derives the same
  key and dedups; only a changed decision (another effort, an owner flip) produces a new brief.
  Resets that switch objectives are untouched, and the stalled objective is never excluded —
  with every effort stalled it may still be the correct one.

The sampler (module 40, `2.1-strategic-chain`) also publishes
`strategicChain`, an observation-only reconstruction of the chain a stall recovery depends on:
per faction the last time each link moved (objective change and progress, brief issued, Squad
Leader acceptance, local phase change, measurable movement toward the mission point, stall
detection, stall wake, recovery stage), one outcome record per strategic-family wake (the brief
before and after, whether a new brief was generated or `issueMission`'s dedup left the old one,
acceptance, local phase change, and whether objective or point progress followed within the
General's 120 s replan window), and a census of squads whose executing mission has shown no
point progress for longer than that window (owner and vacancy recorded, never a verdict: an
empty objective alone is not evidence of a stale plan). It rides the full-diagnostics export and
the benchmark record's `coordinationHealth`; nothing in the runtime reads it
(`strategic-chain-check.js`). `commander-ai.js` declares the lifecycle as `missionStates`; every
write, including a Squad Leader acceptance request, goes through `transitionMission`/`acceptMission`.
Terminal records cannot reopen; a new issue creates a new brief object.

**Main effort** (`commander-doctrine.js` `chooseObjective`, Macro only). Saturation (55 per squad past
an objective's allowance) stops a side piling onto one objective; the frontage limit stops it spreading
over all of them. A side attacks at most `maxEfforts` (2) objectives it does not hold at once; opening
another costs `frontageCost` (140), so the next squad reinforces an open effort. Taking an objective
closes its effort. Defending owned objectives doesn't count. A strategic-stall wake closes the
efforts its stalled capture briefs were on: each costs `stallCost` (150) and no longer fills the
frontage, so the side masses on new objectives (`commander-ai.js` `stalledEfforts`; outcomes under
`macroCommand.state.stallOutcomes`). All three are scores, never vetoes.

**Reconstitution** (`commander-ai.js` `reconstitute`, Macro only). SquadAI owns the shared
survivor-remnant boundary (`REMNANT_EXTRACTION_MAX = 4`), which Force Command exposes as
`RECON_POOL_MAX`. A retreating squad with 1-4 living men is no longer a tactical formation: until a
real reconstitution brief moves its assembly state to `to-rally`, the Squad Leader pins its anchor to
`SquadAI.extractionHome(sq)` and gives every survivor the same rear-base **survival fallback**. `baseHome`
is captured when the squad is created and never follows a later prepared-defender rewrite of tactical `home`. That fallback is continuation
of the already-entered retreat state, not a new tactical command, so it does not require a scattered
man to remain inside voice/visual Command Reception range. It opens no local morale-rally recovery and
never uses the sliding retreat-anchor/recentring path. A dazed, frozen or otherwise delayed survivor
may lag; men already farther rearward are never ordered back toward him. Navigation still legalizes
each man's route around terrain. A later `to-rally` reconstitution brief is a real new command again:
the extraction base remains the live fallback while that replacement is pending, and Command Reception takes movement
authority back only when the reconstitution order is personally adopted. Once the remnant reaches that base and is out of
contact it is `at-base` and waits in the survivor pool. Five or more survivors remain a viable squad
and keep the ordinary retreat-anchor / morale-recovery behavior. Reconstitution needs at least 6 combined survivors
(`RECON_MIN_STRENGTH`) and never splits a source squad or reconstitutes one remnant with itself.
The General chooses geographically coherent remnants rather than simply taking the strongest first:
for each possible seed it adds the nearest remnant to the moving centroid until the minimum is met,
then selects the candidate with the smallest worst source-to-centre march (then total travel, then
fuller strength). A candidate is rejected when its neutral meeting point would require any source to
travel more than 300 m (`RECON_MAX_CENTER_TRAVEL`). This prevents a rear-left remnant from being bound
to a rear-right remnant merely because their combined manpower is sufficient.

The rendezvous is based on the grouped squads' actual at-base positions, not their historical home
lanes. From that neutral centre the General projects toward the objective it expects to task next and
slides the meeting point forward only while every source squad's route remains within 115% of its
straight route to the neutral centre (`RECON_FORWARD_DETOUR = 1.15`), with an absolute 180 m cap
(`RECON_FORWARD_MAX`). For two squads this is the Pythagorean hypotenuse budget; the same direct
distance test generalizes it to three-plus remnants. The brief carries the selected objective only as
`plannedObjectiveId`, never `targetObjective`, so retreating squads are not counted at the objective;
after the merge the General sends the rebuilt squad there unless control changed
(`to-rally`, `SquadAI.retreatGoal`). Diagnostics expose waiting survivors/source positions, whether
enough manpower exists but geography blocks grouping, and each formed group's neutral centre,
maximum centre travel and forward shift.
Once all are there the General merges them: the strongest squad with a living leader survives,
otherwise the most senior survivor is promoted (ex-leader, rifleman, scout, gunner last). The re-formed
squad has `leaderId`, `establishment` 10 and only living members; absorbed squads are `disbanded`.
Command is `SquadAI.leaderOf`/`isLeader`, never a role check. **Succession** (Squad Leader,
`updateSuccession`): a squad whose leader is killed is leaderless for the 6 s `succession` lease
(leaderless cohesion/corner rules, 0.8 accuracy), then `SquadAI.mostSenior` (sergeant, rifleman,
scout, gunner last; lowest id breaks ties) takes command and slot 0 and the penalty ends. At a merge
the most senior surviving leader commands.
