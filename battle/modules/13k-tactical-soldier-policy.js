/* Micro U0–U4. Pure soldier choices from detached owner facts. No actor, battle, enemy,
   RNG, clocks, leases or effectors enter choose(). Engagement, ammunition and the resolver
   retain execution and revalidation. Slots use the existing soldier/weapon tick; off flags
   restore the pre-U controller paths. Selection receipts are not physical success receipts. */
(function (root) {
  'use strict';
  var search = typeof location !== 'undefined' ? location.search || '' : '',
    flags = {
      posture: !/[?&]controllerStance=0(?:&|#|$)/i.test(search),
      cover: !/[?&]controllerStance=0(?:&|#|$)/i.test(search),
      fire: !/[?&]controllerSoldierFire=0(?:&|#|$)/i.test(search),
      weapon: !/[?&]controllerSoldierFire=0(?:&|#|$)/i.test(search),
      stress: !/[?&]controllerReactions=0(?:&|#|$)/i.test(search),
      drill: !/[?&]controllerDrill=0(?:&|#|$)/i.test(search)
    };
  function enabled(s, sim, slot) {
    var T = root.BattleTacticalController;
    return !!(
      flags[slot.split('.')[0]] &&
      T &&
      T.selectSoldier &&
      s &&
      s.squad &&
      !s.dead &&
      !s.isPlayer &&
      T.soldierPolicyAvailable &&
      T.soldierPolicyAvailable(sim, s)
    );
  }
  function select(s, sim, slot, facts) {
    return root.BattleTacticalController.selectSoldier(sim, s, slot, facts);
  }
  function answer(value, reason) {
    return { value: value, reason: reason };
  }
  function choose(slot, f) {
    switch (slot) {
      case 'posture.fight':
        return answer(
          !f.proneRole
            ? 'crouch'
            : f.coverStance && f.usefulCover
              ? f.suppressed && !f.crouchCovered
                ? 'prone'
                : 'crouch'
              : f.suppressed || f.longRange || !f.usefulCover
                ? 'prone'
                : 'crouch',
          'fighting-posture'
        );
      case 'posture.see':
        return answer(
          f.visible.indexOf(true) < 0 ? f.want : ['prone', 'crouch', 'stand'][f.visible.indexOf(true)],
          'lowest-physical-line'
        );
      case 'posture.march':
        return answer(f.arrivedProne && f.low ? 'keep' : f.low ? 'crouch' : 'stand', 'march-posture');
      case 'posture.watch':
        return answer(
          !f.clearing && f.coverStance && f.proneRole && !f.inCover ? 'prone' : 'crouch',
          'sector-watch-posture'
        );
      case 'posture.commit': {
        var stance = f.want;
        if (f.reloadHold && f.reloading && stance === 'stand' && !f.possession)
          stance = f.current === 'prone' || f.current === 'crawl' ? f.current : 'crouch';
        return answer(stance, stance !== f.want ? 'reload' : 'requested-posture');
      }
      case 'cover.score':
        return answer((1 - f.quality) * 40 - f.distance + f.forward * 0.9, 'native-cover-score');
      case 'cover.take':
        return answer(
          f.incumbent && f.bestScore < f.incumbentScore + 4 ? 'incumbent' : f.best ? 'best' : 'none',
          'eligible-cover-choice'
        );
      case 'weapon.reload':
        return answer(
          f.armed && !f.fled && !f.reloading && !f.clearing && f.empty && f.reserve,
          'empty-magazine'
        );
      case 'fire.personal': {
        var denial = !f.threat
          ? 'no-threat'
          : f.reloading
            ? 'reloading'
            : !f.settled
              ? 'aim-settling'
              : !f.stationary
                ? 'movement'
                : !f.facing
                  ? 'facing'
                  : !f.setup
                    ? 'mg-not-setup'
                    : !f.authorized
                      ? 'fire-not-authorized'
                      : f.shock
                        ? 'shock'
                        : null;
        return answer(!denial, denial || 'personal-fire-permitted');
      }
      case 'fire.suppress': {
        var blocked = !f.point || f.busy || !f.stationary || !f.authorized || !f.ready || !f.facing;
        return answer(!blocked, blocked ? 'suppression-gate' : 'reported-sector-permitted');
      }
      case 'stress.break': {
        var best = null,
          weight = 0;
        ['flee', 'freeze', 'rage'].forEach(function (key, i) {
          if (f.weights[i] > weight) {
            best = key;
            weight = f.weights[i];
          }
        });
        return answer(best, 'temper-and-situation');
      }
      case 'stress.react': {
        var want = f.current;
        if (f.current === 'freeze') {
          if (f.freezeExpired)
            want =
              f.band >= 3
                ? f.choice || (f.underFire && f.cower ? 'cower' : null)
                : f.band >= 2 && f.underFire && f.cower
                  ? 'cower'
                  : null;
        } else if (f.band >= 3) {
          if (!f.current || f.current === 'cower')
            want = f.choice || (f.current === 'cower' ? 'cower' : null);
        } else if (f.current === 'cower') {
          if (f.band < 2 || f.quiet) want = null;
        } else if (f.current) {
          if (!f.trance && f.minimumElapsed) want = null;
        } else if (f.band >= 2 && f.underFire && f.cower) want = 'cower';
        return answer(want, 'stress-facts');
      }
      case 'drill.fire':
        return answer(
          !f.hasTarget
            ? 'lost'
            : !f.recognizing && !f.engaging
              ? 'recognize'
              : f.recognizing && !f.expired
                ? 'orient'
                : 'engage',
          'personal-recognition-clock'
        );
      case 'drill.contact':
        return answer(
          f.blocked
            ? null
            : f.pinned
              ? 'pinned'
              : f.prepare
                ? 'prepare'
                : f.grenade
                  ? 'grenade'
                  : f.canFire
                    ? 'fire'
                    : f.suppress
                      ? 'suppress'
                      : f.underFire
                        ? 'watch'
                        : 'march',
          'personal-contact-drill'
        );
      case 'drill.handoff':
        return answer(
          f.enabled && !f.engaged && !f.committed && f.alert && f.expired,
          'quiet-combat-handback'
        );
      case 'drill.orient':
        return answer(f.changed && f.fighting, 'new-personal-threat-sector');
      default:
        throw new Error('Unknown soldier policy slot: ' + slot);
    }
  }
  root.BattleTacticalSoldierPolicy = { enabled: enabled, select: select, choose: choose };
})(typeof window !== 'undefined' ? window : globalThis);
