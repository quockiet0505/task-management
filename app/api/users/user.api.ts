import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
  UpdateMeSchema,
  AdminUpdateUserSchema,
  ChangePasswordSchema
} from "../../lib/validation/users"
import { UserService } from "./user.service"
import { requireRole } from "../../api/auth/authorization.service"

import type {
  UpdateMeInput,
  AdminUpdateUserInput,
  GetMeResponse,
  UpdateMeResponse,
  AdminUpdateUserResponse
} from "./user.types"

// Get current user 
export const getMe = api(
  { method: "GET", path: "/v1/users/me", auth: true , expose: true},
  async (): Promise<GetMeResponse> => {
    const auth = getAuthData()
    const user = await UserService.getUserById(auth.userID)

    return { user }
  }
)

// Update current user details
export const updateMe = api(
  { method: "PUT", path:"/v1/users/update/me", auth: true, expose: true},
  async(body: UpdateMeInput): Promise<UpdateMeResponse> => {
    const auth = getAuthData()
    
    // validate with UpdateMeSchema
    const input = UpdateMeSchema.parse(body)

    const user = await UserService.updateMe(auth.userID, input)

    return { user }
  }
)

export const adminUpdateUser = api(
  { method: "PUT", path: "/v1/admin/users/:userId", auth: true , expose: true},
  async (params: AdminUpdateUserInput & { userId: string }): Promise<AdminUpdateUserResponse> => {
    const auth = getAuthData()

    const { userId, ...body } = params
    const input = AdminUpdateUserSchema.parse(body)

    const user = await UserService.adminUpdateUser(userId, input)

    return { user }
  }
)

// change password
export const changePassword = api(
  { method: "POST", path: "/v1/users/change-password", auth: true, expose: true },
  async (body: { currentPassword: string; newPassword: string }): Promise<{ success: boolean }> => {
    const auth = getAuthData()
    const input = ChangePasswordSchema.parse(body)
    
    await UserService.changePassword(auth.userID, input.currentPassword, input.newPassword)
    
    return { success: true }
  }
)