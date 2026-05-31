CREATE TABLE IF NOT EXISTS target_lock_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_key TEXT NOT NULL UNIQUE, -- lowercase, trimmed company name + job title
  company_intel JSONB NOT NULL,
  briefing JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '48 hours')
);

CREATE INDEX IF NOT EXISTS idx_target_lock_company ON target_lock_cache(company_key);
CREATE INDEX IF NOT EXISTS idx_target_lock_expires ON target_lock_cache(expires_at);

-- Set up Row Level Security (RLS) - Edge functions bypass this via Service Role Key
ALTER TABLE target_lock_cache ENABLE ROW LEVEL SECURITY;
