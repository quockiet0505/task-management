import { TaskRepo } from "./task.repo"
import { APIError, ErrCode } from "encore.dev/api"

export const TaskService = {
  create(input: any, orgId: string) {
    return TaskRepo.create({
      ...input,
      organizationId: orgId,
    })
  },

  get(id: string, orgId: string) {
    const task = TaskRepo.getById(id, orgId)
    if (!task) {
      throw new APIError(ErrCode.NotFound, "Task not found")
    }
    return task
  },

  list(filter: any, orgId: string) {
    return TaskRepo.list(orgId, filter)
  },

  update(id: string, input: any, orgId: string) {
    return TaskRepo.update(id, orgId, input)
  },

  delete(id: string, orgId: string, role: string) {
    if (role !== "admin") {
      throw new APIError(
        ErrCode.PermissionDenied,
        "Admin only"
      )
    }
    return TaskRepo.delete(id, orgId)
  },
}
