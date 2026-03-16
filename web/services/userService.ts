import { apiClient } from "./apiClient"
import { UpdateMeRequest, UpdateMeResponse, User } from "@/types/user"

export const getMe = () => {
  return apiClient<User>("/v1/users/me", {
    method: "GET",
  })
}

export const updateMe = (data: UpdateMeRequest) => {
  return apiClient<UpdateMeResponse>("/v1/users/update/me", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}