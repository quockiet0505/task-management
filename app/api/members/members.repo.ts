import { db } from "../../../db"
import { users } from "../../../db/schema/users"
import {organizationMembers} from "../../../db/schema/organization_members"
import { eq, and } from "drizzle-orm"

type Role = "admin" | "member"
export const MemberRepo ={
     // , 
     listByOrganization(organizationId: string){
          return db.
          select().
          from(organizationMembers).
          where(eq(organizationMembers.organizationId, organizationId))
     },

     // check member in organization


     // create member
     addMember( data: {
          userId: string,
          organizationId: string,
          role: Role
     }){
          return db.insert(organizationMembers).values(data)
     },
     //  update role
     updateMember(data:{
          userId: string,
          organizationId: string,
          role: Role
     }){
          return db.update(organizationMembers).set({role: data.role}).where(
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
     }){
          return db.delete(organizationMembers).where(
               and(
                    eq(organizationMembers.userId, data.userId),
                    eq(organizationMembers.organizationId, data.organizationId)
               )
          )
     },


}