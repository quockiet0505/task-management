import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import { OrganizationService } from "./org.service"
import { CreateOrganizationSchema } from "../../lib/validation/organizations"

export interface CreateOrganizationInput {
  name: string;
}

export interface OrganizationResponse {
  id: string;
  name: string;
}

export interface ListOrganizationsResponse {
  organizations: OrganizationResponse[];
}

export const createOrganization = api(
  { method: "POST", path: "/v1/organizations/create", auth: true, expose: true },
  async (body: CreateOrganizationInput): Promise<{ id: string }> => {
    const input = CreateOrganizationSchema.parse(body)
    const { userID } = getAuthData()
    
    const org = await OrganizationService.create(input, userID)
    return { id: org.id }
  }
)

export const getOrganizationById = api(
  { method: "GET", path: "/v1/organizations/:id", auth: true, expose: true }, 
  async (params: { id: string }): Promise<OrganizationResponse> => {
    const org = await OrganizationService.getById(params.id)
    return { id: org.id, name: org.name }
  }
)

export const getMyOrganization = api(
  { method: "GET", path: "/v1/organizations/my", auth: true , expose: true},
  async (): Promise<OrganizationResponse> => {
    const { userID } = getAuthData()
    const org = await OrganizationService.getMyOrganization(userID)
    return { id: org.id, name: org.name }
  }
)

export const listOrganizations = api(
  { method: "GET", path: "/v1/organizations", auth: true , expose: true},
  async (): Promise<ListOrganizationsResponse> => {
    const { userID } = getAuthData()
    const orgs = await OrganizationService.listByUser(userID)
    
    return { organizations: orgs }
  }
)