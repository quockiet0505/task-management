import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
     UpdateMeSchema,
     AdminUpdateUserSchema,
} from "../../../lib/validation/users"
import { UserService } from "./user.service"
import { requireRole } from "../../api/auth/authorization.service"

// Get current user 
export const getMe = api(
     { method: "GET", path: "/v1/users/me", auth: true },
     async () => {
          const auth = getAuthData()
          return UserService.getUserById(auth.userID)
     }
)

// Update current user details
export const updateMe = api(
     { method: "PUT", path:"/v1/users/update/me", auth: true},

     async(body: {
          fullName?: string,
          phoneNumber?: string,
     }) =>{
          
          const auth = getAuthData()
         
          // validate with UpdateMeSchema
          const input = UpdateMeSchema.parse(body)
          return UserService.updateMe(auth.userID, input)
     }
)

export const adminUpdateUser = api(
     { method: "PUT", path: "/v1/admin/users/:userId", auth: true },
     async (params: {
       userId: string
       fullName?: string
       phoneNumber?: string
       isActive?: boolean
     }) => {
       const auth = getAuthData()
   
       const { userId, ...body } = params
       const input = AdminUpdateUserSchema.parse(body)
   
       return UserService.adminUpdateUser(userId, input)
     }
   )
   