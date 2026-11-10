#!/usr/bin/env python3
"""Check the deployed PHP bootstrap works under both supported web roots.

This runs the real entrypoint with simulated SCRIPT_NAME; it does not access FTP,
publish a preview or exercise a browser.
"""
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def generated(name: str) -> str:
    source = (
        '$_SERVER["SCRIPT_NAME"] = '
        + json.dumps(f"/{name}/battle_sim.php")
        + '; $_GET = []; include "battle_sim_local.php";'
    )
    p = subprocess.run(["php", "-r", source], cwd=ROOT, text=True,
                       capture_output=True, timeout=30, check=True)
    assert "Deployment mismatch" not in p.stdout, p.stdout[-500:]
    return p.stdout


for root in ("grasstex", "bound-by-glory"):
    page = generated(root)
    for key, expected in (
        ("BATTLE_API_BASE", f"/{root}/"),
        ("BATTLE_ASSET_BASE", f"/{root}/Assets/"),
        ("BATTLE_AUDIO_BASE", f"/{root}/Assets/audio/"),
    ):
        found = re.search(r"window\." + key + r"=(\"(?:\\.|[^\"])*\");", page)
        assert found is not None, f"{root}: missing {key}"
        actual = json.loads(found.group(1))
        assert actual == expected, f"{root}: {key}={actual!r}, expected {expected!r}"
    assert f'src="/{root}/battle/core-runtime.js?' in page, (
        f"{root}: runtime script does not follow hosted entrypoint"
    )
    other = "bound-by-glory" if root == "grasstex" else "grasstex"
    assert f'src="/{other}/battle/core-runtime.js?' not in page
print("PASS: both hosted roots produce matching API, asset, audio and script URLs")

# Source fallbacks must not revive the removed FTP directory when the runtime
# bootstrap is absent (e.g., standalone Audio Lab or preview/diagnostic pages).
for source_path in (
    "battle/acoustics.js",
    "battle/battle-sim.js",
    "battle/modules/09-voice-runtime.js",
    "battle/modules/11-voice-variation.js",
    "battle/audio-lab.js",
    "battle/battle-control.js",
    "battle/modules/59-strategic-truck-visual.js",
):
    source = (ROOT / source_path).read_text(encoding="utf-8")
    assert "/grasstex/Assets/" not in source, f"Legacy hard-coded asset root in {source_path}"
    assert "BATTLE_API_BASE" in source, f"Missing host-root-aware fallback in {source_path}"
print("PASS: audio/asset JS fallbacks respect the active host root")
