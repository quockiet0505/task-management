import { apiClient } from "./apiClient"
import { Member, Role } from "@/types/member"

export const listMembers = (organizationId: string) => {
  return apiClient<Member[]>(
    `/v1/organization/${organizationId}/members`,
    {
      method: "GET",
    }
  )
}

export const addMember = (data: {
  organizationId: string
  email: string
  role: Role
}) => {
  return apiClient<void>(
    "/v1/organizations/members/add",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
}