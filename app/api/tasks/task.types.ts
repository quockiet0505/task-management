// task.types.ts
export interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  organizationId: string
  assignedBy: string
  assignedTo: string | null
  createdAt: Date
  dueDate: Date | null
}

export interface CreateTaskInput {
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  dueDate?: string
}

export interface UpdateTaskInput {
  title?: string
  status?: "todo" | "in-progress" | "done"
  priority?: "low" | "medium" | "high"
  dueDate?: string
}

export interface ListTaskInput {
  status?: "todo" | "in-progress" | "done"
  priority?: "low" | "medium" | "high"
}

// Response types
export interface ListTasksResponse {
  tasks: Task[]
}

export interface GetTaskResponse {
  task: Task
}

export interface CreateTaskResponse {
  task: Task
}

export interface UpdateTaskResponse {
  task: Task
}

export interface DeleteTaskResponse {
  success: boolean
}