import unittest
from pathlib import Path
import importlib.util

spec = importlib.util.spec_from_file_location("risk", Path(__file__).with_name("classify_ci_risk.py"))
risk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(risk)

class RiskClassificationTests(unittest.TestCase):
    def test_docs_only(self):
        self.assertEqual(risk.classify(["README.md", "docs/agents/ci-workflows.md"])["tier"], "docs")
    def test_housekeeping(self):
        self.assertEqual(risk.classify(["scripts/housekeeping-old-runs.py", "docs/readme.md"])["tier"], "housekeeping")
    def test_audio(self):
        self.assertEqual(risk.classify(["Assets/audio/manifest.json"])["tier"], "audio")
    def test_gameplay(self):
        self.assertEqual(risk.classify(["battle/modules/15f-controller.js"])["tier"], "gameplay")
    def test_workflow_only_is_ci_config(self):
        result = risk.classify([".github/workflows/ci.yml", ".github/workflows/playtester-probe-pack.yml"])
        self.assertEqual(result["tier"], "ci-config")
        self.assertEqual(result["checks"], {"syntax": True, "sim": True, "battle_checks": False})
    def test_classifier_itself_is_ci_config(self):
        self.assertEqual(risk.classify(["scripts/classify_ci_risk.py", "scripts/test_classify_ci_risk.py"])["tier"], "ci-config")
        # Sim selection machinery is CI config too, and still runs Sim (all of it).
        result = risk.classify(["scripts/run_sim_checks.py", "tools/ai-sim-harness/sim-deps.json"])
        self.assertEqual(result["tier"], "ci-config")
        self.assertTrue(result["checks"]["sim"])
        # Other harness files stay gameplay.
        self.assertEqual(risk.classify(["tools/ai-sim-harness/harness.js"])["tier"], "gameplay")
    def test_workflow_plus_runtime_escalates(self):
        result = risk.classify([".github/workflows/mini-meeting-qa.yml", "battle/scenario-generator.js"])
        self.assertEqual(result["tier"], "architecture")
        self.assertTrue(all(result["checks"].values()))
    def test_workflow_plus_benchmark_script_escalates(self):
        # Benchmark and probe tooling decides what a benchmark measures: never ci-config.
        self.assertEqual(risk.classify([".github/workflows/battle-benchmark.yml", "scripts/run_battle_benchmark.mjs"])["tier"], "architecture")
        self.assertEqual(risk.classify(["scripts/probes/probe_mini_meeting.cjs"])["tier"], "gameplay")
    def test_workflow_plus_housekeeping_stays_tooling(self):
        result = risk.classify([".github/workflows/branch-housekeeping.yml", "scripts/housekeeping-actions-runs.sh", "docs/agents/ci-workflows.md"])
        self.assertEqual(result["tier"], "ci-config")
        self.assertTrue(result["checks"]["sim"])
    def test_package_json_escalates(self):
        self.assertEqual(risk.classify(["package.json"])["tier"], "architecture")
    def test_mixed_escalates(self):
        self.assertEqual(risk.classify(["Assets/audio/manifest.json", "battle/modules/15f.js"])["tier"], "architecture")
    def test_unknown_escalates(self):
        self.assertEqual(risk.classify(["new-engine/runtime.rs"])["tier"], "architecture")
    def test_empty_escalates(self):
        self.assertTrue(risk.classify([])["full_validation"])
    def test_override(self):
        self.assertEqual(risk.classify(["README.md"], elevated=True)["tier"], "architecture")
    def test_traversal_escalates(self):
        self.assertEqual(risk.classify(["../README.md"])["tier"], "architecture")

    def test_routes(self):
        self.assertFalse(any(risk.classify(["docs/x.md"])["checks"].values()))
        self.assertEqual(risk.classify(["scripts/housekeeping-old-runs.py"])["checks"], {"syntax": True, "sim": False, "battle_checks": False})
    def test_runtime_tiers_run_every_check(self):
        for path in ("battle/modules/15f-controller.js", "battle/battle-sim.js", "tools/ai-sim-harness/run.js",
                     "Assets/audio/manifest.json", "Assets/models/soldier.fbx", "runtime-contract.php",
                     "battle_sim.php", "new-engine/runtime.rs", "../README.md"):
            self.assertTrue(all(risk.classify([path])["checks"].values()), path)
    def test_override_runs_every_check(self):
        self.assertTrue(all(risk.classify(["docs/x.md"], elevated=True)["checks"].values()))
        self.assertTrue(all(risk.classify([".github/workflows/ci.yml"], elevated=True)["checks"].values()))


WORKFLOWS = Path(__file__).resolve().parent.parent / ".github" / "workflows"
# Pull-request workflows that deliberately keep their own gating: the CI gate itself
# (routes through its own changes job), the merged-branch cleanup, the #683-only audio
# runs (job-level PR-number guard) and the cheap PHP contract check for the wargame site.
UNROUTED = {"ci.yml", "branch-housekeeping.yml", "audio-limits-experiment-683.yml",
            "full-mix-audio-683.yml", "mobile-mini-audio-683.yml", "ideation-site-check.yml"}
COND = "needs.route.outputs.battle_checks == 'true'"


def _as_list(value):
    return [value] if isinstance(value, str) else list(value or [])


class RouteWiringTests(unittest.TestCase):
    """Every browser QA, probe and benchmark workflow on PRs must obey the risk route."""

    def test_every_pr_workflow_is_routed(self):
        import yaml
        checked = 0
        for path in sorted(WORKFLOWS.glob("*.yml")):
            doc = yaml.safe_load(path.read_text())
            triggers = doc.get(True, doc.get("on")) or {}
            if "pull_request" not in triggers or path.name in UNROUTED or path.name == "risk-route.yml":
                continue
            checked += 1
            jobs = doc["jobs"]
            self.assertEqual(jobs.get("route", {}).get("uses"), "./.github/workflows/risk-route.yml", path.name)
            routed = {"route"}
            # A job is safe when it needs route and tests battle_checks, or needs only routed
            # jobs without always() (a skipped dependency then skips it too).
            pending = [n for n in jobs if n != "route"]
            for _ in range(len(pending) + 1):
                for name in list(pending):
                    job = jobs[name]
                    needs = _as_list(job.get("needs"))
                    cond = str(job.get("if", ""))
                    direct = "route" in needs and COND in cond
                    inherited = needs and all(n in routed and n != "route" for n in needs) and "always()" not in cond and "cancelled()" not in cond
                    if direct or inherited:
                        routed.add(name)
                        pending.remove(name)
            self.assertEqual(pending, [], f"{path.name}: jobs not gated by the risk route")
        self.assertGreaterEqual(checked, 20)

    def test_ci_gate_reads_the_route(self):
        import yaml
        jobs = yaml.safe_load((WORKFLOWS / "ci.yml").read_text())["jobs"]
        self.assertIn("needs.changes.outputs.syntax == 'true'", jobs["static"]["if"])
        self.assertIn("needs.changes.outputs.sim == 'true'", jobs["harness"]["if"])


if __name__ == "__main__":
    unittest.main()
