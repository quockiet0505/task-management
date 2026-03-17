import { TaskRepo } from "./task.repo"
import { APIError, ErrCode } from "encore.dev/api"
import { MemberRepo } from "../members/members.repo"
import type { CreateTaskInput, UpdateTaskInput, Task } from "./task.types"

export const TaskService = {
  async create(input: CreateTaskInput & { assignedBy: string; assignedTo?: string }, orgId: string): Promise<Task> {
    // check assigned_to là member của org
    if (input.assignedTo) {
      const member = await MemberRepo.findByUserAndOrg(
        input.assignedTo,
        orgId
      )
  
      if (!member) {
        throw new APIError(
          ErrCode.PermissionDenied,
          "Assigned user is not a member of this organization"
        )
      }
    }
  
    const task = await TaskRepo.create({
      ...input,
      organizationId: orgId,
    })

    return { ...task, assignedBy: task.assignedBy || "" }
  },

  // get task by id
  async get(id: string, orgId: string): Promise<Task> {
    const task = await TaskRepo.getById(id, orgId)
    if (!task) {
      throw new APIError(ErrCode.NotFound, "Task not found")
    }
    return task
  },

  // list tasks
  async list(filter: { status?: string; priority?: string }, orgId: string): Promise<Task[]> {
    return TaskRepo.list(orgId, filter)
  },

  // update task by task-id and org-id
  async update(id: string, input: UpdateTaskInput, orgId: string): Promise<Task> {
    const updated = await TaskRepo.update(id, orgId, input)
    if (!updated) {
      throw new APIError(ErrCode.NotFound, "Task not found")
    }
    return updated
  },

  async delete(id: string, orgId: string): Promise<{ success: boolean }> {
    await TaskRepo.delete(id, orgId)
    return { success: true }
  },
}