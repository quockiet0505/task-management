import { APIError, ErrCode} from "encore.dev/api"
import { MemberRepo } from "./members.repo"
import { AuthRepo } from "../auth/auth.repo"

type Role = "admin" | 'member'

export const MemberService = {
     // getMyOrganizations
     async lists(organizationId: string){
          return MemberRepo.listByOrganization(organizationId)
     },
     
     // create member
     async addMember(data: {
          userId: string,
          organizationId: string,
          role: Role
     }){
          // check email existing
          const existing = await AuthRepo.findUserByEmail(data.userId)

          if(existing){
               throw new APIError(ErrCode.AlreadyExists, "Email already exists")
          }

          // check member existed in organization
          const existingMember = await AuthRepo.getMembershipByOrg(
               data.userId,
               data.organizationId
          )

          if(existingMember){
               throw new APIError(ErrCode.AlreadyExists, "Member already in organization")
          }

          // add member
          await MemberRepo.addMember({
               userId: data.userId,
               organizationId: data.organizationId,
               role: data.role
          })

          // create Success
          return {message: "Member added successfully"}
          
     },

     // update role for member
     async updateMember(data: {
          userId: string,
          organizationId: string,
          role: Role
     }){
          // check member existed in organization
          const existingMember = await AuthRepo.getMembershipByOrg(
               data.userId,
               data.organizationId
          )

          if(existingMember){
               throw new APIError(ErrCode.NotFound, "Member not found in organization")
          }

          // update member role
          await MemberRepo.updateMember({
               userId: data.userId,
               organizationId: data.organizationId,
               role: data.role
          })
     },

     // delete member
     async deleteMember(data: {
          userId: string,
          organizationId: string
     }){
           // check member existed in organization
           const existingMember = await AuthRepo.getMembershipByOrg(
               data.userId,
               data.organizationId
          )

          if(existingMember){
               throw new APIError(ErrCode.NotFound, "Member not found in organization")
          }

          // delete member
          await MemberRepo.deleteMember({
               userId: data.userId,
               organizationId: data.organizationId
          })
     }
}