export interface Organization{
     id: string
     name: string
     createdAt?: string
}

export interface CreateOrganizationRequest {
     name: string
}

export interface CreateOrganizationResponse {
     id: string
}

export interface GetOrganizationParams {
     id: string
   }