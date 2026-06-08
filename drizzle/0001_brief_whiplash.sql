ALTER TABLE "data_slates" ADD COLUMN "target_role" text;--> statement-breakpoint
ALTER TABLE "data_slates" ADD COLUMN "status" text DEFAULT 'Draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "data_slates" ADD COLUMN "latest_ats_score" integer;