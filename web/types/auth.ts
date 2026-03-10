export interface RegisterRequest {
     email: string
     password: string
   }
   
   export interface RegisterResponse {
     userId: string
     token: string
   }
   
   export interface LoginRequest {
     email: string
     password: string
   }
   
   export interface LoginResponse {
     userId: string
     token: string
   }

   