CREATE TABLE "user_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"template_id" text NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL,
	"unlocked_with" text DEFAULT 'credit' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_templates_unq" ON "user_templates" USING btree ("user_id","template_id");