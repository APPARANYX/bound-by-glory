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
    def test_workflow_change_escalates(self):
        self.assertEqual(risk.classify([".github/workflows/ci.yml"])["tier"], "architecture")
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

if __name__ == "__main__":
    unittest.main()
