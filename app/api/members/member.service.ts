import { APIError, ErrCode } from "encore.dev/api"
import { MemberRepo } from "./members.repo"
import { AuthRepo } from "../auth/auth.repo"
import type { Role, MemberResponse, AddMemberResponse, DeleteMemberResponse } from "./member.types"

export const MemberService = {
  async lists(organizationId: string): Promise<MemberResponse[]> {
    return MemberRepo.listByOrganization(organizationId)
  },

  async addMember(data: {
    userId: string
    organizationId: string
    role: Role
  }): Promise<AddMemberResponse> {
    const user = await AuthRepo.findUserById(data.userId)
    if (!user) {
      throw new APIError(ErrCode.NotFound, "User not found")
    }

    const existed = await AuthRepo.getMembershipByOrg(
      data.userId,
      data.organizationId
    )
    if (existed) {
      throw new APIError(
        ErrCode.AlreadyExists,
        "Member already in organization"
      )
    }

    await MemberRepo.addMember(data)
    return { success: true }
  },

  async updateMember(data: {
    userId: string
    organizationId: string
    role: Role
  }): Promise<MemberResponse> {
    const member = await AuthRepo.getMembershipByOrg(
      data.userId,
      data.organizationId
    )

    if (!member) {
      throw new APIError(
        ErrCode.NotFound,
        "Member not found in organization"
      )
    }

    await MemberRepo.updateMember(data)
    
    const user = await AuthRepo.findUserById(data.userId)
    if (!user) {
      throw new APIError(ErrCode.NotFound, "User not found")
    }

    return {
      userId: data.userId,
      email: user.email,
      fullName: user.fullName || null,
      role: data.role
    }
  },

  async deleteMember(data: {
    userId: string
    organizationId: string
  }): Promise<DeleteMemberResponse> {
    const member = await AuthRepo.getMembershipByOrg(
      data.userId,
      data.organizationId
    )

    if (!member) {
      throw new APIError(
        ErrCode.NotFound,
        "Member not found in organization"
      )
    }

    await MemberRepo.deleteMember(data)
    return { success: true }
  },
}