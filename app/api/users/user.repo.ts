import { db } from "../../db"
import { users } from "../../../db/schema/users"
import { eq, and } from "drizzle-orm"

export const UserRepo = {
     // get user by id
     async getById (id: string){
          return db.select().from(users).
          where(eq(users.id, id)).limit(1).then(r => r[0])
     },

     // update user 
      async update(userId: string, data: any) {
               const [updated] = await db
                 .update(users)
                 .set(data)
                 .where(eq(users.id, userId))
                 .returning()
               return updated
          },    
}