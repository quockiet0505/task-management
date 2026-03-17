export type Role = "owner" | "admin" | "member"

export interface MemberResponse {
  userId: string
  email: string
  fullName: string | null
  role: Role
}

export interface AddMemberInput {
  organizationId: string
  email: string
  role: Role
}

export interface UpdateMemberInput {
  userId: string
  organizationId: string
  role: Role
}

export interface ListMembersResponse {
  members: MemberResponse[]
}

export interface AddMemberResponse {
  success: boolean
}

export interface UpdateMemberResponse {
  member: MemberResponse
}

export interface DeleteMemberResponse {
  success: boolean
}