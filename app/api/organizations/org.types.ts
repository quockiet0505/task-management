// organizations/org.types.ts
export interface Organization {
     id: string
     name: string
     createdAt: Date
     updatedAt: Date
   }
   
   export interface CreateOrganizationInput {
     name: string
   }
   
   export interface OrganizationResponse {
     id: string
     name: string
   }
   
   export interface CreateOrganizationResponse {
     organization: OrganizationResponse
   }
   
   export interface GetOrganizationResponse {
     organization: OrganizationResponse
   }
   
   export interface ListOrganizationsResponse {
     organizations: OrganizationResponse[]
   }