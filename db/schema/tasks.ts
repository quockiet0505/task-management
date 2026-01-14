import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { organizations } from "./organizations"
import { users } from "./users"

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(),      // todo | in-progress | done
  priority: text("priority").notNull(),  // low | medium | high
  organizationId: uuid("organization_id")
    .references(() => organizations.id)
    .notNull(),
  assignedTo: uuid("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
