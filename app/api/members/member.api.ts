import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
  CreateMemberSchema,
  UpdateMemberSchema,
} from "../../../lib/validation/members"
import { MemberService } from "./member.service"
import { requireRole} from "../auth/authorization.service"

type Role = "admin" | "member"

// list member Organization
export const listMembers = api(
     {method: "POST", path:"/v1/organization/:organizationId/members", auth:true},
     async(params: {organizationId: string}) =>{
          const auth = getAuthData()
          
          // only admin and member can list members
          await requireRole(
               auth.userID,
               params.organizationId,
               ["admin", "member"]
          )

          return MemberService.lists(params.organizationId)
     }
)

// create member in organization

export const createMember = api(
     {method: "POST", path:"/v1/organization/:organizationId/members/create", auth:true},
     async(params: {organizationId: string} & {userId: string, role: Role}) =>{
          const input = CreateMemberSchema.parse(params)
          const auth = getAuthData()
          
          // only admin can add member
          await requireRole(
               auth.userID,
               params.organizationId,
               ["admin"]
          )

          return MemberService.addMember({
               userId: input.userId,
               organizationId: params.organizationId,
               role: input.role
          })
     }
)

// update member role in organization

export const updateMember = api(
     {method: "PUT", path:"/v1/organization/:organizationId/members/update", auth:true},
     async(params: {organizationId: string} & {userId: string, role: Role}) =>{
          // const input = UpdateMemberSchema.parse(params)
          const auth = getAuthData()
          
          // only admin can update member
          await requireRole(
               auth.userID,
               params.organizationId,
               ["admin"]
          )

          return MemberService.updateMember({
               userId: params.userId,
               organizationId: params.organizationId,
               role: params.role
          })
     }
)
// delete member from organization

export const deleteMember = api(
     {method: "DELETE", path:"/v1/organization/:organizationId/members/delete", auth:true},
     async(params: {organizationId: string} & {userId: string}) =>{
          const auth = getAuthData()
          
          // only admin can delete member
          await requireRole(
               auth.userID,
               params.organizationId,
               ["admin"]
          )

          return MemberService.deleteMember({
               userId: params.userId,
               organizationId: params.organizationId
          })
     }
)