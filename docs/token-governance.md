# Token Governance Council Charter

**Effective Date**: ${new Date().toISOString().split('T')[0]}

## Mission
The Token Governance Council oversees the evolution, stability, and adoption of the Project Constellation token architecture (The Three-Layer Model). The Council ensures the design system remains a competitive platform without degrading into a fragmented UI.

## Members
- **Design Lead**: Owns Semantic Tokens and visual regressions.
- **Staff Engineer**: Owns Token Architecture, Component Tokens, and CI enforcement.
- **Product Manager**: Owns business impact, tracking Gravity Well metrics and A/B test telemetry.

## Governance Rules

### 1. The 48-Hour RFC Rule
**Scope**: Primitive Tokens (`tokens/primitives/*.json`)
Primitive tokens are the foundational hex codes, spacing scales, and typography sizes. They are strictly locked. Any proposed addition or modification to a primitive token requires a formal Request for Comments (RFC) open for at least **48 hours** and requires unanimous approval from the Council.

### 2. The Semantic & Component Contract
- **Semantic Tokens** (`tokens/semantic/*.json`): The Design Lead's API. Changes here map to primitives.
- **Component Tokens** (`tokens/component/*.json`): The Engineering team's API. Changes here map to semantic tokens.

### 3. Emergency Override Protocol
In the event of a production incident where a linting rule blocks a critical hotfix, engineers may use the following syntax to bypass the ESLint rules for arbitrary Tailwind values:
\`\`\`tsx
// constellation-override: <reason>
<div className="bg-[#123456]">Hotfix</div>
\`\`\`
- **Constraint**: Must include a clear reason.
- **Constraint**: Maximum 2 overrides per quarter.
- **Constraint**: Triggers a retroactive review by the Staff Engineer + Design Lead within 72 hours.

### 4. Visual Regression Gate
Every single change to any token JSON file MUST generate a successful build and be reviewed via Chromatic. A Chromatic UI diff report will be automatically attached to the PR. The Design Lead and Staff Engineer are the required reviewers for all token-related Chromatic diffs.

---
*First meeting scheduled for Friday of Week 1.*
