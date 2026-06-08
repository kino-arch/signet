-- ============================================================
-- Phase 2: Security Hardening
-- Enables RLS, creates audit logging, and hardens slate access
-- ============================================================

-- 1. Enable RLS on core tables (idempotent)
ALTER TABLE IF EXISTS data_slates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS slate_versions ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing permissive policies to avoid conflicts
--    (Optional: remove these lines if you have custom policies to preserve)
DROP POLICY IF EXISTS "Users can read own slates" ON data_slates;
DROP POLICY IF EXISTS "Users can create own slates" ON data_slates;
DROP POLICY IF EXISTS "Users can update own slates" ON data_slates;
DROP POLICY IF EXISTS "Users can delete own slates" ON data_slates;

DROP POLICY IF EXISTS "Users can read own slate versions" ON slate_versions;
DROP POLICY IF EXISTS "Users can create own slate versions" ON slate_versions;
DROP POLICY IF EXISTS "Users can update own slate versions" ON slate_versions;
DROP POLICY IF EXISTS "Users can delete own slate versions" ON slate_versions;

-- 3. data_slates: strict user-scoped access
CREATE POLICY "Users can read own slates"
ON data_slates FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create own slates"
ON data_slates FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own slates"
ON data_slates FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own slates"
ON data_slates FOR DELETE
USING (user_id = auth.uid());

-- 4. slate_versions: indirect ownership via data_slates
CREATE POLICY "Users can read own slate versions"
ON slate_versions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM data_slates
    WHERE data_slates.id = slate_versions.slate_id
    AND data_slates.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create own slate versions"
ON slate_versions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM data_slates
    WHERE data_slates.id = slate_versions.slate_id
    AND data_slates.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own slate versions"
ON slate_versions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM data_slates
    WHERE data_slates.id = slate_versions.slate_id
    AND data_slates.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM data_slates
    WHERE data_slates.id = slate_versions.slate_id
    AND data_slates.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own slate versions"
ON slate_versions FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM data_slates
    WHERE data_slates.id = slate_versions.slate_id
    AND data_slates.user_id = auth.uid()
  )
);

-- 5. Audit logging table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text NOT NULL,
  ip_address inet,
  user_agent text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 6. Audit log indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- 7. Lock down audit_logs: no direct user access
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "No user access to audit logs" ON audit_logs;
CREATE POLICY "No user access to audit logs"
ON audit_logs FOR ALL
USING (false)
WITH CHECK (false);
