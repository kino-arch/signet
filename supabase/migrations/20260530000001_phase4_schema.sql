-- Add columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_geo TEXT;

-- Create data_slates
CREATE TABLE IF NOT EXISTS data_slates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_target_optimized BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE data_slates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can CRUD own data_slates" ON data_slates;
CREATE POLICY "Users can CRUD own data_slates" ON data_slates FOR ALL USING (auth.uid() = user_id);

-- Create slate_sections
CREATE TABLE IF NOT EXISTS slate_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slate_id UUID REFERENCES data_slates(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  raw_content JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE slate_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can CRUD own sections" ON slate_sections;
CREATE POLICY "Users can CRUD own sections" ON slate_sections FOR ALL USING (
  EXISTS (
    SELECT 1 FROM data_slates WHERE id = slate_sections.slate_id AND user_id = auth.uid()
  )
);
