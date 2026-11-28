#!/usr/bin/env python3
"""Conservative PR change classification and the CI routing it decides.

Every pull-request check reads its run/skip decision from ROUTES below, through the
`changes` job in ci.yml or the reusable .github/workflows/risk-route.yml. Unknown,
mixed or runtime paths always get every check. Only three tiers skip anything:

  docs          no checks (as before)
  housekeeping  Syntax only (housekeeping scripts are not loaded by the game)
  ci-config     Syntax and Sim, but no browser QA, probe or benchmark workflows

Off switch: repository variable CI_RISK_ROUTING=off, or the PR label `ci-full`,
or a manual (workflow_dispatch) or push run all force full validation.
"""
import argparse
import json
from pathlib import PurePosixPath

DOC_FILES = {"AGENTS.md", "README.md", "LICENSE", ".github/PULL_REQUEST_TEMPLATE.md"}
RANK = {"docs": 0, "housekeeping": 1, "ci-config": 1, "audio": 2, "ui": 2, "deployment": 3, "gameplay": 3, "architecture": 4}
# Files that only steer CI itself. Benchmark and probe scripts are NOT here: they decide
# what a benchmark measures, so they stay architecture and keep every check.
CI_CONFIG_FILES = {
    "scripts/classify_ci_risk.py", "scripts/test_classify_ci_risk.py",
    # Sim test selection: the runner, its tests, the read recorder and the recorded map.
    # Any change to these makes the Sim job run every check (run_sim_checks.RUN_ALL_PATHS).
    "scripts/run_sim_checks.py", "scripts/test_run_sim_checks.py",
    "scripts/lib/record-repo-reads.cjs", "tools/ai-sim-harness/sim-deps.json",
    # Docs and Spec Kit artifact checks, run by ci.yml's changes job.
    "scripts/check_agent_docs.py",
}
# Tiers that may be combined without escalating to architecture: tooling that the game
# never loads. Any runtime or unknown path mixed in still escalates.
TOOLING = {"docs", "housekeeping", "ci-config"}

ALL_CHECKS = {"syntax": True, "sim": True, "battle_checks": True}
ROUTES = {
    "docs": {"syntax": False, "sim": False, "battle_checks": False},
    "housekeeping": {"syntax": True, "sim": False, "battle_checks": False},
    "ci-config": {"syntax": True, "sim": True, "battle_checks": False},
}


def classify_path(path):
    if not path or path.startswith("/") or ".." in PurePosixPath(path).parts:
        return "architecture"
    if path in DOC_FILES or path.startswith(("docs/", ".github/ISSUE_TEMPLATE/")) or path.endswith(".md"):
        return "docs"
    if path in CI_CONFIG_FILES or (path.startswith(".github/workflows/") and path.endswith((".yml", ".yaml"))):
        return "ci-config"
    if path in ("package.json", "package-lock.json"):
        return "architecture"
    if path.startswith("scripts/housekeeping") or path.startswith("scripts/test_housekeeping"):
        return "housekeeping"
    if path.startswith("Assets/audio/") or path.startswith("scripts/recipes/") or any(s in path for s in ("audio_tracker", "normalize_audio", "voice_manifest", "weapon_clips")):
        return "audio"
    if path.startswith(("battle/modules/", "tools/ai-sim-harness/", "battle/ai/")):
        return "gameplay"
    if path.startswith(("battle/", "scripts/probes/")):
        return "gameplay"
    if path.startswith(("Assets/", "css/", "ui/")):
        return "ui"
    if path.startswith(("deploy/", "scripts/prepare_incremental_deploy", "scripts/check_deploy", "runtime-contract.php")):
        return "deployment"
    return "architecture"


def classify(paths, elevated=False):
    paths = list(paths)
    kinds = sorted({classify_path(p) for p in paths})
    if not paths or elevated:
        return {"tier": "architecture", "domains": kinds, "full_validation": True, "checks": dict(ALL_CHECKS), "reason": "override or empty diff"}
    tier = max(kinds, key=lambda k: (RANK[k], k == "ci-config"))
    # Mixed unrelated changes must never gain a cheaper classification.
    if len([k for k in kinds if k != "docs"]) > 1:
        # Housekeeping and CI config together are still tooling only: they keep Syntax
        # and Sim. Anything else mixed in is architecture.
        tier = "ci-config" if set(kinds) <= TOOLING else "architecture"
    checks = dict(ROUTES.get(tier, ALL_CHECKS))
    return {"tier": tier, "domains": kinds, "full_validation": tier in ("architecture", "gameplay", "deployment"), "checks": checks, "reason": "conservative path classification"}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--files", help="newline-delimited changed paths; stdin otherwise")
    parser.add_argument("--elevated", action="store_true", help="force every check (off switch)")
    parser.add_argument("--github-output")
    args = parser.parse_args()
    import sys
    with open(args.files, encoding="utf-8") if args.files else sys.stdin as stream:
        result = classify((line.strip() for line in stream if line.strip()), elevated=args.elevated)
    print(json.dumps(result, sort_keys=True))
    if args.github_output:
        with open(args.github_output, "a", encoding="utf-8") as out:
            out.write("risk_tier=" + result["tier"] + "\n")
            out.write("full_validation=" + str(result["full_validation"]).lower() + "\n")
            for name, run in sorted(result["checks"].items()):
                out.write(name + "=" + str(run).lower() + "\n")


if __name__ == "__main__":
    main()
