//   CreateMemberSchema,
//   UpdateMemberSchema,
//   ListMemberSchema,

import { z } from "zod"

export const CreateMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  userId: z.string().uuid("Invalid user ID"),
  role: z.enum(["admin", "member"]),
})

export const UpdateMemberSchema = CreateMemberSchema.partial()

