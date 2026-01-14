export interface CreateTaskInput {
     title: string
     status: "todo" | "in-progress" | "done"
     priority: "low" | "medium" | "high"
   }
   
   export interface UpdateTaskInput {
     title?: string
     status?: "todo" | "in-progress" | "done"
     priority?: "low" | "medium" | "high"
   }
   
   export interface ListTaskInput {
     status?: "todo" | "in-progress" | "done"
     priority?: "low" | "medium" | "high"
   }
   