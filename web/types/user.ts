// types/user.ts
export interface User {
  id: string
  email: string
  fullName?: string | null
  phoneNumber?: string | null
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface UpdateMeRequest {
  fullName?: string | null
  phoneNumber?: string | null
}

export interface UpdateMeResponse {
  user: User
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}