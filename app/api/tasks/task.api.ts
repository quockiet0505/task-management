import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  ListTaskSchema,
} from "../../lib/validation/tasks"
import { TaskService } from "./task.service"
import type {
  CreateTaskInput,
  UpdateTaskInput,
  ListTaskInput,
  ListTasksResponse,
  GetTaskResponse,
  CreateTaskResponse,
  UpdateTaskResponse,
  DeleteTaskResponse,
} from "./task.types"
import { requireRole } from "../../api/auth/authorization.service"

export const listTasks = api(
  { method: "POST", path: "/v1/tasks", auth: true, expose: true },
  async (body: ListTaskInput & { organizationId: string }): Promise<ListTasksResponse> => {
    const input = ListTaskSchema.parse(body)
    const auth = getAuthData()

    await requireRole(auth.userID, body.organizationId, ["admin", "member"])

    const tasks = await TaskService.list(input, body.organizationId)

    return { tasks }  
  }
)

export const getTaskById = api(
  { method: "GET", path: "/v1/tasks/:id", auth: true, expose: true },
  async (params: { id: string; organizationId: string }): Promise<GetTaskResponse> => {
    const auth = getAuthData()
    await requireRole(auth.userID, params.organizationId, ["admin", "member"])

    const task = await TaskService.get(params.id, params.organizationId)

    return { task }  
  }
)

export const createTask = api(
  { method: "POST", path: "/v1/tasks/create", auth: true, expose: true },
  async (
    body: CreateTaskInput & {
      organizationId: string
      assignedTo?: string
    }
  ): Promise<CreateTaskResponse> => {
    const input = CreateTaskSchema.parse(body)
    const auth = getAuthData()

    await requireRole(auth.userID, body.organizationId, ["admin"])

    const task = await TaskService.create(
      {
        ...input,
        assignedBy: auth.userID,
        assignedTo: body.assignedTo,
      },
      body.organizationId
    )

    return { task }  
  }
)

export const updateTask = api(
  { method: "PUT", path: "/v1/tasks/:id", auth: true, expose: true },
  async (params: { id: string } & UpdateTaskInput & { organizationId: string }): Promise<UpdateTaskResponse> => {
    const input = UpdateTaskSchema.parse(params)
    const auth = getAuthData()
    await requireRole(auth.userID, params.organizationId, ["admin", "member"])

    const task = await TaskService.update(params.id, input, params.organizationId)

    return { task }  
  }
)

export const deleteTask = api(
  { method: "DELETE", path: "/v1/tasks/:id", auth: true, expose: true },
  async (params: { id: string; organizationId: string }): Promise<DeleteTaskResponse> => {
    const auth = getAuthData()
    await requireRole(auth.userID, params.organizationId, ["admin"])

    await TaskService.delete(params.id, params.organizationId)

    return { success: true }
  }
)