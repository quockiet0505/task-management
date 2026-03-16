
import { z } from "zod"

export const CreateMemberSchema = z.object({
  email: z.email("Invalid email address"),
  userId: z.uuid("Invalid user ID"),
  role: z.enum(["admin", "member"]),
})

export const UpdateMemberSchema = CreateMemberSchema.partial()

// Input schema
 export const AddMemberSchema = z.object({
  organizationId: z.uuid(),
  email: z.email(),
  role: z.enum(["admin", "member"]),
})


