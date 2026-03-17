// types/user.ts
export interface User {
  id: string
  email: string
  fullName: string | null
  phoneNumber: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserResponse {
  id: string
  email: string
  fullName: string | null
  phoneNumber: string | null
  isActive: boolean
  createdAt: Date
  updatedAt?: Date 
}

export interface UpdateMeInput {
  fullName?: string
  phoneNumber?: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

export interface AdminUpdateUserInput {
  fullName?: string
  phoneNumber?: string
  isActive?: boolean
}

export interface GetMeResponse {
  user: UserResponse
}

export interface UpdateMeResponse {
  user: UserResponse
}

export interface AdminUpdateUserResponse {
  user: UserResponse
}

export interface ChangePasswordResponse {
  success: boolean
  message?: string
}