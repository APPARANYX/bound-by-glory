# Causal inaction benchmark: firing and movement

Scope: observe the shipping headless browser battle through the existing scripts/run_probe.cjs harness. The probe never issues orders, moves units, settles command reception, recomputes sight lines or draws game RNG.

## Run on a work branch

Start the ordinary local battle server with PHP_CLI_SERVER_WORKERS=4 (see docs/agents/targeted-fire-benchmark.md), then run:

    CAUSAL_SEEDS=20 CAUSAL_CONTROL=1 node scripts/run_causal_inaction_benchmark.cjs

Or use Actions > ⭐ Causal Inaction Benchmark on a branch containing the workflow. PR checks use one paired seed per scenario; manual dispatch defaults to 20 paired seeds per scenario. Scenarios: meeting, us-defend, ge-defend.

To replay an exact known incident seed without renaming it:

    CAUSAL_BATTLES=us-defend:hill-0002 CAUSAL_CONTROL=1 node scripts/run_causal_inaction_benchmark.cjs

To compare the same real battlefield with a candidate behavior OFF and ON, run
the same `CAUSAL_BATTLES` value twice against the candidate source branch:

    CAUSAL_BATTLES=ge-defend:hill-0002 CAUSAL_QUERY=coverPeek=0 CAUSAL_OUT=reports/hedge-off CAUSAL_CONTROL=1 node scripts/run_causal_inaction_benchmark.cjs
    CAUSAL_BATTLES=ge-defend:hill-0002 CAUSAL_QUERY=coverPeek=1 CAUSAL_OUT=reports/hedge-on  CAUSAL_CONTROL=1 node scripts/run_causal_inaction_benchmark.cjs

The workflow's `query` input and the `CAUSAL_QUERY` environment value supply
feature flags; the runner rejects attempts to override the seed, defender or
probe selectors. The fingerprint control checks whether the observer itself
changes each battle, *not* whether OFF and ON arms legitimately diverge.

CAUSAL_BATTLES accepts comma-separated type:seed pairs, overrides generated seed names and validates duplicates. In workflow_dispatch, exact_seed runs the named seed once in each scenario.

Filters: CAUSAL_TYPES, CAUSAL_BATTLES, CAUSAL_SEEDS, CAUSAL_SECONDS, CAUSAL_QUERY, CAUSAL_SIDE (all/us/ge), CAUSAL_ROLE (CSV or all), CAUSAL_IDS, CAUSAL_SQUADS, CAUSAL_PREFIX, CAUSAL_URL, CAUSAL_OUT, CAUSAL_CONTROL (default 1). Corresponding browser selectors: probeSide, probeRole, probeIds, probeSquads.

Files in reports/causal-inaction/: raw.json (per-battle original evidence), summary.json (all reported episodes by seed), summary.md (human-readable aggregate).

## Contract and interpretation

Classification version 3 adds optional native execution tags: Micro update entry,
preparation-held-fire, suppression-held-fire, bound-await-adoption, recognition-held-fire,
firing-path entry, weapon attempt and ammunition-gate refusal. March/watch drills and
station transit, sector rejection and blocked aperture branches are also tagged; this
verifies their execution, not the correctness of their tactical selection. Tags fire only inside
branches the owner already executes. Missing hooks are harmless; observer errors are
caught at the native call site. No extra gate, LOS query, RNG, decision or timer is run.

`executed-nonfiring-decision` is **verified at decision-branch scope only**. The existing
direct-denial/trigger labels retain precedence. The same interval still carries v2 likely
context and all raw events; no single tag verifies continuous silence or proves that the
behavior is correct. `evidence.decisions` keeps owner, actor (episode), target, action key,
mission version, canonical fire envelope, simulation timestamp and bounded event counts.
Coverage counts native update timestamps, timestamps with an executed inhibition,
firing-path entry, weapon attempt, and other update timestamps. Multiple branches can
occur at one timestamp, so these counts are not exclusive and cannot be converted into
seconds or a continuous explained fraction. A weapon attempt is not a native discharge.
Updates with no terminal trace and intervals without update evidence remain unproven.

Per actor, at most 512 recent decision events within 10 simulated seconds are retained;
capacity losses are explicit in decisionEventsOmitted and omittedLifetime. No lifecycle
state is settled while capturing evidence. The vocabulary is fixed to keep counts bounded.
Uninstrumented branches remain unknown rather than being inferred from missing tags.
The return-path extension distinguishes `controller-no-combat-task` from executed
preparation: an adopted HOLD does not establish that a preparation task ran. Withdrawal
records `withdraw-no-close-target` only when the native close-target firing branch is
not taken. Advance records its executed shock hold or targetless march branch.
SquadAI records missing weapons, cooldown, lab vetoes, target invalidation and the
specific fireGate extension that returned false. Extension tags identify the rejecting
owner, not its internal reason; existing ammunition tags and trigger geometry counters
retain that finer evidence. Gates run once, in their original order. Physical rounds
still come from onFire, never from tryFire's boolean (which can be true with zero rounds).
These tags do not establish that a tactical choice was correct or explain untraced time.

Downloaded v3 raw artifacts can be recounted without replaying battles with
`node scripts/probes/summarize_fire_silence_evidence.cjs <raw.json> ...`.
Its rows distinguish episodes, actors and weapon-attempt ticks, and retain the worked
original US-defense interval separately. Record each artifact's runtime/hook SHA alongside
this output; identical filenames do not establish identical sources.

Historical v2 observer-only overlays cannot collect these events without the matching
instrumentation-only native-owner patch; keep runtime, hook and observer provenance.


Classification version 2 keeps preparation and suppression observations across the entire
sampled silent episode, rather than inferring from its end state alone. A HOLD that opens
before reporting can yield `preparation-observed-during-silence`; an active suppression
timer can yield `suppression-observed-during-silence` even outside the pinned FSM state.
These labels are **likely sampled context**, not verified firing denials, proof of continuous
coverage, or tactical-success verdicts. Direct denial and trigger evidence take precedence.
`intervalContext` retains sample counts, bounded order categories and first/last sample times.
A shot or target change starts fresh context. Canonical personally adopted orders are read
without settlement; pre-retreat orders are ignored as in the native fire owner. `clear`
releases fire control and is not independently a restrictive order. Absence of evidence
remains unexplained. Episodes/counts are still retained; classification does not delete
silence or alter gameplay. Compare historical totals only with the same classificationVersion.


- Fire: five consecutive simulated seconds with a personally assigned living target and no actual onFire rounds produces a single episode. Direct Engagement fireAllowed / tryFire rejection branches optionally report exact denial reasons. Real trigger-path LOS, crest and suppressive-terrain rejection counters supply independent shot-attempt evidence. A shot resets the silence clock.
- Movement: a stable order/destination at least 8 m away, under 1.5 m net movement in 12 seconds and a speed under 0.35 m/s produces an episode.
- Cover: the shipping Engagement cover planner reports each real candidate-selection invocation as `normal-cover:selected`, `normal-cover:no-viable-cover`, `normal-cover:incumbent-preferred` or `normal-cover:reservation-failed`. Rejection counters record the actual gates taken: forward-guard, unreachable-memory, leader-anchor-limit, target-too-close, behind-order-line, lower-ranked-slot, no-standing-los, and path-unreachable. A planner invocation may reject multiple different slots; these are not mutually exclusive. The read-only cover observer never recomputes LOS or navigation itself. Selected firing-lane records now also retain the actor's last observed position, minimum observed distance to the goal, movement owner, and whether a death was observed within 0.6 m of the selected goal or farther away. This distinguishes a fatal exposure from an unobserved living arrival; the observation time is not necessarily the exact death timestamp.
- Firing-lane: when a candidate branch supports an end-of-hedge flank search it may also report `firing-lane` selections/rejections through the same read-only hook. The probe separately observes real soldier arrival within 0.6 m of the selected position and subsequent onFire callbacks; this is *not* proof that a fired round hit the old target. A rejected slot is an authoritative decision, but alone does not establish why the entire inaction episode occurred.
 BattleExecutionOutcome.man is the read-only authority for current order adoption, resolver hold, movement execution block, and handoff. Order changes or actual travel reset the clock.
- Verified: an authoritative record (actual Engagement rejection, trigger-path reject, resolver arbitration, Command Reception outcome or Movement Execution blocker) was observed. It proves the named event, not the entire absence of action.
- Likely: a restrictive firing order or stress state was observed but not a corresponding direct denial event. Correlation only.
- Unknown: no sufficient authoritative reason. Do not invent root causes.
- Distinguish a justified hold from a defect. A soldier guarding a prepared post or retreating may correctly decline to obey a formation movement request.

Each episode records actor and squad, interval, reason code, confidence, causal scope, order and resolver evidence, and up to 10 recent one-second samples. At most 160 episodes per battle, 160 recent direct-denial events per actor, 320 cover-decision details per battle, and 12 recent cover decisions per actor are retained; omitted counts are surfaced. Aggregate planner-gate counts remain complete when decision details are truncated.

Every seed is also replayed without the probe by default. A divergent fingerprint, runtime error, missing payload or missing seed invalidates the run. Read-only is a required functional property, not an assumption.

## Boundaries

This first slice traces Engagement fire refusal sites, trigger-path rejection and order/movement execution evidence. It does not instrument every weapon/ammunition branch, suppressive-area fire decision, all movement pathfinder branches, or commander tactical choice. It now records **actual normal-cover selection/rejection gates**; an opt-in hedgerow branch can extend that coverage to firing-lane decisions. A verified refusal does not demonstrate that no other reason was active.

Use Standard Battle Benchmark and the M3C Matrix for aggregate battle outcomes. The Targeted MG42 Fire Benchmark remains useful for per-unit post-step gate samples. This focused forensic tool complements, not replaces, either.
