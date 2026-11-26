#!/usr/bin/env python3
"""The Sim regressions suite, with test selection and parallel runs.

Every check runs under scripts/lib/record-repo-reads.cjs, which records the repository
files it reads. tools/ai-sim-harness/sim-deps.json keeps that map. On a pull request
only the checks that read a changed file (or are themselves changed, or are new, or
are in CORE) run; any change to the suite's own machinery runs everything. After the
run, any check that read a file its map entry does not list fails the job, so a stale
map is caught the first time it matters (refresh: run_sim_checks.py --all --write-map).

  run_sim_checks.py --all [--write-map]           every check (main, manual, ci-full)
  run_sim_checks.py --changed FILE                 checks the listed paths can affect
  run_sim_checks.py --changed FILE --dry-run       print the selection only
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
HARNESS = "tools/ai-sim-harness"
MAP_PATH = HARNESS + "/sim-deps.json"
RECORDER = "scripts/lib/record-repo-reads.cjs"

# Standalone regressions outside the harness glob (were listed inline in ci.yml).
STANDALONE = [
    "scripts/run_command_lifecycle_audit.cjs",
    "scripts/check-meso-formation-frame-stability.cjs",
    "scripts/check-macro-mission-command.cjs",
    "scripts/check-movement-order-ownership.cjs",
    "scripts/check-meso-micro-movement-ownership.cjs",
    "scripts/check-physical-waypoint-refill.cjs",
    "scripts/check-purposeful-contact-gait.cjs",
    "scripts/check-autonomous-contact-mobility.cjs",
    "scripts/check-building-interior-ingress.cjs",
    "scripts/check-strategic-5km.cjs",
    "scripts/check-strategic-front-lines.cjs",
    "scripts/check-strategic-reinforcements.cjs",
    "scripts/check_vehicle_lab.cjs",
    "scripts/check-strategic-truck-visual.cjs",
    "scripts/check-strategic-truck-lite.cjs",
    "scripts/check-strategic-restart-end.cjs",
    "scripts/check-audio-scheduler-queue.cjs",
    "scripts/check-audio-lab-contract.cjs",
    "scripts/check-benchmark-early-stop.cjs",
]
ENGAGEMENT_SEEDS = ["12345", "1", "2", "3", "5", "8", "13", "21"]
# Always run, whatever changed: the end-to-end command chain and the engagement seeds.
CORE = {"scripts/run_command_lifecycle_audit.cjs"} | {"engagement-seed-" + s for s in ENGAGEMENT_SEEDS}
# A change to any of these runs the whole suite: the suite's own machinery.
RUN_ALL_PATHS = {
    "scripts/run_sim_checks.py", "scripts/test_run_sim_checks.py", RECORDER, MAP_PATH,
    ".github/workflows/ci.yml", "package.json", "package-lock.json",
}


def discover(repo=REPO):
    """Every check as {id: (command, env)}; ids are repo paths (or engagement-seed-N)."""
    checks = {}
    for path in sorted((repo / HARNESS).glob("*-check.js")):
        rel = path.relative_to(repo).as_posix()
        checks[rel] = (["node", rel], {})
    for rel in STANDALONE:
        checks[rel] = (["node", rel], {})
    for seed in ENGAGEMENT_SEEDS:
        checks["engagement-seed-" + seed] = (["node", HARNESS + "/run.js"], {"HARNESS_SEED": seed})
    return checks


def own_file(check_id):
    return HARNESS + "/run.js" if check_id.startswith("engagement-seed-") else check_id


def select(check_ids, changed, dep_map):
    """Return (ids to run, reason). Unknown or unmapped always runs; nothing is skipped by guess."""
    changed = {p for p in changed if p}
    if not changed:
        return sorted(check_ids), "empty diff: every check"
    hits = sorted(changed & RUN_ALL_PATHS)
    if hits:
        return sorted(check_ids), "suite machinery changed (" + ", ".join(hits) + "): every check"
    chosen = set()
    for cid in check_ids:
        deps = dep_map.get(cid)
        if deps is None or cid in CORE or own_file(cid) in changed or changed.intersection(deps):
            chosen.add(cid)
        elif any(c.startswith(d.rstrip("/") + "/") for d in deps for c in changed):
            chosen.add(cid)  # the check lists or reads a directory the change is inside
    return sorted(chosen), "selected by recorded reads"


def run_one(cid, spec, deps_dir):
    cmd, extra = spec
    out_dir = Path(deps_dir) / cid.replace("/", "__")
    env = dict(os.environ, **extra)
    env["SIM_DEPS_OUT"] = str(out_dir)
    env["NODE_OPTIONS"] = (env.get("NODE_OPTIONS", "") + " --require " + str(REPO / RECORDER)).strip()
    start = time.monotonic()
    proc = subprocess.run(cmd, cwd=REPO, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    reads = set()
    for f in out_dir.glob("*.json") if out_dir.exists() else []:
        reads.update(json.loads(f.read_text()))
    if cid.startswith("engagement-seed-"):
        output = ""  # the seeds' stdout is a long report; keep the log readable
    else:
        output = proc.stdout
    return cid, proc.returncode, time.monotonic() - start, reads, output if proc.returncode else output[-2000:]


def main(argv=None):
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--all", action="store_true")
    g.add_argument("--changed", help="newline-delimited changed paths")
    ap.add_argument("--write-map", action="store_true", help="rewrite the reads map from this run (with --all)")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--jobs", type=int, default=os.cpu_count() or 2)
    ap.add_argument("--summary", help="append a markdown summary here (GITHUB_STEP_SUMMARY)")
    args = ap.parse_args(argv)

    checks = discover()
    map_file = REPO / MAP_PATH
    dep_map = json.loads(map_file.read_text()) if map_file.exists() else {}
    if args.all:
        ids, reason = sorted(checks), "full run: every check"
    else:
        changed = [l.strip() for l in Path(args.changed).read_text().splitlines()]
        ids, reason = select(checks, changed, dep_map)
    print(f"Sim regressions: {len(ids)} of {len(checks)} checks ({reason}).")
    if args.dry_run:
        print("\n".join(ids))
        return 0

    failures, drift, results = [], {}, {}
    t0 = time.monotonic()
    with tempfile.TemporaryDirectory() as deps_dir, ThreadPoolExecutor(max_workers=args.jobs) as pool:
        for cid, rc, secs, reads, output in pool.map(lambda c: run_one(c, checks[c], deps_dir), ids):
            results[cid] = sorted(reads)
            status = "ok" if rc == 0 else f"FAILED (exit {rc})"
            print(f"--- {cid}: {status} in {secs:.1f}s")
            if rc:
                failures.append(cid)
                print(output)
            known = set(dep_map.get(cid, [])) | {own_file(cid)}
            extra = sorted(set(reads) - known)
            if extra and cid in dep_map:
                drift[cid] = extra
    wall = time.monotonic() - t0
    print(f"Ran {len(ids)} checks in {wall:.0f}s wall with {args.jobs} workers.")

    if args.write_map:
        if not args.all:
            print("--write-map needs --all", file=sys.stderr)
            return 2
        new_map = {cid: [r for r in reads if r != own_file(cid)] for cid, reads in sorted(results.items())}
        map_file.write_text(json.dumps(new_map, indent=1, sort_keys=True) + "\n")
        print(f"Wrote {MAP_PATH} for {len(new_map)} checks.")
        drift = {}
    if args.summary:
        with open(args.summary, "a", encoding="utf-8") as s:
            s.write(f"### Sim regressions\n- {len(ids)} of {len(checks)} checks ({reason}), {wall:.0f}s wall\n")
            if failures:
                s.write("- failed: " + ", ".join(failures) + "\n")
    for cid, extra in drift.items():
        print(f"::error::{cid} read files its {MAP_PATH} entry does not list: {', '.join(extra)}. "
              "Refresh the map: python3 scripts/run_sim_checks.py --all --write-map")
    return 1 if failures or drift else 0


if __name__ == "__main__":
    sys.exit(main())
