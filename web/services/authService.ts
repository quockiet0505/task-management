import { apiClient } from "./apiClient"
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth"

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient<{ auth: { userId: string; token: string } }>(
    "/v1/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  
  console.log(" Register raw response:", response)
  
  // Transform response
  return {
    userId: response.auth.userId,
    token: response.auth.token
  }
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient<{ auth: { userId: string; token: string } }>(
    "/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  
  console.log(" Login raw response:", response)
  
  // Transform response
  return {
    userId: response.auth.userId,
    token: response.auth.token
  }
}