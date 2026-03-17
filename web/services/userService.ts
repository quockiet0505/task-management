import { apiClient } from "./apiClient"
import { UpdateMeRequest, User } from "@/types/user"

export const getMe = async (): Promise<User> => {
  const res = await apiClient<{ user: User }>("/v1/users/me", {
    method: "GET",
  })
  return res.user 
}

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const res = await apiClient<{ user: User }>("/v1/users/update/me", {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return res.user
}

export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<boolean> => {
  const res = await apiClient<{ success: boolean }>("/v1/users/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return res.success
}