
import { OrganizationRepo } from "./org.repo"
import { APIError, ErrCode } from "encore.dev/api"
import { AuthRepo } from "../auth/auth.repo"

export const OrganizationService = {
  async create(input: { name: string }, userId: string) {
    const org = await OrganizationRepo.create({ name: input.name })

    await AuthRepo.addMember({
      userId,
      organizationId: org.id,
      role: "admin",
    })

    return org
  },

  async getById(id: string) {
    const org = await OrganizationRepo.getById(id)
    if (!org) {
      throw new APIError(ErrCode.NotFound, "Organization not found")
    }
    return org
  },

  async getMyOrganization(userId: string) {
    const org = await OrganizationRepo.getByUserId(userId)
  
    if (!org) {
      throw new APIError(
        ErrCode.NotFound,
        "User does not belong to any organization"
      )
    }
  
    return org
  },

  async listByUser(userId: string) {
    return OrganizationRepo.listByUser(userId)
  }
  
}
