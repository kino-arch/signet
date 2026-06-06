---
description: "Enforces gstack-style high code quality, typing, and slop-scan rules."
always_on: true
---

# Code Quality Guidelines

This project strictly adheres to quality over \"AI slop\". When writing or modifying code:

- **No Empty Catches for File Ops**: Never swallow file-related errors blindly. Use safe alternatives or rethrow on permissions errors (e.g., EPERM, EIO).
- **Typed Exception Catches**: When catching errors in areas where the error shape is known (e.g., URL parsing or DOM APIs), prefer typed checks: `catch (err) { if (!(err instanceof TypeError)) throw err }`.
- **No Redundant await**: Remove redundant `return await` when there is no enclosing `try` block to save microtasks.
- **Don't Game Linters**: Do not add comments strictly to bypass linters unless absolutely necessary.
- **Error Messages**: Do not rely on brittle string-matching on error messages (e.g., `err.message.includes('closed')`). Libraries change error strings. Use status codes, types, or proper checks.
