## Deploy and assets

## Hosted root migration (Bound by Glory)

- The GitHub repository is `APPARANYX/bound-by-glory`. Its private audio dependency remains `APPARANYX/grasstex-audio`. GitHub repository names and 50webs directory names are independent.
- Production and Actions branch-preview FTP jobs use the repository Actions variable `BATTLE_WEB_ROOT`; absent or blank means `bound-by-glory` (the renamed FTP directory). Set `BATTLE_WEB_ROOT=grasstex` only for an intentional rollback **after confirming that directory still exists**. The only supported values are `grasstex` and `bound-by-glory`. Both jobs validate the value and use it for FTP directories, preview URLs, verification and generated asset-overlay fallback rules. The PHP runtime derives API, asset and script URL prefixes from its served entrypoint rather than assuming a fixed host folder.
- **Cutover gate:** do not set `BATTLE_WEB_ROOT=bound-by-glory` until the complete current `grasstex/` host directory has been copied to `bound-by-glory/` with hidden deployment manifests, `Assets/terrain/` (host-only), audio, calibrated sidecars, `state/` and runtime files intact. This cannot be performed by the GitHub PR and must be verified on the FTP server. No production directory should be deleted during the migration.
- After final-head CI and server verification, merge the path migration so subsequent `main` deploys target `bound-by-glory/`. If `BATTLE_WEB_ROOT` is already explicitly set to `grasstex`, change or remove that override first. Then check the resulting build tag and public URL `https://test.ivandpopov.com/bound-by-glory/battle_sim.php`. Verify preview.php, a branch preview with a real soldier FBX overlay, and hosted audio/policy endpoints before retiring any old URL. Existing tools, bookmarks and some historical docs still use `/grasstex/`, so preserve that path with a tested HTTP redirect or an operational alias. Do not remove the old tree until an explicit old-path audit and smoke test pass.


- Production `/grasstex/battle_sim.php` is `battle_sim_local.php`, uploaded under that name by the
  deploy; it serves the deployed runtime and writes nothing to the host. The repo's own
  `battle_sim.php` (a GitHub-mirroring loader that writes git-tracked `Assets/` to the host and
  never deletes) is not deployed.
- `scripts/prepare_incremental_deploy.py` uploads by content hash: `.fbx` from soldiers,
  animations and weapons, prepared weapon `.glb`, muzzle-flash `.png`, audio, and the Motion Lab's own files
  (`MANAGED_LAB`: `labs/fbx-animation-lab.html`, its two `.js`, `asset-list.php`,
  `save-calibration.php`). `scripts/build_version.py stamp|show|tag`
  derives the version from `build-v<N>` tags. Each deploy also lists the host's
  `Assets/{soldiers,animations,weapons}` and re-uploads any FBX the hash state records but the host
  no longer has (`prune_missing_remote_assets.py`), so a folder can be cleared on the host and
  refilled by running the deploy (Actions → Deploy Battle Runtime → Run workflow).
- **The deploy never deletes or overwrites server files the repo does not manage.** Hand-placed
  sidecar JSON (clip/model/lab metadata beside the FBX assets), the live FBX soldier-animation lab
  files and everything else unmanaged stay put. The planner may delete only a
  `battle/modules/*.js` it deployed itself that has left the repo; any JSON other than
  `battle/build-version.json` and `Assets/audio/manifest.json`, and any path containing `lab` or
  `sidecar`, can never be deleted or uploaded over, except the exact `MANAGED_LAB` paths and the two explicit managed production
  controllers `battle/skills-lab.js` and `battle/phase-c-compact-range.js`.
  These exceptions are uploaded but never deleted; more than 8 deletes in one run aborts the
  deploy (`DEPLOY_MAX_DELETES` to override an intended bulk retirement). `check_deploy_safety.py`
  proves this in CI and again inside the deploy before anything is uploaded. Keep it that way:
  don't add `mirror --delete` or broaden the delete rule for production.
- `Assets/terrain/{terrain.json,terrain.bin,splat.png,roaduv.png}` exist only on the host. **Don't
  add placeholders** with those names.
- `runtime-contract.php` owns server-side optional-module selection and preview query forwarding.
  Both loaders and the launcher require it; the deploy plan uploads this exact helper before
  dependent loaders. Actions preview packaging copies it when present, preserving historical
  refs whose loaders predate the helper.
  Launcher previews copy the trusted host loader **and helper**, record the helper hash, and
  never execute a branch-supplied PHP helper. Existing staged pairs remain immutable when
  production changes. Missing/corrupt staged helpers force restaging; runtime JS from the pinned
  ref retains its own gameplay defaults. Explicit strategic `=0` controls now survive redirects.
- Contact-controller browser QA calls the existing branch-preview workflow with an exact commit
  SHA so its PHP loader, helper and JavaScript are tested together. The reusable workflow exposes
  its verified preview slug; it uploads `runtime-contract.php` before the dependent loader. The
  launcher continues to use its trusted host loader and does not execute branch PHP.
- Hosted textures load only from `test.ivandpopov.com` (WebGL rejects them cross-origin).

