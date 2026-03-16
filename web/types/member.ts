export type Role = "admin" | "member"

export interface Member {
  userId: string
  email: string
  fullName: string | null
  role: Role
  organizationId: string      
  organizationName?: string   
}

export interface AddMemberRequest {
  organizationId: string
  userId: string
  role: Role
}

export interface ListMembersParams {
  organizationId: string
}

export interface UpdateMemberRoleRequest {
  organizationId: string
  userId: string
  role: Role
}

export interface DeleteMemberRequest {
  organizationId: string
  userId: string
}