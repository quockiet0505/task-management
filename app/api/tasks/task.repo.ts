import { db } from "../../../db"
import { tasks } from "../../../db/schema/tasks"
import { eq, and } from "drizzle-orm"

export const TaskRepo = {
  create(data: any) {
    return db.insert(tasks).values(data).returning().then(r => r[0])
  },

  getById(id: string, orgId: string) {
    return db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.organizationId, orgId)))
      .limit(1)
      .then(r => r[0])
  },

  list(orgId: string, filter: any) {
    const cond = [eq(tasks.organizationId, orgId)]
    if (filter.status) cond.push(eq(tasks.status, filter.status))
    if (filter.priority) cond.push(eq(tasks.priority, filter.priority))

    return db.select().from(tasks).where(and(...cond))
  },

  update(id: string, orgId: string, values: any) {
    return db
      .update(tasks)
      .set(values)
      .where(and(eq(tasks.id, id), eq(tasks.organizationId, orgId)))
      .returning()
      .then(r => r[0])
  },

  delete(id: string, orgId: string) {
    return db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.organizationId, orgId)))
  },
}
