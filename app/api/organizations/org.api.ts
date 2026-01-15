import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import { OrganizationService } from "./org.service"
import { CreateOrganizationSchema } from "../../../lib/validation/organizations"

interface CreateOrganizationInput {
  name: string;
}

export const createOrganization = api(
  { method: "POST", path: "/v1/organizations/create", auth: true },
  async (body: CreateOrganizationInput): Promise<{ id: string }> => {
    const input = CreateOrganizationSchema.parse(body)
    const { userID } = getAuthData()
    return OrganizationService.create(input, userID)
  }
)

export const getOrganizationById = api(
     {method: "GET", path: "/v1/organizations/:id"},
     async(params: {id: string}) =>{
          return OrganizationService.getById(params.id)
     }
)