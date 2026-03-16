import { apiClient } from "./apiClient"
import { Organization } from "@/types/org"

export const createOrganization = (data: { name: string }) => {
  return apiClient<{ organization: Organization }>("/v1/organizations/create", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const listOrganizations = async (): Promise<Organization[]> => {
  const res = await apiClient<{ organizations: Organization[] }>(
    "/v1/organizations",
    {
      method: "GET",
    }
  )
  return res.organizations
}


export const updateOrganization = async (id: string, data: { name: string }) => {
  return apiClient<{ organization: Organization }>(`/v1/organizations/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}


export const deleteOrganization = async (id: string) => {
  return apiClient<{ success: boolean }>(`/v1/organizations/${id}`, {
    method: "DELETE",
  })
}