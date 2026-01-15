import { api, APIError, ErrCode  } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
  CreateMemberSchema,
  UpdateMemberSchema,
  AddMemberSchema,
} from "../../../lib/validation/members"
import { MemberService } from "./member.service"
import { requireRole} from "../auth/authorization.service"
import { AuthRepo } from "../auth/auth.repo"

type Role = "admin" | "member"

// list member Organization
export const listMembersFromOrg = api(
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

// update member role in organization

export const updateMemberFromOrg = api(
     {method: "PUT", path:"/v1/organization/:organizationId/members/update", auth:true},
     async(params: {organizationId: string} & {userId: string, role: Role}) =>{
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

export const deleteMemberFromOrg = api(
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

type AddMemberInput = {
  organizationId: string;
  userId: string;
  role: "admin" | "member";
}

// Admin-only
export const addToOrganization = api(
  { method: "POST", path: "/v1/organizations/members/add", auth: true },
  async (body: AddMemberInput): Promise<void> => {
    const input = AddMemberSchema.parse(body)
    const { userID } = getAuthData()

    // Only org admins
    await requireRole(userID, input.organizationId, ["admin"])

    // Ensure target user exists
    const target = await AuthRepo.findUserById(input.userId)
    if (!target) {
      throw new APIError(ErrCode.NotFound, "User to add not found")
    }

    // Add membership
    await AuthRepo.addMember({
      userId: input.userId,
      organizationId: input.organizationId,
      role: input.role,
    })
  }
)