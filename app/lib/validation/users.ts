import {z} from "zod"

// update for user
export const UpdateMeSchema = z.object({
     fullName: z.string().min(1, "Full name is required").optional(),
     phoneNumber: z
          .string()
          .regex(/^(\+84|0)[3|5|7|8|9][0-9]{8}$/, "Invalid VN phone number")
          .optional(),

})

// update user for admin
export const AdminUpdateUserSchema = z.object({
     fullName: z.string().min(1, "Full name is required").optional(),
     phoneNumber: z
          .string()
          .regex(/^(\+84|0)[3|5|7|8|9][0-9]{8}$/, "Invalid VN phone number")
          .optional(),

     isActive: z.boolean().optional(),
})
