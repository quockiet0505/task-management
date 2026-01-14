import {z} from "zod"

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
})

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial()

export const ListOrganizationsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
})

