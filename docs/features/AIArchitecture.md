# AI Architecture (Signet v2.0)

## Overview
Signet v2.0 introduces a robust, multi-model AI architecture designed to ensure high availability, precision generation, and extreme resilience against provider downtime. The architecture runs entirely on Supabase Edge Functions, abstracting the complexity from the client.

## Cascading Fallback Chain
The core of the AI infrastructure is the `ai-client.ts` module, a unified interface that routes requests through a priority chain of LLM providers. If a primary provider fails (due to rate limits, 500s, or timeouts), the request automatically falls back to the next available provider.

### Model Hierarchy
1. **Tier 1 (NVIDIA NIM - Llama 3.3 70B Instruct):** Primary workhorse. Extremely fast, highly capable of structured JSON generation, and cost-effective for large context windows.
2. **Tier 2 (Google Gemini Pro):** Secondary fallback. Excellent reasoning capabilities and native JSON response formatting.
3. **Tier 3 (OpenAI GPT-4o):** Tertiary fallback. The most reliable fallback for complex semantic tasks.

## AI Edge Functions
The frontend communicates with the AI Engine via secure, authenticated POST requests to the following Supabase Edge Functions:

### 1. `reforge-datacore`
- **Purpose:** Rewrites entire work experience entries to match a specific Job Description (Target Lock) or a generic role.
- **Mechanism:** Takes the raw user input and a target job description, instructing the LLM to emphasize overlapping skills, adopt industry-standard terminology, and return the result as structured JSON (paragraphs and bullet points).

### 2. `score-impact`
- **Purpose:** Granular bullet-point analysis.
- **Mechanism:** Evaluates an array of individual highlights against the "FAANG XYZ Formula" (Accomplishment/Metric/Method). Returns a score (0-100), a diagnostic verdict (`needs_metrics`, `strong`, `faang_ready`), a list of missing elements, and a suggested rewrite.

### 3. `match-score`
- **Purpose:** Reverse-ATS gap analysis.
- **Mechanism:** Semantically compares the user's entire resume data slate (summary, experience, skills) against a provided Job Description. Outputs an overall match percentage, a strategic assessment (gap analysis), and an array of missing critical keywords.

### 4. `distill-competencies`
- **Purpose:** Automated skill taxonomy generation.
- **Mechanism:** Operates in two modes:
  - `extract`: Takes a raw text string and returns 5 highly relevant ATS keywords.
  - `infer_from_experience`: Iterates over the user's entire work history and infers categorical skills (e.g., Frontend, Backend, Tools) automatically.

## Security & Rate Limiting
- **Authentication:** All AI Edge Functions require a valid Supabase JWT Bearer token.
- **Secret Management:** API keys (NVIDIA, Gemini, OpenAI) are strictly stored in Supabase Edge Secrets and are never exposed to the client.
- **Data Privacy:** Prompts instruct the models to act as transient processors. User data is not stored or trained on by the APIs used in the production tier.
