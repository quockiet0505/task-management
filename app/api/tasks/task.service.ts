import { TaskRepo } from "./task.repo"
import { APIError, ErrCode } from "encore.dev/api"
import { MemberRepo } from "../members/members.repo"

export const TaskService = {

  async create(input: any, orgId: string) {
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
  
    return TaskRepo.create({
      ...input,
      organizationId: orgId,
    })
  },
  

  // get task by id
  async get(id: string, orgId: string) {
    const task = await TaskRepo.getById(id, orgId)
    if (!task) {
      throw new APIError(ErrCode.NotFound, "Task not found")
    }
    return task
  },

  // list tasks
  async list(filter: any, orgId: string) {
    return TaskRepo.list(orgId, filter)
  },

  // update task by task-id and org-id
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
