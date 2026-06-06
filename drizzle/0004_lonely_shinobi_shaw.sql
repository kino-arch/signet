DROP INDEX "idx_slate_versions_number_per_slate";--> statement-breakpoint
ALTER TABLE "slate_versions" ADD COLUMN "is_draft" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "slate_versions" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_slate_versions_unq" ON "slate_versions" USING btree ("slate_id","is_draft","version_number");