export interface RegisterInput {
     email: string
     password: string
   }
   
   export interface LoginInput {
     email: string
     password: string
   }
   
  //  contain userID after authenticated
   export interface AuthData {
     userID: string
   }
   