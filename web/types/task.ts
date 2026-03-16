export type TaskStatus = "todo" | "in-progress" | "done"

export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority

  organizationId: string

  assignedTo?: string
  assignedBy?: string

  createdAt?: string
  dueDate?: string
}

export interface CreateTaskRequest {
  title: string
  status: TaskStatus
  priority: TaskPriority
  organizationId: string
  assignedTo?: string
}

export interface ListTasksRequest {
  organizationId: string
  status?: TaskStatus
  priority?: TaskPriority
}

export interface ListTasksResponse {
  tasks: Task[]
}