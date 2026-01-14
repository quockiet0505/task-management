import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  ListTaskSchema,
} from "../../../lib/validation/tasks"
import { TaskService } from "./task.service"
import type {
  CreateTaskInput,
  UpdateTaskInput,
  ListTaskInput,
} from "./task.types"
import { requireRole } from "../../api/auth/authorization.service"

// - `POST /v1/tasks` - List tasks (with filters)
// - `GET /v1/tasks/:id` - Get task details
// - `POST /v1/tasks/create` - Create task
// - `PUT /v1/tasks/:id` - Update task
// - `DELETE /v1/tasks/:id` - Delete task

export const listTasks = api(
  { method: "POST", path: "/v1/tasks", auth: true },
  async (body: ListTaskInput & { organizationId: string }) => {
    const input = ListTaskSchema.parse(body)
    const auth = getAuthData()

    await requireRole(auth.userID, body.organizationId, ["admin", "member"])

    return TaskService.list(input, body.organizationId)
  }
)

export const getTask = api(
  { method: "GET", path: "/v1/tasks/:id", auth: true },
  async (params: { id: string; organizationId: string }) => {
    const auth = getAuthData()
    await requireRole(auth.userID, params.organizationId, ["admin", "member"])
    return TaskService.get(params.id, params.organizationId)
  }
)

export const createTask = api(
  { method: "POST", path: "/v1/tasks/create", auth: true },
  async (body: CreateTaskInput & { organizationID: string; assignedTo?: string }) => {
    const input = CreateTaskSchema.parse(body)
    const auth = getAuthData()

    await requireRole(auth.userID, body.organizationID, ["admin"])

    return TaskService.create(
      { ...input, assignedTo: body.assignedTo },
      body.organizationID
    )
  }
)

export const updateTask = api(
  { method: "PUT", path: "/v1/tasks/:id", auth: true },
  async (params: { id: string } & UpdateTaskInput & { organizationID: string }) => {
    const input = UpdateTaskSchema.parse(params)
    const auth = getAuthData()
    await requireRole(auth.userID, params.organizationID, ["admin", "member"])

    return TaskService.update(params.id, input, params.organizationID)
  }
)

export const deleteTask = api(
  { method: "DELETE", path: "/v1/tasks/:id", auth: true },
  async (params: { id: string; organizationID: string }) => {
    const auth = getAuthData()
    await requireRole(auth.userID, params.organizationID, ["admin"])
    return TaskService.delete(params.id, params.organizationID)
  }
)
