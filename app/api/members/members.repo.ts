import { db } from "../../db"
import { users } from "../../db/schema/users"
import { organizationMembers } from "../../db/schema/organization_members"
import { organizations } from "../../db/schema/organizations"
import { eq, and } from "drizzle-orm"

type Role = "admin" | "member"

export const MemberRepo = {
  // list members with user info
  async listByOrganization(organizationId: string) {
     return await db
       .select({
         userId: organizationMembers.userId,
         email: users.email,
         fullName: users.fullName,
         role: organizationMembers.role,
         organizationId: organizationMembers.organizationId,
         organizationName: organizations.name,
       })
       .from(organizationMembers)
       .innerJoin(users, eq(organizationMembers.userId, users.id))
       .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id)) 
       .where(eq(organizationMembers.organizationId, organizationId))
   },

  // check member in organization
  findByUserAndOrg(userId: string, organizationId: string) {
    return db
      .select()
      .from(organizationMembers)
      .where(
        and(
          eq(organizationMembers.userId, userId),
          eq(organizationMembers.organizationId, organizationId)
        )
      )
      .then(res => res[0])
  },

  // create member
  addMember(data: {
    userId: string,
    organizationId: string,
    role: Role
  }) {
    return db.insert(organizationMembers).values({
      userId: data.userId,
      organizationId: data.organizationId,
      role: data.role
    })
  },

  // update role
  updateMember(data: {
    userId: string,
    organizationId: string,
    role: Role
  }) {
    return db.update(organizationMembers)
      .set({ role: data.role })
      .where(
        and(
          eq(organizationMembers.userId, data.userId),
          eq(organizationMembers.organizationId, data.organizationId)
        )
      )
  },

  // delete member
  deleteMember(data: {
    userId: string,
    organizationId: string
  }) {
    return db.delete(organizationMembers)
      .where(
        and(
          eq(organizationMembers.userId, data.userId),
          eq(organizationMembers.organizationId, data.organizationId)
        )
      )
  },
}