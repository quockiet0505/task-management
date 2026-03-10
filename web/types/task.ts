export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  organizationId: string
  assignedTo?: string
}

export interface CreateTaskRequest {
     title: string
     status: TaskStatus
     priority: TaskPriority
     organizationID: string
     assignedTo?: string
   }
   
   export interface ListTasksRequest {
     organizationId: string
   }