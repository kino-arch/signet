CREATE TABLE "slate_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slate_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"snapshot_data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "slate_versions" ADD CONSTRAINT "slate_versions_slate_id_data_slates_id_fk" FOREIGN KEY ("slate_id") REFERENCES "public"."data_slates"("id") ON DELETE cascade ON UPDATE no action;