import { db } from "../../../db"
import { users } from "../../../db/schema/users"
import { organizations } from "../../../db/schema/organizations"
import { organizationMembers } from "../../../db/schema/organization_members"
import { eq, and } from "drizzle-orm"
// Database operations related to authenticated

export const AuthRepo = {
  async findUserByEmail(email: string) {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    return res[0]
  },

  async createUser(data: { email: string; passwordHash: string }) {
    const res = await db
      .insert(users)
      .values(data)
      .returning()
    return res[0]
  },

  async createOrganization(name: string) {
    const res = await db
      .insert(organizations)
      .values({ name })
      .returning()
    return res[0]
  },

  addMember(data: {
    userId: string
    organizationId: string
    role: "admin" | "member"
  }) {
    return db.insert(organizationMembers).values(data)
  },

  async getMembershipByOrg(userId: string, organizationId: string) {
    const res = await db
      .select()
      .from(organizationMembers)
      .where(
        and(
          eq(organizationMembers.userId, userId),
          eq(organizationMembers.organizationId, organizationId)
        )
      )
      .limit(1)
    return res[0]
  }, 

}
