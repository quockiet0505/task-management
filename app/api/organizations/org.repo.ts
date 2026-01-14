import { db } from "../../../db"
import { organizations } from "../../../db/schema/organizations"
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
     }
}