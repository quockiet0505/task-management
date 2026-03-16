import { apiClient } from "./apiClient"
import { Member, Role, UpdateMemberRoleRequest, DeleteMemberRequest } from "@/types/member"

export const listMembers = async (organizationId: string): Promise<Member[]> => {
  const res = await apiClient<{ members: Member[] }>(
    `/v1/organization/${organizationId}/members`,
    {
      method: "POST",
    }
  )
  return res?.members ?? []
}

export const addMember = async (data: {
  organizationId: string
  email: string
  role: Role
}): Promise<boolean> => {
  const res = await apiClient<{ success: boolean }>(
    "/v1/organizations/members/add",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  return res.success
}

export const updateMemberRole = async (data: UpdateMemberRoleRequest): Promise<Member> => {
  const res = await apiClient<{ member: Member }>(
    `/v1/organization/${data.organizationId}/members/update`,
    {
      method: "PUT",
      body: JSON.stringify({
        userId: data.userId,
        role: data.role
      }),
    }
  )
  return res.member
}

export const deleteMember = async (data: DeleteMemberRequest): Promise<boolean> => {
  const res = await apiClient<{ success: boolean }>(
    `/v1/organization/${data.organizationId}/members/delete`,
    {
      method: "DELETE",
      body: JSON.stringify({ userId: data.userId }),
    }
  )
  return res.success
}