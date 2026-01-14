import { APIError, ErrCode } from "encore.dev/api"
import { AuthRepo } from "../auth/auth.repo"

export async function requireRole(
  userId: string,
  organizationId: string,
  roles: Array<"admin" | "member">
) {
  const member = await AuthRepo.getMembershipByOrg(
    userId,
    organizationId,
  )

  if (!member) {
    throw new APIError(
          ErrCode.Unauthenticated,
          "Not a member of the organization"
    )
  }

  const role = member.role
//   Check role PermissionDenied
     if(!roles.includes(role)) {
     throw new APIError(
          ErrCode.PermissionDenied,
          "Insufficient role permissions"
     )
     }

  return member
}
