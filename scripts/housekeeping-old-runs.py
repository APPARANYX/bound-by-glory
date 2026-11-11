#!/usr/bin/env python3
"""Delete completed Actions runs older than KEEP_DAYS (default 7).

Deleting a run also deletes its logs and artifacts. Ivan's call (2026-11-08):
benchmark and QA results are read as soon as they finish, so nothing older than
a week is kept. Runs that are queued or still running are never touched, and
neither is any run on the head branch or head commit of an open pull request,
or on any branch that still exists other than the default branch (main runs
the benchmark dispatches and scheduled jobs, which are what this clears).

The GITHUB_TOKEN allows about 1000 API requests an hour per repository, shared
with every other workflow, so each pass deletes at most MAX_DELETE runs and
stops early when the remaining budget drops below RATE_FLOOR. The hourly
schedule in actions-run-retention.yml drains any backlog over several passes.
"""
import datetime as dt
import json
import os
import subprocess
import time

repo = os.environ.get("REPO", "APPARANYX/grasstex")
dry = os.environ.get("DRY_RUN", "true").lower() != "false"
keep_days = int(os.environ.get("KEEP_DAYS", "7"))
limit = int(os.environ.get("MAX_DELETE", "500"))
rate_floor = int(os.environ.get("RATE_FLOOR", "150"))
summary = os.environ.get("GITHUB_STEP_SUMMARY")

if keep_days < 1:
    raise SystemExit("KEEP_DAYS must be at least 1")


def gh(args, allow_404=False):
    for attempt in range(3):
        p = subprocess.run(["gh", "api", *args], capture_output=True, text=True)
        if p.returncode == 0:
            return json.loads(p.stdout) if p.stdout.strip() else None
        if allow_404 and "404" in p.stderr:
            # The run is already gone (concurrent pass, one-off cleanup, or
            # manual delete). A 404 will never succeed on retry, and the
            # missing run must not abort the pass.
            return "gone"
        if attempt == 2:
            raise RuntimeError(f"gh api {' '.join(args)} failed: {p.stderr.strip()}")
        time.sleep(attempt + 1)


def remaining():
    core = gh(["rate_limit"])["resources"]["core"]
    return core["remaining"]


def write(line):
    print(line)
    if summary:
        with open(summary, "a") as out:
            out.write(line + "\n")


cutoff = (dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=keep_days)).strftime("%Y-%m-%dT%H:%M:%SZ")
write(f"### Actions run retention: {'DRY RUN' if dry else 'DELETE'}, completed runs created before {cutoff}")

open_branches, open_shas = set(), set()
for pg in range(1, 6):
    pulls = gh([f"repos/{repo}/pulls?state=open&per_page=100&page={pg}"]) or []
    for pr in pulls:
        open_shas.add(pr["head"]["sha"])
        if (pr["head"].get("repo") or {}).get("full_name") == repo:
            open_branches.add(pr["head"]["ref"])
    if len(pulls) < 100:
        break
default_branch = gh([f"repos/{repo}"])["default_branch"]
live_branches = set()
for pg in range(1, 21):
    batch = gh([f"repos/{repo}/branches?per_page=100&page={pg}"]) or []
    live_branches.update(b["name"] for b in batch)
    if len(batch) < 100:
        break
else:
    raise SystemExit("More than 2000 branches; refusing to guess which still exist")
live_branches.discard(default_branch)
protected = open_branches | live_branches
write(f"Keeping every run of {len(open_branches)} open PR branches and {len(live_branches)} existing branches (all but {default_branch})")

deleted = kept = gone = 0
page = 1
seen = set()
stop = ""
while deleted < limit:
    if remaining() < rate_floor:
        stop = "API budget low, the next pass continues"
        break
    # Deleting shifts the list, so a delete pass rereads the same page until a
    # read deletes nothing; a dry run walks the pages.
    data = gh([f"repos/{repo}/actions/runs?created=%3C{cutoff}&status=completed&per_page=100&page={page}"])
    raw = data.get("workflow_runs", [])
    if not raw:
        break
    runs = [r for r in raw if r["id"] not in seen]
    before = deleted
    for run in runs:
        if deleted >= limit:
            break
        seen.add(run["id"])
        if run.get("status") != "completed" or run.get("created_at", "") >= cutoff:
            continue
        if run.get("head_branch") in protected or run.get("head_sha") in open_shas:
            kept += 1
            continue
        if not dry:
            result = gh(["-X", "DELETE", f"repos/{repo}/actions/runs/{run['id']}"], allow_404=True)
            if result == "gone":
                gone += 1
                if gone <= 50 or gone % 100 == 0:
                    write(f"- Already gone {run['id']}: {run.get('name')} ({run.get('created_at')})")
                continue
        deleted += 1
        if deleted <= 50 or deleted % 100 == 0:
            write(f"- {'Would delete' if dry else 'Deleted'} {run['id']}: {run.get('name')} ({run.get('created_at')})")
    if dry or deleted == before:
        page += 1

if not stop and deleted >= limit:
    stop = f"reached MAX_DELETE={limit}, the next pass continues"
total = (gh([f"repos/{repo}/actions/runs?created=%3C{cutoff}&status=completed&per_page=1"]) or {}).get("total_count")
gone_part = f" Already gone (skipped): {gone}." if gone else ""
write(f"{'Would delete' if dry else 'Deleted'}: {deleted}. Kept for open PRs and live branches: {kept}.{gone_part} Older completed runs left (kept runs included): {total}. {stop}".rstrip())
