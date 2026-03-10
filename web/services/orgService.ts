import { apiClient } from "./apiClient"
import {
  Organization,
  CreateOrganizationRequest,
  CreateOrganizationResponse,
} from "@/types/org"

export const createOrganization = (
  data: CreateOrganizationRequest
) => {
  return apiClient<CreateOrganizationResponse>("/v1/organizations/create", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const getOrganization = (id: string) => {
  return apiClient<Organization>(`/v1/organizations/${id}`, {
    method: "GET",
  })
}

export const getMyOrganization = () => {
  return apiClient<Organization>("/v1/organizations/my", {
    method: "GET",
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