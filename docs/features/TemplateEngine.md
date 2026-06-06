# Template Engine (Signet v2.0)

## Overview
The Signet Template Engine is designed to render resumes that are both visually stunning for human reviewers and 100% accessible to Applicant Tracking Systems (ATS).

In v2.0, all templates leverage **Linear DOM CSS Grid Layouts**. This ensures that regardless of how a template visually positions elements (e.g., sidebars, multi-columns), the actual HTML DOM is structured strictly sequentially (Header -> Summary -> Experience -> Education -> Skills), guaranteeing flawless parsing by major ATS platforms like Workday, Greenhouse, and Lever.

## The Registry (`registry.ts`)
The `TEMPLATE_REGISTRY` serves as the central directory for all available chassis. It stores critical metadata for the Editor UI:
- `atsParseRate`: The estimated accuracy score of the template when processed by standard ATS parsers.
- `targetRoles`: Industries and roles the template is optimized for (e.g., "FAANG", "Startups").
- `atsWarning`: An optional warning flag displayed in the UI when a user selects a lower-compatibility template designed primarily for networking or portfolio use.

## The 6 Chassis (Templates)

### 1. Heavy Infantry (Classic/Standard)
- **ATS Parse Rate:** 100%
- **Target:** FAANG, Big Tech, Fortune 500, Software Engineers, Data Scientists.
- **Design:** Traditional left-aligned block format. Extremely professional, using Times New Roman or highly readable serif variants.

### 2. Datacore (Technical)
- **ATS Parse Rate:** 100%
- **Target:** Software Engineers, DevOps, ML/AI, SRE.
- **Design:** Engineered for technical roles. Pushes the "Technical Skills & Stack" array to the very top, immediately below the header, ensuring recruiters see technical proficiencies instantly.

### 3. Ghost (Minimal)
- **ATS Parse Rate:** 98%
- **Target:** SaaS Startups, Y Combinator, Product Engineers.
- **Design:** Clean, elegant, and typography-focused with ample whitespace. Mimics the stark, modern aesthetic of platforms like Vercel and Stripe.

### 4. Vanguard (Modern)
- **ATS Parse Rate:** 100%
- **Target:** Product Managers, Marketing, Consulting.
- **Design:** Visually presents as a two-column layout (left accent bar), but uses a CSS Grid architecture to maintain a strict, linear DOM structure for perfect ATS ingestion.

### 5. Imperial (Executive)
- **ATS Parse Rate:** 95%
- **Target:** VP/Director, C-Suite, Fortune 500, Management Consulting.
- **Design:** Centered headings, authoritative serif typography, and premium divider lines. Projects tradition and leadership.

### 6. Rebel (Creative)
- **ATS Parse Rate:** 60% (Displays `atsWarning` in UI)
- **Target:** UX Designers, Creative Directors, Portfolios.
- **Design:** Vibrant, bold, high visual impact with colored backgrounds and true two-column presentation. Best delivered as a PDF directly to hiring managers rather than through automated portals.

## Rendering Engine
Templates are rendered dynamically inside the `EditorPage` and when exporting to PDF. The engine injects the global `SlateData` object into the selected React component, dynamically rendering sections only if data is present.
