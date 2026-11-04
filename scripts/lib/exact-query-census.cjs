/* Diagnostic only. An argument/answer observation is never a live-state certificate. */
(function (root) {
  'use strict';
  function create(limit) {
    limit = limit || 4096;
    var ids = new WeakMap(),
      nextId = 1,
      frame = 0,
      depth = 0,
      epoch = 0;
    var seen = new Map(),
      rows = Object.create(null),
      examples = [];
    function ref(value) {
      if (value == null || (typeof value !== 'object' && typeof value !== 'function')) return value;
      if (!ids.has(value)) ids.set(value, nextId++);
      return { reference: ids.get(value) };
    }
    function encode(value, level) {
      var t = typeof value;
      if (value === null) return ['null'];
      if (t === 'number') return ['number', Object.is(value, -0) ? '-0' : String(value)];
      if (t === 'string' || t === 'boolean' || t === 'undefined') return [t, String(value)];
      if (t !== 'object' || level > 5) throw new Error('opaque observation');
      var proto = Object.getPrototypeOf(value);
      if (!Array.isArray(value) && proto !== Object.prototype && proto !== null)
        throw new Error('opaque prototype');
      var keys = Reflect.ownKeys(value);
      if (
        keys.length > 96 ||
        keys.some(function (k) {
          return typeof k !== 'string';
        })
      )
        throw new Error('opaque properties');
      return [
        Array.isArray(value) ? 'array' : 'object',
        keys.sort().map(function (k) {
          var d = Object.getOwnPropertyDescriptor(value, k);
          if (!Object.prototype.hasOwnProperty.call(d, 'value')) throw new Error('accessor observation');
          return [k, encode(d.value, level + 1)];
        })
      ];
    }
    function row(label) {
      return (
        rows[label] ||
        (rows[label] = {
          calls: 0,
          argumentRepeats: 0,
          answerAgreements: 0,
          answerDisagreements: 0,
          throws: 0,
          unknownInputs: 0,
          unknownAnswers: 0,
          droppedKeys: 0,
          unobservedFrameCalls: 0,
          certifiedReuse: 0,
          unknownInputReasons: {}
        })
      );
    }
    function enter(kind, source, receiver, scope, inputs, context, complete, reason) {
      var label = kind + '@' + scope,
        r = row(label);
      r.calls++;
      if (!depth) r.unobservedFrameCalls++;
      if (!complete) {
        r.unknownInputs++;
        reason = reason || 'caller-incomplete';
        r.unknownInputReasons[reason] = (r.unknownInputReasons[reason] || 0) + 1;
        return { label: label };
      }
      try {
        var key = JSON.stringify(
          encode([epoch, depth ? frame : null, kind, scope, ref(source), ref(receiver), inputs, context], 0)
        );
        if (key.length > 8192) throw new Error('oversized key');
        var previous = seen.get(key);
        if (previous) {
          r.argumentRepeats++;
          return { label: label, previous: previous, key: key };
        }
        if (seen.size >= limit) {
          r.droppedKeys++;
          return { label: label };
        }
        var slot = { answer: null };
        seen.set(key, slot);
        return { label: label, first: slot };
      } catch (_) {
        r.unknownInputs++;
        r.unknownInputReasons['unsupported-value'] = (r.unknownInputReasons['unsupported-value'] || 0) + 1;
        return { label: label };
      }
    }
    function leave(token, result, threw) {
      if (!token) return;
      var r = row(token.label);
      if (threw) {
        r.throws++;
        return;
      }
      if (!token.first && !token.previous) return;
      var answer;
      try {
        answer = JSON.stringify(encode(result, 0));
      } catch (_) {
        r.unknownAnswers++;
        return;
      }
      if (token.first) token.first.answer = answer;
      else if (token.previous.answer !== null) {
        if (token.previous.answer === answer) r.answerAgreements++;
        else {
          r.answerDisagreements++;
          if (examples.length < 8)
            examples.push({
              label: token.label,
              input: JSON.parse(token.key),
              first: JSON.parse(token.previous.answer),
              observed: JSON.parse(answer)
            });
        }
      } else r.unknownAnswers++;
    }
    return {
      ref: ref,
      enter: enter,
      leave: leave,
      beginFrame: function () {
        if (!depth++) {
          frame++;
          seen.clear();
        }
      },
      endFrame: function () {
        if (depth) depth--;
      },
      reset: function () {
        epoch++;
        frame = 0;
        depth = 0;
        seen.clear();
        rows = Object.create(null);
        examples = [];
      },
      snapshot: function () {
        return {
          version: 1,
          stateAuthority: 'uncertified',
          certifiedReuse: 0,
          meaning: 'Exact argument/context observations and native answer agreement; not safe cache hits.',
          frame: frame,
          retainedKeys: seen.size,
          keyLimit: limit,
          rows: JSON.parse(JSON.stringify(rows)),
          disagreementExamples: JSON.parse(JSON.stringify(examples))
        };
      }
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = create;
  else root.BattleExactQueryCensus = { create: create };
})(typeof window !== 'undefined' ? window : globalThis);
