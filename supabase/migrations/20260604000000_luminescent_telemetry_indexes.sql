-- Luminescent Telemetry Migration
-- Based on supabase-postgres-best-practices

-- 1. Create a GIN index on the JSONB humanization_steps column for fast analytical querying
-- This allows us to efficiently query how many inferred, estimated, or verified bullets were generated
CREATE INDEX IF NOT EXISTS idx_generation_audits_humanization_steps 
ON generation_audits USING GIN (humanization_steps);

-- 2. Ensure RLS is enabled on generation_audits
ALTER TABLE generation_audits ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policy for generation_audits if it doesn't exist
DROP POLICY IF EXISTS "Users can view own generation_audits" ON generation_audits;
CREATE POLICY "Users can view own generation_audits" 
ON generation_audits 
FOR SELECT 
USING (auth.uid() = user_id);

-- System or service role inserts don't require an INSERT policy since they bypass RLS,
-- but we can add one for completeness if clients insert directly.
DROP POLICY IF EXISTS "Users can insert own generation_audits" ON generation_audits;
CREATE POLICY "Users can insert own generation_audits" 
ON generation_audits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);
