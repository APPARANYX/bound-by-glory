/* Read only the state left by the normal benchmark step. The detector takes
   its sample inside the commander tick; retain that sample separately. */
(function (root) {
  const point = value => (value ? { x: value.x, z: value.z } : null);
  function snapshot(sim, squadId) {
    const squads = [...(sim.factions.us.squads || []), ...(sim.factions.ge.squads || [])];
    const squad = squads.find(sq => sq.id === squadId);
    if (!squad) return { at: sim.time, missingSquad: true };
    const samples = sim._aiLoopWatch?.squads?.[squad.faction + ':' + squad.id];
    const sample = samples?.[samples.length - 1];
    return {
      at: sim.time,
      faction: squad.faction,
      phase: squad.commandPhase,
      objective: squad.targetObjective,
      missionHold: squad._missionHold,
      contact: !!squad.inContact,
      detector: sample && { at: sample.time, order: point(sample.order), center: point(sample.pos) },
      members: squad.members.map(s => {
        const resolver = s._movementResolver;
        const order = resolver?.order;
        const history = resolver?.history || [];
        return {
          id: s.id,
          dead: !!s.dead,
          body: point(s.root?.position),
          fireteam: point(s._fireteamDestination),
          order: point(s.orderDestination),
          contributor:
            s.dead || !s.root
              ? null
              : s._fireteamDestination
                ? 'fireteam'
                : s.orderDestination
                  ? 'order'
                  : null,
          owner: order?.owner ?? null,
          signature: order?.signature ?? null,
          issuedAt: order?.issuedAt ?? null,
          physical: point(s.destination),
          winner: resolver?.last?.owner ?? null,
          reason: resolver?.last?.reason ?? null,
          changes: resolver?.changes ?? null,
          writes: history
            .filter(entry => entry.time === sim.time)
            .map(entry => ({
              from: point(entry.oldDestination),
              to: point(entry.newDestination),
              owner: entry.source,
              reason: entry.reason,
              oldGoalValid: entry.oldGoalValid
            }))
        };
      })
    };
  }
  root.benchmarkOwnerSnapshot = snapshot;
})(typeof window === 'undefined' ? module.exports : window);
