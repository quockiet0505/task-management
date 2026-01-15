import { APIError, ErrCode } from "encore.dev/api"
import { MemberRepo } from "./members.repo"
import { AuthRepo } from "../auth/auth.repo"

type Role = "admin" | "member"

export const MemberService = {
  async lists(organizationId: string) {
    return MemberRepo.listByOrganization(organizationId)
  },

  // add member to org
  async addMember(data: {
    userId: string
    organizationId: string
    role: Role
  }) {
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
    return { message: "Member added successfully" }
  },

  // update member role in org
  async updateMember(data: {
    userId: string
    organizationId: string
    role: Role
  }) {
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
  },

  async deleteMember(data: {
    userId: string
    organizationId: string
  }) {
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
  },
}
