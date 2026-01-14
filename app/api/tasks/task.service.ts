import { TaskRepo } from "./task.repo"
import { APIError, ErrCode } from "encore.dev/api"

export const TaskService = {
  async create(input: any, orgId: string) {
    return TaskRepo.create({
      ...input,
      organizationId: orgId,
    })
  },

  async get(id: string, orgId: string) {
    const task = await TaskRepo.getById(id, orgId)
    if (!task) {
      throw new APIError(ErrCode.NotFound, "Task not found")
    }
    return task
  },

  async list(filter: any, orgId: string) {
    return TaskRepo.list(orgId, filter)
  },

  async update(id: string, input: any, orgId: string) {
    const updated = await TaskRepo.update(id, orgId, input)
    if (!updated) {
      throw new APIError(ErrCode.NotFound, "Task not found")
    }
    return updated
  },

  async delete(id: string, orgId: string) {
    const res = await TaskRepo.delete(id, orgId)
    return res
  },
}
