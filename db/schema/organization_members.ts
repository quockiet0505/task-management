import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core"
import { users } from "./users"
import { organizations } from "./organizations"

export const organizationMembers = pgTable(
  "organization_members",
  {
    userId: uuid("user_id").references(() => users.id).notNull(),
    organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
    role: text("role").$type<"admin" | "member">().notNull(), // admin | member
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.organizationId] }),
  })
)
