"""Regression tests for the Spec Kit artifact rules in check_agent_docs.py.

    python3 -m unittest discover -s scripts -p 'test_check_agent_docs.py'
"""
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import check_agent_docs as cad  # noqa: E402

SPEC = """# Feature Specification: fixture

**Status**: {status}

### User Story 1 - First (Priority: P1)

**Requirements**: FR-001, FR-002

### User Story 2 - Second (Priority: P2)

**Requirements**: FR-003

## Requirements

- **FR-001**: one
- **FR-002**: two
- **FR-003**: three
"""

TASKS_OK = """# Tasks
- [ ] T001 [US1] [EV] regression check
- [ ] T002 [US1] implement Depends: T001
- [ ] T003 [US2] [EV] regression check
- [x] T004 [US2] implement (FR-003) #840
"""


def run(status, tasks, spec=None):
    return cad.analyze_spec((spec or SPEC).format(status=status), tasks, "fixture")


class SpecKitRules(unittest.TestCase):
    def test_valid_story_mapping_passes(self):
        self.assertEqual(run("Active", TASKS_OK), [])

    def test_unrelated_story_does_not_hide_unmapped_requirement(self):
        # Only US1 is tasked: FR-003 (US2's) must be reported, not hidden by [US1].
        tasks = "- [ ] T001 [US1] [EV] check\n- [ ] T002 [US1] build\n"
        errs = run("Active", tasks)
        self.assertTrue(any("FR-003 is not served" in e for e in errs), errs)
        self.assertFalse(any("FR-001" in e or "FR-002" in e for e in errs), errs)

    def test_story_without_requirements_line_serves_nothing(self):
        spec = SPEC.replace("**Requirements**: FR-003\n", "")
        errs = run("Active", TASKS_OK.replace("(FR-003) ", ""), spec)
        self.assertTrue(any("FR-003 is not served" in e for e in errs), errs)

    def test_direct_fr_reference_serves(self):
        spec = SPEC.replace("**Requirements**: FR-003\n", "")
        self.assertEqual(run("Active", TASKS_OK, spec), [])

    def test_unknown_references_rejected(self):
        tasks = TASKS_OK + "- [ ] T005 [US9] [EV] stray (FR-099)\n"
        errs = run("Draft", tasks)
        self.assertTrue(any("[US9]" in e for e in errs), errs)
        self.assertTrue(any("FR-099" in e for e in errs), errs)

    def test_story_listing_undefined_fr_rejected(self):
        spec = SPEC.replace("FR-001, FR-002", "FR-001, FR-007")
        self.assertTrue(any("lists FR-007" in e for e in run("Draft", None, spec)))

    def test_missing_evidence_task_in_active_spec(self):
        tasks = TASKS_OK.replace("T003 [US2] [EV]", "T003 [US2]")
        errs = run("Active", tasks)
        self.assertTrue(any("US2 has no [EV]" in e for e in errs), errs)

    def test_draft_may_precede_tasks_and_coverage(self):
        self.assertEqual(run("Draft", None), [])
        self.assertEqual(run("Draft", "- [ ] T001 [US1] start\n"), [])

    def test_active_needs_tasks(self):
        self.assertTrue(any("needs tasks.md" in e for e in run("Active", None)))

    def test_tick_needs_evidence(self):
        errs = run("Superseded", "- [x] T001 [US1] done\n")
        self.assertTrue(any("ticked but cites" in e for e in errs), errs)
        self.assertEqual(run("Superseded", "- [x] T001 [US1] done in 812b130\n"), [])

    def test_duplicate_ids_and_bad_status(self):
        errs = run("Finished", "- [ ] T001 a\n- [ ] T001 b\n")
        self.assertTrue(any("used more than once" in e for e in errs), errs)
        self.assertTrue(any("Status must be" in e for e in errs), errs)

    def test_repository_specs_pass(self):
        errors = []
        cad.check_speckit(errors)
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
