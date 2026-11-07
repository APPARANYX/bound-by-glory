/* Reinforcement trial for the 5 km front-lines layout (?frontLines=1 with ?reinforcements=1).
   One owner: when a fresh squad enters the battle and where. Nothing here moves a soldier or
   writes an order.
   - Pool: one fresh squad per base of the side (spawnZones bases).
   - Trigger: the side's losses. Each time its dead reach another full squad's worth
     (SquadAI.COMPOSITION) beyond the squads already sent, one fresh squad is due. No clock: the
     check rides the General's existing tick (onCommanderTick).
   - Place: a held objective of the rearmost line the side holds any of (normally a base, read
     from BattleFrontLines.rearmostHeld), rotating; never one with a live enemy soldier inside its
     capture radius (the true position, not the side's belief, as docs/plans/
     reinforcement-forward-spawns.md invariant 8 asks). With none clear the squad stays due.
   The fresh squad is an ordinary one: the infantry-squad unit module builds it, the General
   briefs it like any squad without a mission, and it takes a truck only if one is parked or
   stopped nearby. Off (no flag, or no front lines): inert.
   Classic defend battles (one town, a defender and an attacker) use the same owner and the same
   loss trigger, with ?defendReinforcements=0 to turn it off:
   - Pool: the defender gets one fresh squad per sector it prepared (its held sectors); the attacker
     one fewer, so the defenders get more.
   - Place: the side's own spawn edge, behind the fight, rotating across its lanes so squads enter
     spread apart; never a lane with a live enemy soldier within half the lane spacing. */
(function (root) {
  'use strict';
  if (!root.BattleModules || root.BattleStrategicReinforcements) return;

  function flagOn() {
    return root.BattleStrategicConfig.flag('reinforcements');
  }
  var DEFEND_REINFORCEMENTS = !/[?&]defendReinforcements=0(?:&|#|$)/i.test(
    (root.location && root.location.search) || ''
  );
  function scenarioOf(sim) {
    return (sim && sim.scene && sim.scene.metadata && sim.scene.metadata.battleScenario) || null;
  }
  function layout(sim) {
    var town = scenarioOf(sim);
    return town && town.profile === 'strategic' && town.frontLines ? town : null;
  }
  /* A classic (single town) defend battle: the town, else null. */
  function classicDefend(sim) {
    var town = scenarioOf(sim),
      sides = sim && sim._sides;
    return DEFEND_REINFORCEMENTS &&
      town &&
      town.profile !== 'strategic' &&
      sides &&
      !sides.meeting &&
      sides.defender
      ? town
      : null;
  }
  function active(sim) {
    if (!root.SquadAI) return false;
    return !!((flagOn() && layout(sim) && root.BattleFrontLines) || classicDefend(sim));
  }
  /* Opt-in ?reinforcementSortie=1 (the owner chose to keep the trial as first built, 10-18): a
     fresh squad earns its General a sortie. Without it the squad is briefed at once. */
  function sortieOn() {
    return root.BattleStrategicConfig.flag('reinforcementSortie');
  }
  /* Fresh squads this side has received, as the aerial-recon owner counts them for a new
     sortie (59-strategic-aerial-recon.js frontKey); 0 when the trial or the sortie is off. */
  function sortiesEarned(sim, faction) {
    return active(sim) && layout(sim) && sortieOn() && sim._reinforcements && sim._reinforcements[faction]
      ? sim._reinforcements[faction].sent.length
      : 0;
  }
  /* A fresh squad waits for the sortie its arrival earned before its first brief, so the
     report can send it to an ambush post; only while that sortie is in the air, so a sortie
     that never launches holds nobody. */
  function awaitingReport(sim, sq) {
    var recon = root.BattleAerialRecon,
      status = recon && recon.status ? recon.status(sim, sq.faction) : null;
    return !!(
      sq &&
      sq._reinforcement &&
      !sq._macroMission &&
      sortieOn() &&
      active(sim) &&
      layout(sim) &&
      status &&
      status.inFlight
    );
  }
  function telemetry(sim, kind, data) {
    if (root.BattleTelemetry && root.BattleTelemetry.record) root.BattleTelemetry.record(kind, data, sim);
  }
  function state(sim) {
    if (!sim._reinforcements) sim._reinforcements = { us: side(), ge: side() };
    return sim._reinforcements;
  }
  function side() {
    return { sent: [], blockedSince: null };
  }
  function pool(sim, town, faction) {
    if (!layout(sim)) {
      var sides = sim._sides,
        held = Math.max(1, (sides.heldSectors && sides.heldSectors.length) || 0);
      return faction === sides.defender ? held : held - 1;
    }
    var zone = town.spawnZones && town.spawnZones[faction];
    return (zone && zone.bases && zone.bases.length) || 0;
  }
  function dead(sim, faction) {
    return ((sim._roster && sim._roster[faction]) || []).filter(function (s) {
      return s && s.dead;
    }).length;
  }
  function enemyInside(sim, faction, o) {
    var enemy = faction === 'us' ? 'ge' : 'us',
      radius = +o.radius || 0;
    return ((sim._roster && sim._roster[enemy]) || []).some(function (s) {
      return (
        s &&
        !s.dead &&
        s.root &&
        s.root.position &&
        Math.hypot(s.root.position.x - o.x, s.root.position.z - o.z) <= radius
      );
    });
  }
  /* Classic: a lane of the side's spawn edge, rotating from the wave, clear of enemies. */
  function laneEntry(sim, town, faction, wave) {
    var zone = town.spawnZones && town.spawnZones[faction],
      lanes = (zone && zone.lanes) || [];
    if (!lanes.length) return null;
    var spacing = lanes.length > 1 ? Math.abs(lanes[1] - lanes[0]) : 100;
    for (var i = 0; i < lanes.length; i++) {
      var li = (wave + i) % lanes.length,
        o = { id: faction + '-lane-' + li, x: lanes[li], z: zone.z, radius: spacing / 2 };
      if (!enemyInside(sim, faction, o)) return o;
    }
    return null;
  }
  function entry(sim, faction, wave) {
    if (!layout(sim)) return laneEntry(sim, scenarioOf(sim), faction, wave);
    var held = root.BattleFrontLines.rearmostHeld(sim, faction).filter(function (o) {
      return !enemyInside(sim, faction, o);
    });
    return held.length ? held[wave % held.length] : null;
  }
  function baseFor(town, faction, objectiveId) {
    var zone = town.spawnZones && town.spawnZones[faction];
    return (
      ((zone && zone.bases) || []).find(function (b) {
        return b.objectiveId === objectiveId;
      }) || null
    );
  }
  function reinforce(sim, faction) {
    var town = layout(sim) || classicDefend(sim),
      own = state(sim)[faction],
      wave = own.sent.length,
      size = root.SquadAI.COMPOSITION.length,
      losses = dead(sim, faction);
    if (wave >= pool(sim, town, faction) || losses < (wave + 1) * size) return null;
    var o = entry(sim, faction, wave);
    if (!o) {
      if (own.blockedSince == null) {
        own.blockedSince = +sim.time || 0;
        telemetry(sim, 'strategic-reinforcement-blocked', {
          faction: faction,
          wave: wave + 1,
          losses: losses
        });
      }
      return null;
    }
    // Clear of the assembly pads the opening squads used (battle-sim.js spawnSide, +/-28 m).
    var x = layout(sim) ? +o.x + (wave % 2 ? 14 : -14) : +o.x,
      result = root.BattleModules.spawnUnitType('infantry-squad', sim, faction, { x: x, z: +o.z }),
      sq = result && result.squad,
      base = baseFor(town, faction, o.id);
    if (!sq) return null;
    sq.homeBaseObjectiveId = o.id;
    if (base) sq.homeBaseId = base.id;
    sq._reinforcement = { wave: wave + 1, objectiveId: o.id, at: +sim.time || 0 };
    own.sent.push({
      wave: wave + 1,
      squad: sq.id,
      objectiveId: o.id,
      at: +sim.time || 0,
      losses: losses,
      waitedSeconds: own.blockedSince == null ? 0 : (+sim.time || 0) - own.blockedSince
    });
    own.blockedSince = null;
    // The arrival earns its General a sortie (59 frontKey); ask for it now, before any brief.
    if (layout(sim) && sortieOn() && root.BattleAerialRecon && root.BattleAerialRecon.request)
      root.BattleAerialRecon.request(sim, faction);
    telemetry(sim, 'strategic-reinforcement', {
      faction: faction,
      wave: wave + 1,
      squad: sq.id,
      objectiveId: o.id,
      men: result.count,
      losses: losses
    });
    return sq;
  }
  function tick(sim) {
    if (!active(sim) || sim.winner) return;
    ['us', 'ge'].forEach(function (f) {
      reinforce(sim, f);
    });
  }
  function summary(sim) {
    if (!active(sim)) return null;
    var town = layout(sim) || classicDefend(sim),
      st = state(sim);
    return ['us', 'ge'].reduce(function (out, f) {
      out[f] = {
        pool: pool(sim, town, f),
        losses: dead(sim, f),
        sent: st[f].sent.slice(),
        blocked: st[f].blockedSince != null
      };
      return out;
    }, {});
  }

  root.BattleModules.registerSystem('strategic-reinforcements', {
    version: '1-reinforcement-trial',
    onBattleStart: function (sim) {
      sim._reinforcements = null;
    },
    onBattleRestart: function (sim) {
      sim._reinforcements = null;
    },
    onCommanderTick: tick
  });
  root.BattleStrategicReinforcements = {
    active: active,
    summary: summary,
    reinforce: reinforce,
    sortiesEarned: sortiesEarned,
    awaitingReport: awaitingReport
  };
})(typeof window !== 'undefined' ? window : globalThis);
