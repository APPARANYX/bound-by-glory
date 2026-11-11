#!/usr/bin/env python3
"""Conservative PR change classification. Advisory until workflow gates are audited."""
import argparse
import json
from pathlib import PurePosixPath

DOC_FILES = {"AGENTS.md", "README.md", "LICENSE", ".github/PULL_REQUEST_TEMPLATE.md"}
RANK = {"docs": 0, "housekeeping": 1, "audio": 2, "ui": 2, "deployment": 3, "gameplay": 3, "architecture": 4}

def classify_path(path):
    if not path or path.startswith("/") or ".." in PurePosixPath(path).parts:
        return "architecture"
    if path in DOC_FILES or path.startswith(("docs/", ".github/ISSUE_TEMPLATE/")) or path.endswith(".md"):
        return "docs"
    if path.startswith(".github/workflows/") or path in ("AGENTS.md", "package.json", "package-lock.json"):
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
        return {"tier": "architecture", "domains": kinds, "full_validation": True, "reason": "override or empty diff"}
    tier = max(kinds, key=lambda k: RANK[k])
    # Mixed unrelated changes must never gain a cheaper classification.
    if len([k for k in kinds if k != "docs"]) > 1:
        tier = "architecture"
    return {"tier": tier, "domains": kinds, "full_validation": tier in ("architecture", "gameplay", "deployment"), "reason": "conservative path classification"}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--files", help="newline-delimited changed paths; stdin otherwise")
    parser.add_argument("--elevated", action="store_true")
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

if __name__ == "__main__":
    main()
