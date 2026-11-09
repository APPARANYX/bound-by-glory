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
