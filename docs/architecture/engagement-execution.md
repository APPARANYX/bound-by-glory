# Micro: Engagement, weapons and physical execution

**Kind:** current implementation contract. **Read when:** changing Engagement states, stance, fire, cover stations, the window firing port, loadouts, weapons and wounds, or frozen physical rules. Index and layer map: [battle architecture](../agents/battle-architecture.md). 

<!-- Moved verbatim from `docs/agents/battle-architecture.md` at d15687b; edit here, not there. -->

**Engagement states:** `advance → orient → (decide) → bound → engage`, then
`pinned`, `assault`, `alert`, `withdraw`, `station` (plus the default-on stress states `cower`, `flee`, `freeze`, `rage`; `?stressAct=0` is the legacy control: see Stress reactions). `orient` never fires (REACT 0.45 s scout to
0.85 s gunner). `engage` pins position and commits stance. `alert` holds the sector for
`ALERT_HOLD`. Fire requires: a live target, not reloading, past `eng.fireReadyAt`, speed ≤12% and
not crawling, within `AIM_CONE` (~12.6°), and gunner emplaced. `squad.inContact` is
`contactCount>0 || suppressors>0 || taking fire` where `contactCount` is the men whose held target has a live firing line: sight
alone does not make a firefight. A target whose round would meet the crest or an obstacle first (the trigger-time gate's own
`blockReason`) counts for `NO_LINE_GRACE` (6 s) after the line closes, then the man is only *observing*: he proposes no hold, so the
Squad Leader's published order moves him, and the squad can clear contact, close its plan lease and advance on the last sighting
instead of sitting behind the crest with every layer reading "contact" (`?fireLineContact=0` is the old rule; the hill stalemate,
`hill-stalemate-check.js`). Suppression deals no damage, only pins. There are at most
`MAX_SUPPRESSORS` suppressors, the MG first. The Squad Leader (`fireAndMovement`) sends one fireteam
forward every `BOUND_CYCLE` if ≥2 are shooting, only in an assault phase, and the MG never moves.
`engagement.js` declares each stored state's meaning, entries, exits, update rate and legal next
states in `BattleEngagement.states`; its transition function is the only state/clock writer.
Combat urgency and firing-station release request their legacy entry semantics through
`BattleEngagement.requestState`, so those modules do not write `eng.state/since/until`.
**Squad fire control / crest preparation** (`modules/16-squad-plan-stability.js` owns the order;
Engagement executes it; `?fireControl=0` is the immediate-fire control). A first-hand visual contact is a request
to open fire, not permission to shoot. The Squad Leader starts at `hold`: the squad stops, faces the first-hand
contact and goes prone; each man may make only a local forward adjustment (0.75 m samples, at most 6 m, through the
Movement Resolver) to find a prone eye + ballistic line over the crest. If the full 6 s preparation window produces
**zero** usable prone firing lines, the leader changes to `reposition`: fire remains forbidden, but the forced-prone
drill and the Meso stationary-preparation gate both release so Squad Leader bounds / normal Engagement cover-seeking
can move men to a viable fighting position. A man who reaches a
position from which only crouch/stand clears the obstacle may count ready in that lowest viable fighting stance;
prone remains the preferred initial ambush posture, not a terrain deadlock. Engagement's trigger and suppressive-fire
paths both read the same permission. A man who is already being shot at (suppressed or aimed at in the last 3 s)
may return fire immediately, **incoming fire itself keeps the squad in contact**, and the Squad Leader opens the
squad on its next tick even if the posture change briefly cost everyone visual target lock.

The normal volley target is deliberately not "all ten men or deadlock": all available men adopt the low posture,
but the leader accepts the firing line when 70% of the commanded survivors (minimum three) are stationary, prone,
armed and have both sight and a clear ballistic line. It then considers squad strength and mean MKM: at 85 m or
closer it opens once prepared; farther out a squad normally needs at least 55% of establishment and mean MKM 0.42.
After 6 s, two usable rifles are enough for the leader to accept a partial line rather than freeze forever on bad
terrain. At 140 m+ the leader first looks for a precision shot: the best in-range non-MG marksman is selected by
MKM with a role preference for sniper/scout/rifleman; MKM 0.62+ gets `precision`, authorizing only that shooter
while the rest stay prone and silent. Any received enemy fire escalates `precision`/ `hold` to `open`.
No combat-RNG draw chooses any of this. `decision-fire-control` telemetry records state, reason, range, strength,
marksmanship, ready/living counts and designated shooter. The tuning lives in
`BattleSquadStability.tuning.fireControl`; Perception still owns who was actually seen, the Squad Leader owns the
permission, Engagement owns stance/trigger execution, Ballistics owns the crest line, and the Movement Resolver
owns the physical adjustment.

**Stance has one writer: Engagement** (`commitStance`, with `STANCE_HOLD`/`PRONE_HOLD` holds and
`AIM_SETTLE` after a change). With autonomous movement enabled, advance/bound retain their native
stance proposal until the Movement Resolver selects the actual intent. Individuality may supply
a valid stance/gait replacement; otherwise Engagement commits its native fallback, including a
recent-warning crouch, final cover approach or viable suppression crawl. Only the chosen stance
is committed, so arbitration cannot create an intermediate stance change or restart aim twice.
Withdrawal retains Engagement's incoming-fire posture and quiet-gap hold; Individuality does not
replace that survival stance after the drill has committed it.
`stepMovement` only shows the committed stance; another layer (the
reload hook, module 44's drills) asks through `BattleEngagement.requestStance`, which only takes a man
lower, or, as a drill running on Engagement's `afterDrill` slot, commits through `commitStance`
(`stance-ownership-check.js`). A man advancing under fire or while his squad is in contact moves
crouched. **Cover and stance are for fighting from** (`findCover` `evade`, `seeingStance`): `coverCandidates` keeps slots whose shelter lies between slot and threat, so every one hides him; unless under fire a slot must give him a line to the threat standing, and the stance in `engage`, `orient` and `alert` is the lowest that still sees his target or the last known threat. Before this, 83% of bounds ended `engage -> alert: target lost` at the slot (`bound-motion` probe). `soldier.crouching` is derived from `prone`/`tacticalCrouch` in `SquadAI.createSoldier`, not a mirror. **A crawl is for cover he can crawl to** (`bound`, `canCrawlTo`): a suppressed rifleman or gunner crawls only if crawling to the slot fits the bound's own window (a crawl covers `BattleSoldierIndividuality.crawlFactor`, 0.23, of a run, and the window is sized for a run) and he is not already running, else he runs in crouched. The old `d < 14` rule dropped men to ground at 2-3 m/s (the FBX plays a dive clip while the body slides on) for cover that took ~20 s to crawl to in a ~10 s window (`bound overran`); fitting the window alone made it worse (68 to 117 dives: a runner dropped to a crawl as cover neared), so the standing start is part of the rule. `?crawlFit=0` is the old rule. `bound-motion` probe, 12 battles x 600 s: dives 68 to 9, prone spells shorter than the hold 530 to 328, US wins 4 to 6. Not yet in a paired GitHub benchmark (#131's runs 107-110 predate it).
Engagement constants live at the top of `engagement.js` (`BattleEngagement.tuning`), bound timing in
`16-squad-plan-stability.js`; both are deliberately outside the policy genome. Sight and cover are
per stance (`obstacle-field.js`), so going prone genuinely helps.

**Extend through declared slots, never by replacing a function.** `SquadAI` declares `fireGate`,
`shotModel`, `woundModel`, `areaFireGate`, `roundGate`, `afterShot`, `squadCommand`, `beforeSoldier`, `afterSoldier`, `aimedAt`;
`BattleEngagement` declares `afterDrill`. Sidearm switching (module 47) is the `beforeSoldier` extension `sidearm`; the soldier condition (module 17) is `soldier-mind` on `beforeSoldier`, and the `aimedAt` slot's one extension is `soldier-events` (module 08), which posts the shot to the man's event queue. Add the id to the declared order and attach with
`extend(stage, id, fn)`; reassigning `tryFire`/`updateSoldier`/`updateSquad` makes behaviour depend
on module file order (`14-z-ballistic-raycast.js` once silently discarded the LOS gate that way).

**A command hold is a lease.** Commitments that block another layer's intent change live in
`BattleLeases` (`squad-ai.js`, one table per squad: kind, owner, since, until, reason, release, plus
an ended log): `tactical-plan`, `regroup`, `regroup-cooldown`, `regroup-bypass`, `corner-hold`,
`bound`, `bound-cycle`, `succession` (Squad Leader) and `objective-security` (capture zone). `holds()` is `t < until`.
Each owner declares its kinds with `BattleLeases.define(kind, {priority, timer, progress})`: priority
orders live leases (`active()`, `top()`); `timer: true` marks a pure clock that `prune()` ends as
`expired` once its time is up (the Squad Leader prunes each command tick); kinds whose expired record
still means something (`objective-security`, `succession`, `regroup`) are never timers; `progress` is
a read-only "is this hold getting anywhere?" test. The session export lists each squad's live and
recently ended leases and `missionHeldBy`; the AI Graph **Leases** panel (`modules/37-lease-panel.js`, stashed
with the graph) shows them live when the graph is on. Don't add a new `...Until` field for a hold. Deliberately not leases: fireteam order renewal (on the order
record), the garrison request (a standing constraint), and execution timing inside one owner.

**Loadouts and sidearms.** What a man is issued is `SquadAI.LOADOUTS` by role (`loadoutFor(role, faction)`
is the one place a role picks a weapon; `ROLES` carries none): a `primary` kind and an optional `secondary`.
`dealLoadout` builds both through `attachWeapon` (the side's own model and numbers); the sidearm is
holstered (`soldier.secondary`, mesh hidden, its own magazine and reserve from the ammunition module).
`BattleWeapons.equip` swaps `soldier.weapon` (what he shoots; the pose, grip and ranges follow it) and
holsters the other. Machine-gun behaviour (emplacing, setUp accuracy, first suppressor, never bounds,
firing-station range) follows `SquadAI.isMachineGun(s)` (`weapon.kind === 'lmg'`), not the role; slots and
hardpoint eligibility stay role jobs. Module 47 (`BattleSidearm`, tuning `DRAW/CLEAR/NEAR/CLOSE/HOLD/LEAVE`)
draws the sidearm when the primary is out of action inside 20 m, or a long gun is at arm's length (8 m),
and puts it away after 3 s once the target is past 35 m or the pistol is dry. At the standard seeds it
never fires (2026-09-29, `sidearm` probe, seeds 1-4, 12 battles: 0 draws): contacts are at 150 m or more and
no gun runs dry in 600 s. It matters for close fights (buildings, hedges) and future ammunition pressure.

**Window firing port** (`battle-navigation.js`, Engagement's `station`, the Tactical positions manager; `?windowPort=0` is the old
station). A window station is a firing port, not a point in the room. Navigation builds `station.port` once from the opening's own
metadata. The anchor is `.45` m behind the wall plane (the wall is drawn `.32` thick, so its inner face is `.16` back, and a man is
`.25` in radius; the old station was `.775` back). The stance is the lowest that clears the sill by `.25`: a `.92` sill, which is every
generated window, gives `stand`, a `.3` sill `crouch`, and a high sill takes any stance whose eye still clears it by `.12` and stays under
the lintel by `.1`. The exterior sector is what the jambs let through from the anchor: 50.5 degrees each side of a 1.25 m window, where the
old station let through 42 while `select` and the fire gate allowed 71 and 75. An opening no stance fits is never offered: it is listed
in `N.rejectedWindows` with its reason (`sill-too-high`, `lintel-too-low`, `too-short`, `too-narrow`, `bad-opening`; a generated town has
none). `N.aperture(station, from, to, floorY)` follows one 3D line to the wall plane and asks the jambs, the sill and the lintel (`.08`
frame margin). On each station update a man at the anchor with a target in the sector asks it twice, once for the eye and once for the bore
(from a stock point `.5` m behind the ballistics muzzle), and fires only when both pass. When one does not, the pose is corrected inside the
port through `BattleTacticalPositions.adjustPose`: forward to `.30` m behind the plane, then along the sill within `halfWidth - .08 - .25`
(about `.30` m on a 1.25 m window), or to a stance the port lists. The manager keeps the pose (`t.pose`) and the last aperture report
(`t.aperture`) with the task, and the resolver walks to `BattleTacticalPositions.anchor(s)`. The claim, the reservation, the committed
ingress route, the captain exclusion and the release rules are untouched: no target, a target outside the sector, a closed line and a reload
all hold the post, and only the manager releases it. `BattleNavigationPhysicality.windowDiagnostics(sim)` returns one row per window
(assignee, anchor, pose, facing, aperture, stance, eye and bore status with the reason, target, state) and the Window Slots overlay draws
the frame, the facing, the sector and the two rays. `window-port-check.js` holds it.

What the port does not do (2026-10-01):

- **Not measured, not looked at.** It is on by default and has had no paired standard benchmark (`query_off=windowPort=0`, `seeds`, both
  prefixes) and no browser look at the pose or the overlay: the checks are Node only, so what a posted man and the Window Slots rays look
  like on the preview is unseen (the Window Slots button, and `closeup_battle.cjs` with `CLOSEUP_TARGET=id:<n>` on a man the diagnostics show
  holding a window, are the way to look).
- **Sill and lintel are enforced by the station's own fire gate only.** Every other ray through a window (`hasLineOfSight`, `canSuppress`,
  the ballistics wall test, `select`'s claim test, perception) still goes through `lineOfSightBlocked`, which ignores height and opens a window at
  every height. So the sill shields nobody from incoming fire: a round at his legs crosses the opening, and the `.92` sill now gives `stand`
  where the old station was a fixed crouch, a bigger target. Making global LOS height-aware needs the floor height under a building (the
  port's caller passes `battle.heightAt` today) and changes every ray through a window: its own flag and its own paired benchmark.
- **The sector is a fixed cone from the anchor** (`sectorHalf`); a pose shift does not widen it, and a target just past it is held, not engaged.
- **No window animation.** No firing pose, no rifle braced on the sill, no window reload: he uses the stand and crouch clips with the
  rifle through the opening, and the bore line is the ballistics module's semantic muzzle, not the skinned weapon.
- **The numbers are constants, not tuning.** `PORT_INSET`, `FRAME`, `SILL_CLEAR`, `SILL_PREFER`, `HEAD_CLEAR`, `MIN_HEIGHT`, `MIN_WIDTH`,
  `SECTOR_MAX` and the two stance eye heights (repeated from SquadAI and the ballistics module) live in `battle-navigation.js`, and the stock
  offset and the over-shift in Engagement's `portLines`/`portSolve`: no `tuning` object yet and not in `docs/reference/TUNABLES.md`.

**Weapons and wounds.** `BattleWeapons.STATS` holds each kind's numbers and `PROFILES` each side's
weapon for it (Garand/Kar98k, M1919A6/MG42, Thompson/MP40, M1 Carbine/FG42, M1911A1/P38);
`SquadAI.createSoldier` issues it (`weapon.profile`, `magSize`, and `carried` where the load differs
from the kind's). A man opens aimed fire out to `SquadAI.engageRange(s)`: his weapon's range (roles no longer carry one,
except as a cap where the job is not the firefight: the defending engineer's 130 m), so the US scout
stops at the carbine's 250 m and the German scout reaches 450 m with the FG42's rifle cartridge. The
FBX backend draws the model the profile names (`PROFILES.<side>.<kind>.model` + `.fbx`), so what a man
carries and how it shoots cannot disagree. The squad leader keeps his SMG on purpose: he
commands, and his fire is close defence (measured 2026-09-29, `fire-gates`, three standard battles: he
held a target for ~10,000 samples, 98% of them at 150 m or more, `engageRange` stopped him in ~90% of
them, and he fired 0/94/0 rounds against 280-422 for a rifleman; the gate is right, the contacts are far).
A rifle for leaders would be a loadout change (`LOADOUTS`) needing the Garand/Kar98k seat checked on the
captain models in Motion Lab. A selective-fire weapon (`autoWithin`, the FG42: 50 m) bursts only inside
that distance and fires single aimed rounds beyond it. That is the AI's rule: bursts model a gunner's
trigger discipline (the MG 42, M1919A6 and MP 40 had no selector at all). The player's trigger does not
burst: an automatic held fires at `cyclic` until released, and the Thompson M1A1 and FG 42 carry a real
`selector` (`BattleWeapons.fireMode`, see player-mode-feedback.md). `rof` is the aimed rate of a semi-auto or bolt action; an
automatic has `cyclic` (rounds/s), `burst` [min, max], `burstPause` and `burstClimb`. One trigger pull
fires the whole burst on one AI tick (0.15 s, slower than an MG42 cycles); each round goes through
`roundGate`, `shotModel(…, round, delay)` and `afterShot(soldier, battle, muzzleDelay)`, and `onFire(soldier, delay)` / the shot's
`delay` let presentation play it at the cyclic rate (`BattleSim.presentAfter`). Ammunition reserves the reload immediately when empty, but sets `reloadStart` to 500 ms after the final scheduled muzzle discharge and `reloadUntil` to that start plus the full reload duration. No round is available during either the delay or the reload. Animation receives the same delay and full duration; handling stages follow `reloadStart`/`reloadUntil`. What a hit does is the
`woundModel` (`modules/14-wound-model.js`, `BattleWounds`): the ray's hit zone (head, chest, abdomen,
arm, leg; `BattleBallistics.hitZone`), a drop chance per zone scaled by the cartridge's `power`,
bleeding that eases with time, leg wounds slowing (`woundSpeed`, applied in `11-soldier-individuality`)
and arm/torso wounds widening the shot group (`woundSigma`). A round can go through a man
(`14-z-ballistic-raycast.js` over-penetration: chance from the weapon's `penetration`, else full-power
cartridges only, times the zone; it keeps part of its energy, deflects ~7° and flies on) and strike
the next enemy behind him with a wound scaled by `hit.energy`/`hit.power`. The shot reports every
body in `shot.passes` (entry, exit, zone, energy) and where the spent round ended in `shot.final`;
`shot.victim`/`impact`/`zone` stay the first body. Incapacitated and killed both go through
`killSoldier` (`soldier.casualty` says which and where).

**Decals.** Sprite sheets in `Assets/effects/decals/` (`blood.png`, `bullet-holes.png`) are a fixed
4 x 4 grid, one kind per row and four variants per row, generated by `node tools/generate-decal-atlas.js
[--cell 256]`. `15-bullet-impact-fx.js` (`DECAL_SHEETS`) addresses cells by grid position, so a sheet
can be regenerated larger or replaced by a painted one of any resolution that keeps the grid. World
decals (holes, blood on the ground) are thin instances per cell. FBX wound decals choose the nearest
currently skinned body vertex to the ballistic entry/exit point, store that vertex's bind position,
normal and skin weights, and resample only that vertex from the live skeleton each render; the quad
sits 12 mm above the sampled skin normal. A wound event forces that soldier's current pose/world
matrix before the lookup, so a hit between rendered frames cannot fall back because of stale
presentation state. Procedural soldiers retain the bone-parented fallback. Exit wounds are larger,
on the far side, with an exit spray on the ground wherever a round came out.

**Presentation never touches the combat RNG.** Voice, FX and audio must not draw from
`battle.random`; the same seed must simulate the same battle with or without assets
(`voice-determinism-check.js`).

**Formatting:** the M3C behaviour files (command, squad, engagement, movement, weapon rules) are
Prettier-formatted with `.prettierrc.json` (`npx prettier@3 --write <file>`). Don't hand-compress
them back into long single lines. CI enforces this as a ratchet: every `.js` file a pull request
touches must pass `prettier --check`, so files stay on-standard once they are cleaned.

**Frozen:** path clearance, body width and hedgerow X/Z layout, width and gaps. Hedges remain one
authoritative 3D volume for rendering, nav, LOS and ballistics. PR #99 explicitly lifted the old
2.2 m height freeze only: each generated hedge run now has a deterministic visible height of
2.8-4.57 m, with every 3 m render chunk in that run sharing the same height so the coalesced
runtime prism remains identical to what is drawn. Height uses a separate RNG stream and therefore
cannot shift the frozen terrain layout. Change these physical rules only with deterministic
map/navigation regression coverage and a paired benchmark. v128 is the reference for movement feel.

**Watch only**

- By design: Movement Progress ignores retreat (`movementStopReason` is the observable), and
  meeting engagements get no runtime engineer fortification (`engineerTick` exits early).

**C3 effective fire capability.** Engagement's `supportReady(s, battle)` is a read-only
capability query used by the upward `fireSupport` report and the Phase C resource/posture
readers. It requires available stationary, nonreacting actors with an authorized in-range
personal target and real firing line, or an authorized feasible personal suppression job;
it does not manufacture targets or require a round on every cooldown tick. Out-of-range
visual observation alone grants no combat hold. Incoming pressure and cover/pinning still
retain protection authority. `?effectiveFire=0` restores the prior state-only support and
range-hold behavior for paired benchmarks; weapon range settings are unchanged.
