CREATE TABLE "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"credits" integer DEFAULT 0 NOT NULL
);
