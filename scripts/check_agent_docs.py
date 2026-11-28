#!/usr/bin/env python3
"""Deterministic checks for the agent documentation and Spec Kit artifacts.

    python3 scripts/check_agent_docs.py            # run every check, exit 1 on any error
    python3 scripts/check_agent_docs.py --measure  # print sizes and rough token costs too

Checks (each is mechanical; nothing scores prose):
  links       every relative Markdown link in the checked files resolves, including #anchors
  required    the files AGENTS.md routes agents to exist
  budget      AGENTS.md stays small; the mandatory start set stays under its budget
  obsolete    retired instructions do not come back into the routing documents
  workflows   every .github/workflows/*.yml appears in docs/agents/ci/workflows.md
  speckit     specs/*/spec.md has a valid Status; tasks have unique IDs and name only defined FRs and
              stories; ticked tasks cite evidence; in an Active spec every FR-NNN is served (directly or
              through its story's **Requirements** line) and every story has an [EV] evidence task
Run by the `changes` job of .github/workflows/ci.yml on every pull request.
"""
import argparse
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

AGENTS_MAX_BYTES = 5000
# AGENTS.md + working rules + development workflows: what every agent reads before work.
MANDATORY_START = ["AGENTS.md", "docs/agents/working-rules.md", "docs/agents/development-workflows.md"]
MANDATORY_MAX_BYTES = 16000

REQUIRED = [
    "AGENTS.md",
    "CLAUDE.md",
    ".specify/memory/constitution.md",
    "docs/agents/working-rules.md",
    "docs/agents/development-workflows.md",
    "docs/agents/spec-kit.md",
    "docs/agents/handoffs.md",
    "docs/agents/battle-architecture.md",
    "docs/agents/testing.md",
    "docs/agents/ci-workflows.md",
    "docs/agents/ci/workflows.md",
    "docs/architecture/AI_SKILLS_ROADMAP.md",
    ".claude/skills/spec-driven-workflow/SKILL.md",
    ".agents/skills/spec-driven-workflow/SKILL.md",
    ".muse/commands/speckit.specify.md",
    ".muse/commands/speckit.implement.md",
    ".muse/commands/speckit.converge.md",
    ".specify/templates/overrides/spec-template.md",
    ".specify/templates/overrides/tasks-template.md",
]

# Retired instructions: (pattern, why). Checked in the routing documents only.
OBSOLETE = [
    (r"#706[^\n]{0,80}protected", "PR #706 is closed; it is no longer protected"),
    (r"tactical-ai\.md|branch-snapshots\.md", "these reference pages never existed on main"),
    (r"benchmark-<topic>-dispatch|temporary per-topic workflow", "the permanent benchmark launcher replaced temporary dispatch workflows"),
    (r"[Cc]urrent main still uses the legacy controller", "the controller is the default since #785"),
    (r"runs are never deleted", "old main runs are purged since #789 (docs/agents/ci/housekeeping.md)"),
    (r"go straight to main", "every change goes through a PR"),
]
ROUTING = ["AGENTS.md", "CLAUDE.md", ".specify/memory/constitution.md", "docs/agents/*.md",
           "docs/agents/*/*.md", "docs/architecture/*.md", ".claude/skills/*/SKILL.md", ".agents/skills/*/SKILL.md"]

SPEC_STATUSES = {"Draft", "Active", "Implemented", "Superseded", "Abandoned", "Deferred"}


def rel(p):
    return os.path.relpath(p, ROOT)


def expand(patterns):
    out = []
    for pat in patterns:
        out.extend(sorted(glob.glob(os.path.join(ROOT, pat))))
    return out


def strip_code(text):
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    return re.sub(r"`[^`\n]*`", "", text)


def slug(heading):
    h = re.sub(r"<[^>]+>", "", heading).strip().lower()
    h = re.sub(r"[^\w\- ]", "", h)
    return h.replace(" ", "-")


_anchor_cache = {}


def anchors(path):
    if path not in _anchor_cache:
        found, seen = set(), {}
        text = re.sub(r"```.*?```", "", open(path, encoding="utf-8").read(), flags=re.S)
        for m in re.finditer(r"^#{1,6}\s+(.*?)\s*#*\s*$", text, re.M):
            s = slug(m.group(1))
            n = seen.get(s, 0)
            found.add(s if n == 0 else f"{s}-{n}")
            seen[s] = n + 1
        found.update(re.findall(r'<a\s+(?:name|id)="([^"]+)"', text))
        _anchor_cache[path] = found
    return _anchor_cache[path]


def check_links(files, errors):
    for f in files:
        text = strip_code(open(f, encoding="utf-8").read())
        for m in re.finditer(r"\[[^\]]*\]\(([^)\s]+)\)", text):
            url = m.group(1)
            if re.match(r"[a-z][a-z0-9+.-]*:", url):
                continue
            path, _, frag = url.partition("#")
            target = os.path.normpath(os.path.join(os.path.dirname(f), path)) if path else f
            if not os.path.exists(target):
                errors.append(f"links: {rel(f)}: missing target {url}")
            elif frag and target.endswith(".md") and frag not in anchors(target):
                errors.append(f"links: {rel(f)}: no heading for #{frag} in {rel(target)}")


def check_required(errors):
    for p in REQUIRED:
        if not os.path.exists(os.path.join(ROOT, p)):
            errors.append(f"required: {p} is missing")
    claude = os.path.join(ROOT, "CLAUDE.md")
    if os.path.exists(claude) and "@AGENTS.md" not in open(claude, encoding="utf-8").read():
        errors.append("required: CLAUDE.md must import @AGENTS.md so Claude Code reads the same rules")


def size(p):
    full = os.path.join(ROOT, p)
    return os.path.getsize(full) if os.path.exists(full) else 0


def check_budget(errors):
    if size("AGENTS.md") > AGENTS_MAX_BYTES:
        errors.append(f"budget: AGENTS.md is {size('AGENTS.md')} bytes (limit {AGENTS_MAX_BYTES}); move detail to a reference")
    total = sum(size(p) for p in MANDATORY_START)
    if total > MANDATORY_MAX_BYTES:
        errors.append(f"budget: mandatory start set is {total} bytes (limit {MANDATORY_MAX_BYTES}): {', '.join(MANDATORY_START)}")


def check_obsolete(files, errors):
    for f in files:
        # HTML comments hold change notes that may name what was retired.
        text = re.sub(r"<!--.*?-->", lambda m: "\n" * m.group(0).count("\n"),
                      open(f, encoding="utf-8").read(), flags=re.S)
        for pat, why in OBSOLETE:
            for m in re.finditer(pat, text):
                line = text.count("\n", 0, m.start()) + 1
                errors.append(f"obsolete: {rel(f)}:{line}: '{m.group(0)}' ({why})")


def check_workflows(errors):
    inv = os.path.join(ROOT, "docs/agents/ci/workflows.md")
    text = open(inv, encoding="utf-8").read() if os.path.exists(inv) else ""
    for wf in sorted(glob.glob(os.path.join(ROOT, ".github/workflows/*.yml"))):
        name = os.path.basename(wf)
        if f"`{name}`" not in text:
            errors.append(f"workflows: {name} is not listed in docs/agents/ci/workflows.md")


TICK_EVIDENCE = re.compile(r"#\d+|\b[0-9a-f]{7,40}\b|https?://")


def story_requirements(spec_text):
    """{'US1': {'FR-001', ...}} from each '### User Story N' section's '**Requirements**:' line."""
    out = {}
    parts = re.split(r"^### User Story (\d+)\b.*$", spec_text, flags=re.M)
    for i in range(1, len(parts) - 1, 2):
        m = re.search(r"^\*\*Requirements\*\*:\s*(.*)$", parts[i + 1].split("\n## ")[0], re.M)
        out["US" + parts[i]] = set(re.findall(r"FR-\d{3}", m.group(1))) if m else set()
    return out


def analyze_spec(spec_text, tasks_text, label="spec"):
    """Errors for one feature. tasks_text is None when tasks.md does not exist.

    Draft: Status, IDs and references are checked; coverage is not (tasks may not exist yet).
    Active: tasks.md must exist; every FR is served directly (a task names it) or through a story
    whose '**Requirements**:' line lists it; every story has at least one [EV] evidence task.
    Implemented/Superseded/Abandoned/Deferred: only Status, IDs, references and ticks.
    Limits: this checks structure, not whether a task really proves its requirement.
    """
    errs = []
    m = re.search(r"^\*\*Status\*\*:\s*([A-Za-z]+)", spec_text, re.M)
    status = m.group(1) if m else None
    if status not in SPEC_STATUSES:
        errs.append(f"{label}: Status must be one of {sorted(SPEC_STATUSES)}, found {status!r}")
    defined = set(re.findall(r"\*\*(FR-\d{3})\*\*", spec_text))
    stories = story_requirements(spec_text)
    for us, frs in sorted(stories.items()):
        for fr in sorted(frs - defined):
            errs.append(f"{label}: {us} lists {fr}, which the spec does not define")
    if tasks_text is None:
        if status == "Active":
            errs.append(f"{label}: an Active spec needs tasks.md")
        return errs
    task_lines = re.findall(r"^\s*- \[( |x|X)\] (T\d{3})\b(.*)$", tasks_text, re.M)
    ids = [t[1] for t in task_lines]
    for dup in sorted({i for i in ids if ids.count(i) > 1}):
        errs.append(f"{label}: task ID {dup} is used more than once")
    served, story_tasks, evidence = set(), set(), set()
    for box, tid, rest in task_lines:
        if box in "xX" and not TICK_EVIDENCE.search(rest):
            errs.append(f"{label}: {tid} is ticked but cites no PR, commit or link")
        frs = set(re.findall(r"FR-\d{3}", rest))
        uss = set(re.findall(r"\[(US\d+)\]", rest))
        for fr in sorted(frs - defined):
            errs.append(f"{label}: {tid} names {fr}, which the spec does not define")
        for us in sorted(uss - set(stories)):
            errs.append(f"{label}: {tid} names [{us}], which the spec does not define")
        served |= frs
        story_tasks |= uss
        if "[EV]" in rest:
            evidence |= uss
        for us in uss & set(stories):
            served |= stories[us]
    if status == "Active":
        for fr in sorted(defined - served):
            errs.append(f"{label}: {fr} is not served by any task (name it in a task or in a story's **Requirements** line)")
        for us in sorted(set(stories) - evidence):
            errs.append(f"{label}: {us} has no [EV] evidence task")
    return errs


def check_speckit(errors):
    for spec in sorted(glob.glob(os.path.join(ROOT, "specs/*/spec.md"))):
        tasks_path = os.path.join(os.path.dirname(spec), "tasks.md")
        tasks = open(tasks_path, encoding="utf-8").read() if os.path.exists(tasks_path) else None
        for e in analyze_spec(open(spec, encoding="utf-8").read(), tasks, rel(os.path.dirname(spec))):
            errors.append("speckit: " + e)


def measure(groups):
    print("\nContext cost (bytes, words, ~tokens at 4 bytes per token):")
    for label, paths in groups:
        b = sum(size(p) for p in paths)
        w = sum(len(open(os.path.join(ROOT, p), encoding="utf-8").read().split()) for p in paths if size(p))
        print(f"  {label:<46} {b:>8,} B {w:>7,} w {b // 4:>7,} tok")


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--measure", action="store_true")
    args = ap.parse_args(argv)

    link_files = expand(["AGENTS.md", "CLAUDE.md", "README.md", ".specify/memory/*.md",
                         ".claude/skills/*/SKILL.md", ".agents/skills/*/SKILL.md"])
    for tree in ("docs", "specs"):
        link_files += glob.glob(os.path.join(ROOT, tree, "**", "*.md"), recursive=True)
    routing = expand(ROUTING)

    errors = []
    check_links(sorted(set(link_files)), errors)
    check_required(errors)
    check_budget(errors)
    check_obsolete(routing, errors)
    check_workflows(errors)
    check_speckit(errors)

    if args.measure:
        measure([
            ("AGENTS.md", ["AGENTS.md"]),
            ("Mandatory start set", MANDATORY_START),
            ("+ constitution (full spec path)", MANDATORY_START + [".specify/memory/constitution.md", "docs/agents/spec-kit.md"]),
            ("Architecture index", ["docs/agents/battle-architecture.md"]),
            ("Testing index", ["docs/agents/testing.md"]),
            ("CI index", ["docs/agents/ci-workflows.md"]),
        ])

    for e in errors:
        print(f"::error::{e}" if os.environ.get("GITHUB_ACTIONS") else f"ERROR {e}")
    print(f"Agent docs: {len(errors)} problem(s) in {len(set(link_files))} files with links, "
          f"{len(routing)} routing files, {len(glob.glob(os.path.join(ROOT, 'specs/*/spec.md')))} spec(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
