import { db } from "../../db"
import { tasks } from "../../db/schema/tasks"
import { organizations } from "../../db/schema/organizations" 
import { eq, and } from "drizzle-orm"

export const TaskRepo = {
  // create a new task
  create(data: {
    title: string
    status: "todo" | "in-progress" | "done"
    priority: "low" | "medium" | "high"
    organizationId: string
    assignedTo?: string
    assignedBy: string
    dueDate?: string
  }) {
    return db
      .insert(tasks)
      .values({
        title: data.title,
        status: data.status,
        priority: data.priority,
        organizationId: data.organizationId,
        assignedTo: data.assignedTo,
        assignedBy: data.assignedBy,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      })
      .returning()
      .then((r) => r[0])
  },

  // get task by id and org id
  async getById(id: string, orgId: string) {
    const result = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        status: tasks.status,
        priority: tasks.priority,
        organizationId: tasks.organizationId,
        organizationName: organizations.name,
        assignedBy: tasks.assignedBy,
        assignedTo: tasks.assignedTo,
        createdAt: tasks.createdAt,
        dueDate: tasks.dueDate,
      })
      .from(tasks)
      .innerJoin(organizations, eq(tasks.organizationId, organizations.id))
      .where(and(eq(tasks.id, id), eq(tasks.organizationId, orgId)))
      .limit(1)

    return result[0]
  },

  // list tasks by org
  async list(orgId: string, filter: { status?: string; priority?: string }) {
    const cond = [eq(tasks.organizationId, orgId)]
    if (filter.status) cond.push(eq(tasks.status, filter.status as any))
    if (filter.priority) cond.push(eq(tasks.priority, filter.priority as any))

    return db
      .select({
        id: tasks.id,
        title: tasks.title,
        status: tasks.status,
        priority: tasks.priority,
        organizationId: tasks.organizationId,
        organizationName: organizations.name,
        assignedBy: tasks.assignedBy,
        assignedTo: tasks.assignedTo,
        createdAt: tasks.createdAt,
        dueDate: tasks.dueDate,
      })
      .from(tasks)
      .innerJoin(organizations, eq(tasks.organizationId, organizations.id))
      .where(and(...cond))
  },

  // update task
  update(
    id: string,
    orgId: string,
    values: Partial<{
      title: string
      status: "todo" | "in-progress" | "done"
      priority: "low" | "medium" | "high"
      assignedTo: string
      dueDate: string
    }>
  ) {
    return db
      .update(tasks)
      .set({
        ...values,
        dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
      })
      .where(and(eq(tasks.id, id), eq(tasks.organizationId, orgId)))
      .returning()
      .then((r) => r[0])
  },

  delete(id: string, orgId: string) {
    return db.delete(tasks).where(and(eq(tasks.id, id), eq(tasks.organizationId, orgId)))
  },
}