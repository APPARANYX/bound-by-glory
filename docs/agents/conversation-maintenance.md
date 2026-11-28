## Conversation maintenance (local Codex / VS Code only)

Local hooks run `scripts/conversation-maintenance.py` to queue `/compact` and `/clear` via keystrokes or
the Codex app-server. They are **not committed as active settings** (owner decision 2026-11-28), so cloud and
other agents' sessions never run them. To use them on your machine, copy the templates:

```bash
cp .claude/settings.local.example.json .claude/settings.local.json   # Claude Code, per-machine
cp .codex/hooks.local.example.json .codex/hooks.json                  # Codex, per-machine
```

Both targets are in `.gitignore`.

- When a task gets long, run `scripts/conversation-maintenance.py compact --reason "context is long"`.
- On a clear task pivot, tell the user it hit a task-pivot marker and run `clear "next task" --reason "task pivot" --summary "…" --criteria "…"`.
  This writes `.runtime/handoff-prompt.md`, which the SessionStart/UserPromptSubmit hooks inject once.
- Prerequisites: `codex` on PATH (or `CODEX_BIN`), plus macOS Accessibility permission for VS Code.
  Re-approve hook trust after editing either hook file.
- Use `--transport auto` and `--refresh-mode window`. `webview` froze Codex once.
