import { apiClient } from "./apiClient"
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth"

export const registerUser = (data: RegisterRequest) => {
  return apiClient<RegisterResponse>("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const loginUser = (data: LoginRequest) => {
  return apiClient<LoginResponse>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
}