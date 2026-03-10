export type Role = "admin" | "member"

export interface Member {
  userId: string
  organizationId: string
  role: Role
}

export interface AddMemberRequest {
     organizationId: string
     userId: string
     role: Role
   }
   
   export interface ListMembersParams {
     organizationId: string
   }   