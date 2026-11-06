/* Contact skills for the opt-in tactical provider. The controller chooses fire discipline and
   roles; Meso publishes personally adopted orders and Engagement executes native contact primitives.
   No legacy updateFireControl/assignSuppressors/decide call, authoritative write or new clock. */
(function (root) {
  'use strict';
  /* A re-sighting resumes OPEN fire if it comes within two contact memories of the last one: the squad
     forgets the enemy after one (SquadAI.CONTACT_MEMORY), and a second is the time it has to find him
     again before the contact counts as a new engagement. Derived from that constant, not tuned. */
  var RESUME_MEMORIES = 2,
    states = new WeakMap(),
    /* ?contactFireResume=0 restores the old reset: any gap in the squad's contact drops its fire discipline. */
    RESUME = !(
      typeof location !== 'undefined' && /[?&]contactFireResume=0(?:&|#|$)/i.test(location.search || '')
    ),
    /* Grenade policy (see chooseGrenadier). ?controllerGrenade=0 restores the close-assault finisher alone:
       only while the squad's contact is live, only a man standing still, the first eligible in roster order. */
    GRENADE = !(
      typeof location !== 'undefined' && /[?&]controllerGrenade=0(?:&|#|$)/i.test(location.search || '')
    ),
    /* The suppressor scan (update, desired OPEN) asks, every step, whether each free man can put
       rounds into each sector the squad has seen. A man lying still asks the same question again and
       again: the answer is a fire line from his spot (muzzle and eye heights come from the stance
       tried, the range from his weapon) over terrain and static obstacles, so it is kept until he
       moves, changes weapon or the static geometry changes (BattleTacticalContactRoute.geometryEpoch),
       and the sectors are asked nearest first. Same answers, same suppressors.
       ?controllerSuppressorScan=0 asks every sector again every step (the old cost). */
    SUPPRESSOR_SCAN = !(
      typeof location !== 'undefined' &&
      /[?&]controllerSuppressorScan=0(?:&|#|$)/i.test(location.search || '')
    ),
    POSTURE_LIMIT = 200000,
    postures = { epoch: null, men: new WeakMap(), size: 0 };
  /* E.suppressionStance with the answers of a man who has not moved kept (see SUPPRESSOR_SCAN). */
  function suppressionPosture(E, s, sim, rec) {
    if (!E.suppressionStance) return null;
    var R = root.BattleTacticalContactRoute,
      e = R && R.geometryEpoch && R.geometryEpoch(sim),
      w = s.weapon,
      p = s.root && s.root.position;
    /* Not a fire line question (no weapon, pinned, the player's yaw-aimed muzzle): ask it live. */
    if (!e || !w || !p || s.isPlayer || s.dead || s.suppressedUntil > sim.time)
      return E.suppressionStance(s, sim, rec);
    if (postures.epoch !== e || postures.size > POSTURE_LIMIT) {
      postures.epoch = e;
      postures.men = new WeakMap();
      postures.size = 0;
    }
    var spot = postures.men.get(s);
    var range = w.stats && w.stats.range;
    if (
      !spot ||
      spot.x !== p.x ||
      spot.z !== p.z ||
      spot.weapon !== w ||
      spot.kind !== w.kind ||
      spot.range !== range
    )
      postures.men.set(
        s,
        (spot = { x: p.x, z: p.z, weapon: w, kind: w.kind, range: range, lines: new Map() })
      );
    var toX = spot.lines.get(rec.x),
      known = toX ? toX.get(rec.z) : undefined;
    if (known !== undefined) return known;
    known = E.suppressionStance(s, sim, rec) || null;
    if (!toX) spot.lines.set(rec.x, (toX = new Map()));
    toX.set(rec.z, known);
    postures.size++;
    return known;
  }
  function state(ctx) {
    var t = ctx.token,
      key = [t.battleId, t.generation, t.controllerEpoch, t.missionVersion].join(':'),
      st = states.get(ctx.squad);
    if (!st || st.key !== key) {
      st = {
        key: key,
        active: false,
        startedAt: null,
        fire: null,
        men: new Map(),
        roles: new Set(),
        points: new Map(),
        rejected: {},
        grenadeDiagnostic: null
      };
      states.set(ctx.squad, st);
    }
    return st;
  }
  function retreat(sq) {
    return sq.state === 'retreat' || sq.commandPhase === 'retreat';
  }
  function members(sq) {
    return (sq.members || []).filter(function (s) {
      return s && !s.dead && !s.isPlayer;
    });
  }
  function mkm(s) {
    var S = root.BattleSoldierStats;
    return S && S.of ? +S.of(s).mkm || 0 : 0.5;
  }
  function finish(ctx, st) {
    if (st.fire) ctx.finish(st.fire.id, 'contact-ended');
    st.men.forEach(function (a) {
      ctx.finish(a.id, 'contact-ended');
    });
    st.fire = null;
    st.men.clear();
    st.roles.clear();
    st.points.clear();
    st.grenadier = null;
    st.active = false;
    st.startedAt = null;
    st.discipline = null;
  }
  /* Release changed roles before Squad Command asks for route movement on the same tick. */
  function reconcile(ctx, st) {
    var men = members(ctx.squad);
    st.men.forEach(function (a, id) {
      var s = men.find(function (m) {
          return String(m.id) === id;
        }),
        stage = ctx.stage(a.id);
      if (
        !s ||
        !stage ||
        stage.stage === 'cancelled' ||
        a.drill !== drill(s, ctx.sim, st) ||
        a.target !== (s.target && String(s.target.id)) ||
        a.pointKey !== (st.points.has(id) ? JSON.stringify(st.points.get(id)) : null)
      ) {
        ctx.finish(a.id, 'contact-role-changed');
        st.men.delete(id);
      }
    });
  }
  function personal(s, sim) {
    var A = root.SquadAI,
      own = A.soldierContact && A.soldierContact(s, sim);
    return own &&
      own.source === 'seen' &&
      Number.isFinite(+own.at) &&
      sim.time - +own.at <= root.BattleEngagement.tuning.ALERT_HOLD
      ? own
      : null;
  }
  function observation(s, sim, st) {
    if (!st) return root.BattleEngagement.fireControlObservation(s, sim);
    if (st.scanAt !== sim.time) {
      st.scanAt = sim.time;
      st.observations = new Map();
    }
    var prior = st.observations.get(s);
    if (!prior || prior.target !== s.target) {
      prior = { target: s.target, value: root.BattleEngagement.fireControlObservation(s, sim) };
      st.observations.set(s, prior);
    }
    return prior.value;
  }
  /* The squad's own fresh sighting of a threat: first-hand and recent, and no man has since seen him as
     no threat. Never the enemy's live state (SquadAI.hasFirstHandMemory reads it, so it is not used). */
  function ownSighting(sq, c, sim) {
    var A = root.SquadAI,
      at = c && c.unit ? A.firstHandAt(c) : null;
    return at != null && sim.time - at <= A.CONTACT_MEMORY && A.seenThreat(sq, c.unit, sim) !== false;
  }
  /* Fresh eyewitness sectors are lawful suppression intelligence, never
     personal targets. Ignore auditory, relayed and incoming-only beliefs. */
  var SIGHTING_AGE = 8;
  function seenSectors(sq, sim) {
    var A = root.SquadAI,
      /* The reporting eyewitness may be the player-controlled squad leader.
         The PLAYER does not become an AI suppressor, but their actual SEEN
         report remains valid shared intelligence for squadmates. */
      men = (sq.members || []).filter(function (s) {
        return s && !s.dead;
      }),
      reports = A.squadContactsMap && A.squadContactsMap(sq, sim),
      out = [];
    (reports || []).forEach(function (rec) {
      if (
        !rec ||
        rec.source !== 'seen' ||
        !Number.isFinite(rec.x) ||
        !Number.isFinite(rec.z) ||
        !Number.isFinite(rec.at) ||
        rec.at > sim.time ||
        sim.time - rec.at > SIGHTING_AGE ||
        !(rec.confidence >= 0.2) ||
        !men.some(function (man) {
          return String(man.id) === String(rec.sourceSoldier);
        })
      )
        return;
      out.push({ x: rec.x, z: rec.z, at: rec.at, sector: rec.sector });
    });
    var c = A.squadContact && A.squadContact(sq, sim),
      at = c && (c.firstHandAt == null ? c.at : c.firstHandAt);
    if (
      c &&
      ownSighting(sq, c, sim) &&
      !c.heard &&
      !c.relayedFrom &&
      Number.isFinite(c.x) &&
      Number.isFinite(c.z) &&
      Number.isFinite(at) &&
      at <= sim.time &&
      sim.time - at <= SIGHTING_AGE &&
      men.some(function (man) {
        return String(man.id) === String(c.seenBy);
      })
    )
      out.push({ x: c.x, z: c.z, at: at, sector: 'primary' });
    out.sort(function (a, b) {
      return b.at - a.at;
    });
    return out;
  }
  function update(ctx) {
    var st = state(ctx),
      sq = ctx.squad,
      sim = ctx.sim,
      E = root.BattleEngagement,
      Q = root.BattleSquadStability,
      A = root.SquadAI,
      report = ctx.facts || {},
      c = A.squadContact && A.squadContact(sq, sim),
      /* The squad's own eyes only (see ownSighting), never the enemy's live state. */
      threat = ownSighting(sq, c, sim),
      underFire = report.underFire > 0;
    if (retreat(sq)) {
      finish(ctx, st);
      st.reason = 'retreat-owner';
      return;
    }
    if (!threat && !underFire && !sq.inContact) {
      if (st.fire) ctx.finish(st.fire.id, 'contact-clear');
      st.fire = null;
      st.active = false;
      st.startedAt = null;
      st.roles.clear();
      st.points.clear();
      st.grenadier = null;
      /* A man's own fresh sighting outlives the squad's contact by a little (the grenade owner's
         CONTACT_FRESH): legacy reviewed it as a grenade decision, so the policy still does. */
      if (GRENADE) chooseGrenadier(sq, sim, st);
      st.reason = 'contact-clear';
      /* A gap in sightings is not a new engagement: the discipline the squad reached is kept, and a
         re-sighting inside RESUME_MEMORIES of the last sighting resumes OPEN (below) instead of restarting HOLD. */
      st.cleared = true;
      reconcile(ctx, st);
      return;
    }
    st.active = true;
    /* Only OPEN resumes: a HOLD or PRECISION preparation that never finished starts again. */
    if (
      st.cleared &&
      (!RESUME ||
        st.discipline !== 'open' ||
        !(sim.time - st.sightedAt <= RESUME_MEMORIES * A.CONTACT_MEMORY))
    )
      st.discipline = null;
    st.cleared = false;
    if (threat) st.sightedAt = sim.time;
    if (st.startedAt === null) st.startedAt = sim.time;
    var men = members(sq),
      T = Q.tuning.fireControl,
      ready = st.discipline === 'open' ? st.ready || 0 : 0,
      sum = 0,
      shooter = null,
      best = -Infinity;
    /* OPEN stays open until contact reset. Readiness/precision cannot change that permission. */
    if (st.discipline !== 'open') {
      st.readinessAt = sim.time;
      men.forEach(function (s) {
        var o = observation(s, sim, st),
          score =
            mkm(s) +
            (s.role === 'sniper' ? 0.2 : s.role === 'scout' ? 0.12 : s.role === 'rifleman' ? 0.03 : 0);
        if (o.ready) ready++;
        sum += mkm(s);
        if (
          o.ready &&
          !A.isMachineGun(s) &&
          mkm(s) >= T.precisionMarksmanship &&
          (!shooter || score > best || (score === best && String(s.id) < String(shooter.id)))
        ) {
          shooter = s;
          best = score;
        }
      });
    }
    var needed = Math.min(men.length, Math.max(T.minReady, Math.ceil(men.length * T.readyFraction))),
      strength = men.length / Math.max(1, A.establishment(sq)),
      mean = men.length ? sum / men.length : 0,
      origin =
        st.discipline === 'open'
          ? null
          : men.reduce(
              function (p, s) {
                p.x += s.root.position.x;
                p.z += s.root.position.z;
                return p;
              },
              { x: 0, z: 0 }
            ),
      range =
        threat && origin && men.length
          ? Math.hypot(c.x - origin.x / men.length, c.z - origin.z / men.length)
          : Infinity,
      elapsed = sim.time - st.startedAt,
      desired = st.discipline === 'open' ? 'open' : 'hold',
      reason = 'prepare-line';
    if (!Q.fireControlOn() || underFire || !threat || elapsed >= T.maxHold) {
      desired = 'open';
      reason = underFire ? 'return-fire' : elapsed >= T.maxHold ? 'preparation-deadline' : 'no-visual-hold';
    } else if (Q.controllerSuccession && Q.controllerSuccession(sim, sq)) {
      /* Succession (15d): the dead leader's discipline stands until its own deadline or return fire;
         nobody is there to order a new HOLD, name a new marksman or judge the line ready. Without
         an inherited discipline (or with its marksman gone) the men fire on their own. */
      var heir =
        st.discipline === 'precision' &&
        men.find(function (s) {
          return String(s.id) === st.shooterId;
        });
      if (st.discipline === 'hold' || heir) {
        desired = st.discipline;
        shooter = heir || null;
        reason = 'succession-inherited';
      } else {
        desired = 'open';
        reason = st.discipline === 'open' ? 'succession-inherited' : 'succession-no-command';
      }
    } else if (desired !== 'open' && elapsed >= T.prepMin) {
      if (range >= T.longRange && shooter) {
        desired = 'precision';
        reason = 'qualified-marksman';
      } else if (
        ready >= needed &&
        (range <= T.closeRange || (strength >= T.minStrength && mean >= T.minMarksmanship))
      ) {
        desired = 'open';
        reason = 'line-ready';
      }
    }
    /* The covered-maneuver owner cannot obtain authentic supporting fire
       while the contact owner keeps every rifle under a preparation HOLD.
       Publish native OPEN fire permission for a valid covering assignment;
       Engagement still owns actual shooting, target and ballistics. */
    if (Q.controllerBound && Q.controllerBound.current(sq, sim)) {
      desired = 'open';
      reason = 'cover-assignment-needs-live-fire';
    }
    st.discipline = desired;
    st.reason = reason;
    st.ready = ready;
    st.requiredReady = needed;
    st.shooterId = desired === 'precision' ? String(shooter.id) : null;
    /* OPEN is permission, not target assignment. Keep its envelope stable so a changing report
       cannot perpetually supersede the order before personal adoption completes. */
    var params = {
        state: desired,
        targetId: desired !== 'open' && threat ? String(c.unit.id) : null,
        shooterId: st.shooterId
      },
      signature = JSON.stringify(params),
      stage = st.fire && ctx.stage(st.fire.id);
    if (!stage || stage.stage === 'cancelled' || st.fire.signature !== signature) {
      if (st.fire) ctx.finish(st.fire.id, 'fire-control-changed');
      var fire = ctx.request('fire.control', null, params);
      st.fire = fire.ok ? { id: fire.actionId, signature: signature } : null;
      st.rejected.fire = fire.ok ? null : fire.reason;
    }
    var prior = st.roles,
      sectors = desired === 'open' ? seenSectors(sq, sim) : [],
      opportunities = [];
    if (desired === 'open')
      men.forEach(function (s) {
        if (
          E.reacting(s) ||
          s.suppressedUntil > sim.time ||
          !s.weapon ||
          s.reloading ||
          s.outOfAmmo ||
          (s.eng && s.eng.urgentBound)
        )
          return;
        if (s.target && observation(s, sim, st).ready) return;
        var best = null,
          rating = Infinity;
        if (SUPPRESSOR_SCAN) {
          /* Nearest sector first, stopping at the first he can suppress from where he lies: the same
             pick as asking every sector and keeping the nearest (ties keep sector order). */
          var order = sectors
            .map(function (rec, i) {
              return { rec: rec, i: i, d: Math.hypot(rec.x - s.root.position.x, rec.z - s.root.position.z) };
            })
            .filter(function (o) {
              return o.d < Infinity;
            })
            .sort(function (a, b) {
              return a.d - b.d || a.i - b.i;
            });
          for (var oi = 0; oi < order.length; oi++)
            if (suppressionPosture(E, s, sim, order[oi].rec)) {
              best = order[oi].rec;
              rating = order[oi].d;
              break;
            }
        } else
          sectors.forEach(function (rec) {
            var posture = E.suppressionStance && E.suppressionStance(s, sim, rec);
            if (!posture) return;
            var d = Math.hypot(rec.x - s.root.position.x, rec.z - s.root.position.z);
            if (d < rating) {
              best = rec;
              rating = d;
            }
          });
        if (best) opportunities.push({ man: s, point: { x: best.x, z: best.z }, distance: rating });
      });
    opportunities.sort(function (a, b) {
      return (
        +!A.isMachineGun(a.man) - +!A.isMachineGun(b.man) ||
        +!prior.has(String(a.man.id)) - +!prior.has(String(b.man.id)) ||
        a.distance - b.distance ||
        String(a.man.id).localeCompare(String(b.man.id))
      );
    });
    st.points.clear();
    st.roles = new Set(
      opportunities.slice(0, E.tuning.MAX_SUPPRESSORS).map(function (entry) {
        var id = String(entry.man.id);
        st.points.set(id, entry.point);
        return id;
      })
    );
    chooseGrenadier(sq, sim, st);
    reconcile(ctx, st);
  }
  /* One native grenade at a time per squad. This is a controller decision; the grenade owner
     supplies the read-only personal-intel/arc/safety query and revalidates at execution. A
     covered-bound mover finishes his physical hop first; a machine gunner stays the base of fire.
     The policy (on unless ?controllerGrenade=0) carries the legacy reason for a grenade into the
     choice: among the eligible men, the one whose rifle cannot reach his contact throws first,
     then the nearest; a man walking on the march may stop to throw; and a fresh personal
     sighting is still a grenade decision after the squad's contact has cleared. */
  function chooseGrenadier(sq, sim, st) {
    var G = root.BattleGrenades,
      A = root.SquadAI,
      Q = root.BattleSquadStability,
      pendingGrenadier =
        G &&
        members(sq).find(function (s) {
          return G.pendingOf(s, sim);
        });
    st.grenadier = pendingGrenadier ? String(pendingGrenadier.id) : null;
    st.grenadeDiagnostic = {
      at: +sim.time.toFixed(2),
      considered: 0,
      reasons: {},
      selectedId: st.grenadier
    };
    if (
      !G ||
      !G.assaultAssessment ||
      st.grenadier ||
      retreat(sq) ||
      G.projectiles(sim).some(function (g) {
        return g.byRef && g.byRef.squad === sq;
      })
    )
      return;
    var best = null;
    members(sq).some(function (s) {
      if (A.isMachineGun(s)) return false;
      if (Q.controllerBound && Q.controllerBound.role(s, sim) === 'move') {
        st.grenadeDiagnostic.reasons['assigned-covered-mover'] =
          (st.grenadeDiagnostic.reasons['assigned-covered-mover'] || 0) + 1;
        return false;
      }
      var decision = G.assaultAssessment(s, sim, GRENADE);
      st.grenadeDiagnostic.considered++;
      if (!decision.ok) {
        st.grenadeDiagnostic.reasons[decision.reason] =
          (st.grenadeDiagnostic.reasons[decision.reason] || 0) + 1;
        return false;
      }
      if (!GRENADE) {
        best = { man: s };
        return true;
      }
      if (
        !best ||
        +!decision.rifleBlocked - +!best.rifleBlocked < 0 ||
        (decision.rifleBlocked === best.rifleBlocked && decision.distance < best.distance)
      )
        best = { man: s, rifleBlocked: decision.rifleBlocked, distance: decision.distance };
      return false;
    });
    if (best) {
      st.grenadier = String(best.man.id);
      st.grenadeDiagnostic.selectedId = st.grenadier;
      if (GRENADE) st.grenadeDiagnostic.rifleBlocked = best.rifleBlocked;
    }
  }
  /* No shared report becomes a personal target or a permission to shoot. A man without a usable
     line yields locomotion to the march provider; the later covered-bound skill will choose cover. */
  function drill(s, sim, st) {
    var E = root.BattleEngagement;
    if (
      !s ||
      s.dead ||
      s.isPlayer ||
      (root.BattleTacticalPositions && root.BattleTacticalPositions.current(s)) ||
      (retreat(s.squad) &&
        !(
          root.BattleSquadStability.controllerBound && root.BattleSquadStability.controllerBound.role(s, sim)
        )) ||
      E.reacting(s) ||
      (s.eng && s.eng.state === 'bound' && s.eng.urgentBound)
    )
      return null;
    if (s.suppressedUntil > sim.time) return 'pinned';
    if (E.fireControlPreparing(s, sim)) return 'prepare';
    if (
      st &&
      st.grenadier === String(s.id) &&
      root.BattleGrenades &&
      (root.BattleGrenades.pendingOf(s, sim) || root.BattleGrenades.assaultOpportunity(s, sim, GRENADE))
    )
      return 'grenade';
    if (s.target) {
      var o = observation(s, sim, st);
      /* A crouched/prone man may still have a legitimate firing line above
         cover. Let Engagement (the sole stance and shot owner) raise him,
         rather than labelling him MARCH and never giving him that chance. */
      var here = s.root && s.root.position,
        peek =
          o.inRange &&
          here &&
          !(s.suppressedUntil > sim.time) &&
          !s.moving &&
          E.firingLineClear &&
          (E.firingLineClear(s, s.target, here, 'crouch', sim) ||
            E.firingLineClear(s, s.target, here, 'stand', sim));
      if (o.inRange && ((o.visualLine && o.ballisticLine) || peek)) return 'fire';
    }
    if (st && st.roles.has(String(s.id)) && st.points.has(String(s.id))) return 'suppress';
    return E.underFireNow(s, sim) ? 'watch' : 'march';
  }
  function engagement(ctx, override) {
    var st = state(ctx),
      s = ctx.facts,
      id = String(s.id),
      desired = override || drill(s, ctx.sim, st),
      current = st.men.get(id),
      stage = current && ctx.stage(current.id),
      target = s.target && String(s.target.id),
      point = desired === 'suppress' && st.points.get(id),
      pointKey = point ? JSON.stringify(point) : null;
    if (
      current &&
      (!stage ||
        stage.stage === 'cancelled' ||
        current.drill !== desired ||
        current.target !== target ||
        current.pointKey !== pointKey)
    ) {
      ctx.finish(current.id, 'contact-role-changed');
      st.men.delete(id);
      current = null;
    }
    if (!desired || current) return;
    var result = ctx.request(
      desired === 'march' ? 'combat.march' : 'combat.contact',
      id,
      desired === 'march'
        ? {}
        : desired === 'suppress'
          ? { drill: desired, point: point }
          : { drill: desired }
    );
    if (result.ok)
      st.men.set(id, { id: result.actionId, drill: desired, target: target, pointKey: pointKey });
    st.rejected[id] = result.ok ? null : result.reason;
  }
  root.BattleTacticalContactSkills = {
    grenadePolicy: GRENADE,
    release: function (ctx, man) {
      var st = state(ctx);
      st.men.forEach(function (a, id) {
        if (!man || String(man.id) === id) {
          ctx.finish(a.id, 'covered-maneuver-role');
          st.men.delete(id);
        }
      });
    },
    update: update,
    engagement: engagement,
    wants: function (s, sim) {
      var d = drill(s, sim, states.get(s.squad));
      return !!d && d !== 'march';
    },
    summary: function (sq) {
      var st = states.get(sq);
      if (!st) return null;
      return {
        active: st.active,
        state: (st.active && st.discipline) || null,
        startedAt: st.startedAt,
        reason: st.reason,
        ready: st.ready || 0,
        readinessAt: st.readinessAt == null ? null : st.readinessAt,
        requiredReady: st.requiredReady || 0,
        shooterId: st.shooterId || null,
        roles: Array.from(st.men.entries()).map(function (entry) {
          return {
            actorId: entry[0],
            actionId: entry[1].id,
            drill: entry[1].drill,
            reportedPoint: st.points.get(entry[0]) || null
          };
        }),
        rejected: Object.assign({}, st.rejected),
        grenadeDiagnostic: st.grenadeDiagnostic || null
      };
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
