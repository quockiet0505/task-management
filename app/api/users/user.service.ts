import {APIError, ErrCode} from "encore.dev/api"
import {UserRepo} from "./user.repo"
import bcrypt from "bcryptjs"

export const UserService = {
     // get user by id
     async getUserById(userId: string) {
     const user = await UserRepo.getById(userId)
     if (!user) {
          throw new APIError(ErrCode.NotFound, "User not found")
     }

     // check user active
     if(!user.isActive){
          throw new APIError(ErrCode.PermissionDenied, "User is inactive")
     }
     return user
     },

     // update user
     async updateMe(userId: string, 
          data: {
               fullName?: string,
               phoneNumber?: string
          }
     ){
          const user = await UserRepo.getById(userId)

          // check user exists
          if(!user){
               throw new APIError(ErrCode.NotFound, "User not found")
          }

          
          // check user active
          if(!user.isActive){
               throw new APIError(ErrCode.PermissionDenied, "User is inactive")
          }

          const updated = await UserRepo.update(userId, data)
          return updated
     },

     // admin 

     async adminUpdateUser(
          targetUserId: string,
          data: {
          fullName?: string
          phoneNumber?: string
          isActive?: boolean
          }
     ) {
          const user = await UserRepo.getById(targetUserId)
          if (!user) {
          throw new APIError(ErrCode.NotFound, "User not found")
          }
     
          return UserRepo.update(targetUserId, data)
     },

     async changePassword(userId: string, currentPassword: string, newPassword: string) {
          const user = await UserRepo.getById(userId)
          
          if (!user) {
            throw new APIError(ErrCode.NotFound, "User not found")
          }
          
          // Verify current password
          const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
          if (!isValid) {
            throw new APIError(ErrCode.InvalidArgument, "Current password is incorrect")
          }
          
          // Hash new password
          const newHash = await bcrypt.hash(newPassword, 10)
          
          // Update password và updated_at
          await UserRepo.update(userId, { 
            passwordHash: newHash,
            updatedAt: new Date()
          })
          
          return { success: true }
        }
}