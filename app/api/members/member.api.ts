import { api, APIError, ErrCode } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import {
  UpdateMemberSchema,
  AddMemberSchema,
} from "../../lib/validation/members"
import { MemberService } from "./member.service"
import { requireRole } from "../auth/authorization.service"
import { AuthRepo } from "../auth/auth.repo"
import type {
  AddMemberInput,
  UpdateMemberInput,
  ListMembersResponse,
  AddMemberResponse,
  UpdateMemberResponse,
  DeleteMemberResponse,
} from "./member.types"

// List members of organization
export const listMembersFromOrg = api(
  { method: "POST", path: "/v1/organization/:organizationId/members", auth: true, expose: true },
  async (params: { organizationId: string }): Promise<ListMembersResponse> => {
    const auth = getAuthData()

    await requireRole(auth.userID, params.organizationId, ["admin", "member"])

    const members = await MemberService.lists(params.organizationId)

    return { members }
  }
)

// Update member role in organization
export const updateMemberFromOrg = api(
  { method: "PUT", path: "/v1/organization/:organizationId/members/update", auth: true, expose: true },
  async (params: { organizationId: string } & UpdateMemberInput): Promise<UpdateMemberResponse> => {
    const auth = getAuthData()

    const validatedData = UpdateMemberSchema.parse({
      userId: params.userId,
      role: params.role
    })

    await requireRole(auth.userID, params.organizationId, ["admin"])

    const member = await MemberService.updateMember({
      userId: validatedData.userId!,
      organizationId: params.organizationId,
      role: validatedData.role!
    })

    return { member }
  }
)

// Delete member from organization
export const deleteMemberFromOrg = api(
  { method: "DELETE", path: "/v1/organization/:organizationId/members/delete", auth: true, expose: true },
  async (params: { organizationId: string; userId: string }): Promise<DeleteMemberResponse> => {
    const auth = getAuthData()

    await requireRole(auth.userID, params.organizationId, ["admin"])

    return MemberService.deleteMember({
      userId: params.userId,
      organizationId: params.organizationId
    })
  }
)

// Add member to organization by email
export const addToOrganization = api(
  { method: "POST", path: "/v1/organizations/members/add", auth: true, expose: true },
  async (body: AddMemberInput): Promise<AddMemberResponse> => {
    const { userID } = getAuthData()

    const validatedData = AddMemberSchema.parse(body)

    await requireRole(userID, validatedData.organizationId, ["admin"])

    const target = await AuthRepo.findUserByEmail(validatedData.email)

    if (!target) {
      throw new APIError(ErrCode.NotFound, "User to add not found")
    }

    if (!target.id) {
      throw new APIError(ErrCode.Internal, "User found but missing ID")
    }

    return MemberService.addMember({
      userId: target.id,
      organizationId: validatedData.organizationId,
      role: validatedData.role,
    })
  }
)