import importlib.util
import json
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("sim", Path(__file__).with_name("run_sim_checks.py"))
sim = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sim)

DEP_MAP = {
    "tools/ai-sim-harness/fire-check.js": ["battle/weapons.js", "tools/ai-sim-harness/harness.js"],
    "tools/ai-sim-harness/truck-check.js": ["battle/modules/58-strategic-abstract-transport.js"],
    "scripts/run_command_lifecycle_audit.cjs": ["battle/squad-ai.js"],
    "engagement-seed-1": ["battle/engagement.js"],
    "tools/ai-sim-harness/registry-check.js": ["battle/modules"],
}
CHECKS = list(DEP_MAP) + ["tools/ai-sim-harness/brand-new-check.js"]
CORE_HERE = {"scripts/run_command_lifecycle_audit.cjs", "engagement-seed-1"}


def chosen(changed):
    return set(sim.select(CHECKS, changed, DEP_MAP)[0])


class SelectionTests(unittest.TestCase):
    def test_reader_of_changed_file_runs(self):
        self.assertIn("tools/ai-sim-harness/fire-check.js", chosen(["battle/weapons.js"]))
        self.assertNotIn("tools/ai-sim-harness/truck-check.js", chosen(["battle/weapons.js"]))

    def test_core_always_runs(self):
        self.assertTrue(CORE_HERE <= chosen(["docs/x.md"]))
        self.assertTrue(CORE_HERE <= chosen(["battle/modules/58-strategic-abstract-transport.js"]))

    def test_unmapped_check_always_runs(self):
        # A check the map has never seen is never skipped on a guess.
        self.assertIn("tools/ai-sim-harness/brand-new-check.js", chosen(["docs/x.md"]))

    def test_changed_check_runs_itself(self):
        self.assertIn("tools/ai-sim-harness/truck-check.js", chosen(["tools/ai-sim-harness/truck-check.js"]))

    def test_shared_helper_runs_its_readers(self):
        self.assertIn("tools/ai-sim-harness/fire-check.js", chosen(["tools/ai-sim-harness/harness.js"]))

    def test_deleted_dependency_runs_its_readers(self):
        # git diff lists deleted paths too; the readers must run (and fail if they still need it).
        self.assertIn("tools/ai-sim-harness/truck-check.js", chosen(["battle/modules/58-strategic-abstract-transport.js"]))

    def test_directory_read_covers_new_files_inside(self):
        self.assertIn("tools/ai-sim-harness/registry-check.js", chosen(["battle/modules/99-new.js"]))
        self.assertNotIn("tools/ai-sim-harness/registry-check.js", chosen(["battle/modules-extra.js"]))

    def test_engagement_seed_owns_run_js(self):
        self.assertEqual(sim.own_file("engagement-seed-1"), "tools/ai-sim-harness/run.js")

    def test_suite_machinery_runs_everything(self):
        for path in sorted(sim.RUN_ALL_PATHS):
            self.assertEqual(chosen([path]), set(CHECKS), path)

    def test_empty_diff_runs_everything(self):
        self.assertEqual(chosen([]), set(CHECKS))

    def test_unrelated_change_runs_only_core_and_unmapped(self):
        self.assertEqual(chosen(["Assets/models/x.fbx"]), CORE_HERE | {"tools/ai-sim-harness/brand-new-check.js"})


class SuiteTests(unittest.TestCase):
    def test_suite_has_every_harness_check_and_standalone(self):
        checks = sim.discover()
        harness = {p.relative_to(sim.REPO).as_posix() for p in (sim.REPO / sim.HARNESS).glob("*-check.js")}
        self.assertTrue(harness <= set(checks))
        self.assertTrue(set(sim.STANDALONE) <= set(checks))
        for rel in sim.STANDALONE:
            self.assertTrue((sim.REPO / rel).is_file(), rel)

    def test_committed_map_is_real(self):
        dep_map = json.loads((sim.REPO / sim.MAP_PATH).read_text())
        self.assertGreater(len(dep_map), 250)
        # A selection that runs nearly nothing for a core engine change would mean a broken map.
        ids, _ = sim.select(sim.discover(), ["battle/battle-sim.js"], dep_map)
        self.assertGreater(len(ids), 100)


if __name__ == "__main__":
    unittest.main()
