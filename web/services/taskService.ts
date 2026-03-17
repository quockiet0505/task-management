import { apiClient } from "./apiClient"
import { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types/task"

export const listTasks = async (organizationId: string): Promise<Task[]> => {
  const res = await apiClient<{ tasks: Task[] }>("/v1/tasks", {
    method: "POST",
    body: JSON.stringify({ organizationId }),
  })
  return res?.tasks ?? []
}

export const createTask = async (data: CreateTaskRequest): Promise<Task> => {
  console.log("Creating task with data:", data) // Debug
  const res = await apiClient<{ task: Task }>("/v1/tasks/create", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return res.task
}

export const updateTask = async (
  id: string,
  data: UpdateTaskRequest
): Promise<Task> => {
  console.log(`Updating task ${id} with:`, data) // Debug
  const res = await apiClient<{ task: Task }>(`/v1/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return res.task
}

export const deleteTask = async (
  id: string,
  organizationId: string
): Promise<{ success: boolean }> => {
  const res = await apiClient<{ success: boolean }>(`/v1/tasks/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ organizationId }),
  })
  return res
}