export interface User {
     id: string
     email: string
     fullName?: string
     phoneNumber?: string
     createdAt?: string
   }
   
   export interface UpdateMeRequest {
     fullName?: string
     phoneNumber?: string
   }
   
   export interface UpdateMeResponse {
     user: User
   }