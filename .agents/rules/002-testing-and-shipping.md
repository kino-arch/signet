---
description: "Enforces rigorous testing and shipping principles."
model_decision: "Use this rule when the user asks to prepare a PR, fix a bug, or write tests."
---

# Testing and Shipping Guidelines

- **Test Everything**: 100% test coverage is the goal. Tests make \"vibe coding\" safe instead of \"yolo coding\".
- **Regression Tests on Fixes**: Every single bug fix must be accompanied by a regression test that fails without the fix and passes with it.
- **Pre-Ship Verification**: Before shipping or recommending a merge, verify that all CI passes, and the code has been end-to-end verified.
- **Atomic Commits**: Ensure commits are bisect-friendly. Keep mechanical refactors separate from new features, and tests separate from implementations where possible.
