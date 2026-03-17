export type TaskStatus = "todo" | "in-progress" | "done"

export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  organizationId: string
  organizationName?: string  
  assignedTo?: string
  assignedBy?: string
  createdAt?: Date
  dueDate?: Date | null  
}

export interface CreateTaskRequest {
  title: string
  status: TaskStatus
  priority: TaskPriority
  organizationId: string
  assignedTo?: string
  dueDate?: Date  
}

export interface UpdateTaskRequest {
  title?: string
  status?: TaskStatus
  priority?: TaskPriority
  organizationId: string
  assignedTo?: string
  dueDate?: Date 
}

export interface ListTasksRequest {
  organizationId: string
  status?: TaskStatus
  priority?: TaskPriority
}

export interface ListTasksResponse {
  tasks: Task[]
}