# Data Flow Architecture (Signet v2.0)

## The Single Source of Truth
In Signet v2.0, the data flow for the core resume builder relies entirely on `useDataSlateStore`, backed by Supabase PostgreSQL. The architecture completely decouples the **Editor UI State** from the **Resume Content Data**.

## Database Schema Model
Resume content is stored relationally to allow dynamic querying, scaling, and targeted AI operations without pulling massive monolithic JSON blobs constantly.

1. **`data_slates` table:** The master record for a specific resume. Links to `auth.users`.
2. **`slate_sections` table:** The segmented content blocks (e.g., `basics`, `work`, `education`, `skills`). Each section is stored as `jsonb` under `raw_content`.

## The Sync Lifecycle

### 1. Initialization (Hydration)
When the Editor mounts, it calls `hydrateSlate(slateId)`.
- A Supabase query fetches the `data_slates` row and all associated `slate_sections`.
- The raw JSONB is mapped into the `SlateData` interface (`Basics`, `WorkEntry[]`, etc.) and loaded into Zustand memory.
- The UI renders based on this memory state.

### 2. Mutation (Client-Side)
When a user types into an input field (e.g., updating a job title):
- An action is dispatched to `useDataSlateStore` (e.g., `updateWorkEntry(id, partialData)`).
- The Zustand state updates instantly in memory, triggering a React re-render.
- The real-time preview (The Holocron) updates instantly.

### 3. Synchronization (Auto-Save)
To prevent constant, heavy database writes on every keystroke, Signet utilizes an optimistic auto-save mechanism (`useAutoSave.ts` hook).
- A watcher observes changes to the `SlateData` object in Zustand.
- If a change is detected, a debounce timer (1000ms) is started.
- Upon timer completion, an async queue serializes the specific section that changed and executes an `upsert` to the `slate_sections` table in Supabase.
- The sync state indicator in the UI updates (Synced, Syncing, Error).

## AI Request Data Flow
When an AI Edge Function is invoked (e.g., Target Lock or XYZ Scoring):
1. The relevant partial state (e.g., a single `WorkEntry`) is extracted from `useDataSlateStore` memory.
2. It is sent as a JSON payload to the Edge Function via POST.
3. The Edge Function processes the payload and returns the transformed JSON.
4. The client dispatches a mutation action (e.g., `updateWorkEntry`) with the AI's response.
5. The Auto-Save watcher detects the mutation and syncs the AI-generated content to Supabase automatically.
