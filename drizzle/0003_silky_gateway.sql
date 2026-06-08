CREATE INDEX "idx_slate_versions_slate_id" ON "slate_versions" USING btree ("slate_id");--> statement-breakpoint
CREATE INDEX "idx_slate_versions_created_at" ON "slate_versions" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_slate_versions_number_per_slate" ON "slate_versions" USING btree ("slate_id","version_number");