import { APIError, ErrCode } from "encore.dev/api"
import { AuthRepo } from "./auth.repo"

export type Role = "owner" | "admin" | "member"

export async function requireRole(
  userId: string,
  organizationId: string,
  allowedRoles: Role[]
) {
  const member = await AuthRepo.getMembershipByOrg(userId, organizationId)

  if (!member) {
    throw new APIError(ErrCode.PermissionDenied, "Not a member of the organization")
  }

  // Owner có tất cả quyền
  if (member.role === "owner") {
    return member
  }

  if (!allowedRoles.includes(member.role)) {
    throw new APIError(ErrCode.PermissionDenied, "Insufficient role permissions")
  }

  return member
}

export async function canUpdateMemberRole(
  actorId: string,  
  targetUserId: string,
  organizationId: string,
  newRole: Role
) {
  const actor = await AuthRepo.getMembershipByOrg(actorId, organizationId)
  if (!actor) {
    throw new APIError(ErrCode.PermissionDenied, "Actor not a member")
  }

  const target = await AuthRepo.getMembershipByOrg(targetUserId, organizationId)
  if (!target) {
    throw new APIError(ErrCode.NotFound, "Target member not found")
  }

  if (actorId === targetUserId) {
    throw new APIError(ErrCode.PermissionDenied, "Cannot change your own role")
  }

  if (actor.role === "owner") {
    if (newRole === "owner") {
      throw new APIError(ErrCode.PermissionDenied, "Cannot create another owner")
    }
    return true
  }

  if (actor.role === "admin") {
    if (target.role === "admin") {
      throw new APIError(ErrCode.PermissionDenied, "Admin cannot modify another admin")
    }
    
    if (target.role === "member" && newRole === "admin") {
      throw new APIError(ErrCode.PermissionDenied, "Admin cannot promote to admin")
    }
    
    if (target.role === "member" && newRole === "member") {
      return true 
    }
    
    throw new APIError(ErrCode.PermissionDenied, "Admin insufficient permissions")
  }

  throw new APIError(ErrCode.PermissionDenied, "Member cannot update roles")
}