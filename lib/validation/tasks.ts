import { z } from "zod"

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  status: z.enum(["todo", "in-progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().datetime().optional(),
})

export const UpdateTaskSchema = CreateTaskSchema.partial()

export const ListTaskSchema = z.object({
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().datetime().optional(),
})
