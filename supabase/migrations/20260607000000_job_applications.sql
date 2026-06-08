CREATE TABLE IF NOT EXISTS "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"status" text NOT NULL,
	"date_added" timestamp with time zone DEFAULT now() NOT NULL,
	"salary" text,
	"location" text,
	"notes" text,
	"url" text,
	"job_description" text,
	"match_score" jsonb
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can CRUD own job applications" ON job_applications;
CREATE POLICY "Users can CRUD own job applications" ON job_applications FOR ALL USING (auth.uid() = user_id);
