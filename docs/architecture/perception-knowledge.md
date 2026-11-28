# Perception and knowledge

**Kind:** current implementation contract. **Read when:** changing ranks, perception, beliefs, contact memory or callouts. Index and layer map: [battle architecture](../agents/battle-architecture.md). 

<!-- Moved verbatim from `docs/agents/battle-architecture.md` at d15687b; edit here, not there. -->

**Ranks.** The squad leader is the `sergeant` role (US Staff Sergeant, GE Unteroffizier); the Meso
layer is the Squad Leader (`squad-leader`: `squadCommand` owner and lease owner). "Captain" is only
the company echelon in `00-battle-sides.js`. Names that stay `captain*` on purpose, because stored or
exported data uses them: the policy keys `captainlessCohesion`, `cornerNoCaptainExtra`,
`captainDead` (server genomes, `battle_policy.php`), the telemetry and wake names
`decision-captain-request` and `captain-request`, the export keys `captainAlive`, `captainRequest`,
`captainWindowAssignments` and `captainlessSamples`, the module file and system id
`13-captain-command-throttle`, and the trait seed in `11-soldier-individuality.js` (it still hashes
`captain` so existing seeds replay the same battle).

**Perception** (`squad-ai.js`, `SquadAI.PERCEPTION`). Target stance is a real concealment signature:
standing 1.00, crouched 0.60 and prone 0.35 of the observer's stance-scaled range; movement adds 0.18
(`?stanceVis=0` restores the old 1.00 / 0.72 / 0.45 + 0.22 curve for A/B work). A man spots at his full stance-scaled range
inside ±60° of where he looks, at 35% of it out to ±100° (55% for a moving man), and behind that only
within 10 m; he looks where his body faces, or at the squad's known threat if a ≤70° head turn reaches
it. Holding still with no known threat he scans his sector: his look sweeps `SCAN_SWEEP` (40°) either side
of his body and back every `SCAN_PERIOD` (8 s), each man on his own phase, on sim time and his id, never
the combat RNG. The sweep stays inside the 60° focus, so his front is never out of focus (a 70° sweep
lost the man straight ahead: `run.js` seeds 6 and 23). Tracking a man he already has is not cone-limited. Personal threat beliefs are now the shipping behavior
(`?soldierBeliefs=0` is the legacy shared-contact control). Perception owns `soldier._beliefs`: direct sight creates
an exact `seen` fact; an actually delivered tactical callout can create a `told` fact; personally heard enemy gunfire
can create a lower-confidence, imprecise `heard` fact. Facts carry source/provenance, location/sector, observed/reported/
received time, confidence and expiry; unknown is valid, direct sight outranks weaker information, and stale memory expires
without asking hidden live truth whether it is still correct. `SquadAI.soldierContact(s,battle)` is the consumer view used
by Engagement, combat urgency and tactical routing. A told/heard point never becomes an exact hidden target merely because
the target object still exists.

`squad.contact` remains Perception's aggregate picture **upward** for squad/commander status: its own sightings, else a
friendly squad's first-hand sighting actually delivered through the tactical callout channel (module 09; `?callouts=0`
is the legacy free relay), else enemy gunfire within 120 m. It is not instant common knowledge inside Engagement.
The record lasts `CONTACT_MEMORY` (12 s) from the sighting it carries. A squad the tactical controller owns shortens
that to a third only for a **death one of its own men watched**: Perception marks the record (`contact.seenDownAt`) when
a man loses the target he was tracking because it is down and he still has the sight line to where it fell. A death
nobody in the squad saw (behind cover, inflicted by another squad, or of a man the squad knows only by report) leaves the
record its full term, so the enemy's live `dead` flag never edits what the squad knows; `squadContact` is read by Squad
Leader skills, the controller's contact skill and the General's `reportedContacts`. Callouts carry sightings, not deaths:
a neighbour squad keeps a relayed report until the sighting ages out. `?seenDeath=0` restores the old live-state read;
legacy-owned squads keep it until legacy is retired (`contact-death-provenance-check.js`).

Battle restarts clear Perception-owned gunfire, aggregate contact, belief telemetry and per-man belief stores, and module 09
clears its own pending/by-soldier/by-squad callout delivery state; this matters because simulated time returns to zero and
old evidence would otherwise look fresh/future-dated. The grouped restart regression is guarded by
`benchmark-restart-isolation-check.js` and `callouts-check.js`.

Measured Slice 2 evidence: grouped benchmark #280 (20 paired meeting seeds, five sequential seeds per browser worker,
`contact+120`) reproduced the isolated-worker control after the restart fix: wall-time ratio ON/OFF 0.903 (1.25 gate),
movement-resolver changes 34,951→35,196 (+0.7%), regroups 76→80, acquisitions 5,343→5,337, no runtime errors and no
route/targetless stalls. The earlier large churn was benchmark state leakage, not a beliefs effect.
