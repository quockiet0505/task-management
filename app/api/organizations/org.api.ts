// api
import { api } from "encore.dev/api"
import { OrganizationService } from "./org.service"
import { CreateOrganizationSchema, UpdateOrganizationSchema,  } from "../../../lib/validation/organizations"

export const createOrganization = api(
     { method: "POST", path: "/v1/organizations/create" },
     async (body: { name: string }) => {
     const input = CreateOrganizationSchema.parse(body)
     return OrganizationService.create({ name: input.name }, {
          organizationId: "", 
          role: "admin" 
     })
     }
)

export const updateOrganization = api(
     {method: "PUT", path: "/v1/organizations/:id"},
     async( params: {id: string} & {name: string} ) =>{
          // const input = UpdateOrganizationSchema.parse(params)
          return OrganizationService.update(
               {name: params.name},
               {
                    organizationId: params.id,
                    role: "admin"
               }
          )
     }
)

export const getOrganization = api(
     {method: "GET", path: "/v1/organizations/:id"},
     async(params: {id: string}) =>{
          return OrganizationService.getById(params.id)
     }
)