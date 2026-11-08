#!/usr/bin/env python3
"""Delete the branches listed in .github/branch-retirement.txt.

Each line is `<branch> <expected tip sha> <archive|no-archive>`. A branch is
skipped when its tip no longer matches (someone pushed since the list was
made), when it is the default branch or benchmark-results, or when an open PR
uses it. `archive` first creates the tag archive/branch/<branch> at the tip, so
commits that no PR or main keeps stay reachable.
"""
import json
import os
import subprocess
import urllib.parse

repo = os.environ.get("REPO", "APPARANYX/grasstex")
dry = os.environ.get("DRY_RUN", "true").lower() != "false"
listing = os.environ.get("LIST", ".github/branch-retirement.txt")
summary = os.environ.get("GITHUB_STEP_SUMMARY")
NEVER = {"main", "benchmark-results"}


def gh(*args, check=True):
    p = subprocess.run(["gh", "api", *args], capture_output=True, text=True)
    if check and p.returncode != 0:
        raise RuntimeError(f"gh api {' '.join(args)}: {p.stderr.strip()}")
    return p


def write(line):
    print(line)
    if summary:
        with open(summary, "a") as out:
            out.write(line + "\n")


def q(name):
    return urllib.parse.quote(name, safe="/")


open_heads = set()
for page in range(1, 6):
    pulls = json.loads(gh(f"repos/{repo}/pulls?state=open&per_page=100&page={page}").stdout)
    open_heads.update(p["head"]["ref"] for p in pulls)
    if len(pulls) < 100:
        break

write(f"### Retire branches: {'DRY RUN' if dry else 'DELETE'}")
done = skipped = archived = 0
for raw in open(listing):
    line = raw.strip()
    if not line or line.startswith("#"):
        continue
    branch, expected, mode = line.split()
    if branch in NEVER or branch in open_heads:
        write(f"- kept {branch}: protected or open PR")
        skipped += 1
        continue
    ref = gh(f"repos/{repo}/git/ref/heads/{q(branch)}", check=False)
    if ref.returncode != 0:
        skipped += 1
        continue  # already gone
    tip = json.loads(ref.stdout)["object"]["sha"]
    if tip != expected:
        write(f"- kept {branch}: tip moved to {tip[:8]}, expected {expected[:8]}")
        skipped += 1
        continue
    if not dry:
        if mode == "archive":
            tag = f"refs/tags/archive/branch/{branch}"
            made = gh(f"repos/{repo}/git/refs", "-f", f"ref={tag}", "-f", f"sha={tip}", check=False)
            if made.returncode != 0 and "already exists" not in made.stderr:
                write(f"- kept {branch}: archive tag failed: {made.stderr.strip()}")
                skipped += 1
                continue
            archived += 1
        gh("-X", "DELETE", f"repos/{repo}/git/refs/heads/{q(branch)}")
    done += 1
write(f"{'Would delete' if dry else 'Deleted'}: {done}. Archived as tags: {archived}. Skipped: {skipped}.")
