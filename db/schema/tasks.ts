import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { organizations } from "./organizations"
import { users } from "./users"

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  status: text("status").$type<"todo" | "in-progress" | "done">().notNull(),
  priority: text("priority").$type<"low" | "medium" | "high">().notNull(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id)
    .notNull(),
  assignedTo: uuid("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  dueDate: timestamp("due_date"),
})
