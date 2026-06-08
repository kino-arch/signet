# Signet: Project Blueprint & Execution Plan (v2.0)

## 1. Project Overview & Lore
Signet is a premium, Mandalorian-themed resume builder application. It transforms the mundane task of building a resume into an elite, sci-fi ritual where professionals "forge" their identities to win corporate bounties.

- **The App (Signet):** The final professional resume.
- **The Builder (The Forge):** The editor interface where users input their career history.
- **The Currency (Beskar Tokens):** A transactional token system used to export completed Signets.

### 1.1 Tech Stack (v2.0 AI Upgrade)
- **Frontend Core:** Vite.js, React, TypeScript, Tailwind CSS.
- **UI Architecture:** 100% shadcn/ui.
- **Database & Auth:** Supabase (PostgreSQL, OAuth/Email, Row Level Security).
- **AI Integration (Deep Moat):** Supabase Edge Functions orchestrating a cascading fallback chain (NVIDIA, Gemini Pro, OpenAI) for high-availability AI generation.
- **State Management:** Zustand (`useDataSlateStore` as the Single Source of Truth).
- **Animations:** Framer Motion.

## 2. The Beskar Token Economy
Signet bypasses traditional subscriptions in favor of a transactional token economy. Users purchase tokens upfront via Stripe, which are stored as a `credit_balance` integer in the `profiles` table. Token deduction occurs via secure Edge Functions (`deduct-credit`).

| Tier | Price | Reward | Cost Per Signet | Lore Placement |
|---|---|---|---|---|
| Foundling Pack | $5 | 3 Resumes | $1.66 / ea | For those entering their first guild contracts. |
| Hunter Bounty | $10 | 7 Resumes | $1.42 / ea | For active mercenaries optimizing for multiple career tracks. |
| Clan Chieftain | $20 | 15 Resumes | $1.33 / ea | Elite contractors commanding an entire fleet. |

## 3. Resume Component Specifications (The 6 Industry Standards)
The Forge offers 6 meticulously crafted chassis (templates) designed for 100% ATS readability via linear CSS Grid DOM structures:

1. **Heavy Infantry (Classic/Standard):** Traditional left-aligned, highly professional. (ATS: 100%)
2. **Datacore (Technical):** Specialized for engineers. Pushes skills and tech stack to the absolute top. (ATS: 100%)
3. **Ghost (Minimal):** Clean, elegant, typography-focused with ample whitespace. (ATS: 98%)
4. **Vanguard (Modern):** Two-column visual layout engineered linearly for perfect ATS parsing. (ATS: 100%)
5. **Imperial (Executive):** Serif fonts, centered headings, authoritative and premium. (ATS: 95%)
6. **Rebel (Creative):** Vibrant, bold, high visual impact. (ATS: 60% — Design-focused, warnings applied for ATS portals).

## 4. AI Core Features (The Deep Moat)
Signet goes beyond formatting to provide true tactical advantages through Agentic workflows:

- **Target Lock Engine:** Analyzes a specific Job Description and rewrites the user's resume to match required competencies and culture.
- **XYZ Impact Scoring:** Evaluates individual bullet points against the FAANG XYZ formula (Accomplishment/Metric/Method), offering automated rewrites.
- **Reverse-ATS Match Engine:** Semantically compares the current resume slate against a Job Description, outputting a match percentage and missing keyword gap analysis.
- **Competency Distillation:** Automatically extracts and structures ATS-optimized keywords directly from the user's raw experience blocks.
- **Open-Standard Export:** Supports mapping the internal data slate to the open-source JSON Resume standard (v1.0.0) for maximum data portability.