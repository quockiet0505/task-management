import { TimestampFsp } from "drizzle-orm/mysql-core"

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
