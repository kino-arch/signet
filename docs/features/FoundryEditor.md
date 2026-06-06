# The Forge Editor (Signet v2.0)

## Overview
The Forge Editor (`EditorPage.tsx`) is the central workspace where users construct their Signet. In v2.0, it has been completely re-architected from a stepped wizard into a highly dense, professional-grade single-page interface.

## Architecture & Layout
The Editor is split into a two-pane layout:
1. **The Array (Left Pane):** The input panel containing segmented components for data entry.
2. **The Holocron (Right Pane):** A live, real-time preview of the rendered resume template.

## State Management (`useDataSlateStore`)
All data entry flows strictly through Zustand via `useDataSlateStore.ts`. This store acts as the Single Source of Truth (SSOT).
- **Structure:** `SlateData` represents the entire document (`basics`, `work`, `education`, `skills`, `certifications`).
- **Persistence:** Local changes are continuously synced to the Supabase database (`data_slates` and `slate_sections` tables) using a debounced auto-save mechanism (`useAutoSave`).

## Core Input Arrays (Components)

### 1. Identity Core (`BasicInfoForm`)
Captures fundamental details: Name, Label, Contact Info, Location, and a Professional Summary.

### 2. Mission History Array (`MissionHistoryArray.tsx`)
The engine for work experience.
- Uses `@dnd-kit` for drag-and-drop reordering.
- Features the **HighlightsEditor** for managing discrete bullet points.
- Features the **ImpactScorePanel**, which connects to the `score-impact` AI edge function to grade bullets using the XYZ formula.
- Integrates the **Target Lock** `ReforgeModal` to rewrite entire work entries against specific job descriptions.

### 3. Core Competencies Array (`CoreCompetenciesArray.tsx`)
Manages technical skills and toolsets.
- Introduces **Auto-Detect From Experience**, which uses the `distill-competencies` AI to infer skills automatically from the Mission History data.
- Allows AI-powered extraction of keywords from raw plain-text input.

### 4. Educational & Certification Arrays
Dedicated components for tracking academic and professional credentials, with drag-and-drop sorting support.

## Export Engine
The Editor header houses the export controls:
1. **Export PDF:** Triggers the native browser print engine (with specialized `@media print` CSS overrides ensuring exact 1:1 fidelity and text-selectability).
2. **Export JSON:** Leverages `json-resume-export.ts` to map the internal `SlateData` to the open-source JSON Resume schema (v1.0.0), allowing users to download a `.json` file for maximum portability and data sovereignty.
