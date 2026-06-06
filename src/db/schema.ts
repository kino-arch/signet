import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  credits: integer("credits").notNull().default(0),
})

export const dataSlates = pgTable("data_slates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  title: text("title").notNull(),
  targetRole: text("target_role"),
  status: text("status").default("Draft").notNull(),
  latestAtsScore: integer("latest_ats_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const skillCategories = pgTable("skill_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slateId: uuid("slate_id")
    .notNull()
    .references(() => dataSlates.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const keywords = pgTable("keywords", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => skillCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const industryTaxonomies = pgTable("industry_taxonomies", {
  id: uuid("id").primaryKey().defaultRandom(),
  industry: text("industry").notNull(),
  term: text("term").notNull(),
  category: text("category").notNull(),
  weight: integer("weight").notNull().default(1),
})

export const generationAudits = pgTable("generation_audits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  inputHash: text("input_hash").notNull(),
  modelUsed: text("model_used").notNull(),
  humanizationSteps: jsonb("humanization_steps"),
  finalScore: integer("final_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { LooseSnapshotSchema } from "../lib/db-validators"

export const slateVersions = pgTable(
  "slate_versions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slateId: uuid("slate_id")
      .notNull()
      .references(() => dataSlates.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    isDraft: boolean("is_draft").notNull().default(false),
    snapshotData: jsonb("snapshot_data").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    slateIdIdx: index("idx_slate_versions_slate_id").on(table.slateId),
    createdAtIdx: index("idx_slate_versions_created_at").on(table.createdAt),
    numberPerSlateIdx: uniqueIndex("idx_slate_versions_unq").on(
      table.slateId,
      table.isDraft,
      table.versionNumber
    ),
  })
)

export const insertSlateVersionSchema = createInsertSchema(slateVersions as any, {
  snapshotData: LooseSnapshotSchema,
})

export const selectSlateVersionSchema = createSelectSchema(slateVersions as any, {
  snapshotData: LooseSnapshotSchema,
})

export type SlateVersion = z.infer<typeof selectSlateVersionSchema>

export const userTemplates = pgTable("user_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  templateId: text("template_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
  unlockedWith: text("unlocked_with").notNull().default("credit"),
}, (table) => ({
  unq: uniqueIndex("idx_user_templates_unq").on(table.userId, table.templateId),
}))

