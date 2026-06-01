# Signet

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/kino-arch/signet?utm_source=oss&utm_medium=github&utm_campaign=kino-arch%2Fsignet&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

Signet is a minimalist, sci-fi-themed resume builder with a sleek datapad UI. It strips away formatting clutter to generate clean, Beskar-grade CVs. Select your structural guild (Forge, Outpost, Guild, or Navigators) to forge your career data into a professional emblem. Built for efficiency. This is the way to your next role.

## Features
- **Datapad UI:** Immerse yourself in a sci-fi environment.
- **Multiple Guilds:** Tailor your resume to specific formats.
- **AI-Powered Reforging:** Enhance your resume with advanced AI intelligence.

## Getting Started
```bash
npm install
npm run dev
```

## Customizations
This project uses **Antigravity Skills and Rules** inspired by `gstack` to ensure high code quality, rigorous review, and secure execution.

### Active Rules
These rules are located in `.agents/rules/` and automatically guide the agent:
- **Code Quality (`001-code-quality.md`)**: Enforces strict typings, safe error handling, and robust code structure.
- **Testing & Shipping (`002-testing-and-shipping.md`)**: Enforces 100% test coverage goals, regression tests for fixes, and bisect-friendly commits.
- **Security & Redaction (`003-security-and-redaction.md`)**: Protects against leaking secrets, strictly scans outputs, and defends against prompt injection.

### Available Skills
You can invoke these specialized skills located in `.agents/skills/` via `@skill-name` or `/skill-name`:
- `/office-hours`: Product interrogation and brainstorming with forcing questions.
- `/plan-ceo-review`: Strategic challenge and scope review (Expansion, Reduction, etc.).
- `/plan-eng-review`: Architecture, data flow, edge cases, and test plan lock-in.
- `/review`: Staff Engineer level code review focused on concurrency, leaks, and completeness.
- `/investigate`: Systematic root-cause debugging methodology.
