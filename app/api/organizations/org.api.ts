import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import { OrganizationService } from "./org.service"
import { CreateOrganizationSchema } from "../../lib/validation/organizations"

import type { 
  CreateOrganizationInput,
  OrganizationResponse,
  ListOrganizationsResponse,
  CreateOrganizationResponse,
  GetOrganizationResponse
} from "./org.types"

export const createOrganization = api(
  { method: "POST", path: "/v1/organizations/create", auth: true, expose: true },
  async (body: CreateOrganizationInput): Promise<CreateOrganizationResponse> => {
    const input = CreateOrganizationSchema.parse(body)
    const { userID } = getAuthData()

    const org = await OrganizationService.create(input, userID)

    return {
      organization: {
        id: org.id,
        name: org.name
      }
    }
  }
)

export const getOrganizationById = api(
  { method: "GET", path: "/v1/organizations/:id", auth: true, expose: true }, 
  async (params: { id: string }): Promise<GetOrganizationResponse> => {
    const org = await OrganizationService.getById(params.id)

    return {
      organization: { id: org.id, name: org.name }
    }
  }
)

export const getMyOrganization = api(
  { method: "GET", path: "/v1/organizations/my", auth: true , expose: true},
  async (): Promise<GetOrganizationResponse> => {
    const { userID } = getAuthData()
    const org = await OrganizationService.getMyOrganization(userID)

    return {
      organization: { id: org.id, name: org.name }
    }
  }
)

export const listOrganizations = api(
  { method: "GET", path: "/v1/organizations", auth: true , expose: true},
  async (): Promise<ListOrganizationsResponse> => {
    const { userID } = getAuthData()
    const orgs = await OrganizationService.listByUser(userID)

    return {
      organizations: orgs
    }
  }
)