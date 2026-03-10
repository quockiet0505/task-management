import { apiClient } from "./apiClient"
import { Task } from "@/types/task"

export const listTasks = (organizationId: string) => {
  return apiClient<Task[]>("/v1/tasks", {
    method: "POST",
    body: JSON.stringify({ organizationId }),
  })
}

export const createTask = (data: {
  title: string
  status: string
  priority: string
  organizationID: string
  assignedTo?: string
}) => {
  return apiClient<Task>("/v1/tasks/create", {
    method: "POST",
    body: JSON.stringify(data),
  })
}