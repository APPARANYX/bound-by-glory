#!/usr/bin/env python3
"""Delete completed Actions runs older than KEEP_DAYS (default 7).

Deleting a run also deletes its logs and artifacts. Ivan's call (2026-11-08):
benchmark and QA results are read as soon as they finish, so nothing older than
a week is kept. Runs that are queued or still running are never touched.

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


def gh(args):
    for attempt in range(3):
        p = subprocess.run(["gh", "api", *args], capture_output=True, text=True)
        if p.returncode == 0:
            return json.loads(p.stdout) if p.stdout.strip() else None
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

deleted = 0
page = 1
seen = set()
stop = ""
while deleted < limit:
    if remaining() < rate_floor:
        stop = "API budget low, the next pass continues"
        break
    # Deleting shifts the list, so a delete pass always rereads page 1; a dry
    # run walks the pages instead.
    data = gh([f"repos/{repo}/actions/runs?created=%3C{cutoff}&status=completed&per_page=100&page={page}"])
    runs = [r for r in data.get("workflow_runs", []) if r["id"] not in seen]
    if not runs:
        break
    for run in runs:
        if deleted >= limit:
            break
        seen.add(run["id"])
        if run.get("status") != "completed" or run.get("created_at", "") >= cutoff:
            continue
        if not dry:
            gh(["-X", "DELETE", f"repos/{repo}/actions/runs/{run['id']}"])
        deleted += 1
        if deleted <= 50 or deleted % 100 == 0:
            write(f"- {'Would delete' if dry else 'Deleted'} {run['id']}: {run.get('name')} ({run.get('created_at')})")
    if dry:
        page += 1

if not stop and deleted >= limit:
    stop = f"reached MAX_DELETE={limit}, the next pass continues"
total = (gh([f"repos/{repo}/actions/runs?created=%3C{cutoff}&status=completed&per_page=1"]) or {}).get("total_count")
write(f"{'Would delete' if dry else 'Deleted'}: {deleted}. Older completed runs left: {total}. {stop}".rstrip())
