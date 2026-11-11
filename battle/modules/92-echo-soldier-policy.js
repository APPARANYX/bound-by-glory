/* ECHO soldier habits — synchronous micro policy for the scratch provider only.
   Different algorithms from BattleTacticalSoldierPolicy (13k); uses detached facts only. */
(function (root) {
  'use strict';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(typeof location !== 'undefined' ? location.search || '' : '');
  function answer(value, reason) {
    return { value: value, reason: reason };
  }
  function choose(slot, f) {
    switch (slot) {
      case 'posture.fight':
        return answer(
          f.suppressed ? (f.usefulCover ? 'crouch' : 'prone') : f.longRange ? 'crouch' : 'stand',
          'echo-fight-posture'
        );
      case 'posture.see':
        return answer(
          f.visible && f.visible.indexOf(true) >= 0
            ? ['prone', 'crouch', 'stand'][f.visible.indexOf(true)]
            : f.want || 'crouch',
          'echo-see-line'
        );
      case 'posture.march':
        return answer(f.low ? 'crouch' : 'stand', 'echo-march');
      case 'posture.watch':
        return answer(f.inCover ? 'crouch' : 'prone', 'echo-watch');
      case 'posture.commit':
        return answer(f.want || 'crouch', 'echo-commit');
      case 'cover.score':
        return answer(
          (1 - (f.quality || 0)) * 50 - (f.distance || 0) + (f.forward || 0) * 0.5,
          'echo-cover-score'
        );
      case 'cover.take':
        return answer(
          f.suppressed && f.best ? 'best' : f.incumbent ? 'incumbent' : f.best ? 'best' : 'none',
          'echo-cover-pick'
        );
      case 'weapon.reload':
        return answer(!!(f.armed && f.empty && f.reserve && !f.reloading), 'echo-reload');
      case 'fire.personal': {
        var allow = !!(
          f.threat &&
          f.settled &&
          f.stationary &&
          f.facing &&
          f.authorized &&
          !f.reloading &&
          !f.shock
        );
        return answer(allow, allow ? 'echo-aimed' : 'echo-held');
      }
      case 'fire.suppress': {
        var ok = !!(f.point && f.stationary && f.authorized && f.ready && f.facing && !f.busy);
        return answer(ok, ok ? 'echo-area' : 'echo-suppress-blocked');
      }
      case 'stress.break':
        return answer(null, 'echo-no-break');
      case 'stress.react':
        return answer(f.band >= 3 && f.underFire ? 'cower' : null, 'echo-stress');
      case 'drill.fire':
        return answer(f.hasTarget && !f.recognizing ? 'engage' : 'orient', 'echo-drill-fire');
      case 'drill.contact':
        return answer(
          f.underFire ? 'watch' : f.canFire ? 'fire' : f.suppress ? 'suppress' : 'march',
          'echo-drill-contact'
        );
      case 'drill.handoff':
        return answer(!!(f.enabled && f.expired && !f.engaged), 'echo-handoff');
      case 'drill.orient':
        return answer(!!(f.changed && f.fighting), 'echo-orient');
      default:
        throw new Error('Unknown ECHO soldier slot: ' + slot);
    }
  }
  root.BattleEchoSoldierPolicy = { on: ON, choose: choose };
})(typeof window !== 'undefined' ? window : globalThis);
