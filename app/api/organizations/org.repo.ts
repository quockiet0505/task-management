import { db } from "../../db"
import { organizations } from "../../db/schema/organizations"
import { organizationMembers } from "../../db/schema/organization_members"
import { eq, and } from "drizzle-orm"

export const OrganizationRepo ={
     getById(id: string){
          return db.
          select().from(organizations).
          where(eq(organizations.id, id)).
          limit(1).
          then(r => r[0])
     },

     create(data: any){
          return db.insert(organizations).
          values(data).
          returning().
          then(r => r[0])
     },

     update(id: string, name: string){
          return db.
          update(organizations).
          set({name}).
          where(eq(organizations.id, id))
     },

     getByUserId(userId: string) {
          return db
            .select({
              id: organizations.id,
              name: organizations.name,
            })
            .from(organizationMembers)
            .innerJoin(
              organizations,
              eq(organizationMembers.organizationId, organizations.id)
            )
            .where(eq(organizationMembers.userId, userId))
            .limit(1)
            .then(r => r[0])
        },

               
          listByUser(userId: string) {
          return db
          .select({
               id: organizations.id,
               name: organizations.name,
          })
          .from(organizationMembers)
          .innerJoin(
               organizations,
               eq(organizationMembers.organizationId, organizations.id)
          )
          .where(eq(organizationMembers.userId, userId))
          }
}