---
name: PnpmOnly
description: Enforces the use of pnpm as the sole package manager for the project.
---

# PnpmOnly

## Directives
1. **Never use npm or yarn.** All package installations, script executions, and dependency management MUST use `pnpm`.
2. **Installation:** Use `pnpm add [package]` instead of `npm install [package]`.
3. **Execution:** Use `pnpm run [script]` instead of `npm run [script]`.
4. **Tooling:** If a tool suggests `npx`, attempt to use `pnpm dlx` instead, unless the tool explicitly fails without `npx`.
